import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import FormInput from "../../components/Form-input/form-input.component";
import axios from "axios";
import util from "../../utils/util";
import setAuthToken from "../../utils/SetAuthToken";
// import SelectInput from "../../components/Select-form-Input/SelectInput";
// import { Link } from "react-router-dom";

const ProductToDisplaybyMerchant = () => {
  const [itemToDisplay, setItemToDisplay] = useState([]);

  useEffect(() => {
    const loaduser = async () => {
      if (localStorage.token) {
        setAuthToken(localStorage.token);
      }
      const config = {
        headers: {
          "content-Type": "application/json",
        },
      };
      try {
        const res = await axios.post(
          `${util}product/filter`,
          { shopId: 21 },
          config
        );
        setItemToDisplay(res.data.products);
        console.log(res.data.products);
      } catch (err) {
        console.log(err);
      }
    };
    loaduser();
    // eslint-disable-next-line
  }, [setItemToDisplay]);

  return (
    <>
      {itemToDisplay.length > 0 && (
        <div className="product-form">
          <div className="text-center">
            <h5>Products available to display to your customer</h5>
          </div>
          <form>
            <FormInput
              style={{ width: "40%" }}
              type="search"
              label="Filter Product"
              placeholder="Filter product..."
            />
          </form>
          <Table hover borderless responsive>
            <thead>
              <tr>
                <th>Items</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {itemToDisplay.map((t, index) => (
                <tr key={index}>
                  <td>
                    <img
                      src={t.imageUrl}
                      className="img-fluid"
                      alt="item"
                      width="100px"
                    />
                  </td>
                  <td>{t.name} name</td>
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
                  <td>&#8358;{t.amount} </td>
                  <td>
                    <select
                      //   value=
                      //   onChange={handleChange}
                      name="shopId"
                    >
                      <option value="SELECT STORE">SELECT STORE</option>
                      <option value="edit">Edit</option>
                      <option value="Delete">Delete </option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </>
  );
};

export default ProductToDisplaybyMerchant;
