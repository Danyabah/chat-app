import React, { useContext } from "react";
import Cam from "../img/cam.png";
import Add from "../img/add.png";
import More from "../img/more.png";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";
import useWindowDimensions from "../context/WindowDimentions";

export default function Chat({ state, setState }) {
  const { width } = useWindowDimensions();
  const { data } = useContext(ChatContext);

  let styles = {};

  if (width < 590) {
    styles = {
      display: state ? "none" : "inline-block",
    };
  }

  function changeState(e) {
    e.stopPropagation();
    if (width < 590) {
      setState(true);
    }
  }
  function handleState() {
    if (width < 590) {
      setState(false);
    }
  }

  return (
    <div className="chat" onClick={handleState}>
      <div className="chatInfo">
        <div>
          <div
            className={"burger"}
            onClick={(e) => changeState(e)}
            style={styles}
          >
            <div className="bar1"></div>
            <div className="bar2"></div>
            <div className="bar3"></div>
          </div>
          <span>{data.user?.displayName}</span>
        </div>
        <div className="chatIcons">
          <img src={Cam} alt="" />
          <img src={Add} alt="" />
          <img src={More} alt="" />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
}
