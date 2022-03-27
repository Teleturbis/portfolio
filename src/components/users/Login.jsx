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

export default function Login({ userLoggedIn }) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [newUserPW, setNewUserPW] = useState("");
  const [newUserName, setNewUserName] = useState("");

  const [userNameInput, setUserNameInput] = useState("");
  const [userPWInput, setUserPWInput] = useState("");

  const [newUser, setNewUser] = useState({
    id: "",
    userName: "",
    password: "",
  });

  const [user, setUser] = useState({
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

  function handleLogin() {
    if (userNameInput !== "" && userPWInput !== "") {
      axios
        .get(
          `https://my-backend-portfolio.herokuapp.com/login?user=${userNameInput}&pw=${userPWInput}`
        )
        .then((res) => {
          if (res.data !== "No User found") {
            userLoggedIn({
              username: res.data.username,
              userid: res.data.userid,
            });
          } else {
            window.alert("Username oder Passwort falsch!");
          }
        });
    }
  }

  function handleRegistration(e) {
    if (newUserName !== "" && newUserPW !== "") {
      setNewUser({ id: uuid(), userName: newUserName, password: newUserPW });
      closeModal();
      setNewUserName("");
      setNewUserPW("");
    }
  }

  useEffect(() => {
    if (newUser.userName !== "") {
      axios
        .post("https://my-backend-portfolio.herokuapp.com/newUser", {
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
      <input
        className="login-element"
        type="text"
        placeholder="Username"
        value={userNameInput}
        onChange={(e) => setUserNameInput(e.target.value)}
      />
      <input
        className="login-element"
        type="password"
        placeholder="Passwort"
        value={userPWInput}
        onChange={(e) => setUserPWInput(e.target.value)}
      />
      <button
        className="login-element login-button"
        onClick={() => handleLogin()}
      >
        Anmelden
      </button>
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
          placeholder="Username"
          onChange={(e) => setNewUserName(e.target.value)}
          value={newUserName}
        />
        <input
          className="login-element"
          type="password"
          placeholder="Passwort"
          onChange={(e) => setNewUserPW(e.target.value)}
          value={newUserPW}
        />
        <button
          className="login-element login-button"
          onClick={() => handleRegistration()}
        >
          Registrieren
        </button>
      </Modal>
    </div>
  );
}
