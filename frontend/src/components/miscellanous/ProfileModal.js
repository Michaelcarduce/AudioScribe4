import { ViewIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Button,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

// const ProfileModal = ({ user, children, modalProp }) => {
// const [modalOpen, setModalOpen] = useState(modalProp);
// useEffect(() => {
//   console.log(modalProp);
// }, [modalProp]);
// useEffect(() => {
//   console.log(modalOpen);
// }, [modalOpen]);

const ProfileModal = ({ user, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      {children ? (
        // <span
        //   className="try"
        //   onClick={() => setModalOpen((prevIsOpen) => !prevIsOpen)}
        // >
        //   {children}
        // </span>
        <span className="try" onClick={onOpen}>
          {children}
        </span>
      ) : (
        // <IconButton
        //   display={{ base: " flex" }}
        //   icon={<ViewIcon />}
        //   onClick={() => setModalOpen(true)}
        // />
        <IconButton
          display={{ base: " flex" }}
          icon={<ViewIcon />}
          onClick={onOpen}
        />
      )}

      {/* // <Modal
          //   size="lg"
          //   isOpen={modalOpen}
          //   onClose={() => setModalOpen(false)}
          //   isCentered
          //   zIndex={2}
          // > */}

      <Modal size="lg" isOpen={isOpen} onClose={onClose} isCentered zIndex={2}>
        <ModalOverlay />
        <ModalContent h="300px">
          <ModalHeader
            fontSize="40px"
            fontFamily="Work sans"
            display="flex"
            justifyContent="center"
          >
            {user.name}
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody
            display="flex"
            flexDir="column"
            alignItems="center"
            justifyContent="space-between"
          >
            <Text
              fontSize={{ base: "28px", md: "30px" }}
              fontFamily="Work sans"
            >
              Email: {user.email}
            </Text>
          </ModalBody>

          <ModalFooter>
            {/* <Button
                colorScheme="blue"
                mr={3}
                onClick={() => setModalOpen(false)}
              >
                Close
              </Button> */}
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModal;
