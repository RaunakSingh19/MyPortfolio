import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../stylesheets/Auth.css';

const SHIFT_KEY = 19;
const ORIGINAL_PASSWORD = 'raunak&raunak';
const STATIC_EMAIL = 'raunaksingh@gmail.com';

const encrypt = (text) => {
  return text
    .split('')
    .map((char) => {
      if (/[a-z]/.test(char)) {
        return String.fromCharCode(((char.charCodeAt(0) - 97 + SHIFT_KEY) % 26) + 97);
      } else if (/[A-Z]/.test(char)) {
        return String.fromCharCode(((char.charCodeAt(0) - 65 + SHIFT_KEY) % 26) + 65);
      } else {
        return char;
      }
    })
    .join('');
};

const ENCRYPTED_PASSWORD = encrypt(ORIGINAL_PASSWORD);

const Login = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [secondPassword, setSecondPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleFirstSubmit = (e) => {
    e.preventDefault();
    if (email === STATIC_EMAIL && encrypt(inputPassword) === ENCRYPTED_PASSWORD) {
      setStep(2);
      setMessage('');
      setInputPassword('');
    } else {
      setMessage('❌ Invalid email or password');
      setInputPassword('');
    }
  };

  const handleSecondSubmit = (e) => {
    e.preventDefault();
    if (secondPassword === 'access') {
      localStorage.setItem('isLoggedIn', 'true');
      setStep(3);
      setMessage('');
    } else {
      setMessage('❌ Wrong secondary password');
      setSecondPassword('');
    }
  };

  const redirectTo = (path) => {
    navigate(path);
  };

  return (
    <div className="auth-background">
      <div className="auth-container">
        <h2 className="auth-title">🔐 Secure Login</h2>

        {step === 1 && (
          <form className="auth-form" onSubmit={handleFirstSubmit}>
            <input
              className="auth-input"
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoFocus
            />
            <input
              className="auth-input"
              type="password"
              placeholder="Password"
              value={inputPassword}
              onChange={e => setInputPassword(e.target.value)}
              required
            />
            <button type="submit" className="auth-button">
              Continue
            </button>
          </form>
        )}

        {step === 2 && (
          <form className="auth-form" onSubmit={handleSecondSubmit}>
            <input
              className="auth-input"
              type="password"
              placeholder="Verification Code"
              value={secondPassword}
              onChange={e => setSecondPassword(e.target.value)}
              required
            />
            <button type="submit" className="auth-button">
              Verify
            </button>
          </form>
        )}

        {step === 3 && (
          <div className="auth-options">
            <p className="auth-success-message">✅ Login Successful</p>
            <button className="auth-option-button" onClick={() => redirectTo('/admin')}>
              Go to Admin Panel
            </button>
            <button className="auth-option-button" onClick={() => redirectTo('/dashboard')}>
              Go to Dashboard
            </button>
          </div>
        )}

        {message && <div className="auth-message error-message">{message}</div>}
      </div>

      {/* Particle-like effect with pure CSS */}
      <ul className="particles">
        {Array.from({ length: 30 }).map((_, i) => (
          <li key={i}></li>
        ))}
      </ul>
    </div>
  );
};

export default Login;
