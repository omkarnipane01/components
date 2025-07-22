// utils/getActionCell.js
import { Eye, Pen, Trash2 } from "lucide-react";

export const getActionCell = ({ view, edit, remove }) => ({
  cell: (row) => (
    <div className="flex justify-center gap-2 text-gray-700">
      {view && (
        <Eye
          className="w-4 h-4 cursor-pointer hover:text-blue-600"
          onClick={() => view(row)}
        />
      )}
      {edit && (
        <Pen
          className="w-4 h-4 cursor-pointer hover:text-green-600"
          onClick={() => edit(row)}
        />
      )}
      {remove && (
        <Trash2
          className="w-4 h-4 cursor-pointer hover:text-red-600"
          onClick={() => remove(row)}
        />
      )}
    </div>
  ),
});
