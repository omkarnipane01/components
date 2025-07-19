import { CloudCog, X } from "lucide-react";
import React, { use, useState } from "react";

const SelectInput = ({
  options = [],
  name,
  value = "",
  onChange,
  label = "",
  placeholder = "Choose Value",
  className = "",
  keys,
  ...rest
}) => {
  const { valuekey, titlekey } = keys;
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={`relative space-y-1 px-2 py-2  h-full`}>
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      <div className="flex gap-2 flex items-center">
        <input
          className={`relative flex border border-gray-300 w-full text-black rounded  px-4 py-2 ${className} `}
          value={value}
          onChange={onChange}
          type="text"
          placeholder={placeholder}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          readOnly
          {...rest}
        />
        {value && (
          <X
            size={16}
            className="absolute right-8  text-gray-500 cursor-pointer hover:text-red-500"
            onClick={() => onChange("")}
          />
        )}
      </div>

      <div className="relative">
        {options?.length > 0 && isFocused && (
          <ul className="absolute z-150 bg-white max-h-40 overflow-y-auto rounded shadow w-full">
            {options?.map((item, index) => (
              <li
                key={item?.[valuekey]}
                className="px-4 py-2 w-full rounded-sm bg-white hover:bg-blue-100 cursor-pointer"
                onClick={() => {
                  onChange(item?.[titlekey]);
                }}
              >
                {item?.[titlekey]}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SelectInput;
