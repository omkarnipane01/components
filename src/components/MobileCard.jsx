import { Ellipsis } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useClickOutside } from "./useClickOutside";
import Loader from "./Loader";

const MobileCard = ({
  columns,
  data = [],
  rows,
  action,
  sort = false,
  sortFunction = "",
}) => {
  // console.log("columns ",localStorage.getItem("user_columns").split(",").includes('action'))
  console.log("columns ", columns);
  const [showMenu, setShowMenu] = useState(null);
  const isAction = action?.edit || action?.delete || action?.view;
  const [loader, setLoader] = useState(true);
  const [showAll, setShowAll] = useState(null);
  useEffect(() => {
    setLoader(true);
    const timeOut = setTimeout(() => {
      if (data.length > 0) {
        setLoader(false);
      }
    }, 1000);
  }, [data]);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !event.target.closest(".menu-trigger") &&
        !event.target.closest(".menu-popup")
      ) {
        setShowMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="flex flex-col gap-2 overflow-x-auto  h-fit">
        {/* Apply loop here */}
        {loader ? (
          <div className="flex justify-center items-center h-fit">
            <Loader text="Loading..." />
          </div>
        ) : data && data?.length > 0 ? (
          <div>
            {data.map((rowData, index) => (
              <div
                key={index}
                className="bg-white border border-gray-300 shadow-md rounded-md flex flex-col px-2 py-2 mb-4"
              >
                <div className="flex flex-col max-w-full relative">
                  {localStorage
                    .getItem("user_columns")
                    .split(",")
                    .includes("action") && (
                    <div className="flex justify-end menu-trigger">
                      <Ellipsis
                        className="cursor-pointer"
                        onClick={() => setShowMenu(rowData.id)}
                      />
                      {showMenu == rowData.id && isAction && (
                        <div className="menu-popup absolute right-0 mt-1 w-fit h-fit bg-white border border-gray-300 shadow-md rounded-md p-2 z-50">
                          {Object.keys(action).map((actionKey, index) => (
                            <button
                              key={index}
                              onClick={(e) => {
                                e.stopPropagation();
                                action[actionKey](rowData);
                              }}
                              className="block w-full text-left px-2 py-1 hover:bg-gray-100"
                            >
                              {actionKey.charAt(0).toUpperCase() +
                                actionKey.slice(1)}{" "}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* <div className="p-4 rounded-lg  bg-white border border-gray-300 space-y-2">
                    {columns.map((col) => {
                      if (col.key !== "action") {
                        if (columns.length > 4) {
                         
                          return (
                            <div className="flex " key={col.key}>
                              <span className="font-semibold">
                                {col.label}:
                              </span>
                              <span>{rowData[col.key]}</span>
                            </div>
                          );
                        }
                      } else {
                        return null;
                      }
                    })}
                  </div> */}
                  <div className="p-4 rounded-lg bg-white border border-gray-300 space-y-2">
                    {columns.map((col, index) => {
                      const isExpanded = showAll == rowData.id;
                      if (col.key !== "action") {
                        if (!isExpanded && index >= 3) return null;
                        // inded 0,1,2 will be displayed and index 3 and greater then 3 will be skipped or passed as null

                        return (
                          <div className="flex gap-2" key={col.key}>
                            <span className="font-semibold">{col.label}:</span>
                            <span>{rowData[col.key]}</span>
                          </div>
                        );
                      }
                    })}
                    {columns.length > 4 && (
                      <button
                        onClick={() =>
                          setShowAll((prev) =>
                            prev == rowData.id ? null : rowData.id
                          )
                        }
                        className="text-blue-600  text-sm"
                      >
                        {showAll == rowData.id ? "Show Less" : "Show More"}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="px-4 py-4  items-center justify-center text-gray-500 text-md">
            <span className="text-center">no data found </span>
          </div>
        )}
      </div>
    </>
  );
};

export default MobileCard;
