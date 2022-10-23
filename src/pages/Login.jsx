import React, { useState, useContext } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";

export default function Login() {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const { theme, setTheme } = useContext(ThemeContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setErr(true);
    }
  };

  return (
    <div className={"formContainer" + " " + theme}>
      <div className="formWrapper">
        <span className="logo">Chat</span>
        <span className="title">Авторизация</span>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Пароль" />
          <button>Войти</button>
          {err && <span>Что-то пошло не так</span>}
        </form>
        <p>
          У вас нет аккаунта? <Link to="/register">Регистрация</Link>{" "}
        </p>
      </div>
    </div>
  );
}
