import React, { useState } from "react";
import axios from "axios";
import { Button, Modal, Spinner } from "react-bootstrap";
import FormInput from "../UI/FormInput";
import SmallSpinner from "../UI/SmallSpinner";

function ForgotPasswordModal({ showForgPass, handleCloseForgPass }) {
  const [forgotPasswordLoading, setForgotPasswordLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleApi = (e) => {
    e.preventDefault();
    setForgotPasswordLoading(true);
    console.log("email");
    try {
      const res = axios.get(`${process.env.REACT_APP_URL}sendMail/${email}`);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
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
            {/* <p>Please enter your username or email</p> */}
            <form onSubmit={handleApi}>
              <div className="form-group">
                <FormInput
                  value={email}
                  onChange={handleEmail}
                  name="email"
                  placeholder="Username or Email"
                  type="email"
                  errorMessage="It should be a valid email address!"
                  label="Please enter your username or email"
                  required={true}
                />
              </div>
              <div className="form-group">
                {forgotPasswordLoading ? (
                  <SmallSpinner />
                ) : (
                  <button type="submit" className="btn">
                    Get New Password
                  </button>
                )}
              </div>
              <div className="form-group">
                <p>
                  Having trouble? Email us at{" "}
                  <a href="javascript:void(0)">Xavier@gasguzzlrs.com</a> with
                  any questions.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default ForgotPasswordModal;
