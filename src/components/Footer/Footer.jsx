import React from "react";
import "./Footer.css";
import site from '../../assets/images/site-logo.svg'

const Footer = () => {
  return (
    <div className="footer">
      <img src={site} style={{ width: "400px", height: "auto", margin: "15px", }} />
      <h4> ©Tatvasoft Copyright@2023</h4>
    </div>
  );
};

export default Footer;
