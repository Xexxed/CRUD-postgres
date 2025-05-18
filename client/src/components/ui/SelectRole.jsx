import React from "react";
import { Portal, Select, createListCollection } from "@chakra-ui/react";
const SelectRole = ({ setInfo }) => {
  const roles = createListCollection({
    items: [
      { label: "HR", value: "HR" },
      { label: "Developer", value: "Developer" },
      { label: "Manager", value: "Manager" },
      { label: "Sales", value: "Sales" },
      { label: "Intern", value: "Intern" },
    ],
  });
  return (
    <Select.Root
      collection={roles}
      size="sm"
      width="320px"
      onChange={(e) => {
        setInfo((prev) => ({ ...prev, role: e.target.value }));
        //console.log("Selected role:", e.target.value);
      }}
    >
      <Select.HiddenSelect />
      <Select.Label>Select Role</Select.Label>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Select Role" />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content className="select">
            {roles.items.map((role) => (
              <Select.Item item={role} key={role.value}>
                {role.label}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  );
};

export default SelectRole;
