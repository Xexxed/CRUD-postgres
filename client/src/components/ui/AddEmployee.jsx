import React, { Children } from "react";
import { Button, CloseButton, Dialog, Portal, VStack } from "@chakra-ui/react";
import { Field, Input } from "@chakra-ui/react";
import SelectRole from "./SelectRole";
import { useState } from "react";
import { baseUrl } from "../../../constants/global.js";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../../utils/queryClient";
import { useEffect } from "react";
const AddEmployee = ({ children, type = "add", data }) => {
  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState(
    type === "add"
      ? { name: "", email: "", age: "", salary: "", role: "" }
      : data
  );
  useEffect(() => {
    if (type === "update" && data) {
      setInfo(data);
    }
  }, [data, type]);

  const mutation = useMutation({
    mutationFn: async (data) => {
      const response = await fetch(baseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Failed to add employee");
      }
      return result;
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success("Employee added successfully");
      // Invalidate and refetch
      queryClient.invalidateQueries(["employees_details"]);
      setOpen(false);
    },
  });
  const updateMutation = useMutation({
    mutationFn: async (info) => {
      const response = await fetch(baseUrl + `/${info.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(info),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Failed to add employee");
      }
      return result;
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success("Employee details updated successfully");
      // Invalidate and refetch
      queryClient.invalidateQueries(["employees_details"]);
      setOpen(false);
    },
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo((prev) => ({
      ...prev,
      [name]: value,
    }));

    ///console.log(info);
  };
  const handleSubmit = async () => {
    const requiredFields = ["name", "email", "age", "salary"];
    for (const field of requiredFields) {
      if (!info[field].toString().trim()) {
        toast.error("Missing fields!!");
        return;
      }
    }
    const updatedInfo = {
      ...info,
      role: info.role || null,
    };
    if (type === "add") {
      mutation.mutate(updatedInfo);
    } else {
      updateMutation.mutate(updatedInfo);
    }
  };
  const clearFields = () => {
    setInfo({
      name: "",
      email: "",
      age: "",
      salary: "",
      role: "",
    });
  };

  return (
    <Dialog.Root
      placement="center"
      motionPreset="slide-in-bottom"
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
    >
      {children}
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>
                {type === "add" ? `Add Employee` : `Edit Employee`}
              </Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <VStack gap="4" alignItems="flex-start">
                <Field.Root>
                  <Field.Root>
                    <Field.Label>UserName</Field.Label>
                    <Input
                      type="text"
                      required
                      name="name"
                      placeholder="Enter you username"
                      value={info.name}
                      onChange={handleChange}
                    />
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>Email</Field.Label>
                    <Input
                      type="email"
                      required
                      name="email"
                      placeholder="me@example.com"
                      value={info.email}
                      onChange={handleChange}
                    />
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>Age</Field.Label>
                    <Input
                      required
                      type="number"
                      name="age"
                      placeholder="Enter Age"
                      value={info.age}
                      onChange={handleChange}
                    />
                  </Field.Root>
                  <Field.Label>Salary</Field.Label>
                  <Input
                    required
                    name="salary"
                    placeholder="Enter Salary"
                    value={info.salary}
                    onChange={handleChange}
                  />
                </Field.Root>
                <Field.Root>
                  <SelectRole setInfo={setInfo} />
                </Field.Root>
              </VStack>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline" onClick={clearFields}>
                  Cancel
                </Button>
              </Dialog.ActionTrigger>
              <Button
                onClick={() => {
                  handleSubmit();
                  clearFields();
                }}
              >
                {type === "add" ? `Add` : `Update`}
              </Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default AddEmployee;
