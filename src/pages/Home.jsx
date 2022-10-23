import React, { useEffect, useState, useContext } from "react";
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";
import { ThemeContext } from "../context/ThemeContext";

export default function Home() {
  const [activeState, setActiveState] = useState(false);
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div className={"home" + " " + theme}>
      <div className="container">
        <Sidebar state={activeState} setState={setActiveState} />
        <Chat state={activeState} setState={setActiveState} />
      </div>
    </div>
  );
}
