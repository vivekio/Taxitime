
import React, { useState } from 'react';
import { Row, Col, OverlayTrigger, Form, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Card from '../../../../components/Card/MainCard';
import { Eye, EyeSlash } from 'react-bootstrap-icons';
import { toast, ToastContainer } from 'react-toastify';

const AddNewFleetowner = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    mobile: '',
    password: '',
    confirm_password: '',
    logo: '',
    logoPreview: ''
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const validateForm = () => {
    let newErrors = {};
    const numberpattern = /^\d{10}$/;
    const emailpattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const passwordpattern = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$/;

    if (!formData.name.trim()) newErrors.name = 'First Name is required.';
    if (!formData.company.trim()) newErrors.company = 'Last Name is required.';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!emailpattern.test(formData.email)) {
      newErrors.email = 'Enter a valid email address.';
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Phone number is required.';
    } else if (!numberpattern.test(formData.mobile)) {
      newErrors.mobile = 'Phone number must be 10 digits.';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required.';
    } else if (!passwordpattern.test(formData.password)) {
      newErrors.password = 'Password requirements: 8-20 characters, 1 number, 1 capital letter, 1 lowercase letter, 1 symbol.';
    }

    if (!formData.confirm_password) {
      newErrors.confirm_password = 'Confirm Password is required.';
    } else if (formData.confirm_password !== formData.password) {
      newErrors.confirm_password = 'Passwords do not match.';
    }
    if (!formData.logo) {
      newErrors.logo = 'Profile logo is required.';
    } else {
      const fileName = formData.logo.name;
      const fileExtension = fileName.toLowerCase().split('.').pop();

      const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];

      if (!allowedExtensions.includes(fileExtension)) {
        newErrors.logo = 'Only .jpg, .jpeg, .png, .gif, and .webp files are allowed.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };
  const handleFileChange = (e) => {
    // setFormData({ ...formData, logo: e.target.files[0], logoPreview: URL.createObjectURL(e.target.files[0]) });
    const file = e.target.files[0];
    if (file) {
      const fileExtension = file.name.toLowerCase().split('.').pop();
      const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];

      if (!allowedExtensions.includes(fileExtension)) {
        setErrors({ ...errors, logo: 'Only .jpg, .jpeg, .png, .gif, and .webp files are allowed.' });
        return;
      }

      setFormData({
        ...formData,
        logo: file,
        logoPreview: URL.createObjectURL(file)
      });
      setErrors({ ...errors, logo: '' });
    }
  };
  const handleSubmit = async (e) => {
    console.log(formData);

    e.preventDefault();
    if (validateForm()) {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('company', formData.company);
      data.append('email', formData.email);
      data.append('mobile', formData.mobile);
      data.append('password', formData.password);
      data.append('confirm_password', formData.confirm_password);
      if (formData.logo) {
        data.append('logo', formData.logo);
      }
      try {
        await axios.post(`http://localhost:8000/api/users/addnewfleetowner`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        console.log(formData);

        alert('New user add Successfully!');
        navigate('/basic/Fleetownerslist');
      } catch (error) {
        toast.error(error.response.data.error[0]);
      }
    }
  };
  return (
    <React.Fragment>
      <ToastContainer />
      <Row>
        <Col className="btn-page">
          <Card title="ADD NEW FLEET OWNER">
            <OverlayTrigger>
              <>
                <Container className="mt-4">
                  <Form onSubmit={handleSubmit} className="p-4 shadow rounded bg-light">
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Full Name</Form.Label>
                          <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} isInvalid={!!errors.name} />
                          <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Company</Form.Label>
                          <Form.Control
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            isInvalid={!!errors.company}
                          />
                          <Form.Control.Feedback type="invalid">{errors.company}</Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Email</Form.Label>
                          <Form.Control
                            type="text"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            isInvalid={!!errors.email}
                          />
                          <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Mobile</Form.Label>
                          <Form.Control
                            type="text"
                            name="mobile"
                            value={formData.mobile}
                            maxLength={10}
                            onChange={handleChange}
                            isInvalid={!!errors.mobile}
                          />
                          <Form.Control.Feedback type="invalid">{errors.mobile}</Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Password</Form.Label>
                          <div className="input-group">
                            <Form.Control
                              type={showPassword ? 'text' : 'password'}
                              name="password"
                              value={formData.password}
                              onChange={handleChange}
                              isInvalid={!!errors.password}
                            />
                            <Button variant="outline-secondary" onClick={() => setShowPassword(!showPassword)}>
                              {showPassword ? <EyeSlash /> : <Eye />}
                            </Button>
                            <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                          </div>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Confirm Password</Form.Label>
                          <Form.Control
                            type="password"
                            name="confirm_password"
                            value={formData.confirm_password}
                            onChange={handleChange}
                            isInvalid={!!errors.confirm_password}
                          />
                          <Form.Control.Feedback type="invalid">{errors.confirm_password}</Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Profile logo</Form.Label>
                          <Form.Control type="file" accept="image/*" onChange={handleFileChange} isInvalid={!!errors.logo} />
                          <Form.Control.Feedback type="invalid">{errors.logo}</Form.Control.Feedback>
                          {formData.logoPreview && (
                            <img
                              src={formData.logoPreview}
                              alt="Preview"
                              className="mt-2 rounded"
                              style={{ maxWidth: '150px', borderRadius: '5px' }}
                            />
                          )}
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={2}>
                        <div className="d-grid">
                          <Button className="btn-dark" variant="primary" type="submit">
                            ADD NEW
                          </Button>
                        </div>
                      </Col>
                      <Col md={2}>
                        <div className="d-grid">
                          <Button onClick={() => window.history.back()}  style={{ backgroundColor: '#dc3545', borderColor: '#dc3545', color: '#fff' }}>
                            Cancle
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </Form>
                </Container>
              </>
            </OverlayTrigger>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default AddNewFleetowner;
