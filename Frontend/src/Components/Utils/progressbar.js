import React from "react";
import { Row, Col, Button, ProgressBar } from "react-bootstrap"; 

const rideStages = [
  "SEARCHING",
  "ACCEPTED",
  "STARTED",
  "PICKEDUP",
  "DROPPED",
  "COMPLETED",
];
// if add this "ARRIVED",
const RideProgressBar = ({ ride }) => {
  const currentIndex = rideStages.indexOf(ride.status);

  return (
    <div className="container">
  
   

      {/* Progress Bar Row */}
      <Row className="justify-content-center">
        <Col xs={12} md={10} lg={8} className="text-center">
          <div className="d-flex justify-content-between align-items-center flex-wrap">
            {rideStages.map((stage, index) => (
              <div key={index} className="text-center position-relative stage">
                {/* Circle Indicator */}
                <div
                  className={`circle ${
                    index <= currentIndex ? "active" : "inactive"
                  }`}
                ></div>
                <p
                  className={`status-text ${
                    index <= currentIndex ? "text-success fw-bold" : "text-muted"
                  }`}
                >
                  {stage}
                </p>
                {/* Connecting Line */}
                {index < rideStages.length - 1 && (
                  <div className={`line ${index < currentIndex ? "filled" : ""}`} />
                )}
              </div>
            ))}
          </div>
          {/* Progress Bar for Mobile View */}
          <ProgressBar
            now={(currentIndex / (rideStages.length - 1)) * 100}
            className="mt-3 d-md-none"
          />
        </Col>
      </Row>
    </div>
  );
};

// Custom Styles
const styles = `
  .stage {
    flex: 1;
    min-width: 60px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .circle {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    display: inline-block;
    margin-bottom: 4px;
    z-index: 2;
  }
  .active {
    background-color: green;
  }
  .inactive {
    background-color: lightgray;
  }
  .status-text {
    font-size: 12px;
    margin-top: 4px;
  }
  .line {
    position: absolute;
    top: 6px;
    left: 50%;
    width: 100%;
    height: 2px;
    background-color: lightgray;
    z-index: 1;
  }
  .filled {
    background-color: green;
  }
  @media (max-width: 768px) {
    .progress-container {
              flex-wrap: wrap;
              justify-content: center;
            }
            .progress-stage {
              flex: 0 0 33%;
              min-width: 80px;
            }
            .progress-text {
              font-size: 10px;
            }
  }
`;

const StyleInjector = () => <style>{styles}</style>;

// Main Component
const RideStatus = ({ ride }) => (
  <>
    <StyleInjector />
    <RideProgressBar ride={ride} />
  </>
);

export default RideStatus;
