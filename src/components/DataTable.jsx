import React, { useEffect, useRef, useState } from "react";
import TableCard from "./TableCard";
import SelectInput from "./SelectInput";
import SearchSelect from "./SearchSelect";
import TextInput from "./TextInput";
import Button from "./Button";
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  FunnelPlus,
  PanelLeft,
  Pencil,
  PenIcon,
  SortAscIcon,
  Trash2,
  TrashIcon,
} from "lucide-react";
import MultiSelectCheck from "./MultiSelectCheck";
import { isMobile, pages } from "../utils/utils";
import Sheet from "./Sheet";
import Loader from "./Loader";
import MobileCard from "./MobileCard";

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
  sort,
  sortFunction,
  filterFunction,
}) => {
  const defaultSearch = "";
  const defaultPage = 10;
  const totalCount = totalRecords;
  const [searchText, setSearchText] = useState(defaultSearch);
  const [page, setPage] = useState(defaultPage); //page size
  const [showFilter, setShowFilter] = useState(false);
  const [tableData, setTableData] = useState(data.slice(0, page));
  const [currentPage, setCurrentPage] = useState(1); // Starts from page 1
  const totalPages = Math.ceil(totalCount / page);

  const handleChange = (name, value) => {
    setFilterVals((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  // data =[]
  // console.log("filters ", filters);
  const getInitialFilters = () => {
    let initial = {};
    filters.forEach((filter) => {
      initial[filter.name] = "";
    });
    // console.log(initial);
    return initial;
  };
  const [filterVals, setFilterVals] = useState(getInitialFilters());

  let columns_data = columns;
  if (Object.keys(action).length > 0) {
    columns_data = [...columns, { key: "action", label: "Action" }];
  }
  const showActions = action?.edit || action?.delete || action?.view;
  const [selected, setSelected] = useState(
    localStorage.getItem("user_columns").split(",")
  );

  const isMobileScreen = isMobile();
  console.log(isMobileScreen);
  const [showSheet, setSheet] = useState(false);

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
    localStorage.setItem("user_columns", selected);
  }, [page, data, currentPage, selected]);

  useEffect(() => {
    const storedColumns = localStorage.getItem("user_columns");
    if (storedColumns) {
      setSelected(storedColumns.split(","));
    } else {
      setSelected(columns_data.map((item) => item.key));
    }
  }, []);
  console.log("rows ", rows);

  const [loader, setLoader] = useState(true);

  useEffect(() => {
    setLoader(true);
    const timeOut = setTimeout(() => {
      if (data.length > 0) {
        setLoader(false);
      }
    }, 500);
  }, [data]);

  return (
    <div className="grid gap-2">
      <div
        className={`w-full flex-grow ${
          filters.length > 0 && showFilter ? "" : ""
        }`}
      >
        <div className="border border-gray-300 bg-white rounded-xl flex flex-wrap items-center justify-between gap-2 px-2 bg-card text-card-foreground rounded-sm">
          {/* flex flex-wrap items-center justify-between gap-2 p-2 bg-card text-card-foreground rounded-sm */}
          <div className="px-1 py-1 flex flex-1 md:flex-wrap items-center gap-1">
            <div className="group">
              <Button
                type="button"
                className="h-[40px] w-auto md:w-auto group-hover:bg-gray-100"
                variant="none"
                onClick={() => {
                  setSheet((prev) => !prev);
                  setShowFilter((prev) => !prev);
                }}
              >
                <FunnelPlus className="cursor-pointer text-gray-500 group-hover:text-blue-600 transition-colors duration-200" />
              </Button>
            </div>

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
                className="px-4 h-[40px] w-full md:w-48 "
              />
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <SelectInput
              options={pages}
              name="Pagination"
              value={page}
              onChange={(value) => {
                setPage(value);
              }}
              placeholder=""
              keys={{ valuekey: "key", titlekey: "label" }}
              className="h-8 w-auto md:w-18"
            />
          
            <MultiSelectCheck
              name="columns"
              options={columns_data}
              selected={selected}
              onChange={setSelected}
              keys={{ valuekey: "key", titlekey: "label" }}
              Fname="Columns"
              className="h-14  w-full md:w-38"
            />

            <Button
              type="button"
              className="h-[42px] w-full  md:w-auto"
              variant="none"
              onClick={handleReset}
            >
              Reset
            </Button>
          </div>
        </div>

        <div className=" py-2 overflow-x-auto">
          {!isMobileScreen ? (
            <TableCard
              columns={columns_data.filter((col) => selected.includes(col.key))}
              data={tableData}
              rows={rows}
              action={action}
              showVertical={showVertical}
              sort={sort}
              sortFunction={sortFunction}
            />
          ) : (
            <div className="flex flex-row w-fit">
              {/* Mobile view */}
              <MobileCard 
              columns={columns_data.filter((col) => selected.includes(col.key))}
              data={tableData}
              rows={rows}
              action={action}
              showVertical={showVertical}
              sort={sort}
              sortFunction={sortFunction}
              />
            </div>
          )}

          {/* <TableCard
           columns={columns_data.filter((col) => selected.includes(col.key))}
            data={tableData}
           rows={rows}
           action={action}
           showVertical={showVertical}
           sort={sort}
           sortFunction={sortFunction}
         /> */}
        </div>

        <div className=" px-2 py-1 flex items-center justify-between bg-white shadow-sm rounded-md">
          <div className="px-1 py-1">showing {page} Records Per Page</div>
          <div className="px-2 gap-4 flex item-center">
            <div className="text-sm bg-gray-100 shadow-sm border-white rounded-sm px-2 py-1">
              {(currentPage - 1) * page + 1} -{" "}
              {Math.min(currentPage * page, totalCount)}
            </div>
            <div className="flex flex-row items-center text-sm text-blue-400  cursor-pointer">
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
      {/* div 2 */}
      {/* {filters.length > 0 && showFilter && (
        <div className=" border border-gray-300 bg-white rounded-xl h-fit px-2 py-3 shadow-sm flex">
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
                        value={filterVals[filter.name]?.label || ""}
                        onSelect={(id, item) => {
                          handleChange(filter.name, {
                            id: item?.[filter.keys.valuekey],
                            label: item?.[filter.keys.titlekey],
                          });
                          filter.onSelect?.(id, item);
                        }}
                        data={filter.data}
                        keys={filter.keys}
                        className={filter.className}
                        placeholder={filter.placeholder}
                        searchFunction={filter.filterSearchFunction}
                      />
                    );
                  }
                  if (filter.type == "SelectInput") {
                    return (
                      <SelectInput
                        key={index}
                        options={filter.options}
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
                  <Button
                    type="button"
                    className="w-full md:w-auto"
                    onClick={() => filterFunction(filterVals)}
                  >
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
      )} */}
      <Sheet
        change={showSheet}
        onchange={setSheet}
        position="left"
        title="Apply Filters"
      >
        {filters.length > 0 && (
          <div className=" bg-white rounded-xl h-fit py-2 flex justify-between">
            <form>
              {filters.length > 0 && (
                <div className="h-fit">
                  {/* <span className="text-gray-500">
                  <b>Apply Filters</b>
                </span> */}
                  <div className="grid grid-cols-2">
                    {filters.map((filter, index) => {
                      if (filter.type == "SearchSelect") {
                        return (
                          <SearchSelect
                            key={index}
                            value={filterVals[filter.name]?.label || ""}
                            onSelect={(id, item) => {
                              handleChange(filter.name, {
                                id: item?.[filter.keys.valuekey],
                                label: item?.[filter.keys.titlekey],
                              });
                              filter.onSelect?.(id, item); // Send ID to backend
                            }}
                            data={filter.data}
                            keys={filter.keys}
                            className={filter.className}
                            placeholder={filter.placeholder}
                            searchFunction={filter.filterSearchFunction}
                          />
                        );
                      }
                      if (filter.type == "SelectInput") {
                        return (
                          <SelectInput
                            key={index}
                            options={filter.options}
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
                  </div>
                  <div className="fixed flex items-center justify-end gap-2 bottom-0 right-0 py-2 px-4">
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => {
                        setFilterVals(getInitialFilters());
                      }}
                    >
                      Clear
                    </Button>
                    <Button
                      type="button"
                      className="w-full md:w-auto"
                      onClick={() => filterFunction(filterVals)}
                    >
                      Apply Filter
                    </Button>
                  </div>
                </div>
              )}
            </form>
          </div>
        )}
      </Sheet>
    </div>
  );
};

export default DataTable;
