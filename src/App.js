import React from "react";
import EmailTools from "./pages/EmailTools";
import ChatRoom from "./pages/ChatRoom";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import "./index.css";
import NavBar from "./Components/NavBar";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<EmailTools />} />
        <Route path="/chat" element={<ChatRoom />} />
      </Routes>
    </Router>
  );
}

export default App;
