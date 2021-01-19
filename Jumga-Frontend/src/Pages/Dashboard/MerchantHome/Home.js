import React from "react";
import { Progress } from "antd";
import "./Home.css";

const Home = () => {
  return (
    <div className="container mt-4">
      <div className=" row row-container">
        <div className="col-sm-3  ">
          <div className="d-flex justify-content-around align-items-center p-2 daily">
            <div>
              {" "}
              <small className="d-block">Daily Transaction Volume</small>
              <h6>0</h6>
            </div>
          </div>
        </div>
        <div className="col-sm-3">
          <div className="d-flex justify-content-around align-items-center p-2 daily">
            <div>
              {" "}
              <small className="d-block ">Daily Transaction value</small>
              <h6>&#8358;0.00</h6>
            </div>
          </div>
        </div>
        <div className="col-sm-3">
          <div className=" d-flex justify-content-around align-items-center p-2 total">
            <div>
              {" "}
              <small className="d-block">Total Transaction value</small>
              <h6>0</h6>
            </div>
          </div>
        </div>
        <div className="col-sm-3">
          <div className=" d-flex justify-content-around align-items-center p-2 total">
            <div>
              <small className="d-block">Total Transaction Volume</small>
              <h6>&#8358;0.00</h6>
            </div>
          </div>
        </div>
      </div>
      <div className="row bg-white mt-4 row-container">
        {/* <div className=""> */}
        <div className="col-lg-5 col-sm col-md-4">
          <h6>Orders</h6>
          <Progress
            percent={100}
            success={{ percent: 80 }}
            strokeColor="#FDC203"
          />
          <p>
            Pending Orders: <span className=" text-warning"> 20</span>{" "}
          </p>
          <p>
            Reconcilled Orders: <span className=" text-success"> 80</span>
          </p>
          <p>
            Total Orders: <span className="text-primary">100</span>
          </p>
        </div>
        {/* <hr /> */}
        <div className="col-lg-5 col-sm col-md-4 mt-1">
          <h6>Payments</h6>
          <Progress
            percent={100}
            success={{ percent: 80 }}
            strokeColor="#FDC203"
          />
          <p>
            Pending Payment: <span className=" text-warning"> 20</span>{" "}
          </p>
          <p>
            Reconcilled Payment: <span className=" text-success"> 80</span>
          </p>
          <p>
            Total Payments: <span className="text-primary">100</span>
          </p>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};

export default Home;
