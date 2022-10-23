import React, { useContext, useEffect, useRef, useState } from "react";
import Img from "../img/img.png";
import Attach from "../img/attach.png";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

export default function Input() {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const [preview, setPreview] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const btn = useRef(null);

  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());
      btn.current.disabled = true;
      await uploadBytesResumable(storageRef, img).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          } catch (err) {
            //TODO:Handle Error
          }
        });
      });
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);
  };
  function handleKeyDown(e) {
    if (e.code === "Enter" && text.length > 0) {
      handleSend();
    }
  }

  useEffect(() => {
    if (img) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(img);
    } else {
      setPreview(null);
    }
  }, [img]);

  function handleChange(file) {
    if (file && file.type.substr(0, 5) === "image") {
      setImg(file);
    }
  }
  function deleteImg() {
    setPreview(null);
    setImg(null);
  }

  return (
    <div className="inputBody">
      {preview && (
        <div className="preview">
          <img src={preview} alt="" />
          <i class="uil uil-times-circle" onClick={deleteImg}></i>
        </div>
      )}
      <div className="input">
        <input
          value={text}
          type="text"
          placeholder="Введите что-нибудь..."
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e)}
        />
        <div className="send">
          <img className="attach" src={Attach} alt="" />
          <input
            type="file"
            style={{ display: "none" }}
            id="file"
            accept="image/png, image/gif, image/jpeg"
            onChange={(e) => handleChange(e.target.files[0])}
          />
          <label htmlFor="file">
            <img src={Img} alt="" />
          </label>
          <button
            ref={btn}
            onClick={handleSend}
            disabled={text.length === 0 && img === null}
          >
            Отправить
          </button>
        </div>
      </div>
    </div>
  );
}
