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
import { showModalLogin, showModalClose, reset } from "../redux/reducers/login";
import { toast } from "react-toastify";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { changeMode } from "../redux/reducers/dayAndNightMode";
import Searchbar from "./UI/Searchbar";

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showNav, setShowNav] = useState(false);

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
  const [showReg, setShowReg] = useState(false);
  const [showForgPass, setShowForgPass] = useState(false);

  const handleClose = () => {
    dispatch(showModalClose());
  };
  const handleShow = () => {
    dispatch(showModalLogin());
  };

  const handleCloseReg = () => {
    setShowReg(false);
    dispatch(showModalClose());
  };
  const handleShowReg = () => setShowReg(true);

  const handleCloseForgPass = () => setShowForgPass(false);
  const handleShowForgPass = () => setShowForgPass(true);
  const handleCloseModal = () => {
    setShowSearchModal(false);
  };
  const logout = () => {
    dispatch(reset());
    notify("Logout successfully ! 😎🤐");
    navigate("/");
    window.location.reload(false);
  };

  return (
    <>
      <header>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 p-0">
              <nav className="navbar navbar-expand-md">
                <Link
                  className="navbar-brand"
                  to="/"
                  onClick={() => setShowNav(false)}
                >
                  <img
                    src={shibnobiMotors}
                    alt="shibnobiMotors"
                    className="darkLogo"
                    loading="lazy"
                  />
                  <img
                    src={shibnobiMotorsW}
                    alt="shibnobiMotors"
                    className="whiteLogo"
                    loading="lazy"
                  />
                </Link>

                {/* mobile view start */}
                <div className="dddd">
                  {showNav ? (
                    <button
                      className="navbar-toggler navbar-toggler-right"
                      type="button"
                      onClick={() => setShowNav(false)}
                    >
                      <span className="navbarToggler"></span>
                    </button>
                  ) : (
                    <button
                      className="navbar-toggler navbar-toggler-right collapsed"
                      type="button"
                      onClick={() => setShowNav(true)}
                    >
                      <span className="navbarToggler"></span>
                    </button>
                  )}

                  <div
                    className={`${
                      showNav ? "show" : ""
                    } collapse navbar-collapse mobileOnly hidemenu`}
                    id="navb"
                  >
                    <ul className="navbar-nav mobileOnly">
                      <li className="nav-item iconMb">
                        <Searchbar />
                      </li>
                      <li className="nav-item afterLogin iconMb">
                        <div className="dropdown">
                          <AccountCircleIcon />

                          <div className="dropdown-content">
                            {logingUser.login.token && (
                              <Link
                                className={`nav-link ${
                                  location.pathname === "/accountinfo" &&
                                  "navActive"
                                    ? "active"
                                    : ""
                                }`}
                                to="/accountinfo"
                                onClick={() => setShowNav(false)}
                              >
                                My Account
                                <br />
                              </Link>
                            )}
                            {!logingUser.login.token ? (
                              <li
                                onClick={() => {
                                  handleShow();
                                  setShowNav(false);
                                }}
                                className="nav-item"
                              >
                                <Link className="nav-link">Login</Link>
                              </li>
                            ) : (
                              <li
                                onClick={() => {
                                  logout();
                                  setShowNav(false);
                                }}
                                style={{ cursor: "pointer" }}
                                className="nav-item"
                              >
                                <Link className="nav-link">Logout</Link>
                              </li>
                            )}

                            {logingUser.login.token &&
                              logingUser.login.admin && (
                                <li className="nav-item">
                                  <Link
                                    className={`nav-link ${
                                      location.pathname ===
                                        "/vehicle-submission" && "navActive"
                                    }`}
                                    to="/vehicle-submission"
                                    onClick={() => setShowNav(false)}
                                  >
                                    Admin
                                  </Link>
                                </li>
                              )}
                            {logingUser.login.token &&
                              !logingUser.login.admin && (
                                <li className="nav-item">
                                  <Link
                                    className={`nav-link ${
                                      location.pathname === "/orders-cart" &&
                                      "navActive"
                                    }`}
                                    to="/orders-cart"
                                    onClick={() => setShowNav(false)}
                                  >
                                    My Orders
                                  </Link>
                                </li>
                              )}
                          </div>
                        </div>
                      </li>

                      <li className="nav-item">
                        <Link
                          className={`nav-link ${
                            location.pathname === "/about" ? "active" : ""
                          }`}
                          style={{
                            color: `${
                              location.pathname === "/about" ? "#EF6031" : ""
                            }`,
                          }}
                          to="/about"
                          onClick={() => setShowNav(false)}
                        >
                          About
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          className={`nav-link ${
                            location.pathname === "/classifiedaddList" &&
                            "navActive"
                              ? "active"
                              : ""
                          }`}
                          to="/classifiedaddList"
                          onClick={() => setShowNav(false)}
                        >
                          Classifieds
                        </Link>
                      </li>

                      <li className="nav-item">
                        <Link
                          className={`nav-link ${
                            location.pathname === "/works" && "navActive"
                              ? "active"
                              : ""
                          }`}
                          to="/works"
                          onClick={() => setShowNav(false)}
                        >
                          How it Works
                        </Link>
                      </li>

                      {/* day and night mode start */}
                      <li className="nav-item">
                        <button
                          className="sunMoonBtn"
                          onClick={() => dispatch(changeMode())}
                        >
                          {logingUser.dayAndNightMode.mode ? (
                            <img src={sunIcon} loading="lazy" />
                          ) : (
                            <img src={smoonIcon} loading="lazy" />
                          )}
                        </button>
                      </li>
                      {/* day and night mode end */}
                      <li className="nav-item">
                        <Link
                          className={`nav-link ${
                            location.pathname === "/submit" && "navActive"
                          }`}
                          to="/submit"
                          onClick={() => setShowNav(false)}
                        >
                          List Your Vehicle
                        </Link>
                      </li>
                      <li className="nav-item">
                        <div className="dropdown">
                          <Link
                            className={`nav-link ${
                              location.pathname === "/auctionlive" &&
                              "navActive"
                            }`}
                            to="#"
                          >
                            Auctions
                          </Link>
                          <div className="dropdown-content">
                            <Link
                              className=""
                              to="/auctionlive"
                              onClick={() => setShowNav(false)}
                            >
                              Live now
                            </Link>
                          </div>
                        </div>
                      </li>
                      <li className="nav-item">
                        <Link
                          className="nav-link"
                          to="/showroom"
                          onClick={() => setShowNav(false)}
                        >
                          Showrooms
                        </Link>
                      </li>
                      <li className="nav-item">
                        {true ? (
                          <Link
                            className="nav-link"
                            to="/carraffle"
                            onClick={() => setShowNav(false)}
                          >
                            Raffles
                          </Link>
                        ) : (
                          <Link className="nav-link">Raffles</Link>
                        )}
                      </li>
                      <li className="nav-item">
                        <Link
                          className="nav-link"
                          to="/feautres"
                          onClick={() => setShowNav(false)}
                        >
                          Featured
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          className="nav-link "
                          to="/charity"
                          onClick={() => setShowNav(false)}
                        >
                          Charity Auctions
                        </Link>
                      </li>
                      <li className="nav-item">
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
                            to="/shipping"
                            onClick={() => setShowNav(false)}
                          >
                            Shipping
                          </Link>
                          <div className="dropdown-content">
                            <a
                              href="https://www.iecstransport.com/"
                              target="_blank"
                              onClick={() => setShowNav(false)}
                            >
                              Get a quote
                            </a>
                            <a
                              href="https://www.iecstransport.com/"
                              target="_blank"
                              onClick={() => setShowNav(false)}
                            >
                              My Shipment
                            </a>
                          </div>
                        </div>
                      </li>
                      <li className="nav-item">
                        <Link
                          className="nav-link"
                          // style={{
                          //   color: `${
                          //     location.pathname === "/faq" ? "#EF6031" : ""
                          //   }`,
                          // }}
                          to="/faq"
                          onClick={() => setShowNav(false)}
                        >
                          FAQ
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          className="nav-link"
                          // style={{
                          //   color: `${
                          //     location.pathname === "/shop" ? "#EF6031" : ""
                          //   }`,
                          // }}
                          to="/shop"
                          onClick={() => setShowNav(false)}
                        >
                          Gear
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                {/* mobile view end */}

                <div className="toNv" id="">
                  <ul className="navbar-nav ml-auto">
                    <li className="nav-item" style={{ cursor: "pointer" }}>
                      <Link className="nav-link">
                        <Searchbar />
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link
                        className="nav-link"
                        style={{
                          color: `${
                            location.pathname === "/about" ? "#000" : ""
                          }`,
                        }}
                        to="/about"
                      >
                        About
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link
                        className={`nav-link ${
                          location.pathname === "/works" && "navActive"
                        }`}
                        to="/works"
                      >
                        How it Works
                      </Link>
                    </li>

                    <li className="nav-item afterLogin">
                      <div className="dropdown">
                        <AccountCircleIcon />

                        <div className="dropdown-content">
                          {logingUser.login.token && (
                            <Link
                              className={`nav-link ${
                                location.pathname === "/accountinfo" &&
                                "navActive"
                              }`}
                              to="/accountinfo"
                            >
                              My Account
                              <br />
                            </Link>
                          )}
                          {!logingUser.login.token ? (
                            <li onClick={handleShow} className="nav-item">
                              <Link className="nav-link">Login</Link>
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

                          {logingUser.login.token && logingUser.login.admin && (
                            <li className="nav-item">
                              <Link
                                className={`nav-link ${
                                  location.pathname === "/vehicle-submission" &&
                                  "navActive"
                                }`}
                                to="/vehicle-submission"
                              >
                                Admin
                              </Link>
                            </li>
                          )}
                          {logingUser.login.token &&
                            !logingUser.login.admin && (
                              <li className="nav-item">
                                <Link
                                  className={`nav-link ${
                                    location.pathname === "/orders-cart" &&
                                    "navActive"
                                  }`}
                                  to="/orders-cart"
                                >
                                  My Orders
                                </Link>
                              </li>
                            )}
                        </div>
                      </div>
                    </li>
                    {/* day and night mode start */}
                    <li className="nav-item">
                      <button
                        className="sunMoonBtn"
                        onClick={() => dispatch(changeMode())}
                      >
                        {logingUser.dayAndNightMode.mode ? (
                          <img src={sunIcon} loading="lazy" />
                        ) : (
                          <img src={smoonIcon} loading="lazy" />
                        )}
                      </button>
                    </li>
                    {/* day and night mode end */}
                  </ul>
                </div>
              </nav>
            </div>
            <div className="col-md-12 mobileOnlyHide p-0">
              <nav className="navbar navbar-expand secondNavbar">
                <div className="container-fluid wrapper_second">
                  <div className="" id="navbarNavDropdown">
                    <ul className="navbar-nav flex-wrap" id="nav">
                      <li className="nav-item">
                        <Link
                          className={`nav-link ${
                            location.pathname === "/submit" && "navActive"
                          }`}
                          to="/submit"
                        >
                          List Your Vehicle
                        </Link>
                      </li>

                      <li className="nav-item">
                        <div className="dropdown">
                          <Link
                            className={`nav-link ${
                              location.pathname === "/auctionlive" &&
                              "navActive"
                            }`}
                            to="#"
                          >
                            Auctions
                          </Link>
                          <div className="dropdown-content">
                            <Link className="" to="/auctionlive">
                              Live now
                            </Link>
                          </div>
                        </div>
                      </li>

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
                          Showrooms
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
                            Raffles
                          </Link>
                        ) : (
                          <Link className="nav-link">Raffles</Link>
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
                          Featured
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
                          onClick={() => setShowNav(false)}
                        >
                          Shipping
                        </Link>
                        <div className="dropdown-content">
                          <a
                            href="https://www.iecstransport.com/"
                            target="_blank"
                          >
                            Get a Quote
                          </a>
                          <a
                            href="https://www.iecstransport.com/"
                            target="_blank"
                          >
                            My Shipment
                          </a>
                        </div>
                      </div>

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
                          FAQ
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          className="nav-link"
                          style={{
                            color: `${
                              location.pathname === "/classifiedaddList"
                                ? "#EF6031"
                                : ""
                            }`,
                          }}
                          to="/classifiedaddList"
                        >
                          Classifieds
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          className="nav-link"
                          style={{
                            color: `${
                              location.pathname === "/shop" ? "#EF6031" : ""
                            }`,
                          }}
                          to="/shop"
                        >
                          Gear
                        </Link>
                      </li>
                      <li className="nav-item AddtCrt">
                        {logingUser.cartSlice.quantity !== 0 ? (
                          <Link to="/cart">
                            <i class="fa-solid fa-cart-shopping"></i>
                            <span className="count">
                              {logingUser.cartSlice.quantity}
                            </span>
                          </Link>
                        ) : null}
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
    </>
  );
}

export default Header;
