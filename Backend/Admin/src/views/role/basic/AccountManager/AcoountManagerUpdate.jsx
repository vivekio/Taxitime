import React, { useEffect, useState } from 'react';
import { Row, Col, OverlayTrigger, Form, Button, Container } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';


import Card from '../../../../components/Card/MainCard';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';

const AccountManagerUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: ''
  });
  const validateForm = () => {
    let newErrors = {};
    const numberpattern = /^\d{10}$/;
    const emailpattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!formData.name.trim()) newErrors.first_name = 'First Name is required.';
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
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/users/editgetaccountmanager/${id}`);
        setFormData(res.data[0]);
        // console.log(formData);
        // Assuming API returns an array
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    if (id) {
      fetchUser();
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('email', formData.email);
      data.append('mobile', formData.mobile);
      console.log(data);

      try {
        await axios.put(`http://localhost:8000/api/users/editaccountmanager/${id}`, data, {
          headers: { 'Content-Type': 'application/json' }
        });
        console.log(data);

        alert('Updated Successfully!');
        navigate('/basic/AccountManagerlist');
      } catch (error) {
      toast.error(error.response.data.error[0]);
      }
    }
  };

  return (
    <React.Fragment>
      <ToastContainer></ToastContainer>
      <Row className="btn-page">
        <Col>
          <Card title="Update Account Manager ">
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

export default AccountManagerUpdate;
