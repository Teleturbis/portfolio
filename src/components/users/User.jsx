import axios from "axios";
import React, { useEffect, useState } from "react";

export default function User({ userLoggedIn, user }) {
  const [userlist, setUserlist] = useState(false);
  const [partnerid, setPartnerid] = useState(false);
  const [prevChat, setPrevChat] = useState("");
  const [newMessage, setNewMessage] = useState("");

  function handleLogOut() {
    userLoggedIn();
  }

  useEffect(() => {
    axios
      .get("https://my-backend-portfolio.herokuapp.com/userlist")
      .then((res) => setUserlist(res.data));
  }, []);

  useEffect(() => {
    if (partnerid) {
      axios
        .get(
          `https://my-backend-portfolio.herokuapp.com/chats?user=${user.userId}&partner=${partnerid}`
        )
        .then((res) => {
          if (res.data !== "Nothing found") {
            setPrevChat(res.data[0]);
          }
        });
    }
  }, [partnerid]);

  function handleSendMessage() {
    let date = new Date();
    let tempArr = prevChat.prevchat;

    console.log(tempArr);

    const requestOptions = {
      method: "PUT",
      headers: {
        "Access-Control-Allow-Orign": "*",
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        chatid: prevChat.chatid,
        useridone: prevChat.useridone,
        useridtwo: prevChat.useridtwo,
        prevchat: tempArr.push({
          from: user.userId,
          message: newMessage,
          time: `${date.getHours()}:${date.getMinutes()}`,
        }),
      }),
    };

    fetch("http://my-backend-portfolio.herokuapp.com/newChat", requestOptions)
      .then((response) => response.json())
      .then((data) => console.log("fetch: ", data));

    // axios
    //   .put(//https://my-backend-portfolio.herokuapp.com/newChat
    //     /* `https://localhost:3500/newChat` */"https://my-backend-portfolio.herokuapp.com/newChat",

    //       {
    //         chatid: prevChat.chatid,
    //         useridone: prevChat.useridone,
    //         useridtwo: prevChat.useridtwo,
    //         prevchat: tempArr.push({
    //           from: user.userId,
    //           message: newMessage,
    //           time: `${date.getHours()}:${date.getMinutes()}`,
    //         }),
    //       }

    //   )
    //   .then((res) => console.log("res:", res))
    //   .catch((err) => console.error("ERROR at Frontend", err.response));

    console.log({
      chatid: prevChat.chatid,
      useridone: prevChat.useridone,
      useridtwo: prevChat.useridtwo,
      prevchat: tempArr,
    });
  }

  /*
// Simple PUT request with a JSON body using fetch
const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: 'Fetch PUT Request Example' })
};
fetch('https://reqres.in/api/articles/1', requestOptions)
    .then(response => response.json())
    .then(data => element.innerHTML = data.updatedAt );
*/

  console.log(prevChat);

  return (
    <div>
      <div>
        <h1>Hey {user.username}!</h1>
        <button onClick={() => handleLogOut()}>LogOut</button>
      </div>
      <div className="messenger-div">
        <div className="userlist">
          {userlist &&
            userlist.map((el) =>
              user.userId !== el.userid ? (
                <div key={el.userid} onClick={() => setPartnerid(el.userid)}>
                  {el.username}
                </div>
              ) : null
            )}
        </div>
        <div className="chat-div">
          <div className="prev-chat-div">
            {prevChat &&
              prevChat.prevchat.map((message, index) =>
                message.from === user.userId ? (
                  <div className="chat-outgoing" key={index}>
                    <p>{message.message}</p>
                    <p>{message.time}</p>
                  </div>
                ) : (
                  <div className="chat-incoming" key={index}>
                    <p>{message.message}</p>
                    <p>{message.time}</p>
                  </div>
                )
              )}
          </div>
          <div className="userinput">
            <textarea
              cols="30"
              rows="10"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            ></textarea>
            <button onClick={() => handleSendMessage()}>Senden</button>
          </div>
        </div>
      </div>
    </div>
  );
}
