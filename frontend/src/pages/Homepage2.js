import "../stylesheets/HomePage2.css";
import ProfilePic from "../assets/images/mypic3.1.png"; // PNG with transparent bg

const HomePage = () => {
  return (
    <div className="hero-banner">
      {/* Large Portfolio text in background */}
      <div className="portfolio-bg-text">PORTFOLIO</div>

      {/* Left Section: Name, Role, Intro */}
      <div className="portfolio-left-block">
        <div className="portfolio-name">
          Hi, I’m <span className="name">Raunak Singh</span>
        </div>
        <div className="portfolio-role-stack">
          <span className="portfolio-role">Full-Stack Developer</span>
          <span className="portfolio-detail">WEB DEV | <span className="portfolio-detail-italic">CCNA</span></span>
        </div>
        {/* If you want to add the intro text back, uncomment below */}
        
      </div>

      {/* Center Profile Image */}
      <div className="portfolio-profile">
        <img
          src={ProfilePic}
          alt="Raunak Singh"
          className="profile-pic-png"
        />
      </div>

      {/* Right Section: Collaboration */}
      <div className="portfolio-right-block">
        <div className="portfolio-collab-decorative">
          Open for Collaboration
          <br />
          <span className="portfolio-collab-detail">NETWORKING | DEVELOPER</span>
        </div>
      </div>

      {/* Bottom Left: Contact */}
      <div className="portfolio-intro">
          I build scalable apps and modern tech<br />for real-world problems.
        </div>
    </div>

  );
};

export default HomePage; 