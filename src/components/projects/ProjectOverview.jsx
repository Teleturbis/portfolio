import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";

const contentful = require("contentful");

export default function ProjectOverview({ changeProjects, projects }) {
  useEffect(async () => {
    //Create Connection to Contentful
    const client = contentful.createClient({
      space: "hxhr2jn34dq3",
      environment: "master",
      accessToken: "_wWH78wFKJ8Ayxbq3IJG2JXA4bjjCvDn5H7WZohptvc",
    });

    //Get all Entries (There are only Projects, no filter needed)
    client
      .getEntries()
      .then((response) => changeProjects(response.items))
      .catch((err) => console.log("ERROR:", err));
  }, []);

  return (
    <div className="projects-div">
      {/* If Projects are loaded, map over them */}
      {projects &&
        projects.map((project) => (
          <NavLink
            key={project.sys.id}
            to={`/projects/${project.sys.id}`}
            style={{
              backgroundImage: `url(${project.fields.images[0].fields.file.url})`,
            }}
            className="project-navlink hotCard"
          >
            <div className="card-content">
              <p className="hotTitle">{project.fields.title}</p>
            </div>
          </NavLink>
        ))}
    </div>
  );
}
