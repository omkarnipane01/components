import React, { useEffect, useState } from "react";
import TableCell from "./TableCell";
import Loader from "./Loader";
import { ChevronDown, ChevronUpIcon } from "lucide-react";

const TableCard = ({
  columns,
  data = [],
  rows,
  action,
  showVertical,
  sort = false,
  sortFunction = "",
}) => {
  const showActions = action?.edit || action?.delete || action?.view;
  // useEffect for loader

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
    // removed h-screen and added h-fit
    <div className="w-full max-h-[60vh] md:max-h-[70vh] lg:max-h-[80vh] overflow-y-auto rounded-lg shadow-sm ">
    {/* <div className=" w-full max-h-[60vh] md:max-h-[70vh] lg:max-h-[80vh] overflow-auto overflow-x-auto overflow-y-auto  rounded-lg shadow-sm "> */}
<div className="w-full overflow-x-auto"></div>
{/* toggle table-fixed and table-auto based on columns change */}
      <table className="table-fixed w-full text-sm text-center ">
        <thead className="sticky top-0 z-50 bg-blue-100 shadow ">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="border-gray-300 text-center px-6 py-2 text-sm font-medium text-gray-700 border-l border-r"
              >
                <div className="flex justify-center items-center gap-8 ">
                  <span>{col.label}</span>
                  {sort && col.key !== "action" && (
                    <div className="flex flex-col items-center cursor-pointer text-gray-400">
                      <ChevronUpIcon
                        size={18}
                        className="hover:text-red-500"
                        onClick={() => {
                          () => console.log("sort-asc");
                          sortFunction("asc", col.key);
                        }}
                      />
                      <ChevronDown
                        size={18}
                        className="hover:text-red-500 -mt-2"
                        onClick={() => {
                          () => console.log("sort-desc");
                          sortFunction("desc", col.key);
                        }}
                      />
                    </div>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        {/* <tbody>
          {!loader && data.length > 0 ? (
            data.map((row, i) => (
              <TableCell
                key={i}
                row={row}
                rows={rows}
                columns={columns}
                showActions={showActions}
                action={action}
                showVertical={showVertical}
              />
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length + (showActions ? 1 : 0)}
                className="px-4 py-4 text-center text-gray-500 text-md"
              >
                No result found
              </td>
            </tr>
          )}
        </tbody> */}
        <tbody>
          {loader ? (
            <tr>
              <td
                colSpan={columns.length + (showActions ? 1 : 0)}
                className="px-4 py-4 text-center"
              >
                <div className="flex justify-center items-center h-fit">
                  <Loader text="Loading..." />
                </div>
              </td>
            </tr>
          ) : data.length > 0 ? (
            data.map((row, i) => (
              <TableCell
                key={i}
                row={row}
                rows={rows}
                columns={columns}
                showActions={showActions}
                action={action}
                showVertical={showVertical}
              />
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length + (showActions ? 1 : 0)}
                className="px-4 py-4 text-center text-gray-500 text-md"
              >
                No result found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TableCard;