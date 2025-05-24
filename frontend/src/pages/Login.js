//  import React, { useState } from 'react';
// import { login } from '../utils/auth';
// import '../stylesheets/Auth.css';

// const Login = ({ onLogin }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setIsLoading(true);
//     try {
//       const data = await login(email, password);
//       onLogin(data.user);
//     } catch (err) {
//       setError(err.response?.data?.error || 'Login failed. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="auth-container">
//       <h2 className="auth-title">Welcome Back</h2>
//       <form className="auth-form" onSubmit={handleSubmit}>
//         <input
//           className="auth-input"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           type="email"
//           placeholder="Email address"
//           required
//         />
//         <input
//           className="auth-input"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           type="password"
//           placeholder="Password"
//           required
//         />
//         <button 
//           className="auth-button" 
//           type="submit"
//           disabled={isLoading}
//         >
//           {isLoading ? 'Signing in...' : 'Sign In'}
//         </button>
//         {error && <div className="auth-message error-message">{error}</div>}
//       </form>
//       {/* <div className="auth-footer">
//         Don't have an account? 
//         <a href="/register" className="auth-link">Sign up</a>
//       </div> */}
//     </div>
//   );
// };

// export default Login;
import React, { useState } from "react";
import axios from "axios";
import '../stylesheets/Auth.css'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('');
    setError(false);

    try {
      const res = await axios.post(
        'https://your-backend-url.com/api/auth/login', // Replace with actual endpoint
        { email, password },
        { withCredentials: true }
      );

      if (res.status === 200) {
        setMessage('Login successful!');
        setError(false);
        // Optional: redirect or store token
      }
    } catch (err) {
      setMessage('Login failed. Please check your credentials.');
      setError(true);
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">Login to Your Account</h2>

      <form className="auth-form" onSubmit={handleLogin}>
        <input
          className="auth-input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          className="auth-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="auth-button">
          Login
        </button>

        {message && (
          <div className={`auth-message ${error ? 'error-message' : 'success-message'}`}>
            {message}
          </div>
        )}
      </form>

      <div className="auth-footer">
        Don’t have an account?
        <a href="/register" className="auth-link">Register</a>
      </div>
    </div>
  );
};

export default Login;