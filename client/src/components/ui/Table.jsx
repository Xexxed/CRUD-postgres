import { For, HStack, Stack, Table } from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useMutation } from "@tanstack/react-query";
import { baseUrl } from "../../../constants/global";
import toast from "react-hot-toast";
import { queryClient } from "../../../utils/queryClient.js";
import AddEmployee from "./AddEmployee.jsx";
import { Dialog } from "@chakra-ui/react";
const EmployeeTable = ({ data: items }) => {
  const mutation = useMutation({
    mutationFn: async (id) => {
      const response = await fetch(baseUrl + `/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to delete employee");
      }
      return response.json();
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message);

      // Invalidate and refetch
    },
    onSuccess: () => {
      toast.success("Employee deleted successfully");
      queryClient.invalidateQueries(["employees_details"]); // Invalidate and refetch
      // Invalidate and refetch
    },
  });

  if (!items || items.length === 0) {
    return <h1>No Employee data available</h1>;
  }
  return (
    <Stack gap="10">
      <Table.Root size="md" variant="outline">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>ID</Table.ColumnHeader>
            <Table.ColumnHeader>Name</Table.ColumnHeader>
            <Table.ColumnHeader>Email</Table.ColumnHeader>
            <Table.ColumnHeader>Age</Table.ColumnHeader>
            <Table.ColumnHeader>Role</Table.ColumnHeader>
            <Table.ColumnHeader>Salary</Table.ColumnHeader>
            <Table.ColumnHeader>Actions</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {items.map((item) => (
            <Table.Row key={item.id}>
              <Table.Cell>{item.id}</Table.Cell>
              <Table.Cell>{item.name}</Table.Cell>
              <Table.Cell>{item.email}</Table.Cell>
              <Table.Cell>{item.age}</Table.Cell>
              <Table.Cell>{item.role}</Table.Cell>
              <Table.Cell>{item.salary}</Table.Cell>
              <Table.Cell>
                <HStack gap="3">
                  <MdDelete
                    onClick={() => {
                      mutation.mutate(item.id);
                    }}
                    size={20}
                    className="icon"
                  />
                  <AddEmployee data={item} type="update">
                    <Dialog.Trigger asChild>
                      <FaEdit size={20} className="icon" />
                    </Dialog.Trigger>
                  </AddEmployee>
                </HStack>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Stack>
  );
};
export default EmployeeTable;
