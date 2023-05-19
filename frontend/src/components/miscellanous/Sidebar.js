import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  useMediaQuery,
} from "@chakra-ui/react";
import Tts from "./Page/Tts";
import Stt from "./Page/Stt";
import Highlights from "./Page/Highlights";
import ReplaceAudio from "./Page/ReplaceAudio";
import { FiMic, FiSpeaker } from "react-icons/fi";
import { BiHighlight, BiCut } from "react-icons/bi";

function Sidebar() {
  const [isLargerThanBase] = useMediaQuery("(min-width: 770px)");
  return (
    <Tabs isLazy style={{ display: "flex", width: "100vw", height: "100%" }}>
      <TabList
        style={{
          flex: isLargerThanBase ? "0 0 250px" : "0 0 0px",
          marginRight: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          borderRight: "1px solid #ccc",
          padding: "10px",
          background: "#f7f7f7",
        }}
      >
        <Tab style={{ marginBottom: "30px", marginTop: "100px" }}>
          <>
            {isLargerThanBase ? (
              <>
                <FiMic
                  size={20}
                  style={{ marginRight: "20px", fontWeight: "bold" }}
                />
                STT Transcription
              </>
            ) : (
              <FiMic
                size={20}
                style={{ marginRight: "0", fontWeight: "bold" }}
              />
            )}
          </>
        </Tab>
        <Tab style={{ marginBottom: "30px" }}>
          <>
            {isLargerThanBase ? (
              <>
                <FiSpeaker
                  size={20}
                  style={{ marginRight: "20px", fontWeight: "bold" }}
                />
                TTS Conversion
              </>
            ) : (
              <FiSpeaker
                size={20}
                style={{ marginRight: "0", fontWeight: "bold" }}
              />
            )}
          </>
        </Tab>
        <Tab style={{ marginBottom: "30px" }}>
          <>
            {isLargerThanBase ? (
              <>
                <BiHighlight
                  size={20}
                  style={{ marginRight: "20px", fontWeight: "bold" }}
                />
                Word Highlight
              </>
            ) : (
              <BiHighlight
                size={20}
                style={{ marginRight: "0", fontWeight: "bold" }}
              />
            )}
          </>
        </Tab>
        <Tab style={{ marginBottom: "30px" }}>
          <>
            {isLargerThanBase ? (
              <>
                {" "}
                <BiCut
                  size={20}
                  style={{ marginRight: "10px", fontWeight: "bold" }}
                />
                Replace/Remove Audio
              </>
            ) : (
              <BiCut
                size={20}
                style={{ marginRight: "0", fontWeight: "bold" }}
              />
            )}
          </>
        </Tab>
      </TabList>
      <TabPanels style={{ flex: "1" }}>
        <TabPanel>
          <Tts />
        </TabPanel>
        <TabPanel>
          <Stt />
        </TabPanel>
        <TabPanel>
          <Highlights />
        </TabPanel>
        <TabPanel>
          <ReplaceAudio />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
export default Sidebar;
