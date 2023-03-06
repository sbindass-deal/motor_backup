import React, { useState } from "react";
import axios from "axios";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { showModal } from "../../redux/reducers/login";

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
  const [name, setName] = useState();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState();
  const [username, setUsername] = useState("");
  const [delair, setDelair] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);

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
  const handlePasswordAndCpassword = () => {
    setPasswordError(false);
    console.log("buller");
  };
  const handleApi = (e) => {
    e.preventDefault();
    console.log(password, cpassword);
    if (password === cpassword) {
      axios
        .post(`${url}users`, {
          email: email,
          username: username,
          password: password,
          cpassword: cpassword,
          name: name,
          mobile: phone,
          dealer: delair,
        })
        .then((result) => {
          handleCloseReg();
          notify("Register Successfully!");
        })
        .catch((error) => {
          console.log(error);
          notify("Register fail somthing wrong please try again !");
        });
    } else {
      setPasswordError(true);
    }
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
                      name="name"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                      onKeyPress={(event) => {
                        if (!/[a-zA-Z]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                      type="text"
                      minLength={2}
                      maxLength={25}
                      className="field"
                      placeholder="name"
                      required
                    />
                  </div>
                </div>

                <div className="col-12 col-md-6">
                  <div className="form-group">
                    <input
                      value={email}
                      onChange={handleEmail}
                      minLength={5}
                      maxLength={31}
                      type="email"
                      name="email"
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
                      name="userName"
                      minLength={4}
                      maxLength={15}
                      className="field"
                      placeholder="Username"
                      autoComplete="off"
                      required
                    />
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="form-group">
                    <input
                      value={phone}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "");
                        setPhone(value);
                      }}
                      type="text"
                      minLength={10}
                      maxLength={12}
                      name="phone"
                      className="field"
                      placeholder="Phone number"
                      required
                    />
                  </div>
                </div>

                <div className="col-12 col-md-6">
                  <div className="form-group">
                    <select
                      value={delair}
                      onChange={(e) => setDelair(e.target.value)}
                      name="dealer"
                      className="field"
                      required
                    >
                      <option selected disabled value="">
                        Are you a dealer?
                      </option>
                      <option>Yes</option>
                      <option>No</option>
                    </select>
                  </div>
                </div>

                <div className="col-12 col-md-6">
                  <div className="form-group">
                    <input
                      value={password}
                      onChange={handlePassword}
                      type="password"
                      name="password"
                      onFocus={handlePasswordAndCpassword}
                      className="field"
                      minLength={4}
                      maxLength={12}
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
                      minLength={4}
                      maxLength={12}
                      onFocus={handlePasswordAndCpassword}
                      className="field"
                      placeholder="Confirm Password"
                      required
                    />
                  </div>
                  {passwordError && password !== cpassword && (
                    <p className="text-danger">
                      password & confirm password should same!
                    </p>
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
                      Sign me up for the Gas guzzlrs Daily Mail
                    </label>
                  </div>
                </div>
                {/* <div className="col-12 col-md-12">
                  <div className="form-group form-check">
                    <label className="form-check-label">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        required
                      />{" "}
                      I accept the Terms of Use and Privacy Notice(Optional)
                    </label>
                  </div>
                </div>
                <div className="container">
                  <div className="row">
                    <div className="col-12 col-md-6">
                      <div className="form-group">
                        <input
                          type="text"
                          name="cartNumber"
                          className="field"
                          minLength={4}
                          maxLength={16}
                          placeholder="Cart number"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="form-group">
                        <input
                          type="text"
                          name="account"
                          className="field"
                          minLength={2}
                          maxLength={16}
                          placeholder="Account Number"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="form-group">
                        <input
                          type="text"
                          name="address"
                          className="field"
                          minLength={4}
                          maxLength={100}
                          placeholder="Address"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="form-group">
                        <input
                          type="text"
                          name="country"
                          className="field"
                          minLength={4}
                          maxLength={50}
                          placeholder="Country"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div> */}
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
                  </div>
                </div>
                <div className="col-12 col-md-12">
                  <div className="form-group">
                    <p className="m-0">
                      Already have an account?&nbsp;&nbsp;
                      <a
                        onClick={() => dispatch(showModal())}
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
