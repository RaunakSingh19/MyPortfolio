import '../stylesheets/HomePage.css';
const Homepage1 = () => {


  return (
    <div className="about-page">
      {/* Hero Section */}
      <div className="about-hero">
        <div className="hero-content">
          <h1 className="hero-title">
            About <span className="highlight">Raunak Singh</span>
          </h1>
          <p className="hero-subtitle">
            Computer Science graduate with hands-on experience in building full-stack applications. 
            Strong grasp of software development fundamentals and modern frameworks.
          </p>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">40+</span>
              <span className="stat-label">Active Users</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">8.00</span>
              <span className="stat-label">CGPA</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">Fresher</span>
              <span className="stat-label">Greaduated From CHM College</span>
            </div>
          </div>
        </div>
        <div className="hero-decorations">
          <div className="decoration-circle circle-1"></div>
          <div className="decoration-circle circle-2"></div>
          <div className="decoration-circle circle-3"></div>
        </div>
      </div>


    </div>
  );
};

export default Homepage1;