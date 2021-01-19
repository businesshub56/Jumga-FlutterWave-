import React from "react";
import { Fragment } from "react";
import Footer from "../components/Footer/Footer";
import Hero from "../components/Hero/Hero";
import WhyTenancy from "../components/WhyTenancy/WhyTenancy";

const Homepage = () => {
  return (
    <Fragment>
      <section section-data="hero">
        <Hero />
      </section>
      <WhyTenancy />
      <Footer />
    </Fragment>
  );
};

export default Homepage;
