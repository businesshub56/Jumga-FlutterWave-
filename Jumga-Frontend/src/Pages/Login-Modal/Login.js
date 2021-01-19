import React, { useState, useEffect } from "react";
// import Modal from "react-bootstrap/Modal";
import FormInput from "../../components/Form-input/form-input.component";
import { useHistory, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../../actions/AuthAction";
import { Link } from "react-router-dom";
import "./login.css";

const Login = ({ login, isAuthenticated, error }, ...props) => {
  const history = useHistory();
  useEffect(() => {
    if (localStorage.token && localStorage.userType === "MERCHANT") {
      history.push("/admin");
      // window.href = "/admin";
      // console.log("ddffssd");
    }
    if (localStorage.token && localStorage.userType === "CUSTOMER") {
      history.push("/");
    }

    // if (error === "Invalid Credentials") {
    //   setAlert(error, "danger");
    //   clearError();
    // }
    // eslint-disable-next-line
  }, [localStorage.token, props.history]);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [errors, setError] = useState({});

  // const [show, setShow] = useState(false);

  const validateForm = () => {
    // let formField = user.formField;
    let errors = {};
    let formIsValid = true;

    if (!user.email) {
      formIsValid = false;
      errors["email"] = "Cannot be empty";
    }
    if (!user.password) {
      formIsValid = false;
      errors["password"] = "Cannot be empty";
    }
    setError(errors);
    return formIsValid;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = user;
    if (validateForm()) {
      login({ email, password });
    }
  };

  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="container">
      <div className="place-form">
        {/* <span onClick={() => setShow(true)}>Login</span> */}

        {/* <Modal
        // {...props}
        show={show}
        onHide={() => setShow(false)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <h1>
              Account <span style={{ color: "#004182" }}> Login</span>
            </h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body> */}
        <form onSubmit={onSubmit}>
          {/* <div className="formGroup"> */}
          <label htmlFor="email">Email</label>
          <span
            className="d-block"
            style={{ color: "#dd2b0e", fontSize: "0.875rem" }}
          >
            {errors["email"]}
          </span>
          <FormInput
            type="email"
            name="email"
            // value={email}
            placeholder="Enter email Address"
            onChange={onChange}
            required
          />
          {/* </div> */}
          {/* <div className="formGroup"> */}
          <label htmlFor="password">Password</label>
          <span
            className="d-block"
            style={{ color: "#dd2b0e", fontSize: "0.875rem" }}
          >
            {errors["password"]}
          </span>
          <FormInput
            type="password"
            name="password"
            // value={password}
            placeholder="Enter password"
            onChange={onChange}
            required
          />
          {/* </div> */}
          <span
            className="d-block"
            style={{ color: "#dd2b0e", fontSize: "0.875rem" }}
          >
            {error}
          </span>
          <FormInput
            onClick={onSubmit}
            style={{ width: "100%", color: "black", background: "grey" }}
            type="submit"
            value="Login"
          />

          <small style={{ color: "#223564", fontSize: " 10px", opacity: "1" }}>
            This site is protected by reCAPTCHA and the Google Privacy Policy
            and Terms of Service apply.
          </small>
        </form>
        <div>
          <h6>
            Don't have an Account?{" "}
            <Link to="/register-customer">
              {" "}
              <b style={{ color: "#004182" }}>Sign Up</b>
            </Link>{" "}
          </h6>
        </div>
        {/* </Modal.Body>
      </Modal> */}
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.Auth.isAuthenticated,
  user: state.Auth.user,
  error: state.Auth.error,
});

export default withRouter(connect(mapStateToProps, { login })(Login));
