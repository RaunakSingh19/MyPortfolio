import React, { useState } from "react";
import image1 from "../assets/images/mypic5.jpg"
import {
  QrCode,
  Mail,
  Phone,
  Globe,
  MapPin,
  Linkedin,
  Github,
  Twitter,
  MessageCircle,
  Download,
} from "lucide-react";
import "../stylesheets/DigitalBusinessCard.css";

const cardData = {
  name: "Raunak Singh",
  title: "Full Stack Developer",
  company: "Open to all Opportunities",
  email: "raunaksingh142004@gmail.com",
  phone: "+91 9819689221",
  website: "https://my-portfolio-five-ashy-23.vercel.app",
  location: "Mumbai, India",
  bio: "",
  socialLinks: {
    linkedin: "https://www.linkedin.com/in/raunak-singh-8a0933284",
    github: "https://github.com/RaunakSingh19",
    twitter: "https://x.com/Raunak142004?t=_-EfXG1z1AqrIFVfy-nPng&s=08",
  },
};

const generateQRCode = (data) => {
  const vCard = `BEGIN:VCARD
VERSION:3.0
FN:${data.name}
ORG:${data.company}
TITLE:${data.title}
EMAIL:${data.email}
TEL:${data.phone}
URL:${data.website}
NOTE:${data.bio}
END:VCARD`;
  const encodedData = encodeURIComponent(vCard);
  return `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodedData}`;
};

const DigitalBusinessCard = () => {
  const [showQR, setShowQR] = useState(false);
  const whatsappLink = `https://wa.me/919819689221?text=Hi%20Raunak,%20I%20visited%20your%20portfolio%20and%20would%20like%20to%20connect!`;
  const resumeLink = "/RaunakSingh_Resume.pdf";

  return (
    <div className="card-bg">
      <div className="glass-card">
        <div className="profile-header">
          <div className="avatar-ring">
            <img
              src={image1}
              alt="Raunak"
            />
          </div>
          <h2>{cardData.name}</h2>
          <p className="title">
            {cardData.title} <span>• {cardData.company}</span>
          </p>
          <p className="bio">{cardData.bio}</p>
        </div>

        <div className="info">
          <div>
            <Mail size={18} />
            <a href={`mailto:${cardData.email}`}>{cardData.email}</a>
          </div>
          <div>
            <Phone size={18} />
            <a href={`tel:${cardData.phone}`}>{cardData.phone}</a>
          </div>
          <div>
            <Globe size={18} />
            <a href={cardData.website} target="_blank" rel="noreferrer">
              {cardData.website.replace(/^https?:\/\//, "")}
            </a>
          </div>
          <div>
            <MapPin size={18} />
            <span>{cardData.location}</span>
          </div>
        </div>

        <div className="socials">
          <a href={cardData.socialLinks.linkedin} target="_blank" rel="noreferrer">
            <Linkedin />
          </a>
          <a href={cardData.socialLinks.github} target="_blank" rel="noreferrer">
            <Github />
          </a>
          <a href={cardData.socialLinks.twitter} target="_blank" rel="noreferrer">
            <Twitter />
          </a>
        </div>

        <div className="buttons">
          <button
            className="btn"
            onClick={() => setShowQR(true)}
            aria-label="Show QR"
          >
            <QrCode size={20} />
            <em>SAVE CONTACT</em> - SHOW QR
          </button>
          <a href={whatsappLink} target="_blank" rel="noreferrer" className="btn green">
            <MessageCircle size={20} />
            Chat on WhatsApp
          </a>
          <a href={resumeLink} download className="btn purple">
            <Download size={20} />
            Download Resume
          </a>
        </div>
      </div>
      <div className="sideclass">
      {/* <h1>hello</h1> */}

      </div>

      {showQR && (
        <div className="qr-overlay" onClick={() => setShowQR(false)}>
          <div className="qr-popup" onClick={(e) => e.stopPropagation()}>
            <img src={generateQRCode(cardData)} alt="QR Code" />
            <p>Scan to Save Contact</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DigitalBusinessCard;
