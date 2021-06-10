import React from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";

export default ({ onAdd }: { onAdd: (title: string) => void }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [value, setValue] = React.useState("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setValue(event.target.value);
  return (
    <>
      <Button onClick={onOpen}>add</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>add new project</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              value={value}
              onChange={handleChange}
              placeholder="project name"
            />
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              onClick={() => {
                onAdd(value);
                onClose();
              }}
            >
              add
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
