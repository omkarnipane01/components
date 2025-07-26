import React from "react";

const TextInput = ({
  label,
  error,
  name,
  min,
  max,
  required,
  className,
  ...rest
}) => {
  return (
    <div className={`w-full  ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}

      <input
        id={name}
        name={name}
        min={min}
        max={max}
        {...rest}
        required={required}
        className={`w-full ${className} px-4 py-2 border rounded border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500
            ${
              required
                ? "border-l-4 border-l-red-500"
                : "border-l border-l-gray-300"
            }
            
          `}
      />

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default TextInput;
