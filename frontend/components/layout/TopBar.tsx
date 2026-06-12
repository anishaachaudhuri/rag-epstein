export default function TopBar() {
  return (
    <div
      className="
        h-14
        border-b
        border-[var(--border)]
        flex
        items-center
        px-6
      "
    >
      <input
        placeholder="Search evidence..."
        className="
          w-full
          max-w-4xl
          bg-[var(--panel)]
          border
          border-[var(--border)]
          px-4
          py-2
          text-sm
          outline-none
        "
      />
    </div>
  );
}