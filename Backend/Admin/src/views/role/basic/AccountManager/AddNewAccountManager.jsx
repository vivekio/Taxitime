import React, { useState } from 'react';
import { Row, Col, OverlayTrigger, Form, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Card from '../../../../components/Card/MainCard';
import { Eye, EyeSlash } from 'react-bootstrap-icons';
import { toast, ToastContainer } from 'react-toastify';
const AddNewAccountManager = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    confirm_password: ''
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const validateForm = () => {
    let newErrors = {};
    const numberpattern = /^\d{10}$/;
    const emailpattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const passwordpattern = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$/;

    if (!formData.name.trim()) newErrors.name = 'First Name is required.';
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
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e) => {
    console.log(formData);

    e.preventDefault();
    if (validateForm()) {
      try {
        await axios.post(`http://localhost:8000/api/users/addnewaccountmanager`, formData, {
          headers: { 'Content-Type': 'application/json' }
        });
        console.log(formData);

        alert('New user add Successfully!');
        navigate('/basic/AccountManagerlist');
      } catch (error) {
        console.error('Error updating user:', error);
      }
    }
  };
  return (
    <React.Fragment>
      <ToastContainer></ToastContainer>
      <Row>
        <Col className="btn-page">
          <Card title="ADD NEW ACCOUNT MANAGER">
            <OverlayTrigger>
              <>
                <Container className="mt-4">
                  <Form onSubmit={handleSubmit} className="p-4 shadow rounded bg-light">
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label> Full Name</Form.Label>
                          <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} isInvalid={!!errors.name} />
                          <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                        </Form.Group>
                      </Col>

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
                          <Button onClick={() => window.history.back()} style={{ backgroundColor: '#dc3545', borderColor: '#dc3545', color: '#fff' }} >
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

export default AddNewAccountManager;
