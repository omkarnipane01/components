import React, { useEffect, useState } from "react";
import { Search, X } from "lucide-react";

const SearchSelect = ({
  value,
  onSelect,
  data,
  keys,
  className = "",
  placeholder = "🔍 search",
  showIcon = false,
  name = "",
}) => {
  const [initialData, setInitialData] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const { valuekey, titlekey } = keys;

  const handleSearch = (inputValue) => {
    if (!inputValue || inputValue.length < 3) {
      setInitialData(data?.slice(0, 5) || []);
      return;
    }

    const filtered = data?.filter(
      (item) => item?.[titlekey]?.toLowerCase() === inputValue.toLowerCase()
    );

    setInitialData(filtered?.length > 0 ? filtered : []);
  };

  useEffect(() => {
    handleSearch(value || "");
  }, [value, data]);

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
            value={value || ""} 
            onChange={(e) => onSelect(e.target.value)} 
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            type="text"
            placeholder={placeholder}
            required
          />
          {value && (
            <X
              size={16}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer hover:text-red-500"
              onClick={() => onSelect("")} 
            />
          )}
        </div>

        {isFocused && (
          <ul className="absolute z-150 bg-white max-h-40 overflow-y-auto rounded shadow-md w-full">
            {initialData?.length > 0 ? (
              initialData.map((item, index) => (
                <li
                  key={index}
                  className="px-4 py-2 w-full rounded-sm bg-white hover:bg-blue-100 cursor-pointer"
                  onClick={() => {
                    onSelect(item?.[titlekey],item);
                  }}
                >
                  {item?.[titlekey]}
                </li>
              ))
            ) : (
              <li className="px-4 py-2 w-full rounded-sm bg-white text-gray-600">
                No result found
              </li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchSelect;
