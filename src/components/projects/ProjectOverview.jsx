import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const contentful = require("contentful");

export default function ProjectOverview({ changeProjects, projects }) {
  useEffect(async () => {
    /* await axios
      .get("https://localhost:3500/projects")
      .then((res) => console.log(res.data)); */

    const client = contentful.createClient({
      space: "hxhr2jn34dq3",
      environment: "master",
      accessToken: "_wWH78wFKJ8Ayxbq3IJG2JXA4bjjCvDn5H7WZohptvc",
    });

    client
      .getEntries()
      .then((response) => changeProjects(response.items))
      .catch((err) => console.log("ERROR:", err));
  }, []);

  return (
    <div className="projects-div">
      {projects &&
        projects.map((project) => (
          <a
            key={project.sys.id}
            href={`${project.fields.pageLink}`}
            target="_blank"
            style={{
              backgroundImage: `url(${project.fields.images[0].fields.file.url})`,
            }}
            className="project-navlink hotCard"
          >
            <div className="card-content">
              <p className="hotTitle">{project.fields.title}</p>
            </div>
          </a>
        ))}
    </div>
  );
}
