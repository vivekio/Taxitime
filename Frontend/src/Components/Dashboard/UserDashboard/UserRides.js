import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Form,
  Table,
} from "react-bootstrap";
import { FaCar, FaInfoCircle } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { TiDelete } from "react-icons/ti";
import { MdDateRange } from "react-icons/md";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { LuBike } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import waitingSVG from "../../../Picture/Waiting.svg";

import MainCard from "../../layout/DshboardCard.js";
import ridesSVG from "../../../Picture/Rides.svg";
import postSVG from "../../../Picture/TAXI TIME.png";
import axios from "axios";

const UserRides = () => {
  // Sample ride data - in a real app, this would come from an API
  const [rides, setRides] = useState([]);
  const [upcomingrides, setupcomingrides] = useState([]);
  const [pastrides, setpastrides] = useState([]);
  const [show, setShow] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [selectedRide, setSelectedRide] = useState(null);
  const navigate = useNavigate();

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

      console.log(
        "this is  upcoming ",
        response.data.filter((item) => item.status === "SCHEDULED")
      );

      setupcomingrides(
        response.data.filter((item) => item.status === "SCHEDULED")
      );

      console.log(
        "this is past ",
        response.data.filter(
          (item) => item.status === "CANCELLED" || item.status === "COMPLETED"
        )
      );
      setpastrides(
        response.data.filter(
          (item) => item.status === "CANCELLED" || item.status === "COMPLETED"
        )
      );
    } catch (error) {
      console.error("Error fetching rides:", error);
    }
  };

  useEffect(() => {
    fetchRides();
  }, []);

  const handleShowDetails = (ride) => {
    setSelectedRide(ride);
    setShowDetails(true);
  };
  const handleCloseDetails = () => {
    setShowDetails(false);
  };
  const handleShow = (ride) => {
    setSelectedRide(ride);
    console.log();

    setShow(true);
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
  console.log("filter rides ", upcomingrides);

  return (
    <MainCard>
      <Container fluid className="px-3 py-4">
        {/* Upcoming section */}
        <Row className="justify-content-center align-items-top">
          <Col md={6} className="mb-4 d-flex" style={{ color: "black" }}>
            <h2 className="fw-bold mb-3">Rides </h2>
          </Col>
          <Col md={6} className="mb-4 d-flex " style={{ color: "black" }}>
            <h2 className="fw-bold mb-3"> Upcoming Rides </h2>
          </Col>
          <Col md={6} className="mb-4 d-flex justify-content-center">
            <Container fluid>
              <Row>
                <Col xs={12}>
                  {rides.length > 0 ? (
                    <>
                      {rides.map((ride) => (
                        <Card key={ride.id} className="mb-3 border-0 shadow-sm">
                          <Row className="g-0">
                            <Col xs={12} md={3} className="p-3 text-center">
                              <div className="bg-light rounded h-100 d-flex align-items-center justify-content-center">
                                <img src={ridesSVG} alt="Rides" />
                              </div>
                            </Col>
                            <Col xs={12} md={9}>
                              <Card.Body>
                                <h5 className="mb-3">
                                  {" "}
                                  <FaLocationDot />
                                  {ride.s_address}
                                </h5>
                                <p className="text-muted mb-3">
                                  {" "}
                                  <MdDateRange size={20} />
                                  {new Date(ride.created_at).toLocaleString("en-US",{
                                    timeZone: "IST",
                                  })};

                                </p>
                                <p className="mb-3 font-weight-bold font-size-lg">
                                  {" "}
                                  <RiMoneyRupeeCircleFill size={20} />
                                  {ride.fixed || 0}
                                </p>
                                <p className="mb-3 ">
                                  <Button
                                    size="sm"
                                    style={{
                                      padding: " 8px 5px ",
                                      color: "#18b362",
                                      background: "none",
                                      // marginLeft: "10px",
                                      marginBottom: "10px",
                                      border: "1px solid #18b362",
                                    }}
                                  >
                                    <LuBike size={15} /> {ride.status}
                                  </Button>
                                </p>
                                <div className="d-flex gap-2 mt-3">
                                  <Button
                                    variant="dark"
                                    className="d-flex align-items-center"
                                    onClick={() => handleShow(ride)}
                                  >
                                    <TiDelete size={25} /> CANCLE
                                  </Button>

                                  <Button
                                    variant="dark"
                                    className="d-flex align-items-center"
                                    onClick={() => handleShowDetails(ride)}
                                  >
                                    <FaInfoCircle size={18} /> DETAILS
                                  </Button>
                                </div>
                              </Card.Body>
                            </Col>
                          </Row>
                        </Card>
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
                </Col>
              </Row>
            </Container>
          </Col>

          <Col md={6} className="mb-4 d-flex justify-content-center">
            <Container fluid>
              {upcomingrides.length > 0 ? (
                <>
                  {upcomingrides.map((ride) => (
                    <Card key={ride.id} className="mb-3 border-0 shadow-sm">
                      <Row className="g-0">
                        <Col xs={12} md={3} className="p-3 text-center">
                          <div className="bg-light rounded h-100 d-flex align-items-center justify-content-center">
                            <img src={waitingSVG} alt="Rides" />
                          </div>
                        </Col>
                        <Col xs={12} md={9}>
                          <Card.Body>
                            <h5 className="mb-3">
                              {" "}
                              <FaLocationDot />
                              {ride.s_address}
                            </h5>
                            <p className="text-muted mb-3">
                              {" "}
                              <MdDateRange size={20} />
                              {new Date(ride.created_at).toLocaleString(
                                "en-us",
                                {
                                  timeZone: "UTC",
                                }
                              )}
                            </p>
                            <p className="mb-3 font-weight-bold font-size-lg">
                              {" "}
                              <RiMoneyRupeeCircleFill size={20} />
                              {ride.fixed || 0}
                            </p>
                            <p className="mb-3 ">
                              <Button
                                size="sm"
                                style={{
                                  padding: " 8px 5px ",
                                  color: "#18b362",
                                  background: "none",
                                  // marginLeft: "10px",
                                  marginBottom: "10px",
                                  border: "1px solid #18b362",
                                }}
                              >
                                <LuBike size={15} /> {ride.status}
                              </Button>
                            </p>
                            <div className="d-flex gap-2 mt-3">
                              <Button
                                variant="dark"
                                className="d-flex align-items-center"
                                onClick={() => handleShow(ride)}
                              >
                                <TiDelete size={25} /> CANCLE
                              </Button>

                              <Button
                                variant="dark"
                                className="d-flex align-items-center"
                                onClick={() => handleShowDetails(ride)}
                              >
                                <FaInfoCircle size={18} /> DETAILS
                              </Button>
                            </div>
                          </Card.Body>
                        </Col>
                      </Row>
                    </Card>
                  ))}
                </>
              ) : (
                <>
                  <Card className="border-0 shadow-sm">
                    <Card.Body className="text-center py-5">
                      <h3>You have no upcoming trips</h3>
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
            </Container>
          </Col>
        </Row>

        {/* Ride list */}
        <Row>
          <h2 className="fw-bold mb-3" style={{ color: "black" }}>
            Past Rides
          </h2>
          <Col xs={12}>
            {pastrides ? (
              <>
                {" "}
                {pastrides.map((ride) => (
                  <Card key={ride.id} className="mb-3 border-0 shadow-sm">
                    <Row className="g-0">
                      <Col xs={12} md={3} className="p-3 text-center">
                        <div
                          className="rounded h-100 d-flex align-items-center justify-content-center"
                        >
                          <img src={postSVG} alt="Rides" />
                        </div>
                      </Col>
                      <Col xs={12} md={9}>
                        <Card.Body>
                          <h5 className="mb-3">
                            {" "}
                            <FaLocationDot />
                            {ride.s_address}
                          </h5>
                          <p className="text-muted mb-3">
                            {" "}
                            <MdDateRange size={20} />
                            {new Date(ride.created_at).toLocaleString("en-us", {
                              timeZone: "UTC",
                            })}
                          </p>
                          <p className="mb-3 font-weight-bold font-size-lg">
                            {" "}
                            <RiMoneyRupeeCircleFill size={20} />
                            {ride.fixed || 0 }
                          </p>
                          <p className="mb-3 ">
                            <Button
                              size="sm"
                              style={{
                                padding: " 8px 5px ",
                                color: "#18b362",
                                background: "none",
                                // marginLeft: "10px",
                                marginBottom: "10px",
                                border: "1px solid #18b362",
                              }}
                            >
                              <LuBike size={15} /> {ride.status}
                            </Button>
                          </p>
                          <div className="d-flex gap-2 mt-3">
                            <Button
                              variant="dark"
                              className="d-flex align-items-center"
                              onClick={() => handleShowDetails(ride)}
                            >
                              <FaInfoCircle size={18} /> DETAILS
                            </Button>
                          </div>
                        </Card.Body>
                      </Col>
                    </Row>
                  </Card>
                ))}
              </>
            ) : (
              <>
                <Card className="border-0 shadow-sm">
                  <Card.Body className="text-center py-5">
                    <h3>You have no any past Rides </h3>
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
          </Col>
        </Row>
      </Container>
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

      {/* Details Modal */}
      <Modal show={showDetails} onHide={handleCloseDetails} centered>
        <Modal.Header closeButton>
          <Modal.Title>Ride Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedRide && (
            <Table borderless responsive className="mb-2">
              <tbody>
                <tr>
                  <td className="fw-bold">Pickup Address</td>
                  <td>{selectedRide.s_address}</td>
                </tr>
                <tr>
                  <td className="fw-bold">Dropoff Address</td>
                  <td>{selectedRide.d_address}</td>
                </tr>
                <tr>
                  <td className="fw-bold">Ride Date</td>
                  <td>
                    {new Date(selectedRide.created_at).toLocaleString("en-us", {
                      timeZone: "UTC",
                    })}
                  </td>
                </tr>{" "}
                <tr>
                  <td className="fw-bold">Distance</td>
                  <td>{selectedRide.distance}</td>
                </tr>
                <tr>
                  <td className="fw-bold">Price</td>
                  <td>₹{selectedRide.fixed || 0}</td>
                </tr>
                <tr>
                  <td className="fw-bold">cancelled by</td>
                  <td>{selectedRide.cancelled_by}</td>
                </tr>
                <tr>
                  <td className="fw-bold">Cancel Reason</td>
                  <td>{selectedRide.cancel_reason || "-"}</td>
                </tr>
                <tr>
                  <td className="fw-bold">Status</td>
                  <td>{selectedRide.status}</td>
                </tr>
              </tbody>
            </Table>
          )}
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

export default UserRides;
