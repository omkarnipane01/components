import { X } from "lucide-react";
import React from "react";

const Sheet = ({
  change,
  onchange,
  children,
  title = "",
  position = "right",
}) => {
  // const isLeft = position === "left";
  // const baseClasses = `fixed top-0 ${
  //   isLeft ? "left-0" : "right-0"
  // } w-[350px] h-screen bg-white shadow-xl border-l border-gray-200 flex flex-col z-50 transform transition-transform duration-300 ease-in-out`;

  // const slideClass = change
  //   ? "translate-x-0"
  //   : isLeft
  //   ? "-translate-x-full"
  //   : "translate-x-full";
    // 
    const isBottom = position === "bottom";
const isLeft = position === "left";

// Base positioning styles
const baseClasses = `fixed ${
  isBottom
    ? "bottom-0 left-0 w-full h-[300px]"
    : `${isLeft ? "left-0" : "right-0"} top-0 w-[350px] h-screen`
} bg-white shadow-xl border border-gray-200 flex flex-col z-50 transform transition-transform duration-300 ease-in-out`;

// Slide animation styles
const slideClass = change
  ? "translate-x-0 translate-y-0"
  : isBottom
  ? "translate-y-full"
  : isLeft
  ? "-translate-x-full"
  : "translate-x-full";

  return (
    <>
      {change && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* overlay  */}
          <div
            className="fixed inset-0 z-40 bg-black/10"
            onClick={() => onchange(false)}
          ></div>
          {/* sheet panel */}
          <div className={`${baseClasses} ${slideClass}`}>
            {/* Header */}

            {/* <div className="flex flex-col"> */}
            <div className=" flex items-center px-4 py-3 border-b border-gray-300 justify-between">
              <div className="text-md font-semibold">{title}</div>
              <X
                className="cursor-pointer hover:text-red-500"
                onClick={() => {
                  onchange((prev) => !prev);
                }}
              />
            </div>
            {/* Content */}
            <div className="flex-1 overflow-y-auto px-4 py-3">{children}</div>
            {/* <div className="fixed bottom-0">Sheet footer</div> */}
            {/* </div> */}
          </div>
        </div>
      )}
    </>
  );
};

export default Sheet;
