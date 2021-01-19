import React from "react";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import PayBtn from "../CustomButton/CustomButton";

const PayWithRaveBtn = (props) => {
  const config = {
    public_key: "FLWPUBK_TEST-24e8c02b14df66ccb2e5494880a65e07-X",
    tx_ref: props.tx_ref,
    amount: props.amount,
    currency: props.currency,

    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: props.email,
      phonenumber: props.phoneNumber,
      name: props.name,
    },
    customizations: {
      title: props.storeName,
      // description: "Payment for items in cart",
      logo:
        "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
    },
  };

  //   Card number: 4187 4274 1556 4246
  // cvv: 828
  // Expiry: 09/32
  // Pin: 3310
  // OTP: 12345

  const handleFlutterPayment = useFlutterwave(config);

  return (
    <div className="">
      {/* <h1>Hello Test user</h1> */}

      <PayBtn
        onClick={() => {
          handleFlutterPayment({
            callback: () => {
              props.callback();
              closePaymentModal(); // this will close the modal programmatically
            },
            onClose: () => {
              console.log("Payment closed");
              props.onClose();
            },
          });
        }}
      >
        Pay
      </PayBtn>
    </div>
  );
};
export default PayWithRaveBtn;
