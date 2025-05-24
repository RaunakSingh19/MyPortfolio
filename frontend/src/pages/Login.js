// import React, { useState } from "react";
// import axios from "axios";
// import '../stylesheets/Auth.css'

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState(false);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setMessage('');
//     setError(false);

//     try {
//       const res = await axios.post(
//         'https://your-backend-url.com/api/auth/login', // Replace with actual endpoint
//         { email, password },
//         { withCredentials: true }
//       );

//       if (res.status === 200) {
//         setMessage('Login successful!');
//         setError(false);
//         // Optional: redirect or store token
//       }
//     } catch (err) {
//       setMessage('Login failed. Please check your credentials.');
//       setError(true);
//     }
//   };

//   return (
//     <div className="auth-container">
//       <h2 className="auth-title">Login to Your Account</h2>

//       <form className="auth-form" onSubmit={handleLogin}>
//         <input
//           className="auth-input"
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />

//         <input
//           className="auth-input"
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />

//         <button type="submit" className="auth-button">
//           Login
//         </button>

//         {message && (
//           <div className={`auth-message ${error ? 'error-message' : 'success-message'}`}>
//             {message}
//           </div>
//         )}
//       </form>

//       <div className="auth-footer">
//         Don’t have an account?
//         <a href="/register" className="auth-link">Register</a>
//       </div>
//     </div>
//   );
// };

// export default Login;



import React, { useState } from "react";
import '../stylesheets/Auth.css';
import { useAuth } from "../context/authcontext"; // import context

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);

  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('');
    setError(false);

    const result = await login({ email, password });

    if (result.success) {
      setMessage("Login successful!");
      setError(false);
      // navigation handled inside context
    } else {
      setMessage(result.error || "Login failed.");
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
