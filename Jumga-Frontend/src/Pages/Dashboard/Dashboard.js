import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AddFormProduct from "../AddProductForm/AddFormProduct";
import CreateShop from "../CreateShop/CreateShop";
import Notification from "./Notification/Notification";
import Home from "./MerchantHome/Home";
import MerchantShop from "../../Pages/Merchant-Stores/MerchantShop";
import OrderedItems from "./OrdersDisplay/OrderedItems";
import { NavLink } from "react-router-dom";
import "./Merchant.css";
import axios from "axios";
import util from "../../utils/util";
import setAuthToken from "../../utils/SetAuthToken";

const MerchantDashboard = (props) => {
  // const [store, setStorename] = useState("alabama2a");

  const routes = [
    {
      path: "/admin",
      exact: true,
      sidebar: () => <div>home!</div>,
      main: () => <Home />,
    },

    {
      path: "/admin/notification",
      sidebar: () => <div>Notification</div>,
      main: () => <Notification />,
    },
    {
      path: "/admin/add-product",
      sidebar: () => <div>Product</div>,
      main: () => <AddFormProduct />,
    },
    {
      path: "/admin/order",
      sidebar: () => <div>Order</div>,
      main: () => <OrderedItems />,
    },
    {
      path: "/admin/create-shop",
      sidebar: () => <div>Create Shop</div>,
      main: () => <CreateShop shopAvailable={user.shops} />,
    },
    {
      path: "/admin/selectshop",
      sidebar: () => <div>Online-shop</div>,
      // main: () => <Products stores={user.shops} />,
      main: () => <MerchantShop label="Oniline-shop" />,
    },
    {
      path: "/admin/settings",
      sidebar: () => <div>Setting</div>,
      main: () => <h2>Setting</h2>,
    },
  ];

  const activeStyle = {
    background: "rgba(140, 145, 150, 1)",
  };

  useEffect(() => {
    // loadUser();
    if (!localStorage.token) {
      props.history.push("/login");
    }
    const ref = async () => {
      if (localStorage.token) {
        setAuthToken(localStorage.token);
      }
      try {
        const res = await axios.get(`${util}merchant/my-info`);
        setUserDetails(res.data);
        setuserInfo(res.data.user);
        // setStorename(res.data.storeName);
        // console.log(res.data);
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
  const [userInfo, setuserInfo] = useState("true");
  const [user, setUserDetails] = useState({});
  const [veiw, setVeiw] = useState("false");

  const toggleSideBar = () => {
    setVeiw(!veiw);
  };
  const toggleSide = () => {
    setSidebar(!sidebar);
  };
  return (
    <Router>
      <div className="wrapper">
        {/* <div className=""> */}
        <div className="sidebar ">
          <span onClick={toggleSide} className="closebtn">
            ☰
          </span>
          <NavLink to="/admin" activeStyle={activeStyle}>
            <span className="fas fa-home">{""}</span> Home{" "}
          </NavLink>

          <NavLink
            to="/admin/add-product"
            onClick={toggleSideBar}
            activeStyle={activeStyle}
          >
            <span className="fas fa-plus-square">{""}</span> Products{" "}
          </NavLink>
          <NavLink to="/admin/order" activeStyle={activeStyle}>
            <span className="fas fa-inbox">{""}</span> Orders{" "}
          </NavLink>

          <NavLink to="/admin/create-shop" activeStyle={activeStyle}>
            <span className="fas fa-store">{""}</span> Create Shop{" "}
          </NavLink>
          <NavLink to="/admin/selectshop" activeStyle={activeStyle}>
            <span className="fas fa-store">{""}</span>{" "}
            <MerchantShop label="Oniline-shop" />{" "}
          </NavLink>
        </div>

        <div id="main" className="">
          <p className="openbtn">Welcome back, {userInfo.firstName}</p>
          <Switch>
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                children={<route.main />}
              />
            ))}
          </Switch>
        </div>
      </div>
      {/* </div> */}
    </Router>
  );
};
export default MerchantDashboard;
