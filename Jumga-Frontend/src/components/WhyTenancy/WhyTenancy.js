import React from "react";
import "./Tenancy.css";
// import { benefits } from "../../data";
import Growth from "../../assessts/Growth.svg";
import Investor from "../../assessts/Investor.svg";
import PassiveIncome from "../../assessts/PassiveIncome.svg";
import commision from "../../assessts/commision.svg";

const benefits = [
  {
    icon: Growth,
    title: "Grow your Biz",
    info:
      "Growth your business with one of the largest websites in Nigeria. Sell to over 50 million buyer across nation",
  },
  {
    icon: Investor,
    title: "Manage it yourself",
    info:
      "You choose the price for your return policy, your delivery method on paid orders, and other important options.",
  },
  {
    icon: PassiveIncome,
    title: "Growth your Biz",
    info: "We provides support to increase your success and income.",
  },
  {
    icon: commision,
    title: "Almost free Commissions",
    info: "Commission fees are as low as 2.5%.",
  },
];

const WhyTenancy = () => {
  return (
    <section className="tenancy-section" section-data="why selling">
      <div className="container mt-5">
        <div className="section-title">
          <h4 className="p-2">
            Why Sell on{" "}
            <span style={{ color: "#ffb31a", fontSize: "30px" }}>J</span>umga ?
          </h4>
          <hr style={{ border: "2px solid #004182", width: "17%" }} />
        </div>
        <div className="row">
          {benefits.map((item, index) => (
            <div className="col-sm col-md col-lg-3 ma-2" key={index}>
              <div className="card cardShadow">
                <div className="icon">
                  <img src={item.icon} alt="icon" width="90px" />
                </div>
                <div className="title">
                  <h6>&lsaquo; {item.title} /&#x203A;</h6>
                </div>
                <div className="content-info">
                  <p>{item.info}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyTenancy;
