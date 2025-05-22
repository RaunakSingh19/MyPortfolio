import React, { useState } from 'react';
import { register } from '../utils/auth';
import '../stylesheets/Auth.css';

const Register = ({ onRegister }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);
    try {
      await register(name, email, password);
      setSuccess('Registration successful! You can now sign in.');
      if (onRegister) onRegister();
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">Create Account</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          className="auth-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full name"
          required
        />
        <input
          className="auth-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email address"
          required
        />
        <input
          className="auth-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          required
        />
        <button 
          className="auth-button" 
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? 'Creating account...' : 'Sign Up'}
        </button>
        {error && <div className="auth-message error-message">{error}</div>}
        {success && <div className="auth-message success-message">{success}</div>}
      </form>
      <div className="auth-footer">
        Already have an account? 
        <a href="/login" className="auth-link">Sign in</a>
      </div>
    </div>
  );
};

export default Register;