import React, { useState } from 'react';
import { Row, Col, OverlayTrigger, Form, Button  , Container} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Card from '../../../../components/Card/MainCard';
import { Eye, EyeSlash } from 'react-bootstrap-icons';
import { toast, ToastContainer } from 'react-toastify';

const AddNewProvider = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    mobile: '',
    password: '',
    confirm_password: '',
    avatar: '',
    avatarPreview: ''
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const validateForm = () => {
    let newErrors = {};
    const numberpattern = /^\d{10}$/;
    const emailpattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const passwordpattern = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$/;

    if (!formData.first_name.trim()) newErrors.first_name = 'First Name is required.';
    if (!formData.last_name.trim()) newErrors.last_name = 'Last Name is required.';
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
    if (!formData.avatar) {
      newErrors.avatar = 'Profile avatar is required.';
    } else {
      const fileName = formData.avatar.name;
      const fileExtension = fileName.toLowerCase().split('.').pop();

      const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];

      if (!allowedExtensions.includes(fileExtension)) {
        newErrors.avatar = 'Only .jpg, .jpeg, .png, .gif, and .webp files are allowed.';
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
    
    const file = e.target.files[0];
    if (file) {
      const fileExtension = file.name.toLowerCase().split('.').pop();
      const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];

      if (!allowedExtensions.includes(fileExtension)) {
        setErrors({ ...errors, avatar: 'Only .jpg, .jpeg, .png, .gif, and .webp files are allowed.' });
        return;
      }

      setFormData({
        ...formData,
        avatar: file,
        avatarPreview: URL.createObjectURL(file)
      });
      setErrors({ ...errors, avatar: '' });
    }
  };
  const handleSubmit = async (e) => {
    console.log(formData);

    e.preventDefault();
    if (validateForm()) {
      const data = new FormData();
      data.append('first_name', formData.first_name);
      data.append('last_name', formData.last_name);
      data.append('email', formData.email);
      data.append('mobile', formData.mobile);
      data.append('password', formData.password);
      data.append('confirm_password', formData.confirm_password);
      if (formData.avatar) {
        data.append('avatar', formData.avatar);
      }
      try {
        await axios.post(`http://localhost:8000/api/users/addnewprovider`, data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        console.log(formData);
  
        alert('New user add Successfully!');
        navigate('/basic/ProviderList');
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
          <Card title="ADD NEW PROVIDERS">
            <OverlayTrigger>
              <>
                <Container className="mt-4">
                  <Form onSubmit={handleSubmit} className="p-4 shadow rounded bg-light">
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>First Name</Form.Label>
                          <Form.Control
                            type="text"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleChange}
                            isInvalid={!!errors.first_name}
                          />
                          <Form.Control.Feedback type="invalid">{errors.first_name}</Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Last Name</Form.Label>
                          <Form.Control
                            type="text"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleChange}
                            isInvalid={!!errors.last_name}
                          />
                          <Form.Control.Feedback type="invalid">{errors.last_name}</Form.Control.Feedback>
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
                          <Form.Label>Profile avatar</Form.Label>
                          <Form.Control type="file" accept="image/*" onChange={handleFileChange} isInvalid={!!errors.avatar} />
                          <Form.Control.Feedback type="invalid">{errors.avatar}</Form.Control.Feedback>
                          {formData.avatarPreview && (
                            <img
                              src={formData.avatarPreview}
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

export default AddNewProvider;
