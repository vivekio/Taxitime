import React from "react";
import "./Service.css";
import price from "../../../Picture/price.png";
import tele from "../../../Picture/tele.png";
import pickup from "../../../Picture/pickup.png";
import texi from "../../../Picture/taxi.png";

const Service = () => {
  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-lg-3 col-md-6 col-sm-12 col-12 p-2">
          <div
            className="card d-flex justify-content-center py-3"
            style={{ height: "235px" }}
          >
            <img src={price} className="service-card-img mx-auto" alt="price" />
            <div className="card-body text-center">
              <h5 className="card-title service-card-title">
                Best Price Guaranteed
              </h5>
              <p className="card-text service-card-description">
                A more recently with desktop softy like aldus page maker.
              </p>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 col-sm-12 col-12 p-2">
          <div
            className="card d-flex justify-content-center py-3"
            style={{ height: "235px" }}
          >
            <img
              src={tele}
              className="service-card-img mx-auto"
              alt="customer"
            />
            <div className="card-body text-center">
              <h5 className="card-title service-card-title">
                24/7 Customer Care
              </h5>
              <p className="card-text service-card-description">
                A more recently with desktop softy like aldus page maker.
              </p>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 col-sm-12 col-12 p-2">
          <div
            className="card d-flex justify-content-center py-3"
            style={{ height: "235px" }}
          >
            <img
              src={pickup}
              className="service-card-img mx-auto"
              alt="pickup"
            />
            <div className="card-body text-center">
              <h5 className="card-title service-card-title">Home Pickups</h5>
              <p className="card-text service-card-description">
                A more recently with desktop softy like aldus page maker.
              </p>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 col-sm-12 col-12 p-2">
          <div
            className="card d-flex justify-content-center py-3"
            style={{ height: "235px" }}
          >
            <img
              src={texi}
              className="service-card-img mx-auto"
              alt="booking"
            />
            <div className="card-body text-center">
              <h5 className="card-title service-card-title">Easy Bookings</h5>
              <p className="card-text service-card-description">
                A more recently with desktop softy like aldus page maker.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;
