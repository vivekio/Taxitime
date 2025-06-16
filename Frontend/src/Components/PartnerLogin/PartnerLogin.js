import React from "react";
import support from "../../Picture/customer.png";
import secure from "../../Picture/secure.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./PartnerLogin.css";
import axios from "axios";
import { ApiUser } from "../ApiUser.js";
// import TopHeader from "../Headers/TopHeader/TopHeader.js";
import MainHeader from "../Headers/MainHeader/MainHeader.js";
import Footer from "../Footer/Footer.js";
import { toast , ToastContainer} from "react-toastify";
 
const PartnerLogin = () => {
  // const [error, setError] = useState(null);
  // const [success, setSuccess] = useState(null);
  // const [FormSubmitted, setFormSubmitted] = useState(false);
  // const [inputerrors, setinputErrors] = useState({});
  const [inputText, setinputText] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const partnerinputEvent = (event) => {
    const { name, value } = event.target;
    setinputText((oldvalues) => {
      console.log(oldvalues);
      return {
        ...oldvalues,
        [name]: value,
      };
    });
  };

  const navigate = useNavigate();

  const handleloginSubmit = async (e) => {
    e.preventDefault();
    // setFormSubmitted(true);
    setIsLoading(true);
    const newErrors = {};
    if (inputText.email == "") {
      newErrors.email = "Email is required.";
    }

    if (inputText.password == "") {
      newErrors.password = "Password is required.";
    }
    try {
      const response = await axios.post(`${ApiUser}/loginProvider`, inputText  ,{withCredentials: true});
      console.log(response);
      if (response.status === 200) {
        // setinputErrors({});
        toast.success("Login successful");
        // setSuccess("Login successful");
        // setError(null);
        setTimeout(() => {
          setIsLoading(false);
          navigate("/Partner/dashboard");
        }, 1000);
      } 
    } catch (error) {
      toast.error(error.response.data.error);
      setIsLoading(false);
      // setFormSubmitted(true);
      // setSuccess(null);
      // setError(error.response.data.message);
      console.error("API Error:", error.response.data.message);
    }
    // setinputErrors(newErrors);
  };

  document.title = "Partner Login";
  return (
    <>
      {/* <TopHeader /> */}
      <MainHeader />
      <ToastContainer/>
      <title>Partner Login</title>
      <div className="container-fluid partner-img-bg">
        <div className="container text-center">
          <h1 className="user-text text-center animate__animated animate__fadeIn animate__delay-0.9s">
            Welcome Back!
          </h1>
          <p className="login-text text-center animate__animated animate__fadeIn animate__delay-0.9s">
            Please login to your Partner account
          </p>
          {/* <div className="partner-button">
            <button className="btn btn-dark me-4 button-section rounded-0 btn-user partner-btn-user1">
              USER APP
            </button>
            <button className="btn btn-outline-light button-section rounded-0 partner-btn-user1">
              PARTNER APP
            </button>
          </div> */}
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-6 col-md-12 col-sm-12 partner-service-bg">
            <img src={support} className="partner-image-login" alt="customer" />
            <p className="partner-service-login">24/7 Customer Support</p>
            <p className="partner-text-login">
              We make all charges clear to you upfront.
              <br />
              No extra charges or hidden fees
            </p>
            <div className="partner-login-line"></div>
            <img src={secure} className="partner-image-login" alt="payment" />
            <p className="partner-service-login">100% Secure Payment</p>
            <p className="partner-text-login">
              3D Secure online payment system to
              <br />
              protect your data.
            </p>
          </div>
          <div className="col-lg-6 col-md-12 col-sm-12 col-12 partner-login-form text-center mt-5">
            {/* {success && (
              <div className="alert alert-success alert-msg" role="alert">
                {success}
              </div>
            )}
            {(error === "Please Enter Valid Email" ||
              error === "Your Password is not Valid") && (
              <div className="alert alert-danger alert-msg" role="alert">
                {error}
              </div>
            )} */}
            <p
              className="partner-login-tag mt-5"
              style={{ marginRight: "355px" }}
            >
              Login
            </p>
            <form onSubmit={handleloginSubmit}>
              <div>
                <input
                  type="text"
                  placeholder="Enter your email"
                  className="partner-login-input my-3 text-center"
                  name="email"
                  value={inputText.email}
                  onChange={partnerinputEvent}
                />
                {/* {FormSubmitted && inputerrors.email && (
                  <p className="partner-err">{inputerrors.email}</p>
                )} */}
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Password"
                  className="partner-login-input my-3 text-center"
                  value={inputText.password}
                  name="password"
                  onChange={partnerinputEvent}
                />
                {/* {FormSubmitted && inputerrors.password && (
                  <p className="partner-err">{inputerrors.password}</p>
                )} */}
              </div>
              <Link to="/partner/login/forgetpassword" className="forget-pswd">
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
                {/* <button className="partner-login-submit my-4">Login →</button> */}
              </div>
              <p>Don’t have an account on TaxiTime.</p>
              <Link
                to="/partner/registration"
                className="text-start partner-register_link"
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

export default PartnerLogin;
