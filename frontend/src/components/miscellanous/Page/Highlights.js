// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import "./Highlights.css";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";

// const SpeechRecognition =
//   window.SpeechRecognition || window.webkitSpeechRecognition;
// const recognition = new SpeechRecognition();

// const Highlights = () => {
//   const [audioFile, setAudioFile] = useState(null);
//   const [isListening, setIsListening] = useState(false);
//   const [transcriptedFile, setTranscriptedFile] = useState("");
//   const [result, setResult] = useState(null);
//   const highlightsRef = useRef(null);

//   const stopListening = () => {
//     setIsListening(false);
//     recognition.stop();
//     recognition.onend = () => {
//       console.log("Stopped Mic on Click");
//     };
//   };

//   useEffect(() => {
//     handleTranscription();
//   }, [isListening]);

//   const handleUpload = (event) => {
//     const audioFile = event.target.files[0];
//     setAudioFile(audioFile);
//   };

//   let audioElement;
//   const handleTranscription = () => {
//     if (!isListening) {
//       recognition.stop();
//       recognition.onend = () => {
//         console.log("Stopped Mic on Click");
//       };
//       return;
//     }
//     setTranscriptedFile("");
//     setResult(null);
//     // recognition.start();
//     // recognition.onend = () => {
//     //   console.log("continue..");
//     //   recognition.start();
//     // };

//     // recognition.onstart = () => {
//     //   console.log("Mics on");
//     // };

//     audioElement = document.createElement("audio");
//     audioElement.src = URL.createObjectURL(audioFile);
//     audioElement.controls = true;
//     audioElement.autoplay = true;
//     document.getElementById("audioPlayer").appendChild(audioElement);
//     audioElement.addEventListener("ended", () => {
//       stopListening();
//       audioElement.remove();
//       setAudioFile(null);
//       const inputElement = document.querySelector(".choosevideohighlights");
//       if (inputElement) {
//         inputElement.value = "";
//       }
//     });

//     recognition.lang = "en-US";
//     recognition.continuous = true;
//     recognition.interimResults = true;

//     recognition.onresult = (event) => {
//       let interimTranscription = "";
//       let finalTranscription = "";
//       for (let i = event.resultIndex; i < event.results.length; i++) {
//         const transcript = event.results[i][0].transcript;
//         console.log(transcript, "transcript");
//         if (event.results[i].isFinal) {
//           finalTranscription += transcript;
//         } else {
//           interimTranscription += transcript;
//           console.log(interimTranscription, "interimTranscription");
//         }
//         //  setTranscriptedFile(transcript);
//       }

//       // working code
//       setTranscriptedFile((prevTranscriptedFile) =>
//         prevTranscriptedFile === ""
//           ? finalTranscription
//           : prevTranscriptedFile + " " + finalTranscription
//       );
//       //
//     };

//     // recognition.onresult = (event) => {
//     //   const transcript = Array.from(event.results)
//     //     .map((result) => result[0])
//     //     .map((result) => result.transcript)
//     //     .join("");
//     //   console.log(transcript);
//     //   setTranscriptedFile(transcript);
//     //   recognition.onerror = (event) => {
//     //     console.log(event.error);
//     //   };
//     // };

//     recognition.start();
//   };

//   useEffect(() => {
//     if (transcriptedFile === "") {
//       return console.log("transcriptedFile is empty");
//     }

//     setResult(null);
//     // console.log(result);

//     // console.log(transcriptedFile, "transcriptedFile,useEffect");
//     const analyzeSentiment = async () => {
//       try {
//         const response = await axios.post("/sentiment", {
//           text: transcriptedFile,
//         });
//         const tempResult = response.data;
//         // console.log(tempResult);
//         setResult(tempResult);
//         // console.log(result);

//         // console.log(transcriptedFile);
//       } catch (error) {
//         console.error("Error:", error.message);
//       }
//     };
//     analyzeSentiment();
//   }, [transcriptedFile]);

//   // useEffect(() => {
//   //   console.log(result, "resultuseEffect2");
//   // }, [result]);

//   const words = transcriptedFile.trim().split(" ");

//   const handleDownload = async () => {
//     const bottomHighlights = document.querySelector(".bottomhighlights");
//     const clone = bottomHighlights.cloneNode(true);
//     clone.style.width = "500px";
//     clone.style.height = "auto";
//     clone.style.whiteSpace = "normal";
//     const boxBottomHighlights = clone.querySelector(".boxbottomhighlights");
//     boxBottomHighlights.style.height = "auto";
//     boxBottomHighlights.style.whiteSpace = "normal";
//     const notesHighlights = clone.querySelector(".noteshighlights");
//     notesHighlights.style.height = "auto";
//     notesHighlights.style.whiteSpace = "normal";
//     document.body.appendChild(clone);

//     const canvas = await html2canvas(clone, { scale: 2 });

//     document.body.removeChild(clone);

//     const imgData = canvas.toDataURL("image/png");

//     const pageWidth = canvas.width;

//     const pageHeight = (pageWidth / canvas.width) * canvas.height;

//     const pdf = new jsPDF({
//       orientation: "portrait",
//       unit: "pt",
//       format: [pageWidth, pageHeight],
//     });

//     const width = pdf.internal.pageSize.getWidth();
//     const height = (width / canvas.width) * canvas.height;
//     pdf.addImage(imgData, "PNG", 0, 0, width, height);

//     pdf.save("download.pdf");
//   };

//   return (
//     <>
//       <h1
//         style={{
//           fontSize: "30px",
//           marginBottom: "20px",
//           textAlign: "center",
//         }}
//       >
//         Word Highlighter
//       </h1>
//       <div className="boxhighlights">
//         <input
//           className="choosevideohighlights"
//           type="file"
//           accept="audio/*"
//           onChange={handleUpload}
//         />
//       </div>
//       <div className="boxmiddlehighlights middle">
//         {!isListening ? (
//           <button
//             disabled={!audioFile}
//             className="btntranscribe"
//             // onClick={handleTranscription}
//             onClick={() => setIsListening((prevState) => !prevState)}
//           >
//             Transcribe
//           </button>
//         ) : (
//           <button
//             disabled={!audioFile}
//             className="btntranscribe"
//             onClick={() => {
//               setIsListening((prevState) => !prevState);
//               const audioElement = document.querySelector("audio");
//               if (audioElement) {
//                 audioElement.pause();
//                 audioElement.parentNode.removeChild(audioElement);
//               }
//             }}
//           >
//             Terminate
//           </button>
//         )}
//       </div>
//       {audioFile && (
//         <div id="audioPlayer" className="boxmiddle2highlights"></div>
//       )}
//       <div className="childhighlights bottomhighlights">
//         <div className="boxbottomhighlights">
//           <div className="noteshighlights notenotehighlights">
//             <h2>Notes</h2>
//           </div>
//           <div className="noteshighlights notehighlights" ref={highlightsRef}>
//             {transcriptedFile
//               .trim()
//               .split("\n")
//               .map((line, lineIndex) => (
//                 <p key={lineIndex}>
//                   {line
//                     .split(" ")
//                     .filter((word) => word !== "") // Remove empty words
//                     .map((word, wordIndex) => {
//                       if (result?.positive.includes(word)) {
//                         return (
//                           <span className="positive" key={wordIndex}>
//                             {word}
//                           </span>
//                         );
//                       } else if (result?.negative.includes(word)) {
//                         return (
//                           <span className="negative" key={wordIndex}>
//                             {word}
//                           </span>
//                         );
//                       } else {
//                         return (
//                           <span className="word" key={wordIndex}>
//                             {word}
//                           </span>
//                         );
//                       }
//                     })}
//                 </p>
//               ))}
//           </div>
//         </div>
//       </div>
//       <div className="boxmiddlehighlights bottom">
//         <button
//           disabled={!transcriptedFile}
//           className="btntranscribe"
//           onClick={handleDownload}
//         >
//           Download PDF
//         </button>
//       </div>
//     </>
//   );
// };

// export default Highlights;

import React, { useState } from "react";
import "./Highlights.css";
import { AiFillDelete } from "react-icons/ai";

const Highlights = () => {
  const [inputText, setInputText] = useState("");
  const [spokenIndex, setSpokenIndex] = useState(-1);
  const [inputFile, setInputFile] = useState(false);

  const handleTest = (startIndex = 0) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const words = inputText.split(" ");
      const textToSpeak = words.slice(startIndex).join(" ");
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      let wordIndex = startIndex;
      utterance.onboundary = (event) => {
        if (event.name === "word") {
          setSpokenIndex(wordIndex);
          wordIndex++;
        }
      };
      utterance.onend = () => {
        setSpokenIndex(-1);
      };
      window.speechSynthesis.speak(utterance);
    } else {
      console.log(
        "speechSynthesis does not supported in your browser try updating your browser"
      );
    }
  };

  const words = inputText.split(" ");
  const handleMouseOver = (event) => {
    event.target.style.background = "black";
    event.target.style.color = "brown";
  };

  const handleMouseOut = (event) => {
    event.target.style.background = "";
    event.target.style.color = "";
  };

  const handleRemove = () => {
    window.speechSynthesis.cancel();
    setInputText("");
    const inputElement = document.querySelector(".inputtext");
    if (inputElement) {
      inputElement.value = "";
    }
  };
  return (
    <>
      <h1
        style={{
          fontSize: "30px",
          marginBottom: "20px",
          textAlign: "center",
        }}
      >
        Word Highlighter
      </h1>
      <div className="container">
        <input
          className="inputtext"
          type="text"
          onChange={(event) => {
            setInputText(event.target.value);
            setInputFile(true);
          }}
        />
        <button
          disabled={!inputFile}
          className="btnhighlight"
          onClick={() => {
            handleTest();
            const inputElement = document.querySelector(".inputtext");
            if (inputElement) {
              inputElement.value = "";
            }
            setInputFile(false);
          }}
        >
          Start Highlight
        </button>
        <div className="boxbottomhighlights">
          <div className="noteshighlights notenotehighlights">
            <button
              variant="ghost"
              colorscheme="red"
              className="remove"
              style={{ marginTop: "1rem" }}
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}
              onClick={handleRemove}
            >
              <AiFillDelete />
              <p className="terminate">Terminate</p>
            </button>
          </div>
          <div className="noteshighlights notehighlights">
            {inputText === ""
              ? null
              : words.map((word, index) => (
                  <span
                    key={index}
                    style={
                      index === spokenIndex
                        ? { backgroundColor: "yellow", color: "black" }
                        : {}
                    }
                    onClick={() => handleTest(index)}
                  >
                    {word}{" "}
                  </span>
                ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Highlights;
//
