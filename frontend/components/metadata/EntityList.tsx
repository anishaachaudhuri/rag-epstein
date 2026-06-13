type Props = {
  entities: any[];

  selectedName: string;

  onSelect: (
    name: string
  ) => void;
};

export default function EntityList({
  entities,
  selectedName,
  onSelect,
}: Props) {
  return (
    <div
      className="
        flex
        flex-nowrap
        gap-2
        min-w-max
        pb-2
      "
    >
      {entities.map(
        (entity, index) => (
          <button
            key={`${entity.name}-${index}`}
            onClick={() =>
              onSelect(
                entity.name
              )
            }
            className={`
              px-3
              py-2
              whitespace-nowrap
              border

              ${
                selectedName ===
                entity.name
                  ? `
                    border-[var(--accent)]
                    bg-[var(--panel-2)]
                  `
                  : `
                    border-[var(--border)]
                  `
              }
            `}
          >
            {entity.name}
          </button>
        )
      )}
    </div>
  );
}