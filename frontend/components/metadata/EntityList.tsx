import { Entity } from "@/types/entity";

type Props = {
  entities: Entity[];
  selectedName: string;
  onSelect: (name: string) => void;
};

export default function EntityList({
  entities,
  selectedName,
  onSelect,
}: Props) {
  return (
    <div
      className="
        h-full
        border
        border-[var(--border)]
        bg-[var(--panel)]
        overflow-y-auto
      "
    >
      {entities.map((entity) => (
        <button
          key={`${entity.name}-${entity.label}`}
          onClick={() =>
            onSelect(entity.name)
          }
          className={`
            w-full
            text-left
            p-4
            border-b
            border-[var(--border)]

            ${
              selectedName === entity.name
                ? "bg-[var(--panel-2)]"
                : ""
            }
          `}
        >
          <div>{entity.name}</div>

          <div
            className="
              mono
              text-xs
              mt-1
              text-[var(--muted)]
            "
          >
            {entity.label}
          </div>
        </button>
      ))}
    </div>
  );
}