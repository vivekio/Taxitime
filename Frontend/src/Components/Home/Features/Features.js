import React from "react";
import "./Feature.css";
import priceDollal from "../../../Picture/pricedollar.png";
import zero from "../../../Picture/zero.png";
import key from "../../../Picture/key.png";
import car from "../../../Picture/car.png";
import sheild from "../../../Picture/sheild.png";
// import Footer from "../../Footer/Footer";

const Features = () => {
  return (
    <>
    {/* <div className="feature-main"> */}
      {/* <div className="feature-con"> */}
      <div className="container mt-5 text-center my-5">
        <h1 className="feature-title">Our Features</h1>
        <p className="feature-description">
          We have recently ventured into outstation services. <br />
          We provide one way drop, round trip and multi city trip across India,
          over 1000 cities.
        </p>
      </div>
      <div className="container-fluid py-4 feature-bg">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6 col-sm-12 col-12">
              <div className="card d-flex justify-content-center py-3 border-0 bg-transparent">
                <img
                  src={priceDollal}
                  className="feature-card-img"
                  alt="price"
                />
                <div className="card-body">
                  <h5 className="card-title feature-card-title">
                    Price Transparency
                  </h5>
                  <p className="card-text feature-card-description">
                    We make all charges clear to you upfront.
                    <br /> No extra charges or hidden fees
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 col-12">
              <div className="card d-flex justify-content-center py-3 border-0 bg-transparent">
                <img
                  src={zero}
                  className="feature-card-img"
                  alt="cancellation"
                />
                <div className="card-body">
                  <h5 className="card-title feature-card-title">
                    Zero Cancellation
                  </h5>
                  <p className="card-text feature-card-description">
                    Enjoy zero cancellation benefit subject to Cab Bathinda
                    terms;
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 col-12">
              <div className="card d-flex justify-content-center py-3 border-0 bg-transparent">
                <img src={key} className="feature-card-img" alt="access" />
                <div className="card-body">
                  <h5 className="card-title feature-card-title">
                    Ease Of Access
                  </h5>
                  <p className="card-text feature-card-description">
                    On Double Cab models this ease of access is carried over to
                    the <br /> rear of the vehicle.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 col-12">
              <div className="card d-flex justify-content-center py-3 border-0 bg-transparent">
                <img src={car} className="feature-card-img" alt="travel" />
                <div className="card-body">
                  <h5 className="card-title feature-card-title">
                    One-way travel
                  </h5>
                  <p className="card-text feature-card-description">
                    Why pay for round-trip when all you <br /> want is a drop at
                    your destination
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 col-12">
              <div className="card d-flex justify-content-center py-3 border-0 bg-transparent">
                <img src={sheild} className="feature-card-img" alt="security" />
                <div className="card-body">
                  <h5 className="card-title feature-card-title">
                    Updates & Security
                  </h5>
                  <p className="card-text feature-card-description">
                    As Our Technology Enables Us To Focus <br /> On Both The
                    Drivers and Riders.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
     
    {/* </div> */}
    {/* <div><Footer/></div> */}
    </>
  );
};

export default Features;
