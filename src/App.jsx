import "./assets/style.css";
import { Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import Hero from "./components/Hero";
import AboutMe from "./components/AboutMe";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/aboutme" element={<AboutMe />} />
      </Routes>
    </div>
  );
}

export default App;
