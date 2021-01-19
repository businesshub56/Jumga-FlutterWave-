import React, { useState, useEffect } from "react";
import orderEmptyImg from "../../../assessts/orderEmpty.png";
import OrdersTable from "./OrderedItemTable";
import { orderListUtils } from "../../../Services/OrdereListUtils";
import "./Order.css";

const OrderedItems = () => {
  const [orderedItems, setOrderedItems] = useState([]);
  // const [filterResult, filterResult] = useState([])

  useEffect(() => {
    orderListUtils(setOrderedItems);
    // eslint-disable-next-line
  }, []);

  const onFilter = (filterparams) => {
    // e.preventDefault();
    // console.log("gkjfk");
    orderListUtils(setOrderedItems, filterparams);
  };

  return (
    <div className="container ">
      {orderedItems !== null && orderedItems.length > 0 ? (
        <div>
          <OrdersTable orderedItems={orderedItems} onfilter={onFilter} />
        </div>
      ) : (
        <div className="order-empty">
          <div>
            <img src={orderEmptyImg} alt="order empty" width="250px" />
          </div>
          <div className="mt-3">
            <h5>Your orders will show here.</h5>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderedItems;
