import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import AddFormProduct from "../AddProductForm/AddFormProduct";
import "./Merchant.css";
import Notification from "./Notification/Notification";
import axios from "axios";
import util from "../../utils/util";
import setAuthToken from "../../utils/SetAuthToken";
import CreateShop from "../CreateShop/CreateShop";
// import { connect } from "react-redux";
// import { loadUser } from "../../actions/AuthAction";

const MerchantDashboard = (props) => {
  const activeStyle = {
    // background: "rgba(140, 145, 150, 1)",
  };

  useEffect(() => {
    // loadUser();

    const ref = async () => {
      if (localStorage.token) {
        setAuthToken(localStorage.token);
      }
      try {
        const res = await axios.get(`${util}merchant/my-info`);
        setUserDetails({ ...res.data });
        console.log(res.data);
        localStorage.setItem("email", res.data.user["email"]);
        if (res.data.accountNumber === null) {
          props.history.push("/verify-merchant");
        } else if (!res.data.tokenPaid && res.data.accountNumber !== null) {
          props.history.push("/registration-fee");
        }
      } catch (err) {
        console.log(err);
      }
    };
    ref();
    // eslint - disable - next - line;
  }, [props.history]);

  const [sidebar, setSidebar] = useState("true");
  const [user, setUserDetails] = useState({});
  const [veiw, setVeiw] = useState("false");

  const toggleSideBar = () => {
    setVeiw(!veiw);
  };
  const toggleSide = () => {
    setSidebar(!sidebar);
  };
  return (
    <div className="wrapper">
      <div className={`${sidebar ? "sidebar" : "sidebar-show"} `}>
        <span onClick={toggleSide} className="closebtn">
          ☰
        </span>
        <NavLink to="/admin" activeStyle={activeStyle}>
          <span className="fas fa-home">{""}</span> Home{" "}
        </NavLink>
        <NavLink to="/admin" onClick={toggleSideBar} activeStyle={activeStyle}>
          <span className="fas fa-envelope">{""}</span> Notification{" "}
        </NavLink>
        <NavLink to="/admin" onClick={toggleSideBar} activeStyle={activeStyle}>
          <span className="fas fa-plus-square">{""}</span> Products{" "}
        </NavLink>
        <NavLink to="/admin" activeStyle={activeStyle}>
          <span className="fas fa-inbox">{""}</span> Orders{" "}
        </NavLink>
        <NavLink to="/admin" activeStyle={activeStyle}>
          <span className="fas fa-user">{""}</span> Customers{" "}
        </NavLink>
        <NavLink to="/admin" activeStyle={activeStyle}>
          <span className="fas fa-store">{""}</span> Create Shop{" "}
        </NavLink>
        <NavLink to="/shop" activeStyle={activeStyle}>
          <span className="fas fa-store">{""}</span> Online-Store{" "}
        </NavLink>
        <NavLink to="/admin" activeStyle={activeStyle}>
          <span className="fas fa-user-cog">{""}</span> Setting{" "}
        </NavLink>
      </div>

      <div id="main" className={`${sidebar ? "main" : "main-full"} `}>
        <p className="openbtn">Welcome back, {user.accountNumber}</p>

        <div className="container">
          {veiw && (
            <div>
              <AddFormProduct />
            </div>
          )}
          {veiw && (
            <div>
              <Notification />
            </div>
          )}
          {veiw && (
            <div>
              <CreateShop />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
// const mapStateToProps = (state) => ({
//   tokenPaid: state.Auth.user.tokenPaid,
//   accountNumber: state.Auth.user.accountNumber,
// });

export default MerchantDashboard;
// export default connect(mapStateToProps, { loadUser })(MerchantDashboard);
