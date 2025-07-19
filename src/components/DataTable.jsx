import React, { useState } from "react";
import TableCard from "./TableCard";
import SelectInput from "./SelectInput";
import SearchSelect from "./SearchSelect";
import TextInput from "./TextInput";
import Button from "./Button";

const DataTable = ({
  columns,
  data = [],
  rows,
  action = { edit: false, delete: false },
  users,
  keys,
  is_search = true,
  searchData = "",
  showVertical = false,
  filters = [],
}) => {
  const [selectedValue, setSelectedValue] = useState(null);
  const [searchText, setSearchText] = useState("");
  const columns_data = [...columns, { key: "action", label: "Action" }];
  // filters = [];
  return (
    <div className="px-2 py-4 grid grid-cols-5 gap-4">
      {filters.length > 0 && (
        <div className="col-span-1 border border-gray-300 bg-white rounded-xl h-fit px-3 py-3 shadow-sm flex">
          {filters.length > 0 && (
            <div className="h-fit">
              <span className="text-gray-500">
                <b>Apply Filters</b>
              </span>
              {filters.map((filter, index) => {
                if (filter.type == "SearchSelect") {
                  return (
                    <SearchSelect
                      key={index}
                      onSelect={filter.onSelect}
                      data={filter.data}
                      keys={filter.keys}
                      className={filter.className}
                      placeholder={filter.placeholder}
                    />
                  );
                }
                if (filter.type == "SelectInput") {
                  return (
                    <SelectInput
                      key={index}
                      options={filter.options}
                      name={filter.name}
                      value={filter.value}
                      onChange={filter.onChange}
                      placeholder={filter.placeholder}
                      keys={filter.keys}
                      className={filter.className}
                    />
                  );
                }
              })}
              <div className="flex gap-8 border-t px-4 py-2 bg-white rounded-md border border-gray-300  shadow-lg">
                <Button type="button" className="w-full md:w-auto">
                  Apply Filter
                </Button>
                <Button type="button" variant="secondary">
                  Clear
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* <div className="col-span-4"> */}
      <div className={`${filters.length > 0 ? "col-span-4" : "col-span-5"}`}>
        <div className="border border-gray-300 bg-white rounded-xl h-auto px-3 py-3 shadow-sm flex flex-col gap-4 md:flex-row md:items-center md:justify-between sm:h-12">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            {is_search && (
              <TextInput
                name="search"
                type="text"
                value={searchText}
                onChange={(e) => {
                  setSearchText(e.target.value);
                  {
                    e.target.value.length > 3 && searchData(e.target.value);
                  }
                }}
                placeholder="🔍 search"
                className="h-8 w-full md:w-48"
              />
            )}
            {/* {filters.length > 0 && (
              <div className="flex">
                {filters.map((filter, index) => {
                })}
              </div>
            )} */}
          </div>

          <div className="info-div flex flex-col gap-3 md:flex-row md:items-center">
            <SelectInput
              options={columns_data}
              name="Columns"
              onChange={(value) => {
                console.log("selected column:", value);
              }}
              placeholder="Columns"
              keys={{ valuekey: "key", titlekey: "label" }}
              className="h-8 font-bold w-full md:w-40"
            />
            <Button type="button" className="w-full md:w-auto">
              Reset
            </Button>
          </div>
        </div>

        <div className="py-2">
          <TableCard
            columns={columns}
            data={data}
            rows={rows}
            action={action}
            showVertical={showVertical}
          />
        </div>
        <div className="px-2 ">
          <div className="text-right">showing 10 of 10</div>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
