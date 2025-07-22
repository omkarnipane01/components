import React from "react";
import TableCell from "./TableCell";

const TableCard = ({ columns, data = [], rows, action, showVertical }) => {
  const showActions = action?.edit || action?.delete || action?.view;

  return (
    // removed h-screen and added h-fit 
    <div className="h-fit max-h-[60vh] md:max-h-[70vh] lg:max-h-[80vh] overflow-y-auto overflow-y-auto overflow-x-auto rounded-lg shadow-sm ">
      <table className="table-auto min-w-full text-sm text-center ">
        <thead className="sticky top-0 z-50 bg-blue-100 shadow ">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className=" border-gray-300 text-center px-4 py-3 text-sm font-medium text-gray-700 border-l border-r"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
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
