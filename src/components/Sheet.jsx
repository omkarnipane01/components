import { X } from "lucide-react";
import React from "react";

const Sheet = ({ change, onchange }) => {
  return (
    <>
      <div
        className={` right-0 top-0 fixed h-screen z-100 bg-white border-green-500 border rounded-sm px-2 py-1 shadow-md flex  gap-2 ${
          change ? "w-[350px]" : "hidden"
        }`}
      >
        <div className=" flex flex-1 justify-between">
          <div>Header Title</div>
          <X
            className="cursor-pointer"
            onClick={() => {
              onchange((prev) => !prev);
            }}
          />
          {/* Sheet content will be displayed here */}
          {/* <div>{showSidebar && "sidebar"}</div>
          <div className="justify justify-left">
            <PanelLeft
              className="cursor-pointer text-gray-500"
              onClick={() => {
                setShowSidebar((prev) => !prev);
              }}
            />
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Sheet;
