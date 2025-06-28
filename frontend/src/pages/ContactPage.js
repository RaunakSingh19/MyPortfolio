import React from "react";
import "../stylesheets/ContactPage.css";
import ProfileImage from "../assets/images/mypic4.jpg"; // Replace with your actual image file

const ContactPage = () => {
  return (
    <div className="contact-container">
      <div className="contact-content">
        <div className="contact-text">
          <h1 className="headline">
            Hi, I'm <span className="highlight-name">Raunak Singh</span>
          </h1>
          <p className="contact-description">
            I'm open to new opportunities, collaboration, or just a friendly chat.
            Whether it's about web development, DevOps, or Networking.
          </p>

          <div className="contact-details">
            <p>📧 <strong>Email:</strong> <a href="mailto:raunaksingh142004@gmail.com">raunaksingh142004@gmail.com</a></p>
            <p>📱 <strong>Phone:</strong> <a href="tel:+91 9819689221">+91 9819689221</a></p>
            <p>✈️ <strong>Telegram:</strong> <a href="https://t.me/@Raunak1912" target="_blank" rel="noopener noreferrer">Raunak Singh</a></p>
            <p>📸 <strong>Instagram:</strong> <a href="https://instagram.com/dilauted" target="_blank" rel="noopener noreferrer">Dilauted</a></p>
             <p>🐦 <strong>Twitter:</strong> <a href="https://twitter.com/yourhandle" target="_blank" rel="noopener noreferrer">@yourhandle</a></p>
            <p>💼 <strong>LinkedIn:</strong> <a href="https://linkedin.com/in/raunaksingh19" target="_blank" rel="noopener noreferrer">Raunak</a></p>
            <p>📍 <strong>Address:</strong> Swastika Residency, Done Road, Vangani (421503)</p>
            <p>🏙️ <strong>City:</strong> Thane, Mumbai, India</p>
            
          </div>
        </div>

        <div className="contact-image-wrapper">
          <img src={ProfileImage} alt="Raunak Singh" className="contact-profile-image" />
        </div>
      </div>
      <hr></hr>

      <div className="contact-map-wrapper">
        <iframe
          title="Swastika Residency Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3146.8909422003653!2d73.30454623431696!3d19.09106996901635!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7f23cae99225d%3A0xb51d25076fe35a5b!2sSWASTIKA%20RESIDENCY%2C%20Done%2C%20Maharashtra%20421503!5e1!3m2!1sen!2sin!4v1747819768832!5m2!1sen!2sin"
          width="100%"
          height="350"
          style={{ border: 0, borderRadius: "16px" }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default ContactPage;
