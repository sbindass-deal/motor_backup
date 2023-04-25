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
import { noImage, notify, strToHtml } from "../../UI/globaleVar";
import parse from "html-react-parser";
import { Image } from "antd";
import userProfile from "../../../Assets/images/userProfile.jpeg"

// import { Image } from "antd";
import { Avatar, Image, Space } from "antd";
function AccountInfo() {
  const userId = useSelector((state) => state);
  const [userInfo, setUserinfo] = useState({});
  const [getImage, setGetImage] = useState([]);
  const [isPrivateOrPublic, setIsPrivateOrPublic] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fetchUsrApi = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_URL}user`);
      if (res.data.data) {
        setUserinfo(res.data.data);
        console.log(userInfo)
        setIsPrivateOrPublic(res.data.data.published == 0 ? false : true);
      } else {
        setUserinfo(userInfo);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUsrApi();
  }, []);

  const onToken = (token, addresses) => {
    if (token !== null) {
      axios
        .post(`${process.env.REACT_APP_URL}savecard`, {
          token: token.id,
          last4: token.card.last4,
          replace: `${userInfo.cn_no ? 1 : 0}`,
        })
        .then(function (response) {
          if (response.data.status === 200) {
            fetchUsrApi();
            notify(response.data.message, response.data.status);
          }
        })
        .catch(function (error) {
          notify(error.message, error.status);
        });
    }
  };

  const handlePrivateOrPublic = (e) => {
    setIsPrivateOrPublic(e.target.checked);
    axios
      .post(`${process.env.REACT_APP_URL}profile_public`, {
        publish: `${isPrivateOrPublic == true ? 0 : 1}`,
      })
      .then(function (response) {
        if (response.data.status === 200) {
          fetchUsrApi();
          notify(response.data.message, response.data.status);
        } else {
          notify(response.data.message, response.data.status);
        }
      })
      .catch(function (error) {
        notify(error.message, error.status);
      });
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
                <div className="d-flex align-items-center">
                  {/* {userInfo.dealer == "No" && (
                    <div className="tg-item mx-4">
                      <input
                        className="tgl tgl-skewed"
                        name="news"
                        onChange={(e) => handlePrivateOrPublic(e)}
                        id="cb1"
                        type="checkbox"
                        checked={isPrivateOrPublic}
                      />
                      <label
                        className="tgl-btn"
                        data-tg-off="Private"
                        data-tg-on="Public"
                        for="cb1"
                      ></label>
                    </div>
                  )} */}
                  {/* <Link to="/editmyaccount" className="gry_btn px-3">
                    Edit
                  </Link> */}
                </div>
              </div>
              <hr />
              <div className="row">
              <div className="col-6">
              <div className="UserImZ mt-4">
                      <Space direction="vertical" size={16}>
                        <Space wrap size={16}>
                          <Avatar
                            size={100}
                            icon={
                              <img
                                className="slidImg"
                                loading="lazy"
                                src={
                                  userInfo?.logo &&
                                  `${process.env.REACT_APP_URL}/${userInfo?.logo[0]?.logo}`
                                }
                                onError={({ currentTarget }) => {
                                  currentTarget.onError = null;
                                  currentTarget.src = noImage;
                                }}
                                alt="Logo"
                              />
                            }
                          />
                        </Space>
                        <h2 className="mt-2 mb-3">
                      {userInfo.name}
                      <Link to="/editmyaccount">
                        <i class="fa-solid fa-pen-to-square"></i>
                      </Link>
                    </h2>
                      </Space>
                    </div>
              <ul className="labelList_">
                <li className="avtar">
                  <span>
                    <img src={userProfile} /> 
                  </span>
                </li>
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
               
                {/* <li>
                  <div className="labelList_label">Title</div>
                  <div className="labelList_text">
                    {userInfo.dealer_title} <br />
                  </div>
                </li> */}
                {/* <li>
                  <div className="labelList_label">About us</div>
                  <div className="labelList_text">
                    {userInfo.about_us && parse(userInfo.about_us, strToHtml)}
                  </div>
                </li> */}
                {/* <li>
                  <div className="labelList_label">Description</div>
                  <div className="labelList_text">
                    {userInfo?.dealerDescription &&
                      parse(userInfo?.dealerDescription, strToHtml)}
                  </div>
                </li> */}
                <li>
                  <div className="labelList_label">Card Number</div>
                  {userInfo.cn_no !== null && (
                    <div className="labelList_text">
                      ************{userInfo.cn_no} <br />
                    </div>
                  )}
                </li>
                {/* ==================== */}
              

                <li>
                  {/* <button className="btn" onClick={handleShow}>Add Credit Card</button> */}

                  <StripeCheckout
                    className="Btn"
                    stripeKey={process.env.REACT_APP_STRIP_PUBLIC_KEY}
                    token={onToken}
                    email={userInfo.email}
                    name="Save Card Details For Payment"
                    currency="USD"
                    ComponentClass="div"
                    panelLabel="Save"
                    // amount={
                    //   (parseInt(paymentDetails?.amount * 5, 10) / 100) * 100
                    // }
                  >
                    <button className="btn">
                      {userInfo.cn_no
                        ? "Update Card Details"
                        : "Save Card Details"}
                    </button>
                  </StripeCheckout>
                </li>
                {/* ======================== */}

                {false && (
                  <>
                    <h6>Logo</h6>
                    <hr />
                    <div className="imgCross">
                      <Image.PreviewGroup>
                        {userInfo?.logo?.map((curElem, i) => {
                          return (
                            <span key={i}>
                              <Image
                                loading="lazy"
                                src={`${process.env.REACT_APP_URL}/${curElem?.logo}`}
                                onError={({ currentTarget }) => {
                                  currentTarget.onError = null;
                                  currentTarget.src = noImage;
                                }}
                                alt="Maskgroup1"
                              />
                            </span>
                          );
                        })}
                      </Image.PreviewGroup>
                    </div>
                    <h6 className="mt-3">Banner</h6>
                    <hr />
                    <div className="imgCross">
                      <Image.PreviewGroup>
                        {userInfo?.gallery?.map((curElem, i) => {
                          return (
                            <span key={i}>
                              <Image
                                loading="lazy"
                                src={`${process.env.REACT_APP_URL}/${curElem?.logo}`}
                                onError={({ currentTarget }) => {
                                  currentTarget.onError = null;
                                  currentTarget.src = noImage;
                                }}
                                alt="Maskgroup1"
                              />
                            </span>
                          );
                        })}
                      </Image.PreviewGroup>
                    </div>
                    <h6 className="mt-3">Gallery</h6>
                    <hr />

                    <div className="imgCross">
                      <Image.PreviewGroup>
                        {userInfo?.banner?.map((curElem, i) => {
                          return (
                            <span key={i}>
                              <Image
                                loading="lazy"
                                src={`${process.env.REACT_APP_URL}/${curElem?.logo}`}
                                onError={({ currentTarget }) => {
                                  currentTarget.onError = null;
                                  currentTarget.src = noImage;
                                }}
                                alt="Maskgroup1"
                              />
                            </span>
                          );
                        })}
                      </Image.PreviewGroup>
                    </div>
                  </>
                )}
              </ul>

              </div>
              <div className="col-6">
                        <img src=""/>
              </div>
              </div>
            
              

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
