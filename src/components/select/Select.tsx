import React, { useEffect, useRef } from "react";
import { IoChevronDown } from "react-icons/io5";

type Option = {
  label: string;
  value: string;
};

type SelectProps = {
  options: Option[];
  multiple?: boolean;
  placeholder?: string;
  label?: string;
  onChange: (selected: string[] | string) => void;
};

export const Select: React.FC<SelectProps> = ({
  options,
  multiple = false,
  placeholder = "Any",
  onChange,
  label,
}) => {
  const [showFilterOptions, setShowFilterOptions] = React.useState(false);
  const [selected, setSelected] = React.useState<string[]>([""]);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleOptionClick = (optionValue: string) => {
    if (multiple) {
      let newSelected: string[];

      if (optionValue === "") {
        newSelected = [""];
      } else {
        newSelected = selected.filter((val) => val !== "");

        if (selected.includes(optionValue)) {
          newSelected = newSelected.filter((val) => val !== optionValue);
        } else {
          newSelected = [...newSelected, optionValue];
        }

        if (newSelected.length === 0) {
          newSelected = [""];
        }
      }

      setSelected(newSelected);
      onChange(newSelected);
    } else {
      setSelected([optionValue]);
      onChange(optionValue);
      setShowFilterOptions(false);
    }
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowFilterOptions(false);
      }
    };

    if (showFilterOptions) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showFilterOptions]);

  const displayLabel = () => {
    if (multiple) {
      if (selected.length === 0) return placeholder;
      const labels = options
        .filter((opt) => selected.includes(opt.value))
        .map((opt) => opt.label);
      return labels.join(", ");
    } else {
      if (!selected[0]) return placeholder;
      const opt = options.find((opt) => opt.value === selected[0]);
      return opt ? opt.label : placeholder;
    }
  };

  return (
    <div ref={containerRef} className="mb-4 relative text-start">
      {label && (
        <label className="block mb-2 font-medium text-small">{label}</label>
      )}
      <button
        className="border flex items-center px-3 py-2 min-w-48 gap-2 w-full justify-between"
        onClick={() => setShowFilterOptions(!showFilterOptions)}
        type="button"
      >
        <span className="text-small">{displayLabel()}</span>
        <IoChevronDown className="text-grey" />
      </button>
      {showFilterOptions && (
        <div className="absolute top-full left-0 w-full bg-bg-primary border rounded shadow-lg z-10">
          <div className="flex flex-col p-1 gap-1 max-h-60 overflow-auto">
            {options.map((option) => {
              const isSelected = multiple
                ? selected.includes(option.value)
                : selected[0] === option.value;

              return (
                <span
                  key={option.value}
                  className={`cursor-pointer text-small transition-colors duration-200 hover:bg-light-grey p-2 rounded flex items-center gap-2 ${
                    isSelected ? "bg-light-grey font" : ""
                  }`}
                  onClick={() => handleOptionClick(option.value)}
                >
                  <span
                    className={` font-bold select-none ${
                      isSelected ? "text-primary" : "text-transparent"
                    }`}
                  >
                    ✓
                  </span>
                  <span>{option.label}</span>
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
