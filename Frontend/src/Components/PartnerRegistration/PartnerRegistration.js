import React from "react";
import support from "../../Picture/customer.png";
import secure from "../../Picture/secure.png";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./PartnerRegistration.css";
import axios from "axios";
import { ApiUser } from "../ApiUser.js";
// import TopHeader from "../Headers/TopHeader/TopHeader.js";
import MainHeader from "../Headers/MainHeader/MainHeader.js";
import Footer from "../Footer/Footer.js";
import { toast, ToastContainer } from "react-toastify";

const PartnerRegistration = () => {
  const [inputText, setinputText] = useState({
    first_name: "",
    last_name: "",
    mobile: "",
    email: "",
    password: "",
    confirm_password: "",
    service: "",
    service_model: "",
    service_number: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);
  // const [inputerrors, setinputErrors] = useState({});
  // const [isChecked, setIsChecked] = useState(false);
  // const [FormSubmitted, setFormSubmitted] = useState(false);
  // const [errorReg, setErrorReg] = useState(null);
  // const [successReg, setSuccessReg] = useState(null);

  const [errors, setErrors] = useState({});
  // const validateForm = () => {
  //   let newErrors = {};
  //   const numberPattern = /^\d{10}$/;
  //   const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  //   const passwordPattern =
  //     /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;

  //   if (!inputText.first_name.trim())
  //     newErrors.first_name = "First Name is required.";
  //   if (!inputText.last_name.trim())
  //     newErrors.last_name = "Last Name is required.";
  //   if (!inputText.email.trim()) {
  //     newErrors.email = "Email is required.";
  //   } else if (!emailPattern.test(inputText.email)) {
  //     newErrors.email = "Enter a valid email address.";
  //   }
  //   if (!inputText.mobile.trim()) {
  //     newErrors.mobile = "Phone number is required.";
  //   } else if (!numberPattern.test(inputText.mobile)) {
  //     newErrors.mobile = "Phone number must be 10 digits.";
  //   }
  //   if (!inputText.password) {
  //     newErrors.password = "Password is required.";
  //   } else if (!passwordPattern.test(inputText.password)) {
  //     newErrors.password =
  //       "Password must be 8-20 characters with 1 number, 1 capital letter, 1 lowercase letter, and 1 symbol.";
  //   }
  //   if (!inputText.confirm_password) {
  //     newErrors.confirm_password = "Confirm Password is required.";
  //   } else if (inputText.confirm_password !== inputText.password) {
  //     newErrors.confirm_password = "Passwords do not match.";
  //   }
  //   if (!inputText.service) {
  //     newErrors.service = "select service ";
  //   }
  //   if (!inputText.service_model) {
  //     newErrors.service_model = "service model is required.";
  //   }
  //   if (!inputText.service_number) {
  //     newErrors.service_number = "service number is required.";
  //   }

  //   setErrors(newErrors);
  //   return Object.keys(newErrors).length === 0;
  // };

  const partnerinputEvent = (event) => {
    const { name, value } = event.target;
    setinputText({
      ...inputText,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  // const handleCheckbox = (e) => {
  //   setIsChecked(e.target.checked);
  // };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const numberpattern = /^\d{10}$/;
    // const emailpattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    // const passwordpattern =
    //   /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;
    // setFormSubmitted(true);

    // const newErrors = {};

    // if (inputText.first_name == "") {
    //   newErrors.first_name = "Firstname is required.";
    // }

    // if (inputText.last_name == "") {
    //   newErrors.last_name = "Lastname is required.";
    // }

    // if (inputText.mobile == "") {
    //   newErrors.mobile = "Phone number is Required.";
    // } else if (!numberpattern.test(inputText.mobile)) {
    //   newErrors.mobile =
    //     "Please enter a valid phone number with a country code.";
    // }

    // if (inputText.email == "") {
    //   newErrors.email = "Email is required.";
    // } else if (!emailpattern.test(inputText.email)) {
    //   newErrors.email = "Please enter valid email format.";
    // }

    // if (inputText.password == "") {
    //   newErrors.password = "Password is Required";
    // } else if (!passwordpattern.test(inputText.password)) {
    //   newErrors.password =
    //     "Password requirements: 8-20 characters, 1 number, 1 capital letter, 1 lowercase letter, 1 symbol.";
    // }

    // if (inputText.confirm_password == "") {
    //   newErrors.confirm_password = "Confirm Password is required";
    // } else if (inputText.confirm_password !== inputText.password) {
    //   newErrors.confirm_password =
    //     "Password and Confirm password is not matching";
    // }

    // if (inputText.service == "") {
    //   newErrors.service = "Please select an option.";
    // }

    // if (inputText.service_model == "") {
    //   newErrors.service_model = "Car Model is required.";
    // }

    // if (inputText.service_number == "") {
    //   newErrors.service_number = "Car Number is required.";
    // }

    // if (!isChecked) {
    //   newErrors.acceptTerms = "";
    // }
    console.log(inputText);
    // if (!validateForm()) return;
    setIsLoading(true);

    try {
      const response = await axios.post(
        `${ApiUser}/registerProvider`,
        inputText
      );
      if (response.status === 200) {
        // setinputErrors({});
        toast.success("Registration successfull");
        // setSuccessReg("Register successfull");
        // setErrorReg(null);
        setTimeout(() => {
          setIsLoading(false);
          navigate("/partner/login");
        }, 3000);
      }
    } catch (error) {
      toast.error(error.response.data.error[0]);
      setIsLoading(false);
      // setFormSubmitted(true);
      // setSuccessReg(null);
      // setErrorReg(error.response.data.error);
      console.error("API Error:", error);
    }
    // setinputErrors(newErrors);
  };

  const handleoption = async () => {
    axios
      .get(`${ApiUser}/getservicename`)
      .then((response) => {
        console.log(response.data);

        setOptions(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    handleoption();
  }, []);

  document.title = "Partner Registration";
  return (
    <>
      {/* <TopHeader /> */}
      <MainHeader />
      <ToastContainer />
      <title>Partner Registration</title>
      <div className="container-fluid partner-img-bg">
        <div className="container text-center">
          <h1 className="user-text text-center animate__animated animate__fadeIn animate__delay-0.9s">
            Welcome Back!
          </h1>
          <p className="login-text text-center animate__animated animate__fadeIn animate__delay-0.9s">
            Please register partner account
          </p>
          {/* <div className="partner-button">
            <button className="btn btn-dark me-4 button-section rounded-0 partner-btn-user partner-btn-user1">
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
          <div className="col-lg-6 col-md-12 col-sm-12 col-12 partner-register-form text-center mt-5">
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
            <p
              className="partner-register-tag mt-5"
              style={{ marginRight: "355px" }}
            >
              Register
            </p>
            <form onSubmit={handleSubmit}>
              <div className="partner-register-form">
                <div>
                  <input
                    type="text"
                    placeholder="First Name"
                    className="partner-register-input my-3 text-center"
                    name="first_name"
                    value={inputText.first_name}
                    onChange={partnerinputEvent}
                  />
                  {errors.first_name && (
                    <p className="error">{errors.first_name}</p>
                  )}
                  {/* {FormSubmitted && inputerrors.first_name && (
                    <p className="err">{inputerrors.first_name}</p>
                  )} */}
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="partner-register-input my-3 text-center"
                    name="last_name"
                    value={inputText.last_name}
                    onChange={partnerinputEvent}
                  />
                  {errors.last_name && (
                    <p className="error">{errors.last_name}</p>
                  )}
                  {/* {FormSubmitted && inputerrors.last_name && (
                    <p className="err">{inputerrors.last_name}</p>
                  )} */}
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Phone Number"
                    className="partner-register-input my-3 text-center"
                    name="mobile"
                    maxLength={10}
                    value={inputText.mobile}
                    onChange={partnerinputEvent}
                  />
                  {errors.mobile && <p className="error">{errors.mobile}</p>}
                  {/* {FormSubmitted && inputerrors.mobile && (
                    <p className="err">{inputerrors.mobile}</p>
                  )} */}
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="partner-register-input my-3 text-center"
                    name="email"
                    value={inputText.email}
                    onChange={partnerinputEvent}
                  />
                  {errors.email && <p className="error">{errors.email}</p>}
                  {/* {FormSubmitted && inputerrors.email && (
                    <p className="err">{inputerrors.email}</p>
                  )} */}
                </div>
                <div>
                  <input
                    type="password"
                    placeholder="Password"
                    className="partner-register-input my-3 text-center"
                    name="password"
                    value={inputText.password}
                    onChange={partnerinputEvent}
                  />
                  {errors.password && (
                    <p className="error">{errors.password}</p>
                  )}
                  {/* {FormSubmitted && inputerrors.password && (
                    <p className="err">{inputerrors.password}</p>
                  )} */}
                </div>
                <div>
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    className="partner-register-input my-3 text-center"
                    name="confirm_password"
                    value={inputText.confirm_password}
                    onChange={partnerinputEvent}
                  />
                  {errors.confirm_password && (
                    <p className="error">{errors.confirm_password}</p>
                  )}
                  {/* {FormSubmitted && inputerrors.confirm_password && (
                    <p className="err">{inputerrors.confirm_password}</p>
                  )} */}
                </div>
                <div>
                  <select
                    name="service"
                    id="service"
                    className="partner-register-input my-3 text-center"
                    value={inputText.service.id}
                    onChange={partnerinputEvent}
                  >
                    {options?.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                  {errors.service && (
                    <p className="error">{errors.service}</p>
                  )}
                  {/* {FormSubmitted && inputerrors.selectedOption && (
                    <p className="err">{inputerrors.selectedOption}</p>
                  )} */}
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="wheeler Model"
                    className="partner-register-input my-3 text-center"
                    name="service_model"
                    value={inputText.service_model}
                    onChange={partnerinputEvent}
                  />{" "}
                  {errors.service_model && (
                    <p className="error">{errors.service_model}</p>
                  )}
                  {/* {FormSubmitted && inputerrors.service_model && (
                    <p className="err">{inputerrors.service_model}</p>
                  )} */}
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="wheeler Number as GJ-10-xx-1234"
                    className="partner-register-input my-3 text-center"
                    name="service_number"
                    value={inputText.service_number}
                    onChange={partnerinputEvent}
                  />
                  {errors.service_model && (
                    <p className="error">{errors.service_model}</p>
                  )}
                  {/* {FormSubmitted && inputerrors.service_number && (
                    <p className="err">{inputerrors.service_number}</p>
                  )} */}
                </div>
                <div>
                  <label>
                    <input
                      type="checkbox"
                      // checked={isChecked}
                      // onChange={handleCheckbox}
                      required
                    />{" "}
                    I accept the terms and conditions
                  </label>
                  {/* {FormSubmitted && inputerrors.acceptTerms && (
                    <p className="err">{inputerrors.acceptTerms}</p>
                  )} */}
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
                {/* <button className="partner-register-submit mt-5 mb-3">
                  Register →
                </button> */}
                <p>Already registered on TaxiTime.</p>
                <Link
                  to="/partner/login"
                  className="text-start partner-login_link"
                >
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

export default PartnerRegistration;
