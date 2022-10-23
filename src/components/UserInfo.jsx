import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import Add from "../img/addAvatar.png";
import { updateProfile } from "firebase/auth";
import { storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function UserInfo({ closeInfo }) {
  const [err, setErr] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const [preview, setPreview] = useState(null);
  const [img, setImg] = useState(null);

  function handleChange(file) {
    if (file && file.type.substr(0, 5) === "image") {
      setImg(file);
    }
  }
  function deleteImg() {
    setPreview(null);
    setImg(null);
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

  async function changeImg() {
    const { displayName } = currentUser;
    const date = new Date().getTime();
    const storageRef = ref(storage, `${displayName + date}`);

    await uploadBytesResumable(storageRef, img).then(() => {
      getDownloadURL(storageRef).then(async (downloadURL) => {
        try {
          //Update profile
          await updateProfile(currentUser, {
            photoURL: downloadURL,
          });
          //
          const userRef = doc(db, "users", `${currentUser.uid}`);
          await updateDoc(userRef, {
            photoURL: downloadURL,
          });
          //
          setPreview(false);
          window.location.reload();
        } catch (err) {
          console.log(err);
          setErr(true);
        }
      });
    });
  }

  return (
    <div className="info" onClick={closeInfo}>
      <div className="infoBody" onClick={(e) => e.stopPropagation()}>
        <div className="closeInfo">
          <i class="uil uil-times-circle" onClick={closeInfo}></i>
        </div>
        <div className="infoTitle">Личный кабинет</div>
        <div className="userInfo">
          <div className="userName">
            <span>Имя: </span>
            {currentUser.displayName}
          </div>
          <div className="userEmail">
            <span>Email: </span>
            {currentUser.email}
          </div>
          <div className="userPhoto">
            <img src={currentUser.photoURL} alt="" />
          </div>
          <input
            style={{ display: "none" }}
            accept="image/png, image/jpeg"
            type="file"
            id="file"
            onChange={(e) => handleChange(e.target.files[0])}
          />
          <label htmlFor="file">
            <img src={Add} alt="добавить изображение" />{" "}
            <span>Изменить аватар</span>
          </label>
          {preview && (
            <div className="preview">
              <img src={preview} alt="" />
              <i class="uil uil-times-circle" onClick={deleteImg}></i>
            </div>
          )}
          {preview && (
            <div className="changeImg">
              <button onClick={changeImg}>Применить</button>
            </div>
          )}
          {err && <span>Что-то пошло не так</span>}
        </div>
      </div>
    </div>
  );
}
