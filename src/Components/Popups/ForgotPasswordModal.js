import React, { useState } from "react";
import axios from "axios";
import { Modal } from "react-bootstrap";
import FormInput from "../UI/FormInput";
import SmallSpinner from "../UI/SmallSpinner";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ForgotPasswordModal({ showForgPass, handleCloseForgPass }) {
  const [forgotPasswordLoading, setForgotPasswordLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
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

  const handleApi = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_URL}sendMail`, {
        email: email,
      })
      .then((result) => {
        console.log(result);
        notify(result);
      })
      .catch((error) => {});
  };

  return (
    // <!-- The forgotPasswordModal -->
    <Modal
      show={showForgPass}
      onHide={handleCloseForgPass}
      className="modal fade"
      id="forgotPasswordModal"
      centered
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          {/* <!-- Modal Header --> */}
          <div className="modal-header border-0">
            <h4 className="modal-title">Forgot your password</h4>
            <button
              onClick={handleCloseForgPass}
              type="button"
              className="close"
              data-dismiss="modal"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>

          {/* <!-- Modal body --> */}
          <div className="modal-body">
            {/* <p>Please enter your email</p> */}
            <form onSubmit={handleApi}>
              <div className="col-md-12">
                <div className="form-group">
                  <FormInput
                    value={email}
                    onChange={handleEmail}
                    name="email"
                    placeholder="Username or Email"
                    type="email"
                    errorMessage="It should be a valid email address!"
                    label="Please enter your registered email"
                    required={true}
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group">
                  {forgotPasswordLoading ? (
                    <SmallSpinner />
                  ) : (
                    <button type="submit" className="btn">
                      Get New Password
                    </button>
                  )}
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group">
                  <p>
                    Having trouble? Email us at{" "}
                    <a href="javascript:void(0)">Xavier@Gas Guzzlrs.com</a> with
                    any questions.
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

export default ForgotPasswordModal;
