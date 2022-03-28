import React, { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";

export default function ProjectDetails({ projects }) {
  const { id } = useParams();

  const [slideImages, setImages] = useState(false);
  const [project, setProject] = useState();

  useEffect(() => {
    if (projects) setProject(projects.find((el) => el.sys.id === id));
  }, [projects]);

  useEffect(() => {
    let tempArr = slideImages;
    let obj = { original: "", thumbnail: "" };
    if (project) {
      tempArr = project.fields.images.map((el) => el.fields.file.url);
      setImages(tempArr);
    }
  }, [project]);

  console.log("project", project);

  return (
    <>
      {slideImages && (
        <div className="film-details-div">
          <div className="project-details-img-div">
            <div>
              <h1>
                <a href={project.fields.pageLink} target="_blank">
                  {project.fields.title}
                </a>
              </h1>
              <div className="project-details-info">
                <div className="tag-div">
                  {project.metadata.tags.map((el, index) => (
                    <NavLink
                      className="tag tag-hover"
                      key={index}
                      to={`/search/${el.sys.id}`}
                    >
                      {el.sys.id}
                    </NavLink>
                  ))}
                </div>
                <p className="tag">{project.fields.date}</p>
              </div>
            </div>
            <img
              src={project.fields.images[0].fields.file.url}
              className="project-details-img"
            />
          </div>
          <div className="project-details-description-div">
            {project.fields.description.content.map((el, index) => (
              <p key={index} className="project-details-description">
                {el.content[0].value}
              </p>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
