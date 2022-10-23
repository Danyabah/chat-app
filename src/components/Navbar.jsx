import { signOut } from "firebase/auth";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { auth } from "../firebase";
import { ThemeContext } from "../context/ThemeContext";
import ModalTheme from "./ModalTheme";
import UserInfo from "./UserInfo";

export default function Navbar() {
  const { currentUser } = useContext(AuthContext);
  const [modal, setModal] = useState(null);
  const [info, setInfo] = useState(null);
  function showModal() {
    setModal(true);
  }
  function openInfo() {
    setInfo(true);
  }

  return (
    <div className="navbar">
      <span className="logo">Chat</span>
      <div className="user" onClick={openInfo}>
        <img src={currentUser.photoURL} alt="" />
        <span>{currentUser.displayName}</span>
        <div className="bottom" onClick={(e) => e.stopPropagation()}>
          <i class="uil uil-palette" onClick={showModal}></i>
          <button onClick={() => signOut(auth)}>Выйти</button>
        </div>
      </div>
      {modal && <ModalTheme closeModal={() => setModal(false)} />}
      {info && <UserInfo closeInfo={() => setInfo(false)} />}
    </div>
  );
}
