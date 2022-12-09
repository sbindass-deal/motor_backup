import React, { useState } from "react";
import shibnobiMotors from "../Assets/images/transparent.png";
import shibnobiMotorsW from "../Assets/images/lightmode-logo.png";
import sunIcon from "../Assets/images/icons8-sun.svg";
import smoonIcon from "../Assets/images/icons8-moon.svg";
import ForgotPasswordModal from "./Popups/ForgotPasswordModal";
import LoginModal from "./Popups/LoginModal";
import RegisterModal from "./Popups/RegisterModal";
import SearchModal from "./Popups/SearchModal";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useDispatch, useSelector } from "react-redux";
import { authToken, showModal, showModalClose } from "../redux/reducers/login";
import { toast } from "react-toastify";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { changeMode } from "../redux/reducers/dayAndNightMode";

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const notify = (val) =>
    toast.warn(val, {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  const [showSearchModal, setShowSearchModal] = useState(false);

  const dispatch = useDispatch();
  const logingUser = useSelector((state) => state);
  console.log("hello11", logingUser.dayAndNightMode.mode);
  const [showReg, setShowReg] = useState(false);
  const [showForgPass, setShowForgPass] = useState(false);

  const handleClose = () => {
    dispatch(showModalClose());
  };
  const handleShow = () => {
    dispatch(showModal());
  };

  const handleCloseReg = () => setShowReg(false);
  const handleShowReg = () => setShowReg(true);

  const handleCloseForgPass = () => setShowForgPass(false);
  const handleShowForgPass = () => setShowForgPass(true);
  const handleCloseModal = () => {
    setShowSearchModal(false);
  };
  const logout = () => {
    dispatch(authToken(null));
    notify("Logout successfully ! 😎🤐");
    navigate("/");
  };
  return (
    <div>
      <header>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <nav className="navbar navbar-expand-md">
                <Link className="navbar-brand" to="/">
                  <img
                    src={shibnobiMotors}
                    alt="shibnobiMotors"
                    className="darkLogo"
                  />
                  <img
                    src={shibnobiMotorsW}
                    alt="shibnobiMotors"
                    className="whiteLogo"
                  />
                </Link>
                <button
                  className="navbar-toggler navbar-toggler-right collapsed"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navb"
                >
                  <span className="navbarToggler"></span>
                </button>

                <div className="collapse navbar-collapse toNv" id="navb">
                  <ul className="navbar-nav ml-auto">
                    {/* <li onClick={handleShow} className="nav-item">
                        <Link className="nav-link">Submit a Vehicle</Link>
                      </li> */}
                    <li className="nav-item">
                      <Link
                        className={`nav-link ${
                          location.pathname === "/submit" && "navActive"
                        }`}
                        to="/submit"
                      >
                        Submit a Vehicle
                      </Link>
                    </li>
                    <li className="nav-item">
                      {/* <Link className="nav-link" to="/auction">
                        Auctions
                      </Link> */}

                      <div className="dropdown">
                        <Link
                          className={`nav-link ${
                            location.pathname === "/auctionlive" && "navActive"
                          }`}
                          to="#"
                        >
                          Auctions
                        </Link>
                        <div className="dropdown-content">
                          <Link className="nav-link" to="/auctionlive">
                            Live now
                          </Link>
                          {/* <Link className="nav-link" to="/auctionpremium">
                            Premium
                          </Link>
                          <Link className="nav-link" to="/auctionresults">
                            Resullt
                          </Link> */}
                        </div>
                      </div>
                    </li>
                    {/* {!logingUser.login.login ? (
                      <li onClick={handleShow} className="nav-item">
                        <Link
                          onClick={handleShow}
                          className="nav-link"
                          to="javascript:void(0)"
                        >
                          Submit a Vehicle
                        </Link>
                      </li>
                    ) : (
                      <li className="nav-item">
                        <Link className="nav-link" to="/submit">
                          Submit a Vehicle
                        </Link>
                      </li>
                    )} */}

                    <li className="nav-item">
                      <Link
                        className={`nav-link ${
                          location.pathname === "/works" && "navActive"
                        }`}
                        to="/works"
                      >
                        How its Works
                      </Link>
                    </li>
                    {!logingUser.login.token ? (
                      <li onClick={handleShow} className="nav-item">
                        <Link
                          onClick={handleShow}
                          className="nav-link"
                          // to="javascript:void(0)"
                          // data-toggle="modal"
                          // data-target="#loginModal"
                        >
                          Log In
                        </Link>
                      </li>
                    ) : (
                      <li
                        onClick={logout}
                        style={{ cursor: "pointer" }}
                        className="nav-item"
                      >
                        <Link className="nav-link">Logout</Link>
                      </li>
                    )}
                    {/* <li className="nav-item">
                      <Link className="nav-link" to="/">
                        <i className="fa-solid fa-star"></i>
                      </Link>
                    </li> */}

                    <li className="nav-item afterLogin">
                      {logingUser.login.token && (
                        <Link
                          className={`nav-link ${
                            location.pathname === "/accountinfo" && "navActive"
                          }`}
                          to="/accountinfo"
                        >
                          <AccountCircleIcon /> <br />
                          <span>{logingUser.login.user.username}</span>
                        </Link>
                      )}
                    </li>
                    <li
                      onClick={() => setShowSearchModal(true)}
                      className="nav-item"
                      style={{ cursor: "pointer" }}
                    >
                      <Link
                        className="nav-link"
                        // to="javascript:void(0)"
                        // data-toggle="modal"
                        // data-target="#myModal"
                      >
                        <i className="fa-solid fa-magnifying-glass"></i>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <button
                        className="sunMoonBtn"
                        onClick={() => dispatch(changeMode())}
                      >
                        {logingUser.dayAndNightMode.mode ? (
                          <img src={sunIcon} />
                        ) : (
                          <img src={smoonIcon} />
                        )}
                      </button>
                    </li>
                  </ul>
                  <ul className="navbar-nav mobileOnly">
                    <li className="nav-item">
                      <Link className="nav-link" to="/">
                        Shipping
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/">
                        Makes and Models
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/">
                        Categories
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/">
                        Get Alerts
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/">
                        Charity Auctions
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/">
                        Features
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/">
                        Event Calendar
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/">
                        Car Raffle
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/">
                        Gas guzzlrs
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/">
                        Gear Store
                      </Link>
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
                      {/* <li className="nav-item">
                        <div className="dropdown">
                          <Link
                            className={`nav-link`}
                            style={{
                              color: `${
                                location.pathname === "/makeamodel"
                                  ? "#EF6031"
                                  : ""
                              }`,
                            }}
                            to="/makeamodel"
                          >
                            Makes and Models
                          </Link>
                        </div>
                      </li> */}

                      <li className="nav-item">
                        <Link
                          className="nav-link"
                          style={{
                            color: `${
                              location.pathname === "/showroom" ? "#EF6031" : ""
                            }`,
                          }}
                          to="/showroom"
                        >
                          Showroom
                        </Link>
                      </li>

                      <li className="nav-item">
                        {true ? (
                          <Link
                            style={{
                              color: `${
                                location.pathname === "/carraffle"
                                  ? "#EF6031"
                                  : ""
                              }`,
                            }}
                            className="nav-link"
                            to="/carraffle"
                          >
                            Raffle
                          </Link>
                        ) : (
                          <Link
                            // onClick={handleShow}
                            className="nav-link"
                          >
                            Raffle
                          </Link>
                        )}
                      </li>
                      <li className="nav-item">
                        <Link
                          className="nav-link"
                          style={{
                            color: `${
                              location.pathname === "/feautres" ? "#EF6031" : ""
                            }`,
                          }}
                          to="/feautres"
                        >
                          Features
                        </Link>
                      </li>

                      <li className="nav-item">
                        <Link
                          className="nav-link"
                          style={{
                            color: `${
                              location.pathname === "/charity" ? "#EF6031" : ""
                            }`,
                          }}
                          to="/charity"
                        >
                          Charity Auctions
                        </Link>
                      </li>

                      {/* <li className="nav-item">
                        <Link
                          className="nav-link"
                          style={{
                            color: `${
                              location.pathname === "/getalerts"
                                ? "#EF6031"
                                : ""
                            }`,
                          }}
                          to="/getalerts"
                        >
                          Get Alerts
                        </Link>
                      </li> */}

                      <div className="dropdown">
                        <Link
                          className="nav-link"
                          style={{
                            color: `${
                              location.pathname === "/shipping" ||
                              location.pathname === "/myshipments"
                                ? "#EF6031"
                                : ""
                            }`,
                          }}
                          to="#"
                        >
                          Shipping
                        </Link>
                        <div className="dropdown-content">
                          {/* <Link className="nav-link" to="/shipping"> */}
                          <a
                            href="https://www.iecstransport.com/"
                            target="_blank"
                          >
                            Get a quote
                          </a>
                          {/* </Link> */}
                          {/* <Link className="nav-link" to="https://www.iecstransport.com/"> */}
                          <a
                            href="https://www.iecstransport.com/"
                            target="_blank"
                          >
                            My Shipment
                          </a>

                          {/* </Link> */}
                        </div>
                      </div>

                      <li className="nav-item">
                        <Link
                          className="nav-link"
                          style={{
                            color: `${
                              location.pathname === "/aboutshibnobi"
                                ? "#EF6031"
                                : ""
                            }`,
                          }}
                          to="/aboutshibnobi"
                        >
                          About Gas guzzlrs
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          className="nav-link"
                          style={{
                            color: `${
                              location.pathname === "/faq" ? "#EF6031" : ""
                            }`,
                          }}
                          to="/faq"
                        >
                          Faq
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          className="nav-link"
                          // to="https://store.shibnobi.com/"
                          // target={"_blank"}
                        >
                          Store
                        </Link>
                      </li>

                      <li className="nav-item dropdown d-none">
                        <Link
                          className="nav-link"
                          to="/"
                          id="navbarDropdownMenu"
                          role="button"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <span className="navbarToggler"></span>
                        </Link>
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
        handleClose={handleClose}
        handleShowReg={handleShowReg}
        handleShowForgPass={handleShowForgPass}
      />
      <RegisterModal showReg={showReg} handleCloseReg={handleCloseReg} />
      <SearchModal
        handleCloseModal={handleCloseModal}
        showSearchModal={showSearchModal}
      />
      <ForgotPasswordModal
        showForgPass={showForgPass}
        handleCloseForgPass={handleCloseForgPass}
      />
    </div>
  );
}

export default Header;
