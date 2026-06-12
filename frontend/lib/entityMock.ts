export const entities = [
  {
    id: 1,
    name: "Snowden",
    label: "PERSON",

    documents: 14,

    chunks: 26,

    related: [
      "Russia",
      "Moscow",
      "NSA",
      "CIA",
      "Hong Kong",
    ],
  },

  {
    id: 2,
    name: "Moscow",
    label: "GPE",

    documents: 9,

    chunks: 18,

    related: [
      "Snowden",
      "Russia",
      "Hong Kong",
    ],
  },

  {
    id: 3,
    name: "NSA",
    label: "ORG",

    documents: 11,

    chunks: 22,

    related: [
      "Snowden",
      "CIA",
      "Russia",
    ],
  },

  {
    id: 4,
    name: "Hong Kong",
    label: "GPE",

    documents: 8,

    chunks: 15,

    related: [
      "Snowden",
      "Moscow",
      "China",
    ],
  },
];