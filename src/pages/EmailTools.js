import React from "react";
import Editor from "../Components/chatroom/Editor";
import UrlToTitle from "../Components/chatroom/UrlToTitle";

export default function EmailTools() {
  return (
    <div className="App">
      <header className="App-header">
        <Editor />
        <UrlToTitle />
      </header>
    </div>
  );
}
