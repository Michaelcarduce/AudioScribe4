import React, { useState } from "react";
import { Flex, Button, Input, Box } from "@chakra-ui/react";
import { AiFillDelete } from "react-icons/ai";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

const ReplaceAudio = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [audioFile, setAudioFile] = useState(null);
  const [isAudioSelected, setIsAudioSelected] = useState(false);
  const [modifiedVideoUrl, setModifiedVideoUrl] = useState(null);
  const toast = useToast();

  const handleVideoUpload = (e) => {
    setVideoFile(e.target.files[0]);
  };

  const handleAudioUpload = (e) => {
    setAudioFile(e.target.files[0]);
    setIsAudioSelected(true);
  };

  const removeAudio = () => {
    setIsAudioSelected(false);
    setAudioFile(null);
    const inputAudioFile = document.querySelector(".chooseaudio");
    inputAudioFile.value = "";
  };

  const handleRemoveAudio = async (e) => {
    setIsAudioSelected(false);
    setAudioFile(null);
    if (!videoFile) {
      toast({
        title: "Choose video to convert ",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    } else {
      e.preventDefault();
      setModifiedVideoUrl(null);
      const formData = new FormData();
      formData.append("video", videoFile);

      try {
        const response = await axios.post("/convert/single", formData, {
          responseType: "blob",
        });
        console.log(response.data);
        setModifiedVideoUrl(URL.createObjectURL(response.data));
        console.log(modifiedVideoUrl);
      } catch (error) {
        console.log(error);
      }

      setVideoFile(null);
      const inputVideoFile = document.querySelector(".choosevideo");
      inputVideoFile.value = "";

      setAudioFile(null);
      const inputAudioFile = document.querySelector(".chooseaudio");
      inputAudioFile.value = "";
    }
  };

  const handleReplaceAudio = async (e) => {
    if (!videoFile || !audioFile) {
      toast({
        title: "Choose video and audio to convert ",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    } else {
      e.preventDefault();
      setModifiedVideoUrl(null);
      const formData = new FormData();
      formData.append("video", videoFile);
      formData.append("audio", audioFile);

      try {
        const response = await axios.post("/convert", formData, {
          responseType: "blob",
        });
        console.log(response.data);
        setModifiedVideoUrl(URL.createObjectURL(response.data));
        console.log(modifiedVideoUrl);
      } catch (error) {
        console.log(error);
      }

      setVideoFile(null);
      const inputVideoFile = document.querySelector(".choosevideo");
      inputVideoFile.value = "";

      setAudioFile(null);
      const inputAudioFile = document.querySelector(".chooseaudio");
      inputAudioFile.value = "";

      setIsAudioSelected(false);
    }
  };

  return (
    <Flex flexDir="column" alignItems="center">
      <Box fontSize="30px" marginBottom="20px" textAlign="center">
        <h1>Remove or Replace Audios' Video</h1>
      </Box>
      <Box
        bg="#f5f5f5"
        w={{ base: "90%", md: "80%", lg: "60%" }}
        borderRadius="md"
        padding="1rem"
        boxShadow="md"
        _hover={{
          backgroundColor: "gray.200",
          transform: "scale(1.05)",
          transition: "all 0.3s ease",
          cursor: "pointer",
          // "&::before": {
          //   content: "'Choose Video'",
          //   position: "absolute",
          //   top: "-30px",
          //   left: "50%",
          //   transform: "translateX(-50%)",
          //   backgroundColor: "#fff",
          //   color: "#007bff",
          //   fontSize: "14px",
          //   padding: "5px",
          //   borderRadius: "5px",
          //   boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
          // },
        }}
      >
        <Flex justifyContent="space-between" alignItems="center">
          {/* <Text fontSize="lg">Upload Video</Text> */}
          <Input
            className="choosevideo"
            type="file"
            textAlign="center"
            accept="video/*"
            onChange={handleVideoUpload}
            sx={{
              position: "relative",
              overflow: "hidden",
              textOverflow: "ellipsis",
              "&::before": {
                content: "'Choose Video'",
                position: "absolute",
                top: "0",
                left: "0",
                display: "block",
                width: "115px",
                height: "100%",
                padding: "0.5rem 0.5rem",
                backgroundColor: "#007cef",
                color: "white",
                borderRadius: "4px",
                cursor: "pointer",
                transition: "all 0.2s ease-in-out",
              },
              "&:hover::before": {
                backgroundColor: "#2c5282",
              },
              "&:active::before": {
                transform: "scale(0.95)",
              },
            }}
          />
        </Flex>
      </Box>
      <Box mt="2rem" />
      <Box
        bg="#f5f5f5"
        w={{ base: "90%", md: "80%", lg: "60%" }}
        borderRadius="md"
        padding="1rem"
        boxShadow="md"
        _hover={{
          backgroundColor: "gray.200",
          transform: "scale(1.05)",
          transition: "all 0.3s ease",
          cursor: "pointer",
        }}
      >
        <Flex justifyContent="space-between" alignItems="center">
          {/* <Text fontSize="lg">Upload Audio</Text> */}
          <Input
            className="chooseaudio"
            type="file"
            accept="audio/*"
            onChange={handleAudioUpload}
            sx={{
              position: "relative",
              overflow: "hidden",
              textOverflow: "ellipsis",
              "&::before": {
                content: "'Choose Audio'",
                position: "absolute",
                top: "0",
                left: "0",
                display: "block",
                width: "115px",
                height: "100%",
                padding: "0.5rem 0.5rem",
                backgroundColor: "#007cef",
                color: "white",
                borderRadius: "4px",
                cursor: "pointer",
                transition: "all 0.2s ease-in-out",
              },
              "&:hover::before": {
                backgroundColor: "#2c5282",
              },
              "&:active::before": {
                transform: "scale(0.95)",
              },
            }}
          />
        </Flex>
        {isAudioSelected && (
          <Button
            variant="ghost"
            colorScheme="red"
            leftIcon={<AiFillDelete />}
            onClick={removeAudio}
            mt="1rem"
            _hover={{ bg: "#888888", color: "brown" }}
          >
            Remove Audio
          </Button>
        )}
      </Box>
      <Box mt="2rem" />
      {isAudioSelected ? (
        <Button
          bg="#007bff"
          color="white"
          // width="80%"
          marginLeft="30%"
          marginRight="30%"
          fontSize="20px"
          mx={{ base: "80%", md: "50%" }}
          minWidth={{ base: "80%", md: "50%" }}
          sx={{
            "&:hover": {
              backgroundImage: "linear-gradient(to left, #7928ca, #ff0080)",
              transform: "scale(1.05)",
              transition: "all 0.3s ease",
              cursor: "pointer",
            },
          }}
          onClick={handleReplaceAudio}
        >
          Replace Audio
        </Button>
      ) : (
        <Button
          bg="#007bff"
          color="white"
          // width="80%"
          marginLeft="30%"
          marginRight="30%"
          fontSize="20px"
          mx={{ base: "80%", md: "50%" }}
          minWidth={{ base: "80%", md: "50%" }}
          sx={{
            "&:hover": {
              backgroundImage: "linear-gradient(to left, #7928ca, #ff0080)",
              // transform: "scale(1.05)",
              // transition: "all 0.3s ease",
              cursor: "pointer",
            },
          }}
          onClick={handleRemoveAudio}
        >
          Remove Audio
        </Button>
      )}
      <Box mt="2rem">
        {modifiedVideoUrl && (
          <video controls>
            <source src={modifiedVideoUrl} type="video/mp4" />
          </video>
        )}
      </Box>
    </Flex>
  );
};

export default ReplaceAudio;
