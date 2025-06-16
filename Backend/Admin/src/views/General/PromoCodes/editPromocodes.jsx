import React, { useEffect, useState } from 'react';
import { Row, Col, OverlayTrigger, Form, Button, Container } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';

import Card from '../../../components/Card/MainCard';

import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

const UpdatePromocodes = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    promo_code: '',
    discount: '',
    expiration: '' 
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/users/editgetpromocode/${id}`);
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
    data.append('promo_code', formData.promo_code);
    data.append('discount', formData.discount);
    data.append('expiration', formData.expiration);

    console.log(data);

    try {
      await axios.put(`http://localhost:8000/api/users/updatePromocode/${id}`, data, {
        headers: { 'Content-Type': 'application/json' }
      });
      console.log(formData);

      alert('Updated Successfully!');
      navigate('/PromoCodes/listPromocodes');
    } catch (error) {
      toast.error(error.response.data.error[0]);
    }
  };

  return (
    <React.Fragment>
      <ToastContainer />
      <Row className="btn-page">
        <Col>
          <Card title="helooo">
            <OverlayTrigger>
              <>
                <Container className="mt-4">
                  <Form onSubmit={handleSubmit} className="p-4 shadow rounded bg-light">
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Promocode</Form.Label>
                          <Form.Control
                            type="text"
                            name="promo_code"
                            value={formData.promo_code}
                            onChange={handleChange}
                            // isInvalid={!!errors.name}
                          />
                          {/* <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback> */}
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Discount</Form.Label>
                          <Form.Control
                            type="text"
                            name="discount"
                            value={formData.discount}
                            onChange={handleChange}
                            // isInvalid={!!errors.name}
                          />
                          {/* <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback> */}
                        </Form.Group>
                      </Col>
                      <Row>
                        {' '}
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Expiration</Form.Label>
                            <Form.Control type="date" name="expiration" value={formData.expiration} onChange={handleChange} />
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

export default UpdatePromocodes;
