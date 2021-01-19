import React, { useState, useEffect } from "react";
import FormInput from "../../components/Form-input/form-input.component";
import PayWithRaveBtn from "../../components/RaveGateway/PayWithRaveBtn";
import { Table } from "react-bootstrap";
import SubmitAddress from "../../components/CustomButton/CustomButton";
import {
  getCartItemsOnCheckout,
  getPaymentRefOnCheckout,
  checkoutPaymentUpdate,
} from "../../Services/CheckoutUtils";
import { deleteCartItem } from "../../Services/CartUtils";
import "./Checkout.css";

const Checkout = (props) => {
  const [itemsInCart, setItemsInCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deliveryInfo, setdeliveryInfo] = useState({});
  const [payConfig, setpayConfig] = useState({});
  const [errors, setError] = useState({});
  // const [total, setTotal] = useState("0");

  const validateForm = () => {
    let errors = {};
    let formIsValid = true;

    if (!deliveryInfo.fullName) {
      formIsValid = false;
      errors["fullName"] = "Please input a name";
    }
    if (!deliveryInfo.address || deliveryInfo.address.length <= 9) {
      formIsValid = false;
      errors["address"] = "Provide detailed delivery address";
    }
    if (!deliveryInfo.email) {
      formIsValid = false;
      errors["email"] = "Email field is empty";
    }
    if (!deliveryInfo.state) {
      formIsValid = false;
      errors["state"] = "*state";
    }
    setError(errors);
    return formIsValid;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(!loading);
      getPaymentRefOnCheckout(setpayConfig, deliveryInfo.address);
    }
    console.log("see mrere");
  };

  const onChanges = (e) => {
    setdeliveryInfo({
      ...deliveryInfo,
      [e.target.name]: e.target.value,
    });
  };

  const onSuccess = () => {
    checkoutPaymentUpdate(payConfig.checkoutId);
    setTimeout(() => {
      props.history.push("/");
    }, 1500);
  };
  const onClose = () => {
    console.log("payment closed");
  };

  const deleteItem = (item, id) => {
    const cartItem = itemsInCart.filter((cart) => cart.id !== item.id);
    setItemsInCart(cartItem);
    deleteCartItem(item, id);
  };

  useEffect(() => {
    getCartItemsOnCheckout(setItemsInCart);
    // console.log(itemsInCart);
    // const amountToPay = itemsInCart.reduce(
    //   (allQty, item) => allQty + item.product["amount"] * item.quantity,
    //   0
    // );
    // setTotal(amountToPay);
    if (itemsInCart.lenght > 0) {
      setLoading(!loading);
    }
    // eslint-disable-next-line
  }, []);
  return (
    <div className="container">
      <div className="row p-5">
        <div className="col-lg-6 col-sm col-md">
          <form onSubmit={onSubmit}>
            <div className="col- lg-3 col-sm col-md">
              <h4>Please provide delivery details</h4>

              <div>
                <label htmlFor="Name">
                  <i className="fas fa-user" /> Full Name
                </label>
                <span
                  className="d-block"
                  style={{ color: "#dd2b0e", fontSize: "0.875rem" }}
                >
                  {errors["fullName"]}
                </span>
                <FormInput
                  type="text"
                  name="fullName"
                  onChange={onChanges}
                  placeholder=" John Doe..."
                />
              </div>
            </div>
            <div className="col- lg-3 col-sm col-md">
              <div>
                <label htmlFor="Email">
                  <i className="fas fa-envelope" /> Email
                </label>
                <span
                  className="d-block"
                  style={{ color: "#dd2b0e", fontSize: "0.875rem" }}
                >
                  {errors["email"]}
                </span>
                <FormInput
                  type="email"
                  name="email"
                  onChange={onChanges}
                  placeholder="doe@example.com..."
                />
              </div>
            </div>
            <div className="col- lg-3 col-sm col-md">
              <div>
                <label htmlFor="address">
                  <i className="fas fa-address-card" /> Address
                </label>
                <span
                  className="d-block"
                  style={{ color: "#dd2b0e", fontSize: "0.875rem" }}
                >
                  {errors["address"]}
                </span>
                <FormInput
                  type="text"
                  name="address"
                  onChange={onChanges}
                  placeholder="14 Apena..."
                />
              </div>
            </div>
            <div className="col- lg-3 col-sm col-md">
              <div>
                <label htmlFor="state">
                  <i className="fas fa-address-card" /> State
                </label>
                <span
                  className="d-block"
                  style={{ color: "#dd2b0e", fontSize: "0.875rem" }}
                >
                  {errors["state"]}
                </span>
                <FormInput
                  type="text"
                  name="state"
                  onChange={onChanges}
                  placeholder="Bornu state..."
                />
              </div>
            </div>
            <div className="col- lg-3 col-sm col-md">
              <SubmitAddress type="submit">Set info</SubmitAddress>
            </div>
          </form>
        </div>

        <div className="mt-5 col-lg-6 col-sm col-md">
          <div className="cart-container">
            <h4>
              Cart{" "}
              <span style={{ color: "black", float: "right" }}>
                <i className="fa fa-shopping-cart"></i>{" "}
                <b>{itemsInCart.length}</b>
              </span>
            </h4>

            <Table hover borderless responsive>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Amount</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {itemsInCart !== null &&
                  itemsInCart.length > 0 &&
                  itemsInCart.map((item, index) => (
                    <tr key={index}>
                      <td>{item.product["name"]}</td>
                      {/* <td>
                {" "}
                <span onClick={() => decreaseCart(t)} className="pointer">
                  {" "}
                  &#10094;{" "}
                </span>
                {t.quantity}{" "}
                <span onClick={() => addToCart(t)} className="pointer">
                  {" "}
                  &#10095;
                </span>
              </td> */}
                      <td>&#8358;{item.product["amount"] * item.quantity}</td>
                      <td onClick={() => deleteItem(item, item.id)}>
                        <i
                          className="fas fa-trash fa-lg p-2"
                          style={{ color: "black" }}
                        ></i>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
          {loading && (
            <div className="mt-3 text-center" style={{ width: "100%" }}>
              <PayWithRaveBtn
                tx_ref={payConfig.transactionReference}
                currency={payConfig.currency}
                amount={payConfig.totalAmount}
                name={deliveryInfo.fullName}
                redirect_url="/"
                // phoneNumber={details.phoneNumber}
                // lastname={details.lastName}
                email={deliveryInfo.email}
                // email={localStorage.email}
                callback={onSuccess}
                onClose={onClose}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
