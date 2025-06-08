import { useState } from "react";
import type { SkipModel, SkipPageFilters } from "../../model/Skip";
import { Select } from "../select/Select";

export default function SkipPageFilters({
  skips,
  onFilterChange,
}: {
  skips: SkipModel[];
  onFilterChange?: (filters: SkipPageFilters) => void;
}) {
  const [filters, setFilters] = useState<SkipPageFilters>({
    size: [],
    location: [],
    duration: "",
    price: "",
  });

  const updateFilter = <T extends keyof typeof filters>(
    key: T,
    value: (typeof filters)[T]
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    if (onFilterChange) {
      onFilterChange({ ...filters, [key]: value });
    }
  };

  function allOptionsSame(options: { label: string; value: string }[]) {
    if (options.length === 0) return false;
    const first = options[0];
    return options.every(
      (opt) => opt.label === first.label && opt.value === first.value
    );
  }

  const rawSizeOptions = Array.from(
    new Set(skips.map((s) => `${s.size} Yard`))
  ).map((size) => ({ label: size, value: size }));

  const sizeOptions = [
    { label: "Any", value: "" },
    ...rawSizeOptions,
  ];

  const rawLocationOptions = Array.from(new Set(skips.map((s) => s.area))).map(
    (loc) => ({ label: loc, value: loc })
  );

  const locationOptions = [
    { label: "Any", value: "" },
    ...rawLocationOptions,
  ];

  const rawDurationOptions = Array.from(
    new Set(skips.map((s) => s.hire_period_days))
  ).map((d) => ({ label: `${d} Days`, value: String(d) }));

  const durationOptions = [
    { label: "Any", value: "" },
    ...rawDurationOptions,
  ];

  const priceRangeOptions = [
    { label: "Any", value: "" },
    { label: "Under £300", value: "under-300" },
    { label: "£300–£600", value: "300-600" },
    { label: "Over £600", value: "over-600" },
  ];

  return (
    <div className="gap-4 flex w-full justify-start desktop:justify-end flex-wrap">
      {rawSizeOptions.length > 0 && !allOptionsSame(rawSizeOptions) && (
        <div>
          <Select
            options={sizeOptions}
            multiple
            label="Skip Size"
            placeholder="Any"
            onChange={(val) => {
              const values = val as string[];
              updateFilter("size", values.includes("") ? [] : values);
            }}
          />
        </div>
      )}

      {rawLocationOptions.length > 0 && !allOptionsSame(rawLocationOptions) && (
        <div>
          <Select
            options={locationOptions}
            multiple
            label="Location"
            placeholder="Any"
            onChange={(val) => {
              const values = val as string[];
              updateFilter("location", values.includes("") ? [] : values);
            }}
          />
        </div>
      )}

      {rawDurationOptions.length > 0 && !allOptionsSame(rawDurationOptions) && (
        <div>
          <Select
            options={durationOptions}
            label="Hire Duration"
            placeholder="Any"
            onChange={(val) => {
              const value = val as string;
              updateFilter("duration", value === "" ? "" : value);
            }}
          />
        </div>
      )}

      <div>
        <Select
          options={priceRangeOptions}
          label="Price Range"
          placeholder="Any"
          onChange={(val) => {
            const value = val as string;
            updateFilter("price", value === "" ? "" : value);
          }}
        />
      </div>
    </div>
  );
}
