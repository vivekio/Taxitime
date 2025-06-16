import React from "react";
import MainHeader from "../../Headers/MainHeader/MainHeader.js";
import support from "../../../Picture/customer.png";
import secure from "../../../Picture/secure.png";
import { useState } from "react";
import "../ForgetPassword/ForgetPassword.css";
import axios from "axios";
import { ApiUser } from "../../ApiUser.js";

import { Link , useNavigate } from "react-router-dom";
import Footer from "../../Footer/Footer.js";
import { toast , ToastContainer } from "react-toastify";

const ForgetPassword = () => {
  // const [error, setError] = useState(null);
  // const [success, setSuccess] = useState(null);
  const [email, setEmail] = useState("");
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false);


  const handlesendoptsubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try{
      const  response = await axios.post(`${ApiUser}/send-otp` , {email: email});
      console.log(response.data);
      toast.success("OTP sent successfully")
      // setSuccess("OTP sent successfully")
      setTimeout(() => {
        setIsLoading(false)
        navigate("/user/login/forgetpassword/Forgetoptinput");
      }, 1000);
    }
    catch(err){
      // setError(err.response.data.message)
      toast.error(err.response.data.error)
      setIsLoading(false)
      console.log(err)  
    }
  }

  return (
    <>
      <MainHeader />
      <ToastContainer/>
      <div className="container-fluid img-bg">
        <div className="container text-center">
          <h1 className="user-text text-center animate__animated animate__fadeIn animate__delay-0.9s">
            Welcome Back!
          </h1>
          <p className="login-text text-center animate__animated animate__fadeIn animate__delay-0.9s">
            Please Enter your mail
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
            <p className="forget-tag mt-5">Forget password</p>
            <form onSubmit={handlesendoptsubmit}>
              <input
                type="text"
                placeholder="Enter your email"
                className="user-login-input my-3 text-center"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div>
                <button disabled={isLoading} className="login-submit my-4">
                  {" "}
                  {isLoading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Logging in...
                    </>
                  ) : (
                    "Send opt →"
                  )}
                </button>
                {/* <button className="login-submit my-4"> Send opt →</button> */}
              </div>
              <p>Don’t have an account on TaxiTime.</p>
              <Link to="/user/login" className="text-start register_link">
                Login Here.
              </Link>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ForgetPassword;
