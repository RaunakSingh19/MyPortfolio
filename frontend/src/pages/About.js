import React, { useEffect, useRef } from 'react';
import ProfileImg from '../assets/images/mypic2.jpg'; // Replace with your profile image path
import '../stylesheets/About.css';

const About = () => {
  const sectionsRef = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      sectionsRef.current.forEach(section => {
        if (!section) return;
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight - 80) {
          section.style.opacity = 1;
          section.style.transform = 'translateY(0) scale(1)';
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="about-container">
      <div className="about-grid">
        {/* Main About Section */}
        <section
          className="profile-section"
          ref={el => (sectionsRef.current[0] = el)}
        >
          <div className="profile-image-wrapper">
            <img
              src={ProfileImg}
              className="profile-image"
              alt="Raunak Singh"
              loading="lazy"
            />
          </div>
          <div className="profile-about">
            <h1 className="profile-name">Raunak Singh</h1>
            <div className="profile-location">
              <span>📍</span>
              <span>Living in Mumbai, Maharashtra, India</span>
            </div>
            <div className="profile-location">
              <span>🌄</span>
              <span>Originally from Punjab, India</span>
            </div>
            <p className="profile-summary">
              I'm a passionate Full-Stack Developer and Cloud Engineer with a strong focus on building robust, scalable, and secure web applications. With a love for cloud-native technologies and automation, I enjoy designing systems that are as elegant as they are efficient. <br />
              <br />
              Currently, I'm pursuing a B.Sc in Computer Science, and constantly exploring new tech and open-source ecosystems. I thrive on creativity, collaboration, and bringing innovative ideas to life.<br />
            </p>
            <a
              className="contact-btn"
              href="mailto:raunaksingh142004@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>📫</span> Contact Me
            </a>
          </div>
        </section>

        {/* Skills Section */}
        <section
          className="skills-card"
          ref={el => (sectionsRef.current[1] = el)}
        >
          <div className="section-header">
            <h2 className="section-title">Technical Expertise</h2>
            <div className="accent-bar short"></div>
          </div>
          <div className="skills-grid">
            <div className="skill-category">
              <h3 className="category-title">Frontend</h3>
              <div className="skill-tags">
                <span className="skill-tag primary">JavaScript</span>
                <span className="skill-tag primary">React</span>
                <span className="skill-tag primary">HTML5</span>
                <span className="skill-tag primary">CSS3</span>
              </div>
            </div>
            <div className="skill-category">
              <h3 className="category-title">Backend</h3>
              <div className="skill-tags">
                <span className="skill-tag secondary">Node.js</span>
                <span className="skill-tag secondary">Express</span>
                <span className="skill-tag secondary">Python</span>
              </div>
            </div>
            <div className="skill-category">
              <h3 className="category-title">DevOps & Cloud</h3>
              <div className="skill-tags">
                <span className="skill-tag tertiary">Docker</span>
                <span className="skill-tag tertiary">Kubernetes</span>
                <span className="skill-tag tertiary">AWS</span>
                <span className="skill-tag tertiary">CI/CD</span>
              </div>
            </div>
            <div className="skill-category">
              <h3 className="category-title">Databases</h3>
              <div className="skill-tags">
                <span className="skill-tag primary">MongoDB</span>
                <span className="skill-tag primary">Firebase</span>
                <span className="skill-tag primary">MySQL</span>
              </div>
            </div>
          </div>
        </section>

        {/* Education & More Section */}
        <section
          className="education-card"
          ref={el => (sectionsRef.current[2] = el)}
        >
          <div className="section-header">
            <h2 className="section-title">Education & Beyond</h2>
            <div className="accent-bar short"></div>
          </div>
          <div className="education-item">
            <div className="edu-header">
              <h3>B.Sc Computer Science</h3>
              <span className="edu-period">2022 - 2025</span>
            </div>
            <p className="institution">CHM College, Mumbai &mdash; CGPA: 7.75</p>
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
          <div className="certifications">
            <h3 className="cert-title">Certifications</h3>
            <div className="cert-badges">
              <span className="cert-badge">AWS Cloud Practitioner</span>
              <span className="cert-badge">Docker Certified</span>
              <span className="cert-badge">CCNA</span>
            </div>
          </div>
          <div className="interests">
            <h3 className="interests-title">Interests</h3>
            <p className="interest-item">
              <span className="interest-icon">🔧</span> Cloud Automation &amp; Open Source
            </p>
            <p className="interest-item">
              <span className="interest-icon">🎶</span> Music &amp; Sound Design
            </p>
            <p className="interest-item">
              <span className="interest-icon">🏋️</span> Fitness &amp; Strength Training
            </p>
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
        </section>
      </div>
    </div>
  );
};

export default About;