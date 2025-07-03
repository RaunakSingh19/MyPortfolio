import React from 'react';
import '../stylesheets/HomePage2.css';
import ProfilePic from "../assets/images/mypic4.jpg";

const HomePage = () => {
  return (
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

          <b className="highlight-home">  I’m open to new opportunities and collaboration.</b>       
          <p className="summary">
            I build full-stack apps, And having Networking & DevOps skills. Let’s craft
            scalable, secure tech together.
          </p>

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
