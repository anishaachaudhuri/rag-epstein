from groq import Groq
import json

from app.core.config import settings

from app.retrieval.hybrid_search import (
    hybrid_search
)

client = Groq(
    api_key=settings.GROQ_API_KEY
)


def generate_synthesis(
    db,
    query,
    limit=5
):

    results = hybrid_search(
        db,
        query,
        limit=limit
    )

    evidence = ""

    for i, result in enumerate(
        results,
        start=1
    ):

        evidence += (
            f"\n\nEvidence {i}\n"
            f"File: {result['filename']}\n"
            f"{result['text'][:500]}"
        )

    prompt = f"""
You are an investigative intelligence analyst.

Use ONLY the supplied evidence.

Query:
{query}

Evidence:
{evidence}

Return ONLY valid JSON.

For every finding include evidence numbers.

Evidence numbers must refer to the supplied evidence list.

Required schema:

summary: string

key_findings:
[
  {{
    finding: string,
    evidence: [1,2]
  }}
]

timeline:
[
  {{
    date: string,
    event: string,
    evidence: [1]
  }}
]

important_entities:
string[]

uncertainties:
string[]

Rules:

- Do not include markdown.
- Do not include explanations outside JSON.
- Do not invent facts.
- Use only supplied evidence.
- Every finding must have at least one evidence reference.
- If dates, years, months, or chronology appear in the evidence, generate a timeline.
- Timeline events must be chronological.
- Timeline events must include evidence references.
- Omit timeline events that lack temporal information.
"""

    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0.2
    )

    content = (
        response
        .choices[0]
        .message
        .content
    )

    try:

        analysis = json.loads(
            content
        )

        for finding in analysis.get(
            "key_findings",
            []
        ):

            sources = []

            for evidence_id in finding.get(
                "evidence",
                []
            ):

                try:

                    idx = (
                        int(evidence_id)
                        - 1
                    )

                    if (
                        0 <= idx
                        < len(results)
                    ):

                        sources.append(
                            {
                                "filename":
                                results[idx][
                                    "filename"
                                ],

                                "chunk_index":
                                results[idx][
                                    "chunk_index"
                                ]
                            }
                        )

                except Exception:
                    pass

            finding["sources"] = (
                sources
            )

        for event in analysis.get(
            "timeline",
            []
        ):

            sources = []

            for evidence_id in event.get(
                "evidence",
                []
            ):

                try:

                    idx = (
                        int(evidence_id)
                        - 1
                    )

                    if (
                        0 <= idx
                        < len(results)
                    ):

                        sources.append(
                            {
                                "filename":
                                results[idx][
                                    "filename"
                                ],

                                "chunk_index":
                                results[idx][
                                    "chunk_index"
                                ]
                            }
                        )

                except Exception:
                    pass

            event["sources"] = (
                sources
            )

    except Exception:

        analysis = {
            "summary": content,
            "key_findings": [],
            "timeline": [],
            "important_entities": [],
            "uncertainties": []
        }

    return {
        "query": query,
        "analysis": analysis,
        "sources": [
            {
                "filename":
                result["filename"],

                "chunk_index":
                result["chunk_index"]
            }
            for result in results
        ]
    }