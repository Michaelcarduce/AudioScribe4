import React, { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  useDisclosure,
  List,
  ListItem,
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Avatar } from "@chakra-ui/avatar";
import ProfileModal from "./ProfileModal";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userdata, setUserdata] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleOpenProfileModal = () => {
    setProfileOpen((prevOpen) => !prevOpen);
  };

  // useEffect(() => {
  //   console.log(profileOpen);
  // }, [profileOpen]);

  const navigate = useNavigate();
  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/authorization");
  };
  const handleSignInClick = () => {
    navigate("/authorization");
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (user) {
      setUserdata(user);
    }
  }, []);

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="rgba(250, 250, 250, 0.9)"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth="1px"
        position="relative"
      >
        <Box
          fontSize="xl"
          fontFamily="Poppins"
          fontWeight="bold"
          css={{
            backgroundImage: "linear-gradient(to left, #7928ca, #ff0080)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            margin: "0 2rem",
          }}
        >
          AudioScribe
        </Box>

        <IconButton
          aria-label="Open menu"
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          size="md"
          variant="ghost"
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
        />
        <Box
          display={{ base: isOpen ? "block" : "none", md: "block" }}
          flexBasis={{ base: "100%", md: "auto" }}
          position={{ base: "absolute", md: "static" }}
          top={{ base: "calc(100% + 10px)", md: "auto" }}
          left={{ base: 0, md: "auto" }}
          right={{ base: 0, md: "auto" }}
          transform={{
            base: isOpen ? "translateY(0)" : "translateY(-100%)",
            md: isOpen ? "translateY(0)" : "none",
            top: isOpen ? "0" : "-10px",
          }}
          transition="transform 0.5s ease-in-out"
          zIndex={1}
          bg="rgba(250, 250, 250, 0.95)"
          borderRadius="5px"
          boxShadow={{ base: "0px 4px 4px rgba(0, 0, 0, 0.25)", md: "none" }}
        >
          <List
            display="flex"
            flexDirection={{ base: "column", md: "row" }}
            alignItems={{ base: "center", md: "flex-start" }}
            justifyContent={{ base: "center", md: "flex-end" }}
            padding="0"
            margin={{ base: "20px 0", md: "0 0" }}
          >
            <ListItem
              listStyleType="none"
              margin={{ base: "10px 0", md: "7px 2.2rem" }}
              opacity={{ base: isOpen ? 1 : 0, md: 1 }}
              animation={`${isOpen ? "navLinkFade 0.5s ease forwards" : ""}`}
            >
              <a className="active home" href="#">
                Home
              </a>
            </ListItem>

            {userdata ? null : (
              <ListItem
                listStyleType="none"
                margin={{ base: "10px 0", md: "7px 2.2rem" }}
                opacity={{ base: isOpen ? 1 : 0, md: 1 }}
                animation={`${
                  isOpen ? "navLinkFade 0.5s ease forwards 0.2s" : ""
                }`}
              >
                <a className="signin" href="#" onClick={handleSignInClick}>
                  Sign in
                </a>
              </ListItem>
            )}

            <ListItem
              listStyleType="none"
              margin={{ base: "10px 0", md: "0 2.2rem" }}
              opacity={{ base: isOpen ? 1 : 0, md: 1 }}
              animation={`${
                isOpen ? "navLinkFade 0.5s ease forwards 0.2s" : ""
              }`}
            >
              {userdata ? (
                <Menu>
                  <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                    <Avatar
                      size="sm"
                      cursor="pointer"
                      name={userdata.user.name}
                    />
                  </MenuButton>
                  <MenuList>
                    <MenuItem onClick={handleOpenProfileModal}>
                      <ProfileModal
                        modalProp={profileOpen}
                        user={userdata.user}
                      >
                        My Profile
                      </ProfileModal>
                    </MenuItem>
                    <MenuDivider />
                    <MenuItem onClick={logoutHandler}>Log out</MenuItem>
                  </MenuList>
                </Menu>
              ) : (
                <Box
                  className="buttonsignup"
                  as="button"
                  background={{ base: "transparent", md: "black" }}
                  color={{ base: "black", md: "white" }}
                  border="1px"
                  borderColor="gray.200"
                  borderRadius="8px"
                  fontWeight="semibold"
                  px="3"
                  py="1"
                  _hover={{
                    borderColor: "gray.900",

                    cursor: "pointer",
                  }}
                  onClick={handleSignInClick}
                >
                  Sign Up
                </Box>
              )}
            </ListItem>
          </List>
        </Box>
      </Box>
    </>
  );
};
export default Nav;
