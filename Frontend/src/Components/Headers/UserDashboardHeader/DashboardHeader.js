import React, { useEffect, useState } from "react";
import { Navbar, Nav, Dropdown, Container } from "react-bootstrap";
import logo from "../../../Picture/Logo1.png";
import axios from "axios";
import { ApiUser } from "../../ApiUser.js";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import "./DashboardHeader.css";

const DashboardHeader = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${ApiUser}/getUserprofile`, { withCredentials: true }) // Replace with your actual API URL
      .then((response) => {
        // console.log(response.data[0]);

        setUser({
          ...response.data[0],
          picturePreview: response.data[0]?.picture
            ? `http://localhost:8000/uploads/${response.data[0].picture}`
            : null,
        });
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);
  const handleLogoutBtn = () => {
    Cookies.remove('userToken');
    alert('logout');
    navigate('/user/login');
  };

  // console.log("this is data " , user);

  return (
    <Navbar
      variant="light"
      expand="lg"
      className="fixed"
      style={{ backgroundColor: "#f8f9fa" }}
    >
      <Container fluid>
        <Navbar.Brand href="#home" style={{ marginLeft: "50px" }}>
          <img
            src={logo}
            alt="Logo"
            width="80"
            height="60"
            className="d-inline-block align-top me-2"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto p-2">
            <Nav.Link
              href="/user/dashboard"
              className="nav-link custom-nav-link"
              style={
                window.location.pathname === "/user/dashboard"|| window.location.pathname === "/user/dashboard/UserBookRides"
                  ? {
                      fontWeight: "bold",
                      color: "#dc3545",
                      borderBottom: "2px solid #dc3545",
                    }
                  : {}
              }
            >
              Home
            </Nav.Link>
            <Nav.Link
              href="/user/currentRides"
              className="nav-link custom-nav-link"
              style={
                window.location.pathname === "/user/currentRides"
                  ? {
                      fontWeight: "bold",
                      color: "#dc3545",
                      borderBottom: "2px solid #dc3545",
                    }
                  : {}
              }
            >
              Current Rides 
            </Nav.Link>

            <Nav.Link
              href="/user/BookedRides"
              className="nav-link custom-nav-link"
              style={
                window.location.pathname === "/user/BookedRides"
                  ? {
                      fontWeight: "bold",
                      color: "#dc3545",
                      borderBottom: "2px solid #dc3545",
                    }
                  : {}
              }
            >
            Booked  Rides 
            </Nav.Link>

        
          </Nav>
          <Nav className="d-flex align-items-center">
            <Dropdown>
              <Dropdown.Toggle
                variant="text"
                className="text-dark d-flex align-items-center border-0 me-3"
              >
                <img
                  src={user.picturePreview}
                  alt="Profile"
                  width="40"
                  height="40"
                  className="rounded-circle me-2"
                />
                <span className="fw-bold">
                  {user.first_name} {user.last_name}
                </span>
              </Dropdown.Toggle>
              <Dropdown.Menu align="center">
                <Dropdown.Item href="/user/profile">Profile</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item  onClick={handleLogoutBtn}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default DashboardHeader;
