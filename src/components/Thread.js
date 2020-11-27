import { Avatar, IconButton } from "@material-ui/core";
import {
  AttachFile,
  EmojiEmotions,
  MicNone,
  MoreHoriz,
  Timer,
} from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import Message from "./Message";
import SendIcon from "@material-ui/icons/Send";
import "../styles/Thread.css";
import db from "../firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import firebase from "firebase";
import { selectThreadId, selectThreadName } from "../features/threadSlice";
import * as timeago from "timeago.js";

const Thread = () => {
  const user = useSelector(selectUser);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const threadName = useSelector(selectThreadName);
  const threadId = useSelector(selectThreadId);
  const [notEmpty, setNotEmpty] = useState(false);
  const [selfDestruct, setSelfDestruct] = useState(0);

  useEffect(() => {
    if (threadId) {
      db.collection("threads")
        .doc(threadId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setMessages(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        );
    }
  }, [threadId]);

  const sendMessage = (e) => {
    e.preventDefault();
    handleTimeOut(input, user.uid);
    if (threadId) {
      db.collection("threads").doc(threadId).collection("messages").add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        message: input,
        uid: user.uid,
        photo: user.photo,
        email: user.email,
        displayName: user.displayName,
      });
      setInput("");
    }
  };

  useEffect(() => {
    if (input !== "") setNotEmpty(true);
    else setNotEmpty(false);
  }, [input]);

  const startTimeOut = (input, uid) => {
    console.log("this worked");
    setSelfDestruct(0);
    if (threadId) {
      db.collection("threads")
        .doc(threadId)
        .collection("messages")
        .where("message", "==", input)
        .where("uid", "==", uid)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            doc.ref
              .delete()
              .then(() => {
                console.log("message deleted successfully");
              })
              .catch(function (err) {
                console.error("error removing message===>", err);
              });
          });
        });
    }
  };

  const handleTimeOut = (input, uid) => {
    console.log(selfDestruct);
    if (selfDestruct !== null && selfDestruct !== "" && selfDestruct > 0) {
      setTimeout(() => startTimeOut(input, uid), parseInt(selfDestruct));
    }
  };

  return (
    <div className="thread">
      <div className="thread__header">
        {threadName && (
          <>
            <div className="thread__header__contents">
              <Avatar src={messages[0]?.data?.photo} />
              <div className="thread__header__contents__info">
                <h4>{threadName}</h4>
                <h5>
                  Last Seen{" "}
                  {timeago.format(
                    new Date(messages[0]?.data.timestamp?.toDate())
                  )}
                </h5>
              </div>
            </div>
            <div>
              <IconButton>
                <AttachFile className="thread__header__files" />
              </IconButton>
              <IconButton>
                <MoreHoriz className="thread__header__details" />
              </IconButton>
            </div>
          </>
        )}
      </div>
      <div className="thread__messages">
        {messages.map(({ id, data }) => (
          <Message key={id} data={data} />
        ))}
      </div>
      <div className="thread__input">
        <IconButton type="submit">
          <EmojiEmotions />
        </IconButton>
        <input
          type="text"
          className="thread__message"
          placeholder="Write Message ..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <IconButton
          onClick={() =>
            setSelfDestruct(
              prompt("Enter the delay in seconds to self destruct the message.")
            )
          }
        >
          <Timer />
        </IconButton>
        {(notEmpty && (
          <IconButton type="submit" onClick={sendMessage}>
            <SendIcon />
          </IconButton>
        )) || (
          <IconButton>
            <MicNone />
          </IconButton>
        )}
      </div>
    </div>
  );
};

export default Thread;
