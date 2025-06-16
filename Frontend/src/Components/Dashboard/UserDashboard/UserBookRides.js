// import React, { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import {
//   Container,
//   Row,
//   Col,
//   Card,
//   Button,
//   Spinner,
//   Alert,
//   Form,
//   Table,
// } from "react-bootstrap";
// import {
//   GoogleMap,
//   LoadScript,
//   Marker,
//   DirectionsRenderer,
// } from "@react-google-maps/api";
// import { FaMapMarkerAlt, FaMapPin, FaRoad, FaClock } from "react-icons/fa";
// import MainCard from "../../layout/DshboardCard.js";
// import "./UserDashboard.css";
// import carlogo from "../../../Picture/car.webp";
// import axios from "axios";
// const GoogleMapAPI = process.env.REACT_APP_YOUR_GOOGLE_MAPS_API_KEY;

// const UserBookRides = () => {
//   const location = useLocation();
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   const bookingData = location.state?.data || {};
//   const [pickup, setPickup] = useState(null);
//   const [drop, setDrop] = useState(null);
//   const [directions, setDirections] = useState(null);
//   const [distance, setDistance] = useState(null);
//   const [duration, setDuration] = useState(null);
//   const [paymentMethod, setPaymentMethod] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [isMapLoading, setIsMapLoading] = useState(true);
//   const [isBookingLoading, setIsBookingLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [geocodeError, setGeocodeError] = useState(null);
//   const [directionsError, setDirectionsError] = useState(null);
//   const [selectedRide, setSelectedRide] = useState({});
//   const [rides, setRides] = useState([]);

//   const geocodeAddress = (address, setLocation) => {
//     if (!address) {
//       setGeocodeError("No address provided");
//       return;
//     }

//     try {
//       if (
//         !window.google ||
//         !window.google.maps ||
//         !window.google.maps.Geocoder
//       ) {
//         console.error("Google Maps API not loaded yet.");
//         setGeocodeError(
//           "Google Maps API not loaded yet. Please refresh the page."
//         );
//         return;
//       }

//       setIsLoading(true);
//       const geocoder = new window.google.maps.Geocoder();

//       geocoder.geocode({ address }, (results, status) => {
//         try {
//           if (status === "OK" && results[0]?.geometry?.location) {
//             setLocation({
//               lat: results[0].geometry.location.lat(),
//               lng: results[0].geometry.location.lng(),
//             });
//             setGeocodeError(null);
//           } else {
//             console.error("Geocode failed for address:", address, status);
//             setGeocodeError(`Failed to find location for address: ${address}`);
//           }
//         } catch (err) {
//           console.error("Error in geocode callback:", err);
//           setGeocodeError("Error processing location data");
//         } finally {
//           setIsLoading(false);
//         }
//       });
//     } catch (err) {
//       console.error("Error in geocodeAddress:", err);
//       setGeocodeError("Error processing address");
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     try {
//       if (!bookingData.pickupLocation && !bookingData.dropLocation) {
//         setError(
//           "No booking data provided. Please select pickup and drop locations."
//         );
//         return;
//       }

//       // Wait for Google Maps API to be fully loaded before geocoding
//       const checkGoogleMapsLoaded = () => {
//         if (
//           window.google &&
//           window.google.maps &&
//           window.google.maps.Geocoder
//         ) {
//           if (bookingData.pickupLocation) {
//             geocodeAddress(bookingData.pickupLocation, setPickup);
//           }
//           if (bookingData.dropLocation) {
//             geocodeAddress(bookingData.dropLocation, setDrop);
//           }
//         } else {
//           // If not loaded, check again after a short delay
//           setTimeout(checkGoogleMapsLoaded, 500);
//         }
//       };

//       checkGoogleMapsLoaded();
//     } catch (err) {
//       console.error("Error in useEffect:", err);
//       setError("Error initializing map data");
//     }
//   }, [bookingData]);

//   useEffect(() => {
//     try {
//       if (pickup && drop && window.google?.maps) {
//         setDirectionsError(null);
//         const directionsService = new window.google.maps.DirectionsService();

//         directionsService.route(
//           {
//             origin: pickup,
//             destination: drop,
//             travelMode: window.google.maps.TravelMode.DRIVING,
//           },
//           (result, status) => {
//             try {
//               if (status === "OK" && result) {
//                 setDirections(result);
//                 if (
//                   result.routes &&
//                   result.routes[0] &&
//                   result.routes[0].legs &&
//                   result.routes[0].legs[0]
//                 ) {
//                   setDistance(result.routes[0].legs[0].distance.text);
//                   setDuration(result.routes[0].legs[0].duration.text);
//                 } else {
//                   setDirectionsError("Invalid route data received");
//                 }
//               } else {
//                 console.error("Error fetching directions:", status);
//                 setDirectionsError(
//                   "Couldn't find a route between these locations"
//                 );
//               }
//             } catch (err) {
//               console.error("Error in directions callback:", err);
//               setDirectionsError("Error processing route data");
//             }
//           }
//         );
//       }
//     } catch (err) {
//       console.error("Error getting directions:", err);
//       setDirectionsError("Error calculating route");
//     }
//   }, [pickup, drop]);

//   const mapContainerStyle = { width: "100%", height: "400px" };
//   const center = pickup || { lat: 22.3039, lng: 70.8022 }; // Default to Rajkot, India if no pickup

//   const handleBookTaxi = () => {
//     const data = {
//       bookingtype: bookingData.bookingType,
//       bookingDate: bookingData.bookingDate,
//       bookingTime: bookingData.bookingTime,
//       distance: parseFloat(distance),
//       pickup: bookingData.pickupLocation,
//       drop: bookingData.dropLocation,
//       pickuplat: pickup.lat,
//       pickuplng: pickup.lng,
//       droplat: drop.lat,
//       droplng: drop.lng,
//       price: selectedRide.Totalprice,
//       duration: duration,
//       servicetypeid: selectedRide.servicetypeid,
//       paymentMethod: paymentMethod,
//     };
//     // console.log(" this is data", data);

//     try {
//       if (!distance || !duration) {
//         setError("Please wait for route calculation to complete");
//         return;
//       }

//       setIsBookingLoading(true);

//       axios
//         .post("http://localhost:8000/api/users//bookrides", data, {
//           headers: {
//             "Content-Type": "application/json",
//           },
//           withCredentials: true,
//         })
//         .then((response) => {
//           // console.log("Taxi booked successfully:", response.data);
//           // Success message or redirect would go here
//           alert("Your taxi has been booked successfully!");
//         })
//         .catch((error) => {
//           console.error("Error booking taxi:", error);
//           setError("Failed to book taxi. Please try again.");
//           setIsBookingLoading(false);
//         });
//       setTimeout(() => {
//         setIsBookingLoading(false);
//         // Success message or redirect would go here
//         // alert("Your taxi has been booked successfully!");
//       }, 2000);
//     } catch (err) {
//       console.error("Error booking taxi:", err);
//       setError("Failed to book taxi. Please try again.");
//       setIsBookingLoading(false);
//     }
//   };

//   const fetchRides = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:8000/api/users/selectrides"
//       );
//       setRides(response.data);
//     } catch (error) {
//       console.error("Error fetching rides:", error);
//     }
//   };

//   useEffect(() => {
//     fetchRides();
//   }, []);
//   const handleRideSelect = (ride) => {
//     const price = ride.price * parseInt(distance) + ride.fixed;
//     const tax = (price * parseInt(ride.tax_percentage)) / 100;
//     const Totalprice = price + tax;
//     const servicetypeid = ride.id;
//     // console.log("this is total price", Totalprice, tax, price);

//     setSelectedRide({ servicetypeid, Totalprice });
//   };

//   return (
//     <MainCard>
//       <Container fluid>
//         {error && (
//           <Row className="mb-3">
//             <Col>
//               <Alert
//                 variant="danger"
//                 dismissible
//                 onClose={() => setError(null)}
//               >
//                 {error}
//               </Alert>
//             </Col>
//           </Row>
//         )}

//         <Row className="justify-content-center align-items-center">
//           <Col md={7} className="mb-4 d-flex justify-content-center">
//             <Card
//               className="p-4 shadow-lg rounded w-100 ctm-card"
//               style={{ marginTop: "10px", paddingBottom: "10px" }}
//             >
//               <Card.Body>
//                 <h3
//                   className="text-center mb-4"
//                   style={{ fontSize: "36px", fontWeight: "bold" }}
//                 >
//                   Book Your Taxi
//                 </h3>

//                 {isLoading && (
//                   <div className="text-center mb-3">
//                     <Spinner animation="border" role="status">
//                       <span className="visually-hidden">Loading...</span>
//                     </Spinner>
//                     <span>Calculating route...</span>
//                   </div>
//                 )}

//                 {geocodeError && (
//                   <Alert variant="warning" className="mb-3">
//                     {geocodeError}
//                   </Alert>
//                 )}

//                 {directionsError && (
//                   <Alert variant="warning" className="mb-3">
//                     {directionsError}
//                   </Alert>
//                 )}

//                 {distance && duration && !isLoading && (
//                   <Row className="justify-content-center align-items-center">
//                     <Col md={5} className="mb-4 d-flex justify-content-center">
//                       <Container fluid>
//                         <h5 className="fw-bold mb-3 text-center d-flex align-items-center">
//                           {" "}
//                           Booking Details
//                         </h5>
// <Table borderless responsive>
//   <tbody>
//     <tr>
//       <td
//         className="fw-bold"
//         style={{ minWidth: "120px" }}
//       >
//         <FaMapMarkerAlt className="text-primary me-2" />{" "}
//         Pickup:
//       </td>
//       <td className="text-muted">
//         {bookingData?.pickupLocation || "Not provided"}
//       </td>
//     </tr>
//     <tr>
//       <td
//         className="fw-bold"
//         style={{ minWidth: "120px" }}
//       >
//         <FaMapPin className="text-danger me-2" /> Drop:
//       </td>
//       <td className="text-muted">
//         {bookingData?.dropLocation || "Not provided"}
//       </td>
//     </tr>
//     <tr>
//       <td
//         className="fw-bold"
//         style={{ minWidth: "120px" }}
//       >
//         <FaRoad className="text-success me-2" />{" "}
//         Distance:
//       </td>
//       <td className="text-muted">
//         {distance || "N/A"}
//       </td>
//     </tr>
//     <tr>
//       <td
//         className="fw-bold"
//         style={{ minWidth: "120px" }}
//       >
//         <FaClock className="text-warning me-2" /> Time:
//       </td>
//       <td className="text-muted">
//         {duration || "N/A"}
//       </td>
//     </tr>
//   </tbody>
// </Table>
//                       </Container>
//                       {/* </Card.Body> */}
//                     </Col>
//                     <Col md={7} className="mb-4 d-flex justify-content-center">
//                       <Container>
//                         <h5 className="mb-4 fw-bold">Choose a ride</h5>

//                         {rides.map((ride) => (
//                           <Card
//                             key={ride.id}
//                             className={`mb-3 ${
//                               selectedRide?.servicetypeid === ride.id
//                                 ? "border-black"
//                                 : ""
//                             }`}
//                             onClick={() => handleRideSelect(ride)}
//                             style={{ cursor: "pointer" }}
//                           >
//                             <Card.Body>
//                               <Row className="align-items-center">
//                                 <Col xs={3} sm={2} md={1}>
//                                   <div className="ride-icon bg-light ">
//                                     {ride.type === "suv" ? (
//                                       <img
//                                         src={carlogo}
//                                         alt="SUV"
//                                         className="img-fluid"
//                                       />
//                                     ) : (
//                                       <img
//                                         src={carlogo}
//                                         alt="Car"
//                                         className="img-fluid"
//                                       />
//                                     )}
//                                   </div>
//                                 </Col>
//                                 <Col xs={9} sm={6} md={8}>
//                                   <div className="d-flex align-items-center">
//                                     <h5 className="mb-0">{ride.name}</h5>
//                                     <span className="ms-2 text-muted">
//                                       <small>
//                                         {" "}
//                                         <i className="bi bi-person-fill p-1"></i>
//                                         {ride.capacity}
//                                       </small>
//                                     </span>
//                                   </div>
//                                   <p className="text-muted mb-0">
//                                     {ride.description}
//                                   </p>
//                                 </Col>
//                                 <Col
//                                   xs={12}
//                                   sm={4}
//                                   md={3}
//                                   className="text-end mt-2 mt-sm-0"
//                                 >
//                                   <h5>
//                                     ₹ ₹
//                                     {ride.price * parseInt(distance) +
//                                       ride.fixed +
//                                       ((ride.price * parseInt(distance) +
//                                         ride.fixed) *
//                                         parseInt(ride.tax_percentage)) /
//                                         100}
//                                   </h5>
//                                 </Col>
//                               </Row>
//                             </Card.Body>
//                           </Card>
//                         ))}
//                       </Container>
//                     </Col>
//                   </Row>
//                 )}
//                 <Card.Body className="mb-3">
//                   {/* <p> */}
//                     <div className="selectpayment">
//                       <strong>Select Payment</strong>
//                       <Form.Select
//                         name="paymentMethod"
//                         value={paymentMethod || "CASH"}
//                         onChange={(e) => setPaymentMethod(e.target.value)}
//                       >
//                         <option value="CASH">Cash</option>
//                         <option value="CARD">Card</option>
//                         <option value="PAYPAL">PayPal</option>
//                         <option value="WALLET">Wallet</option>
//                       </Form.Select>
//                     </div>
//                   {/* </p> */}
//                 </Card.Body>

//                 <div className="d-grid gap-2">
//                   <Button
//                     style={{ backgroundColor: "#dc3545", border: "none" }}
//                     variant="primary"
//                     size="lg"
//                     disabled={
//                       isBookingLoading || isLoading || !distance || !duration
//                     }
//                     onClick={handleBookTaxi}
//                   >
//                     {isBookingLoading ? (
//                       <>
//                         <Spinner
//                           as="span"
//                           animation="border"
//                           size="sm"
//                           role="status"
//                           aria-hidden="true"
//                           className="me-2"
//                         />
//                         Booking...
//                       </>
//                     ) : (
//                       "Book Now"
//                     )}
//                   </Button>
//                 </div>
//               </Card.Body>
//             </Card>
//           </Col>

//           <Col md={5} className="mb-4 d-flex justify-content-center">
//             <Card
//               className="p-2 shadow-lg rounded w-100 ctm-card"
//               style={{ marginTop: "20px" }}
//             >
//               <Card.Body>
//                 <LoadScript
//                   googleMapsApiKey={GoogleMapAPI}
//                   libraries={["places"]}
//                   onLoad={() => setIsMapLoading(false)}
//                   onError={(err) => {
//                     console.error("Error loading Google Maps:", err);
//                     setError(
//                       "Failed to load Google Maps. Please check your internet connection."
//                     );
//                     setIsMapLoading(false);
//                   }}
//                 >
//                   {isMapLoading ? (
//                     <div className="text-center p-5">
//                       <Spinner animation="border" role="status">
//                         <span className="visually-hidden">Loading map...</span>
//                       </Spinner>
//                       <p>Loading map...</p>
//                     </div>
//                   ) : (
//                     <GoogleMap
//                       mapContainerStyle={mapContainerStyle}
//                       center={center}
//                       zoom={14}
//                       options={{
//                         fullscreenControl: false,
//                         streetViewControl: false,
//                         mapTypeControl: false,
//                         zoomControl: true,
//                       }}
//                     >
//                       {pickup && <Marker position={pickup} label="P" />}
//                       {drop && <Marker position={drop} label="D" />}
//                       {directions && (
//                         <DirectionsRenderer directions={directions} />
//                       )}
//                     </GoogleMap>
//                   )}
//                 </LoadScript>
//               </Card.Body>
//             </Card>
//           </Col>
//         </Row>
//       </Container>
//     </MainCard>
//   );
// };

// export default UserBookRides;
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Spinner,
  Alert,
  Form,
  Table,
} from "react-bootstrap";
import {
  GoogleMap,
  LoadScript,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { FaMapMarkerAlt, FaMapPin, FaRoad, FaClock } from "react-icons/fa";
import MainCard from "../../layout/DshboardCard.js";
import "./UserDashboard.css";
import carlogo from "../../../Picture/car.webp";
import axios from "axios";
import { SwipeableButton } from "react-swipeable-button";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

// Ensure the API key is correctly set in your .env file as REACT_APP_GOOGLE_MAPS_API_KEY
const GoogleMapAPI = process.env.REACT_APP_YOUR_GOOGLE_MAPS_API_KEY;

const UserBookRides = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingData = location.state?.data || {};
  const [pickup, setPickup] = useState(null);
  console.log("this is pickup", pickup);
  
  const [drop, setDrop] = useState(null);
  const [directions, setDirections] = useState(null);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("CASH");
  const [isLoading, setIsLoading] = useState(false);
  const [isMapLoading, setIsMapLoading] = useState(true);
  const [isBookingLoading, setIsBookingLoading] = useState(false);
  const [error, setError] = useState(null);
  const [geocodeError, setGeocodeError] = useState(null);
  const [directionsError, setDirectionsError] = useState(null);
  const [selectedRide, setSelectedRide] = useState({});
  const [rides, setRides] = useState([]);

  // Geocode function with better error handling
  const geocodeAddress = (address, setLocation) => {
    if (!address) {
      setGeocodeError("No address provided");
      return;
    }

    if (!window.google || !window.google.maps || !window.google.maps.Geocoder) {
      setGeocodeError("Google Maps API is not loaded yet.");
      return;
    }

    setIsLoading(true);
    const geocoder = new window.google.maps.Geocoder();

    geocoder.geocode({ address }, (results, status) => {
      if (status === "OK" && results[0]?.geometry?.location) {
        setLocation({
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng(),
        });
        setGeocodeError(null);
      } else {
        setGeocodeError(`Failed to geocode address: ${address}`);
      }
      setIsLoading(false);
    });
  };

  // Initial geocoding effect
  useEffect(() => {
    if (!bookingData.pickupLocation || !bookingData.dropLocation) {
      setError("Please provide both pickup and drop locations.");
      return;
    }

    if (!GoogleMapAPI) {
      setError(
        "Google Maps API key is missing. Please check your configuration."
      );
      return;
    }

    // Geocode only after the map script is loaded
  }, [bookingData]);

  // Directions effect
  useEffect(() => {
    if (pickup && drop && window.google?.maps) {
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin: pickup,
          destination: drop,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === "OK" && result) {
            setDirections(result);
            setDistance(result.routes[0].legs[0].distance.text);
            setDuration(result.routes[0].legs[0].duration.text);
            setDirectionsError(null);
          } else {
            setDirectionsError("Unable to calculate route.");
          }
        }
      );
    }
  }, [pickup, drop]);

  const mapContainerStyle = { width: "100%", height: "400px" };
  const center = pickup || { lat: 22.3039, lng: 70.8022 }; // Default to Rajkot, India

  const handleBookTaxi = async () => {
    if (!distance || !duration || !selectedRide.Totalprice) {
      setError("Please wait for route calculation and select a ride.");
      return;
    }

    const data = {
      bookingtype: bookingData.bookingType,
      bookingDate: bookingData.bookingDate,
      bookingTime: bookingData.bookingTime,
      distance: parseFloat(distance),
      pickup: bookingData.pickupLocation,
      drop: bookingData.dropLocation,
      pickuplat: pickup.lat,
      pickuplng: pickup.lng,
      droplat: drop.lat,
      droplng: drop.lng,
      price: selectedRide.Totalprice,
      duration: duration,
      servicetypeid: selectedRide.servicetypeid,
      paymentMethod: paymentMethod,
    };

    setIsBookingLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/users/bookrides",
        data,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        toast("Your taxi has been booked successfully!");
        setTimeout(() => {
          if (bookingData.bookingType === 'Schedule') {
            navigate("/user/BookedRides")
          }else{
            navigate("/user/currentRides");
          }
          
        }, 2000);
      }
    } catch (err) {
      setError("Failed to book taxi. Please try again.");
    } finally {
      setIsBookingLoading(false);
    }
  };

  const fetchRides = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/users/selectrides"
      );
      setRides(response.data);
    } catch (error) {
      console.error("Error fetching rides:", error);
    }
  };

  useEffect(() => {
    fetchRides();
  }, []);

  const handleRideSelect = (ride) => {
    if (!distance) return;
    const price = ride.price * parseInt(distance) + ride.fixed;
    const tax = (price * parseInt(ride.tax_percentage)) / 100;
    const Totalprice = price + tax;
    setSelectedRide({ servicetypeid: ride.id, Totalprice });
  };
 
console.log("Pickup",pickup)
  return (
    <MainCard>
      <ToastContainer />
      <Container fluid>
        {error && (
          <Alert variant="danger" onClose={() => setError(null)} dismissible>
            {error}
          </Alert>
        )}
        <Row>
          <Col md={7}>
            <Card className="p-4 shadow-lg rounded w-100 ctm-card">
              <Card.Body>
                <h3
                  className="text-center mb-4"
                  style={{ fontSize: "36px", fontWeight: "bold" }}
                >
                  Book Your Taxi
                </h3>
                {isLoading && (
                  <div className="text-center mb-3">
                    <Spinner animation="border" />{" "}
                    <span>Calculating route...</span>
                  </div>
                )}
                {geocodeError && (
                  <Alert variant="warning">{geocodeError}</Alert>
                )}
                {directionsError && (
                  <Alert variant="warning">{directionsError}</Alert>
                )}
                {distance && duration && (
                  <Row>
                    <Col md={5}>
                      <h5 className="fw-bold mb-3">Booking Details</h5>
                      <Table borderless responsive>
                        <tbody>
                          <tr>
                            <td
                              className="fw-bold"
                              style={{ minWidth: "120px" }}
                            >
                              <FaMapMarkerAlt className="text-primary me-2" />{" "}
                              Pickup:
                            </td>
                            <td className="text-muted">
                              {bookingData?.pickupLocation || "Not provided"}
                            </td>
                          </tr>
                          <tr>
                            <td
                              className="fw-bold"
                              style={{ minWidth: "120px" }}
                            >
                              <FaMapPin className="text-danger me-2" /> Drop:
                            </td>
                            <td className="text-muted">
                              {bookingData?.dropLocation || "Not provided"}
                            </td>
                          </tr>
                          <tr>
                            <td
                              className="fw-bold"
                              style={{ minWidth: "120px" }}
                            >
                              <FaRoad className="text-success me-2" /> Distance:
                            </td>
                            <td className="text-muted">{distance || "N/A"}</td>
                          </tr>
                          <tr>
                            <td
                              className="fw-bold"
                              style={{ minWidth: "120px" }}
                            >
                              <FaClock className="text-warning me-2" /> Time:
                            </td>
                            <td className="text-muted">{duration || "N/A"}</td>
                          </tr>
                        </tbody>
                      </Table>
                    </Col>
                    <Col md={7}>
                      <h5 className="mb-4 fw-bold">Choose a ride</h5>
                      {rides.map((ride) => (
                        <Card
                          key={ride.id}
                          className={`mb-3 ${
                            selectedRide.servicetypeid === ride.id
                              ? "border-black"
                              : ""
                          }`}
                          onClick={() => handleRideSelect(ride)}
                          style={{ cursor: "pointer" }}
                        >
                          <Card.Body>
                            <Row>
                              <Col xs={3} sm={2} md={1}>
                                <img
                                  src={carlogo}
                                  alt="Car"
                                  className="img-fluid"
                                />
                              </Col>
                              <Col xs={9} sm={6} md={8}>
                                <h5>
                                  {ride.name}{" "}
                                  <small>
                                    <i className="bi bi-person-fill"></i>{" "}
                                    {ride.capacity}
                                  </small>
                                </h5>
                                <p>{ride.description}</p>
                              </Col>
                              <Col xs={12} sm={4} md={3} className="text-end">
                                <h5>
                                  ₹{" "}
                                  {distance
                                    ? (
                                        ride.price * parseInt(distance) +
                                        ride.fixed +
                                        ((ride.price * parseInt(distance) +
                                          ride.fixed) *
                                          parseInt(ride.tax_percentage)) /
                                          100
                                      ).toFixed(2)
                                    : "N/A"}
                                </h5>
                              </Col>
                            </Row>
                          </Card.Body>
                        </Card>
                      ))}
                    </Col>
                  </Row>
                )}
                <div className="selectpayment">
                  <strong>Select Payment</strong>
                  <Form.Select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  >
                    <option value="CASH">Cash</option>
                    <option value="CARD">Card</option>
                    <option value="PAYPAL">PayPal</option>
                    <option value="WALLET">Wallet</option>
                  </Form.Select>
                </div>

                <div style={{ marginTop: "20px" }}>
                  <SwipeableButton
                    autoWidth={true}
                    text={isBookingLoading ? "Booking..." : "BOOK RIDE"}
                    text_unlocked={
                      isBookingLoading ? "Booking..." : "RIDES BOOKED"
                    }
                    onSuccess={handleBookTaxi}
                    // onSuccess={handleSuccess}
                    color="#dc3545"
                    disabled={
                      isBookingLoading ||
                      isLoading ||
                      !distance ||
                      !duration ||
                      !selectedRide.Totalprice
                    }
                  />
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={5}>
            <Card className="p-2 shadow-lg rounded w-100 ctm-card">
              <Card.Body>
                <LoadScript
                  googleMapsApiKey={GoogleMapAPI}
                  libraries={["places"]}
                  onLoad={() => {
                    setIsMapLoading(false);
                    geocodeAddress(bookingData.pickupLocation, setPickup);
                    geocodeAddress(bookingData.dropLocation, setDrop);
                  }}
                  onError={() => setError("Failed to load Google Maps API")}
                >
                  {isMapLoading ? (
                    <div className="text-center p-5">
                      <Spinner animation="border" /> <p>Loading map...</p>
                    </div>
                  ) : (
                    <GoogleMap
                      mapContainerStyle={mapContainerStyle}
                      center={center}
                      zoom={14}
                    >
                      {pickup && <Marker position={pickup} label="P" />}
                      {drop && <Marker position={drop} label="D" />}
                      {directions && (
                        <DirectionsRenderer directions={directions} />
                      )}
                    </GoogleMap>
                  )}
                </LoadScript>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </MainCard>
  );
};

export default UserBookRides;
