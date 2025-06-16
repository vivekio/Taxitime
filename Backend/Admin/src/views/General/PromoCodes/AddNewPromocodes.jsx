import React, { useEffect, useState } from 'react';
import { Row, Col, OverlayTrigger, Form, Button, Container } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';

import Card from '../../../components/Card/MainCard';

import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

const AddNewPromocodes = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    promo_code: '',
    discount: '',
    expiration: '' 
  });
  const validateForm = () => {
    let newErrors = {};

    if (!formData.promo_code.trim()) newErrors.promo_code = 'Promocode is required.';
    if (!formData.discount.trim()) newErrors.discount = 'Discount is required.';
    if (!formData.expiration.trim()) newErrors.expiration = 'Expiration is required.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
 
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      
    }
    const data = new FormData();
    data.append('promo_code', formData.promo_code);
    data.append('discount', formData.discount);
    data.append('expiration', formData.expiration);

    console.log(data);

    try {
      await axios.post(`http://localhost:8000/api/users/addPromocode`, data, {
        headers: { 'Content-Type': 'application/json' }
      });
      console.log(formData);

      alert('add new Promocode Successfully!');
      navigate('/PromoCodes/listPromocodes');
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  return (
    <React.Fragment>
      <ToastContainer />
      <Row className="btn-page">
        <Col>
          <Card title="ADD new">
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
                            isInvalid={!!errors.promo_code}
                          />
                          <Form.Control.Feedback type="invalid">{errors.promo_code}</Form.Control.Feedback>
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
                            isInvalid={!!errors.discount}
                          />
                          <Form.Control.Feedback type="invalid">{errors.discount}</Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Row>
                        {' '}
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Expiration</Form.Label>
                            <Form.Control type="date" name="expiration" value={formData.expiration} onChange={handleChange}     isInvalid={!!errors.expiration}
                          />
                          <Form.Control.Feedback type="invalid">{errors.expiration}</Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        
                      </Row>
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

export default AddNewPromocodes;
