import React, { useEffect, useState } from "react";
// import { useSpeechSynthesis } from "react-speech-kit"; - uninstalled
import axios from "axios";
import { FaUndo as UndoIcon, FaRedo as RedoIcon } from "react-icons/fa";
import "./TextToSpeech.css";

const TextToSpeech = () => {
  // const { speak, speaking, cancel } = useSpeechSynthesis();
  const [text, setText] = useState("");
  const [language, setLanguage] = useState("en");

  const [notes, setNotes] = useState([]);
  const [currentIndexBottom, setCurrentIndexBottom] = useState(0);
  const [historyBottom, setHistoryBottom] = useState([]);
  const [audioconverted, setAudioconverted] = useState("");

  // const stopSpeaking = () => {
  //   if (speaking) {
  //     cancel();
  //   }
  // };

  // const handleTextHighlight = () => {
  //   if (text) {
  //     stopSpeaking();
  //     speak({ text: text });
  //   }
  // };

  // useEffect(() => {
  //   document.addEventListener("mouseup", handleTextHighlight);
  //   return () => {
  //     document.removeEventListener("mouseup", handleTextHighlight);
  //   };
  // });

  const handleConvert = async () => {
    const savedtexts = document.querySelector(".notesstt.notestt");
    const mySavedTexts = savedtexts.textContent;
    // console.log(mySavedTexts);
    setAudioconverted("");
    try {
      const response = await axios.post(
        "/texttospeech",
        {
          text: mySavedTexts,
          language,
        },
        {
          responseType: "blob", // set response type to 'blob' to receive binary data
        }
      );
      const audioBlob = new Blob([response.data], { type: "audio/mpeg" }); // create a blob from the binary data
      const audioUrl = URL.createObjectURL(audioBlob); // create an object URL for the blob
      setAudioconverted(audioUrl); // set the URL as the source for the audio element
    } catch (error) {
      // console.log(error);
    }
  };

  const handleSaveNote = () => {
    // const latestNotes = notes.length > 0 ? notes[notes.length - 1] : [];
    // const newNotes = [...latestNotes, text];
    // setNotes([...notes.slice(0, -1), newNotes]);
    // const latestNotes = notes.length > 0 ? notes[notes.length - 1] : [];
    // const newNotes = [...latestNotes, text];
    // setNotes([newNotes, ...notes.reverse().slice(1)].reverse());

    const newNotes = [...notes, text];
    setNotes(newNotes);
    // console.log(newNotes, "newNotes");
    // console.log(notes, "notes");
    // console.log(text);

    const newHistory = [
      ...historyBottom.slice(0, currentIndexBottom + 1),
      newNotes,
    ];
    setHistoryBottom(newHistory);
    setCurrentIndexBottom(newHistory.length - 1);

    const textarea = document.querySelector(".notestt.currentstt");
    textarea.value = "";
    setText("");

    // console.log(newHistory, "newHistory");
    // console.log(historyBottom, "historyBottom");
    // console.log(currentIndexBottom, "currentIndexBottom");
  };

  //redoundo
  const handleUndoBottom = () => {
    if (currentIndexBottom > 0) {
      setCurrentIndexBottom(currentIndexBottom - 1);
      setNotes(historyBottom[currentIndexBottom - 1]);
    }
    // console.log(currentIndexBottom, "currentIndexBottom");
    // console.log(historyBottom, "historyBottom");
    // console.log(notes, "notes");
  };

  const handleRedoBottom = () => {
    if (currentIndexBottom < historyBottom.length - 1) {
      setCurrentIndexBottom(currentIndexBottom + 1);
      setNotes(historyBottom[currentIndexBottom + 1]);
    }
    // console.log(currentIndexBottom, "currentIndexBottom");
    // console.log(historyBottom, "historyBottom");
    // console.log(notes, "notes");
  };

  return (
    <>
      <h1
        style={{ fontSize: "30px", marginBottom: "0px", textAlign: "center" }}
      >
        Text to Speech Conversion
      </h1>
      <div className="containerstt">
        <div className="childstt top-rightstt">
          <div className="boxstt">
            <textarea
              className="notestt currentstt"
              value={text}
              onChange={(e) => setText(e.target.value)}
            ></textarea>
            <button
              onClick={handleSaveNote}
              disabled={!text}
              className="btnsavenotestt"
            >
              Save Note
            </button>
          </div>
        </div>
        <div className="childstt bottomstt">
          <div className="boxbottomstt">
            <div className="notesstt notenotestt">
              <div className="undo-redo-buttonsstt">
                <button
                  className="undobuttonstt"
                  onClick={handleUndoBottom}
                  disabled={currentIndexBottom <= 0}
                >
                  <UndoIcon size={22} />
                </button>
                <button
                  className="redobuttonstt"
                  onClick={handleRedoBottom}
                  disabled={currentIndexBottom >= historyBottom.length - 1}
                >
                  <RedoIcon size={22} />
                </button>
              </div>
              <h2>Notes</h2>
            </div>
            <div className="notesstt notestt">
              {notes.map((note, index) => (
                <div key={index}>{note}</div>
              ))}
              {/* {notes} */}
            </div>
          </div>
        </div>
        <div className="childstt pitstt">
          <div className="boxpitstt">
            <div className="form-group">
              <label htmlFor="language">Select Language of Voice</label>
              <select
                className="form-control"
                name="language"
                id="language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="af">Afrikaans</option>
                <option value="sq">Albanian</option>
                <option value="ar">Arabic</option>

                <option value="ca">Catalan</option>
                <option value="hr">Croatian</option>
                <option value="cs">Czech</option>
                <option value="da">Danish</option>
                <option value="nl">Dutch</option>
                <option value="en">English</option>

                <option value="fi">Finnish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
                <option value="el">Greek</option>

                <option value="hi">Hindi</option>
                <option value="hu">Hungarian</option>
                <option value="is">Icelandic</option>
                <option value="id">Indonesian</option>
                <option value="it">Italian</option>
                <option value="ja">Japanese</option>

                <option value="ko">Korean</option>
                <option value="la">Latin</option>
                <option value="lv">Latvian</option>

                <option value="no">Norwegian</option>
                <option value="pl">Polish</option>
                <option value="pt">Portuguese</option>

                <option value="ro">Romanian</option>
                <option value="ru">Russian</option>
                <option value="sr">Serbian</option>

                <option value="sk">Slovak</option>

                <option value="es">Spanish</option>

                <option value="sw">Swahili</option>
                <option value="sv">Swedish</option>
                <option value="ta">Tamil</option>

                <option value="th">Thai</option>
                <option value="tr">Turkish</option>

                <option value="vi">Vietnamese</option>
              </select>
            </div>
            <button
              onClick={handleConvert}
              disabled={notes.length === 0}
              className="btnconvertstt"
            >
              Convert
            </button>
            {audioconverted && <audio controls src={audioconverted}></audio>}
          </div>
        </div>
      </div>
    </>
  );
};

export default TextToSpeech;
