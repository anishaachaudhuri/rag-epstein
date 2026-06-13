type Props = {
  value: string;
  onChange: (
    value: string
  ) => void;
};

export default function EntitySearch({
  value,
  onChange,
}: Props) {
  return (
    <input
      value={value}
      onChange={(e) =>
        onChange(
          e.target.value
        )
      }
      placeholder="Search entities..."
      className="
        w-full
        border
        border-[var(--border)]
        bg-[var(--panel)]
        px-4
        py-3
      "
    />
  );
}