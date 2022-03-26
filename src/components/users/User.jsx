import React from "react";

export default function User({ userLoggedIn, user }) {
  function handleLogOut() {
      userLoggedIn()
  }

  return (
    <div>
      <div>
        <h1>Hey {user.username}!</h1>
        <button onClick={() => handleLogOut()}>LogOut</button>
      </div>
    </div>
  );
}
