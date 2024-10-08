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
  const [isLoading, setIsLoading] = useState(false); // State for loading spinner
  const [error, setError] = useState(null); // State to handle errors
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading to true when form is submitted
    setError(null); // Clear any previous errors

    axios.post('http://localhost:3001/register', { name, email, password })
      .then(result => {
        navigate('/login');
        setIsLoading(false); // Stop loading after request
      })
      .catch(err => {
        console.log(err);
        setError("An error occurred during registration."); // Generic error message
        setIsLoading(false); // Stop loading on error
      });
  };

  const backgroundImageStyle = {
    backgroundImage: `url(${background})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={backgroundImageStyle}
    >
      <div className="bg-white p-3 rounded w-25">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name">
              <strong>Name:</strong>
            </label>
            <input
              type="text"
              placeholder="Enter Name"
              autoComplete="off"
              name="name"
              className="form-control rounded-8"
              onChange={(e) => setName(e.target.value)}
              disabled={isLoading} // Disable input when loading
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email:</strong>
            </label>
            <input
              type="email"
              placeholder="Enter email"
              autoComplete="off"
              name="email"
              className="form-control rounded-8"
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading} // Disable input when loading
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              <strong>Password:</strong>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              autoComplete="off"
              name="password"
              className="form-control rounded-8"
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading} // Disable input when loading
            />
          </div>
          {error && <p className="text-danger">{error}</p>} {/* Display error message */}
          <button
            type="submit"
            className="btn btn-success w-100 rounded-0"
            disabled={isLoading} // Disable button when loading
          >
            {isLoading ? (
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> // Loading spinner
            ) : (
              "Register"
            )}
          </button>
        </form>
        <p>Already Have an Account</p>
        <Link
          to="/login"
          className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none"
        >
          Login
        </Link>
      </div>
    </div>
  );
}

export default Signup;
