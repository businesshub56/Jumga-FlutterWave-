import React, { useState, useEffect } from "react";
import FormInput from "../../components/Form-input/form-input.component";
import Register from "../../components/CustomButton/CustomButton";
// import { connect } from "react-redux";
// import { register } from "../../actions/AuthAction ";
import axios from "axios";
import util from "../../utils/util";

import "./customer.css";

const RegisterCustomer = (props) => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    // confirmPassword: "",
    phoneNumber: "",
    address: "",
    // storeUrl: "",
  });
  const [errors, setErrors] = useState({});
  const {
    lastName,
    firstName,
    email,
    password,
    phoneNumber,
    address,
    // storeUrl,
  } = user;

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    console.log(user);
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

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    console.log(user);
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
    if (!user.password) {
      formIsValid = false;
      errors["password"] = "*Please enter your password.";
    }
    if (!user.address) {
      formIsValid = false;
      errors["address"] = "*Cannot be empty";
    }
    // if (user.confirmPassword !== user.password) {
    //   formIsValid = false;
    //   errors["confirmPassword"] = "*password mismatch.";
    // }
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
          `${util}register-customer`,
          {
            firstName,
            lastName,
            email,
            password,
            phoneNumber,
            address,
          },
          config
        );
        props.history.push("/");
        // window.href = "/admin";
        // alert("registered");
      } catch (err) {
        if (err.response.data.status === 422) {
          alert(err.response.data.message);
        }
        setUser({
          firstname: "",
          lastname: "",
          email: "",
          password: "",
          phoneNumber: "",
          address: "",
        });
      }
    }
  };

  return (
    <div class="container">
      <h3 className="mt-3 p-3 mb-2">
        Register on Tenancy-<span style={{ color: "goldenrod" }}>Hub</span>
      </h3>
      <form onSubmit={onSubmit}>
        <div className="row ">
          <div className="col- lg-3 col-sm col-md">
            <div>
              <label htmlFor="Name">
                <i class="fas fa-user" /> Fisrt Name
              </label>
              <span
                className="d-block"
                style={{ color: "#dd2b0e", fontSize: "0.875rem" }}
              >
                {errors["firstName"]}
              </span>
              <FormInput
                type="text"
                name="firstName"
                onChange={handleChange}
                placeholder=" John Doe..."
              />
            </div>
          </div>
          <div className="col- lg-3 col-sm col-md">
            <div>
              <label htmlFor="LastName">
                <i class="fas fa-user" /> Last Name
              </label>
              <span
                className="d-block"
                style={{ color: "#dd2b0e", fontSize: "0.875rem" }}
              >
                {errors["lastName"]}
              </span>
              <FormInput
                type="text"
                name="lastName"
                onChange={handleChange}
                placeholder="Doe..."
              />
            </div>
          </div>
        </div>
        <div className="row ">
          <div className="col- lg-3 col-sm col-md">
            <div>
              <label htmlFor="email">
                <i class="fas fa-envelope" /> Email
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
                onChange={handleChange}
                placeholder=" JohnDoe@jumga.com ...."
              />
            </div>
          </div>
          <div className="col- lg-3 col-sm col-md">
            <div>
              <label htmlFor="address">
                <i class="fas fa-address-card" /> Address
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
                onChange={handleChange}
                placeholder="14, Apena street..."
              />
            </div>
          </div>
          <div className="col- lg-3 col-sm col-md">
            <div>
              <label htmlFor="phone">
                <i class="fas fa-phone" /> Phone Number
              </label>
              <span
                className="d-block"
                style={{ color: "#dd2b0e", fontSize: "0.875rem" }}
              >
                {errors["phoneNumber"]}
              </span>
              <FormInput
                type="text"
                name="phoneNumber"
                onChange={handleChange}
                placeholder="08111111111..."
              />
            </div>
          </div>
        </div>
        <div className="row ">
          <div className="col- lg-3 col-sm col-md">
            <div>
              <label htmlFor="Password">
                <i class="fas fa-lock" /> Password
              </label>
              <span
                className="d-block"
                style={{ color: "#dd2b0e", fontSize: "0.875rem" }}
              >
                {errors["password"]}
              </span>
              <FormInput
                type="password"
                name="password"
                onChange={handleChange}
                placeholder="password"
              />
            </div>
          </div>
          <div className="col- lg-3 col-sm col-md">
            <div>
              <label htmlFor="ConfirmPassword">
                <i class="fas fa-lock" /> Confirm Password
              </label>
              <span
                className="d-block"
                style={{ color: "#dd2b0e", fontSize: "0.875rem" }}
              >
                {errors["confirmPassword"]}
              </span>
              <FormInput
                type="password"
                // name="confirmPasword"
                onChange={handleChange}
                placeholder="password"
              />
            </div>
          </div>
        </div>
        <Register style={{ width: "100%" }} type="submit">
          {loading && <i class="spinner-border spinner-border-sm"></i>} Sign Up
        </Register>
      </form>
    </div>
  );
};
//  const mapStateToProps = (state) => ({

// })

export default RegisterCustomer;
// export default connect(null, { register })(SignUp);
