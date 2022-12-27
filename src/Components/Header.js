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
import {
  authToken,
  isAdmin,
  showModalLogin,
  showModalClose,
} from "../redux/reducers/login";
import { toast } from "react-toastify";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { changeMode } from "../redux/reducers/dayAndNightMode";
import axios from "axios";
import { useEffect } from "react";
import { clearCart } from "../redux/reducers/cartSlice";

const data = [
  { id: 1, name: "Sohan", desc: "sohan is a good boy" },
  { id: 2, name: "Mohan", desc: "mohan is a good boy" },
  { id: 3, name: "Lalu", desc: "lalu is a good boy" },
  { id: 4, name: "Modi", desc: "modi is a good boy" },
  { id: 5, name: "Sohan", desc: "sohan is a good boy" },
  { id: 6, name: "Sohan", desc: "sohan is a good boy" },
  { id: 7, name: "Sohan", desc: "sohan is a good boy" },
  { id: 8, name: "Sohan", desc: "sohan is a good boy" },
];

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState();
  const [searchData, setSearchData] = useState(data);

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
  const [sowAutoCompleate, setSowAutoCompleate] = useState(false);

  const dispatch = useDispatch();
  const logingUser = useSelector((state) => state);
  const [showReg, setShowReg] = useState(false);
  const [showForgPass, setShowForgPass] = useState(false);

  const featchSearchApi = async (se) => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_URL + `globalSearch/${searchValue}`
      );
      if (searchValue.trim().length <= 0) {
        setSearchData(data);
      } else {
        setSearchData(response.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearch = (e) => {
    const Value = e.target.value;
    setSearchValue(Value);
    featchSearchApi(Value);
  };

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
  const logout = async () => {
    dispatch(authToken(null));
    dispatch(isAdmin(null));
    dispatch(clearCart());
    notify("Logout successfully ! 😎🤐");
    navigate("/");
  };

  const handleBlur = (e) => {
    setSowAutoCompleate(false);
  };
  const handleFocus = (e) => {
    setSowAutoCompleate(true);
  };

  return (
    <>
      <header>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 p-0">
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
                    <li
                      // onClick={() => setShowSearchModal(true)}
                      className="nav-item"
                      style={{ cursor: "pointer" }}
                    >
                      <Link
                        className="nav-link"
                        // to="javascript:void(0)"
                        // data-toggle="modal"
                        // data-target="#myModal"
                      >
                        <form className="searchForm">
                          <input
                            type="text"
                            name="search"
                            value={searchValue}
                            onChange={handleSearch}
                            onBlur={handleBlur}
                            onFocus={handleFocus}
                            autoComplete="off"
                            placeholder="Search..."
                            required
                          />
                          <button type="submit">
                            <i className="fa-solid fa-magnifying-glass"></i>
                          </button>
                        </form>
                        {/* <div className="searchBody">
                             <div className="searchAuto" >
                              <p className="searchName">Nikhukki</p>
                              <p className="desc">We conduct our registration and bidding online through our GG Software, an in house appl that manages a platform for auctions and payment processing. Learn more about how to create an account and register for our auctions.</p>
                              </div>
                        </div>
                        <i className="fa-solid fa-magnifying-glass"></i> */}
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
                        How it Works
                      </Link>
                    </li>
                    {/* {!logingUser.login.token ? (
                      <li onClick={handleShow} className="nav-item">
                        <Link
                          className="nav-link"
                          // to="javascript:void(0)"
                          // data-toggle="modal"
                          // data-target="#loginModal"
                        >
                          <i class="fa-solid fa-user-lock"></i>
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
                    )} */}
                    {/* <li className="nav-item">
                      <Link className="nav-link" to="/">
                        <i className="fa-solid fa-star"></i>
                      </Link>
                    </li> */}

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
                              {/* <span>{logingUser.login.user.username}</span> */}
                            </Link>
                          )}
                          {!logingUser.login.token ? (
                            <li onClick={handleShow} className="nav-item">
                              <Link
                                className="nav-link"
                                // to="javascript:void(0)"
                                // data-toggle="modal"
                                // data-target="#loginModal"
                              >
                                Login
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
                        Featured
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
            <div className="col-md-12 mobileOnlyHide p-0">
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
                          className={`nav-link ${
                            location.pathname === "/submit" && "navActive"
                          }`}
                          to="/submit"
                        >
                          Submit a Vehicle
                        </Link>
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
                          About
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
                          style={{
                            color: `${
                              location.pathname === "/shop" ? "#EF6031" : ""
                            }`,
                          }}
                          to="/shop"
                        >
                          Store
                        </Link>
                      </li>
                      {logingUser.login.token && (
                        <li className="nav-item AddtCrt">
                          {logingUser.cartSlice.quantity != 0 ? (
                            <Link to="/cart">
                              <i class="fa-solid fa-cart-shopping"></i>
                              <span className="count">
                                {logingUser.cartSlice.quantity}
                              </span>
                            </Link>
                          ) : (
                            ""
                          )}
                        </li>
                      )}

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
      {sowAutoCompleate && (
        <div className="autoCom">
          {searchData.map((curElem) => {
            return (
              <a href="#" className="row searchList">
                <p className="title">{curElem.name}</p>
                <p className="dec">{curElem.desc}</p>
              </a>
            );
          })}
        </div>
      )}
    </>
  );
}

export default Header;
