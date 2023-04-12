import { ConnectButton } from "@rainbow-me/rainbowkit";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import { toast } from "react-toastify";
import { clearCart } from "../../../redux/reducers/cartSlice";
import FormInput from "../../UI/FormInput";
import { notify } from "../../UI/globaleVar";
import SmallSpinner from "../../UI/SmallSpinner";

export default function CheckoutDetails() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading]=useState(false)
  const product = useSelector((state) => state.cartSlice);
  const logingUser = useSelector((state) => state);
  const dispatch = useDispatch();

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
      return {
        id: curElem.id,
        quantity: curElem.quantity,
        color_id: curElem.color_id,
        size_id: curElem.size_id,
      };
    });
    await axios
      .post(`${process.env.REACT_APP_URL}addorder`, {
        // order_status: "New",
        items,
        // payment_mode: `${getInputData.deliveryType}`,
      })
      .then((result) => {
        if (result.data.status === 200) {
          getDeliveryAddress();
          setIsLoading(false)
          navigate("/orders-cart");
          dispatch(clearCart());
          notify(result.data.message, result.data.status);
        }
      })
      .catch((error) => {
        // notify(error.message);
      });
  };
  
  const fetchUsrApi = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_URL}user`);
      if (res.data.data) {
        console.log(89898, res.data.data)
        setGetInputData({
          name: res.data.data.name,
          email: res.data.data.email,
          phone: res.data.data.mobile,
          // address: res.data.data.email,
        });
      } else {
        console.log("first");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUsrApi();
  }, []);

  const getDeliveryAddress = async () => {
    await axios
      .post(`${process.env.REACT_APP_URL}addDeliveryAddress`, {
        name: getInputData.name,
        email: getInputData.email,
        phone: getInputData.phone,
        address: getInputData.address,
        // deliverytype: getInputData.deliveryType,
        pincode: getInputData.pinCode,
      })
      .then((result) => { })
      .catch((error) => { });
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
    // if (getInputData.deliveryType === "cash on delivery") {
    setIsLoading(true)
    orderPlace();
    // getDeliveryAddress();
    // navigate("/orders-cart");
    // dispatch(clearCart());
    // notify("Order place successfully");
    // } else {
    //   handleShow();
    // }
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
              class="field"
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
              class="field"
              required={true}
            />
          </div>
          <div class="col-md-6">
            <FormInput
              value={getInputData.phone}
              onChange={handleOnChange}
              name="phone"
              placeholder="Enter Phone Number"
              errorMessage="Phone number should be 10-12 characters and shouldn't include any special character and alphabet!"
              label="Phone"
              pattern="^[0-9]{10,12}$"
              class="field"
              required={true}
            />
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
              class="field"
              required={true}
            />
          </div>
          <div class="col-md-12">
            <label for="validationDefaultUsername" class="form-label">
              Address
            </label>
            <div class="input-group">
              <textarea
                name="address"
                value={getInputData.address}
                onChange={handleOnChange}
                class="field"
                placeholder="Enter address"
                aria-describedby="inputGroupPrepend2"
                required
              />
            </div>
          </div>

          {/* <div class="col-md-6 ">
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
                Select
              </option>
              <option value="cod">cash on delivery</option>
              <option value="online">online pay</option>
            </select>
          </div> */}

          <div class="col-md-12">
            {
              isLoading ? (
                <SmallSpinner/>
              ) : <button class="btn mt-5" type="submit">
                Place Order
              </button>
            }
            
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
            <p>Select Payment Option:</p>
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
