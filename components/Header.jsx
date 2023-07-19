import React from "react";
import logo from "./../logo.svg";
import "../App.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearCurrentUser } from "../store/actions/user";

const Header = () => {
  const currentUser = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = () => {
    dispatch(clearCurrentUser());
    navigate("/login");
  };

  return (
    <header>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark">
        <a href="https://reactjs.org" className="navbar-brand ms-1">
          <img src={logo} className="App-logo" alt="logo" />
        </a>
        <div className="navbar-nav me-auto">
          {currentUser && (
            <li className="nav-item">
              <NavLink to={"/welcome"} className="nav-link">
                Home
              </NavLink>
            </li>
          )}

          {currentUser && (
            <li className="nav-item">
              <NavLink to={"/todos"} className="nav-link">
                Todos
              </NavLink>
            </li>
          )}
        </div>
        <div className="navbar-nav navbar-collapse justify-content-end ms-auto">
          {!currentUser && (
            <li className="nav-item">
              <NavLink to={"/login"} className="nav-link">
                Login
              </NavLink>
            </li>
          )}
          {!currentUser && (
            <li className="nav-item">
              <NavLink to={"/register"} className="nav-link">
                Register
              </NavLink>
            </li>
          )}

          {currentUser && (
            <li className="nav-item">
              <a href="#" className="nav-link" onClick={() => logout()}>
                Sign Out
              </a>
            </li>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
