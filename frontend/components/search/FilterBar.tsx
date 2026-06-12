import Badge from "@/components/ui/Badge";

export default function FilterBar() {
  return (
    <div
      className="
        mt-6
        flex
        gap-3
      "
    >
      <Badge>
        ALL
      </Badge>

      <Badge>
        EMAIL
      </Badge>

      <Badge>
        OCR_REPORT
      </Badge>

      <Badge>
        REPORT
      </Badge>
    </div>
  );
}