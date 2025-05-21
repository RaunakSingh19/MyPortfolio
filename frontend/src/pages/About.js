import React, { useEffect, useRef } from "react";
import ProfileImg from "../assets/images/mypic2.jpg";
import "../stylesheets/About.css";

const About = () => {
  const sectionsRef = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      sectionsRef.current.forEach((section) => {
        if (!section) return;
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight - 80) {
          section.style.opacity = 1;
          section.style.transform = "translateY(0) scale(1)";
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="about-container">
      <div className="about-main-row">
        {/* Left Side: About, Skills, Education */}
        <div className="about-main-col">
          {/* Main About Section */}
          <section
            className="profile-section"
            ref={(el) => (sectionsRef.current[0] = el)}
          >
            <div className="profile-content-wrapper">
              <div className="profile-about">
                <h1 className="profile-name">Raunak Singh</h1>
                <div className="profile-location">
                  <span role="img" aria-label="location">
                    📍
                  </span>
                  <span>Living in Mumbai, Maharashtra, India</span>
                </div>
                <div className="profile-location">
                  <span role="img" aria-label="hometown">
                    🌄
                  </span>
                  <span>Originally from Uttra Pradesh, India</span>
                </div>
                <p className="profile-summary">
                  <span className="intro-accent">Hi, I'm Raunak! 👋</span>
                
                  <b className="highlight">
                    Computer Science Graduate (2025)
                  </b>{" "}
                  <b className="highlight"> with a passion for  Web & Software Development,{" "}
                  Networking, and DevOps. </b> <br />
                  I enjoy crafting clean, scalable applications and working with
                  modern tech stacks that streamline development and operations.
                  <br />
                  <br />
                  <span className="faded">
                    Recently completed my <b>B.Sc in Computer Science</b>. Eager
                    to contribute to impactful projects, keep learning, and grow
                    as a full-stack developer.
                    <br />
                  </span>
                </p>
                <a 
                  className="contact-btn"
                  href="/contact"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span role="img" aria-label="mail">
                    📫
                  </span>{" "}
                  Contact Me
                </a>
              </div>

              <div className="profile-image-wrapper">
                <img
                  src={ProfileImg}
                  className="profile-image"
                  alt="Raunak Singh"
                  loading="lazy"
                />
              </div>
            </div>
          </section>

          {/* Skills Section */}
          <section
            className="skills-section"
            ref={(el) => (sectionsRef.current[1] = el)}
          >
            <div className="section-header">
              <h2 className="section-title">Technical Skills</h2>
              <div className="accent-bar"></div>
            </div>
            <div className="skills-grid">
              <div className="skill-card">
                <h3 className="skill-title">Frontend</h3>
                <div className="tags">
                  <span className="tag">JavaScript</span>
                  <span className="tag">React</span>
                  <span className="tag">HTML5</span>
                  <span className="tag">CSS3</span>
                  <span className="tag">UI/UX</span>
                </div>
              </div>
              <div className="skill-card">
                <h3 className="skill-title">Backend</h3>
                <div className="tags">
                  <span className="tag">Node.js</span>
                  <span className="tag">Express</span>
                  <span className="tag">Python</span>
                  <span className="tag">REST APIs</span>
                </div>
              </div>
              <div className="skill-card">
                <h3 className="skill-title">Cloud & DevOps</h3>
                <div className="tags">
                  <span className="tag">Docker</span>
                  <span className="tag">Kubernetes</span>
                  <span className="tag">AWS</span>
                  <span className="tag">CI/CD</span>
                  <span className="tag">Linux</span>
                </div>
              </div>
              <div className="skill-card">
                <h3 className="skill-title">Databases</h3>
                <div className="tags">
                  <span className="tag">MongoDB</span>
                  <span className="tag">Firebase</span>
                  <span className="tag">MySQL</span>
                </div>
              </div>
            </div>
          </section>

          {/* Education & More Section */}
          <section
            className="education-section"
            ref={(el) => (sectionsRef.current[2] = el)}
          >
            <div className="section-header">
              <h2 className="section-title">Education &amp; More</h2>
              <div className="accent-bar short"></div>
            </div>
            <div className="education-item">
              <div className="edu-header">
                <h3>B.Sc Computer Science</h3>
                <span className="edu-period">2022 - 2025</span>
              </div>
              <p className="institution">
                CHM College, Mumbai &mdash;{" "}
                <span className="highlight">CGPA: 8.20</span>
              </p>
              <div className="coursework">
                <h4>Key Coursework:</h4>
                <ul className="course-list">
                  <li>Data Structures &amp; Algorithms</li>
                  <li>Computer Networks</li>
                  <li>Database Systems</li>
                  <li>OOP Principles</li>
                </ul>
              </div>
            </div>
            {/* <div className="certifications">
              <h3 className="cert-title">Certifications</h3>
              <div className="cert-badges">
                <span className="cert-badge">AWS Cloud Practitioner</span>
                <span className="cert-badge">Docker Certified</span>
                <span className="cert-badge">CCNA</span>
              </div>
            </div> */}
            <div className="interests-social-wrapper">
              <div className="interests">
                <h3 className="interests-title">Hobbies</h3>
                <div className="interest-chips">
                  <span className="interest-chip">🔧 Web Development</span>
                  <span className="interest-chip">🎶 Music </span>
                  <span className="interest-chip">
                    🏋️ Fitness &amp; Strength Training
                  </span>
                </div>
              </div>
              <div className="social-links">
                <a
                  href="https://github.com/RaunakSingh19"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  <span className="social-icon">👨‍💻</span> GitHub
                </a>
                <a
                  href="https://linkedin.com/in/raunak-singh-8a0933284/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  <span className="social-icon">🔗</span> LinkedIn
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
