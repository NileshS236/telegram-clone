import React, { useEffect, useState } from "react";
import "../styles/Sidebar.css";
import { Avatar, IconButton } from "@material-ui/core";
import SidebarThread from "./SidebarThread";
import {
  Add,
  Check,
  PhoneOutlined,
  QuestionAnswerOutlined,
  Settings,
} from "@material-ui/icons";
import db, { auth } from "../firebase";
import { selectUser } from "../features/userSlice";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const user = useSelector(selectUser);
  const [thread, setThread] = useState([]);
  const [threadName, setThreadName] = useState("");

  useEffect(() => {
    db.collection("threads").onSnapshot((snapshot) =>
      setThread(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
  }, []);

  const addThread = () => {
    if (threadName) {
      db.collection("threads").add({
        threadName: threadName,
      });
      setThreadName("");
    } else {
      alert("Enter a Thread name.");
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <div className="sidebar__search">
          <Add className="sidebar__searchIcon" />
          <input
            type="text"
            placeholder="Add Thread"
            value={threadName}
            onChange={(e) => setThreadName(e.target.value)}
            className="sidebar__input"
          />
        </div>
        <IconButton variant="outlined" id="sidebar__button">
          <Check type="submit" onClick={addThread} />
        </IconButton>
      </div>
      <div className="sidebar__threads">
        {thread.map(({ id, data: { threadName } }) => (
          <SidebarThread key={id} id={id} threadName={threadName} />
        ))}
      </div>
      <div className="sidebar__bottom">
        <Avatar
          src={user?.photo}
          className="sidebar__bottom__avatar"
          onClick={() => auth.signOut()}
        />
        <IconButton>
          <PhoneOutlined />
        </IconButton>
        <IconButton>
          <QuestionAnswerOutlined />
        </IconButton>
        <IconButton>
          <Settings />
        </IconButton>
      </div>
    </div>
  );
};

export default Sidebar;
