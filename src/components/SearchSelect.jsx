import React, { useEffect, useState } from "react";
import { Search, X } from "lucide-react";
const SearchSelect = ({
  onSelect,
  data,
  keys,
  className = "",
  placeholder = "🔍 search",
  showIcon = false,
}) => {
  // const [selectData, setSelectData] = useState(null);
  const [output, setOutput] = useState("");
  const [initialData, setInitialData] = useState(null);
  const [isFocused, setIsFocused] = useState(false);
  const { valuekey, titlekey } = keys;
  console.log(data);

  const search = (e) => {
    setOutput(e.target.value);
    if (e.target.value.length >= 3) {
      const user = data.filter(
        (item) => item.name.toLowerCase() == e.target.value.toLowerCase()
      );
      console.log(user);

      if (user.length > 0) {
        setInitialData(user);
        // setSelectData(user);
      } else {
        setInitialData(null);
        // setSelectData(null);
      }
    } else {
      setInitialData(data?.slice(0, 5));
    }
  };

  useEffect(() => {
    // setSelectData(null);
    setInitialData(data?.slice(0, 5));
  }, []);

  return (
    <>
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
              className={`border border-gray-300 w-full rounded  px-4 pr-10 py-2 ${className}`}
              name="name"
              value={output}
              onChange={search}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setTimeout(() => setIsFocused(false), 200)}
              type="text"
              placeholder={placeholder}
              required
            />
            {output && (
              <X
                size={16}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer hover:text-red-500"
                onClick={() => {
                  setOutput("");
                  setInitialData(data?.slice(0, 5)); // Reset list to default
                }}
              />
            )}
          </div>

          {isFocused && (
            <div className="bg-white-500 border-blue rounded-lg shadow-xl max-h-44 overflow-y-auto hover:shadow-blue-200/70">
              {initialData?.length > 0 ? (
                // <ul className="space-y-2">
                <ul className="absolute z-150 bg-white max-h-40 overflow-y-auto rounded shadow-md w-full">
                  {initialData?.map((item, index) => (
                    <li
                      key={item?.[valuekey]}
                      className="px-4 py-2 w-full rounded-sm bg-white hover:bg-blue-100 cursor-pointer"
                      onClick={() => {
                        setOutput(item?.[titlekey]);
                        if (onSelect) onSelect(item);
                        console.log("titlekey ", item?.[titlekey]);
                      }}
                    >
                      {item?.[titlekey]}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="bg-white-500 border-blue rounded-lg shadow-xl max-h-44 overflow-y-auto hover:shadow-blue-200/70">
                  <ul className="absolute z-150 bg-white max-h-40 overflow-y-auto rounded shadow-md w-full">
                    <li className="px-4 py-2 w-full rounded-sm bg-white text-gray-600 ">
                      No result found
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchSelect;
