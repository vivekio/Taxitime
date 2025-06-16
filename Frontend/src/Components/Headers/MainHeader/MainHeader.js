import React from "react";
import logo from "../../../Picture/Logo1.png";
import "./MainHeader.css";
import { NavLink } from "react-router-dom";

const MainHeader = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light nav-main">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img src={logo} className="logo-image" alt="logo" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle Navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  to="/"
                  style={({ isActive }) =>
                    isActive
                      ? {
                        borderRadius: "10px",
                          backgroundColor: "#dd3751",
                          color: "white",
                          fontSize: "20px",
                          fontWeight: "700",
                          padding: "10px",
                          textDecoration: "none",
                        }
                      : {
                          color: "black",
                          fontSize: "20px",
                          fontWeight: "700",
                          textDecoration: "none",
                        }
                  }
                  className="nav-link nav-tab"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    class="bi bi-house"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z" />
                  </svg>
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/user/login"
                  style={({ isActive }) =>
                    isActive
                      ? {
                        borderRadius: "10px",
                          backgroundColor: "#dd3751",
                          color: "white",
                          fontSize: "20px",
                          fontWeight: "700",
                          padding: "10px",
                          textDecoration: "none",
                        }
                      : {
                          color: "black",
                          fontSize: "20px",
                          fontWeight: "700",
                          textDecoration: "none",
                        }
                  }
                  className="nav-link nav-tab"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    margin="5px"
                    padding="5px"
                    fill="currentColor"
                    class="bi bi-person-circle"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                    <path
                      fill-rule="evenodd"
                      d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                    />
                  </svg>
                  User Login
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/partner/login"
                  style={({ isActive }) =>
                    isActive
                      ? {
                        borderRadius: "10px",
                          backgroundColor: "#dd3751",
                          color: "white",
                          fontSize: "20px",
                          fontWeight: "700",
                          padding: "10px",
                          textDecoration: "none",
                        }
                      : {
                          color: "black",
                          fontSize: "20px",
                          fontWeight: "700",
                          textDecoration: "none",
                        }
                  }
                  className="nav-link nav-tab"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    class="bi bi-bicycle"
                    viewBox="0 0 16 16"
                  >
                    <path d="M4 4.5a.5.5 0 0 1 .5-.5H6a.5.5 0 0 1 0 1v.5h4.14l.386-1.158A.5.5 0 0 1 11 4h1a.5.5 0 0 1 0 1h-.64l-.311.935.807 1.29a3 3 0 1 1-.848.53l-.508-.812-2.076 3.322A.5.5 0 0 1 8 10.5H5.959a3 3 0 1 1-1.815-3.274L5 5.856V5h-.5a.5.5 0 0 1-.5-.5m1.5 2.443-.508.814c.5.444.85 1.054.967 1.743h1.139zM8 9.057 9.598 6.5H6.402zM4.937 9.5a2 2 0 0 0-.487-.877l-.548.877zM3.603 8.092A2 2 0 1 0 4.937 10.5H3a.5.5 0 0 1-.424-.765zm7.947.53a2 2 0 1 0 .848-.53l1.026 1.643a.5.5 0 1 1-.848.53z" />
                  </svg>
                  Partner Login
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/contact"
                  style={({ isActive }) =>
                    isActive
                      ? {
                        borderRadius: "10px",
                          backgroundColor: "#dd3751",
                          color: "white",
                          fontSize: "20px",
                          fontWeight: "700",
                          padding: "10px",
                          textDecoration: "none",
                        }
                      : {
                          color: "black",
                          fontSize: "20px",
                          fontWeight: "700",
                          textDecoration: "none",
                        }
                  }
                  className="nav-link nav-tab"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    class="bi bi-person-lines-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5m.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1z" />
                  </svg>
                  Contact Us
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default MainHeader;
