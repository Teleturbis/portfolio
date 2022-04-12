import React from "react";
import { Map, Marker } from "pigeon-maps";
import { stamenToner } from "pigeon-maps/providers";

export default function AboutMe() {
  return (
    <div className="aboutMe-div">
      <h1>Hey There!</h1>
      <div className="aboutMe-location-div">
        <p className="aboutMe-left">
          Mein Name ist Kevin Poppe. Momentan befinde ich mich bis zum
          13.05.2022 in dem Bootcamp zum Fullstack Web- & App-Developer der{" "}
          <a
            href="https://www.wbscodingschool.com/de/web-app-entwicklung-bootcamp/"
            target="_blank"
          >
            WBS Codingschool
          </a>
          .<br />
          Wohnhaft bin ich in dem schönen Collenberg, was sich an der
          Nord-Westlichen Grenze Bayerns befindet, etwa 70km von Frankfurt
          entfernt.
        </p>
        <div
          style={{
            borderRadius: "2rem",
            height: "300px",
            width: "300px",
            overflow: "hidden",
          }}
        >
          <Map
            provider={stamenToner}
            dprs={[1, 2]}
            height={300}
            width={300}
            defaultCenter={[49.7731859, 9.3282289]}
            defaultZoom={7}
          >
            <Marker width={50} anchor={[49.7731859, 9.3282289]} />
          </Map>
        </div>
      </div>
      <p className="aboutMe-right">
        Von 2011 bis 2014 habe ich eine Ausbildung zum examinierten Altenpfleger
        absolviert und daraufhin 7 Jahre als Altenpfleger gearbeitet, 6 Jahre
        davon bei der Sozialstation Walldürn, ein ambulanter Dienst. Hier habe
        ich das verantwortungsvolle Arbeiten unter hohem Zeitdruck gelernt,
        sowie eine gute Organisation und Planung der täglichen Aufgaben.
      </p>
      <p className="aboutMe-left">
        Das Programmieren habe ich schon in meiner Schulzeit - in der
        Konrad-von-Dürn Realschule Walldürn - für mich entdeckt. Ich habe damals
        mit C++ kleine Programme geschrieben, wie bspw. einen Taschenrechner,
        welcher mir das berechnen physikalischer Formeln erleichtern sollte.
        Leider ging dieses Hobby während meiner Ausbildung verloren. <br />
        2020 habe ich festgestellt, dass die CSM-Software in der Altenpflege
        sehr veraltet ist. Ich habe so meine Passion für das Programmieren
        wieder gefunden und angefangen, Java zu lernen. Ende 2021 habe ich
        festgestellt, dass die Pflege keine Zukunft mehr für mich hat und ich
        mich beruflich verändern möchte.
      </p>
      <h2 className="aboutme-end">
        Ich bin offen für eine Stelle als Fullstack Web-Developer.
      </h2>
    </div>
  );
}
