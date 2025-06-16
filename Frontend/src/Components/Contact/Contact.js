
import React, { useState } from "react";
import contactpic from "../../Picture/contact2.png";
import "./Contact.css";
import MainHeader from "../Headers/MainHeader/MainHeader.js";
import Footer from "../Footer/Footer.js";
import axios from "axios";
import { ApiUser } from "../ApiUser.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  document.title = "Contact";

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // Loading state

  const validate = () => {
    let newErrors = {};
    if (!formData.fullname.trim()) newErrors.fullname = "Full name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true); // Start loading
    try {
      const response = await axios.post(`${ApiUser}/contact`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        toast.success("Message sent successfully!"); // Success toast
        setFormData({ fullname: "", email: "", subject: "", message: "" }); // Reset form
        setErrors({});
      }
    } catch (error) {
      toast.error("Error sending message!"); // Error toast
      console.error("Error sending message:", error);
    }
    setLoading(false); // Stop loading
  };

  return (
    <>
      <MainHeader />
      <ToastContainer position="top-right" autoClose={3000} /> {/* Toasts */}
      <div className="container-fluid contact-img-bg">
        <div className="container text-center contact-panel">
          <h1 className="contact-text">
            We would love to hear <br /> from you
          </h1>
        </div>
      </div>
      <div className="container text-center">
        <h1 className="contact-provide">Get in touch with us</h1>
        <p style={{ fontSize: "15px" }}>
          Lorem Ipsum passages, and more recently with desktop publishing
          software like <br /> aldus pageMaker including versions of all the
          Lorem Ipsum generators
        </p>
      </div>
      <div className="container" style={{height:"700px"}} >
        <div className="row">
          <div className="col-lg-6 col-md-12 col-sm-12 text-center contact-form">
            <form onSubmit={handleSubmit} noValidate >
              <div>
                <input
                  type="text"
                  placeholder="Full Name"
                  className="contact-input my-3 text-center"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleChange}
                />
                {errors.fullname && <p className="error-text">{errors.fullname}</p>}

                <input
                  type="text"
                  placeholder="Email"
                  className="contact-input my-3 text-center"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <p className="error-text">{errors.email}</p>}

                <input
                  type="text"
                  placeholder="Subject"
                  className="contact-input my-3 text-center"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                />
                {errors.subject && <p className="error-text">{errors.subject}</p>}

                <textarea
                  placeholder="Your message"
                  className="contact-input-msg my-3 text-center"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                />
                {errors.message && <p className="error-text">{errors.message}</p>}
              </div>
              <button className="contact-submit mt-5 mb-3" type="submit" disabled={loading}>
                {loading ? "Submitting..." : "Submit ▶"}
              </button>
            </form>
          </div>
          <div className="col-lg-6 col-md-12 col-sm-12 text-center">
            <img src={contactpic} className="contact-img" alt="contact" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
