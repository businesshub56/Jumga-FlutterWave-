import React, { Fragment } from "react";
import NavBar from "./components/NavBar/NavigationBar";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Login from "./Pages/Login-Modal/Login";
import SignUp from "./Pages/SignUp/SignUp";
import Homepage from "./Pages/Homepage";
// import MerchantDashboard from "./Pages/Dashboard/Merchant-Dashboard";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";

import { store, persistor } from "./Store";

import ErrorPage from "./Pages/ErrorPage/ErrorPage";
import Products from "./Pages/Products";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import PrivateRoute from "./components/routing/PrivateRoute";
import AddFormProduct from "./Pages/AddProductForm/AddFormProduct";
import Carts from "./Pages/Cart/Carts";
import VerifyMercchant from "./Pages/VerifyAccount/Verify-Merchant";
import PayWithRaveBtn from "./components/RaveGateway/PayWithRaveBtn";
import setAuthToken from "./utils/SetAuthToken";
import PaymentPage from "./Pages/PaymentPage/PaymentPage";
import CreateShop from "./Pages/CreateShop/CreateShop";
import MerchantDashboard from "./Pages/Dashboard/Dashboard";
import MerchantShop from "./Pages/Merchant-Stores/MerchantShop";
import Checkout from "./Pages/Checkout/Checkout";
import RegisterCustomer from "./Pages/Customer-Register/RegisterCustomer";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Fragment>
          <NavBar />

          <Switch>
            <Route exact path="/" component={Products} />
            <Route path="/Login" component={Login} />
            <Route path="/admin" component={MerchantDashboard} />
            <Route path="/online-store/:storeName" component={Products} />
            <Route path="/merchant-corner" component={Homepage} />
            <Route path="/cart" component={Carts} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/selectshop" component={MerchantShop} />
            <Route path="/registration-fee" component={PaymentPage} />
            <Route path="/payment" component={PayWithRaveBtn} />
            <Route path="/verify-merchant" component={VerifyMercchant} />
            <Route path="/add-product" component={AddFormProduct} />
            <Route path="/create-shop" component={CreateShop} />
            {/* <Route path="/admin" component={MerchantDashboard} /> */}
            <Route path="/register" component={SignUp} />
            <Route path="/register-customer" component={RegisterCustomer} />
            <Route component={ErrorPage} />
          </Switch>
          <ToastContainer />
        </Fragment>
      </PersistGate>
    </Provider>
  );
};

export default App;
