import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Skeleton } from "antd";
import ProductCard from "../components/Productcard/ProductCard";
import { connect } from "react-redux";
import { addToCart, getItems, getProducts } from "../actions/productAction";
import { BackTop } from "antd";
import "antd/dist/antd.css";

const Products = ({
  product: { items, loading },
  match,
  addToCart,
  getItems,
  getProducts,
}) => {
  const [currencyId, setCurrencyId] = useState("1");
  const notify = () =>
    toast.success("Added to cart !", {
      position: "top-right",
      autoClose: 2000,
    });

  const onClickToCart = (item) => {
    addToCart(item);
    notify();
  };
  const {
    params: { storeName },
  } = match;

  useEffect(() => {
    if (localStorage.token && localStorage.userType === "MERCHANT") {
      getItems(storeName);
    } else {
      setCurrencyId(localStorage.currencyId);
      localStorage.setItem("currencyId", currencyId);
      getProducts(currencyId);
    }

    //eslint-disable-next-line
  }, []);

  if (items !== null && loading) {
    return (
      <div className="container">
        <Skeleton active />
        <br />
        <Skeleton active />
      </div>
    );
  }

  return (
    <>
      {items.length > 0 ? (
        <div
          className="container-fluid offset-1 mt-5"
          style={{ marginBottom: "100px" }}
        >
          <div className="row">
            {items.map((item) => (
              <ProductCard
                key={item.id}
                item={item}
                onClickToCart={onClickToCart}
              />
            ))}
          </div>
          <BackTop />
        </div>
      ) : (
        <div className="order-empty">
          <div className="mt-5">
            <h6>No item in store</h6>
          </div>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  product: state.product,
});

export default connect(mapStateToProps, { addToCart, getProducts, getItems })(
  Products
);
