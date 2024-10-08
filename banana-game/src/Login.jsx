// import React from "react";
// import { useState } from "react";
// import { Link } from "react-router-dom";
// import background from "./img/background_image_banana.jpg";
// import axios from 'axios'
// import { useNavigate } from "react-router-dom";

// function Login(){
//     const[email, setEmail] = useState()
//     const[password, setPassword] = useState()
//     const navigate = useNavigate()

//     const handleSubmit = (e) => {
//         e.preventDefault()
//         axios.post('http://localhost:3001/login',{email, password})
//         .then(result => {
//             console.log(result)
//             if(result.data === "Success"){
//                 navigate('/home')  
//             }   
//         })
//         .catch(err=> console.log(err))
//     }

//     const backgroundImageStyle = {
//         backgroundImage: `url(${background})`, // Use the imported image here
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//       };

//   return (
//     <div
//       className="d-flex justify-content-center align-items-center vh-100"
//       style={backgroundImageStyle} // Apply background image style
//     >
//       <div className="bg-white p-3 rounded w-25">
//         <h2>Login</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-3">
//             <label htmlFor="email">
//               <strong>Email:</strong>
//             </label>
//             <input
//               type="email"
//               placeholder="Enter email"
//               autoComplete="off"
//               name="email"
//               className="form-control rounded-8"
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="email">
//               <strong>Password:</strong>
//             </label>
//             <input
//               type="text"
//               placeholder="Enter Password"
//               autoComplete="off"
//               name="password"
//               className="form-control rounded-8"
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>
//           <button type="submit" className="btn btn-success w-100 rounded-0">
//             Login
//           </button>
//         </form>
//         <p>Already Have an Account</p>
//         <Link
//           to="/register"
//           className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none"
//         >
//           SignUp
//         </Link>
//       </div>
//     </div>
//   );
// }

// export default Login;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import background from "./img/background_image_banana.jpg";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null); // State for success messages
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null); // Clear previous messages

    // Check for blank fields
    if (!email || !password) {
      setError("Please fill in all fields."); // Set error message for blank fields
      setIsLoading(false);
      return; // Exit the function early
    }

    axios.post('http://localhost:3001/login', { email, password })
      .then(result => {
        if (result.data === "Success") {
          setSuccessMessage("Successfully logged in!");
          setTimeout(() => navigate('/home'), 2000); // Redirect after 2 seconds
        } else {
          setError(result.data);
        }
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        setError("An error occurred during login.");
        setIsLoading(false);
      });
  };

  const backgroundImageStyle = {
    backgroundImage: `url(${background})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundImage: `url(${background})`, backgroundSize: "cover", backgroundPosition: "center" }}>
      <div className="bg-white p-3 rounded w-25">
        <h2>Login</h2>
        {successMessage && <div className="alert alert-success">{successMessage}</div>} {/* Success message */}
        {error && <div className="alert alert-danger">{error}</div>} {/* Error message */}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email"><strong>Email:</strong></label>
            <input
              type="email"
              placeholder="Enter email"
              autoComplete="off"
              name="email"
              className="form-control rounded-8"
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password"><strong>Password:</strong></label>
            <input
              type="password"
              placeholder="Enter Password"
              autoComplete="off"
              name="password"
              className="form-control rounded-8"
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <button
            type="submit"
            className="btn btn-success w-100 rounded-0"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            ) : "Login"}
          </button>
        </form>
        <p>Don't have an account?</p>
        <Link to="/register" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">SignUp</Link>
      </div>
    </div>
  );
}

export default Login;
