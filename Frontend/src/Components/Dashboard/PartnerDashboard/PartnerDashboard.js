// import React, { useEffect, useState } from "react";
// import MainCard from "../../layout/PartnerDashboardCard.js";
// import { LoadScript, GoogleMap, Marker } from "@react-google-maps/api";
// import {
//   Container,
//   Row,
//   Col,
//   Card,
//   Form,
//   Button,
//   Carousel,
// } from "react-bootstrap";
// import { ApiUser } from "../../ApiUser.js";
// const GoogleMapAPI = process.env.REACT_APP_YOUR_GOOGLE_MAPS_API_KEY;

// const PartnerDashboard = () => {
//   const [status, setStatus] = useState("");
//   const mapContainerStyle = {
//     width: "100%",
//     height: "400px",
//   };

//   const center = {
//     lat: 22.3039, // Example: Rajkot coordinates
//     lng: 70.8022,
//   };

//   const fetchdata = async () => {
//     await fetch(`${ApiUser}/getstatus`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       credentials: "include",
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         console.log(data[0].status);
//         setStatus(data[0].status);
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//       });
//   };
//   useEffect(() => {
//     fetchdata();
//   }, []);

//   const Handleonclick = async () => {
//     try {
//       const newStatus = status === "active" ? "offline" : "active";

//       const response = await fetch(`${ApiUser}/updatestatus`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         credentials: "include",
//         body: JSON.stringify({ status: newStatus }),
//       });
//       if (response.ok) {
//         console.log("Status updated successfully");
//         setStatus(newStatus);
//       }
//     } catch (error) {
//       console.error("Error updating status:", error.message);
//     }
//   };

//   return (
//     <MainCard>
//       <LoadScript googleMapsApiKey={GoogleMapAPI} libraries={["places"]}>
//         <Container fluid>
//           <Row className="justify-content-center align-items-start">
//             <Col md={7} className="mb-4 d-flex justify-content-center">
//               <Card
//                 className="p-4 shadow-lg rounded w-100 ctm-card"
//                 style={{ marginTop: "10px", paddingBottom: "10px" }}
//               >

//                 <div
//                   style={{
//                     width: "100%",
//                     height: "350px",
//                     background: " #4be0ef",
//                     marginBottom: "20px",
//                     borderRadius: "10px",
//                     display: "flex",
//                     justifyContent: "center",
//                     alignItems: "center",
//                   }}
//                 >
//                   <img
//                     src="https://urban.hexagoninfosoft.in/asset/img/offline.gif"
//                     alt="online / offline"
//                     style={{
//                       maxWidth: "100%",
//                       maxHeight: "100%",
//                       objectFit: "contain",
//                     }}
//                   />
//                 </div>
//                 <h2 className="text-center">
//                   {status === "active" || status === "riding"
//                     ? ` You Are Online`
//                     : " You Are Offline"}
//                 </h2>
//                 <Button
//                   className="w-full py-2"
//                   onClick={Handleonclick}
//                   style={{
//                     backgroundColor:
//                       status === "active" || status === "riding"
//                         ? "#dc3545"
//                         : "#3DBB5A",
//                     color: "white",
//                     border: "none",
//                   }}
//                 >
//                   {status === "active" || status === "riding"
//                     ? "Go Offline"
//                     : "Go Online"}
//                 </Button>
//               </Card>
//             </Col>
//             <Col md={5} className="mb-4 d-flex   justify-content-start">
//               <Card
//                 className="p-2 shadow-lg rounded w-100 ctm-card"
//                 style={{ marginTop: "10px" }}
//               >
//                 <Card.Body>
//                   <GoogleMap
//                     mapContainerStyle={mapContainerStyle}
//                     center={center}
//                     zoom={14}
//                     options={{
//                       fullscreenControl: false,
//                       streetViewControl: false,
//                       mapTypeControl: false,
//                       zoomControl: true,
//                     }}
//                   >
//                     <Marker position={center} />
//                   </GoogleMap>
//                 </Card.Body>
//               </Card>
//             </Col>
//           </Row>
//         </Container>
//       </LoadScript>
//     </MainCard>
//   );
// };

// export default PartnerDashboard;
import React, { useEffect, useState } from "react";
import MainCard from "../../layout/PartnerDashboardCard.js";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { LoadScript, GoogleMap, MarkerF } from "@react-google-maps/api";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Carousel,
} from "react-bootstrap";
import { ApiUser } from "../../ApiUser.js";
import socket from "../../../socket.js";
const GoogleMapAPI = process.env.REACT_APP_YOUR_GOOGLE_MAPS_API_KEY;

const PartnerDashboard = () => {
  const token = Cookies.get("providerToken");
  const decoded = jwtDecode(token);
  const providerId = decoded.id;

  const [status, setStatus] = useState("");
  const [userLocation, setUserLocation] = useState(
    "" || { lat: 22.3039, lng: 70.8022 }
  );
  const [error, setError] = useState(null);

  const mapContainerStyle = {
    width: "100%",
    height: "500px",
  };

  // Get user's live location
  const getUserLocation = async () => {
    if (navigator.geolocation) {
      await navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(newLocation);
          console.log("User location:", newLocation);

          setError(null);
        },
        (err) => {
          setError("Unable to retrieve your location");
          console.error(err);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    } else {
      setError("Geolocation is not supported by this browser");
    }
  };

  const fetchdata = async () => {
    await fetch(`${ApiUser}/getstatus`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data[0].status);
        setStatus(data[0].status);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    fetchdata();
    getUserLocation(); // Get location when component mounts
  }, []);

  const Handleonclick = async () => {
    try {
      const newStatus = status === "active" ? "offline" : "active";

      const response = await fetch(`${ApiUser}/updatestatus`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ status: newStatus }),
      });
      if (response.ok) {
        console.log("Status updated successfully");
        setStatus(newStatus);
      }
    } catch (error) {
      console.error("Error updating status:", error.message);
    }
  };
  function connectSocket(providerId) {
    socket.emit("joinprovider", providerId);
    socket.emit("provider_location", userLocation);
  }
  connectSocket(providerId);

  console.log("user location", userLocation);
  return (
    <MainCard>
      <LoadScript googleMapsApiKey={GoogleMapAPI} libraries={["places"]}>
        <Container fluid>
          <Row className="justify-content-center align-items-start">
            <Col md={7} className="mb-4 d-flex justify-content-center">
              <Card
                className="p-4 shadow-lg rounded w-100 ctm-card"
                style={{ marginTop: "10px", paddingBottom: "10px" }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "350px",
                    background: " #4be0ef",
                    marginBottom: "20px",
                    borderRadius: "10px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    src="https://urban.hexagoninfosoft.in/asset/img/offline.gif"
                    alt="online / offline"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      objectFit: "contain",
                    }}
                  />
                </div>
                <h2 className="text-center">
                  {status === "active" || status === "riding"
                    ? ` You Are Online`
                    : " You Are Offline"}
                </h2>
                {/* Added H4 with pickup line */}
                <h4
                  className="text-center"
                  style={{ color: "#666", marginBottom: "15px" }}
                >
                  "Are you a map? Because I keep getting lost in your
                  coordinates!"
                </h4>
                <Button
                  className="w-full py-2"
                  onClick={Handleonclick}
                  style={{
                    backgroundColor:
                      status === "active" || status === "riding"
                        ? "#dc3545"
                        : "#3DBB5A",
                    color: "white",
                    border: "none",
                  }}
                >
                  {status === "active" || status === "riding"
                    ? "Go Offline"
                    : "Go Online"}
                </Button>
              </Card>
            </Col>
            <Col md={5} className="mb-4 d-flex justify-content-start">
              <Card
                className="p-2 shadow-lg rounded w-100 ctm-card"
                style={{ marginTop: "10px" }}
              >
                <Card.Body>
                  <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    center={userLocation}
                    zoom={14}
                    options={{
                      fullscreenControl: false,
                      streetViewControl: false,
                      mapTypeControl: false,
                      zoomControl: true,
                    }}
                  >
                    {/* <MarkerF
                      position={userLocation}
                      label={{
                        text: "You",
                        color: "black",
                        fontSize: "14px",
                        fontWeight: "bold",
                      }}
                     
                    /> */}
                    <MarkerF
                      position={userLocation} // Assuming userLocation is an object like { lat: 123, lng: 456 }
                  
                      icon={{
                        url: "https://cdn-icons-png.flaticon.com/128/741/741407.png",
  
                      }}
                    />
                  </GoogleMap>
                  {error && (
                    <p style={{ color: "red", textAlign: "center" }}>{error}</p>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </LoadScript>
    </MainCard>
  );
};

export default PartnerDashboard;
