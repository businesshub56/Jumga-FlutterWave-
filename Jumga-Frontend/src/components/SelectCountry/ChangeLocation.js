import React, { useEffect, useState } from "react";
import { getCurrencyType } from "../../Services/CreateShoputil";
import { connect } from "react-redux";
import { getProducts } from "../../actions/productAction";
import "./changelocation.css";

const ChangeLocation = ({ getProducts }) => {
  const [currency, setCurrency] = useState([]);
  const [location, setLocation] = useState({});
  useEffect(() => {
    // localStorage.setItem("currencyId", location.value);
    getCurrencyType(setCurrency);
    // eslint-disable-next-line
  }, []);

  const onChanges = (e) => {
    setLocation({
      ...location,
      locationId: e.target.value,
    });
    getProducts(e.target.value);

    localStorage.setItem("currencyId", e.target.value);
    console.log(location);
  };

  return (
    <div>
      <select
        className="location"
        //   value={shopcreated.shopId}
        onChange={onChanges}
        name="locationId"
        //   {!riderAvailable ? disabled: null}
      >
        <option value="1 ">Select country</option>
        {currency.map((s) => (
          <option key={s.id} value={s.id}>
            {s.countryName}
            {/* Nigeria */}
          </option>
        ))}
      </select>
    </div>
  );
};

export default connect(null, { getProducts })(ChangeLocation);
