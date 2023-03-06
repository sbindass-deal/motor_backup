import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { auth, showModalClose } from "../../redux/reducers/login";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  const handleApi = () => {
    const url = process.env.REACT_APP_URL;

    axios
      .post(`${url}login`, {
        email: email,
        password: password,
      })
      .then((result) => {
        if (result.data.message === "Login Successful") {
          if (result.data.user) {
            dispatch(auth(result.data.user));
          }
          notify("Login successfully ! 👍");
          handleClose();
        } else {
          notify("Login fail! Please enter valid userId and password");
          handleClose();
        }
      })
      .catch((error) => {
        console.log(error);
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
    // <!-- The loginModal -->
    <Modal
      show={show}
      onHide={handleClose}
      className="modal fade"
      id="loginModal"
      centered
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          {/* <!-- Modal Header --> */}
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

          {/* <!-- Modal body --> */}
          <div className="modal-body">
            <form>
              <div className="form-group">
                <input
                  value={email}
                  onChange={handleEmail}
                  type="text"
                  name="email"
                  minLength={4}
                  maxLength={31}
                  className="field"
                  placeholder="Email"
                />
              </div>
              <div className="form-group">
                <input
                  value={password}
                  onChange={handlePassword}
                  minLength={4}
                  maxLength={12}
                  type="password"
                  name="password"
                  className="field"
                  placeholder="Password"
                />
              </div>
              <div onClick={handlePasswordBtn} className="form-group">
                <a
                  href="javascript:void(0)"
                  // data-dismiss="modal"
                  // data-toggle="modal"
                  // data-target="#forgotPasswordModal"
                >
                  Forgot your password?
                </a>
              </div>
              <div className="form-group">
                <button onClick={handleApi} type="button" className="btn">
                  Log In
                </button>
              </div>
              <div className="form-group">
                <p>
                  Not registered with Gas guzzlrs?
                  <span onClick={handleRegister}>
                    <a
                      className="signup"
                      style={{ marginLeft: "10px" }}
                      href="javascript:void(0)"
                      // data-dismiss="modal"
                      // data-toggle="modal"
                      // data-target="#RegisterModal"
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
