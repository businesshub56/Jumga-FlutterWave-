import React, { useState, useEffect } from "react";
import FormInput from "../../components/Form-input/form-input.component";
import Register from "../../components/CustomButton/CustomButton";
// import { connect } from "react-redux";
// import { register } from "../../actions/AuthAction ";
import axios from "axios";
import util from "../../utils/util";

import "./SignUp.css";

const SignUp = (props) => {
  useEffect(() => {
    if (localStorage.token) {
      props.history.push("/admin");
      // window.href = "/admin";
      console.log("ddffssd");
    }

    // if (error === "Invalid Credentials") {
    //   setAlert(error, "danger");
    //   clearError();
    // }
    // eslint-disable-next-line
  }, [localStorage.token, props.history]);

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    confirmPassword: "",
    address: "",
    description: "",
    storeName: "",
    // storeUrl: "",
  });
  const [errors, setErrors] = useState({});
  const {
    lastName,
    firstName,
    email,
    password,
    phoneNumber,
    storeName,
    address,
    // storeUrl,
  } = user;

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    // console.log(user);
  };

  const validateForm = () => {
    let errors = {};
    let formIsValid = true;
    if (!user.firstName) {
      formIsValid = false;
      errors["firstName"] = "*Cannot be empty";
    }
    if (typeof user.firstName !== "undefined") {
      if (!user.firstName.match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;
        errors["firstName"] = "*Please enter alphabet characters only.";
      }
    }
    if (typeof user.lastName !== "undefined") {
      if (!user.lastName.match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;
        errors["lastName"] = "*Please enter alphabet characters only.";
      }
    }
    if (!user.lastName) {
      formIsValid = false;
      errors["lastName"] = "Cannot be empty";
    }
    if (!user.email) {
      formIsValid = false;
      errors["email"] = "Cannot be empty";
    }
    if (!user.password) {
      formIsValid = false;
      errors["password"] = "Cannot be empty";
    }
    if (!user.phoneNumber) {
      formIsValid = false;
      errors["phoneNumber"] = "*Please enter your mobile no.";
    }

    if (typeof user.phoneNumber !== "undefined") {
      if (!user.phoneNumber.match(/^[0-9]{11}$/)) {
        formIsValid = false;
        errors["phoneNumber"] = "*Please enter valid mobile no.";
      }
    }
    if (!user.address) {
      formIsValid = false;
      errors["address"] = "*Cannot be empty";
    }
    if (!user.storeName) {
      formIsValid = false;
      errors["storeName"] = "*Cannot be empty";
    }
    //   //   if (!user.street) {
    //   //     formIsValid = false;
    //   //     errors["street"] = "Cannot be empty";
    //   //   }
    //   //   if (!user.city) {
    //   //     formIsValid = false;
    //   //     errors["city"] = "*Cannot be empty";
    //   //   }
    //   //   if (!user.state) {
    //   //     formIsValid = false;
    //   //     errors["state"] = "*Cannot be empty";
    //   //   }
    setErrors(errors);
    return formIsValid;
  };

  const onSubmit = async (event) => {
    // e.peventDefault();
    event.preventDefault();
    if (validateForm()) {
      setLoading(!loading);
      const config = {
        headers: {
          "content-Type": "application/json",
        },
      };
      try {
        await axios.post(
          `${util}register-merchant`,
          {
            firstName,
            lastName,
            email,
            password,
            phoneNumber,
            storeName,
            address,
          },
          config
        );
        props.history.push("/admin");
        // window.href = "/admin";
        alert("registered");
      } catch (err) {
        if (err.response.data.status === 422) {
          alert(err.response.data.message);
        }
      }
    }
    // setUser({
    //   firstname: "",
    //   lastname: "",
    //   email: "",
    //   password: "",
    //   phoneNumber: "",
    //   address: "",
    //   description: "",
    //   storeName: "",
    //   storeUrl: "",
    // });
  };

  return (
    <div className="signup-container">
      <div className="form-container">
        <h3 className="mt-3 p-3 mb-2">
          Register on Tenancy-<span style={{ color: "goldenrod" }}>Hub</span>
        </h3>
        <form className="contactForm" onSubmit={onSubmit}>
          {/* <div className="d-flex"> */}
          <div className="">
            <label>Firstname</label>
            <span
              className="d-block"
              style={{ color: "#dd2b0e", fontSize: "0.875rem" }}
            >
              {errors["firstName"]}
            </span>
            <FormInput
              type="text"
              name="firstName"
              // value={firstname}
              onChange={handleChange}
              placeholder="Firstname"
            />
          </div>
          <div>
            <label>Lastname</label>
            <span
              className="d-block"
              style={{ color: "#dd2b0e", fontSize: "0.875rem" }}
            >
              {errors["lastName"]}
            </span>
            <FormInput
              type="text"
              // value={lastname}
              name="lastName"
              onChange={handleChange}
              placeholder="Last Name"
            />
          </div>
          {/* </div> */}
          <div>
            <label>Email</label>
            <span
              className="d-block"
              style={{ color: "#dd2b0e", fontSize: "0.875rem" }}
            >
              {errors["email"]}
            </span>
            <FormInput
              type="email"
              //   value={email}
              name="email"
              onChange={handleChange}
              placeholder="Enter email address"
            />
          </div>
          {/* <div className="d-flex"> */}
          <div className="">
            <label>Password</label>
            <span
              className="d-block"
              style={{ color: "#dd2b0e", fontSize: "0.875rem" }}
            >
              {errors["password"]}
            </span>
            <FormInput
              type="password"
              // value={password}
              name="password"
              onChange={handleChange}
              placeholder="Password"
            />
          </div>
          <div className="">
            <label>Confirm password</label>
            <span
              className="d-block"
              style={{ color: "#dd2b0e", fontSize: "0.875rem" }}
            >
              {errors["confirmPassword"]}
            </span>
            <FormInput
              type="password"
              // value={confirmPassword}
              name="confirmPassword"
              onChange={handleChange}
              placeholder="Confirm Password"
            />
          </div>
          {/* </div> */}
          <div>
            <label>Store Name</label>
            <span
              className="d-block"
              style={{ color: "#dd2b0e", fontSize: "0.875rem" }}
            >
              {errors["storeName"]}
            </span>
            <FormInput
              type="text"
              //   value={storeName}
              name="storeName"
              onChange={handleChange}
              placeholder="Store name"
            />
          </div>
          <div>
            <label>Phone </label>
            <span
              className="d-block"
              style={{ color: "#dd2b0e", fontSize: "0.875rem" }}
            >
              {errors["phoneNumber"]}
            </span>
            <FormInput
              type="text"
              //   value={storeUrl}
              name="phoneNumber"
              onChange={handleChange}
              placeholder="Phone Number"
            />
          </div>
          <div>
            <label>Description</label>
            <textarea
              className="group"
              name="description"
              //   value={description}
              onChange={handleChange}
              placeholder="Brief Store details"
              //   style={{ width: "100%" }}
              rows="3"
            ></textarea>
          </div>
          <div>
            <label>Address</label>
            <span
              className="d-block"
              style={{ color: "#dd2b0e", fontSize: "0.875rem" }}
            >
              {errors["address"]}
            </span>
            <FormInput
              type="text"
              onChange={handleChange}
              name="address"
              //   value={address}
              placeholder="Address"
            />
          </div>

          <Register style={{ width: "100%" }}>
            {loading && <i class="spinner-border spinner-border-sm"></i>}
            {"  "}
            Register
          </Register>
        </form>
      </div>
    </div>
  );
};
//  const mapStateToProps = (state) => ({

// })

export default SignUp;
// export default connect(null, { register })(SignUp);
