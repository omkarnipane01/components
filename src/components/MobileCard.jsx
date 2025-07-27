import { Ellipsis } from "lucide-react";
import React from "react";

const MobileCard = ({
  columns,
  data = [],
  rows,
  action,
  sort = false,
  sortFunction = "",
}) => {
  console.log("columns ", columns);
  console.log("rows ", rows);
  console.log("data ", data);

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
        <div className="flex justify-end">
          <Ellipsis className="cursor-pointer" />
        </div>

        <div className="p-4 rounded-lg shadow-sm bg-white border border-gray-300 space-y-2">
        {columns.map((col) => {
    if (col.key !== 'action') {
      return (
        <div className="flex justify-between" key={col.key}>
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

          
          // <div className="bg-white border border-gray-300 shadow-md rounded-md flex flex-col px-2 py-2">
          //   <div className="flex flex-col max-w-full relative">
          //     <div className="flex justify-end">
          //       <Ellipsis className="cursor-pointer" />
          //     </div>

          //     <div
          //       key={"index"}
          //       className="p-4 rounded-lg shadow-sm bg-white border border-gray-300"
          //     >
          //       <div className="flex justify-between">
          //         <span className="font-semibold">Name:</span>
          //         <span>{"row.name"}</span>
          //       </div>
          //       <div className="flex justify-between">
          //         <span className="font-semibold">Email:</span>
          //         <span>{"row.email"}</span>
          //       </div>
          //       <div className="flex justify-between">
          //         <span className="font-semibold">Role:</span>
          //         <span>{"row.role"}</span>
          //       </div>
          //     </div>
          //   </div>
          // </div>
        ) : (
          <div>no data found</div>
        )}

        {/* <div className="bg-white border border-gray-300 shadow-md rounded-md flex px-2 py-2">
          <div className="flex-row flex flex-3">
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {data.map((row, index) => (
              <div
                key={"index"}
                className="p-4 rounded-lg shadow-sm bg-white border border-gray-300"
              >
                <div className="flex justify-between">
                  <span className="font-semibold">Name:</span>
                  <span>{"row.name"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Email:</span>
                  <span>{"row.email"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Role:</span>
                  <span>{"row.role"}</span>
                </div>
              </div>
             ))} 
            </div> 
          </div>
        </div> */}
        {/* <div className="bg-white border border-gray-300 shadow-md rounded-md flex px-2 py-2">
          <div className="flex-row flex flex-3"></div>
        </div>
        <div className="bg-white border border-gray-300 shadow-md rounded-md flex px-2 py-2">
          <div className="flex-row flex flex-3"></div>
        </div>
        <div className="bg-white border border-gray-300 shadow-md rounded-md flex px-2 py-2">
          <div className="flex-row flex flex-3"></div>
        </div> */}
      </div>
    </>
  );
};

export default MobileCard;
