import { Check, ChevronDown } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";

const MultiSelectCheck = ({
  options = [],
  selected = [],
  onChange,
  keys = { valuekey: "key", titlekey: "label" },
  placeholder = "Select options",
  className = "",
  Fname = "Select Values",
  label = "",
  name,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { valuekey, titlekey } = keys;

  const handleSelect = (item) => {
    const isSelected = selected.some((val) => val === item[valuekey]);
    if (isSelected) {
      onChange(selected.filter((val) => val !== item[valuekey]));
    } else {
      onChange([...selected, item[valuekey]]);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedTitles = options
    .filter((item) => selected.includes(item[valuekey]))
    .map((item) => item[titlekey])
    .join(", ");

  return (
    <div
      className={`relative w-full space-y-1 py-1 ${className}`}
      ref={dropdownRef}
    >
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      <div
        className={`border group border-gray-300 rounded px-4 py-2 cursor-pointer bg-white flex justify-between items-center`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-md font-bold text-gray-500 truncate">
          {/* {selected.length > 0 ? selectedTitles : placeholder} */}
          {Fname}
        </span>
        <ChevronDown
          size={18}
          className="text-gray-500 group-hover:text-blue-500"
        />
      </div>

      <div className="relative">
        {isOpen && (
          <ul className="absolute z-150 mt-1 max-h-64 w-full rounded shadow bg-white overflow-auto py-2">
            {options.map((item, index) => {
              const isSelected = selected.includes(item[valuekey]);
              return (
                <li
                  key={item[valuekey]}
                  className="px-4 py-2 hover:bg-gray-100 flex items-center justify-between text-sm cursor-pointer"
                  onClick={() => handleSelect(item)}
                >
                  <span>{item[titlekey]}</span>
                  {isSelected && <Check size={16} className="text-black" />}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MultiSelectCheck;
