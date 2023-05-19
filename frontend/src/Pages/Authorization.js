import React from "react";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";
import {
  Container,
  Box,
  Text,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";

const Authorization = () => {
  return (
    <Box bg="black" w="100vw" h="100vh">
      <Container maxW="sm" centerContent>
        <Box
          display="flex"
          justifyContent="center"
          p={3}
          bg="rgba(250, 250, 250, 0.9)"
          w="100%"
          m="40px 0 15px 0"
          borderRadius="lg"
          borderWidth="1px"
        >
          <Text
            fontSize="xl"
            fontFamily="Poppins"
            fontWeight="bold"
            bgGradient="linear(to-l, #7928CA,#FF0080)"
            bgClip="text"
            margin="0 2rem"
            // fontSize="4xl"
            // fontFamily="Poppins"
            // color="black"
            // fontWeight="bold"
          >
            AudioScribe
          </Text>
        </Box>

        <Box
          bg="rgba(250, 250, 250, 0.95)"
          w="100%"
          p={4}
          borderRadius="lg"
          color="black"
          borderWidth="1px"
        >
          <Tabs variant="soft-rounded">
            <TabList mn="1em">
              <Tab width="50%" color="black">
                Login
              </Tab>
              <Tab width="50%" color="black">
                Sign Up
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Login />
              </TabPanel>
              <TabPanel>
                <Signup />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Container>
    </Box>
  );
};

export default Authorization;
