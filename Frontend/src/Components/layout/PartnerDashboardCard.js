import React from "react";
import { Card} from "react-bootstrap";

import TopNavbar from "../Headers/PartnerDashboardHeader/DashboardHeader.js";
import Footer from "../Footer/Footer.js";


const MainCard = ({children }) => (
  <>
    
      <TopNavbar />

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