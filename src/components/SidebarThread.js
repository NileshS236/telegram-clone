import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setThread } from "../features/threadSlice";
import db from "../firebase";
import "../styles/SidebarThread.css";

const SidebarThread = ({ threadName, id }) => {
  const dispatch = useDispatch();
  const [threadInfo, setThreadInfo] = useState([]);

  useEffect(() => {
    db.collection("threads")
      .doc(id)
      .collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setThreadInfo(snapshot.docs.map((doc) => doc.data()))
      );
  }, [id]);

  return (
    <div
      className="sidebarThread"
      onClick={() =>
        dispatch(
          setThread({
            threadId: id,
            threadName: threadName,
          })
        )
      }
    >
      <Avatar src={threadInfo[0]?.photo} />
      <div className="sidebarThread__details">
        <h3>{threadName}</h3>
        <div className="sidebarThread__contents">
          <p>{threadInfo[0]?.message}</p>
        </div>
      </div>
    </div>
  );
};

export default SidebarThread;
