import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { v4 as uuid } from "uuid";
import axios from "axios";

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
    backgroundColor: "#222629",
  },
};

export default function Login() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [newUserPW, setNewUserPW] = useState("");
  const [newUserName, setNewUserName] = useState("");

  const [newUser, setNewUser] = useState({
    id: "",
    userName: "",
    password: "",
  });

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function handleRegistration(e) {
    if (newUserName !== "" && newUserPW !== "") {
      setNewUser({ id: uuid(), userName: newUserName, password: newUserPW });
    }
  }

  useEffect(() => {
    console.log(newUser);

    if (newUser.userName !== "") {
      axios
        .post("http://localhost:3300/newUsers", {
          id: newUser.id,
          userName: newUser.userName,
          password: newUser.password,
        })
        .then((res) => console.log("res:", res))
        .catch((err) => console.error(err.response));
    }
  }, [newUser]);

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
        <h2 style={{ textAlign: "center" }}>Registrieren</h2>
        <input
          className="login-element"
          type="text"
          placeholder="Username a"
          onChange={(e) => setNewUserName(e.target.value)}
          value={newUserName}
        />
        <input
          className="login-element"
          type="password"
          placeholder="Passwort a"
          onChange={(e) => setNewUserPW(e.target.value)}
          value={newUserPW}
        />
        <button
          className="login-element login-button"
          onClick={() => handleRegistration()}
        >
          Anmelden
        </button>
      </Modal>
    </div>
  );
}
