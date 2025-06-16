import React from "react";
import "./WhoSection.css";
import picture from "../../../Picture/picture.png";

const WhoSection = () => {
  return (
    <div className="container my-4">
      <div className="row" style={{
    display: "flex",
    alignItems: "end"}}>
        <div className="col-lg-6 col-md-12 col-sm-12 col-12">
          <h1 className="who-title">Who We Are</h1>
          <p className="who-description">
            Lorem Ipsum passages, and more recently with desktop publishing
            software like aldus pageMaker including versions of all the Lorem
            Ipsum generators on thet Internet tends to repeat predefined chunks
            as necessary, making this an web evolved over the years, sometimes
            by accident.
          </p>
          <div className="who-count d-flex">
            <div className="who-count-parent">
              <h2 className="who-child-title">99%</h2>
              <p className="who-child-description">Happy Customers</p>
            </div>
            <div className="who-line"></div>
            <div className="who-count-parent">
              <h2 className="who-child-title">5+</h2>
              <p className="who-child-description">Services</p>
            </div>
            <div className="who-line"></div>
            <div className="who-count-parent">
              <h2 className="who-child-title">1000+</h2>
              <p className="who-child-description">Request Done</p>
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-md-12 col-sm-12 col-12">
          <img src={picture} className="who-img" alt="whoweare" />
        </div>
      </div>
    </div>
  );
};

export default WhoSection;
