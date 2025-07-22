import React, { useEffect, useRef, useState } from "react";
import TableCard from "./TableCard";
import SelectInput from "./SelectInput";
import SearchSelect from "./SearchSelect";
import TextInput from "./TextInput";
import Button from "./Button";
import { ChevronLeft, ChevronRight, PanelLeft } from "lucide-react";
import MultiSelectCheck from "./MultiSelectCheck";

const DataTable = ({
  columns,
  data = [],
  rows,
  action = {},
  is_search = true,
  searchData = "",
  showVertical = false,
  filters = [],
  totalRecords = 0,
}) => {
  const defaultSearch = "";
  const defaultPage = 10;
  const totalCount = totalRecords;

  const [selectedValue, setSelectedValue] = useState(null);
  const [searchText, setSearchText] = useState(defaultSearch);
  const [page, setPage] = useState(defaultPage); //page size
  const [showFilter, setShowFilter] = useState(false);
  const [tableData, setTableData] = useState(data.slice(0, page));
  const [currentPage, setCurrentPage] = useState(1); // Starts from page 1
  const totalPages = Math.ceil(totalCount / page);
  // console.log("totalPages ", totalPages);

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

  let columns_data = columns;

  if (Object.keys(action).length > 0) {
    columns_data = [...columns, { key: "action", label: "Action" }];
  }
  const [selected, setSelected] = useState(
    columns_data.map((item) => item.key)
  );

  const handleReset = () => {
    setSearchText(defaultSearch);
    setPage(defaultPage);
    setSelected(columns_data.map((item) => item.key));
    setTableData(data.slice(0, page));
    searchData("");
    setCurrentPage(1);
  };

  // useEffect for showing records based on
  useEffect(() => {
    const startIndex = (currentPage - 1) * page;
    const endIndex = startIndex + page;
    setTableData(data.slice(startIndex, endIndex));
  }, [page, data, currentPage]);

  // get this pages from utils.js later
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
          <div className="flex items-center">
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
                    e.target.value.length > 2
                      ? setTableData(searchData(e.target.value, "name"))
                      : setTableData(data.slice(0, page));
                  }
                }}
                placeholder="🔍 search"
                className="h-8 w-full md:w-48"
              />
            )}
          </div>
          {/* info div */}

          <div className="flex items-center gap-1">
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
            <Button
              type="button"
              className="w-full  md:w-auto"
              variant="none"
              onClick={handleReset}
            >
              Reset
            </Button>
          </div>
        </div>

        <div className="py-2">
          <TableCard
            // columns={columns}
            columns={columns_data.filter((col) => selected.includes(col.key))}
            data={tableData}
            rows={rows}
            action={action}
            showVertical={showVertical}
          />
        </div>
        <div className="px-2 flex item-center justify-between">
          <div className="bg-gray-100 shadow-sm border-white rounded-sm px-1 py-1">
            showing {page} Records Per Page
          </div>
          <div className="px-2 gap-4 flex item-center">
            <div className="bg-gray-100 shadow-sm border-white rounded-sm px-2 py-1">
              From {(currentPage - 1) * page + 1} To{" "}
              {Math.min(currentPage * page, totalCount)}
            </div>
            <div className="flex item-center  text-blue-400  cursor-pointer ">
              <ChevronLeft
                size={28}
                onClick={() => {
                  setCurrentPage((prev) => Math.max(prev - 1, 1));
                }}
              />
              <ChevronRight
                size={28}
                onClick={() => {
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages));
                }}
              />
            </div>
          </div>
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
                        value={filterVals[filter.name]}
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
