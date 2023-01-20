import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { authToken, isAdmin, showModalClose } from "../../redux/reducers/login";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormInput from "../UI/FormInput";
import SmallSpinner from "../UI/SmallSpinner";
import { Checkbox } from "antd";
import CryptoJS from "crypto-js";

import { useNavigate } from "react-router-dom";
import { incVal } from "../UI/globaleVar";

function LoginModal({ handleShowReg, handleShowForgPass }) {
  const navigate = useNavigate();
  const [loginLoading, setLoginLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassWord, setShowPassWord] = useState(false);
  const logingUser = useSelector((state) => state.login);
  const show = logingUser.show;

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

  const handleClose = () => {
    dispatch(showModalClose());
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  // const handleClick = () => {
  //   const data = incVal(password)
  //   axios
  //     .post(`${process.env.REACT_APP_URL}/decryptnew`, {
  //       enc:data
  //     })
  //     .then(function (response) {
  //       console.log(response);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // };

  const handleApi = (e) => {
    e.preventDefault();
    console.log(11, incVal(password));

    setLoginLoading(true);
    const url = process.env.REACT_APP_URL;

    axios
      .post(`${url}login`, {
        email: email,
        password: password,
      })
      .then((result) => {
        if (result.data.access_token && result.data.type === null) {
          dispatch(authToken(result.data.access_token));
          notify("Login successfully");
          handleClose();
          setLoginLoading(false);
          // window.location.reload(false);
          console.log(111, result.data);
        } else if (result.data.access_token && result.data.type === "1") {
          dispatch(authToken(result.data.access_token));
          notify("Admin Login successfully");
          dispatch(isAdmin(result.data.type));
          navigate("/admin");
          handleClose();
          setLoginLoading(false);
          window.location.reload(false);
        }
      })
      .catch((error) => {
        notify(error.message);
        setLoginLoading(false);
      });
  };

  const handleRegister = () => {
    handleClose();
    handleShowReg();
  };
  const handlePasswordBtn = () => {
    handleClose();
    handleShowForgPass();
  };
  return (
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
            <h4 className="modal-title">Log In</h4>
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
            {/* <button onClick={handleClick} >click me</button> */}
            <form onSubmit={handleApi}>
              <div className="col-md-12">
                <FormInput
                  value={email}
                  onChange={handleEmail}
                  name="email"
                  placeholder="Enter Email"
                  type="email"
                  errorMessage="It should be a valid email address!"
                  label="Email"
                  required={true}
                />
              </div>
              <div className="col-md-12">
                <FormInput
                  value={password}
                  onChange={handlePassword}
                  name="password"
                  placeholder="Enter Password"
                  errorMessage="incorporate password!"
                  label="Password"
                  type={showPassWord ? "text" : "password"}
                  // pattern={`^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`}
                  required={true}
                />
              </div>
              <div className="col-md-12 fp">
                <Checkbox
                  style={{ color: "#F49D1A" }}
                  onClick={() => setShowPassWord(!showPassWord)}
                >
                  Show password
                </Checkbox>

                <div onClick={handlePasswordBtn} className="form-group">
                  <a href="javascript:void(0)">Forgot your password?</a>
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group">
                  {loginLoading ? (
                    <SmallSpinner />
                  ) : (
                    <button button="submit" className="btn w-100">
                      Log In
                    </button>
                  )}
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group">
                  <p className="checRegistered">
                    Not registered with GasGuzzlrs?
                    <span onClick={handleRegister}>
                      <a
                        className="signup"
                        style={{ marginLeft: "10px" }}
                        href="javascript:void(0)"
                      >
                        Sign up
                      </a>
                    </span>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default LoginModal;
