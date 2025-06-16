import React, { useEffect, useState } from "react";
import MainCard from "../../layout/PartnerDashboardCard.js";
import { MdOutlineRoute } from "react-icons/md";
import { ClockFading } from "lucide-react";
import { LandPlot } from "lucide-react";
import { CalendarDays } from "lucide-react";
import { TiDelete } from "react-icons/ti";
import { FaMapMarkerAlt } from "react-icons/fa";
import { LoadScript, GoogleMap, Marker } from "@react-google-maps/api";
// import { MapPin, CircleUser, Clock, CheckCircle } from "lucide-react";
import {
  CircleUser,
  MapPin,
  Clock,
  CheckCircle,
  Image,
  Calendar,
  Car,
  CreditCard,
  Star,
  Navigation,
  Phone,
  Info,
} from "lucide-react";
import { SwipeableButton } from "react-swipeable-button";
import { FaPhoneAlt, FaRegCommentDots, FaStar } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import OtpInput from "react-otp-input";
import {
  Container,
  Row,
  Col,
  Card,
  Badge,
  Button,
  Modal,
  Form,
  ListGroup,
} from "react-bootstrap";
import { ApiUser } from "../../ApiUser.js";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./PartnerAcceptRides.css";
const GoogleMapAPI = process.env.REACT_APP_YOUR_GOOGLE_MAPS_API_KEY;

const PartnerAcceptRides = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const RidesId = location.state?.rideId || {};
  const [rides, setRides] = useState([]);
  const [show, setShow] = useState(false);
  const [showcancel, setshowcancel] = useState(false);
  const [otp, setOtp] = useState("");
  const [cancelReason, setCancelReason] = useState("");
  const [selectedRide, setSelectedRide] = useState(null);
  const handleChange = (value) => {
    setOtp(value);
  };

  const handleStartRide = async (id) => {
    try {
      const response = await axios.post(
        `${ApiUser}/Rides-start-ride/${id}`,
        {},
        { withCredentials: true }
      );
      console.log(response.data);
      toast.success(response.data.message);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error("Error starting ride:", error);
      toast.error(error.response.data.message);
    }
  };

  const handledropoffRide = async (id) => {
    try {
      const response = await axios.post(
        `${ApiUser}/Rides-drop-ride/${id}`,
        {},
        { withCredentials: true }
      );
      console.log(response.data);
      toast.success(response.data.message);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error("Error starting ride:", error);
      toast.error(error.response.data.message);
    }
  };
  const handledcompleteRide = async (id) => {
    try {
      const response = await axios.post(
        `${ApiUser}/Rides-complete-ride/${id}`,
        {},
        { withCredentials: true }
      );
      console.log(response.data);
      toast.success(response.data.message);
      setTimeout(() => {
        navigate("/partner/rides");
      }, 1000);
    } catch (error) {
      console.error("Error starting ride:", error);
      toast.error(error.response.data.message);
    }
  };
  const handleconfirmotp = async (id) => {
    console.log("OTP:", otp);

    if (!otp) {
      toast.error("Please enter the OTP.");
      return;
    }

    try {
      const response = await axios.post(`${ApiUser}/Rides-verify-otp/${id}`, {
        otp,
      });

      setOtp("");
      console.log(response.data);
      toast.success(response.data.message);

      setTimeout(() => {
        setShow(false);
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error("Error verifying OTP:", error);

      // Handle API errors
      if (error.response) {
        toast.error(error.response.data?.message || "Failed to verify OTP.");
      } else if (error.request) {
        toast.error("No response from the server. Please try again.");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };
 const  handleShowcancel = (ride) => {
  setSelectedRide(ride);
  setshowcancel(true);
 }
  const handleShow = (ride) => {
    if (rides.status === "STARTED") {
      setShow(true);
    }
    // setShow(true);
  };

  const handleClose = () => {
    setshowcancel(false);
    setShow(false);
  };

  const mapContainerStyle = {
    width: "100%",
    height: "585px",
  };

  const center = {
    lat: 22.3039, // Example: Rajkot coordinates
    lng: 70.8022,
  };

  const fetchdata = async () => {
    await fetch(`${ApiUser}/getallridesdetilas/${RidesId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("this is data ", data[0]);
        setRides(data[0]);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  useEffect(() => {
    fetchdata();
  }, []);
  const handleConfirmCancel = async (id) => {
    try {
      if (!cancelReason.trim()) {
        alert("Please enter a reason for cancellation.");
        return;
      }

      const data = { reason: cancelReason };
      console.log(data)
      const response = await axios.post(
        `http://localhost:8000/api/users/cancelridesbyprovider/${id}`,
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
  return (
    <MainCard>
      <ToastContainer />
      <LoadScript googleMapsApiKey={GoogleMapAPI} libraries={["places"]}>
        <Container fluid>
          <Row className="justify-content-center align-items-start">
            <Col md={7} className="mb-4 d-flex justify-content-center">
              <Card
                className="p-4 shadow-lg rounded w-100 ctm-card"
                style={{ marginTop: "10px", paddingBottom: "10px" }}
              >
                <Row className="justify-content-center align-items-start">
                  <Card className=" p-3 mb-3 mt-3">
                    <Row className="align-items-center">
                      {/* Profile Section */}
                      <Col
                        xs={12}
                        md={8}
                        className="d-flex align-items-center gap-3"
                      >
                        <Col xs="auto" className="">
                          <div>
                            <img
                              src={`http://localhost:8000/uploads/${rides.picture}`}
                              width="60" // Set explicit size
                              height="60"
                              className="border border-2 border-white shadow-sm"
                              style={{ objectFit: "cover" }}
                              roundedCircle
                              alt="Driver"
                            />
                          </div>
                        </Col>
                        <div>
                          <h5 className="m-1">
                            {" "}
                            {rides.first_name} {rides.last_name}
                          </h5>
                          <div className="d-flex align-items-center gap-2 mt-2 m-1">
                            <span className="badge bg-dark license-plate">
                              {rides.mobile}
                            </span>
                          </div>
                        </div>
                      </Col>
                    </Row>

                    <Row className="mt-3 border-top pt-3 text-center">
                      <Col xs={6} className="border-end">
                        <Button
                          className="custom-button cancel-btn"
                          onClick={() =>
                            (window.location.href = `tel:${rides.mobile}`)
                          }
                        >
                          <FaPhoneAlt className="button-icon" /> Call
                        </Button>
                      </Col>
                      <Col xs={6}>
                        <Button className="custom-button details-btn" disabled>
                          <FaRegCommentDots className="button-icon" /> Message
                        </Button>
                      </Col>
                    </Row>
                  </Card>
                </Row>
                <Row className="justify-content-center align-items-start">
                  <Card>
                    <Card.Body>
                      <Row className="align-items-center mb-4">
                        <Col xs={12} md={6}>
                          <h5 className="text-dark mb-0">
                            {" "}
                            <MdOutlineRoute size={22} />
                            Trip Details
                          </h5>
                        </Col>
                        <Col
                          xs={12}
                          md={6}
                          className="text-md-end mt-2 mt-md-0"
                        >
                          <Badge
                            bg="light"
                            text="dark"
                            className="me-2 "
                            style={{ fontSize: "14px" }}
                          >
                            <ClockFading size={18} /> {rides.travel_time}
                          </Badge>
                          <Badge
                            bg="light"
                            text="dark"
                            className="me-2 "
                            style={{ fontSize: "14px" }}
                          >
                            <LandPlot size={18} />
                            {rides.distance}
                            {"km"}
                          </Badge>
                        </Col>
                      </Row>
                      <div className="timeline-container">
                        <Row className="mb-3 position-relative">
                          <Col xs={1} className="text-end ">
                            <FaMapMarkerAlt size={30} color="green" />
                          </Col>
                          <Col xs={11}>
                            <h6 className="mb-1">Pick Up </h6>
                            <p className="text-muted mb-1">{rides.s_address}</p>
                          </Col>
                        </Row>
                        <Row className="mb-3 position-relative">
                          <Col xs={1} className="text-end">
                            <FaMapMarkerAlt size={30} color="red" />
                          </Col>
                          <Col xs={11}>
                            <h6 className="mb-1">Drop Off</h6>
                            <p className="text-muted mb-1">{rides.d_address}</p>
                          </Col>
                        </Row>
                      </div>

                      <Row className="align-items-center">
                        <Card
                          className="mb-3 shadow-sm"
                          style={{ backgroundColor: "#efefef6e" }}
                        >
                          <Card.Body>
                            <Row className="align-items-center">
                              {/* Amount Column */}
                              <Col xs={12} md={6}>
                                <h5 className="text-success mb-0">
                                  Payment (mode:{rides.payment_mode}) :{" "}
                                  {rides.totalprice}
                                </h5>
                              </Col>

                              {/* Date Column */}
                              <Col
                                xs={12}
                                md={6}
                                className="text-md-end mt-2 mt-md-0"
                              >
                                <p className="text-muted mb-0 d-flex align-items-center justify-content-md-end">
                                  <CalendarDays size={20} className="me-1" />
                                  {new Date(rides.created_at).toLocaleString(
                                    "en-us",
                                    {
                                      timeZone: "Asia/Kolkata", // Using Asia/Kolkata for IST
                                      year: "numeric",
                                      month: "short",
                                      day: "numeric",
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    }
                                  )}
                                </p>
                              </Col>
                            </Row>
                          </Card.Body>
                        </Card>
                        <div className="d-flex flex-column justify-content-between align-items-start mt-3">
                          {rides.status === "ACCEPTED" && (
                            <SwipeableButton
                              text="Start Ride"
                              className="px-4 py-2 mt-2 align-self-end"
                              onSuccess={() => handleStartRide(rides.id)}
                              color="dark"
                            />
                          )}
                          {rides.status === "STARTED" && (
                            <Button
                              variant="dark"
                              className="px-4 py-2 mt-2 align-self-end"
                              aria-label={`Start ride for ${rides.first_name} ${rides.last_name}`}
                              onClick={() => handleShow()}
                            >
                              <CheckCircle size={18} className="me-2" /> PICK UP
                            </Button>
                          )}
                          {rides.status === "PICKEDUP" && (
                            <Button
                              variant="dark"
                              className="px-4 py-2 mt-2 align-self-end"
                              aria-label={`Start ride for ${rides.first_name} ${rides.last_name}`}
                              onClick={() => handledropoffRide(rides.id)}
                            >
                              <CheckCircle size={18} className="me-2" /> drop
                              off
                            </Button>
                          )}
                          {rides.status === "DROPPED" && (
                            <Button
                              variant="dark"
                              className="px-4 py-2 mt-2 align-self-end"
                              aria-label={`Start ride for ${rides.first_name} ${rides.last_name}`}
                              onClick={() => handledcompleteRide(rides.id)}
                            >
                              <CheckCircle size={18} className="me-2" /> Payment
                              done
                            </Button>
                          )}
                        </div>
                        <div className="d-flex flex-column flex-md-row gap-2 mt-3 button-container">
                          <Button
                            className="custom-button cancel-btn"
                            disabled={
                              !(
                                rides.status === "SEARCHING" ||
                                rides.status === "ACCEPTED"
                              )
                            }
                            onClick={() => handleShowcancel(rides)}
                          >
                            <TiDelete className="button-icon" /> Cancel Ride
                          </Button>
                        </div>
                      </Row>
                    </Card.Body>
                  </Card>
                </Row>

                {/* <Container className="mt-4">
                  <h2 className="mb-4 text-center text-uppercase fw-bold text-primary">
                    Driver Rides
                  </h2>

                  <Row className="g-3">
                    <Col lg={12} className="mb-2">
                      <Card className="shadow-lg border-0 rounded-4 overflow-hidden p-4">
                        <div className="d-flex justify-content-between flex-wrap">
                          <div className="flex-grow-1">
                            <div className="d-flex align-items-center gap-2">
                              <CircleUser color="blue" size={24} />
                              <h6 className="mb-0 fw-bold">
                                {rides.first_name} {rides.last_name}
                              </h6>
                              <Card.Text className="ms-2 mb-0 text-muted">
                                {rides.mobile}
                              </Card.Text>

                              <Badge
                                bg={
                                  rides.status === "Completed"
                                    ? "success"
                                    : "warning"
                                }
                                className="ms-3"
                              >
                                {rides.status}
                              </Badge>
                            </div>

                            <div className="d-flex align-items-center gap-2 mt-3">
                              <MapPin color="green" size={20} />
                              <h6 className="mb-0 fw-bold text-success">
                                Pick Up
                              </h6>
                            </div>
                            <Card.Text className="mt-2 ms-4 text-muted">
                              {rides.s_address}
                            </Card.Text>

                            <div className="d-flex align-items-center gap-2 mt-3">
                              <MapPin color="red" size={20} />
                              <h6 className="mb-0 fw-bold text-danger">
                                Drop Off
                              </h6>
                            </div>
                            <Card.Text className="mt-2 ms-4 text-muted">
                              {rides.d_address}
                            </Card.Text>

                            <div className="d-flex align-items-center gap-2 mt-3">
                              <Clock color="purple" size={20} />
                              <h6 className="mb-0 fw-bold">Estimated Time</h6>
                            </div>
                            <Card.Text className="mt-2 ms-4 text-muted">
                              {rides.estimated_time} mins
                            </Card.Text>
                          </div>

                          <div className="d-flex flex-column justify-content-between align-items-end">
                           
                            {rides.status === "ACCEPTED" && (
                              <SwipeableButton
                                text="Start Ride"
                                className="px-4 py-2 mt-2 align-self-end"
                                onSuccess={() => handleStartRide(rides.id)}
                                color="dark"
                              />
                            )}
                            {rides.status === "STARTED" && (
                              <Button
                                variant="dark"
                                className="px-4 py-2 mt-2 align-self-end"
                                aria-label={`Start ride for ${rides.first_name} ${rides.last_name}`}
                                onClick={() => handleShow()}
                              >
                                <CheckCircle size={18} className="me-2" /> PICK
                                UP
                              </Button>
                            )}
                            {rides.status === "PICKEDUP" && (
                              <Button
                                variant="dark"
                                className="px-4 py-2 mt-2 align-self-end"
                                aria-label={`Start ride for ${rides.first_name} ${rides.last_name}`}
                                onClick={() => handledropoffRide(rides.id)}
                              >
                                <CheckCircle size={18} className="me-2" /> drop
                                off
                              </Button>
                            )}
                            {rides.status === "DROPPED" && (
                              <Button
                                variant="dark"
                                className="px-4 py-2 mt-2 align-self-end"
                                aria-label={`Start ride for ${rides.first_name} ${rides.last_name}`}
                                onClick={() => handledcompleteRide(rides.id)}
                              >
                                <CheckCircle size={18} className="me-2" />{" "}
                                Payment done
                              </Button>
                            )}
                          </div>
                        </div>
                      </Card>
                    </Col>
                  </Row>
                </Container> */}
              </Card>
            </Col>

            <Col md={5} className="mb-4 d-flex   justify-content-start">
              <Card
                className="p-2 shadow-lg rounded w-100 ctm-card"
                style={{ marginTop: "10px" }}
              >
                <Card.Body>
                  <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    center={center}
                    zoom={14}
                    options={{
                      fullscreenControl: false,
                      streetViewControl: false,
                      mapTypeControl: false,
                      zoomControl: true,
                    }}
                  >
                    <Marker position={center} />
                  </GoogleMap>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </LoadScript>

      <Modal show={showcancel} onHide={handleClose} centered>
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

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className="text-dark">Comfirm OTP</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <>
            <div className=" rounded mb-3">
              <p className="mb-1 text-dark fw-bold fs-5">Enter OTP</p>
              <div
                className="otp-input"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <OtpInput
                  className="otp-input my-3 text-center"
                  value={otp}
                  onChange={handleChange}
                  numInputs={4}
                  separator={<span> - </span>}
                  renderInput={(props) => <input {...props} />}
                  inputStyle={{
                    width: "40px",
                    height: "40px",
                    margin: "5px",
                    fontSize: "20px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                    textAlign: "center",
                    justifyContent: "center",
                  }}
                />
              </div>
            </div>
          </>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="success"
            type="submit"
            onClick={() => handleconfirmotp(rides.id)}
          >
            Confirm OTP
          </Button>
        </Modal.Footer>
      </Modal>
    </MainCard>
  );
};

export default PartnerAcceptRides;
