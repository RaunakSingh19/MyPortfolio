// import React, { useState } from 'react';
// import { QrCode, User, Mail, Phone, Globe, MapPin, Download, MessageCircle, Linkedin, Github, Twitter, Link } from 'lucide-react';
// import "../stylesheets/DigitalBusinessCard.css";

// const cardData = {
//   name: 'Raunak Singh',
//   title: 'Full Stack Developer',
//   company: 'Open to Opportunities',
//   email: 'raunaksingh142004@gmail.com',
//   phone: '+91 9819689221',
//   website: 'https://raunaksingh.dev',
//   location: 'Mumbai, India',
//   bio: 'Passionate about building modern web & software solutions. Experienced in JavaScript, React, Node.js, and DevOps. Always eager to learn and collaborate.',
//   socialLinks: {
//     linkedin: 'https://linkedin.com/in/raunaksingh19',
//     github: 'https://github.com/RaunakSingh19',
//     twitter: 'https://twitter.com/raunak_codes',
//     portfolio: 'https://raunaksingh.dev'
//   },
//   theme: {
//     background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
//     textColor: '#ffffff'
//   }
// };

// const generateQRCode = (data) => {
//   const vCard = `BEGIN:VCARD
// VERSION:3.0
// FN:${data.name}
// ORG:${data.company}
// TITLE:${data.title}
// EMAIL:${data.email}
// TEL:${data.phone}
// URL:${data.website}
// NOTE:${data.bio}
// END:VCARD`;
//   const encodedData = encodeURIComponent(vCard);
//   return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodedData}`;
// };

// const DigitalBusinessCard = () => {
//   const [showQR, setShowQR] = useState(false);

//   const whatsappLink = `https://wa.me/919819689221?text=Hi%20Raunak%2C%20I%20visited%20your%20portfolio%20and%20would%20like%20to%20connect!`;
//   const resumeLink = '/RaunakSingh_Resume.pdf';

//   return (
//     <div className="digitalcard-container">
//       <div className="digitalcard-wrapper">
//         <div className="digitalcard-combo">
//           {/* Main Card */}
//           <div
//             className="digitalcard-card"
//             style={{
//               background: cardData.theme.background,
//               color: cardData.theme.textColor
//             }}
//           >
//             <div className="digitalcard-header">
//               <div className="digitalcard-avatar"><User size={36} /></div>
//               <div>
//                 <h2 className="digitalcard-name">{cardData.name}</h2>
//                 <div className="digitalcard-detail">
//                   {cardData.title} <span className="dot-sep">•</span> {cardData.company}
//                 </div>
//               </div>
//             </div>
//             <div className="digitalcard-bio">{cardData.bio}</div>
//             <div className="digitalcard-contact">
//               <div>
//                 <Mail size={16} /><a href={`mailto:${cardData.email}`} className="digitalcard-link">{cardData.email}</a>
//               </div>
//               <div>
//                 <Phone size={16} /><a href={`tel:${cardData.phone.replace(/\s/g, '')}`} className="digitalcard-link">{cardData.phone}</a>
//               </div>
//               <div>
//                 <Globe size={16} />
//                 <a href={cardData.website} target="_blank" rel="noopener noreferrer" className="digitalcard-link">
//                   {cardData.website.replace(/^https?:\/\//, '')}
//                 </a>
//               </div>
//               <div>
//                 <MapPin size={16} /><span>{cardData.location}</span>
//               </div>
//             </div>
//             <div className="digitalcard-footer">
//               <span>Connect:</span>
//               <div className="digitalcard-socials">
//                 <a href={cardData.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn"><Linkedin size={20} /></a>
//                 <a href={cardData.socialLinks.github} target="_blank" rel="noopener noreferrer" title="GitHub"><Github size={20} /></a>
//                 <a href={cardData.socialLinks.twitter} target="_blank" rel="noopener noreferrer" title="Twitter"><Twitter size={20} /></a>
//                 <a href={cardData.socialLinks.portfolio} target="_blank" rel="noopener noreferrer" title="Portfolio"><Link size={20} /></a>
//               </div>
//               <div
//                 className="digitalcard-qr-mini"
//                 tabIndex={0}
//                 aria-label="Show QR code"
//                 onMouseEnter={() => setShowQR(true)}
//                 onMouseLeave={() => setShowQR(false)}
//                 onFocus={() => setShowQR(true)}
//                 onBlur={() => setShowQR(false)}
//               >
//                 <QrCode size={32} />
//                 <span className="digitalcard-qr-label">Click for QR</span>
//               </div>
//             </div>
//           </div>

//           {/* QR Code Popout: right on desktop, below on mobile */}
//           <div
//             className={`digitalcard-mainqr-popout-side${showQR ? " show" : ""}`}
//             onMouseEnter={() => setShowQR(true)}
//             onMouseLeave={() => setShowQR(false)}
//           >
//             <div className="digitalcard-mainqr-popout-inner">
//               <div className="digitalcard-mainqr-title">Scan My Contact</div>
//               <img src={generateQRCode(cardData)} alt="QR Code" />
//             </div>
//           </div>
//         </div>

//         {/* Buttons */}
//         <div className="digitalcard-btns">
//           <a
//             href={whatsappLink}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="digitalcard-btn digitalcard-btn-whatsapp"
//           >
//             <MessageCircle size={20} />
//             Chat on WhatsApp
//           </a>
//           <a
//             href={resumeLink}
//             download
//             className="digitalcard-btn digitalcard-btn-resume"
//           >
//             <Download size={20} />
//             Download Resume
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DigitalBusinessCard;

import React, { useState } from "react";
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
              src="https://avatars.githubusercontent.com/u/119954732?v=4"
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
            SHOW QR
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
