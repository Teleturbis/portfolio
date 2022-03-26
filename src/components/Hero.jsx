import React, { useEffect, useState } from "react";
import pixel from "../assets/img/128.png";
import detailed from "../assets/img/Portrait.png";

var id = null;

export default function Hero() {
  const [currentImg, setCurrentImg] = useState(detailed);

  function handleChangeImg() {
    currentImg === pixel ? setCurrentImg(detailed) : setCurrentImg(pixel);
  }

  return (
    <div>
      <div className="hero-div">
        <div className="hero-img-div">
          <img
            className={`hero-img`}
            src={currentImg}
            onClick={() => handleChangeImg()}
          />
        </div>
        <div className="headline-div">
          <h1>Kevin Poppe</h1>
          <h2>Web-Developer</h2>
        </div>
      </div>
    </div>
  );
}
