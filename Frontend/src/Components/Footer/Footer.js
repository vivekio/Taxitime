import React from "react";
import facebook from "../../Picture/fb.png";
import wrong from "../../Picture/cross.png";
import instagram from "../../Picture/insta.png";
import linkedin from "../../Picture/link.png";
import contact from "../../Picture/contact.png";
import mail from "../../Picture/mail.png";
import phone from "../../Picture/phone.png";
import web from "../../Picture/web.png";
import visa from "../../Picture/visa.png";
import mastercard from "../../Picture/mastercard.png";
import paypal from "../../Picture/paypal.png";
import discover from "../../Picture/discover.png";
import jcb from "../../Picture/jcb.png";
import "./Footer.css";

const Footer = () => {
  return (
    <>
    {/* <div className="footer-main"> */}
      <div className="container-fluid footer-bg">
        <div className="container py-3">
          <div className="row">
            <div className="col-lg-4 col-md-12 col-sm-12 col-12 footer-center">
              <h1 className="footer-title">About TaxiTime</h1>
              <p className="about">
                Search for will uncover many web sites variables onto of
                passages of lorem ipsum available but the majority the words all
                predefined humour to met chunks recently with desktop.
              </p>
              <a href="#">
                <img src={facebook} className="icon" alt="facebook" />
              </a>
              <a href="#">
                <img src={wrong} className="icon" alt="twitter" />
              </a>
              <a href="#">
                <img src={instagram} className="icon" alt="instagram" />
              </a>
              <a href="#">
                <img src={linkedin} className="icon" alt="linkedin" />
              </a>
            </div>
            <div className="col-lg-4 col-md-12 col-sm-12 col-12 footer-center footer-explore">
              <h1 className="footer-title">Explore Links</h1>
              <p>Contact Us</p>
              <p>Privacy Policy</p>
              <p>Terms & Condition</p>
            </div>
            <div className="col-lg-4 col-md-12 col-sm-10 col-10 footer-center">
              <h1 className="footer-title">Contact Info</h1>
              <div className="contact_info">
                <img src={contact} className="social_media" alt="address" />
                <a href="#">
                  <span>10A, PrimeCab, San Andreno, United States.</span>
                </a>
              </div>
              <div className="contact_info">
                <img src={mail} className="social_media" alt="mail" />
                <a href="#">
                  <span>Contact@taxitime.com</span>
                </a>
              </div>
              <div className="contact_info">
                <img src={phone} className="social_media" alt="phone" />
                <a href="#">
                  <span>98989890</span>
                </a>
              </div>
              <div className="contact_info">
                <img src={web} className="social_media" alt="web" />
                <a href="#">
                  <span>https://taxi.hexagoninfosoft.in/</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid bottomfooter-bg">
        <div className="container pt-4">
          <div className="row">
            <div className="col-lg-4 col-md-12 col-sm-12 col-12">
              <p className="copyright">Copyright 2019 TaxiTime</p>
            </div>
            <div className="col-lg-4 col-md-12 col-sm-12 col-12"></div>
            <div className="col-lg-4 col-md-12 col-sm-12 col-12">
              <div className="copyright_icon">
                <a href="#">
                  <img src={visa} className="icon1" alt="visa" />
                </a>
                <a href="#">
                  <img src={mastercard} className="icon1" alt="mastercard" />
                </a>
                <a href="#">
                  <img src={paypal} className="icon1" alt="paypal" />
                </a>
                <a href="#">
                  <img src={discover} className="icon1" alt="discover" />
                </a>
                <a href="#">
                  <img src={jcb} className="icon1" alt="jcb" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default Footer;
