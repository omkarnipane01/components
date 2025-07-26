import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./index.css";
import SearchSelect from "./components/SearchSelect";
// import empData from "../assets/emp.json";
import empData from "./assets/emp.json";
import {
  ChartNoAxesGantt,
  IndianRupee,
  Link,
  Loader2,
  PanelLeft,
  Table2Icon,
} from "lucide-react";
import TableCard from "./components/TableCard";
import DataTable from "./components/DataTable";
import SelectInput from "./components/SelectInput";
import TextInput from "./components/TextInput";
import Button from "./components/Button";
import MultiSelectInput from "./components/MultiSelectInput";
import MultiSelectCheck from "./components/MultiSelectCheck";
import Sheet from "./components/Sheet";


function App() {
  const [count, setCount] = useState(0);
  // !while pass key to columns pass database column field name here
  const columns = [
    { key: "id", label: "Id" },
    { key: "name", label: "Name" },
    { key: "salary", label: "Salary" },
    { key: "designation", label: "Designation" },
    { key: "profile", label: "Profile" },
  ];
  // extract columns and data row from the data and pass to the component it would me more better and dynamic to edit the row data
  //  const columns = ['Id','Name','Salary','Designation','Profile','Action']
  const editData = (data) => {
    console.log("edit-data");
    console.log(data);
  };
  const deleteData = (data) => {
    console.log("delete-data");
    console.log(data);
  };

  const viewData = (data) => {
    console.log("view-data");
    console.log(data);
  };

  const sortData = (sort, key) => {
    const sorted = [...data].sort((a, b) => {
      const valA = a[key];
      const valB = b[key];

      if (typeof valA === "string") {
        return sort === "desc"
          ? valB.localeCompare(valA)
          : valA.localeCompare(valB);
      } else {
        return sort === "desc" ? valB - valA : valA - valB;
      }
    });
    setData(sorted);
  };
  const filterTable = (filters = []) => {
    console.log("filters ", filters);
    console.log("Apply filter");
  };
  const [data, setData] = useState(empData);

  const searchData = (data, titlekey) => {
    console.log("search-data");
    console.log(data);
    // const filtered = empData?.filter(
    //   (item) => item?.[titlekey]?.toLowerCase() === data.toLowerCase()
    // );
    const filtered = empData.filter((item) =>
      item?.[titlekey]?.toLowerCase().includes(data.toLowerCase())
    );
    return filtered;
  };

  const filterFunction2 = (selectedItem, itemData) => {
    console.log("User selected:", selectedItem);
    console.log("itemData ", itemData);
  };

  const [selectedUser, setSelectedUser] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);

  const users = [
    { value: "1", label: "User 1" },
    { value: "2", label: "User 2" },
    { value: "3", label: "User 3" },
    { value: "4", label: "User 4" },
    { value: "5", label: "Ex-communicado" },
  ];

  const [searchFilterVals, setSearchFilterVals] = useState({
    sf1: "",
    sf2: "",
    sf3: "",
  });

  const [showSidebar, setShowSidebar] = useState(true);
  console.log("showSidebar ", showSidebar);

  

  const handleChange = (name, val) => {
    setSearchFilterVals((prev) => ({
      ...prev,
      [name]: val,
    }));
  };

  const hasAccess = true;
  const hasNotAccess = false;
  const options = [
    { key: "company_name", label: "Company Name" },
    { key: "service", label: "Service" },
    { key: "platform", label: "Platform" },
    { key: "approval", label: "Approval Status" },
    { key: "payment_type", label: "Payment Type" },
    { key: "total", label: "Total Amount" },
    { key: "pending", label: "Amount Pending" },
    { key: "status", label: "Payment Status" },
    { key: "created", label: "Created At" },
    { key: "action", label: "Action" },
  ];

  return (
    <>
      <div className="flex gap-2 h-screen w-full">
        {/* sidebar start */}
        <div
          className={`fixed z-40 h-screen  ${
            showSidebar ? "w-[250px]" : "w-[50px] "
          }   bg-white border-red-500 border rounded-md px-2 py-2 shadow-md flex gap-3`}
        >
          <div className="flex flex-1 justify-between justify">
            <div>{showSidebar && "sidebar"}</div>
            <div className="justify justify-left">
              <PanelLeft
                className="cursor-pointer text-gray-500"
                onClick={() => {
                  setShowSidebar((prev) => !prev);
                }}
              />
            </div>
            {/* <Sheet change={showSheet} onchange={setSheet}/> */}
          </div>
        </div>
        {/* sidebar ends */}
        {/* content start */}

        <div
          className={` overflow-y-auto ${
            showSidebar ? "ml-[250px]" : "ml-[50px]"
          } bg-white border-red-500 border rounded-lg px-2 py-2 shadow`}
        >
          <div className="px-1 py-2 ">
            <DataTable
              columns={columns}
              data={data}
              users={users}
              keys={{ valuekey: "value", titlekey: "label" }}
              // rows={[{
              //   id: (row) => row.id,
              //   name: (row) => row.name,
              //   salary: (row) => (
              //     <span className="flex items-center gap-1">
              //       <IndianRupee size={14} />
              //       {row.salary}
              //     </span>
              //   ),
              //   designation: (row) => row.designation,
              //   profile: (row) => (
              //     <a
              //       href={row.profile}
              //       className="break-words"
              //       target="_blank"
              //       rel=""
              //     >
              //       {row.profile}
              //     </a>
              //   ),
              // }]}
              rows={{
                id: (row) => row.id,
                name: (row) => row.name,
                salary: (row) => (
                  <span className="flex items-center gap-1">
                    <IndianRupee size={14} />
                    {row.salary}
                  </span>
                ),
                designation: (row) => row.designation,
                profile: (row) => (
                  // <div className="flex items-center">
                  <a href={row.profile} className=" " target="_blank" rel="">
                    {/* <Link
                        size={20}
                        className="text-blue-400 cursor-pointer"
                      /> */}
                    {row.profile}
                  </a>
                  // </div>
                ),
              }}
              action={{
                ...(hasAccess && { edit: editData }),
                // ...(hasNotAccess && { delete: deleteData }),
                ...(hasAccess && { delete: deleteData }),
                ...(hasAccess && { view: viewData }),
              }}
              is_search={true}
              searchData={searchData}
              showVertical={true}
              totalRecords={empData.length}
              sort={true}
              sortFunction={sortData}
              filterFunction={filterTable}
              filters={[
                {
                  data: empData,
                  keys: { valuekey: "id", titlekey: "name" },
                  className: "h-8 w-full md:w-full",
                  placeholder: "Search Filter",
                  type: "SearchSelect",
                  name: "search_filter",
                  filterSearchFunction: searchData,
                },

                {
                  data: empData,
                  keys: { valuekey: "id", titlekey: "name" },
                  className: "h-8 w-full md:w-full",
                  placeholder: "Search Filter",
                  type: "SearchSelect",
                  name: "search_filter2",
                  filterSearchFunction: searchData,
                },
                {
                  options: users,
                  name: "user_filter",
                  value: selectedUser,
                  onChange: setSelectedUser,
                  placeholder: "Choose Value",
                  keys: { valuekey: "value", titlekey: "label" },
                  className: "h-8 w-full md:w-full",
                  type: "SelectInput",
                },
                {
                  options: users,
                  name: "user_filter2",
                  value: selectedUser,
                  onChange: setSelectedUser,
                  placeholder: "Choose Value",
                  keys: { valuekey: "value", titlekey: "label" },
                  className: "h-8 w-full md:w-full",
                  type: "SelectInput",
                },
              ]}
            />
          </div>
        </div>
        {/* content end */}
      </div>
      {/* <div>
        <div className="px-2 py-2 ">
          <DataTable
            columns={columns}
            data={empData}
            users={users}
            setSelectedUser
            keys={{ valuekey: "value", titlekey: "label" }}
            rows={[
              { cell: (rowData) => rowData.id },
              { cell: (rowData) => rowData.name },
              { cell: (rowData) => <b>₹ {rowData.salary}</b> },
              { cell: (rowData) => rowData.designation },
              {
                cell: (rowData) => (
                  <a
                    href={rowData.profile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    {rowData.profile}
                  </a>
                ),
              },
            ]}
            action={{ edit: editData, delete: deleteData, view: viewData }}
            is_search={true}
            searchData={searchData}
            showVertical={false}
            filters={[
              {
                onSelect: filterFunction,
                data: empData,
                keys: { valuekey: "id", titlekey: "name" },
                className: "h-8 w-full md:w-full",
                placeholder: "Search Filter",
                type: "SearchSelect",
                name: "search_filter",
              },
              {
                options: users,
                name: "user_filter",
                value: selectedUser,
                onChange: setSelectedUser,
                placeholder: "Choose Value",
                keys: { valuekey: "value", titlekey: "label" },
                className: "h-8 w-full md:w-full",
                type: "SelectInput",
              },
            ]}
          />
        </div>
      </div> */}
    </>
  );
}

export default App;
