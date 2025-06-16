import React from "react";
import { Card} from "react-bootstrap";

import TopNavbar from "../Headers/UserDashboardHeader/DashboardHeader.js";
import Footer from "../Footer/Footer.js";

const MainCard = ({children }) => (
  <>
    <div>
      <TopNavbar />
    </div>
    <div>
      <Card>
      <Card.Body >
       {children}
      </Card.Body>
      </Card>
    </div>
    <div>
      <Footer/>
    </div>
  </>
);

export default MainCard;
