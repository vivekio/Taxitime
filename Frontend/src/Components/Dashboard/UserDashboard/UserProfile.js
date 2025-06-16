import React, { useEffect, useState ,useRef  } from "react";
import MainCard from "../../layout/DshboardCard.js";
import { Form, Button, Container, Row, Col, InputGroup } from "react-bootstrap";
import { Eye, EyeOff, Mail, Phone, Lock } from "lucide-react";

import { ApiUser } from "../../ApiUser.js";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import axios from "axios";
// import Image from "next/image"

const customStyles = `
  .custom-primary-btn {
    background-color: #dc3545 !important;
    border-color: #dc3545 !important;
  }

  .custom-primary-btn:hover, 
  .custom-primary-btn:focus, 
  .custom-primary-btn:active {
    background-color: #dc3545 !important;
    border-color: #dc3545 !important;
  }

  .custom-form-control:focus {
  border-radius: 0.25rem;
    border-color: #dc3545;
    box-shadow: 0 0 0 0.25rem #dc3545(196, 30, 58, 0.25);
  }

  .btn-primary {
    background-color: #dc3545;
    border-color: #dc3545;
  }

  .btn-primary:hover,
  .btn-primary:focus,
  .btn-primary:active {
    background-color: #dc3545 !important;
    border-color: #dc3545 !important;
  }

  .form-control:focus {
    border-color: #dc3545;
    box-shadow: 0 0 0 0.25rem rgba(196, 30, 58, 0.25);
  }
`;
const UserProfilePage = () => {
    const fileInputRef = useRef(null);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    mobile: "",
    picture: "",
    picturePreview: null,
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        picture: file, // Store the selected file
        picturePreview: URL.createObjectURL(file), // Generate preview
      }));
    }
  };
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };
  const validateForm = () => {
    let newErrors = {}; // Local variable to store errors

    if (!formData.first_name) newErrors.first_name = "First name is required";
    if (!formData.last_name) newErrors.last_name = "Last name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.mobile) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = "Invalid mobile number";
    }

    if (formData.newPassword && formData.newPassword.length < 6) {
      newErrors.newPassword = "Password must be at least 6 characters";
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors({ ...newErrors }); // Ensuring reactivity
    console.log("this is  bbbbbbb", newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const fetchUser = async () => {
    try {
      const response = await axios.get(`${ApiUser}/getUserprofile`, {
        withCredentials: true,
     
      });
      console.log(response.data[0]);
      setFormData({
        ...response.data[0],
        picturePreview: response.data[0]?.picture
          ? `http://localhost:8000/uploads/${response.data[0].picture}`
          : null,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors({ ...errors, [e.target.name]: "" });
  };

  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     if (!validateForm()) return;
  //     const data ={
  //         first_name: formData.first_name,
  //         last_name: formData.last_name,
  //         email: formData.email,
  //         mobile: formData.mobile,
  //         picture: formData.picture,
  //         currentPassword: formData.currentPassword,
  //         newPassword: formData.newPassword,
  //         confirmPassword: formData.confirmPassword
  //       }
  //       console.log("Form submitted:", data);
  //       console.log("this is from datad ", formData);
  //     };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const data = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      email: formData.email,
      mobile: formData.mobile,
      picture: formData.picture || formData.picturePreview,
      currentPassword: formData.currentPassword,
      newPassword: formData.newPassword,
    };

    console.log("datadtadatadtadtadat", data);
    
    try {
      const response = await axios.put(`${ApiUser}/UpdateUserprofile`, data, {
        headers: {
            "Content-Type": "multipart/form-data",
          },
        withCredentials: true,
      });
      if(response.status === 200) {
        toast.success(response.data.message);
        setTimeout(() => {
           
            window.location.reload();
        }, 2000);
      }
      
    } catch (error) {
toast.error(error.response.data.error)
        console.log(error.response.data.error);
        

    }
  };
  return (
    <MainCard>
        <ToastContainer/>
      <style>{customStyles}</style>
      <Container fluid className="px-3 py-4">
        <Row className="justify-content-center align-items-top">
          <h2 className="mb-4  border-bottom pb-3" style={{ color: "#dc3545" }}>
            User Profile
          </h2>
          <Col
            md={10}
            className="d-flex flex-column flex-md-row align-items-center"
          >
            {/* Left Section: Profile Info */}
            <Col md={4} className="text-center text-md-start ">
              <div className="d-flex flex-column align-items-center">
                <img
                  src={formData.picturePreview}
                  width={120}
                  height={120}
                  alt="Profile"
                  className="rounded-circle border mb-3"
                  style={{ objectFit: "cover" }}
                />
                <h4 className="mb-1">
                  {formData.first_name} {formData.last_name}
                </h4>
                {/* <p className="text-muted mb-1">Rides: -</p> */}
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <Button
                  variant="primary"
                  size="sm"
                  className="custom-primary-btn mt-2"
                  onClick={handleUploadClick}
                >
                      Upload New Photo
                      </Button>
              </div>
            </Col>

            {/* Right Section: User Form */}
            <Col md={8}>
              <Form onSubmit={handleSubmit}>
                <Row className="mb-4">
                  <Col md={6} className="mb-3">
                    <Form.Group>
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="eg. Alaa"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        className="custom-form-control"
                        isInvalid={!!errors.first_name}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.first_name}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="eg. Mohamed"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        className="custom-form-control"
                        isInvalid={!!errors.last_name}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.last_name}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-4 pb-4 border-bottom">
                  <Col md={6} className="mb-3">
                    <Form.Group>
                      <Form.Label>Email Address</Form.Label>
                      <InputGroup>
                        <InputGroup.Text className="bg-light">
                          <Mail size={18} />
                        </InputGroup.Text>
                        <Form.Control
                          type="email"
                          placeholder="your.email@example.com"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="custom-form-control"
                          isInvalid={!!errors.email}
                        />{" "}
                        <Form.Control.Feedback type="invalid">
                          {errors.email}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Phone Number</Form.Label>
                      <InputGroup>
                        <InputGroup.Text className="bg-light">
                          <Phone size={18} />
                        </InputGroup.Text>
                        <Form.Control
                          type="tel"
                          placeholder="1234567890"
                          name="mobile"
                          value={formData.mobile}
                          onChange={handleChange}
                          className="custom-form-control"
                          isInvalid={!!errors.mobile}
                        />{" "}
                        <Form.Control.Feedback type="invalid">
                          {errors.mobile}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={6} className="mb-3">
                    <Form.Group>
                      <Form.Label>Current Password</Form.Label>
                      <InputGroup>
                        <InputGroup.Text className="bg-light">
                          <Lock size={18} />
                        </InputGroup.Text>
                        <Form.Control
                          type={showCurrentPassword ? "text" : "password"}
                          placeholder="Enter current password"
                          name="currentPassword"
                          value={formData.currentPassword}
                          onChange={handleChange}
                          className="custom-form-control"
                          isInvalid={!!errors.currentPassword}
                        />

                        <Button
                          variant="light"
                          onClick={() =>
                            setShowCurrentPassword(!showCurrentPassword)
                          }
                        >
                          {showCurrentPassword ? (
                            <EyeOff size={18} />
                          ) : (
                            <Eye size={18} />
                          )}
                        </Button>
                        <Form.Control.Feedback type="invalid">
                          {errors.currentPassword}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>New Password</Form.Label>
                      <InputGroup>
                        <InputGroup.Text className="bg-light">
                          <Lock size={18} />
                        </InputGroup.Text>
                        <Form.Control
                          type={showNewPassword ? "text" : "password"}
                          placeholder="Enter new password"
                          name="newPassword"
                          value={formData.newPassword}
                          onChange={handleChange}
                          className="custom-form-control"
                          isInvalid={!!errors.newPassword}
                        />

                        <Button
                          variant="light"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                          {showNewPassword ? (
                            <EyeOff size={18} />
                          ) : (
                            <Eye size={18} />
                          )}
                        </Button>
                        <Form.Control.Feedback type="invalid">
                          {errors.newPassword}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-4 pb-4 border-bottom">
                  <Col md={12}>
                    <Form.Group>
                      <Form.Label>Confirm New Password</Form.Label>
                      <InputGroup>
                        <InputGroup.Text className="bg-light">
                          <Lock size={18} />
                        </InputGroup.Text>
                        <Form.Control
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm new password"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          className="custom-form-control"
                          isInvalid={!!errors.confirmPassword}
                        />

                        <Button
                          variant="light"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                        >
                          {showConfirmPassword ? (
                            <EyeOff size={18} />
                          ) : (
                            <Eye size={18} />
                          )}
                        </Button>
                        <Form.Control.Feedback type="invalid">
                          {errors.confirmPassword}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                  </Col>
                </Row>

                <div className="d-flex justify-content-end gap-2">
                  <Button variant="outline-secondary" type="button">
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    type="submit"
                    className="custom-primary-btn"
                  >
                    Save Changes
                  </Button>
                </div>
              </Form>
            </Col>
          </Col>
        </Row>
      </Container>
    </MainCard>
  );
};

export default UserProfilePage;
