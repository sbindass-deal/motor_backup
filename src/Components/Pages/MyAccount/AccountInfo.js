import React, { useEffect } from "react";
import MyAccountLeftNav from "./MyAccountLeftNav";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import FormInput from "../../UI/FormInput";
import CreditCard from "../CreditCard";
import StripeCheckout from "react-stripe-checkout";
import { useSelector } from "react-redux";

function AccountInfo() {
  const [userInfo, setUserinfo] = useState({});
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const userId = useSelector((state) => state);

  useEffect(() => {
    axios.get(process.env.REACT_APP_URL + `user`).then((res) => {
      if (res.data.data) {
        setUserinfo(res.data.data);
      } else {
        setUserinfo(userInfo);
      }
    });
  }, []);

  const onToken = (token, addresses) => {
    if (token !== null) {
      console.log(111, token);
      axios
        .post(`${process.env.REACT_APP_URL}savecard`, {
          token: token.id,
          last4: token.card.last4,
        })
        .then(function (response) {
          if (response.data.status === 200) {
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      // notify("Form submit successfully!");
    }
  };

  return (
    <div>
      <section className="ptb_80 pt_sm_50">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-4 col-lg-3">
              <div className="card_Gray mb-5 mb-md-0">
                <h5>My Account</h5>
                <hr />
                <MyAccountLeftNav />
              </div>
            </div>

            <div className="col-12 col-md-8 col-lg-9">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h3>Account Info</h3>
                <Link to="/editmyaccount" className="gry_btn px-3">
                  Edit
                </Link>
              </div>
              <hr />
              <ul className="labelList_">
                <li>
                  <div className="labelList_label">Username</div>
                  <div className="labelList_text">{userInfo.username}</div>
                </li>
                <li>
                  <div className="labelList_label">Phone</div>
                  <div className="labelList_text">{userInfo.mobile}</div>
                </li>
                <li>
                  <div className="labelList_label">Email Address</div>
                  <div className="labelList_text">
                    {userInfo.email} <br />
                    {/* <a href="#">Resend Verification Email</a> */}
                  </div>
                </li>
                <li>
                  {/* <button className="btn" onClick={handleShow}>Add Credit Card</button> */}

                  <StripeCheckout
                    className="Btn"
                    stripeKey={process.env.REACT_APP_STRIP_PUBLIC_KEY}
                    token={onToken}
                    email={userId.login.user.email}
                    name="Save Card Details For Bidding"
                    currency="USD"
                    ComponentClass="div"
                    panelLabel="Save"
                    // amount={
                    //   (parseInt(paymentDetails?.amount * 5, 10) / 100) * 100
                    // }
                  >
                    <button className="btn">Save Card Details</button>
                  </StripeCheckout>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

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
              <h4 className="modal-title">Card Details</h4>
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
              {/* <form  autocomplete="off">
                <div className="col-md-12">
                  <FormInput
                    
                    name="text"
                    placeholder="Enter Credit Number"
                    type="text"
                    errorMessage="Please Enter Credit Card Number"
                    label="Enter Credit Card Number"
                    required={true}
                  />
                </div>
                <div className="col-md-12 eye_arrange ">
                  <FormInput
                   
                    name="date"
                    placeholder="Enter expiry date"
                    errorMessage="Enter expiry date"
                    label="Enter Expiry Date"
                    type={"text"}
                    autocomplete="off"
                    // pattern={`^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`}
                    required={true}
                  />

                  <FormInput

                    name="text"
                    placeholder="Enter CVV"
                    errorMessage="Enter CVV Number"
                    label="Enter CVV"
                    type={"text"}
                    autocomplete="off"
                    // pattern={`^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`}
                    required={true}
                  />

                 
                <div className="col-md-12">
                  <div className="form-group">
                   
                      <button button="submit" className="btn w-100">
                        Submit
                      </button>
                  
                  </div>
                </div>
                </div>
              </form> */}
              <CreditCard />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default AccountInfo;
