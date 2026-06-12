import { entities } from "@/lib/entityMock";

type Props = {
  selectedId: number;
  onSelect: (id: number) => void;
};

export default function EntityList({
  selectedId,
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
          key={entity.id}
          onClick={() =>
            onSelect(entity.id)
          }
          className={`
            w-full
            text-left
            p-4
            border-b
            border-[var(--border)]

            ${
              selectedId === entity.id
                ? "bg-[var(--panel-2)]"
                : ""
            }
          `}
        >
          <div>
            {entity.name}
          </div>

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