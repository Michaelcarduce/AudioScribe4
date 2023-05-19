import React from "react";
import Nav from "../components/miscellanous/Nav";
import Sidebar from "../components/miscellanous/Sidebar";
import { Box } from "@chakra-ui/layout";

// import { useState } from "react";

const Homepage = () => {
  // const user = "Users Name";
  // const [activePage, setActivePage] = useState(null);

  return (
    <div style={{ width: "100%" }}>
      <Nav
        style={{ height: "calc(100vh - 91.5vh - 64px)", marginBottom: "auto" }}
      />
      <Box display="flex" justifyContent="space-between" w="100%" h="91.5vh">
        <Sidebar />
      </Box>
      {/* <Box display="flex" justifyContent="space-between" w="100%" h="91.5vh">
        <Sidebar setActivePage={setActivePage} />
        <Box flex={1}>
          {activePage === "tts" && <tts />}
        </Box>
      </Box> */}
    </div>
  );
};

export default Homepage;
