import { IoCheckmark, IoClose } from "react-icons/io5";

type StatusBadgeProps = {
  label: string;
  status: boolean;
};

export default function SkipStatusBadge({ label, status }: StatusBadgeProps) {
  const bgColor = status ? "bg-green-100" : "bg-red-100";
  const textColor = status ? "text-green-700" : "text-red-700";
  const ariaLabel = `${label}: ${status ? "Yes" : "No"}`;

  return (
    <div
      className={`flex items-center px-3 py-1 rounded-full w-max ${bgColor}`}
      aria-label={ariaLabel}
    >
      <span className={`font-medium text-small ${textColor} flex items-center space-x-1`}>
        {status ? <IoCheckmark /> : <IoClose />}
        <span>
          {label}
        </span>
      </span>
    </div>
  );
};
