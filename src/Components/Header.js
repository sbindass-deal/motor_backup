import React, { useState } from "react";
import shibnobiMotors from "../Assets/images/blogo.svg";
import ForgotPasswordModal from "./Popups/ForgotPasswordModal";
import LoginModal from "./Popups/LoginModal";
import RegisterModal from "./Popups/RegisterModal";
import SearchModal from "./Popups/SearchModal";
// import {Link} from 'react-router-dom'
import { Modal, Button } from "react-bootstrap";

// icons
// import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/reducers/login";

function Header() {
  const dispatch = useDispatch();
  const logingUser = useSelector((state) => state.login);

  const [show, setShow] = useState(false);
  const [showReg, setShowReg] = useState(false);
  const [showForgPass, setShowForgPass] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCloseReg = () => setShowReg(false);
  const handleShowReg = () => setShowReg(true);

  const handleCloseForgPass = () => setShowForgPass(false);
  const handleShowForgPass = () => setShowForgPass(true);
  const logout = () => {
    dispatch(logoutUser());
  };
  return (
    <div>
      <header>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <nav className="navbar navbar-expand-md">
                <a className="navbar-brand" href="/">
                  <img width="150" src={shibnobiMotors} alt="shibnobiMotors" />
                </a>
                <button
                  className="navbar-toggler navbar-toggler-right collapsed"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navb"
                >
                  <span className="navbarToggler"></span>
                </button>

                <div className="collapse navbar-collapse" id="navb">
                  <ul className="navbar-nav ml-auto">
                    {!logingUser.login ? (
                      <li onClick={handleShow} className="nav-item">
                        <a
                          onClick={handleShow}
                          className="nav-link"
                          href="javascript:void(0)"
                        >
                          Submit a Vehicle
                        </a>
                      </li>
                    ) : (
                      <li className="nav-item">
                        <a className="nav-link" href="/submit">
                          Submit a Vehicle
                        </a>
                      </li>
                    )}
                    <li className="nav-item">
                      {/* <a className="nav-link" to="/auction">
                        Auctions
                      </a> */}

                      <div class="dropdown">
                        <a class="nav-link " href="#h">
                          Auctions
                        </a>
                        <div class="dropdown-content">
                          <a className="nav-link" href="auctionlive">
                            Live now
                          </a>
                          <a className="nav-link" href="auctionpremium">
                            Premium
                          </a>
                          <a className="nav-link" href="auctionresults">
                            Resullt
                          </a>
                        </div>
                      </div>
                    </li>
                    {/* {!logingUser.login ? (
                      <li onClick={handleShow} className="nav-item">
                        <a
                          onClick={handleShow}
                          className="nav-link"
                          href="javascript:void(0)"
                        >
                          Submit a Vehicle
                        </a>
                      </li>
                    ) : (
                      <li className="nav-item">
                        <a className="nav-link" href="/submit">
                          Submit a Vehicle
                        </a>
                      </li>
                    )} */}

                    <li className="nav-item">
                      <a className="nav-link" href="/works">
                        How Gas Guzzlrs Works
                      </a>
                    </li>
                    {!logingUser.login ? (
                      <li onClick={handleShow} className="nav-item">
                        <a
                          onClick={handleShow}
                          className="nav-link"
                          href="javascript:void(0)"
                          // data-toggle="modal"
                          // data-target="#loginModal"
                        >
                          Log In
                        </a>
                      </li>
                    ) : (
                      <li
                        onClick={logout}
                        style={{ cursor: "pointer" }}
                        className="nav-item"
                      >
                        <span className="nav-link">Logout</span>
                      </li>
                    )}
                    {/* <li className="nav-item">
                      <a className="nav-link" href="/#">
                        <i className="fa-solid fa-star"></i>
                      </a>
                    </li> */}

                    <li className="nav-item">
                      <a className="nav-link" href="accountinfo">
                        <i>
                          <AccountCircleIcon />
                        </i>
                      </a>
                    </li>

                    <li className="nav-item">
                      <a
                        className="nav-link"
                        href="javascript:void(0)"
                        data-toggle="modal"
                        data-target="#myModal"
                      >
                        <i className="fa-solid fa-magnifying-glass"></i>
                      </a>
                    </li>
                  </ul>
                  <ul className="navbar-nav mobileOnly">
                    <li className="nav-item">
                      <a className="nav-link" href="#">
                        Shipping
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#">
                        Makes and Models
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#">
                        Categories
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#">
                        Get Alerts
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#">
                        Charity Auctions
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#">
                        Gas Guzzlrs Features
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#">
                        Event Calendar
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#">
                        Car Raffle
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#">
                        About Gas Guzzlrs
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#">
                        Gear Store
                      </a>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
            <div className="col-12 mobileOnlyHide">
              <nav className="navbar navbar-expand secondNavbar">
                <div className="container-fluid">
                  <div
                    className="collapse navbar-collapse "
                    id="navbarNavDropdown"
                  >
                    <ul className="navbar-nav flex-wrap" id="nav">
                      <li className="nav-item">
                        <div class="dropdown">
                          <a class="nav-link " href="makeamodel">
                            Makes and Models
                          </a>
                        </div>
                      </li>
                      <li className="nav-item">
                        <li className="nav-item">
                          <a className="nav-link" href="showroom">
                            Show Room
                          </a>
                        </li>
                      </li>

                      <li className="nav-item">
                        <a className="nav-link" href="carraffle">
                          Car Raffle
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="feautres">
                          Gas Guzzlrs Features
                        </a>
                      </li>

                      <li className="nav-item">
                        <a className="nav-link" href="charity">
                          Charity Auctions
                        </a>
                      </li>

                      <li className="nav-item">
                        <a className="nav-link" href="getalerts">
                          Get Alerts
                        </a>
                      </li>

                      <div class="dropdown">
                        <a class="nav-link " href="#shipping">
                          Shipping
                        </a>
                        <div class="dropdown-content">
                          <a className="nav-link" href="shipping">
                            Get a quote
                          </a>
                          <a className="nav-link" href="myshipments">
                            My Shipment
                          </a>
                        </div>
                      </div>

                      <li className="nav-item">
                        <a className="nav-link" href="aboutshibnobi">
                          About Gas Guzzlrs
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          href="https://store.shibnobi.com/"
                          target={"_blank"}
                        >
                          Gas Guzzlrs Store
                        </a>
                      </li>

                      <li className="nav-item dropdown d-none">
                        <a
                          className="nav-link"
                          href="#"
                          id="navbarDropdownMenu"
                          role="button"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <span className="navbarToggler"></span>
                        </a>
                        <ul
                          className="dropdown-menu dropdown-menu-right secondNavDropdown"
                          aria-labelledby="navbarDropdownMenu"
                        ></ul>
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </header>

      <LoginModal
        show={show}
        handleClose={handleClose}
        handleShowReg={handleShowReg}
        handleShowForgPass={handleShowForgPass}
      />
      <RegisterModal showReg={showReg} handleCloseReg={handleCloseReg} />
      <SearchModal />
      <ForgotPasswordModal
        showForgPass={showForgPass}
        handleCloseForgPass={handleCloseForgPass}
      />
    </div>
  );
}

export default Header;
