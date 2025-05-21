import React from 'react';
import '../stylesheets/HomePage2.css';
import ProfilePic from "../assets/images/mypic1.png";

const HomePage = () => {
  // const techStack = [
  //   "JavaScript",
  //   "React/Node.js",
  //   "Python",
  //   "Flutter",
  //   "AWS",
  //   "Docker",
  //   "SQL",
  //   "MongoDB",
  //   "Firebase",
  //   "Debuggin & Troubleshooting"
  // ];


  return (
//     <div className="home-container">

//        <div className="badge-wrapper">
//             <span className="badge">FULL-STACK DEVELOPER</span>
//             <span className="badge">DEVOPS | CCNA</span>
//           </div>

//       {/* <h1 className="home-heading">Hi, I'm [Raunak Singh]</h1> */}
//        <h1 className="headline">
//             Hi, I’m <span className="highlight-name">Raunak Singh</span>
//           </h1>

//            <p className="summary">
//             I build full-stack apps, automate cloud systems, and optimize
//             infrastructure with strong networking & DevOps skills. Let’s craft
//             scalable, secure tech together.
//           </p>


//       {/* <p className="home-description">
//         A passionate full-stack developer crafting modern and user-friendly web applications.
//       </p> */}
//        <div className="stack-wrapper">
//             {techStack.map((tech, index) => (
//               <span className="tech-tag" key={index}>
//                 {tech}
//               </span>
//             ))}
//           </div>
//           <div className="btn-group">
//             <a href="#contact" className="btn primary">
//               Get In Touch
//             </a>
//             <a
//               href="https://github.com/RaunakSingh19"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="btn secondary"
//             >
//               GitHub
//             </a>
//           </div>

//            <div className="home-image">
//                     <div className="glass-card">
//                       <img
//                         src={ProfilePic}
//                         alt="Raunak Singh"
//                         className="profile-pic"
//                       />
//                     </div>
//                   </div>
// <div className="scroll-down">
//         <span>Scroll</span>
//         <div className="scroll-arrow" />
//       </div>
//     </div>
    
    
  // );
  // <div className="home-container">

  //     {/* Badge Section */}
  //     <div className="badge-wrapper">
  //       <span className="badge">FULL-STACK DEVELOPER</span>
  //       <span className="badge">DEVOPS | CCNA</span>
  //     </div>

  //     {/* Headline and Summary */}
  //     <h1 className="headline">
  //       Hi, I’m <span className="highlight-name">Raunak Singh</span>
  //     </h1>
  //     <p className="summary">
  //       I build full-stack apps, automate cloud systems, and optimize
  //       infrastructure with strong networking & DevOps skills. Let’s craft
  //       scalable, secure tech together.
  //     </p>

  //     {/* Tech Stack Tags */}
  //     <div className="stack-wrapper">
  //       {techStack.map((tech, index) => (
  //         <span key={index} className="tech-tag">
  //           {tech}
  //         </span>
  //       ))}
  //     </div>

  //     {/* Action Buttons */}
  //     <div className="btn-group">
  //       <a href="#contact" className="btn primary">Get In Touch</a>
  //       <a
  //         href="https://github.com/RaunakSingh19"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //         className="btn secondary"
  //       >
  //         GitHub
  //       </a>
  //     </div>

  //     {/* Profile Image Section */}
  //     <div className="home-image">
  //       <div className="glass-card">
  //         <img
  //           src={ProfilePic}
  //           alt="Raunak Singh"
  //           className="profile-pic"
  //         />
  //       </div>
  //     </div>

  //     {/* Scroll Hint */}
  //     <div className="scroll-down">
  //       <span>Scroll</span>
  //       <div className="scroll-arrow" />
  //     </div>

  //   </div>
  // );
  <div className="home-container">
      <div className="home-content">
        {/* Left Section - Text */}
        <div className="home-text">
          <div className="badge-wrapper">
            <span className="badge">FULL-STACK DEVELOPER</span>
            <span className="badge">DEVOPS | CCNA</span>
          </div>

          <h1 className="headline">
            Hi, I’m <span className="highlight-name">Raunak Singh</span>
          </h1>

          <b className="highlight-home">  I’m open to new opportunities, collaboration.</b>
                  

          <p className="summary">
            I build full-stack apps, And having Networking & DevOps skills. Let’s craft
            scalable, secure tech together.
          </p>
        

          {/* <div className="stack-wrapper">
            {techStack.map((tech, index) => (
              <span className="tech-tag" key={index}>
                {tech}
              </span>
            ))}
          </div> */}

          <div className="btn-group">
            <a href="contact" className="btn primary">
              Get In Touch
            </a>
            <a
              href="https://github.com/RaunakSingh19"
              target="_blank"
              rel="noopener noreferrer"
              className="btn secondary"
            >
              GitHub
            </a>
          </div>
        </div>

        {/* Right Section - Profile Image */}
        <div className="home-image">
          <div className="glass-card">
            <img
              src={ProfilePic}
              alt="Raunak Singh"
              className="profile-pic"
            />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-down">
        <span>Scroll</span>
        <div className="scroll-arrow" />
      </div>
    </div>
  );
};

export default HomePage;
