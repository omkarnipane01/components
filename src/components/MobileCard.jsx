import { Ellipsis } from "lucide-react";
import React, { useRef, useState } from "react";
import { useClickOutside } from "./useClickOutside";

const MobileCard = ({
  columns,
  data = [],
  rows,
  action,
  sort = false,
  sortFunction = "",
}) => {
  // console.log("columns ",localStorage.getItem("user_columns").split(",").includes('action'))
  const [showMenu, setShowMenu] = useState(null);
  const isAction = action?.edit || action?.delete || action?.view;
  const menuRef = useRef();

  useClickOutside(menuRef, () => setShowMenu(null));

  return (
    <>
      <div className="flex flex-col gap-2 overflow-x-auto  h-fit">
        {/* Apply loop here */}
        {data && data?.length > 0 ? (
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
                    <div className="flex justify-end" ref={menuRef}>
                      <Ellipsis
                        className="cursor-pointer"
                        onClick={() => setShowMenu(rowData.id)}
                      />
                      {showMenu == rowData.id && isAction && (
                        <div className="absolute right-0 mt-1 w-fit h-fit bg-white border border-gray-300 shadow-md rounded-md p-2 z-50">
                          {Object.keys(action).map((actionKey, index) => (
                            <button
                              key={index}
                              onClick={() => action[actionKey](rowData)}
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

                  <div className="p-4 rounded-lg  bg-white border border-gray-300 space-y-2">
                    {columns.map((col) => {
                      if (col.key !== "action") {
                        return (
                          <div className="flex " key={col.key}>
                            <span className="font-semibold">{col.label}:</span>
                            <span>{rowData[col.key]}</span>
                          </div>
                        );
                      } else {
                        return null;
                      }
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>no data found</div>
        )}
      </div>
    </>
  );
};

export default MobileCard;
