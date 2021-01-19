import React from "react";
import GetStarted from "../CustomButton/CustomButton";
import HeroCarousel from "../Carousell/Carousel";
import "./Hero.css";
import { useHistory } from "react-router-dom";
const Hero = () => {
  const history = useHistory();
  return (
    <div className="container-fluid hero-container">
      <div className="row">
        <div className="col-sm col-md-6 col-lg-6 hero-content ">
          <div className="hero-text">
            <h2>
              Need an online platform to build and grow your business? — Pitch
              your tent with{" "}
              <span style={{ color: "#ffb31a", fontSize: "30px" }}>J</span>umga
              for best experience.
            </h2>
            <div className="mt-4">
              <GetStarted
                onClick={() => {
                  history.push(`/register`);
                }}
                type="button"
                style={{ borderRadius: "25px" }}
              >
                Get Started
              </GetStarted>
            </div>
          </div>
        </div>
        <div className="col-sm col-md-6 col-lg-6 order-sm-first">
          <HeroCarousel />
        </div>
      </div>
    </div>
  );
};

export default Hero;
