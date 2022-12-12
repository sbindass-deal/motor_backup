import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { auth, authToken, showModalClose } from "../../redux/reducers/login";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormInput from "../UI/FormInput";

function LoginModal({ handleShowReg, handleShowForgPass }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

  const handleApi = (e) => {
    e.preventDefault();
    const url = process.env.REACT_APP_URL;

    axios
      .post(`${url}login`, {
        email: email,
        password: password,
      })
      .then((result) => {
        if (result.data.access_token) {
          dispatch(authToken(result.data.access_token));
          notify("Login successfully");
          handleClose();
          window.location.reload(false);
        }
      })
      .catch((error) => {
        notify(error.message);
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
                  type="password"
                  pattern={`^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`}
                  required={true}
                />
              </div>

              <div onClick={handlePasswordBtn} className="form-group">
                <a href="javascript:void(0)">Forgot your password?</a>
              </div>
              <div className="form-group">
                <button className="btn">Log In</button>
              </div>
              <div className="form-group">
                <p>
                  Not registered with Gas guzzlrs?
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
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default LoginModal;
