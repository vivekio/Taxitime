import React from "react";
import support from "../../Picture/customer.png";
import secure from "../../Picture/secure.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./UserRegistration.css";
import axios from "axios";
import { ApiUser } from "../ApiUser.js";
import MainHeader from "../Headers/MainHeader/MainHeader.js";
import Footer from "../Footer/Footer.js";
import { ToastContainer, toast } from "react-toastify";

const UserRegistration = () => {
  // const [errorReg, setErrorReg] = useState(null);
  // const [successReg, setSuccessReg] = useState(null);
  // const [errors, setErrors] = useState({});
  // const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [userinputText, setuserinputText] = useState({
    first_name: "",
    last_name: "",
    mobile: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const validateForm = () => {
    let newErrors = {};
    const numberPattern = /^\d{10}$/;
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const passwordPattern =
      /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;

    if (!userinputText.first_name.trim())
      newErrors.first_name = "First Name is required.";
    if (!userinputText.last_name.trim())
      newErrors.last_name = "Last Name is required.";
    if (!userinputText.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!emailPattern.test(userinputText.email)) {
      newErrors.email = "Enter a valid email address.";
    }
    if (!userinputText.mobile.trim()) {
      newErrors.mobile = "Phone number is required.";
    } else if (!numberPattern.test(userinputText.mobile)) {
      newErrors.mobile = "Phone number must be 10 digits.";
    }
    if (!userinputText.password) {
      newErrors.password = "Password is required.";
    } else if (!passwordPattern.test(userinputText.password)) {
      newErrors.password =
        "Password must be 8-20 characters with 1 number, 1 capital letter, 1 lowercase letter, and 1 symbol.";
    }
    if (!userinputText.confirm_password) {
      newErrors.confirm_password = "Confirm Password is required.";
    } else if (userinputText.confirm_password !== userinputText.password) {
      newErrors.confirm_password = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const inputEvent = (event) => {
    const { name, value } = event.target;
    setuserinputText({
      ...userinputText,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    // ------ change the validateForm function ------- 
    // const numberpattern = /^\d{10}$/;
    // const emailpattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    // const passwordpattern =
    //   /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;

    // const newErrors = {};

    // if (userinputText.first_name == "") {
    //   newErrors.first_name = "Firstname is required.";
    // }

    // if (userinputText.last_name == "") {
    //   newErrors.last_name = "Lastname is required.";
    // }

    // if (userinputText.mobile == "") {
    //   newErrors.mobile = "Phone number is Required.";
    // } else if (!numberpattern.test(userinputText.mobile)) {
    //   newErrors.mobile =
    //     "Please enter a valid phone number with a country code.";
    // }

    // if (userinputText.email == "") {
    //   newErrors.email = "Email is required.";
    // } else if (!emailpattern.test(userinputText.email)) {
    //   newErrors.email = "Please enter valid email format.";
    // }

    // if (userinputText.password == "") {
    //   newErrors.password = "Password is Required";
    // } else if (!passwordpattern.test(userinputText.password)) {
    //   newErrors.password =
    //     "Password requirements: 8-20 characters, 1 number, 1 capital letter, 1 lowercase letter, 1 symbol.";
    // }

    // if (userinputText.confirm_password == "") {
    //   newErrors.confirm_password = "Confirm Password is required";
    // } else if (userinputText.confirm_password !== userinputText.password) {
    //   newErrors.confirm_password =
    //     "Password and Confirm password is not matching";
    // }

    if (!validateForm()) return;
    setIsLoading(true);
    try {
      const response = await axios.post(`${ApiUser}/register`, userinputText);
      if (response.status === 200) {
        // setErrors({});
        toast.success("Register successfull");
        // setErrorReg(null);
        setTimeout(() => {
          setIsLoading(false)
          navigate("/user/login");
        }, 1000);
      }
    } catch (error) {
      toast.error(error.response.data.error[0]);
      setIsLoading(false)
      // setIsFormSubmitted(true);
      // setSuccessReg(null);
      // setErrorReg(error.response.data.error);
      // console.error("API Error:", error);
    }
    // setIsLoading(false);
    // setErrors(newErrors);
  };

  document.title = "User Registration";
  return (
    <>
      {/* <TopHeader /> */}
      <MainHeader />
      <ToastContainer />
      <title>User Registration</title>
      <div className="container-fluid img-bg">
        <div className="container text-center">
          <h1 className="user-text text-center animate__animated animate__fadeIn animate__delay-0.9s">
            Welcome Back!
          </h1>
          <p className="login-text text-center animate__animated animate__fadeIn animate__delay-0.9s">
            Please Register to your account
          </p>
          {/* <div className="user-button">
            <button className="btn btn-dark me-4 button-section rounded-0 btn-user btn-user1">
              USER APP
            </button>
            <button className="btn btn-outline-light button-section rounded-0 btn-user1"> 
              PARTNER APP
            </button>
          </div> */}
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-6 col-md-12 col-sm-12 service-bg">
            <img src={support} className="image-login" alt="customer" />
            <p className="service-login">24/7 Customer Support</p>
            <p className="text-login">
              We make all charges clear to you upfront.
              <br />
              No extra charges or hidden fees
            </p>
            <div className="login-line"></div>
            <img src={secure} className="image-login" alt="payment" />
            <p className="service-login">100% Secure Payment</p>
            <p className="text-login">
              3D Secure online payment system to
              <br />
              protect your data.
            </p>
          </div>
          <div className="col-lg-6 col-md-12 col-sm-12 col-12 register-form text-center mt-5">
            {/* {successReg && (
              <div className="alert alert-success alert-msg" role="alert">
                {successReg}
              </div>
            )}
            {errorReg === "The email has already been taken." && (
              <div className="alert alert-danger alert-msg" role="alert">
                {errorReg}
              </div>
            )} */}
            <p className="register-tag mt-5" style={{ marginRight: "355px" }}>
              Register
            </p>
            <form onSubmit={handleSubmit}>
              <div className="form-register">
                <div>
                  <input
                    type="text"
                    placeholder="First Name"
                    className="register-input my-3 text-center"
                    name="first_name"
                    value={userinputText.first_name}
                    onChange={inputEvent}
                  />
                  {errors.first_name && (
                    <p className="error">{errors.first_name}</p>
                  )}
                  {/* {isFormSubmitted && errors.first_name && (
                    <p className="error">{errors.first_name}</p>
                  )} */}
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="register-input my-3 text-center"
                    name="last_name"
                    value={userinputText.last_name}
                    onChange={inputEvent}
                  />
                  {errors.last_name && (
                    <p className="error">{errors.last_name}</p>
                  )}
                  {/* {isFormSubmitted && errors.last_name && (
                    <p className="error">{errors.last_name}</p>
                  )} */}
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Phone Number"
                    className="register-input my-3 text-center"
                    name="mobile"
                    maxLength={10}
                    value={userinputText.mobile}
                    onChange={inputEvent}
                  />
                  {errors.mobile && <p className="error">{errors.mobile}</p>}
                  {/* {isFormSubmitted && errors.mobile && (
                    <p className="error">{errors.mobile}</p>
                  )} */}
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="register-input my-3 text-center"
                    name="email"
                    value={userinputText.email}
                    onChange={inputEvent}
                  />
                  {errors.email && <p className="error">{errors.email}</p>}
                  <br />
                  {/* {isFormSubmitted && errors.email && (
                    <p className="error">{errors.email}</p>
                  )} */}
                </div>
                <div>
                  <input
                    type="password"
                    placeholder="Password"
                    className="register-input my-3 text-center"
                    name="password"
                    value={userinputText.password} // .pswd change name to password
                    onChange={inputEvent}
                  />
                  {errors.password && (
                    <p className="error">{errors.password}</p>
                  )}
                  <br />
                  {/* {isFormSubmitted && errors.password && (
                    <p className="error">{errors.password}</p>
                  )} */}
                </div>
                <div>
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    className="register-input my-3 text-center"
                    name="confirm_password"
                    value={userinputText.confirm_password}
                    onChange={inputEvent}
                  />
                  {errors.confirm_password && (
                    <p className="error">{errors.confirm_password}</p>
                  )}
                  <br />
                  {/* {isFormSubmitted && errors.confirm_password && (
                    <p className="error">{errors.confirm_password}</p>
                  )} */}
                </div>
                <div>
                  <label>
                    <input type="checkbox" required /> I accept the terms and
                    conditions
                  </label>
                </div>
                <button disabled={isLoading} className="login-submit my-4">
                  {" "}
                  {isLoading ? (
                    <>
                      <span
                        className="spinner-border me-2 "
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Logging in...
                    </>
                  ) : (
                    "Register →"
                  )}
                </button>
                {/* <button className="register-submit mt-5 mb-3">
                  Register →
                </button> */}
                <p>Already registered on TaxiTime.</p>
                <Link to="/user/login" className="text-start login_link">
                  Plz Login Here.
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserRegistration;
