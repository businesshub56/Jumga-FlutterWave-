import React, { useState } from "react";
import { Table } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
// import DownloadBUtton from "../../../components/CustomButton/CustomButton";
import FormInput from "../../../components/Form-input/form-input.component";
import { downloaOrderFile } from "../../../Services/OrdereListUtils";
import { CSVLink } from "react-csv";

const DownloadOrdersReport = (
  { onchange, download, payload, category },
  props
) => {
  const [show, setShow] = useState(false);
  const [filexssl, setFile] = useState();

  return (
    <div>
      <span onClick={() => setShow(true)}>{download}</span>

      <Modal
        // {...props}
        size="lg"
        show={show}
        onHide={() => setShow(false)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          {/* <Modal.Title id="contained-modal-title-vcenter" > */}
          <h6>Filter download by either of the inputs below</h6>
          {/* </Modal.Title> */}
        </Modal.Header>
        <Modal.Body>
          <Table borderless responsive>
            <thead className="mb-0">
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
                    onChange={(e) => {
                      onchange(e);
                    }}
                    name="customerEmail"
                    placeholder="Filter by Customer email.."
                  />
                </td>

                <td>
                  <select
                    className="mt-0"
                    value={props.values}
                    onChange={(e) => {
                      onchange(e);
                    }}
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
                    onChange={(e) => {
                      onchange(e);
                    }}
                    name="productName"
                    placeholder="Filter by Product Name.."
                  />
                </td>
                <td>
                  <FormInput
                    type="text"
                    onChange={(e) => {
                      onchange(e);
                    }}
                    name="startDate"
                    placeholder="Filter by 2021-01-16.."
                  />
                </td>
                <td>
                  <FormInput
                    type="text"
                    onChange={(e) => {
                      onchange(e);
                    }}
                    name="endDate"
                    placeholder="Filter by 2021-01-16.."
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <CSVLink
                    filename={"Transaction-report.csv"}
                    className=" p-2 px-4 btn btn-primary"
                    target="_blank"
                    data={filexssl}
                    asyncOnClick={true}
                    onClick={(event, done) => {
                      downloaOrderFile(setFile, payload).then(() => {
                        done(); // Don't Proceed
                      });
                    }}
                  >
                    Download
                  </CSVLink>
                </td>
              </tr>
            </tbody>
          </Table>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DownloadOrdersReport;
