import "./assets/style.css";
import { Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import Hero from "./components/Hero";
import AboutMe from "./components/AboutMe";
import Resume from "./components/Resume";

import Login from "./components/users/Login";

import ProjectOverview from "./components/projects/ProjectOverview";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/aboutme" element={<AboutMe />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/projects">
          <Route index element={<ProjectOverview />} />
        </Route>
        <Route path="/user">
          <Route index element={<Login />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
