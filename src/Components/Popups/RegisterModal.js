import React, { useState } from "react";
import axios from "axios";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { showModalLogin } from "../../redux/reducers/login";
import FormInput from "../UI/FormInput";
import StripeCheckout from "react-stripe-checkout";
import { Checkbox } from "antd";
import CardDetails from "./CardDetails";

function RegisterModal({ showReg, handleCloseReg }) {
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
  const url = process.env.REACT_APP_URL;
  const dispatch = useDispatch();
  const [showPassWord, setShowPassWord] = useState(false);
  const [showCPassword, setShowCPassWord] = useState(false);
  const [addUserInBid, setAddUserInBid] = useState(false);

  // console.log("####", addUserInBid)
  const [inputValue, setInputValue] = useState({
    name: "",
    phone: "",
    address: "",
    zip: "",
    country: "",
    cardnumber: "",
    month: "",
    year: "",
    cvc: "",
    hearAbout: "",
  });
  const getInputField = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    phone: "",
    userName: "",
    dealer: "",
    dealerDescription: "",
    password: "",
    cPassword: "",
  });

  const handleUserInput = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  const handleApi = (e) => {
    e.preventDefault();

    const {
      name,
      email,
      phone,
      userName,
      dealer,
      dealerDescription,
      password,
      cPassword,
    } = userInput;
    axios
      .post(`${url}users`, {
        email,
        username: userName,
        password,
        cpassword: cPassword,
        name,
        mobile: phone,
        dealer,
        dealerDescription,
        addUserInBid,
        cardName: inputValue.name,
        cardPhone: inputValue.phone,
        cardAddress: inputValue.address,
        cardZip: inputValue.zip,
        cardCountry: inputValue.country,
        cardNumber: inputValue.cardnumber,
        cartMonth: inputValue.month,
        cartYear: inputValue.year,
        cartCvc: inputValue.cvc,
        cartHearAbout: inputValue.hearAbout,
      })
      .then((result) => {
        if (result.status === 200) {
          handleCloseReg();
          notify(result.data.message);
        } else {
          notify(result.data.message);
        }
      })
      .catch((error) => {
        notify(error);
      });
  };
  // const onToken = (address) => {
  //   console.log(address);
  // };

  return (
    <Modal
      show={showReg}
      onHide={handleCloseReg}
      className="modal fade mx-auto"
      id="RegisterModal"
      centered
    >
      <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header border-0">
            <h4 className="modal-title">Register</h4>
            <button
              onClick={handleCloseReg}
              type="button"
              className="close"
              data-dismiss="modal"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleApi}>
              <div className="row">
                <div className="col-md-12 col-lg-6 col-sm-12">
                  {" "}
                  <FormInput
                    value={userInput.name}
                    onChange={handleUserInput}
                    name="name"
                    placeholder="Enter Name"
                    errorMessage="Name should be 3-16 characters and shouldn't include any special character or number!"
                    label="Name"
                    pattern="^[A-Za-z ]{3,16}$"
                    required={true}
                  />
                </div>
                <div className="col-md-12 col-lg-6 col-sm-12">
                  <FormInput
                    value={userInput.email}
                    onChange={handleUserInput}
                    name="email"
                    placeholder="Enter Email"
                    errorMessage="It should be a valid email address!"
                    label="Email"
                    required={true}
                  />
                </div>
                <div className="col-md-12 col-lg-6 col-sm-12">
                  <FormInput
                    value={userInput.userName}
                    onChange={handleUserInput}
                    name="userName"
                    placeholder="Enter Username"
                    errorMessage="Username should be 3-16 characters and shouldn't include any special character!"
                    label="Username"
                    pattern="^[A-Za-z0-9]{3,16}$"
                    required={true}
                  />
                </div>
                <div className="col-md-12 col-lg-6 col-sm-12">
                  <FormInput
                    value={userInput.phone}
                    onChange={handleUserInput}
                    name="phone"
                    placeholder="Enter phone number"
                    errorMessage="Phone number should be 10-12 characters and shouldn't include any special character and alphabet!"
                    label="Phone"
                    pattern="^[0-9]{10,12}$"
                    required={true}
                  />
                </div>

                <div className="col-12 col-md-6">
                  <div className="form-group">
                    <label htmlFor="">Are you a dealer?</label>
                    <select
                      value={userInput.dealer}
                      onChange={handleUserInput}
                      name="dealer"
                      className="field"
                      required
                    >
                      <option selected disabled value="">
                        Choose...
                      </option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                </div>

                {userInput.dealer === "Yes" && (
                  <div className="col-md-12 col-lg-12 col-sm-12">
                    <div class="mb-3">
                      <label
                        htmlFor="exampleFormControlTextarea1"
                        class="form-label"
                      >
                        Description
                      </label>
                      <textarea
                        value={userInput.dealerDescription}
                        onChange={handleUserInput}
                        name="dealerDescription"
                        placeholder="Enter Description"
                        class="form-control"
                        id="exampleFormControlTextarea1"
                        rows="3"
                        required
                      ></textarea>
                    </div>
                  </div>
                )}
                <div className="col-md-12 col-lg-6 col-sm-12">
                  <FormInput
                    value={userInput.password}
                    onChange={handleUserInput}
                    name="password"
                    placeholder="Enter Password"
                    errorMessage="Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!"
                    label="Password"
                    type={showPassWord ? "text" : "password"}
                    pattern={`^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`}
                    required={true}
                  />
                  <Checkbox
                    style={{ color: "#F49D1A" }}
                    onClick={() => setShowPassWord(!showPassWord)}
                  >
                    Show password
                  </Checkbox>
                </div>
                <div className="col-md-12 col-lg-6 col-sm-12">
                  <FormInput
                    value={userInput.cPassword}
                    onChange={handleUserInput}
                    name="cPassword"
                    placeholder="Enter Confirm Password"
                    errorMessage="Passwords don't match!"
                    label="Confirm Password"
                    type={showCPassword ? "text" : "password"}
                    pattern={userInput.password}
                    required={true}
                  />
                  <Checkbox
                    style={{ color: "#F49D1A" }}
                    onClick={() => setShowCPassWord(!showCPassword)}
                  >
                    Show password
                  </Checkbox>
                </div>
                <div className="col-12 col-md-12">
                  <div className="form-group form-check">
                    <label className="form-check-label">
                      <input
                        onChange={(e) => setAddUserInBid(e.target.checked)}
                        className="form-check-input"
                        type="checkbox"
                      />
                      i want the ability to bid on action?(Optional)
                    </label>
                  </div>
                </div>

                <div className="col-12">
                  {addUserInBid == true ? (
                    <label style={{ color: "#FFB100" }}>
                      GasGuzzlrs requires a credit to bid
                    </label>
                  ) : (
                    ""
                  )}
                </div>

                <div className="col-12">
                  {addUserInBid === true ? (
                    <CardDetails
                      inputValue={inputValue}
                      getInputField={getInputField}
                    />
                  ) : (
                    ""
                  )}
                </div>

                <div className="col-12 col-md-12">
                  <div className="form-group form-check">
                    <label className="form-check-label">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        required
                      />{" "}
                      I accept the Terms of Use and Privacy Notice
                    </label>
                  </div>
                </div>
                <div className="col-12 col-md-12">
                  <div className="form-group form-check">
                    <label className="form-check-label">
                      <input className="form-check-input" type="checkbox" />{" "}
                      Sign me up for the GasGuzzlrs Daily Mail
                    </label>
                  </div>
                </div>
                <div className="col-12 col-md-12">
                  <div className="form-group">
                    <p className="small">
                      This site is protected by reCAPTCHA and the Google{" "}
                      <a href="/privacy"> Privacy Policy</a> and{" "}
                      <a href="/termsandconditions">Terms of Service</a> apply
                    </p>
                  </div>
                </div>

                <div className="col-12 col-md-12">
                  <div className="form-group">
                    <button type="submit" className="btn">
                      Register
                    </button>

                    {/* {addUserInBid ? (
                      userInput.name != "" &&
                      userInput.phone != "" &&
                      userInput.userName != "" &&
                      userInput.dealer != "" &&
                      userInput.password != "" 
                      ? (
                        <StripeCheckout
                          stripeKey="pk_test_m9Dp6uaJcynCkZNTNS1nDR8B00AQg2m6vJ"
                          token={onToken}
                        />
                      ) : (
                        <button type="submit" className="btn" disabled={true}>
                          Register
                        </button>
                      )
                    ) : null} */}
                  </div>
                </div>

                <div className="col-12 col-md-12">
                  <div className="form-group">
                    <p className="m-0">
                      Already have an account?&nbsp;&nbsp;
                      <a
                        onClick={() => {
                          handleCloseReg();
                          dispatch(showModalLogin());
                        }}
                        href="javascript:void(0)"
                        data-dismiss="modal"
                        data-toggle="modal"
                        data-target="#loginModal"
                      >
                        Log in
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default RegisterModal;
