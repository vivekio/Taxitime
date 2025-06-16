import React, { useEffect, useState } from 'react';
import { Row, Col, OverlayTrigger, Form, Button, Container } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';

import Card from '../../../components/Card/MainCard';

import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

const BasicButton = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    document_name : '',
    type: ''
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/users/editgetdocument/${id}`);
        setFormData({
          ...res.data[0]
        });
        console.log(formData);
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

    const data = new FormData();
    data.append('document_name', formData.document_name);
    data.append('type', formData.type);
  console.log(data);
  

    try {
      await axios.put(`http://localhost:8000/api/users/updatedocument/${id}`, data, {
     headers:{ 'Content-Type': 'application/json' }
      });
      console.log(formData);

      alert('Updated Successfully!');
      navigate('/Documents/listDocuments');
    } catch (error) {
      toast.error(error.response.data.error[0]);
    }
  };

  return (
    <React.Fragment>
      <ToastContainer />
      <Row className="btn-page">
        <Col>
          <Card title="Update codument">
            <OverlayTrigger>
              <>
                <Container className="mt-4">
                  <Form onSubmit={handleSubmit} className="p-4 shadow rounded bg-light">
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Documents Name
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="document_name"
                            value={formData.document_name}
                            onChange={handleChange}
                            // isInvalid={!!errors.name}
                          />
                          {/* <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback> */}
                        </Form.Group>
                      </Col>
                      <Row>
                        {' '}
                        <Col md={6}>
                          <Form.Group className="mb-4">
                            <Form.Label>Documents types</Form.Label>
                            <Form.Select name="type" value={formData.type} onChange={handleChange}>
                              <option value="DRIVER">Driver Documents</option>
                              <option value="VEHICLE"> Vehicle Documents</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                      </Row>
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
                          <Button onClick={() => window.history.back()} className="btn-danger" variant="primary" >
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
