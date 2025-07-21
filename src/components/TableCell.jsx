import React from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";

const TableCell = ({
  row,
  rows,
  showActions = false,
  action,
  showVertical = false,
  columns = [], // Pass visible columns
}) => {
  console.log("TableCell columns", columns);
  // const filteredRow = columns.reduce((acc, column) => {
  //   acc[column.key] = row[column.key];
  //   return acc;
  // }, {});
  const filteredRow = columns.reduce((acc, column) => {
    acc[column.key] = column.key === "action" ? action : row[column.key];
    return acc;
  }, {});
  console.log("filteredRow", filteredRow);
  // console.log("action", action);

  return (
    <tr className=" hover:bg-blue-50">
      {rows.map((col, index) => (
        <td
          key={index}
          className={`px-4 py-3  border-b border-gray-300 ${
            showVertical ? "border-l border-r" : ""
          }`}
        >
          {col.cell ? col.cell(filteredRow) : null}
        </td>
      ))}

      {/* {showActions && (
        <td className="px-4 py-3 flex justify-center gap-2 border-b border-gray-300">
          {action?.edit && (
            <Pencil
              size={20}
              className="text-blue-400 hover:cursor-pointer"
              onClick={() => action.edit(filteredRow)}
            />
          )}
          {action?.delete && (
            <Trash2
              size={24}
              className="text-red-400 hover:cursor-pointer"
              onClick={() => action.delete(filteredRow)}
            />
          )}
          {action?.view && (
            <Eye
              size={24}
              className="text-gray-400 hover:cursor-pointer"
              onClick={() => action.view(filteredRow)}
            />
          )}
        </td>
      )} */}
    </tr>
  );
};

export default TableCell;
