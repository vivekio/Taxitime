import React, { useEffect, useState } from 'react';
import { Row, Col, OverlayTrigger, Form, Button, Container } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import Card from '../../../../components/Card/MainCard';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

const UserUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    mobile: '',
    picture: '',
    picturePreview: null
  });

  const validateForm = () => {
    let newErrors = {};
    const numberpattern = /^\d{10}$/;
    const emailpattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailpattern.test(formData.email)) {
      newErrors.email = 'Enter a valid email address.';
    }

    if (!numberpattern.test(formData.mobile)) {
      newErrors.mobile = 'Phone number must be 10 digits.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  console.log(formData);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/users/editgetusers/${id}`);
        setFormData({
          ...res.data[0],
          picture: res.data[0]?.picture,
          picturePreview: res.data[0]?.picture ? `http://localhost:8000/uploads/${res.data[0].picture}` : null
        });
        console.log(formData);
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

  const handleFileChange = (e) => {
    setFormData({ ...formData, picture: e.target.files[0], picturePreview: URL.createObjectURL(e.target.files[0]) });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const data = new FormData();
      data.append('first_name', formData.first_name);
      data.append('last_name', formData.last_name);
      data.append('email', formData.email);
      data.append('mobile', formData.mobile);

      data.append('picture', formData.picture || formData.picturePreview);

      try {
        await axios.put(`http://localhost:8000/api/users/editusers/${id}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        console.log('this is', data);

        alert('Updated Successfully!');
        navigate('/basic/UsersList');
      } catch (error) {
        if (error.status === 401) {
          return toast.error(error.response.data.error);
        }
        toast.error(error.response.data.error[0]);
      }
    }
  };

  return (
    <React.Fragment>
      <ToastContainer />
      <Row>
        <Col className="btn-page">
          <Card title="Update User">
            <OverlayTrigger>
              <>
                <Container className="mt-4">
                  <Form onSubmit={handleSubmit} className="p-4 shadow rounded bg-light">
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>First Name</Form.Label>
                          <Form.Control type="text" name="first_name" value={formData.first_name} onChange={handleChange} />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Last Name</Form.Label>
                          <Form.Control type="text" name="last_name" value={formData.last_name} onChange={handleChange} />
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
                          <Form.Label>Profile Picture</Form.Label>
                          <Form.Control type="file" accept="image/*" onChange={handleFileChange} />
                          {formData.picturePreview && (
                            <img
                              src={formData.picturePreview}
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
                            UPADATE
                          </Button>
                        </div>
                      </Col>
                      <Col md={2}>
                        <div className="d-grid">
                          <Button onClick={() => window.history.back()} style={{ backgroundColor: '#dc3545', borderColor: '#dc3545', color: '#fff' }}>
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

export default UserUpdate;
