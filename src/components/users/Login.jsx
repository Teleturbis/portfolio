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

export default function Login({ changeUser }) {
  //States for rendering
  const [showModal, changeModalVisibility] = useState(false);
  const [newUserPW, setNewUserPW] = useState("");
  const [newUserName, setNewUserName] = useState("");

  //States for Userinputs
  const [userNameInput, setUserNameInput] = useState("");
  const [userPWInput, setUserPWInput] = useState("");

  //State for NewUser, initial empty
  const [newUser, setNewUser] = useState({
    id: "",
    userName: "",
    password: "",
  });

  //Change State showModal to the opposite of the current state
  function changeModal() {
    changeModalVisibility(!showModal);
  }

  function handleLogin() {
    if (userNameInput !== "" && userPWInput !== "") {
      //Send loginrequest to Backend with username and password in a query
      axios
        .get(
          `https://my-backend-portfolio.herokuapp.com/login?user=${userNameInput}&pw=${userPWInput}`
        )
        .then((res) => {
          //If response is equal to "No User found", there is no User with that Username or the Password is wrong
          if (res.data !== "No User found") {
            //Change User to the loggedIn one
            changeUser({
              username: res.data.username,
              userid: res.data.userid,
            });
          } else {
            window.alert("Username oder Passwort falsch!");
          }
        });
    }
  }

  function handleRegistration() {
    if (newUserName !== "" && newUserPW !== "") {
      //If the User entered something into the Textfields, Change State newUser, Reset the Textfields and Change showModal
      setNewUser({ id: uuid(), userName: newUserName, password: newUserPW });
      changeModal();
      setNewUserName("");
      setNewUserPW("");
    }
  }

  useEffect(() => {
    //If the State newUser is changed, register the newUser in the Backend
    if (newUser.userName !== "") {
      axios
        .post("https://my-backend-portfolio.herokuapp.com/newUser", {
          id: newUser.id,
          userName: newUser.userName,
          password: newUser.password,
        })
        // .then((res) => console.log("res:", "Registered"))
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
      <button className="login-element login-button" onClick={changeModal}>
        Registrieren
      </button>

      {/* Render Modal depending on the State showModal */}
      <Modal
        isOpen={showModal}
        onRequestClose={changeModal}
        style={customStyles}
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
