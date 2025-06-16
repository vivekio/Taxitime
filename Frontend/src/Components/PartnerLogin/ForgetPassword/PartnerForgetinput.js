
import React from "react";
import MainHeader from "../../Headers/MainHeader/MainHeader.js";
import support from "../../../Picture/customer.png";
import secure from "../../../Picture/secure.png";
import { useState } from "react";
// import { Link } from "react-router-dom";
import Footer from "../../Footer/Footer.js";
import OtpInput from "react-otp-input";
import axios from "axios";
import { ApiUser } from "../../ApiUser.js";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const Frogetoptinput = () => {
  // const [error, setError] = useState(null);
  // const [success, setSuccess] = useState(null);
  const [otp, setOtp] = useState("");
    const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (value) => {
    setOtp(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      axios
        .post(`${ApiUser}/Provider-verify-otp`, { otp: otp })
        .then((res) => {
          console.log(res.data);
          toast.success(res.data.message);
        
          // setSuccess("OTP verified successfully");
          setTimeout(() => {
            setIsLoading(false);
            navigate("/partner/login");
          }, 2000);
        })
        .catch((err) => {
            toast.error(err.response.data.error);
          // setError(err.response.data.message);
          console.log(err);
        });
    } catch (err) {
      toast.error(err.response.data.error);
      // setError(err.response.data.message);
      console.log(err);
    }
  };
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
            <p className="forget-tag mt-5">Enter OTP </p>
            <div className="otp-input" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <OtpInput
                className="otp-input my-3 text-center"
                value={otp}
                onChange={handleChange}
                numInputs={6}
                separator={<span> - </span>}
                renderInput={(props) => <input {...props} />}
                inputStyle={{
                  width: "40px",
                  height: "40px",
                  margin: "5px",
                  fontSize: "20px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  textAlign: "center",
                  justifyContent: "center",
                }}
              />
            </div>
            <div>
            <button
                type="button"
                onClick={handleSubmit}
                className="login-submit my-4"
                disabled={isLoading} // Disable button when loading
              >
                {isLoading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Verifying...
                  </>
                ) : (
                  "Verify OTP →"
                )}
              </button>
              {/* <button
                onClick={handleSubmit}
                // disabled={otp.length !== 6}
                className="login-submit my-4"
              >
                verify OTP →
              </button> */}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Frogetoptinput;