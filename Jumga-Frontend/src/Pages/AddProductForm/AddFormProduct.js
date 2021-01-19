import React, { useEffect, useState } from "react";
import FormInput from "../../components/Form-input/form-input.component";
import AddProduct from "../../components/CustomButton/CustomButton";
import {
  addProductUtil,
  fetchProductCategory,
} from "../../Services/AddProductsUtil";
import ProductToDisplaybyMerchant from "./ProductToDisplaybyMerchant";
import { toast } from "react-toastify";
import axios from "axios";
import util from "../../utils/util";
import setAuthToken from "../../utils/SetAuthToken";
import "./addProduct.css";

const AddFormProduct = (props) => {
  useEffect(() => {
    fetchProductCategory(setCategory);
    const loaduser = async () => {
      if (localStorage.token) {
        setAuthToken(localStorage.token);
      }
      try {
        const res = await axios.get(`${util}merchant/my-info`);
        setUserDetails(res.data);
        // console.log(res.data.shops);
      } catch (err) {
        console.log(err);
      }
    };
    loaduser();
    // eslint-disable-next-line
  }, [fetchProductCategory]);
  const [product, setProduct] = useState({
    name: "",
    amount: "",
    // file: "",
    shopId: "",
    category: "",
    description: "",
  });
  // const [file, setFile] =useState(null)
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const [category, setCategory] = useState({});
  const productParameter = JSON.stringify(product);
  const productPayload = new FormData();
  productPayload.append("productParameter", productParameter);
  productPayload.append("file", image);
  // productPayload.append("file", e.target.files[0]);

  // const { amount, name, file, description } = product;

  const notify = () => {
    toast.success("Added to cart !", {
      position: "top-right",
      autoClose: 2000,
    });
    // setLoading(!loading);
  };

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
    // console.log(product);

    if (e.target.name === "file") {
      setImage({ [e.target.name]: e.target.files[0] });
      // console.log(image);
    }
    // console.log(product);
  };

  const triggerInputFile = (e) => {
    // setImage(e.target.files[0]);
    setImage(e.target.files[0]);
  };

  const validateForm = () => {
    // console.log("dsdsdsdfe");
    let errors = {};
    let formIsValid = true;

    if (!product.name) {
      formIsValid = false;
      return (errors["name"] = "Required");
    }
    if (!product.description) {
      formIsValid = false;
      return (errors["description"] = "Required");
    }
    if (!product.shopId) {
      formIsValid = false;
      return (errors["shopId"] = "Required");
    }
    if (!product.category) {
      formIsValid = false;
      return (errors["category"] = "Required");
    }
    if (!product.file) {
      formIsValid = false;
      return (errors["image"] = "Upload an image for item ");
    }
    if (!product.amount) {
      formIsValid = false;
      return (errors["amount"] = "Required");
    }
    // if (!product.currencyType) {
    //   formIsValid = false;
    //   return (errors["currencyType"] = "Cannot be empty");
    // }
    setErrors(errors);
    return formIsValid;
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      setLoading(!loading);
      addProductUtil(setErrors, productPayload);

      notify();
      setProduct({
        name: "",
        amount: "",
        // file: "",
        shopId: "",
        category: "",
        description: "",
      });
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <ProductToDisplaybyMerchant />
      <div className=" product-form">
        {/* <SideBar /> */}
        <form className="contactForm" onSubmit={onSubmit}>
          <div className="">
            <span
              className="d-block"
              style={{ color: "#dd2b0e", fontSize: "0.875rem" }}
            >
              {errors["name"]}
            </span>
            <FormInput
              type="text"
              label="Product Name"
              name="name"
              // value={name}
              onChange={handleChange}
              placeholder="name"
            />
          </div>
          <div>
            <label>Amount</label>
            <span
              className="d-block"
              style={{ color: "#dd2b0e", fontSize: "0.875rem" }}
            >
              {errors["amount"]}
            </span>
            <FormInput
              type="text"
              // value={amount}
              name="amount"
              onChange={handleChange}
              placeholder="Item amount"
            />
          </div>
          <div>
            <label>Delivery Fee</label>
            <span
              className="d-block"
              style={{ color: "#dd2b0e", fontSize: "0.875rem" }}
            >
              {errors["deliveryFee"]}
            </span>
            <FormInput
              type="text"
              // value={amount}
              name="deliveryFee"
              onChange={handleChange}
              placeholder="Delivery charge on item"
            />
          </div>
          <div>
            <label>Item Image</label>

            <span
              className="d-block"
              style={{ color: "#dd2b0e", fontSize: "0.875rem" }}
            >
              {errors["file"]}
            </span>
            <label htmlFor="upload">
              Click to Upload Image for Item{" "}
              <span className="ml-1 fas fa-folder fa-2x" aria-hidden="true">
                {}
              </span>
              <input
                type="file"
                id="upload"
                accept="image/jpeg,image/png,image/gif,image/bmp"
                style={{ display: "none" }}
                onChange={triggerInputFile}
              />
            </label>
            {image !== null && (
              <span className="p-2" style={{ width: "60px" }}>
                <img
                  src={image === null ? null : URL.createObjectURL(image)}
                  width="80px"
                  alt="item uploaded"
                />
              </span>
            )}
          </div>

          <div>
            <label>Description</label>
            <span
              className="d-block"
              style={{ color: "#dd2b0e", fontSize: "0.875rem" }}
            >
              {errors["description"]}
            </span>
            <textarea
              className="group mb-4"
              name="description"
              //   value={description}
              onChange={handleChange}
              placeholder="Item description"
              //   style={{ width: "100%" }}
              rows="3"
            ></textarea>
          </div>
          <div>
            <label>Item Category </label>
            <span
              className="d-block"
              style={{ color: "#dd2b0e", fontSize: "0.875rem" }}
            >
              {errors["category"]}
            </span>
            <select
              value={product.category}
              onChange={handleChange}
              name="category"
            >
              <option value="SELECT CATEGORY">SELECT CATEGORY</option>
              {Object.entries(category).map(([key, value], index) => (
                <option key={index} value={key}>
                  {value}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="store name">Select Store to Update </label>

            <span
              className="d-block"
              style={{ color: "#dd2b0e", fontSize: "0.875rem" }}
            >
              {errors["shopId"]}
            </span>
            <select
              value={product.shopId}
              onChange={handleChange}
              name="shopId"
            >
              <option value="SELECT STORE">SELECT STORE</option>
              {userDetails.shops &&
                userDetails.shops.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.storeName}
                  </option>
                ))}
            </select>
          </div>
          <span
            className="d-block"
            style={{ color: "#dd2b0e", fontSize: "0.875rem" }}
          >
            {errors.message}
          </span>
          <AddProduct type="submit" style={{ width: "100%" }}>
            {loading && <i className="spinner-border spinner-border-sm"></i>}
            {!loading && "Add Product"}
          </AddProduct>
        </form>
      </div>
    </div>
  );
};

export default AddFormProduct;
