// export default BasicButton;
import React, { useEffect, useState } from 'react';
import { Row, Col, OverlayTrigger, Form, Button, Container } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import Card from '../../../components/Card/MainCard';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

const AccountEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    account_name: '',
    bank_name: '',
    account_number: '',
    IFSC_code:'',
    type:''
  });

  const validateForm = () => {
    let newErrors = {};
    const numberpattern = /^\d{6,18}$/;
    const IFSC_codepattern = /^[A-Z]{4}0[A-Z0-9]{6}$/;
   

    if (!formData.account_name.trim()) newErrors.first_account_name = 'First account_name is required.';
    if (!formData.bank_name.trim()) {
      newErrors.bank_name = 'bank_name is required.';
    }

    if (!formData.account_number.trim()) {
      newErrors.account_number = 'Phone number is required.';
    } else if (!numberpattern.test(formData.account_number)) {
      newErrors.account_number = 'xyz';
    }

    if (!formData.IFSC_code.trim()) {
      newErrors.IFSC_code = 'Phone number is required.';
    } else if (!IFSC_codepattern.test(formData.IFSC_code)) {
      newErrors.IFSC_code = 'IFSC_CODE not proper pattern.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/users/geteditaccount/${id}`);
        console.log('Fetched Data:', res.data[0]); // Debugging log
        setFormData(res.data[0]); // Updating state
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    if (id) {
      fetchUser();
    }
  }, [id]); // Added dependency

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const data = new FormData();
      data.append('account_name', formData.account_name);
      data.append('bank_name', formData.bank_name);
      data.append('account_number', formData.account_number);
      data.append('IFSC_code', formData.IFSC_code);
      data.append('type', formData.type);
      try {
        await axios.put(`http://localhost:8000/api/users/updateaccount/${id}`, data, {
          headers: { 'Content-Type': 'application/json' } // Corrected Content-Type
        });

        toast.success('Updated Successfully!');
        setTimeout(() => {
          navigate('/account/accounapproved');
        }, 2000);
        // navigate('/account/accounapproved');
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
          <Card title="Update Account Details">
            <OverlayTrigger>
              <>
                <Container className="mt-4">
                  <Form onSubmit={handleSubmit} ClassName="p-4 shadow rounded bg-light">
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label> account_name</Form.Label>
                          <Form.Control type="text" name="account_name" value={formData.account_name} onChange={handleChange} isInvalid={!!errors.account_name} />
                          <Form.Control.Feedback type="invalid">{errors.account_name}</Form.Control.Feedback>
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>bank_name</Form.Label>
                          <Form.Control
                            type="text"
                            name="bank_name"
                            value={formData.bank_name}
                            onChange={handleChange}
                            isInvalid={!!errors.bank_name}
                          />
                          <Form.Control.Feedback type="invalid">{errors.bank_name}</Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>account_number</Form.Label>
                          <Form.Control
                            type="text"
                            name="account_number"
                            value={formData.account_number}
                            maxLength={18}
                            onChange={handleChange}
                            isInvalid={!!errors.account_number}
                          />
                          <Form.Control.Feedback type="invalid">{errors.account_number}</Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>IFSC_code</Form.Label>
                          <Form.Control
                            type="text"
                            name="IFSC_code"
                            value={formData.IFSC_code}
                            maxLength={10}
                            onChange={handleChange}
                            isInvalid={!!errors.IFSC_code}
                          />
                          <Form.Control.Feedback type="invalid">{errors.IFSC_code}</Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>type</Form.Label>
                          <Form.Control
                            type="text"
                            name="type"
                            value={formData.type}
                            maxLength={10}
                            onChange={handleChange}
                            isInvalid={!!errors.type}
                          />
                          <Form.Control.Feedback type="invalid">{errors.type}</Form.Control.Feedback>
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

export default AccountEdit;
