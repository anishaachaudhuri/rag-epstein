from groq import Groq

from app.core.config import settings
from app.retrieval.hybrid_search import (
    hybrid_search
)
import json

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

    for i, result in enumerate(results, start=1):

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

    {{
    "summary": "short paragraph",

    "key_findings": [
        "finding 1",
        "finding 2"
    ],

    "important_entities": [
        "entity 1",
        "entity 2"
    ],

    "uncertainties": [
        "uncertainty 1"
    ]
    }}

    Do not include markdown.
    Do not include explanations outside JSON.
    Do not invent facts not present in evidence.
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

    except Exception:

        analysis = {
            "summary": content,
            "key_findings": [],
            "important_entities": [],
            "uncertainties": []
        }

    return {
        "query": query,
        "analysis": analysis,
        "sources": [
            {
                "filename":
                r["filename"],

                "chunk_index":
                r["chunk_index"]
            }
            for r in results
        ]
    }