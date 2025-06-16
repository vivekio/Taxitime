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
    name: '',
    provider_name: '',
    fixed: '',
    distance: '',
    minute: '',
    price: '',
    capacity: '',
    type: '',
    calculator: '',
    image: null,
    imagePreview: null
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/users/Updategetservicetypes/${id}`);
        console.log(res.data[0]);

        setFormData({
          ...res.data[0],
          image: res.data[0]?.image,
          imagePreview: res.data[0]?.image ? `http://localhost:8000/uploads/${res.data[0].image}` : null
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

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0], imagePreview: URL.createObjectURL(e.target.files[0]) });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('provider_name', formData.provider_name);
    data.append('fixed', formData.fixed);
    data.append('distance', formData.distance);
    data.append('minute', formData.minute);
    data.append('price', formData.price);
    data.append('capacity', formData.capacity);
    data.append('type', formData.type);
    data.append('calculator', formData.calculator);
 
      data.append('image', formData.image || formData.imagePreview);
    
    

    console.log('this is', formData.imagePreview);
    try {
      await axios.put(`http://localhost:8000/api/users/updateservice/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
     

      alert('Updated Successfully!');
      navigate('/ServiceTypes/ListServiceTypes');
    } catch (error) {
      if (error.status === 401) {
        return toast.error(error.response.data.error);
      }
    //   toast.error(error.response.data.error[0]);
    }
  };
  return (
    <React.Fragment>
      <ToastContainer />
      <Row>
        <Col className="btn-page">
          <Card title="ADD NEW SERVICE TYPE">
            <OverlayTrigger>
              <>
                <Container className="mt-4">
                  <Form onSubmit={handleSubmit} className="p-4 shadow rounded bg-light">
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Service name</Form.Label>
                          <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            // isInvalid={!!errors.first_name}
                          />
                          {/* <Form.Control.Feedback type="invalid">{errors.first_name}</Form.Control.Feedback> */}
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Provider Name</Form.Label>
                          <Form.Control
                            type="text"
                            name="provider_name"
                            value={formData.provider_name}
                            onChange={handleChange}
                            // isInvalid={!!errors.last_name}
                          />
                          {/* <Form.Control.Feedback type="invalid">{errors.last_name}</Form.Control.Feedback> */}
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Base Price (₹0.00)</Form.Label>
                          <Form.Control
                            type="text"
                            name="fixed"
                            value={formData.fixed}
                            onChange={handleChange}
                            // isInvalid={!!errors.email}
                          />
                          {/* <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback> */}
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Base Distance</Form.Label>
                          <Form.Control
                            type="text"
                            name="distance"
                            value={formData.distance}
                            maxLength={10}
                            onChange={handleChange}
                            // isInvalid={!!errors.mobile}
                          />
                          {/* <Form.Control.Feedback type="invalid">{errors.mobile}</Form.Control.Feedback> */}
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Unit Time Pricing (₹0.00)</Form.Label>
                          <Form.Control
                            type="text"
                            name="minute"
                            value={formData.minute}
                            onChange={handleChange}
                            // isInvalid={!!errors.email}
                          />
                          {/* <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback> */}
                        </Form.Group>
                      </Col>{' '}
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Unit Distance Price (Km)</Form.Label>
                          <Form.Control
                            type="text"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            // isInvalid={!!errors.email}
                          />
                          {/* <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback> */}
                        </Form.Group>
                      </Col>{' '}
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Seat Capacity</Form.Label>
                          <Form.Control
                            type="text"
                            name="capacity"
                            value={formData.capacity}
                            onChange={handleChange}
                            // isInvalid={!!errors.email}
                          />
                          {/* <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback> */}
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Pricing Logic</Form.Label>
                          <Form.Select name="calculator" value={formData.calculator} onChange={handleChange}>
                            <option value="MIN">Per Minute Pricing</option>
                            <option value="HOUR">Per Hour Pricing</option>
                            <option value="DISTANCE">Distance Pricing</option>
                            <option value="DISTANCEMIN">Distance and Per Minute Pricing</option>
                            <option value="DISTANCEHOUR">Distance and Per Hour Pricing</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      {/* <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Pricing Logic</Form.Label>
                          <Form.Control
                            type="text"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            isInvalid={!!errors.email}
                          />
                          <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                        </Form.Group>
                      </Col> */}
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Service Type</Form.Label>
                          <Form.Select name="type" value={formData.type} onChange={handleChange}>
                            <option value="daily">Daily</option>
                            <option value="outstation">Outstation</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      {/* <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Service Type</Form.Label>
                          <Form.Control
                            type="text"
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            isInvalid={!!errors.email}
                          />
                          <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                        </Form.Group>
                      </Col> */}
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Description</Form.Label>
                          <Form.Control
                            type="text"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            // isInvalid={!!errors.email}
                          />
                          {/* <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback> */}
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>image</Form.Label>
                          <Form.Control
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            //  isInvalid={!!errors.picture}
                          />
                          {/* <Form.Control.Feedback type="invalid">{errors.picture}</Form.Control.Feedback> */}
                          {formData.imagePreview && (
                            <img
                              src={formData.imagePreview}
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
      {/* <Row className="btn-page">
        <ToastContainer />
        <Col>
          <Card title="Update ">
            <OverlayTrigger>
              <>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" name="first_name" value={formData.first_name} onChange={handleChange} required />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" name="last_name" value={formData.last_name} onChange={handleChange} required />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control type="text" name="mobile" value={formData.mobile} onChange={handleChange} required />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Profile Picture</Form.Label>
                    <Form.Control type="file" accept="picture" onChange={handleFileChange} />
                    {formData.picturePreview && (
                      <img
                        src={formData.picturePreview}
                        alt="Preview"
                        style={{ marginTop: '10px', maxWidth: '150px', borderRadius: '5px' }}
                      />
                    )}
                  </Form.Group>

                  <Button className="btn-dark" variant="primary" type="submit">
                    UPDATE
                  </Button>
                </Form>
              </>
            </OverlayTrigger>
          </Card>
        </Col>
      </Row> */}
    </React.Fragment>
  );
};

export default BasicButton;

// import React, { useEffect, useState } from 'react';
// import { Row, Col, Form, Button, Container } from 'react-bootstrap';
// import { useParams, useNavigate } from 'react-router-dom';
// import Card from '../../../components/Card/MainCard';
// import axios from 'axios';
// import { toast, ToastContainer } from 'react-toastify';

// const UpdateServiceType = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [errors, setErrors] = useState({});

//   const [formData, setFormData] = useState({
//     name: '',
//     provider_name: '',
//     fixed: '',
//     distance: '',
//     minute: '',
//     price: '',
//     capacity: '',
//     type: '',
//     image: null,
//     imagePreview: null
//   });

//   useEffect(() => {
//     const fetchServiceType = async () => {
//       try {
//         const res = await axios.get(`http://localhost:8000/api/users/Updategetservicetypes/${id}`);
//         setFormData({
//           ...res.data[0],
//           image: null,
//           imagePreview: res.data[0]?.image ? `http://localhost:8000/uploads/${res.data[0].image}` : null
//         });
//       } catch (error) {
//         console.error('Error fetching service type:', error);
//       }
//     };

//     if (id) {
//       fetchServiceType();
//     }
//   }, [id]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     setErrors({ ...errors, [e.target.name]: '' });
//   };

//   const handleFileChange = (e) => {
//     if (e.target.files.length > 0) {
//       const file = e.target.files[0];
//       setFormData({
//         ...formData,
//         image: file,
//         imagePreview: URL.createObjectURL(file)
//       });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     const data = new FormData();
//     data.append('name', formData.name);
//     data.append('provider_name', formData.provider_name);
//     data.append('fixed', formData.fixed);
//     data.append('distance', formData.distance);
//     data.append('minute', formData.minute);
//     data.append('price', formData.price);
//     data.append('capacity', formData.capacity);
//     data.append('type', formData.type);
//     if (formData.image instanceof File) {
//         data.append("image", formData.image);
//       }
  
//       console.log("Sending Data:", data[0]); // Debugging
  
//     try {
//       await axios.put(`http://localhost:8000/api/users/updateservice/${id}`, formData, {
//         headers: { 'Content-Type': 'multipart/form-data' }
//       });
//       toast.success('Updated Successfully!');
//       navigate('/ServiceTypes/ListServiceTypes');
//     } catch (error) {
//       toast.error(error.response?.data?.error || 'Something went wrong!');
//     }
//   };

//   return (
//     <>
//       <ToastContainer />
//       <Row>
//         <Col>
//           <Card title="Update Service Type">
//             <Container className="mt-4">
//               <Form onSubmit={handleSubmit} className="p-4 shadow rounded bg-light">
//                 <Row>
//                   <Col md={6}><Form.Group className="mb-3"><Form.Label>Service Name</Form.Label><Form.Control type="text" name="name" value={formData.name} onChange={handleChange} /></Form.Group></Col>
//                   <Col md={6}><Form.Group className="mb-3"><Form.Label>Provider Name</Form.Label><Form.Control type="text" name="provider_name" value={formData.provider_name} onChange={handleChange} /></Form.Group></Col>
//                 </Row>
//                 <Row>
//                   <Col md={6}><Form.Group className="mb-3"><Form.Label>Base Price (₹)</Form.Label><Form.Control type="text" name="fixed" value={formData.fixed} onChange={handleChange} /></Form.Group></Col>
//                   <Col md={6}><Form.Group className="mb-3"><Form.Label>Base Distance</Form.Label><Form.Control type="text" name="distance" value={formData.distance} onChange={handleChange} /></Form.Group></Col>
//                 </Row>
//                 <Row>
//                   <Col md={6}><Form.Group className="mb-3"><Form.Label>Unit Time Pricing (₹)</Form.Label><Form.Control type="text" name="minute" value={formData.minute} onChange={handleChange} /></Form.Group></Col>
//                   <Col md={6}><Form.Group className="mb-3"><Form.Label>Unit Distance Price (Km)</Form.Label><Form.Control type="text" name="price" value={formData.price} onChange={handleChange} /></Form.Group></Col>
//                 </Row>
//                 <Row>
//                   <Col md={6}><Form.Group className="mb-3"><Form.Label>Seat Capacity</Form.Label><Form.Control type="text" name="capacity" value={formData.capacity} onChange={handleChange} /></Form.Group></Col>
//                   <Col md={6}><Form.Group className="mb-3"><Form.Label>Pricing Logic</Form.Label><Form.Select name="type" value={formData.type} onChange={handleChange}><option value="Per Minute Pricing">Per Minute Pricing</option><option value="Per Hour Pricing">Per Hour Pricing</option><option value="Distance Pricing">Distance Pricing</option><option value="Distance and Per Minute Pricing">Distance and Per Minute Pricing</option><option value="Distance and Per Hour Pricing">Distance and Per Hour Pricing</option></Form.Select></Form.Group></Col>
//                 </Row>
//                 <Row>
//                   <Col md={6}><Form.Group className="mb-3"><Form.Label>Service Type</Form.Label><Form.Select name="type" value={formData.type} onChange={handleChange}><option value="daily">Daily</option><option value="outstation">Outstation</option></Form.Select></Form.Group></Col>
//                   <Col md={6}><Form.Group className="mb-3"><Form.Label>Image</Form.Label><Form.Control type="file" accept="image/*" onChange={handleFileChange} />{formData.imagePreview && <img src={formData.imagePreview} alt="Preview" className="mt-2 rounded" style={{ maxWidth: '150px' }} />}</Form.Group></Col>
//                 </Row>
//                 <Row>
//                   <Col md={2}><Button className="btn-dark" type="submit">UPDATE</Button></Col>
//                   <Col md={2}><Button className="btn-danger" onClick={() => window.history.back()}>CANCEL</Button></Col>
//                 </Row>
//               </Form>
//             </Container>
//           </Card>
//         </Col>
//       </Row>
//     </>
//   );
// };

// export default UpdateServiceType;
