import React, { useState, useContext, useEffect } from "react";
import Message from "./Message";
import { ChatContext } from "../context/ChatContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);
  const [previewImg, setPreviewImg] = useState(null);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);

  function handleClick() {
    setPreviewImg(null);
  }

  return (
    <div className="messages">
      {messages.map((m) => {
        return <Message setPreview={setPreviewImg} message={m} key={m.id} />;
      })}
      {previewImg && (
        <div className="previewImg" onClick={handleClick}>
          <img
            src={previewImg.src}
            alt=""
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
