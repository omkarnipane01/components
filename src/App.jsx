import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./index.css";
import SearchSelect from "./components/SearchSelect";
// import empData from "../assets/emp.json";
import empData from "./assets/emp.json";
import { ChartNoAxesGantt, Table2Icon } from "lucide-react";
import TableCard from "./components/TableCard";
import DataTable from "./components/DataTable";
import SelectInput from "./components/SelectInput";
import TextInput from "./components/TextInput";
import Button from "./components/Button";

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

  const users = [
    { value: "user1", label: "User 1" },
    { value: "user2", label: "User 2" },
    { value: "user3", label: "User 3" },
    { value: "user4", label: "User 4" },
  ];

  return (
    <>
      <div className="grid grid-cols-3">
        {/* <h1 className='bg-red-500'>Hello </h1> */}
        <SearchSelect
          onSelect={(selectedItem) => {
            console.log("User selected:", selectedItem);
          }}
          data={empData}
          keys={{ valuekey: "id", titlekey: "name" }}
          showIcon={true}
        />
        <SearchSelect
          onSelect={(selectedItem) => {
            console.log("User selected:", selectedItem);
          }}
          data={empData}
          keys={{ valuekey: "id", titlekey: "name" }}
          showIcon={true}
        />

        <SearchSelect
          onSelect={(selectedItem) => {
            console.log("User selected:", selectedItem);
          }}
          data={empData}
          keys={{ valuekey: "id", titlekey: "name" }}
          showIcon={true}
        />
        <div>
          <SelectInput
            label="Filter by User"
            options={users}
            name="user_filter"
            value={selectedUser}
            onChange={setSelectedUser}
            placeholder="Choose Value"
            keys={{ valuekey: "value", titlekey: "label" }}
            className="h-10"
          />
        </div>
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
        {/* display datatable here */}
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
    </>
  );
}

export default App;
