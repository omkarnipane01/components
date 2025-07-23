import React, { useEffect, useState } from "react";
import { Search, X } from "lucide-react";

const SearchSelect = ({
  value,
  onSelect,
  data = [],
  keys,
  className = "",
  placeholder = "🔍 search",
  showIcon = false,
  name = "",
  searchFunction,
}) => {
  const { valuekey, titlekey } = keys;
  const [inputText, setInputText] = useState(value || "");
  const [filteredData, setFilteredData] = useState([]);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    setInputText(value || "");
  }, [value]);

  useEffect(() => {
    if (!inputText || inputText.length < 3) {
      setFilteredData(data.slice(0, 5));
    } else {
      const filtered = searchFunction(inputText, titlekey); // using external function provided by prop
      setFilteredData(filtered.length > 0 ? filtered : []);
    }
  }, [inputText, data]);

  const handleSelect = (item) => {
    setInputText(item?.[titlekey]);
    onSelect(item?.[valuekey], item);
    setIsFocused(false);
  };

  return (
    <div className="search-select rounded-lg border-white px-2 py-2">
      {showIcon && (
        <div className="py-2 flex gap-2 items-center">
          <Search className="text-blue-500 text-sm" size={14} />
          <span className="text-sm text-blue-500">search</span>
        </div>
      )}

      <div className="relative space-y-2">
        <div className="relative w-full">
          <input
            className={`border border-gray-300 w-full rounded px-4 pr-10 py-2 ${className}`}
            name={name}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            type="text"
            placeholder={placeholder}
            autoComplete="off"
          />
          {inputText && (
            <X
              size={16}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer hover:text-red-500"
              onClick={() => {
                setInputText("");
                onSelect("", null); // Clear selection
              }}
            />
          )}
        </div>

        {isFocused && (
          <ul className="absolute z-150 bg-white max-h-40 overflow-y-auto rounded shadow-md w-full">
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <li
                  key={index}
                  className="px-4 py-2 w-full bg-white hover:bg-blue-100 cursor-pointer"
                  onMouseDown={() => handleSelect(item)} // Use onMouseDown to prevent blur before click
                >
                  {item?.[titlekey]}
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-gray-600">No results found</li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchSelect;
