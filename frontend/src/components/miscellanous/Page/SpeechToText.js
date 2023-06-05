import React, { useEffect, useState, useRef } from "react";
import { useToast } from "@chakra-ui/react";
import { FaUndo as UndoIcon, FaRedo as RedoIcon } from "react-icons/fa";
import "./SpeechToText.css";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const mic = new SpeechRecognition();

mic.continuous = true;
mic.interimResults = true;
mic.lang = "en-US";

const SpeechToText = () => {
  const [isListening, setIsListening] = useState(false);
  const [note, setNote] = useState(null);
  // const [savedNotes, setSavedNotes] = useState([]);
  const textBoxRef = useRef(null);
  const toast = useToast();
  //redoundo
  // const [currentIndex, setCurrentIndex] = useState(-1);
  // const [history, setHistory] = useState([]);

  useEffect(() => {
    handleListen();
  }, [isListening]);

  const handleListen = () => {
    if (typeof SpeechRecognition === "undefined") {
      toast({
        title: "SpeechRecognition is not supported in your browser!",
        description: "Try Updating Your Browser",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    if (isListening) {
      mic.start();
      mic.onend = () => {
        // console.log("continue..");
        mic.start();
      };
    } else {
      mic.stop();
      mic.onend = () => {
        // console.log("Stopped Mic on Click");
      };
    }
    mic.onstart = () => {
      // console.log("Mics on");
    };

    mic.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");
      // console.log(transcript);
      setNote(transcript);
      mic.onerror = (event) => {
        // console.log(event.error);
      };
    };
  };

  // const handleSaveNote = () => {
  //   console.log(note);
  //   stopListening();
  //   setSavedNotes([...savedNotes, note]);
  //   console.log(savedNotes);
  //   //redoundo
  //   const newHistory = [...history.slice(0, currentIndex + 1), note];
  //   setHistory(newHistory);
  //   setCurrentIndex(newHistory.length - 1);

  //   setTimeout(() => {
  //     setNote(null);
  //     console.log(note);
  //     textBoxRef.current.value = "";
  //   }, 1000);
  // };

  //redoundo
  // const handleUndo = () => {
  //   if (currentIndex > 0) {
  //     setCurrentIndex(currentIndex - 1);
  //     setNote(history[currentIndex - 1]);
  //     // setSavedNotes(history[currentIndex - 1]);
  //   }
  // };

  // const handleRedo = () => {
  //   if (currentIndex < history.length - 1) {
  //     setCurrentIndex(currentIndex + 1);
  //     setNote(history[currentIndex + 1]);
  //     // setSavedNotes(history[currentIndex + 1]);
  //   }
  // };

  const stopListening = () => {
    setIsListening(false);
    mic.stop();
    mic.onend = () => {
      // console.log("Stopped Mic on Click");
    };
  };

  ////////

  const [savedNotesBottom, setSavedNotesBottom] = useState([]);
  const [historyBottom, setHistoryBottom] = useState([]);
  const [currentIndexBottom, setCurrentIndexBottom] = useState(-1);

  const handleSaveNotesBottom = () => {
    stopListening();
    const newNotes = [...savedNotesBottom, note];
    setSavedNotesBottom(newNotes);

    const newHistory = [
      ...historyBottom.slice(0, currentIndexBottom + 1),
      newNotes,
    ];
    setHistoryBottom(newHistory);
    setCurrentIndexBottom(newHistory.length - 1);

    setTimeout(() => {
      setNote(null);
      // console.log(note);
      textBoxRef.current.value = "";
    }, 1000);
  };
  //redoundo
  const handleUndoBottom = () => {
    if (currentIndexBottom > 0) {
      setCurrentIndexBottom(currentIndexBottom - 1);
      setSavedNotesBottom(historyBottom[currentIndexBottom - 1]);
    }
  };

  const handleRedoBottom = () => {
    if (currentIndexBottom < historyBottom.length - 1) {
      setCurrentIndexBottom(currentIndexBottom + 1);
      setSavedNotesBottom(historyBottom[currentIndexBottom + 1]);
    }
  };

  return (
    <>
      <h1
        style={{ fontSize: "30px", marginBottom: "20px", textAlign: "center" }}
      >
        Speech to Text Transcription
      </h1>

      <div className="container">
        <div className="child top-left">
          <button
            onClick={() => setIsListening((prevState) => !prevState)}
            className="btnstartstop"
          >
            {isListening ? <span>🎙️ Stop</span> : <span>🛑🎙️ Start</span>}
          </button>
        </div>
        <div className="child top-right">
          <div className="box">
            <div className="note current">
              {/* <div className="undo-redo-buttons-current">
                <button onClick={handleUndo} disabled={currentIndexBottom <= 0}>
                  <UndoIcon size={13} />
                </button>
                <button
                  onClick={handleRedo}
                  disabled={currentIndexBottom >= historyBottom.length - 1}
                >
                  <RedoIcon size={13} />
                </button>
              </div> */}
              <p className="transcripted" ref={textBoxRef}>
                {note}
              </p>
            </div>

            <button
              onClick={handleSaveNotesBottom}
              disabled={!note}
              className="btnsavenote"
            >
              Save Note
            </button>
          </div>
        </div>
        <div className="child bottom">
          <div className="boxbottom">
            <div className="notes notenote">
              <div className="undo-redo-buttons">
                <button
                  className="undobutton"
                  onClick={handleUndoBottom}
                  disabled={currentIndexBottom <= 0}
                >
                  <UndoIcon size={22} />
                </button>
                <button
                  className="redobutton"
                  onClick={handleRedoBottom}
                  // disabled={currentIndexBottom >= historyBottom.length - 1}
                >
                  <RedoIcon size={22} />
                </button>
              </div>
              <h2>Notes</h2>
            </div>
            <div className="notes note">
              {savedNotesBottom.map((n) => (
                <p key={n}>{n}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SpeechToText;
