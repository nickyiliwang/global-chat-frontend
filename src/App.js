import React from "react";
import EmailTools from "./pages/EmailTools";
import ChatRoom from "./pages/ChatRoom";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul style={{ display: "flex" }}>
            <li style={{ display: "flex", paddingLeft: "20px" }}>
              <Link to="/">Email Tools</Link>
            </li>
            <li style={{ display: "flex", paddingLeft: "20px" }}>
              <Link to="/chat">ChatRoom</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<EmailTools />} />
          <Route path="/chat" element={<ChatRoom />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
