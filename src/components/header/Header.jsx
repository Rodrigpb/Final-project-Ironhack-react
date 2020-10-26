import "./Header.css";
import React from "react";

export default function Header({ user }) {
  return <div className="Header">
    {user ? user.name : "Invitado"}
  </div>
  ;
}
