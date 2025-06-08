import { FaCircleCheck } from "react-icons/fa6";
import { GrLocation } from "react-icons/gr";
import { IoTodayOutline } from "react-icons/io5";
import type { SkipModel } from "../../model/Skip";
import SkipStatusBadge from "../skip-status-badge/SkipStatusBadge";

interface SkipCardProps {
  isSelected?: boolean;
  skip: SkipModel;
  onSkipSelect: (skip: SkipModel) => void;
}
export default function SkipCard({
  isSelected = false,
  skip,
  onSkipSelect,
}: SkipCardProps) {
  const priceWithVAT = skip.price_before_vat * (1 + skip.vat / 100);
  return (
    <div
      key={skip.size}
      onClick={() => onSkipSelect(skip)}
      className={`${
        isSelected ? "ring-primary " : ""
      }  ring-2 ring-light-grey/50 overflow-hidden max-w-2xl hover:scale-105 rounded-lg relative cursor-pointer shadow-sm hover:shadow-lg transition-all duration-300 items-start text-start flex flex-col`}
    >
      <img
        src={skip.image}
        alt={`${skip.size} yard skip`}
        className="w-full h-64 object-cover "
      />
      <div
        className={`absolute top-4 right-4 border-2 transition-all duration-200 rounded-full ${
          isSelected ? "border-green-500" : "border shadow-md"
        }`}
      >
        <FaCircleCheck
          className={`text-green-500 text-3xl transition-all duration-200 ${
            isSelected ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>

      <div className="p-6 gap-2 flex flex-col w-full">
        <h5 className="font-semibold ">{skip.size} Yard Skip</h5>
        {skip.area && (
        <p className="flex items-center gap-3 text-grey">
          <GrLocation /> {skip.area}
        </p>
        )}
        <p className="flex items-center gap-3 text-grey">
          <IoTodayOutline /> {skip.hire_period_days} days hire period
        </p>
        <div className="space-x-3 flex gap-2 flex-wrap">
          <SkipStatusBadge label="Road Allowed" status={skip.allowed_on_road} />
          <SkipStatusBadge
            label="Heavy Waste"
            status={skip.allows_heavy_waste}
          />
        </div>
        <h5 className="font-bold text-primary mt-12">
          £{priceWithVAT.toFixed(0)}{" "}
          <span className="text-text-primary text-base">(Inc. VAT)</span>
        </h5>
      </div>
    </div>
  );
}