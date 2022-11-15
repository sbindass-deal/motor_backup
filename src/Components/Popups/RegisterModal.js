import React, { useState } from "react";
import axios from "axios";
import { Modal } from "react-bootstrap";

function RegisterModal({ showReg, handleCloseReg }) {
  const url = process.env.REACT_APP_URL;

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("");
  const [creditcard, setCreditcard] = useState("");

  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [cvc, setCvc] = useState("");
  const [selectone, setSelectone] = useState("");

  // const[checkdata,setCheckdata]=useState(false)

  // const toggle=()=>{
  //   setCheckdata(!che)
  // }

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleUsername = (e) => {
    setUsername(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleCpassword = (e) => {
    setCpassword(e.target.value);
  };

  const handleName1 = (e) => {
    setName(e.target.value);
  };
  const handlePhone = (e) => {
    setPhone(e.target.value);
  };
  const handleAddress1 = (e) => {
    setAddress(e.target.value);
  };
  const handleZip = (e) => {
    setZip(e.target.value);
  };

  const handleCountry = (e) => {
    setCountry(e.target.value);
  };
  const handleCreditcard = (e) => {
    setCreditcard(e.target.value);
  };
  const handleMonth = (e) => {
    setMonth(e.target.value);
  };
  const handleYear = (e) => {
    setYear(e.target.value);
  };
  const handleCvc = (e) => {
    setCvc(e.target.value);
  };
  const handleSelectone = (e) => {
    setSelectone(e.target.value);
  };

  const handleApi = () => {
    axios
      .post(`${url}users`, {
        email: email, 
        username: username,
        password: password,
        cpassword: cpassword,
        name: name,
        phone: phone,
        address: address,
        zip: zip,
        country: country,
        creditcard: creditcard,
        month1: month,
        year1: year,
        cvc: cvc,
        selectone: selectone,
      })
      .then((result) => {
        handleCloseReg();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    // <!-- The RegisterModal -->
    <Modal
      show={showReg}
      onHide={handleCloseReg}
      className="modal fade"
      id="RegisterModal"
      centered
    >
      <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          {/* <!-- Modal Header --> */}
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

          {/* <!-- Modal body --> */}
          <div className="modal-body">
            <form onSubmit={handleApi}>
              <div className="row">
                <div className="col-12 col-md-6">
                  <div className="form-group">
                    <input
                      value={email}
                      onChange={handleEmail}
                      type="text"
                      name=""
                      className="field"
                      placeholder="Email"
                      required
                    />
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="form-group">
                    <input
                      value={username}
                      onChange={handleUsername}
                      type="text"
                      name=""
                      className="field"
                      placeholder="Username"
                      required
                    />
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="form-group">
                    <input
                      value={password}
                      onChange={handlePassword}
                      type="password"
                      name=""
                      className="field"
                      placeholder="Password"
                      required
                    />
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="form-group">
                    <input
                      value={cpassword}
                      onChange={handleCpassword}
                      type="password"
                      name=""
                      className="field"
                      placeholder="Confirm Password"
                      required
                    />
                  </div>
                </div>
                <div className="col-12 col-md-12">
                  <div className="form-group form-check">
                    <label
                      className="form-check-label"
                      data-toggle="collapse"
                      data-target="#wantBid"
                    >
                      <input className="form-check-input" type="checkbox"  /> I
                      want the ability to bid on auctions (optional)
                    </label>
                    <div id="wantBid" className="collapse pt-3">
                      <p className="m-0">
                        Bring a Trailer requires a credit card to bid.{" "}
                        <a href="javascript:void(0)">Click here</a> for more
                        info.
                      </p>
                      <p className="small">
                        There is no charge to register. Bring a Trailer will
                        only authorize that your card is valid.
                      </p>
                      <div className="row">
                        <div className="col-12 col-md-6">
                          <div className="form-group">
                            <input
                              value={name}
                              onChange={handleName1}
                              type="text"
                              name=""
                              className="field"
                              placeholder="Name (as it appears on your card)"
                              required
                            />
                          </div>
                        </div>
                        <div className="col-12 col-md-6">
                          <div className="form-group">
                            <input
                              value={phone}
                              onChange={handlePhone}
                              type="text"
                              name=""
                              className="field"
                              placeholder="Phone"
                              required
                            />
                          </div>
                        </div>
                        <div className="col-12 col-md-6">
                          <div className="form-group">
                            <input
                              value={address}
                              onChange={handleAddress1}
                              type="text"
                              name=""
                              className="field"
                              placeholder="Address"
                              required
                            />
                          </div>
                        </div>
                        <div className="col-12 col-md-6">
                          <div className="form-group">
                            <input
                              value={zip}
                              onChange={handleZip}
                              type="text"
                              name=""
                              className="field"
                              placeholder="Zip / Postal Code"
                              required
                            />
                          </div>
                        </div>
                        <div className="col-12 col-md-6">
                          <div className="form-group">
                            <input
                              value={country}
                              onChange={handleCountry}
                              type="text"
                              name=""
                              className="field"
                              placeholder="Country"
                              required
                            />
                          </div>
                        </div>
                        <div className="col-12 col-md-6">
                          <div className="form-group">
                            <input
                              value={creditcard}
                              onChange={handleCreditcard}
                              type="text"
                              name=""
                              className="field"
                              placeholder="Credit Card Number"
                              required
                            />
                          </div>
                        </div>
                        <div className="col-12 col-md-6">
                          <div className="form-group">
                            <label>Expiration</label>
                            <div className="row row_gap_5">
                              <div className="col-6">
                                <select
                                  className="field"
                                  value={month}
                                  onChange={handleMonth}
                                  required
                                >
                                  <option>1</option>
                                  <option>2</option>
                                  <option>3</option>
                                  <option>4</option>
                                  <option>5</option>
                                  <option>6</option>
                                  <option>7</option>
                                  <option>8</option>
                                  <option>9</option>
                                  <option>10</option>
                                  <option>11</option>
                                  <option>12</option>
                                </select>
                              </div>
                              <div className="col-6">
                                <select
                                  className="field"
                                  value={year}
                                  onChange={handleYear}
                                  required
                                >
                                  <option>2022</option>
                                  <option>2023</option>
                                  <option>2024</option>
                                  <option>2025</option>
                                  <option>2026</option>
                                  <option>2027</option>
                                  <option>2028</option>
                                  <option>2029</option>
                                  <option>2030</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-12 col-md-6">
                          <div className="form-group">
                            <label className="mobileOnlyHide">&nbsp;</label>
                            <input
                              value={cvc}
                              onChange={handleCvc}
                              type="text"
                              name=""
                              className="field"
                              placeholder="CVC"
                              required
                            />
                          </div>
                        </div>
                        <div className="col-12 col-md-6">
                          <div className="form-group">
                            <label>Where did you hear about Gasguzzlers?</label>
                            <select
                              className="field"
                              value={selectone}
                              onChange={handleSelectone}
                              required
                            >
                              <option>Select one</option>
                              <option>Facebook</option>
                              <option>Google</option>
                              <option>Instagram</option>
                              <option>Log time Gasguzzlers reader</option>
                              <option>Other</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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
                      Sign me up for the Gasguzzlers Daily Mail
                    </label>
                  </div>
                </div>
                <div className="col-12 col-md-12">
                  <div className="form-group">
                    <p className="small">
                      This site is protected by reCAPTCHA and the Google{" "}
                      <a href="javascript:void(0)"> Privacy Policy</a> and{" "}
                      <a href="javascript:void(0)">Terms of Service</a> apply
                    </p>
                  </div>
                </div>
                <div className="col-12 col-md-12">
                  <div className="form-group">
                    <button type="button" onClick={handleApi}  className="btn">
                      Register
                    </button>
                  </div>
                </div>
                <div className="col-12 col-md-12">
                  <div className="form-group">
                    <p className="m-0">
                      Already have an account?{" "}
                      <a
                        href="javascript:void(0)"
                        data-dismiss="modal"
                        data-toggle="modal"
                        data-target="#loginModal"
                      >
                        {" "}
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
