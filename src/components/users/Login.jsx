import React, { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

const customStyles = {
  content: {
    top: "25%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#222629"
  },
};

export default function Login() {
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className="login-div">
      <h1>LogIn</h1>
      <input className="login-element" type="text" placeholder="Username" />
      <input className="login-element" type="password" placeholder="Passwort" />
      <button className="login-element login-button">Anmelden</button>
      <button className="login-element login-button" onClick={openModal}>
        Registrieren
      </button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 style={{textAlign: "center"}}>Registrieren</h2>
        <input className="login-element" type="text" placeholder="Username" />
        <input
          className="login-element"
          type="password"
          placeholder="Passwort"
        />
        <button className="login-element login-button">Anmelden</button>
      </Modal>
    </div>
  );
}
