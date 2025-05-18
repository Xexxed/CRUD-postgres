import { Button, Group, Input } from "@chakra-ui/react";

const SearchBar = () => {
  return (
    <Group w="full" marginBottom="20">
      <Input placeholder="Enter your email" />
      <Button bg="bg.subtle" variant="outline">
        Submit
      </Button>
    </Group>
  );
};
export default SearchBar;
