import React, { useState } from "react";
import axios from "axios";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { authToken, showModalLogin } from "../../redux/reducers/login";
import FormInput from "../UI/FormInput";
import StripeCheckout from "react-stripe-checkout";
import { Checkbox } from "antd";
import CardDetails from "./CardDetails";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

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
  const [file, setFile] = useState([]);
  const [showPassWord, setShowPassWord] = useState(false);
  const [showCPassword, setShowCPassWord] = useState(false);
  const [addUserInBid, setAddUserInBid] = useState(true);
  const [acceptTerms, setAcceptTerms] = useState(true);
  const [signInMe, setSignInMe] = useState(true);

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
    title: "",
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

  const uploadLogo = async (uId) => {
    const url = `${process.env.REACT_APP_URL}dealer_regi`;
    let formData = new FormData();
    formData.append("title", userInput.title);
    formData.append("id", uId);
    formData.append("logo", file[0]);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    await axios
      .post(url, formData, config)
      .then((response) => {
        console.log(response);
        notify(response.data.message);
        window.location.reload(false);
      })
      .catch((error) => {
        console.log(error);
      });
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
        // cpassword: cPassword,
        name,
        mobile: phone,
        dealer,
        // dealerDescription,
        addUserInBid,
        acceptTerms,
        mailer:signInMe,
        // cardName: inputValue.name,
        // cardPhone: inputValue.phone,
        // cardAddress: inputValue.address,
        // cardZip: inputValue.zip,
        // cardCountry: inputValue.country,
        // cardNumber: inputValue.cardnumber,
        // cartMonth: inputValue.month,
        // cartYear: inputValue.year,
        // cartCvc: inputValue.cvc,
        // cartHearAbout: inputValue.hearAbout,
      })
      .then((result) => {
        if (result.data.status === 200 && dealer === "No") {
          dispatch(authToken(result.data.access_token));
          handleCloseReg();
          notify(result.data.message);
          setInputValue({
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
          setUserInput({
            name: "",
            email: "",
            phone: "",
            userName: "",
            dealer: "",
            dealerDescription: "",
            password: "",
            cPassword: "",
          });
          window.location.reload(false);
        } else if (result.data.status === 200 && dealer === "Yes") {
          uploadLogo(result.data.user_id, result.data.message);
        } else {
          notify(result.data.message);
        }
        console.log(1111, result);
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
            <h4 className="modal-title">Sign Up</h4>
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
            <form onSubmit={handleApi} autocomplete="off">
              <div className="row">
                <div className="col-md-12 col-lg-6 col-sm-12">
                  {" "}
                  <FormInput
                    value={userInput.name}
                    onChange={handleUserInput}
                    name="name"
                    placeholder="Enter Name"
                    errorMessage="Name should be 3-30 characters and shouldn't include any special character or number!"
                    label="Name"
                    pattern="^[A-Za-z ]{3,30}$"
                    required={true}
                  />
                </div>
                <div className="col-md-12 col-lg-6 col-sm-12">
                  <FormInput style={{ textTransform: "none" }}
                    value={userInput.email}
                    onChange={handleUserInput}
                    name="email"
                    
                    placeholder="Enter Email address"
                    errorMessage="It should be a valid email address!"
                    label="Email address"
                    required={true}
                  />
                </div>
                <div className="col-md-12 col-lg-6 col-sm-12">
                  <FormInput style={{ textTransform: "none" }}
                    value={userInput.userName}
                    onChange={handleUserInput}
                    name="userName"
                   
                    placeholder="Enter Username"
                    errorMessage="Username should be 3-30 characters and shouldn't include any special character!"
                    label="Username"
                    pattern="^[A-Za-z0-9]{3,30}$"
                    required={true}
                  />
                </div>
                <div className="col-md-12 col-lg-6 col-sm-12">
                  <FormInput
                    value={userInput.phone}
                    onChange={handleUserInput}
                    name="phone"
                    placeholder="Enter Phone Number"
                    errorMessage="Phone number should be 10-20 characters and shouldn't include any special character and alphabet!"
                    label="Phone Number"
                    pattern="^[0-9]{10,20}$"
                    required={true}
                  />
                </div>
                <div className="col-md-12 col-lg-6 col-sm-12 eye_arrange">
                  <div className="aa">
                    <FormInput style={{textTransform:"none"}}
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
                    <div
                      className="eye_child"
                      onClick={() => setShowPassWord(!showPassWord)}
                    >
                      {showPassWord ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-md-12 col-lg-6 col-sm-12 eye_arrange">
                  <FormInput style={{ textTransform: "none" }}
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
                  <div
                    className="eye_child"
                    onClick={() => setShowCPassWord(!showCPassword)}
                  >
                    {showCPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </div>
                </div>
                <div className="col-md-12 col-lg-6 col-sm-12">
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
                        Select
                      </option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                </div>
                {/* {userInput.dealer === "Yes" && (
                  <div className="col-md-12 col-lg-6 col-sm-12">
                    <FormInput
                      value={userInput.title}
                      onChange={handleUserInput}
                      name="title"
                      errorMessage="Title should be 2-60 characters and shouldn't include any special character or number!"
                      pattern="^[A-Za-z ]{2,60}$"
                      placeholder="Enter title"
                      label="Title"
                      required={true}
                    />
                  </div>
                )} */}
                {/* {userInput.dealer === "Yes" && (
                  <div className="col-12 col-sm-12 col-md-12">
                    <div className="form-group">
                      <label>Description</label>
                      <textarea
                        value={userInput.dealerDescription}
                        onChange={handleUserInput}
                        name="dealerDescription"
                        placeholder="Enter Description"
                        className="field"
                        maxLength={200}
                        required
                      ></textarea>
                    </div>
                  </div>
                )} */}
                {/* {userInput.dealer === "Yes" && (
                  <div className="col-12 col-sm-12 col-md-12">
                    <div className="form-group">
                      <label>Dealer logo</label>
                      <div className="drag-area">
                        <div className="row">
                          {Array.from(file).map((items, i) => {
                            return (
                              <span key={i} className="px-1">
                                <img
                                  src={
                                    items ? URL.createObjectURL(items) : null
                                  }
                                  style={{
                                    width: "70px",
                                    objectFit: "cover",
                                  }}
                                />
                              </span>
                            );
                          })}
                        </div>

                        <input
                          style={{
                            border: "#EF6031",
                            fontSize: "1.2rem",
                            textAlign: "center",
                            cursor: "pointer",
                          }}
                          onChange={(e) => {
                            setFile(e.target.files);
                          }}
                          name="files"
                          type="file"
                          required
                        />
                      </div>
                    </div>
                  </div>
                )} */}

                {/* <div className="col-12 p-0">
                  {addUserInBid === true ? (
                    <CardDetails
                      inputValue={inputValue}
                      getInputField={getInputField}
                    />
                  ) : (
                    ""
                  )}
                </div> */}

                <div className="col-12 col-md-12">
                  <div className="form-group form-check">
                    <label className="form-check-label">
                      <input
                        value={addUserInBid}
                        onChange={(e) => setAddUserInBid(e.target.checked)}
                        className="form-check-input"
                        type="checkbox"
                        // checked={addUserInBid}
                      />
                      I want the ability to bid on action?
                    </label>
                  </div>
                </div>

                {/* <div className="col-12">
                  {addUserInBid == true ? (
                    <label style={{ color: "#FFB100" }}>
                      I want the ability to bid on action?
                    </label>
                  ) : (
                    ""
                  )}
                </div> */}

                {/* <div className="col-12">
                  {addUserInBid === true ? (
                    <CardDetails
                      inputValue={inputValue}
                      getInputField={getInputField}
                    />
                  ) : (
                    ""
                  )}
                </div> */}

                <div className="col-12 col-md-12">
                  <div className="form-group form-check">
                    <label className="form-check-label">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value={acceptTerms}
                        onChange={(e) => setAcceptTerms(e.target.checked)}
                        // checked={acceptTerms}
                        required
                      />{" "}
                      I accept the Terms of Use and Privacy Notice
                    </label>
                  </div>
                </div>
                <div className="col-12 col-md-12">
                  <div className="form-group form-check">
                    <label className="form-check-label">
                      <input
                        value={signInMe}
                        onChange={(e) => setSignInMe(e.target.checked)}
                        checked={signInMe}
                        className="form-check-input"
                        type="checkbox"
                      />{" "}
                      Sign me up for the Gas Guzzlrs Daily Mail
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
                      Sign Up
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
                          Sign Up
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
                        Login
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
