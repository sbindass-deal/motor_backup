import { ConnectButton } from "@rainbow-me/rainbowkit";
import axios from "axios";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import { toast } from "react-toastify";
import { clearCart } from "../../../redux/reducers/cartSlice";
import FormInput from "../../UI/FormInput";

export default function CheckoutDetails() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const product = useSelector((state) => state.cartSlice);
  const dispatch = useDispatch();
  const notify = (val) =>
    toast.success(val, {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const [getInputData, setGetInputData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    deliveryType: "",
    pinCode: "",
  });
  const handleOnChange = (e) => {
    setGetInputData({ ...getInputData, [e.target.name]: e.target.value });
  };

  const orderPlace = async () => {
    const items = product.products.map((curElem) => {
      return { id: curElem.id, quantity: curElem.quantity };
    });
    await axios
      .post(`${process.env.REACT_APP_URL}addorder`, {
        order_status: "New",
        items,
      })
      .then((result) => {
        // if (result.status === 200) {
        //   handleShow();
        // }
      })
      .catch((error) => {
        // notify(error.message);
      });
  };

  const getDeliveryAddress = async () => {
    await axios
      .post(`${process.env.REACT_APP_URL}addDeliveryAddress`, {
        name: getInputData.name,
        email: getInputData.email,
        phone: getInputData.phone,
        address: getInputData.address,
        deliverytype: getInputData.deliveryType,
        pincode: getInputData.pinCode,
      })
      .then((result) => {})
      .catch((error) => {});
  };

  const onToken = (token, addresses) => {
    if (token) {
      orderPlace();
      getDeliveryAddress();
      navigate("/orders-cart");
      dispatch(clearCart());
      notify("Order place successfully");
    }
  };
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };

  const handleOrder = (e) => {
    e.preventDefault();
    handleShow();
  };

  return (
    <>
      <div className="container pt-5" style={{ minHeight: "100vh" }}>
        <form class="row g-5 col-sm" onSubmit={handleOrder}>
          <div class="col-md-6">
            <FormInput
              label="Name"
              name="name"
              value={getInputData.name}
              onChange={handleOnChange}
              placeholder="Enter Name"
              errorMessage="Name should be 3-16 characters and shouldn't include any special character or number!"
              pattern="^[A-Za-z ]{3,16}$"
              required={true}
              class="form-control"
            />
          </div>
          <div class="col-md-6">
            <FormInput
              value={getInputData.email}
              onChange={handleOnChange}
              name="email"
              placeholder="Enter Email"
              errorMessage="It should be a valid email address!"
              label="Email"
              class="form-control"
              required={true}
            />
          </div>
          <div class="col-md-6">
            <FormInput
              value={getInputData.phone}
              onChange={handleOnChange}
              name="phone"
              placeholder="Enter phone number"
              errorMessage="Phone number should be 10-12 characters and shouldn't include any special character and alphabet!"
              label="Phone"
              pattern="^[0-9]{10,12}$"
              class="form-control"
              required={true}
            />
          </div>

          <div class="col-md-6">
            <label for="validationDefaultUsername" class="form-label">
              Address
            </label>
            <div class="input-group">
              <textarea
                name="address"
                value={getInputData.address}
                onChange={handleOnChange}
                class="form-control"
                placeholder="Enter address"
                aria-describedby="inputGroupPrepend2"
                required
              />
            </div>
          </div>

          <div class="col-md-6 ">
            <label for="validationDefault04" class="form-label">
              Delivery type
            </label>
            <select
              class="form-select w-100"
              id="validationDefault04"
              name="deliveryType"
              value={getInputData.deliveryType}
              onChange={handleOnChange}
              required
            >
              <option selected disabled value="">
                Choose...
              </option>
              <option value="cash on delivery">cash on delivery</option>
              <option value="online pay">online pay</option>
            </select>
          </div>
          <div class="col-md-6">
            <FormInput
              value={getInputData.pinCode}
              onChange={handleOnChange}
              name="pinCode"
              placeholder="Enter pin code"
              errorMessage="Pin number should be 4-8 characters and shouldn't include any special character and alphabet!"
              label="Pin code"
              pattern="^[0-9]{4,8}$"
              class="form-control"
              required={true}
            />
          </div>
          <div class="col-6">
            <button class="btn btn-primary mt-3" type="submit">
              Place Order
            </button>
          </div>
        </form>
      </div>
      <Modal show={show} onHide={handleClose} className="payTPop">
        <Modal.Header closebutton>
          <Modal.Title>Payment Process</Modal.Title>
          <button variant="secondary" onClick={handleClose}>
            X
          </button>
        </Modal.Header>
        <Modal.Body>
          <div className="processPy">
            <h2>Model Name : 2021 BMW Nexon</h2>
            <h3 className="price__">Price : $2000</h3>
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
}
