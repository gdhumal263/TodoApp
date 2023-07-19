import { useEffect, useState } from "react";
import User from "../model/user";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import UserService from "../services/UserService";
import "./css/register.css";

const Register = () => {
  const [user, setUser] = useState(new User("", ""));
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const currentUser = useSelector((state) => state.user);

  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser?.id) {
      navigate("/profile");
    }
  }, []);

  
  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser((prevState) => {
     
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();

    setSubmitted(true);

    if (!user.username || !user.password) {
      return;
    }

    setLoading(true);

    
       UserService.register(user)
      .then((_) => {
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
        if (error?.response?.status === 409) {
          setErrorMessage("username or password is not valid.");
        } else {
          setErrorMessage("Unexpected error occurred.");
        }
        setLoading(false);
      });
  };

  return (
    <div className="container mt-5">
      <div className="card ms-auto me-auto p-3 shadow-lg custom-card">

        {errorMessage && (
          <div className="alert alert-danger">{errorMessage}</div>
        )}

        <form
          onSubmit={(e) => handleRegister(e)}
          noValidate
          className={submitted ? "was-validated" : ""}
        >
         
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              name="username"
              className="form-control"
              placeholder="username"
              value={user.username}
              onChange={(e) => handleChange(e)}
              required
            />
            <div className="invalid-feedback">Username is required.</div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="password"
              value={user.password}
              onChange={(e) => handleChange(e)}
              required
            />
            <div className="invalid-feedback">Password is required.</div>
          </div>

          <button className="btn btn-info w-100 mt-3" disabled={loading}>
            Sign Up
          </button>
        </form>

        <Link
          to="/login"
          className="btn btn-link"
          style={{ color: "darkgray" }}
        >
          I have an Account!
        </Link>
      </div>
    </div>
  );
};

export default Register;
