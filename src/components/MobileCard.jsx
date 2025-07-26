import { Ellipsis } from "lucide-react";
import React from "react";
// import empData from "../assets/emp.json";
//   columns={columns_data.filter((col) => selected.includes(col.key))}
//               data={tableData}
//               rows={rows}
//               action={action}
//               showVertical={showVertical}
//               sort={sort}
//               sortFunction={sortFunction}
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
        <div className="bg-white border border-gray-300 shadow-md rounded-md flex flex-col px-2 py-2">
          <div className="flex flex-col max-w-full relative">
            <div className="flex justify-end">
              <Ellipsis className="cursor-pointer" />
            </div>

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
            {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
            </div> */}
          </div>
        </div>
        <div className="bg-white border border-gray-300 shadow-md rounded-md flex px-2 py-2">
          <div className="flex-col flex flex-3">
            {" "}
            <div>name:omkar name:omkar name:omkar name:omkar</div>
            <div>name:omkar name:omkar name:omkar name:omkar</div>
            <div>name:omkar name:omkar name:omkar name:omkar</div>
            <div>name:omkar name:omkar name:omkar name:omkar</div>
            <div>name:omkar name:omkar name:omkar name:omkar</div>
            <div>name:omkar name:omkar name:omkar name:omkar</div>
            <div>name:omkar name:omkar name:omkar name:omkar</div>
          </div>
        </div>
        <div className="bg-white border border-gray-300 shadow-md rounded-md flex px-2 py-2">
          <div className="flex-col flex flex-3">
            {" "}
            <div>name:omkar</div>
            <div>name:omkar</div>
            <div>name:omkar</div>
            <div>name:omkar</div>
            <div>name:omkar</div>
            <div>name:omkar</div>
          </div>
        </div>
        <div className="bg-white border border-gray-300 shadow-md rounded-md flex px-2 py-2">
          <div className="flex-col flex flex-3">
            {" "}
            <div>name:omkar</div>
            <div>name:omkar</div>
            <div>name:omkar</div>
            <div>name:omkar</div>
            <div>name:omkar</div>
            <div>name:omkar</div>
          </div>
        </div>
        <div className="bg-white border border-gray-300 shadow-md rounded-md flex px-2 py-2">
          <div className="flex-col flex flex-3">
            {" "}
            <div>name:omkar</div>
            <div>name:omkar</div>
            <div>name:omkar</div>
            <div>name:omkar</div>
            <div>name:omkar</div>
            <div>name:omkar</div>
          </div>
        </div>
        <div className="bg-white border border-gray-300 shadow-md rounded-md flex px-2 py-2">
          <div className="flex-col flex flex-3">
            {" "}
            <div>name:omkar</div>
            <div>name:omkar</div>
            <div>name:omkar</div>
            <div>name:omkar</div>
            <div>name:omkar</div>
            <div>name:omkar</div>
          </div>
        </div>
        <div className="bg-white border border-gray-300 shadow-md rounded-md flex px-2 py-2">
          <div className="flex-col flex flex-3">
            {" "}
            <div>name:omkar</div>
            <div>name:omkar</div>
            <div>name:omkar</div>
            <div>name:omkar</div>
            <div>name:omkar</div>
            <div>name:omkar</div>
          </div>
        </div>
        {/* <div className="bg-white border border-gray-300 shadow-md rounded-md flex px-2 py-2">
          <div className="flex-row flex flex-3"></div>
        </div>
        <div className="bg-white border border-gray-300 shadow-md rounded-md flex px-2 py-2">
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
