import React from 'react';
import { useEffect, useState } from 'react';
import { Row, Col, OverlayTrigger, Card, Button, Form, Table } from 'react-bootstrap';

import Card1 from '../../../components/Card/MainCard';
import 'jspdf-autotable';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

const BasicButton = () => {
     const { id } = useParams();
     const navigate = useNavigate();
  const [Ridesdetiles, setRidesdetiles] = useState(0);
 
  const ride = {
    userName: Ridesdetiles.user_name ? Ridesdetiles.user_name : '-',
    providerName: Ridesdetiles.provider_name ? Ridesdetiles.provider_name : '-',
    totalDistance: Ridesdetiles.total_distance ? Ridesdetiles.total_distance : 0,
    rideStartTime: Ridesdetiles.start_time? Ridesdetiles.start_time : '-',
    rideEndTime: Ridesdetiles.end_time? Ridesdetiles.end_time : '-',
    pickupAddress: Ridesdetiles.picked_up ? Ridesdetiles.picked_up : '-',
    dropAddress: Ridesdetiles.dropped ? Ridesdetiles.dropped : '-',
    basePrice: Ridesdetiles.Base_price ? Ridesdetiles.Base_price : 0,
    company_commision_Price: Ridesdetiles.company_Commision_price ? Ridesdetiles.company_Commision_price : 0,
    taxPrice: Ridesdetiles.tex_price ? Ridesdetiles.tex_price : 0,
    totalAmount: Ridesdetiles.total_amount? Ridesdetiles.total_amount : 0,
    rideStatus: Ridesdetiles.status,
  };
    useEffect(() => {
      fetch(`http://localhost:8000/api/users/ridessatement/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setRidesdetiles(data.result[0]);
          console.log(data.result[0]);
          
        })
        .catch((error) => console.error('Error fetching data:', error));
    }, []);


  return (
    <React.Fragment>
      <ToastContainer />
      <Row className="btn-page">
        <Col>
          <Card1 title="RIDES DETAILS">
            <OverlayTrigger>
              <>
                <div className="container ">
                  <Card>
                    <Card.Body>
                      <Table className="table table-borderless table-borderless" >
                        <tbody>
                          <tr>
                            <td>
                              <strong>User Name:</strong>
                            </td>
                            <td>{ride.userName}</td>
                          </tr>
                          <tr>
                            <td>
                              <strong>Provider Name:</strong>
                            </td>
                            <td>{ride.providerName}</td>
                          </tr>
                          <tr>
                            <td>
                              <strong>Total Distance:</strong>
                            </td>
                            <td>{ride.totalDistance} km</td>
                          </tr>
                          <tr>
                            <td>
                              <strong>Ride Start Time:</strong>
                            </td>
                            <td>{ride.rideStartTime}</td>
                          </tr>
                          <tr>
                            <td>
                              <strong>Ride End Time:</strong>
                            </td>
                            <td>{ride.rideEndTime}</td>
                          </tr>
                          <tr>
                            <td>
                              <strong>Pickup Address:</strong>
                            </td>
                            <td>{ride.pickupAddress}</td>
                          </tr>
                          <tr>
                            <td>
                              <strong>Drop Address:</strong>
                            </td>
                            <td>{ride.dropAddress}</td>
                          </tr>
                          <tr>
                            <td>
                              <strong>Base Price:</strong>
                            </td>
                            <td>₹{ride.basePrice}</td>
                          </tr>
                          <tr>
                            <td>
                              <strong> company commision Price:</strong>
                            </td>
                            <td>₹{ride.company_commision_Price}</td>
                          </tr>
                          <tr>
                            <td>
                              <strong>Tax Price:</strong>
                            </td>
                            <td>₹{ride.taxPrice}</td>
                          </tr>
                          <tr>
                            <td>
                              <strong>Total Amount:</strong>
                            </td>
                            <td>₹{ride.totalAmount}</td>
                          </tr>
                          <tr>
                            <td>
                              <strong>Ride Status:</strong>
                            </td>
                            <td className="text-success fw-bold">{ride.rideStatus}</td>
                          </tr>
                        </tbody>
                      </Table>
                      {/* <Row className="mb-3">
                        <p className="mb-2">
                          <strong>User Name:</strong> {ride.userName}
                        </p>
                        <p className="mb-2">
                          <strong>Provider Name:</strong> {ride.providerName}
                        </p>
                        <p className="mb-2">
                          <strong>Total Distance:</strong> {ride.totalDistance} km
                        </p>
                        <p className="mb-2">
                          <strong>Ride Start Time:</strong> {ride.rideStartTime}
                        </p>
                        <p className="mb-2">
                          <strong>Ride End Time:</strong> {ride.rideEndTime}
                        </p>
                        <p className="mb-2">
                          <strong>Pickup Address:</strong> {ride.pickupAddress}
                        </p>
                        <p className="mb-2">
                          <strong>Drop Address:</strong> {ride.dropAddress}
                        </p>
                        <p className="mb-2">
                          <strong>Base Price:</strong> {ride.basePrice}
                        </p>
                        <p className="mb-2">
                          <strong>Tax Price:</strong> {ride.taxPrice}
                        </p>
                        <p className="mb-2">
                          <strong>Total Amount:</strong> {ride.totalAmount}
                        </p>
                        <p className="text-success fw-bold">
                          <strong>Ride Status:</strong> {ride.rideStatus}
                        </p>
                      </Row> */}
                      {/* <Button onClick={() =>{navigate('/Statement/OverallStatement')}} className="btn-dark me-2"> Back </Button> */}
                      <Button onClick={() =>{window.history.back();}} className="btn-dark me-2"> Back </Button>
                    </Card.Body>
                  </Card>
                </div>
              </>
            </OverlayTrigger>
          </Card1>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default BasicButton;
