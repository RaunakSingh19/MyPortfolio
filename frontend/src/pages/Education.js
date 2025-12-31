import React from "react";
import "../stylesheets/Education.css";

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
      courses: ["English","Hindi","Marathi","Maths","Science","Social Studies"]
    }
  ];

  const Education = () => {
    return (
        <div className="about-page">
         <div className="education-section">
  <div className="container">
    <h2 className="section-title">
      <span className="title-icon">🎓</span> Education Journey
    </h2>
    <div className="education-grid">
      {education.map((edu, index) => (
        <div key={index} className="education-card">
          <div className="card-header">
            <h3 className="degree">{edu.degree}</h3>
            <span className="year">{edu.year}</span>
          </div>
          <p className="institution">{edu.institution}</p>

          {edu.cgpa && <p className="edu-info">CGPA: <span>{edu.cgpa}</span></p>}
          {edu.percentage && <p className="edu-info">Percentage: <span>{edu.percentage}</span></p>}
          {edu.grade && <p className="edu-info">Grade: <span>{edu.grade}</span></p>}

          {edu.courses.length > 0 && (
            <div className="courses-section">
              <h4 className="courses-title">Key Courses</h4>
              <div className="courses-list">
                {edu.courses.map((course, idx) => (
                  <span key={idx} className="course-tag">{course}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
</div>
</div>
    )
  }

  export default Education; 