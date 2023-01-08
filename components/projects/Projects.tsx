import styles from './Projects.module.scss';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import axios from 'axios';

import ProjectCard from './ProjectCard';

export default function Projects() {
  const { t } = useTranslation();
  const [projects, setProjects] = useState([]);
  const [tags, setTags] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [selectedTags, setSelectedTags] = useState<any[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (projects.length > 0) {
      console.log(selectedTags.length);

      if (selectedTags.length > 0) {
        const temp: any = [];
        projects.forEach((project: any) => {
          project.tags.forEach((tag: any) => {
            selectedTags.forEach((selectedTag: any) => {
              if (tag.sys.id === selectedTag.tagId) {
                // check if project is already in temp
                let alreadyIn = false;
                temp.forEach((el: any) => {
                  if (el.title === project.title) {
                    alreadyIn = true;
                  }
                });
                if (!alreadyIn) temp.push(project);
              }
            });
          });
        });
        setFilteredProjects(temp);
      } else {
        setFilteredProjects(projects);
      }
    }
  }, [projects, selectedTags]);

  async function fetchData() {
    await axios({
      method: 'post',
      url: 'https://portfolio-be-production-0fb4.up.railway.app/projects',
      data: {
        apiKey: 'QneE%afc<$-§yEVu}Z6>y<§aMs+SjJaSYnzrxQhgMeT',
      },
    })
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    await axios({
      method: 'post',
      url: 'https://portfolio-be-production-0fb4.up.railway.app/projects/tags',
      data: {
        apiKey: 'QneE%afc<$-§yEVu}Z6>y<§aMs+SjJaSYnzrxQhgMeT',
      },
    })
      .then((response) => {
        console.log('tags', response.data);

        setTags(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    console.log('selectedTags', selectedTags);
  }, [selectedTags]);

  function handleTagSelect(tag: any) {
    if (!selectedTags.includes(tag)) {
      const temp = [...selectedTags, tag];
      setSelectedTags(temp);
    } else {
      setSelectedTags([...selectedTags.filter((el) => el.tagId !== tag.tagId)]);
    }
  }

  return (
    <main className={`${styles.main}`}>
      <h2>Projekte</h2>
      <p>Nach Technologien filtern:</p>
      <div className={styles.tagsDiv}>
        {tags.length > 0 &&
          tags.map((tag: any, index: number) => (
            <button
              className={
                selectedTags.includes(tag)
                  ? styles.buttonSelected
                  : styles.buttonUnselected
              }
              key={index}
              onClick={() => handleTagSelect(tag)}
            >
              {tag.name}
            </button>
          ))}
      </div>
      <div className={styles.projectCardsDiv}>
        {filteredProjects.length > 0 &&
          filteredProjects.map((el: any, index: number) => (
            <ProjectCard
              key={index}
              createDate={el.fields.createDate}
              description={el.fields.description}
              link={el.fields.link}
              publishDate={el.fields.publishDate}
              screenshot={el.fields.screenshot?.fields.file.url}
              shortDescription={el.fields.shortDescription}
              title={el.fields.title}
              tags={el.tags}
              allTags={tags}
            />
          ))}
      </div>
    </main>
  );
}
