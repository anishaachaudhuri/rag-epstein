type Props = {
  children: React.ReactNode;
};

export default function Badge({
  children,
}: Props) {
  return (
    <span
      className="
        inline-flex
        items-center
        px-2
        py-1
        text-xs
        mono
        border
        border-[var(--border)]
        bg-[var(--panel-2)]
      "
    >
      {children}
    </span>
  );
}