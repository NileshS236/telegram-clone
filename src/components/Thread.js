import { Avatar, IconButton } from "@material-ui/core";
import { MoreHoriz } from "@material-ui/icons";
import React, { useState } from "react";
import "../styles/Thread.css";

const Thread = () => {
  const [input, setInput] = useState("");

  const sendMessage = (e) => {
    e.preventDefault();

    setInput("");
  };

  return (
    <div className="thread">
      <div className="thread__header">
        <div className="thread__header__contents">
          <Avatar />
          <div className="thread__header__contents__info">
            <h4>ThreadName</h4>
            <h5>Last Seen</h5>
          </div>
        </div>
        <IconButton>
          <MoreHoriz className="thread__header__details" />
        </IconButton>
      </div>
      <div className="thread__messages"></div>
      <div className="thread__input">
        <input
          type="text"
          placeholder="Write Message ..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit" onClick={sendMessage}>
          Send Message
        </button>
      </div>
    </div>
  );
};

export default Thread;
