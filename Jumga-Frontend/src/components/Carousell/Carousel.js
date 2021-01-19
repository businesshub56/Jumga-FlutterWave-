import React from "react";
import { Carousel } from "react-bootstrap/";
// import Carousel from "react-bootstrap/Carousel";

const HeroCarousel = () => {
  return (
    <div className="py-3" style={{ height: "70vh" }}>
      <Carousel fade controls={false}>
        <Carousel.Item interval={3000}>
          <img
            className="d-block w-100"
            src="https://res.cloudinary.com/undercover/image/upload/v1609585875/tenancy-hub/z66mbyl3jqrtlijddefx.jpg"
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item interval={4000}>
          <img
            className="d-block w-100"
            src="https://res.cloudinary.com/undercover/image/upload/v1609547445/tenancy-hub/qxs02im4na0pgcdukj4k.jpg"
            alt="Third slide"
          />
        </Carousel.Item>
        <Carousel.Item interval={4000}>
          <img
            className="d-block w-100"
            src="https://res.cloudinary.com/undercover/image/upload/v1609547443/tenancy-hub/kkbvsho5enp9xfdwsfxq.gif"
            alt="Third slide"
          />
        </Carousel.Item>
        <Carousel.Item interval={4000}>
          <img
            className="d-block w-100"
            src="https://res.cloudinary.com/undercover/image/upload/v1609547449/tenancy-hub/zxcqkr8vpobvydaavgdb.jpg"
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default HeroCarousel;
