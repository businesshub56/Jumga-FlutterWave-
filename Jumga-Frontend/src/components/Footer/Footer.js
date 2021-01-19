import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <div className="">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-3 col-sm">
            <h4>About</h4>
            <h6 className="p-2">
              Tenancy hub is an online global platform that connects customer
              and buyers with convenience. We aim to bring back fun and easy of
              doing business. Sell at any time, any place at your own pace!
            </h6>
            <ul className="d-flex">
              <li className="p-2">
                <i className="fab fa-facebook fa-2x"></i>
              </li>
              <li className="p-2">
                <i className="fab fa-linkedin fa-2x"></i>
              </li>
              <li className="p-2">
                <i className="fab fa-instagram fa-2x"></i>
              </li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-3 col-sm">
            {/* <div className="foot-courses-list"> */}
            <h4>Contact</h4>
            <div>
              <div>
                <h6 className="contLink">
                  {" "}
                  <a
                    href="mailto:yusufsaheedtaiwo@gmail.com"
                    style={{ color: "black" }}
                  >
                    <i className="fas fa-phone" /> yusufsaheedtaiwo@gmail.com
                  </a>
                </h6>

                <h6 className="contLink">
                  {" "}
                  <a
                    href="mailto:writeshittu@gmai.com"
                    style={{ color: "black" }}
                  >
                    <i className="fas fa-tools" /> For support
                  </a>
                </h6>
                <h6 className="contLink">
                  <a
                    href="mailto:yusufsaheedtaiwo@gmail.com"
                    style={{ color: "black" }}
                  >
                    <i className="fas fa-info" /> Inquiries
                  </a>
                </h6>
                <h6 className="contLink">
                  <a href="mailto:yusufsaheedtaiwo@gmail.com">
                    <i className="fas fa-book" /> careers@tenancyhub.co
                  </a>
                </h6>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm">
            <div className="foot-courses-list">
              <h4>Quick Links</h4>
              <ul>
                <li>
                  <h6>About Us</h6>
                </li>
                <li>
                  <h6>Meet the Team</h6>
                </li>
                <li>
                  <h6>Plans</h6>
                </li>
                <li>
                  <h6>Contact Us</h6>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
