import React from "react";
import support from "../../Picture/customer.png";
import secure from "../../Picture/secure.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./UserLogin.css";
import axios from "axios";
import { ApiUser } from "../ApiUser.js";
import MainHeader from "../Headers/MainHeader/MainHeader.js";
import Footer from "../Footer/Footer.js";
import { ToastContainer, toast } from "react-toastify";



const UserLogin = () => {
  // const [error, setError] = useState(null);
  // const [success, setSuccess] = useState(null);
  // const [FormSubmitted, setFormSubmitted] = useState(false);
  // const [inputerrors, setinputErrors] = useState({});
  const [userinputText, setuserinputText] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const inputEvent = (event) => {
    const { name, value } = event.target;
    setuserinputText((oldvalues) => {
      return {
        ...oldvalues,
        [name]: value,
      };
    });
  };

  const navigate = useNavigate();

  const handleuserloginSubmit = async (e) => {
    e.preventDefault();
    // setFormSubmitted(true);
    setIsLoading(true);

    const newErrors = {};
    if (userinputText.email == "") {
      newErrors.email = "Email is required.";
    }

    if (userinputText.password == "") {
      newErrors.password = "Password is required.";
    }

    try {
      const response = await axios.post(`${ApiUser}/login`, userinputText, {
        withCredentials: true,
      });
      console.log(response);
      if (response.status === 200) {
        // setinputErrors({});
        toast.success("Login successful");
        // setSuccess("Login successful");
        // setError(null);
        setTimeout(() => {
          setIsLoading(false);
          navigate("/user/dashboard");
         
        }, 1000);
      }
    } catch (error) {
      toast.error(error.response.data.error[0]);
      setIsLoading(false)
      // setFormSubmitted(true);
      // setSuccess(null);
      // setError(error.response.data.message);
      console.error("API Error:", error.response.data.message);
    } }
  document.title = "User Login";
  return (
    <>
      {/* <TopHeader /> */}
      <MainHeader />
      <ToastContainer/>
      <title>User Login</title>
      <div className="container-fluid img-bg">
        <div className="container text-center">
          <h1 className="user-text text-center animate__animated animate__fadeIn animate__delay-0.9s">
            Welcome Back!
          </h1>
          <p className="login-text text-center animate__animated animate__fadeIn animate__delay-0.9s">
            Please login to your account
          </p>
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
          <div className="col-lg-6 col-md-12 col-sm-12 col-12 login-form text-center mt-5">
            {/* {success && (
              <div className="alert alert-success alert-msg" role="alert">
                {success}
              </div>
            )}
            {(error === "User not found !" ||
              error === "Password is not Valid") && (
              <div className="alert alert-danger alert-msg" role="alert">
                {error}
              </div>
            )} */}
            <p className="login-tag mt-5">Login</p>
            <form onSubmit={handleuserloginSubmit}>
              <div>
                <input
                  type="text"
                  placeholder="Enter your email"
                  className="user-login-input my-3 text-center"
                  name="email"
                  value={userinputText.email}
                  onChange={inputEvent}
                />
                {/* {FormSubmitted && inputerrors.email && (
                  <p className="err">{inputerrors.email}</p>
                )} */}
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Password"
                  className="user-login-input my-3 text-center"
                  value={userinputText.password}
                  name="password"
                  onChange={inputEvent}
                />
                {/* {FormSubmitted && inputerrors.password && (
                  <p className="err">{inputerrors.password}</p>
                )} */}
              </div>
              <Link to="ForgetPassword" className="forget-pswd">
                Forget Password ?
              </Link>

              <div>
                <button disabled={isLoading} className="login-submit my-4">
                  {" "}
                  {isLoading ? (
                    <>
                      <span
                        className="spinner-border "
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Logging in...
                    </>
                  ) : (
                    "Login"
                  )}
                </button>
              </div>
              <p>Don’t have an account on TaxiTime.</p>
              <Link
                to="/user/registration"
                className="text-start register_link"
              >
                Register Here.
              </Link>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserLogin;
