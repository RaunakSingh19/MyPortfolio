import React from "react";
import "../stylesheets/HomePage.css";

const HomePage = () => {
  const techStack = [
    "JavaScript",
    "React / Node.js",
    "Python",
    "Flutter",
    "AWS",
    "Docker",
    "SQL",
    "MongoDB",
    "Firebase",
    "Debugging & Troubleshooting",
  ];

  return (
    <div className="homepage-container">
      <hr />
      <p className="home-description">
        {" "}
        With hands-on experience in <b>web and software development</b>, as well
        as a strong foundation in <b>Networking</b> and <b>DevOps</b>, I am
        passionate about creating innovative, scalable solutions. My expertise
        allows me to approach projects with both technical precision and a
        collaborative mindset, ensuring successful outcomes. I thrive in dynamic
        environments and enjoy working on projects that address real-world
        challenges, helping businesses optimize their operations and achieve
        their goals. My dedication to continuous learning and improvement drives
        me to stay updated with the latest industry trends and technologies,
        making me adaptable to evolving demands.{" "}
      </p>

      <p className="home-description">
        {" "}
        As both a team player and leader, I’ve successfully led several projects
        and programs in college, guiding teams to achieve shared goals while
        maintaining a cooperative and efficient atmosphere.{" "}
      </p>

      <h2 className="stack-heading">💻 Tech Stack</h2>
      <div className="stack-wrapper">
        {techStack.map((tech, index) => (
          <span className="tech-tag" key={index}>
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
