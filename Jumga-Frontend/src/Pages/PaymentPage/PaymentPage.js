import React, { useState, useEffect } from "react";
import PayWithRave from "../../components/RaveGateway/PayWithRaveBtn";
import { Subscribe } from "../../Services/MerchantTokaenPayment";
import { loadMerchantInfo } from "../../Services/LoadMerchant-InfoUtil";
import { connect } from "react-redux";
import { loadUser } from "../../actions/AuthAction";
// import axios from "axios";
// import util from "../../utils/util";
// import setAuthToken from "../../utils/SetAuthToken";
import "./pay.css";
import { withRouter } from "react-router-dom";

const PaymentPage = ({ user, loadUser }) => {
  // const history = useHistory();
  const [config, setConfig] = useState({});
  const [details, setDetails] = useState({});
  useEffect(() => {
    // loadUser();
    loadMerchantInfo(setDetails);
    Subscribe(setConfig);

    // eslint - disable - next - line;
  }, []);

  const onSuccess = () => {
    // history.push("/admin");
    // window.location.href = "/admin";
    console.log("success");
  };
  const onClose = () => {
    // history.push("/admin");
    window.location.href = "/admin";
  };

  return (
    <div className="pay-container">
      <div className="pay">
        <p>Please click the button below to proceed to Pay your Merchant fee</p>
        <PayWithRave
          // btnText="Pay"
          tx_ref={config.paymentReference}
          currency={config.currency}
          amount={config.amount}
          name={details.firstName}
          phoneNumber={details.phoneNumber}
          // lastname={details.lastName}
          email={localStorage.email}
          callback={onSuccess}
          onClose={onClose}
        />
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  user: state.Auth,
});

export default withRouter(connect(mapStateToProps, { loadUser })(PaymentPage));
