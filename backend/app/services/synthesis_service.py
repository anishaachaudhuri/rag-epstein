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

Return ONLY a valid JSON object.

The response MUST exactly follow this schema:

{{
  "summary": "string",

  "key_findings": [
    {{
      "finding": "string",
      "evidence": [1]
    }}
  ],

  "timeline": [
    {{
      "date": "string",
      "event": "string",
      "evidence": [1]
    }}
  ],

  "important_entities": [
    "string"
  ],

  "uncertainties": [
    "string"
  ]
}}

Requirements:

- summary MUST be a narrative paragraph.
- summary MUST NOT be an object.
- summary MUST NOT be an array.
- key_findings MUST be an array.
- timeline MUST be an array.
- important_entities MUST be an array of strings.
- uncertainties MUST be an array of strings.
- Every finding must include evidence references.
- Evidence references must refer to the supplied evidence list.
- If dates, years, months, or chronology appear in evidence, generate timeline events.
- Timeline events must be chronological.
- Timeline events must include evidence references.
- Omit timeline events without temporal information.
- Do not invent facts.
- Use only supplied evidence.
- Do not return markdown.
- Do not return explanations outside JSON.
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

    if content:

        content = content.strip()

        if content.startswith("```json"):
            content = (
                content
                .replace("```json", "", 1)
                .replace("```", "")
                .strip()
            )

        elif content.startswith("```"):
            content = (
                content
                .replace("```", "")
                .strip()
            )

    try:

        analysis = json.loads(
            content
        )

        if not isinstance(
            analysis,
            dict
        ):
            raise ValueError(
                "Response is not JSON object"
            )

        analysis.setdefault(
            "summary",
            ""
        )

        analysis.setdefault(
            "key_findings",
            []
        )

        analysis.setdefault(
            "timeline",
            []
        )

        analysis.setdefault(
            "important_entities",
            []
        )

        analysis.setdefault(
            "uncertainties",
            []
        )

        if not isinstance(
            analysis["summary"],
            str
        ):
            analysis["summary"] = str(
                analysis["summary"]
            )

        if not isinstance(
            analysis["key_findings"],
            list
        ):
            analysis["key_findings"] = []

        if not isinstance(
            analysis["timeline"],
            list
        ):
            analysis["timeline"] = []

        if not isinstance(
            analysis["important_entities"],
            list
        ):
            analysis["important_entities"] = []

        if not isinstance(
            analysis["uncertainties"],
            list
        ):
            analysis["uncertainties"] = []

        for finding in analysis[
            "key_findings"
        ]:

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

        for event in analysis[
            "timeline"
        ]:

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

    except Exception as e:

        print(
            "SYNTHESIS PARSE ERROR:"
        )
        print(content)
        print(e)

        analysis = {
            "summary": (
                "The model returned "
                "an invalid response format."
            ),

            "key_findings": [],

            "timeline": [],

            "important_entities": [],

            "uncertainties": [
                "Response parsing failed."
            ]
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