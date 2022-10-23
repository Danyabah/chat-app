import React from "react";
import Navbar from "./Navbar";
import Search from "./Search";
import Chats from "./Chats";
import useWindowDimensions from "../context/WindowDimentions";

export default function Sidebar({ state, setState }) {
  const { width } = useWindowDimensions();

  let styles = {};
  if (width < 590) {
    styles = {
      display: state ? "block" : "none",
    };
  }
  return (
    <div className="sidebar" style={styles}>
      <Navbar />
      <Search />
      <Chats state={state} setState={setState} />
    </div>
  );
}
