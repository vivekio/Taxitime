import React, { useEffect, useState } from "react";
import MainCard from "../../layout/PartnerDashboardCard.js";
import {
  Card,
  Col,
  Container,
  Row,
  Table,
  Button,
  Modal,
} from "react-bootstrap";
import { FaDollarSign, FaUsers, FaStar } from "react-icons/fa";
import $ from "jquery";
import "datatables.net";
import "datatables.net-responsive";
import "datatables.net-buttons/js/buttons.html5.min.js";
import "datatables.net-buttons/js/buttons.print.min.js";
import "datatables.net-buttons/js/dataTables.buttons.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { ApiUser } from "../../ApiUser.js";
import "./PartnerRidesHistory.css"

const PartnerRidesHistory = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedRide, setSelectedRide] = useState(null);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [completedRides, setCompletedRides] = useState(0);
  const [canceledRides, setCanceledRides] = useState(0);

  const getfetchData = async () => {
    try {
      const response = await fetch(`${ApiUser}/getPartnerRidesHistory`, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setData(data);
      console.log(data);
      const total = data.reduce(
        (sum, ride) => sum + parseFloat(ride.earned || 0),
        0
      );
      setTotalEarnings(total.toFixed(2));
      const completed = data.filter(
        (ride) => ride.status === "COMPLETED"
      ).length;
      setCompletedRides(completed);
      const canceled = data.filter(
        (ride) => ride.status === "CANCELLED"
      ).length;
      setCanceledRides(canceled);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    getfetchData();
  }, []);

  const initializeDataTable = () => {
    if (!$.fn.DataTable.isDataTable("#userTable")) {
      $("#userTable").DataTable({
        layout: {
          topStart: "search",
          topEnd: null,
        },
        responsive: true,
        // buttons: ["copy", "csv", "excel", "pdf", "print"],
      });
    }
  };

  useEffect(() => {
    if (data.length > 0) {
      initializeDataTable();
    }
    return () => {
      if ($.fn.DataTable.isDataTable("#userTable")) {
        $("#userTable").DataTable().destroy();
      }
    };
  }, [data]);

  const handleShowModal = (ride) => {
    setSelectedRide(ride);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedRide(null);
  };
  const summaryData = [
    {
      title: "Total Earnings",
      value: totalEarnings,
      icon: <FaDollarSign  color="green"/>,
    },
    {
      title: "Completed Rides",
      value: completedRides,
      icon: <FaUsers  color="green"/>,
    },
    {
      title: "Canceled Rating",
      value: canceledRides,
      icon: <FaUsers color="red" />,
    },
  ];
  return (
    <MainCard>
      <Container className="py-5">
        <Row className="justify-content-start">
          <Col md={12}>
            <div className="text-start mb-4">
              <h1 className="mb-2">
                <span style={{ color: "red" }}>R</span>ide{" "}
                <span style={{ color: "red" }}>H</span>istory
              </h1>
              <p className="text-muted">View and manage your past rides</p>
            </div>

            <Row className="g-4 mb-5">
              {summaryData.map((item, idx) => (
                <Col md={4} key={idx}>
                  <Card className="border-1 w-100 h-100">
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <Card.Title
                            className="mb-2 text-muted"
                            style={{ fontSize: "14px" }}
                          >
                            {item.title}
                          </Card.Title>
                          <h4>{item.value}</h4>
                        
                        </div>
                        <div className="text-secondary fs-4">{item.icon}</div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>

          
            <div className="custom-table-wrapper">
              <Table
                id="userTable"
                responsive
                className="mt-3 custom-table"
              >
                <thead className="table-header">
                  <tr>
                    <th>Booking ID</th>
                    <th>Date</th>
                    <th>Customer Name</th>
                    <th>Earnings</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((ride) => (
                    <tr key={ride.id}>
                      <td>{ride.booking_id}</td>
                      <td>
                        {new Date(ride.created_at).toLocaleString("en-us", {
                          timeZone: "Asia/Kolkata",
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                      <td>
                        {ride.first_name} {ride.last_name}
                      </td>
                      <td>${ride.earned}</td>
                      <td>
                        <span className={`status-badge ${ride.status}`}>
                          {ride.status}
                        </span>
                      </td>
                      <td>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          className="details-btn"
                          onClick={() => handleShowModal(ride)}
                        >
                          Details
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>

            {/* Modal for Ride Details */}
            <Modal show={showModal} onHide={handleCloseModal} centered>
              <Modal.Header closeButton>
                <Modal.Title>Ride Details</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {selectedRide && (
                  <div>
                    <p>
                      <strong>Booking ID:</strong> {selectedRide.booking_id}
                    </p>
                    <p>
                      <strong>Date:</strong>{" "}
                      {new Date(selectedRide.created_at).toLocaleString("en-us", {
                        timeZone: "Asia/Kolkata", // Using Asia/Kolkata for IST
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                    <p>
                      <strong>Customer:</strong> {selectedRide.first_name}{" "}
                      {selectedRide.last_name}
                    </p>
                    <p>
                      <strong>Earnings:</strong> ${selectedRide.earned}
                    </p>
                    <p>
                      <strong>Status:</strong> {selectedRide.status}
                    </p>
                    <p>
                      <strong>Distance:</strong> {selectedRide.distance}
                    </p>
                  </div>
                )}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </Col>
        </Row>
      </Container>
    </MainCard>
  );
};

export default PartnerRidesHistory;
