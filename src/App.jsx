import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./index.css";
import SearchSelect from "./components/SearchSelect";
// import empData from "../assets/emp.json";
import empData from "./assets/emp.json";
import { ChartNoAxesGantt, PanelLeft, Table2Icon } from "lucide-react";
import TableCard from "./components/TableCard";
import DataTable from "./components/DataTable";
import SelectInput from "./components/SelectInput";
import TextInput from "./components/TextInput";
import Button from "./components/Button";
import MultiSelectInput from "./components/MultiSelectInput";
import MultiSelectCheck from "./components/MultiSelectCheck";

function App() {
  const [count, setCount] = useState(0);
  const columns = [
    { key: "id", label: "Id" },
    { key: "name", label: "Name" },
    { key: "salary", label: "Salary" },
    { key: "designation", label: "Designation" },
    { key: "profile", label: "Profile" },
  ];
  // extract columns and data row from the data and pass to the component it would me more better and dynamic to edit the row data

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

  const searchData = (data) => {
    console.log("search-data");
    console.log(data);
  };

  const filterFunction = (selectedItem) => {
    console.log("User selected:", selectedItem);
  };

  const [selectedUser, setSelectedUser] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);

  // console.log(selectedUsers);
  const users = [
    { value: "user1", label: "User 1" },
    { value: "user2", label: "User 2" },
    { value: "user3", label: "User 3" },
    { value: "user4", label: "User 4" },
  ];

  const [searchFilterVals, setSearchFilterVals] = useState({
    sf1: "",
    sf2: "",
    sf3: "",
  });

  const [showSidebar, setShowSidebar] = useState(true);

  const handleChange = (name, val) => {
    setSearchFilterVals((prev) => ({
      ...prev,
      [name]: val,
    }));
  };

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

  const [selected, setSelected] = useState(["company_name", "platform"]);

  return (
    <>
      <div className="grid grid-cols-6 gap-2">
        <div
          className={` col-span-1 bg-white border-white rounded-lg px-2 py-2 shadow-md flex gap-3`}
        >
          <div> sidebar</div>
          <div className="justify justify-left">
            <PanelLeft
              className="cursor-pointer text-gray-500"
              onClick={() => {
                setShowSidebar((prev) => !prev);
              }}
            />
          </div>
        </div>
        <div
          className={`col-span-5 bg-white border-white rounded-lg px-2 py-2 shadow`}
        >
          {/* <div className={`${filters.length > 0 && showFilter ? "col-span-4" : "col-span-5"}`}> */}
          {/* <div className={`${showSidebar ? "col-span-5" : "col-span-6"} bg-white border-white rounded-lg px-2 py-2 shadow`}> */}

          <div>
            <div className="px-1 py-2 ">
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
          </div>
        </div>
        <SearchSelect
          value={searchFilterVals.sf1}
          name="sf1"
          onSelect={(val, dataMap) => {
            handleChange("sf1", val);
            console.log("sf1 selected:", dataMap);
          }}
          data={empData}
          keys={{ valuekey: "id", titlekey: "name" }}
          showIcon={true}
        />
        <SearchSelect
          value={searchFilterVals.sf2}
          name="sf2"
          onSelect={(val, dataMap) => {
            handleChange("sf2", val);
            console.log("sf1 selected:", dataMap);
          }}
          data={empData}
          keys={{ valuekey: "id", titlekey: "name" }}
          showIcon={true}
        />
        <SearchSelect
          value={searchFilterVals.sf3}
          name="sf3"
          onSelect={(val, dataMap) => {
            handleChange("sf3", val);
            console.log("sf1 selected:", dataMap);
          }}
          data={empData}
          keys={{ valuekey: "id", titlekey: "name" }}
          showIcon={true}
        />
        <SelectInput
          label="Filter by User"
          options={users}
          name="user_filter2"
          value={selectedUser}
          onChange={setSelectedUser}
          placeholder="Choose Value"
          keys={{ valuekey: "value", titlekey: "label" }}
          className="h-10"
        />
        {/* <MultiSelectInput
          label="Select Multiple users"
          options={users}
          name="multi_user"
          value={selectedUsers}
          onChange={setSelectedUsers}
          placeholder="Choose Value"
          keys={{ valuekey: "value", titlekey: "label" }}
          className="h-10"
        /> */}
        <MultiSelectCheck
          name="TestColumns"
          label="Test Columns"
          options={options}
          selected={selected}
          onChange={setSelected}
          keys={{ valuekey: "key", titlekey: "label" }}
          Fname="Columns"
          // className={"px-2 py-4"}
        />
      </div>
      <div>
        {/* <TableCard
          columns={columns}
          data={empData}
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
          action={{ edit: editData, delete: deleteData }}
        /> */}
      </div>
      <div>
        <div className="px-2 py-2 ">
          {/* <DataTable
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
          /> */}
        </div>
      </div>
    </>
  );
}

export default App;
