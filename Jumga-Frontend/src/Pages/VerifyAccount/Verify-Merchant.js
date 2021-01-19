import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import FormInput from "../../components/Form-input/form-input.component";
import VerifyBtn from "../../components/CustomButton/CustomButton";
import { useHistory } from "react-router-dom";
import {
  getBanks,
  validateDetails,
  mapAccountToMerchant,
} from "../../Services/VerifyMerchantUtil";
// import { connect } from "react-redux";
// import { login } from "../../actions/AuthAction";

import "./VerifyAccount.css";

const VerifyMercchant = (props) => {
  useEffect(() => {
    getBanks(setBank);
    setShow(true);

    // eslint - disable - next - line;
  }, []);

  const history = useHistory();
  const [user, setUser] = useState({
    accountNumber: "",
    id: "Select Bank",
  });
  const [errors, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [bank, setBank] = useState([]);
  const [mapaccount, setMapAccount] = useState(false);
  const [checkdetail, setCheckdetail] = useState({});
  const [show, setShow] = useState(false);
  const onCloseModal = () => {
    setShow(false);
    history.push("/admin");
  };

  const validateForm = () => {
    // let formField = user.formField;
    let errors = {};
    let formIsValid = true;

    if (!user.accountNumber) {
      formIsValid = false;
      errors["accountNumber"] = "Please provide account details to proceed";
    }
    if (!user.id) {
      formIsValid = false;
      errors["id"] = "select bank";
    }
    setError(errors);
    return formIsValid;
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    // const { accountNumber, id } = user;
    if (validateForm()) {
      setLoading(!loading);
      // console.log(accountNumber, id);
      validateDetails(setCheckdetail, user);
    }
    // console.log("see mrere");
  };
  const onValidate = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setLoading(!loading);
      mapAccountToMerchant(setMapAccount, user);

      // history.push("/admin");
      window.location.href = "/admin";
    }
    // console.log("see mrere");
  };

  const onChanges = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="form-container">
      {/* <span onClick={() => setShow(true)}>Login</span> */}

      <Modal
        // {...props}
        show={show}
        onHide={onCloseModal}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <h4 className="text-center">
              Please Provide Bank details to Proceed
            </h4>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={mapaccount ? onSubmit : onValidate}>
            {/* <div className="formGroup"> */}
            <label htmlFor="bank-detail">Bank Account</label>
            <span
              className="d-block"
              style={{ color: "#dd2b0e", fontSize: "0.875rem" }}
            >
              {errors["accountNumber"]}
            </span>
            <FormInput
              type="text"
              name="accountNumber"
              // value={email}
              placeholder="Enter account Number"
              onChange={onChanges}
              required
            />
            <label htmlFor="country">Bank Name</label>

            <span
              className="d-block"
              style={{ color: "#dd2b0e", fontSize: "0.875rem" }}
            >
              {errors["id"]}
            </span>
            <select value={user.id} onChange={onChanges} name="id">
              <option value="Select Bank">Select Bank</option>
              {bank.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.bankName}
                </option>
              ))}
            </select>
            {checkdetail && (
              <div className="text-center" style={{ color: "green" }}>
                <span className="d-block">{checkdetail.account_name}</span>
                <span className="d-block">{checkdetail.account_number}</span>
              </div>
            )}

            <span style={{ color: "red" }}> {checkdetail.message}</span>

            {!checkdetail.account_name && (
              <VerifyBtn
                onClick={onSubmit}
                style={{ width: "100%" }}
                type="submit"
              >
                {loading && <i class="spinner-border spinner-border-sm"></i>}{" "}
                Proceed{" "}
              </VerifyBtn>
            )}
            {checkdetail.account_name && (
              <VerifyBtn
                onClick={onValidate}
                style={{ width: "100%" }}
                type="submit"
              >
                {loading && <i class="spinner-border spinner-border-sm"></i>}{" "}
                Validate{" "}
              </VerifyBtn>
            )}
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};
// const mapStateToProps = (state) => ({
//   authState: state.Auth.isAuthenticated,
// });

// export default connect(mapStateToProps, { login })(Login);
export default VerifyMercchant;
