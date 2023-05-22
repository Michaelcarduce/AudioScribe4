import React, { useEffect, useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import Authorization from "./Pages/Authorization";

import io from "socket.io-client";
const endpoint = "http://localhost:5000";
// const endpoint = "http://165.22.76.202:5000";
var socket;

function App() {
  const [userData, setUserdata] = useState({ user: { _id: "0" } });
  const [socketConnected, setSocketConnected] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (user) {
      setUserdata(user);
    }
  }, []);

  useEffect(() => {
    socket = io(endpoint);
    if (userData.user._id !== "0") {
      socket.emit("setup", userData);
    }
    socket.on("connected", () => setSocketConnected(true));
    return () => {
      socket.disconnect();
    };
  }, [userData]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/authorization" element={<Authorization />} />
      </Routes>
    </div>
  );
}

export default App;
