import { useEffect, useRef, useState } from "react";
import { IoChevronUp, IoTrash } from "react-icons/io5";
import type { SkipModel } from "../../model/Skip";
import Button from "../button/Button";

interface SkipDetailsPanelProps {
  selectedSkips: SkipModel[];
  onSkipRemove: (id: number) => void;
}

export default function SkipDetailsPanel({
  selectedSkips,
  onSkipRemove,
}: SkipDetailsPanelProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const skipPanelRef = useRef<HTMLDivElement>(null);
  const skipListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (skipListRef.current) {
      if (isExpanded) {
        const scrollHeight = skipListRef.current.scrollHeight;
        skipListRef.current.style.maxHeight = `${scrollHeight}px`;
        skipListRef.current.style.opacity = "1";
      } else {
        skipListRef.current.style.maxHeight = "0px";
        skipListRef.current.style.opacity = "0";
      }
    }
  }, [isExpanded, selectedSkips.length]);

  if (selectedSkips.length === 0) return null;

  const totalPrice = selectedSkips.reduce(
    (acc, skip) => acc + skip.price_before_vat * (1 + skip.vat / 100),
    0
  );

  return (
    <div
      ref={skipPanelRef}
      className="fixed duration-500 bottom-0 left-0 w-full max-h-[26rem] bg-bg-primary border-t border shadow-xl z-50"
      style={{ maxHeight: isExpanded ? "26rem" : "5rem" }}
    >
      <div className="flex justify-between items-center p-6">
        <div className="flex flex-col items-start">
          <span className="font-semibold">
            <img
              src="/skip.svg"
              alt="Skip Icon"
              className="size-6 inline-block mr-2"
            />
            {selectedSkips.length} Skip{selectedSkips.length > 1 ? "s" : ""}{" "}
            Selected
          </span>
          <span className="text-small text-grey">
            Sizes: {selectedSkips.map((s) => `${s.size}yd`).join(", ")}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <h5 className="font-bold text-primary">£{totalPrice.toFixed(0)}</h5>
          <button
            onClick={() => setIsExpanded((prev) => !prev)}
            className={`text-grey ${
              isExpanded ? "rotate-180" : ""
            } transition-transform duration-300`}
          >
            <IoChevronUp />
          </button>
        </div>
      </div>

      <div
        ref={skipListRef}
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{
          maxHeight: "0px",
          opacity: 0,
        }}
      >
        <div className="overflow-y-auto   max-h-64 flex flex-col gap-4 p-6  pt-0 ">
          {selectedSkips.map((skip) => {
            const skiperPriceWithVAT =
              skip.price_before_vat * (1 + skip.vat / 100);
            return (
              <div
                key={skip.id}
                className="flex items-center gap-4 border rounded-md p-2 shadow-sm"
              >
                <img
                  src={skip.image}
                  alt={`${skip.size} yard skip`}
                  className="w-14 h-14 object-cover rounded"
                />
                <div className="text-start">
                  <p className="font-semibold">
                    {skip.size} Yard Skip
                    <span className="text-grey font-normal">
                      {" "}
                      ({skip.hire_period_days} day hire )
                    </span>
                  </p>
                  <p className=" text-primary font-semibold mt-0.5">
                    £{skiperPriceWithVAT.toFixed(0)}{" "}
                    <span className="text-base font-normal text-grey text-small ">
                      {" "}
                      (Inc. VAT){" "}
                    </span>
                  </p>
                </div>

                <Button isIconOnly variant="text" className="ml-auto">
                  <IoTrash
                    className="text-red text-2xl"
                    onClick={() => onSkipRemove(skip.id)}
                  />
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}