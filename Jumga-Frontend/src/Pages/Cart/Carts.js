import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
// import PayWithRave from "../../components/RaveGateway/PayWithRaveBtn";
import { cartItemsServices } from "../../Services/CartUtils";
import BackToShop from "../../components/CustomButton/CustomButton";
import {
  deleteItem,
  decreaseCart,
  addToCart,
} from "../../actions/productAction";
import "./carts.css";
import CartEmpty from "../Cart/cart-empty.svg";

const Carts = ({
  productState: { cart },
  user,
  deleteItem,
  decreaseCart,
  addToCart,
  history,
}) => {
  const [total, setTotal] = useState(0);
  // const [response, setResponse] = useState("");

  useEffect(() => {
    // console.log(user);
    let total;
    cart.reduce(
      (allQty, item) => (total = allQty + item.quantity * item.amount),
      0
    );
    // console.log(total);
    setTotal(total);
    localStorage.setItem("total", total);
    // eslint-disable-next-line
  }, [cart]);

  const onCheckout = () => {
    if (user === null) {
      history.push("/Login");
    } else {
      cartItemsServices(cart);
      // console.log("ready to checkout");
      setTimeout(() => {
        console.log("im callaed");
        history.push("/checkout");
      }, 2000);
    }
  };

  if (cart.length <= 0) {
    return (
      <div className="no-item">
        <div className="mt-2">
          <img src={CartEmpty} alt="empty-cart" width="250px" />
        </div>
        <p className="d-block">Your Cart is empty</p>
        <Link
          to="/"
          className="p-3 no-itembtn bg-info text-white"
          style={{
            border: "1px solid",
            color: "#ffffff",
            textDecoration: "none",
          }}
        >
          &#8656; Back to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="container mt-lg-5">
      {" "}
      <Table hover borderless responsive>
        <thead>
          <tr>
            <th>Items</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Amount</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((t, index) => (
            <tr key={index}>
              <td>
                <img
                  src={t.imageUrl}
                  className="img-fluid"
                  alt="item"
                  width="100px"
                />
              </td>
              <td>{t.name}</td>
              <td>
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
              </td>
              <td>&#8358; {t.amount * t.quantity}</td>
              <td onClick={() => deleteItem(t)}>
                <i
                  className="fas fa-trash fa-lg p-2"
                  style={{ color: "black" }}
                ></i>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <h4 className="text-right p-2">
        {" "}
        TOTAL : &#8358;
        {total.toFixed(2)}{" "}
        {/* {localStorage.getItem("total") ? localStorage.getItem("total") : 0}{" "} */}
      </h4>
      <div className="row mt-4 mb-5 ">
        <div className="p-3 m-auto text-white ">
          <BackToShop
            type="button"
            onClick={() => {
              history.push("/");
            }}
          >
            Continue Shopping
          </BackToShop>
        </div>
        <div className="p-3 m-auto text-white ">
          <BackToShop type="button" onClick={onCheckout}>
            Proceed to Checkout
          </BackToShop>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  productState: state.product,
  user: state.Auth.user,
});
export default withRouter(
  connect(mapStateToProps, {
    deleteItem,
    decreaseCart,
    addToCart,
  })(Carts)
);
