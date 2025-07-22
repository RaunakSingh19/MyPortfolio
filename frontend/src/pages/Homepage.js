import '../stylesheets/HomePage.css';
const AboutPage = () => {
  // const projects = [
  //   {
  //     title: "Gym & Fitness Platform",
  //     tech: "MERN Stack",
  //     users: "40+ Active Users",
  //     description: "Full-stack web application with dynamic membership management, custom workout plans, and admin dashboard for tracking user progress and revenue insights.",
  //     features: ["Diet Planners", "Food Recommendations", "Admin Dashboard", "User Management"]
  //   },
  //   {
  //     title: "Habit Streak Tracker",
  //     tech: "Flutter",
  //     users: "25+ Daily Users",
  //     description: "Cross-platform mobile app for building and tracking healthy habits with intuitive calendar visualization and smooth user interactions.",
  //     features: ["Zoomable Calendar", "Swipe-based Tracking", "Habit History", "Progress Analytics"]
  //   }
  // ];

  const education = [
    {
      degree: "Bachelor of Science in Computer Science",
      institution: "Chandibai Himathmal Mansukhani College",
      year: "2022 - 2025",
      cgpa: "8.00",
      courses: ["OOPS", "DBMS", "DSA", "Networking", "Discrete Mathematics", "Operating Systems", "Web Development"]
    },
    {
      degree: "Higher Secondary Certificate (12th)",
      institution: "KC College",
      year: "2021 - 2022",
      percentage: "54%",
      courses: ["Information Technology", "Physics", "Chemistry", "Mathematics"]
    },
 {
      degree: "Secondary School Certificate (10th)",
      institution: "Dolphin English High School And Jr College",
      year: "2019 - 2020",
      grade: "75%",
      icon: "🏫",
      courses: []
    }
  ];

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
              <span className="stat-number">Freasher</span>
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


 <div className="education-sections">
        <div className="container">
          <h2 className="section-title">
            <span className="title-icon">📖</span> Education Journey
          </h2>
          <div className="education-timeline">
            {education.map((edu, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-marker">{edu.icon}</div>
                <div className="timeline-content">
                  <div className="education-header">
                    <h3 className="degree">{edu.degree}</h3>
                    <span className="year">{edu.year}</span>
                  </div>
                  <p className="institution">{edu.institution}</p>
                  {edu.courses.length > 0 && (
                    <div className="courses-section">
                      <h4 className="courses-title">Key Courses:</h4>
                      <div className="courses-list">
                        {edu.courses.map((course, idx) => (
                          <span key={idx} className="course-tag">{course}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;