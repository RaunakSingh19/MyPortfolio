// import React from "react";
// import "../stylesheets/HomePage.css";
// import ProfilePic from "../assets/images/mypic1.png";

// const HomePage = () => {
//   return (
//     <div className="home-container">
//       <div className="home-content">
//         <div className="home-text">
//          <div className="intro-badge-container">
//   <div className="intro-badge">FULL-STACK DEV</div>
//   <div className="intro-badge">DEVOPS | CCNA</div>
// </div>

//           <h1 className="home-heading">
//             <span className="greeting">Hi, I'm Raunak Singh</span>
//             {/* <span className="name">Raunak Singh</span> */}
//           </h1>
          
//           <p className="home-summary">
//             I craft scalable web and mobile applications, automate cloud deployments, and secure systems with robust networking fundamentals. Let’s build the future together.
//             {/* I build exceptional digital experiences with modern technologies. 
//             Specializing in full-stack development and cloud infrastructure. */}
//           </p>
          
//           <div className="tech-stack">
//             <div className="stack-item">JavaScript</div>
//             <div className="stack-item">React/Node.js</div>
//             <div className="stack-item">Python</div>
//             <div className="stack-item">Flutter</div>
//             <div className="stack-item">AWS Cloud</div>
//             <div className="stack-item">Docker/K8s</div>
//             <div className="stack-item">SQL</div>
//             <div className="stack-item">MongoDB</div>
//             <div className="stack-item">Firebase</div>
//           </div>
          
//           <div className="cta-buttons">
//             <a href="#contact" className="primary-button">
//               Contact Me
//             </a>
//             <a 
//               href="https://github.com/RaunakSingh19" 
//               target="_blank" 
//               rel="noopener noreferrer"
//               className="secondary-button"
//             >
//               View GitHub
//             </a>
//           </div>
//         </div>
        
//         <div className="home-image">
//           <div className="image-wrapper">
//             <img src={ProfilePic} alt="Raunak Singh" className="profile-pic" />
//             <div className="image-decoration"></div>
//           </div>
//         </div>
//       </div>
      
//       <div className="scroll-indicator">
//         <span>Scroll down</span>
//         <div className="arrow-down"></div>
//       </div>
//     </div>
//   );
// };

// export default HomePage;

import React from "react";
import "../stylesheets/HomePage.css";
import ProfilePic from "../assets/images/mypic1.png";

const HomePage = () => {
  return (
    <section className="home-container">
      <div className="home-content">
        <div className="home-text">
          <div className="badge-wrapper">
            <span className="badge">FULL-STACK DEVELOPER</span>
            <span className="badge">DEVOPS | CCNA</span>
          </div>

          <h1 className="headline">
            Hi, I’m <span className="highlight-name">Raunak Singh</span>
          </h1>
          <p className="summary">
            I build full-stack apps, automate cloud systems, and optimize infrastructure with strong networking & DevOps skills. Let’s craft scalable, secure tech together.
          </p>

          <div className="stack-wrapper">
            {["JavaScript", "React/Node.js", "Python", "Flutter", "AWS", "Docker/K8s", "SQL", "MongoDB", "Firebase"].map((tech, i) => (
              <span className="tech-tag" key={i}>{tech}</span>
            ))}
          </div>

          <div className="btn-group">
            <a href="#contact" className="btn primary">Get In Touch</a>
            <a href="https://github.com/RaunakSingh19" target="_blank" rel="noopener noreferrer" className="btn secondary">GitHub</a>
          </div>
        </div>

        <div className="home-image">
          <div className="glass-card">
            <img src={ProfilePic} alt="Raunak Singh" className="profile-pic" />
          </div>
        </div>
      </div>

      <div className="scroll-down">
        <span>Scroll</span>
        <div className="scroll-arrow"></div>
      </div>
    </section>
  );
};

export default HomePage;
