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
import ProjectDetails from "./components/projects/ProjectDetails";

function App() {
  const [user, setUser] = useState({
    username: "",
    userId: "",
    loggedIn: false,
  });
  const [projects, setProjects] = useState(false);

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

  function changeProjects(value) {
    setProjects(value);
  }

  console.log("abc", projects);

  return (
    <div>
      <Header user={user} />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/aboutme" element={<AboutMe />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/projects">
          <Route
            index
            element={
              <ProjectOverview
                projects={projects}
                changeProjects={changeProjects}
              />
            }
          />
          <Route
            path="/projects/:id"
            element={<ProjectDetails projects={projects} />}
          ></Route>
        </Route>
        {/* <Route
          path="/user"
          element={
            user.loggedIn ? (
              <User user={user} userLoggedIn={userLoggedIn} />
            ) : (
              <Login userLoggedIn={userLoggedIn} />
            )
          }
        ></Route> */}
      </Routes>
    </div>
  );
}

export default App;
