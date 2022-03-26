import "./assets/style.css";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";

import Header from "./components/Header";
import Hero from "./components/Hero";
import AboutMe from "./components/AboutMe";
import Resume from "./components/Resume";

import Login from "./components/users/Login";
import User from "./components/users/User";

import ProjectOverview from "./components/projects/ProjectOverview";

function App() {
  const [user, setUser] = useState({
    username: "",
    userId: "",
    loggedIn: false,
  });

  function userLoggedIn(value) {
    user.loggedIn
      ? setUser({
          username: "",
          userId: "",
          loggedIn: false,
        })
      : setUser({
          username: value.username,
          userId: value.userid,
          loggedIn: true,
        });
  }

  console.log(user);

  return (
    <div>
      <Header user={user} />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/aboutme" element={<AboutMe />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/projects">
          <Route index element={<ProjectOverview />} />
        </Route>
        <Route
          path="/user"
          element={
            user.loggedIn ? (
              <User user={user} userLoggedIn={userLoggedIn} />
            ) : (
              <Login userLoggedIn={userLoggedIn} />
            )
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
