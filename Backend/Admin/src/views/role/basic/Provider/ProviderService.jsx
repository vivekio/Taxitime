import React, { useEffect, useState } from 'react';
import { Row, Col, OverlayTrigger, Form, Button } from 'react-bootstrap';
import Card from '../../../../components/Card/MainCard';
import DataTable from 'react-data-table-component';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import 'jspdf-autotable';
import { toast, ToastContainer } from 'react-toastify';

const ProviderService = () => {
  const { id } = useParams();
  console.log(id);

  const [listusers, setlistusers] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let newErrors = {};

    const numberpattern = /^[A-Z]{2}-\d{2}-[A-Z]{2}-\d{4}$/i;
    if (!numberpattern.test(input1)) {
      newErrors.input1 = 'enter a valid service number like this : GJ-10-CE-1234';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/users/providerservice/${+id}`);
        console.log(res);
        setlistusers(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    if (id) {
      fetchUser();
    }
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    // if (validateForm()) {
      try {
        const payload = {
          serviceName: selectedOption,
          serviceNumber: input1 ,
          serviceModel: input2 
        };

        const response = await axios.put(`http://localhost:8000/api/users/providerserviceupdate/${id}`, payload, {
          headers: { 'Content-Type': 'application/json' }
        });

        if (response.status === 200) {
          alert('Service updated successfully!');
          const updatedUsers = await axios.get(`http://localhost:8000/api/users/providerservice/${id}`);
          setErrors('')
          console.log(updatedUsers);
          setlistusers(updatedUsers.data);
        }
      } catch (error) {
        toast.error(error.response.data.error[0]);
      }
    // }
  };
  const handledelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8000/api/users/providerservicedelete/${id}`);
      if (response.status === 200) {
        alert('Service deleted successfully!');
        const updatedUsers = await axios.get(`http://localhost:8000/api/users/providerservice/${id}`);
        setlistusers(Array.isArray(updatedUsers.data) ? updatedUsers.data : []);
      }
    } catch (error) {
      console.error('Error deleting service:', error);
      alert('Failed to delete service. Please try again.');
    }
  };
  const columns = [
    {
      name: 'Service Name',
      selector: (row) => row.Service_Name,
      sortable: true
    },
    {
      name: 'Service Number',
      selector: (row) => row.Service_Number,
      sortable: true
    },
    {
      name: 'Service Model',
      selector: (row) => row.Service_Model,
      sortable: true
    },

    {
      name: 'Action',
      cell: () => (
        <>
          <div className="d-flex justify-content-start align-items-center">
            <button className="btn btn-primary btn-sm"  style={{ backgroundColor: '#dc3545', borderColor: '#dc3545', color: '#fff' }}    onClick={() => handledelete(id)}>
              <i className="bi bi-trash-fill me-1"></i> Delete
            </button>
          </div>
        </>
      )
    }
  ];

  return (
    <React.Fragment>
       <ToastContainer />
      <Row className="btn-page">
        <Col>
          <Card title="Provider Service Type Allocation">
            <OverlayTrigger>
              <>
                <div>
                  {' '}
                  <p>Allocated Services :</p>
                </div>
                <DataTable
                  className="table thead-dark"
                  columns={columns}
                  data={listusers || []}
                  pagination
                  highlightOnHover
                  striped
                  responsive
                ></DataTable>
                <div className="d-flex align-items-center gap-2">
                  <Form.Select value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)} style={{ width: '250px' }}>
                    <option value="" disabled>
                      Select an option
                    </option>
                    <option value="Micro">Micro</option>
                    <option value="Mini">Mini</option>
                    <option value="OutStation">OutStation</option>
                  </Form.Select>

                  <Form.Control
                    type="text"
                    placeholder="GJ-10-OM-1234"
                    name='input1'
                    value={input1}
                    onChange={(e) => {
                      setInput1( e.target.value)
                       setErrors({});
                    }}
                    isInvalid={!!errors.input1}
                  />
                  <Form.Control.Feedback type="invalid">{errors.input1}</Form.Control.Feedback>
                  <Form.Control
                    type="text"
                    placeholder="MODEL like this : (BMW X1)"
                    value={input2}
                    onChange={(e) => setInput2(e.target.value)}
                  />

                  <Button className="btn-dark" variant="success" onClick={handleUpdate}>
                    Update
                  </Button>
                </div>
              </>
            </OverlayTrigger>
          </Card>
        </Col>
      </Row>
      {/* )} */}
    </React.Fragment>
  );
};

export default ProviderService;
