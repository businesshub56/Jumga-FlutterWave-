import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
// import FormInput from "../../components/Form-input/form-input.component";
import VerifyBtn from "../../components/CustomButton/CustomButton";
import { connect } from "react-redux";
import { loadUser } from "../../actions/AuthAction";
// import { useHistory } from "react-router-dom";

const MerchantShops = ({ shops, loadUser }, props) => {
  //   const [userShop, setUserShop] = useState([]);
  const [selectedshop, setSelectedshop] = useState("");
  const [errors, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const onCloseModal = () => {
    setShow(false);
    // history.push("/admin");
  };

  useEffect(() => {
    const loadshop = async () => {
      await loadUser();
    };
    loadshop();
    // setShow(true);
    // eslint-disable-next-line
  }, [loadUser]);

  const validateForm = () => {
    // let formField = user.formField;
    let errors = {};
    let formIsValid = true;

    if (!selectedshop) {
      formIsValid = false;
      errors["id"] = "select shop name";
    }
    setError(errors);
    return formIsValid;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(!loading);
      //   history.push(`/online-store/${selectedshop}`);
      window.location.href = `/online-store/${selectedshop}`;
    }
    console.log("see mrere");
  };

  const onChanges = (e) => {
    setSelectedshop(e.target.value);
    // console.log(selectedshop);
  };

  return (
    <div className="form-container">
      <span style={{ color: "white" }} onClick={() => setShow(true)}>
        Online-store
      </span>

      <Modal
        // {...props}
        show={show}
        onHide={onCloseModal}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <h4 className="text-center">Select Shop name to view</h4>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={onSubmit}>
            <label htmlFor="country">Shop Names</label>

            <span
              className="d-block"
              style={{ color: "#dd2b0e", fontSize: "0.875rem" }}
            >
              {errors["id"]}
            </span>
            <select value={selectedshop} onChange={onChanges} name="shop">
              <option value="Select shop">Select Shop</option>
              {shops !== null &&
                shops.length > 0 &&
                shops.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.storeName}
                  </option>
                ))}
            </select>

            <VerifyBtn
              onClick={onSubmit}
              style={{ width: "100%" }}
              type="submit"
            >
              {loading && <i className="spinner-border spinner-border-sm"></i>}{" "}
              Load Shop
            </VerifyBtn>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};
const mapStateToProps = (state) => ({
  shops: state.Auth.merchantShops,
});

export default connect(mapStateToProps, { loadUser })(MerchantShops);
// export default MerchantShops;
