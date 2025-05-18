import React from "react";
import SearchBar from "./components/ui/search";
import EmployeeTable from "./components/ui/Table";
import { VStack, Button } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { baseUrl } from "../constants/global.js";
import AddEmployee from "./components/ui/AddEmployee";
import { Dialog } from "@chakra-ui/react";

const App = () => {
  async function fetchEmployeeDetails(params) {
    const response = await fetch(baseUrl);
    if (!response.ok) {
      throw new Error(response.error);
    }
    return response.json();
  }
  const { isLoading, error, data } = useQuery({
    queryKey: ["employees_details"],
    queryFn: fetchEmployeeDetails,
  });
  if (isLoading) {
    return "Loading...";
  }
  if (error) {
    return error.message;
  }
  console.log("Data:", data);

  return (
    <div className="p-10 space-y-10">
      {/* Search Section */}
      <div>
        <SearchBar />
      </div>

      {/* Table Section */}
      <VStack gap="6" align="flex-start">
        <AddEmployee>
          <Dialog.Trigger asChild>
            <Button variant="outline">Add Employee</Button>
          </Dialog.Trigger>
        </AddEmployee>

        <EmployeeTable data={data} />
      </VStack>
    </div>
  );
};

export default App;
