import React, { useState, useEffect, useContext } from "react";
import Add from "../img/addAvatar.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";

export default function Register() {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();
  const [img, setImg] = useState(null);
  const [preview, setPreview] = useState(null);

  const { theme, setTheme } = useContext(ThemeContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];
    try {
      //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      //Create a unique image name
      const date = new Date().getTime();
      if (file) {
        const storageRef = ref(storage, `${displayName + date}`);
        await uploadBytesResumable(storageRef, file).then(() => {
          getDownloadURL(storageRef).then(async (downloadURL) => {
            try {
              //Update profile
              await updateProfile(res.user, {
                displayName,
                photoURL: downloadURL,
              });
              //create user on firestore
              await setDoc(doc(db, "users", res.user.uid), {
                uid: res.user.uid,
                displayName,
                email,
                photoURL: downloadURL,
              });
              //create empty user chats on firestore
              await setDoc(doc(db, "userChats", res.user.uid), {});
              navigate("/");
            } catch (err) {
              console.log(err);
              setErr(true);
            }
          });
        });
      } else {
        try {
          //Update profile
          await updateProfile(res.user, {
            displayName,
            photoURL: "https://cdn-icons-png.flaticon.com/512/5087/5087579.png",
          });
          //create user on firestore
          await setDoc(doc(db, "users", res.user.uid), {
            uid: res.user.uid,
            displayName,
            email,
            photoURL: "https://cdn-icons-png.flaticon.com/512/5087/5087579.png",
          });
          //create empty user chats on firestore
          await setDoc(doc(db, "userChats", res.user.uid), {});
          navigate("/");
        } catch (err) {
          console.log(err);
          setErr(true);
        }
      }
    } catch (err) {
      setErr(true);
    }
  };
  function handleChange(file) {
    if (file && file.type.substr(0, 5) === "image") {
      setImg(file);
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

  function deleteImg() {
    setPreview(null);
    setImg(null);
  }

  return (
    <div className={"formContainer" + " " + theme}>
      <div className="formWrapper">
        <span className="logo">Chat</span>
        <span className="title">Регистрация</span>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Укажите имя" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Пароль" />
          <input
            style={{ display: "none" }}
            accept="image/png, image/jpeg"
            type="file"
            id="file"
            onChange={(e) => handleChange(e.target.files[0])}
          />
          <label htmlFor="file">
            <img src={Add} alt="добавить изображение" />{" "}
            <span>Добавить аватар</span>
          </label>
          {preview && (
            <div className="preview">
              <img src={preview} alt="" />
              <i class="uil uil-times-circle" onClick={deleteImg}></i>
            </div>
          )}
          <button>Зарегистрироваться</button>
          {err && <span>Что-то пошло не так</span>}
        </form>
        <p>
          Уже есть аккаунт? <Link to="/login">Войти</Link>
        </p>
      </div>
    </div>
  );
}
