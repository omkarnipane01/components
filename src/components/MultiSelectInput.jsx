import { ChevronDown, X } from "lucide-react";
import React, { useState } from "react";

const MultiSelectInput = ({
  options = [],
  name,
  value = [],
  onChange,
  label = "",
  placeholder = "Choose Values",
  className = "",
  keys,
  ...rest
}) => {
  const { valuekey, titlekey } = keys;
  const [isFocused, setIsFocused] = useState(false);

  const handleSelect = (selectedValue) => {
    if (!value.includes(selectedValue)) {
      onChange([...value, selectedValue]);
    }
  };

  const handleRemove = (itemToRemove) => {
    onChange(value.filter((item) => item !== itemToRemove));
  };

  return (
    <div className={`relative space-y-1 px-2 py-2 h-full`}>
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}

      <div
        className={`flex overflow-hidden flex-wrap items-center gap-2 border border-gray-300 rounded px-2 py-2 ${className}`}
        onClick={() => setIsFocused(true)}
        onBlur={() => setTimeout(() => setIsFocused(false), 200)}
        tabIndex={0}
      >
        {value.length > 0 ? (
          value.map((val, index) => (
            <span
              key={index}
              className="flex items-center gap-1 bg-blue-100 text-blue-800 text-sm rounded-full px-2 py-1"
            >
              {val}
              <X
                size={14}
                className="cursor-pointer hover:text-red-500"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove(val);
                }}
              />
            </span>
          ))
        ) : (
          <span className="text-gray-400 text-sm">{placeholder}</span>
        )}
        <ChevronDown
          size={16}
          className="ml-auto text-gray-500 cursor-pointer"
        />
      </div>
      <div className="relative">
        {options?.length > 0 && isFocused && (
          <ul className="absolute z-150 bg-white max-h-40 overflow-y-auto rounded shadow w-full">
            {options.map((item) => {
              const title = item?.[titlekey];
              const valueKey = item?.[valuekey];
              const isSelected = value.includes(title);
              return (
                <li
                  key={valueKey}
                  className={`px-4 py-2 w-full hover:bg-blue-100 cursor-pointer ${
                    isSelected ? "text-gray-400 cursor-not-allowed" : ""
                  }`}
                  onClick={() => !isSelected && handleSelect(title)}
                >
                  {title}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MultiSelectInput;
