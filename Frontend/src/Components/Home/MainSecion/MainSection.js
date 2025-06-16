import React from "react";
import search from "../../../Picture/search.png";
import { useNavigate } from "react-router-dom";
import "./MainSection.css";
//datetime-local
const MainSection = () => {
  const navigate = useNavigate()
  return (
    <div className="container-fluid bg-fluid section-fluid">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-12 co-sm-12 col-12 section-bg-car p-3 text-center">
            <p className="main-section-text">
              More recently <br />
              with desktop publishing software including versions
            </p>
            <h1 className="main-section-title">Upto 25% off</h1>
            <p className="main-section-text-2">on first booking</p>
            <h1 className="main-section-title-app">through your app</h1>
            <button onClick={() => {navigate("/user/login")}} className="btn btn-dark me-4 button-section rounded-0 btn-user">
              USER APP
            </button>
            <button onClick={() => {navigate("/partner/login")}} className="btn btn-light btn-outline-dark button-section rounded-0">
              PARTNER APP
            </button>
          </div>
          <div className="col-lg-6 col-md-12 co-sm-12 col-12 text-center position-relative">
            <div className="main-section-bg position-absolute pt-4">
              <input
                type="text"
                placeholder="Pickup Locations"
                className="input-section my-3"
              />
              <button className="input-button">
                <img src={search} alt="search" />
              </button>
              <input
                type="text"
                placeholder="Drop Locations"
                className="input-section my-3"
              />
              <button className="input-button">
                <img src={search} alt="search" />
              </button>
              <div>
                <button className="section-submit my-4">Search Cabs→</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainSection;
