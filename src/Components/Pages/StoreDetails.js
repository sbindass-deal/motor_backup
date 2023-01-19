import { ConnectButton } from "@rainbow-me/rainbowkit";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import FormInput from "../UI/FormInput";

const StoreDetails = () => {
  const { id } = useParams();
  const logingUser = useSelector((state) => state);
  const vehicleData = logingUser.vehicleReducer.vehicleData;

  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [vehicle, setVehicle] = useState({});
  const [showPayment, setShowPayment] = useState(false);
  const [enqInput, setEnqInput] = useState({
    name: "",
    email: "",
    phone: "",
    comment: "",
  });
  const handleClosePayment = () => {
    setShowPayment(false);
  };
  const handleShowPayment = () => {
    setShowPayment(true);
  };
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };
  const handleOnChangeEnq = (e) => {
    setEnqInput({ ...enqInput, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    const filteredData = vehicleData.find(
      (item) => item.id === parseInt(id, 10)
    );
    setVehicle(filteredData);
  }, [id]);
  const onToken = (token, addresses) => {
    if (token !== null) {
      navigate("/successpayment");
    }
  };

  const handleEnq = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_URL}/addEnquiry`, {
        name: enqInput.name,
        email: enqInput.email,
        phone: enqInput.phone,
        comments: enqInput.comment,
      })
      .then(function (response) {
        if (response.status) {
          handleClose();
          setEnqInput({
            name: "",
            email: "",
            phone: "",
            comment: "",
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      <div className="container py-5 px-md-5 ">
        <div className="row">
          <div class="col-12 col-sm-12 col-md-5 storeDetail">
            {vehicle.images && (
              <img
                class="img-fluid rounded-start "
                src={
                  vehicle.images[0] &&
                  `${process.env.REACT_APP_URL}/${vehicle.images[0].imagePath}/${vehicle.images[0].imageName}`
                }
                onError={({ currentTarget }) => {
                  currentTarget.onError = null;
                  currentTarget.src =
                    "http://www.freeiconspng.com/uploads/no-image-icon-11.PNG";
                }}
                alt={vehicle.make}
              />
            )}
            <button
              onClick={handleShowPayment}
              type="button"
              className="btn mx-1 my-1"
            >
              Buy now
            </button>
            <button
              onClick={handleShow}
              type="button"
              className="btn mx-1 my-1"
            >
              Enquire now
            </button>
          </div>
          <div class="col-12 col-sm-12 col-md-7">
            <div class="card-body">
              <h5 class="card-title">
                {vehicle.make} {vehicle.model} {vehicle.year}
              </h5>
              <div className="detailPageContent">
                <table width={"100%"}>
                  <tr>
                    <td>Document Fee</td>
                    <td>${vehicle.documentFee}</td>
                  </tr>
                  <tr>
                    <td>Tires size</td>
                    <td>{vehicle.sizetires}</td>
                  </tr>
                  <tr>
                    <td>Accessories</td>
                    <td>{vehicle.accessories}</td>
                  </tr>
                  <tr>
                    <td>Fuel Type</td>
                    <td>{vehicle.fuel}</td>
                  </tr>
                  <tr>
                    <td>More Description</td>
                    <td>{vehicle.moreDescription}</td>
                  </tr>
                  <tr>
                    <td>Manufacture</td>
                    <td>{new Date(vehicle.created_at).toLocaleDateString()}</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        className="modal fade"
        id="loginModal"
        centered
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header border-0">
              <h4 className="modal-title">Enquiry form</h4>
              <button
                onClick={handleClose}
                type="button"
                className="close"
                data-dismiss="modal"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleEnq}>
                <div className="col-md-12">
                  <FormInput
                    value={enqInput.name}
                    onChange={handleOnChangeEnq}
                    name="name"
                    placeholder="Enter Name"
                    errorMessage="Name should be 3-16 characters and shouldn't include any special character or number!"
                    label="Name"
                    pattern="^[A-Za-z ]{3,16}$"
                    required={true}
                  />
                </div>
                <div className="col-md-12">
                  <FormInput
                    value={enqInput.email}
                    onChange={handleOnChangeEnq}
                    name="email"
                    placeholder="Enter Email"
                    errorMessage="It should be a valid email address!"
                    label="Email"
                    required={true}
                  />
                </div>
                <div className="col-md-12">
                  <FormInput
                    value={enqInput.phone}
                    onChange={handleOnChangeEnq}
                    name="phone"
                    placeholder="Enter phone number"
                    errorMessage="Phone number should be 10-12 characters and shouldn't include any special character and alphabet!"
                    label="Phone"
                    pattern="^[0-9]{10,12}$"
                    required={true}
                  />
                </div>
                <div class="col-md-12">
                  <label htmlFor="validationCustom01" class="form-label">
                    Query or Description
                  </label>
                  <textarea
                    value={enqInput.comment}
                    onChange={handleOnChangeEnq}
                    name="comment"
                    class="form-control"
                    id="bidCommetn"
                    placeholder="Enter commemts"
                    rows="3"
                  ></textarea>
                </div>
                <div
                  className="form-group mt-5"
                  style={{ textAlign: "center" }}
                >
                  <button button="submit" className="btn">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Modal>
      <Modal show={showPayment} onHide={handleClosePayment} className="payTPop">
        <Modal.Header closebutton>
          <Modal.Title>Payment Process</Modal.Title>
          <button variant="secondary" onClick={handleClosePayment}>
            X
          </button>
        </Modal.Header>
        <Modal.Body>
          <div className="processPy">
            <h2>
              Model Name : {vehicle.make} {vehicle.model} {vehicle.year}
            </h2>
            <h3 className="price__">Price : ${vehicle.documentFee}</h3>
            <br />
            <p>Choose Payment Option:</p>
            <div className="ress">
              <div className="ProcessPymt">
                <ConnectButton></ConnectButton>
              </div>
              <div>
                <StripeCheckout
                  className="Btn"
                  stripeKey="pk_test_m9Dp6uaJcynCkZNTNS1nDR8B00AQg2m6vJ"
                  token={onToken}
                />
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default StoreDetails;
