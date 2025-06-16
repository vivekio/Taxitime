import React, { useState } from 'react';
import { Row, Col, OverlayTrigger, Form, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Card from '../../components/Card/MainCard';

import { toast, ToastContainer } from 'react-toastify';

const BasicBadges = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    old_password: '',
    new_password: '',
    confirm_password: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e) => {
    console.log(formData);

    e.preventDefault();

    const data = new FormData();
    data.append('old_password', formData.old_password);
    data.append('new_password', formData.new_password);
    data.append('confirm_password', formData.confirm_password)
    try {
      await axios.put(`http://localhost:8000/api/users/updatepassword`, data, {
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' }
      });
      console.log(formData);
      toast.success('password change Successfully!');
setTimeout(() => {
  window.location.reload();
}, 2000);

  
    } catch (error) {
      toast.error(error.response.data.message);
    } 
  };
  return (
    <React.Fragment>
      <ToastContainer />
      <Row>
        <Col className="btn-page">
          <Card title="CHANGE PASSWORD">
            <OverlayTrigger>
              <>
                <Container className="mt-4">
                  <Form onSubmit={handleSubmit} className="p-4 shadow rounded bg-light">
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Old Password</Form.Label>
                          <Form.Control type="text" name="old_password" value={formData.old_password} onChange={handleChange} isInvalid={!!errors.name} />
                          <Form.Control.Feedback type="invalid">{errors.old_password}</Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>New password</Form.Label>
                          <Form.Control
                            type="text"
                            name="new_password"
                            value={formData.new_password}
                            onChange={handleChange}
                            isInvalid={!!errors.new_password}
                          />
                          <Form.Control.Feedback type="invalid">{errors.new_password}</Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      </Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>New confirm password</Form.Label>
                          <Form.Control
                            type="text"
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
                           UPDATE
                          </Button>
                        </div>
                      </Col>
                      <Col md={2}>
                        <div className="d-grid">
                          <Button onClick={() => window.history.back()} className="btn-danger" variant="primary">
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

export default BasicBadges;
