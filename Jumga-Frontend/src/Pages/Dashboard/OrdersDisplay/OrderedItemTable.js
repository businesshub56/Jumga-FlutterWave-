import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import FormInput from "../../../components/Form-input/form-input.component";
import Downloadbtn from "../../../components/CustomButton/CustomButton";
// import { orderListUtils } from "../../../Services/OrdereListUtils";
import { fetchProductCategory } from "../../../Services/AddProductsUtil";
import dateFormat from "dateformat";
import { downloaOrderFile } from "../../../Services/OrdereListUtils";
import { CSVLink } from "react-csv";

const OrderedItemTable = ({ orderedItems, onfilter }) => {
  const [filterparams, setFilterparams] = useState({});
  const [category, setCategory] = useState({});
  const [fileXLsX, setFile] = useState("");

  const onChange = (e) => {
    setFilterparams({ ...filterparams, [e.target.name]: e.target.value });
    // console.log(filterparams);
  };

  useEffect(() => {
    fetchProductCategory(setCategory);
    // eslint-disable-next-line
  }, []);

  return (
    <div className="p-4">
      <div className="container">
        <form>
          <div className="text-center">
            <h4>Filter Orders list by either of the Inputs below </h4>
          </div>
          <Table className="mb-0" borderless responsive>
            <thead>
              <tr>
                <th>Customer email:</th>
                <th>Product Category:</th>
                <th> Product name</th>
                <th>Date/from</th>
                <th>Date/to</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <FormInput
                    type="text"
                    onChange={onChange}
                    name="customerEmail"
                    placeholder="Filter by Customer email.."
                  />
                </td>

                <td>
                  <select
                    className="mt-0"
                    value={filterparams.category}
                    onChange={onChange}
                    name="productCategory"
                  >
                    <option value="SELECT CATEGORY">SELECT CATEGORY</option>
                    {Object.entries(category).map(([key, value], index) => (
                      <option key={index} value={key}>
                        {value}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <FormInput
                    type="text"
                    onChange={onChange}
                    name="productName"
                    placeholder="Filter by Product Name.."
                  />
                </td>
                <td>
                  <FormInput
                    type="text"
                    onChange={onChange}
                    name="startDate"
                    placeholder="Filter by 2021-01-16.."
                  />
                </td>
                <td>
                  <FormInput
                    type="text"
                    onChange={onChange}
                    name="endDate"
                    placeholder="Filter by 2021-01-16.."
                  />
                </td>
              </tr>
            </tbody>
          </Table>
          <div className="row py-1">
            <div className="col-lg-4 col-sm col-md">
              <Downloadbtn
                type="button"
                // value="Search"
                style={{
                  width: "100%",
                }}
                onClick={() => {
                  onfilter(filterparams);
                }}
                // style={{ backgroundColor: "#004182",  color: "white" }}
              >
                Search
              </Downloadbtn>
            </div>
            <div className="col-lg-4 col-sm col-md">
              {/* {" "} */}
              <Downloadbtn
                type="button"
                style={{
                  width: "100%",
                }}
              >
                <CSVLink
                  filename={"Transaction-report.csv"}
                  className="text-dark"
                  target="_blank"
                  data={fileXLsX}
                  asyncOnClick={true}
                  onClick={(event, done) => {
                    downloaOrderFile(setFile, filterparams).then(() => {
                      done(); // Don't Proceed
                    });
                  }}
                >
                  Download file
                </CSVLink>
              </Downloadbtn>
            </div>
            <div className="col-lg-4 col-sm col-md">
              <Downloadbtn
                style={{
                  width: "100%",
                }}
                onClick={() => {
                  onfilter();
                }}
              >
                Reset Filter
              </Downloadbtn>
            </div>
          </div>
        </form>
      </div>
      <div className="mt-3" style={{ background: "#ffffff" }}>
        <div className="p-1">
          <h5>Order Listing</h5>
        </div>
        <Table hover responsive>
          <thead>
            <tr>
              <th>Invoice</th>
              <th>Date</th>
              <th>Placed by</th>
              <th>Status</th>
              <th>Payment Status</th>
              <th>Quantity</th>
              <th>Amount</th>
              {/* <th>Action</th> */}
            </tr>
          </thead>
          <tbody>
            {orderedItems.map((t, index) => (
              <tr key={index}>
                <td>JMG-00{t.id}</td>
                <td>
                  {dateFormat(t.checkout["dateCreated"], "mmmm dS, yyyy")}{" "}
                </td>

                <td className="text-capitalize">
                  {t.checkout["user"].firstName}
                </td>
                <td>Processed </td>
                <td>{t.checkout["paymentMade"] ? "Paid" : "Pending"}</td>
                <td>{t.quantity}</td>
                <td>{t.unitPrice}</td>
                {/* <td>More Details</td> */}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default OrderedItemTable;
