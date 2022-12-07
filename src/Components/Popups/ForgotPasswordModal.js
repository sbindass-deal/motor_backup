import React, { useState } from "react";
import axios from "axios";
import { Modal } from "react-bootstrap";

function ForgotPasswordModal({ showForgPass, handleCloseForgPass }) {
  const [email, setEmail] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleApi = (e) => {
    e.preventDefault();
    axios
      .get(`${process.env.REACT_APP_URL}forgotpassword`)
      .then((result) => {
        // handleCloseForgPass();
        console.log("res", result);
      })
      .catch((error) => {
        console.log(error);
      });
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
            <p>Please enter your username or email</p>
            <form onSubmit={handleApi}>
              <div className="form-group">
                <input
                  value={email}
                  onChange={handleEmail}
                  type="email"
                  name="email"
                  className="field"
                  placeholder="Username or Email"
                  required
                />
              </div>
              <div className="form-group">
                <button type="submit" className="btn">
                  Get New Password
                </button>
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
