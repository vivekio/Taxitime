import React from "react";
import MainSection from "./MainSecion/MainSection.js";
import Service from "./Service/Service.js";
import WhoSection from "./WhoSection/WhoSection.js";
import Features from "./Features/Features.js";
import MainHeader from '../Headers/MainHeader/MainHeader.js';
import Footer from "../Footer/Footer.js";

const Home = () => {
  document.title = "TaxTime";
  return (
    <>
      <title>TaxTime</title>
      {/* <TopHeader /> */}
      <MainHeader />
      <MainSection />
      <Service />
      <WhoSection />
      <Features />
      <Footer />
    </>
  );
};

export default Home;
