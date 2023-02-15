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
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
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
          window.location.reload(false);
        } else if (result.data.access_token && result.data.type === "1") {
          dispatch(authToken(result.data.access_token));
          notify("Admin Login successfully");
          dispatch(isAdmin(result.data.type));
          navigate("/admin");
          handleClose();
          setLoginLoading(false);
          window.location.reload(false);
        } else {
          notify("Incorrect Email or password");
          setLoginLoading(false);
        }
        console.log(111,result.data.message)
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
            <h4 className="modal-title">Login</h4>
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
            <form onSubmit={handleApi} autocomplete="off">
              <div className="col-md-12">
                <FormInput
                  value={email}
                  onChange={handleEmail}
                  name="email"
                  placeholder="enter email address"
                  type="email"
                  errorMessage="Please enter valid email address"
                  label="Email address"
                  required={true}
                />
              </div>
              <div className="col-md-12 eye_arrange">
                <FormInput
                  value={password}
                  onChange={handlePassword}
                  name="password"
                  placeholder="Enter Password"
                  errorMessage="Password cannot be empty or incorrect"
                  label="Password"
                  type={showPassWord ? "text" : "password"}
                  // pattern={`^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`}
                  required={true}
                />

                <div
                  className="eye_child eye_login"
                  onClick={() => setShowPassWord(!showPassWord)}
                >
                  {showPassWord ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </div>
              </div>
              <div className="col-md-12 fp">
                <div onClick={handlePasswordBtn} className="form-group">
                  <a href="javascript:void(0)">Forgot Password?</a>
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group">
                  {loginLoading ? (
                    <SmallSpinner />
                  ) : (
                    <button button="submit" className="btn w-100">
                      Login
                    </button>
                  )}
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group">
                  <p className="checRegistered">
                    Don't have an account ?
                    <span onClick={handleRegister}>
                      <a
                        className="signup"
                        style={{ marginLeft: "10px" }}
                        href="javascript:void(0)"
                      >
                        Sign Up
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
