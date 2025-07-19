import React from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";

const TableCell = ({
  row,
  rows,
  showActions = false,
  action,
  showVertical = false,
}) => {
  return (
    <tr className=" hover:bg-blue-50">
      {/* add border-l border-r here if showVertical is true */}
      {rows.map((col, index) => (
        <td
          key={index}
          className={`px-4 py-3  border-b border-gray-300 ${
            showVertical ? "border-l border-r" : ""
          }`}
        >
          {col.cell ? col.cell(row) : null}
        </td>
      ))}

      {showActions && (
        <td className="px-4 py-3 flex justify-center gap-2 border-b border-gray-300">
          {action?.edit && (
            <Pencil
              size={20}
              className="text-blue-400 hover:cursor-pointer"
              onClick={() => action.edit(row)}
            />
          )}
          {action?.delete && (
            <Trash2
              size={24}
              className="text-red-400 hover:cursor-pointer"
              onClick={() => action.delete(row)}
            />
          )}
          {action?.view && (
            <Eye
              size={24}
              className="text-gray-400 hover:cursor-pointer"
              onClick={() => action.view(row)}
            />
          )}
        </td>
      )}
    </tr>
  );
};

export default TableCell;
