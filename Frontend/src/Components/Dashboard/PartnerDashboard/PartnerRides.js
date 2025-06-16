import React, { useEffect, useState } from "react";
import MainCard from "../../layout/PartnerDashboardCard.js";
import { LoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import { MapPin, Navigation } from "lucide-react";
import { MdOutlineDoNotDisturb } from "react-icons/md";
import { Container, Row, Col, Card} from "react-bootstrap";
import { ApiUser } from "../../ApiUser.js";
import { useNavigate } from "react-router-dom";

const GoogleMapAPI = process.env.REACT_APP_YOUR_GOOGLE_MAPS_API_KEY;

const libraries = ["places"];

const PartnerRides = () => {
  const navigate = useNavigate();

  const [rides, setRides] = useState([]);
  
  const [userLocation, setUserLocation] = useState(null);
  console.log("this is user loctiona", userLocation);

  const mapContainerStyle = {
    width: "100%",
    height: "400px",
  };

  const center = {
    lat: 23.0225,
    lng: 72.5714,
  };
  const pickup = {
    lat: 23.0225,
    lng: 72.5714,
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting user location: ", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    const fetchRides = async () => {
      try {
        const response = await fetch(`${ApiUser}/getproviderrides`, {
          credentials: "include",
        });
        const data = await response.json();
        if (response.ok) {
          setRides(data);
        }
      } catch (error) {
        console.error("Error fetching rides: ", error);
      }
    };
    fetchRides();
  }, []);
  console.log(rides);

  const handleAcceptRide = async (rideId) => {
    const response = await fetch(`${ApiUser}/updatestatus/${rideId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
    if (response.ok) {
      console.log("Ride accepted successfully");
      navigate("/partner/acceptRides", { state: { rideId } });
    }
   
  };
  return (
    <MainCard>
      <LoadScript googleMapsApiKey={GoogleMapAPI} libraries={libraries}>
        <Container fluid>
          <Row className="justify-content-center align-items-start">
            <Col md={7} className="mb-4 d-flex justify-content-center">
              <Container className="mt-4">
                <h2 className="mb-4 text-center text-uppercase fw-bold">
                  Driver Rides
                </h2>
                <Row className="g-3">
                  {rides.length === 0 ? (
                    <Col className="mb-2 text-center">
                      <Card className="shadow-lg border-0 rounded-4 overflow-hidden p-4 d-flex align-items-center justify-content-center">
                        <MdOutlineDoNotDisturb
                          size={30}
                          className="text-danger me-2"
                        />
                        <span className="fw-bold text-muted">
                          No rides found
                        </span>
                      </Card>
                    </Col>
                  ) : (
                    rides.map((ride, index) => (
                      <Col key={index} lg={12} className="mb-2">
                        <Card className="shadow-lg border-0 rounded-4 overflow-hidden p-3">
                          <div className="d-flex justify-content-between ">
                            <div>
                              <div className="d-flex align-items-center gap-2">
                                <MapPin color="green" size={20} />
                                <h6 className="mb-0 fw-bold">PICKUP</h6>
                              </div>
                              <Card.Text className="mt-2 ms-4">
                                {ride.s_address}
                              </Card.Text>

                              <div className="d-flex align-items-center gap-2 mt-3">
                                <Navigation color="red" size={20} />
                                <h6 className="mb-0 fw-bold">DROP</h6>
                              </div>
                              <Card.Text className="mt-2 ms-4">
                                {ride.d_address}
                              </Card.Text>
                            </div>

                            <div className="d-flex flex-column  justify-content-between align-items-end">
                              <h5 className="fw-bold text-success">
                                ${ride.fixed}
                              </h5>

                              <button
                                className="btn btn-dark px-4 py-2 mt-2 align-items-end"
                                onClick={() => handleAcceptRide(ride.id)}
                              >
                                Accept
                              </button>
                            </div>
                          </div>
                        </Card>
                      </Col>
                    ))
                  )}
                </Row>
              </Container>
            </Col>
            <Col md={5} className="mb-4 d-flex   justify-content-start">
              <Card
                className="p-2 shadow-lg rounded w-100 ctm-card"
                style={{ marginTop: "10px" }}
              >
                <Card.Body>
                  <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    center={userLocation}
                    zoom={14}
                  >
                    {pickup && <Marker position={pickup} />}
                    {userLocation && (
                      <Marker
                        position={userLocation}
                        label="U"
                        icon={{
                          url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                        }}
                      />
                    )}
                  </GoogleMap>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </LoadScript>
    </MainCard>
  );
};

export default PartnerRides;
