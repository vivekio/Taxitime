import React, { useEffect, useState } from 'react';
import { Row, Col, OverlayTrigger, Form, Button, Container } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';


import Card from '../../components/Card/MainCard';

import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

const BasicButton = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    picture: '',
    picturePreview: null
  });
  

  useEffect(() => {
    fetch (`http://localhost:8000/api/users/getaccountsetting` ,{
      method: "GET",
      credentials: "include", // Allows sending cookies and authentication headers
      headers: {
        "Content-Type": "application/json",
      },
    } )
      .then((response) => response.json())
      .then((data) => {
        setFormData({
          ...data[0],
          picture: data[0]?.picture,
          picturePreview: data[0]?.picture ? `http://localhost:8000/uploads/${data[0].picture}` : null
        });
        // setFormData(data[0]);
        // console.log(data[0]);
      });
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

      const data = new FormData();
      data.append('name', formData.name);
      data.append('email', formData.email);
      data.append('picture', formData.picture || formData.picturePreview);

      try {
        await axios.put(`http://localhost:8000/api/users/updateaccountsetting`, data, {
          withCredentials: true,
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        console.log(formData.picturePreview);

        alert('Updated Successfully!'); 
      window.location.reload();
      } catch (error) {
        toast.error(error.response.data.error[0]);
      }
  
  };

  return (
    <React.Fragment>
      <ToastContainer />
      <Row className="btn-page">
        <Col>
          <Card title="Account Settings">
            <OverlayTrigger>
              <>
                <Container className="mt-4">
                  <Form onSubmit={handleSubmit} className="p-4 shadow rounded bg-light">
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Name</Form.Label>
                          <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            // isInvalid={!!errors.name}
                          />
                          {/* <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback> */}
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
                            // isInvalid={!!errors.company}
                          />
                          {/* <Form.Control.Feedback type="invalid">{errors.company}</Form.Control.Feedback> */}
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Profile logo</Form.Label>
                          <Form.Control
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            //  isInvalid={!!errors.logo}
                          />
                          {/* <Form.Control.Feedback type="invalid">{errors.logo}</Form.Control.Feedback> */}
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
                          <Button onClick={() => navigate('/basic/UsersList')} className="btn-danger" variant="primary" type="submit">
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

export default BasicButton;
