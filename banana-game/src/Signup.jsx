// import { useState } from "react";
// import { Link } from "react-router-dom";
// import background from "./img/background_image_banana.jpg";
// import axios from 'axios'
// import { useNavigate } from "react-router-dom";

// function Signup() {
//     const[name, setName] = useState()
//     const[email, setEmail] = useState()
//     const[password, setPassword] = useState()
//     const navigate = useNavigate()

//     const handleSubmit = (e) => {
//         e.preventDefault()
//         axios.post('http://localhost:3001/register',{name, email, password})
//         .then(result => {console.log(result)
//         navigate('/login')    
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
//         <h2>Register</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-3">
//             <label htmlFor="email">
//               <strong>Name:</strong>
//             </label>
//             <input
//               type="text"
//               placeholder="Enter Name"
//               autoComplete="off"
//               name="email"
//               className="form-control rounded-8"
//               onChange={(e) => setName(e.target.value)}
//             />
//           </div>
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
//             Register
//           </button>
//         </form>
//         <p>Already Have an Account</p>
//         <Link
//           to="/login"
//           className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none"
//         >
//           Login
//         </Link>
//       </div>
//     </div>
//   );
// }

// export default Signup;

import { useState } from "react";
import { Link } from "react-router-dom";
import background from "./img/background_image_banana.jpg";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
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
    if (!name || !email || !password) {
      setError("Please fill in all fields.");
      setIsLoading(false);
      return;
    }

    axios.post('http://localhost:3001/register', { name, email, password })
      .then(result => {
        setSuccessMessage("Successfully registered!"); // Set success message
        setTimeout(() => navigate('/login'), 2000); // Redirect after 2 seconds
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        setError("An error occurred during registration.");
        setIsLoading(false);
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundImage: `url(${background})`, backgroundSize: "cover", backgroundPosition: "center" }}>
      <div className="bg-white p-3 rounded w-25">
        <h2>Register</h2>
        {error && <div className="alert alert-danger">{error}</div>} {/* Error message */}
        {successMessage && <div className="alert alert-success">{successMessage}</div>} {/* Success message */}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name"><strong>Name:</strong></label>
            <input
              type="text"
              placeholder="Enter Name"
              autoComplete="off"
              name="name"
              className="form-control rounded-8"
              onChange={(e) => setName(e.target.value)}
              disabled={isLoading}
            />
          </div>
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
            ) : "Register"}
          </button>
        </form>
        <p>Already Have an Account</p>
        <Link to="/login" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">Login</Link>
      </div>
    </div>
  );
}

export default Signup;

