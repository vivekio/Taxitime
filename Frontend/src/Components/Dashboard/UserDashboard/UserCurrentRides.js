import React, { useEffect, useState } from "react";
import MainCard from "../../layout/DshboardCard.js";
import RideStatus from "../../Utils/progressbar.js";
import { useNavigate } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaRupeeSign } from "react-icons/fa6";
import { BsCash } from "react-icons/bs";
import { CalendarDays } from "lucide-react";
import { MdOutlineRoute } from "react-icons/md";
import { LoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import { FaPhoneAlt, FaRegCommentDots, FaStar } from "react-icons/fa";

import { Phone, CreditCard, Receipt, Download } from "lucide-react";
import {
  Row,
  Col,
  Card,
  Button,
  Modal,
  Form,
  Image,
  Badge,
  Spinner,
  Accordion,
  Table,
} from "react-bootstrap";
import { FaCar, FaInfoCircle } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import { StarFill, Star } from "react-bootstrap-icons";
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { BsStarFill, BsTelephone } from "react-icons/bs";
import "./UserCurrentRides.css";
import socket from "../../../socket.js";

const GoogleMapAPI = process.env.REACT_APP_YOUR_GOOGLE_MAPS_API_KEY;

const libraries = ["places"];
const styles = {
  hoverShadow: {
    transition: "all 0.3s ease",
  },
  letterSpacing2: {
    letterSpacing: "2px",
  },
};

const UserCurrentRides = () => {
  const token = Cookies.get("userToken");
  const decoded = jwtDecode(token);
  const userId = decoded.id;
  const [rides, setRides] = useState([]);
  const [show, setShow] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showrating, setShowrating] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [selectedRide, setSelectedRide] = useState(null);
  console.log(selectedRide);
  const navigate = useNavigate();
  const [ratingData, setRatingData] = useState({
    rating: 0,
    comment: "",
  });
  const handleStarClick = (value) => {
    setRatingData((prev) => ({ ...prev, rating: value }));
  };

  const fetchRides = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/users/getRides",
        { withCredentials: true }
      );
      console.log(
        "this is rides ",
        response.data.filter(
          (item) =>
            item.status === "ACCEPTED" ||
            item.status === "SEARCHING" ||
            item.status === "ARRIVED" ||
            item.status === "PICKEDUP" ||
            item.status === "STARTED" ||
            item.status === "DROPPED"
        )
      );
      setRides(
        response.data.filter(
          (item) =>
            item.status === "ACCEPTED" ||
            item.status === "SEARCHING" ||
            item.status === "ARRIVED" ||
            item.status === "PICKEDUP" ||
            item.status === "STARTED" ||
            item.status === "DROPPED"
        )
      );
    } catch (error) {
      console.error("Error fetching rides:", error);
    }
  };
  connectSocket(userId);
  function connectSocket(userId) {
    socket.emit("joinuser", userId);
    socket.on("rideupdate", (rideData) => {
      console.log("Received ride update for user", userId, ":", rideData);
      setRides(
        rideData.filter(
          (item) =>
            item.status === "ACCEPTED" ||
            item.status === "SEARCHING" ||
            item.status === "ARRIVED" ||
            item.status === "PICKEDUP" ||
            item.status === "STARTED" ||
            item.status === "DROPPED"
        )
      );
    });
  }

  useEffect(() => {
    fetchRides();
  }, []);
  const handleShowDetails = (ride) => {
    setSelectedRide(ride);
    setShowDetails(true);
  };
  const handleCloseDetails = () => {
    setShowrating(false);
    setShowDetails(false);
  };
  const handleShow = (ride) => {
    if (ride.status === "STARTED") {
      setShow(false);
    } else {
      setSelectedRide(ride);
      setShow(true);
    }
  };

  const handleClose = () => {
    setShow(false);
    setCancelReason("");
  };
  const handleConfirmCancel = async (id) => {
    try {
      if (!cancelReason.trim()) {
        alert("Please enter a reason for cancellation.");
        return;
      }

      const data = { reason: cancelReason };

      const response = await axios.post(
        `http://localhost:8000/api/users/cancelrides/${id}`,
        data,
        { withCredentials: true }
      );

      if (response.status === 200) {
        alert("Ride cancelled successfully!");
        window.location.reload(); // Reload the page on success
      } else {
        alert("Failed to cancel the ride. Please try again.");
      }
    } catch (error) {
      console.error("Error cancelling ride:", error);
      alert(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      handleClose();
    }
  };

  const mapContainerStyle = {
    width: "100%",
    height: "400px",
  };

  const center = {
    lat: 23.0225,
    lng: 72.5714,
  };
  useEffect(() => {
    if (rides[0]?.status === "DROPPED") {
      setShowrating(true);
    }
  }, [rides]);

  const handleSubmit = async (e) => {
    console.log("helo");

    e.preventDefault();

    if (ratingData.rating === 0) {
      alert("Please select a rating.");
      return;
    }
    const data = {
      request_id: rides[0].id,
      provider_id: rides[0].provider_id,
      User_id: rides[0].user_id,
      rating: ratingData.rating,
      comment: ratingData.comment,
    };

    console.log("thisis data ", data);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/users/submit-rating",
        {
          request_id: rides[0].id,
          provider_id: rides[0].provider_id,
          User_id: rides[0].user_id,
          rating: ratingData.rating,
          comment: ratingData.comment,
        }
      );

      if (response.status === 200) {
        alert("Rating submitted successfully!");
        setRatingData({ rating: 0, feedback: "", comment: "" }); // Reset fields
        handleCloseDetails(); // Close modal
      }
    } catch (error) {
      console.error("Error submitting rating:", error);
      alert("Failed to submit rating. Try again later.");
    }
  };
  // console.log("filter rides ", upcomingrides);
  return (
    <MainCard>
      <Row>
        <Row className="justify-content-center align-items-top m-2 ">
          <>
            <div>
              <LoadScript googleMapsApiKey={GoogleMapAPI} libraries={libraries}>
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  center={center}
                  zoom={14}
                >
                  {center && <Marker position={center} />}
                </GoogleMap>
              </LoadScript>
            </div>
          </>
        </Row>
        <Row className="justify-content-center align-items-top m-2 ">
          {rides.length > 0 ? (
            <>
              {rides.map((ride) => (
                <>
                  <Row className="d-flex align-items-center m-4">
                    <Col xs={12} md={6}>
                      <h2>
                        <span style={{ color: "#dc3545" }}>Y</span>our{" "}
                        <span style={{ color: "#dc3545" }}>R</span>ides
                      </h2>
                    </Col>
                  </Row>
                  <Row>
                    <RideStatus ride={ride} />
                  </Row>
                  <div className="container p-3">
                    <Row className="align-items-start">
                      <Col xs={12} md={8}>
                        <div className="pickup-dropoff">
                          <div className="location">
                            <FaMapMarkerAlt className="pickup-icon" />
                            <div>
                              <strong>PICKUP</strong>
                              <p>{ride.s_address}</p>
                            </div>
                          </div>

                          <div className="vertical-line"></div>

                          <div className="location">
                            <FaMapMarkerAlt className="dropoff-icon" />
                            <div>
                              <strong>DROP</strong>
                              <p>{ride.d_address}</p>
                            </div>
                          </div>
                        </div>
                      </Col>
                      <Col xs={12} md={4} className="text-end ride-time">
                        <CalendarDays size={20} />
                        {new Date(ride.created_at).toLocaleString("en-us", {
                          timeZone: "IST",
                        })}
                      </Col>
                    </Row>
                    <Row className="mt-3">
                      <Col xs={12} md={4}>
                        <Card className="info-card">
                          <Card.Body>
                            <Card.Title className="info-title">
                              DISTANCE
                            </Card.Title>
                            <Card.Text className="info-text">
                              <MdOutlineRoute size={18} />{" "}
                              {ride.distance + " KM"}
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      </Col>

                      <Col xs={12} md={4}>
                        <Card className="info-card">
                          <Card.Body>
                            <Card.Title className="info-title">
                              PRICE
                            </Card.Title>
                            <Card.Text className="info-text">
                              <FaRupeeSign size={16} /> {ride.fixed}
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      </Col>

                      <Col xs={12} md={4}>
                        <Card className="info-card">
                          <Card.Body>
                            <Card.Title className="info-title">
                              PAYMENT
                            </Card.Title>
                            <Card.Text className="info-text">
                              <BsCash size={16} /> {ride.payment_mode}
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      </Col>
                      <Col>
                        {ride.status && ride.status !== "SEARCHING" ? (
                          <Card className="driver-card p-3 mb-3 mt-3">
                            <Row className="align-items-center">
                              {/* Profile Section */}
                              <Col
                                xs={12}
                                md={8}
                                className="d-flex align-items-center gap-3"
                              >
                                <Col xs="auto" className="pe-0">
                                  <Image
                                    src={`http://localhost:8000/uploads/${ride.avatar}`}
                                    roundedCircle
                                    width={60}
                                    height={60}
                                    className="border border-2 border-white shadow-sm"
                                    style={{ objectFit: "cover" }}
                                    alt="Driver"
                                  />
                                </Col>
                                <div>
                                  <h5 className="m-1">
                                    {" "}
                                    {ride.first_name} {ride.last_name}
                                  </h5>
                                  {(ride.status === "ACCEPTED" ||
                                    ride.status === "STARTED") && (
                                    <p className="text-muted small  mt-3 m-1">
                                      <span
                                        className="fw-bold border border-dark rounded-3 px-3 py-1  "
                                        style={styles.letterSpacing2}
                                      >
                                        {ride.otp}
                                      </span>
                                    </p>
                                  )}
                                  <div className="d-flex align-items-center gap-2 mt-3 m-1">
                                    <span className="badge bg-dark license-plate">
                                      {ride.service_number}
                                    </span>
                                    <span className="text-muted small">
                                      {ride.service_model}
                                    </span>
                                  </div>
                                </div>
                              </Col>

                              {/* Rating */}
                              <Col
                                xs={12}
                                md={4}
                                className="d-flex justify-content-md-end justify-content-center mt-3 mt-md-0"
                              >
                                <FaStar className="star-icon" />
                                <span className="ms-1">{ride.rating}</span>
                              </Col>
                            </Row>

                            <Row className="mt-3 border-top pt-3 text-center">
                              <Col xs={6} className="border-end">
                                <Button
                                  className="custom-button cancel-btn"
                                  onClick={() =>
                                    (window.location.href = `tel:${ride.mobile}`)
                                  }
                                >
                                  <FaPhoneAlt className="button-icon" /> Call
                                </Button>
                              </Col>
                              <Col xs={6}>
                                <Button
                                  className="custom-button details-btn"
                                  disabled
                                >
                                  <FaRegCommentDots className="button-icon" />{" "}
                                  Message
                                </Button>
                              </Col>
                            </Row>
                          </Card>
                        ) : (
                          <div className="d-flex align-items-center bg-light p-3 rounded-3 mb-3 mt-3">
                            <Spinner
                              animation="border"
                              size="sm"
                              variant="primary"
                              className="me-3"
                            />
                            <div>
                              <div className="fw-semibold">
                                Provider Searching...
                              </div>
                              <p className="text-muted small mb-0">
                                Looking for the best available driver
                              </p>
                            </div>
                          </div>
                        )}
                      </Col>
                    </Row>
                  </div>

                  <div className="d-flex flex-column flex-md-row gap-2 mt-3 button-container">
                    <Button
                      className="custom-button cancel-btn"
                      disabled={
                        !(
                          ride.status === "SEARCHING" ||
                          ride.status === "ACCEPTED"
                        )
                      }
                      onClick={() => handleShow(ride)}
                    >
                      <TiDelete className="button-icon" /> Cancel Ride
                    </Button>

                    <Button
                      className="custom-button details-btn"
                      onClick={() => handleShowDetails(ride)}
                    >
                      <FaInfoCircle className="button-icon" /> Ride Details
                    </Button>
                  </div>
                </>
              ))}
            </>
          ) : (
            <>
              <Card className="border-0 shadow-sm">
                <Card.Body className="text-center py-5">
                  <h3>You have no Rides </h3>
                  <Button
                    variant="light"
                    className="mt-3 rounded-pill px-4 py-2 border"
                    onClick={() => navigate("/user/dashboard")}
                  >
                    <FaCar className="me-2" /> Book ride now
                  </Button>
                </Card.Body>
              </Card>
            </>
          )}
        </Row>
      </Row>

      {/* Cancel Modal */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className="text-danger">Cancel Ride</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedRide && (
            <>
              <div className=" rounded mb-3">
                <p className="mb-1 text-dark fw-bold fs-5">Pickup Address:</p>
                <h6 className="mb-0 text-dark">{selectedRide.s_address}</h6>
              </div>
              <Form>
                <Form.Group controlId="cancelReason">
                  <Form.Label className="text-dark fw-bold mb-1 fs-5">
                    Reason for Cancellation
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    type="textarea"
                    placeholder="Enter reason"
                    value={cancelReason}
                    onChange={(e) => setCancelReason(e.target.value)}
                  />
                </Form.Group>
              </Form>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="danger"
            onClick={() => handleConfirmCancel(selectedRide.id)}
          >
            Confirm Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Ride Details Modal */}
      <Modal show={showDetails} onHide={handleCloseDetails} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title as="h4" className="fw-bold">
            Ride Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="px-4 py-3">
          {selectedRide && (
            <>
              {/* Ride Status Banner */}
              <div className="bg-light p-3 rounded mb-4 d-flex justify-content-between align-items-center">
                <div>
                  <Badge bg="success" className="rounded-pill px-3 py-2 mb-2">
                    {selectedRide.status}
                  </Badge>
                  <p className="mb-0 text-secondary small">
                    Ride ID:{selectedRide.booking_id}
                  </p>
                </div>
                <div className="text-end">
                  <p className="mb-0 fw-bold">₹{selectedRide.fixed}</p>
                  <p className="mb-0 text-secondary small">
                    {new Date(selectedRide.created_at).toLocaleString("en-us", {
                      timeZone: "Asia/Kolkata",
                    })}
                  </p>
                </div>
              </div>

              {/* Ride Information */}
              <div className="ride-info mb-4">
                <div className="pickup-address mb-3">
                  <p className="text-success mb-1 fw-medium">Pickup Address</p>
                  <p className="mb-0 text-secondary">
                    {selectedRide.s_address}
                  </p>
                </div>
                <div className="dropoff-address mb-4">
                  <p className="text-danger mb-1 fw-medium">Dropoff Address</p>
                  <p className="mb-0 text-secondary">
                    {selectedRide.d_address}
                  </p>
                </div>
                <Row className="ride-details mb-3">
                  <Col xs={6} md={3} className="mb-2">
                    <p className="mb-1 fw-medium">Distance</p>
                    <p className="mb-0 text-secondary">
                      {selectedRide.distance} km
                    </p>
                  </Col>
                  <Col xs={6} md={3} className="mb-2">
                    <p className="mb-1 fw-medium">Duration</p>
                    <p className="mb-0 text-secondary">
                      {selectedRide.travel_time || "N/A"}
                    </p>
                  </Col>
                  <Col xs={6} md={3} className="mb-2">
                    <p className="mb-1 fw-medium">Vehicle Type</p>
                    <p className="mb-0 text-secondary">
                      {selectedRide.service_model || "N/A"}
                    </p>
                  </Col>
                  <Col xs={6} md={3} className="mb-2">
                    <p className="mb-1 fw-medium">Ride Type</p>
                    <p className="mb-0 text-secondary">Standard</p>
                  </Col>
                </Row>
              </div>

              <hr className="my-3" />
                    
              

              {/* Payment Information */}
              <div className="payment-info mb-4">
                <div className="payment-method bg-light p-3 rounded mb-3">
                  <Row>
                    <Col xs={12} md={6}>
                      <p className="mb-1 fw-medium">Payment Method</p>
                      <div className="d-flex align-items-center">
                        <CreditCard size={16} className="me-2 text-primary" />
                        <span>{selectedRide.payment_mode}</span>
                      </div>
                    </Col>
                  </Row>
                </div>
                <div className="fare-details">
                  <Accordion defaultActiveKey="0" className="border-0">
                    <Accordion.Item eventKey="0" className="border-0">
                      <Accordion.Header className="bg-white p-0">
                        <span className="fw-medium">Fare Breakdown</span>
                      </Accordion.Header>
                      <Accordion.Body className="px-0">
                        <Table borderless size="sm" className="mb-0">
                          <tbody>
                            <tr>
                              <td>Base Fare</td>
                              <td className="text-end">
                                ₹
                                {(selectedRide.price_without_commision +
                                  selectedRide.commision) - selectedRide.tax}
                              </td>
                            </tr>
                            
                            <tr>
                              <td>tax</td>
                              <td className="text-end">₹{selectedRide.tax}</td>
                            </tr>
                            <tr>
                              <td>discount</td>
                              <td className="text-end text-danger"> -₹{selectedRide.discount}</td>
                            </tr>
                            <tr className="fw-bold">
                              <td>Total Amount</td>
                              <td className="text-end">
                                ₹{selectedRide.fixed}
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div>
              </div>
            </>
          )}
        </Modal.Body>
        <Modal.Footer >
          <Button variant="secondary" onClick={handleCloseDetails}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {/* rating model */}
      <Modal show={showrating} onHide={handleCloseDetails} centered>
        <Modal.Header closeButton>
          <Modal.Title>Rate Your Experience</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card className="p-4 shadow-sm rounded-lg w-100 mx-auto mt-4">
            <Card.Body>
              <h2 className="mb-3">Rate Your Experience</h2>
              <div className="d-flex mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <div
                    key={star}
                    className="me-2"
                    onClick={() => handleStarClick(star)}
                  >
                    {ratingData.rating >= star ? (
                      <StarFill className="text-warning" size={24} />
                    ) : (
                      <Star className="text-secondary" size={24} />
                    )}
                  </div>
                ))}
              </div>
              <Form.Group className="mb-3">
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Write your comment..."
                  value={ratingData.comment}
                  onChange={(e) =>
                    setRatingData((prev) => ({
                      ...prev,
                      comment: e.target.value,
                    }))
                  }
                />
              </Form.Group>
              <Button
                type="submit"
                variant="dark"
                className="w-100"
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </Card.Body>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDetails}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </MainCard>
  );
};

export default UserCurrentRides;
