import React, { useState, useRef } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Carousel,
} from "react-bootstrap";

import MainCard from "../../layout/DshboardCard.js";
import teximanSVG from "../../../Picture/Address-amico.png";
import photo1 from "../../../Picture/slider 1.png";
import photo2 from "../../../Picture/silder 2.png";
import photo3 from "../../../Picture/silder 3.png";
import { useNavigate } from "react-router-dom";
import { LoadScript, Autocomplete } from "@react-google-maps/api";

import "react-datepicker/dist/react-datepicker.css";

import "./UserDashboard.css";

const GoogleMapAPI = process.env.REACT_APP_YOUR_GOOGLE_MAPS_API_KEY;
const sliderData = [
  {
    image: photo1,
    caption: "",
  },
  {
    image: photo2,
    caption: "",
  },
  {
    image: photo3,
    caption: "",
  },
];

// console.log(photo1);
// console.log(photo2);

const Dashboard = () => {
  const [slides, setSlides] = useState(sliderData);
  const navigate = useNavigate();
  const pickupRef = useRef(null);
  const dropRef = useRef(null);
  const [bookingData, setBookingData] = useState({
    pickupLocation: "",
    dropLocation: "",
    bookingDate: "",
  });
  const [bookingdateortime, setbookingdateortime] = useState({
    bookingType: "Pick Now",
    bookingDate: "",
    bookingTime: "",
  });

  const [errors, setErrors] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingData({
      ...bookingData,
      [name]: value,
    });
    setErrors("")
  };

  const handleChangedateortime = (e) => {
    setbookingdateortime({
      ...bookingdateortime,
      [e.target.name]: e.target.value,
    });
    setErrors("");
  };
  const handleTypeSelect = (type) => {
    setbookingdateortime({
      ...bookingdateortime,
      bookingType: type,
      bookingDate: "",
      bookingTime: "",
    });
  };

  const handlePlaceSelect = (type) => {
    if (type === "pickup" && pickupRef.current) {
      const place = pickupRef.current.getPlace();
      if (place && place.formatted_address) {
        setBookingData({
          ...bookingData,
          pickupLocation: place.formatted_address,
        });
      }
    } else if (type === "drop" && dropRef.current) {
      const place = dropRef.current.getPlace();
      if (place && place.formatted_address) {
        setBookingData({
          ...bookingData,
          dropLocation: place.formatted_address,
        });
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !bookingData.pickupLocation.trim() ||
      !bookingData.dropLocation.trim()
    ) {
      setErrors("Please enter both pickup and drop locations.");
      return;
    }
    if (bookingdateortime.bookingType === "Schedule") {
      const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD
      if (!bookingdateortime.bookingDate) {
        setErrors("Please select a booking date.");
        return;
      }

      if (bookingdateortime.bookingDate < today) {
        setErrors("Please select a future date.");
        return;
      }

      if (!bookingdateortime.bookingTime) {
        setErrors("Please select a booking time.");
        return;
      }
    }
    const data = { ...bookingData, ...bookingdateortime };
    console.log("Booking data:", data);
    navigate("/user/dashboard/UserBookRides", { state: { data } });
  };
 
 
  
  return (
    <MainCard>
      <div>
        <LoadScript googleMapsApiKey={GoogleMapAPI} libraries={["places"]}>
          <Container fluid>
            <div className="carousel-container" variant="dark">
              <Carousel>
                {slides.map((slide, index) => (
                  <Carousel.Item key={index} interval={2000}>
                    <img
                      className="d-block w-100"
                      src={slide.image}
                      alt={`Slide ${index + 1}`}
                      style={{
                        objectFit: "cover",
                        width: "100%",
                        height: "auto",
                      }}
                    />
                    <Carousel.Caption>
                      <h3>{slide.caption}</h3>
                    </Carousel.Caption>
                  </Carousel.Item>
                ))}
              </Carousel>
            </div>
            <Row className="justify-content-center align-items-center">
              <Col md={6} className="mb-4 d-flex justify-content-center">
                <Card
                  // class="card-responsive"
                  className=" shadow-lg rounded w-100 ctm-card card-responsive"
               
                >
                  <Card.Body className= "title-responsive">
                    <h3
                 
                      className="text-center mb-4"
                    >
                      Book Your Taxi
                    </h3>
                    <div className="container d-flex flex-column align-items-center mt-5">
                      <Form onSubmit={handleSubmit} className="w-100">
                        <div>
                          <Autocomplete
                            onLoad={(ref) => (pickupRef.current = ref)}
                            onPlaceChanged={() => handlePlaceSelect("pickup")}
                            style={{ flexGrow: 1 }}
                          >
                            <Form.Control
                              placeholder="Pickup Location"
                              name="pickupLocation"
                              value={bookingData.pickupLocation}
                              onChange={handleChange}
                              style={{
                                marginBottom: "30px",
                                border: "1px solid black",
                                height: "50px",
                                borderRadius: "5px 5px 5px 5px", // Match date input style
                              }}
                            />
                          </Autocomplete>
                        </div>
                        <div>
                          <Autocomplete
                            onLoad={(ref) => (dropRef.current = ref)}
                            onPlaceChanged={() => handlePlaceSelect("drop")}
                          >
                            <Form.Control
                              placeholder="Drop Location"
                              name="dropLocation"
                              value={bookingData.dropLocation}
                              onChange={handleChange}
                              style={{
                                marginBottom: "30px",
                                border: "1px solid black",
                                height: "50px",
                                borderRadius: "5px 5px 5px 5px",
                              }}
                            />
                          </Autocomplete>
                        </div>

                        <div className="selectbooking">
                          <Form.Select
                          className="custom-select"
                            name="bookingType"
                            value={bookingdateortime.bookingType}
                            onChange={(e) => handleTypeSelect(e.target.value)}
                            style={{
                              marginBottom: "30px",
                              border: "1px solid black",
                              height: "50px",
                              borderRadius: "5px 5px 5px 5px",
                            }}
                            
                          >
                            <option  value="Pick Now">Pick Now</option>
                            <option  value="Schedule">Schedule</option>
                          </Form.Select>
                        </div>

                        {/* <DropdownButton
                          title={bookingdateortime.bookingType}
                          className="mb-3"
                        >
                          <Dropdown.Item
                            onClick={() => handleTypeSelect("Pick Now")}
                          >
                            Pick Now
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => handleTypeSelect("Schedule")}
                          >
                            Schedule
                          </Dropdown.Item>
                        </DropdownButton> */}

                        {/* Show Date & Time Inputs only for Scheduled Booking */}
                        {bookingdateortime.bookingType === "Schedule" && (
                          <>
                            <Form.Group className="mb-3">
                              <Form.Label>Date</Form.Label>
                              <Form.Control
                                type="date"
                                name="bookingDate"
                                value={bookingdateortime.bookingDate}
                                onChange={handleChangedateortime}
                                required
                                style={{
                                  marginBottom: "30px",
                                  border: "1px solid black",
                                  height: "50px",
                                  borderRadius: "5px 5px 5px 5px",
                                }}
                              />
                            </Form.Group>

                            <Form.Group className="mb-3">
                              <Form.Label>Time</Form.Label>
                              <Form.Control
                                type="time"
                                name="bookingTime"
                                value={bookingdateortime.bookingTime}
                                onChange={handleChangedateortime}
                                required
                                style={{
                                  marginBottom: "30px",
                                  border: "1px solid black",
                                  height: "50px",
                                  borderRadius: "5px 5px 5px 5px",
                                }}
                              />
                            </Form.Group>
                          </>
                        )}
                        {errors && (
                          <div
                            className="text-danger mb-3 text-center align-items-center"
                            style={{
                              padding: "10px",
                              border: "1px solid red",
                              height: "50px",
                              borderRadius: "5px 5px 5px 5px",
                            }}
                          >
                            {errors}
                          </div>
                        )}

                        <Button
                          variant="danger"
                          type="submit"
                          
                          className="w-100"
                          style={{
                            height: "50px",
                          }}
                        >
                          Search Cabs →
                        </Button>
                      </Form>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6} className="text-end">
                <div>
                  <img
                    src={teximanSVG}
                    alt="Taxi Illustration"
                    className="img-fluid"
                    style={{
                      opacity: "0.9",
                      objectFit: "cover",
                      width: "100%",
                      height: "auto",
                    }}
                  />
                </div>
              </Col>
            </Row>
          </Container>
        </LoadScript>
      </div>
    </MainCard>
  );
};

export default Dashboard;
