import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

export default function Message({ message, setPreview }) {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const [diff, setDiff] = useState();

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);
  useEffect(() => {
    formatDate(message);
  }, [message]);

  function formatDate(message) {
    const timestamp = parseInt(message.date.seconds) * 1000;
    const date = new Date(timestamp);

    let dayOfMonth = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let hour = date.getHours();
    let minutes = date.getMinutes();
    let diffMs = new Date() - date;
    let diffSec = Math.round(diffMs / 1000);
    let diffMin = Math.round(diffSec / 60);
    let diffHour = Math.round(diffMin / 60);

    // форматирование
    year = year.toString().slice(-2);
    month = month < 10 ? "0" + month : month;
    dayOfMonth = dayOfMonth < 10 ? "0" + dayOfMonth : dayOfMonth;
    hour = hour < 10 ? "0" + hour : hour;
    minutes = minutes < 10 ? "0" + minutes : minutes;

    if (diffSec < 10) {
      setDiff("сейчас");
      return;
    } else if (diffMin < 1) {
      setDiff(`${diffSec} с.`);
      return;
    } else if (diffHour < 1) {
      setDiff(`${diffMin} м.`);
      return;
    } else if (diffHour >= 1 && diffHour < 24) {
      setDiff(`${diffHour} ч.`);
      return;
    } else {
      setDiff(`${dayOfMonth}.${month} ${hour}:${minutes}`);
      return;
    }
  }

  return (
    <div
      ref={ref}
      className={`message ${message.senderId === currentUser.uid && "owner"}`}
    >
      <div className="messageInfo">
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
        />
        <span>{diff}</span>
      </div>
      <div className="messageContent">
        {message.text && <p>{message.text}</p>}
        {message.img && (
          <img src={message.img} alt="" onClick={(e) => setPreview(e.target)} />
        )}
      </div>
    </div>
  );
}
