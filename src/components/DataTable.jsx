import React, { useState } from "react";
import TableCard from "./TableCard";
import SelectInput from "./SelectInput";
import SearchSelect from "./SearchSelect";
import TextInput from "./TextInput";
import Button from "./Button";
import { PanelLeft } from "lucide-react";
import MultiSelectCheck from "./MultiSelectCheck";

const DataTable = ({
  columns,
  data = [],
  rows,
  // action = { edit: false, delete: false },
  action = {},

  is_search = true,
  searchData = "",
  showVertical = false,
  filters = [],
}) => {
  const [selectedValue, setSelectedValue] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState("10");
  const [showFilter, setShowFilter] = useState(false);
  const handleChange = (name, value) => {
    setFilterVals((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const getInitialFilters = () => {
    let initial = {};
    filters.forEach((filter) => {
      initial[filter.name] = "";
    });
    return initial;
  };
  const [filterVals, setFilterVals] = useState(getInitialFilters());
  // const columns_data = [...columns, { key: "action", label: "Action" }];
  let columns_data = columns;
  if (Object.keys(action).length > 0) {
    columns_data = [...columns, { key: "action", label: "Action" }];
  }
  const [selected, setSelected] = useState(
    columns_data.map((item) => item.key)
  );

  const pages = [
    { key: 10, label: 10 },
    { key: 25, label: 25 },
    { key: 50, label: 50 },
    { key: 100, label: 100 },
  ];
  return (
    <div className="px-2 py-4 grid grid-cols-5 gap-4">
      <div
        className={`${
          filters.length > 0 && showFilter ? "col-span-4" : "col-span-5"
        }`}
      >
        <div className="border border-gray-300 bg-white rounded-xl h-auto px-3 py-3 shadow-sm flex flex-col gap-4 md:flex-row md:items-center md:justify-between sm:h-12">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <PanelLeft
              className="cursor-pointer text-gray-500"
              onClick={() => {
                setShowFilter((prev) => !prev);
              }}
            />
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
          </div>

          <div className="info-div flex flex-col gap-3 md:flex-row md:items-center">
            <SelectInput
              options={pages}
              name="Pagination"
              value={page}
              onChange={(value) => {
                setPage(value);
              }}
              placeholder=""
              keys={{ valuekey: "key", titlekey: "label" }}
              className="h-8 !w-20 md:w-40"
            />
            <MultiSelectCheck
              name="columns"
              options={columns_data}
              selected={selected}
              onChange={setSelected}
              keys={{ valuekey: "key", titlekey: "label" }}
              Fname="Columns"
              className="h-12  w-full md:w-38"
            />
            <Button type="button" className="w-full  md:w-auto" variant="none">
              Reset
            </Button>
          </div>
        </div>

        <div className="py-2">
          <TableCard
            // columns={columns}
            columns={columns_data.filter((col) => selected.includes(col.key))}
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
      {filters.length > 0 && showFilter && (
        <div className="col-span-1 border border-gray-300 bg-white rounded-xl h-fit px-2 py-3 shadow-sm flex">
          <form>
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
                        value={filterVals[filter.name]}
                        // onSelect={filter.onSelect}
                        onSelect={(val) => {
                          handleChange(filter.name, val);
                          filter.onSelect?.(val);
                        }}
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
                        // value={filter.value}
                        value={filterVals[filter.name]}
                        // onChange={filter.onChange}
                        onChange={(e) => {
                          handleChange(filter.name, e);
                          filter.onChange;
                        }}
                        placeholder={filter.placeholder}
                        keys={filter.keys}
                        className={filter.className}
                      />
                    );
                  }
                })}
                {/* <div className="flex gap-2 border-t px-2 py-2 bg-white rounded-md border border-gray-300  shadow-lg"> */}
                <div className="justify justify-between flex px-2">
                  <Button type="button" className="w-full md:w-auto">
                    Apply Filter
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => {
                      setFilterVals(getInitialFilters());
                    }}
                  >
                    Clear
                  </Button>
                </div>
              </div>
            )}
          </form>
        </div>
      )}
    </div>
  );
};

export default DataTable;
