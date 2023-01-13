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
  reset,
} from "../redux/reducers/login";
import { toast } from "react-toastify";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { changeMode } from "../redux/reducers/dayAndNightMode";
import axios from "axios";
import { clearCart } from "../redux/reducers/cartSlice";
import { useEffect } from "react";
import ResultNotFound from "./UI/ResultNotFound";
import { NoFoodTwoTone } from "@mui/icons-material";
import NotAvailable from "../Components/UI/NotAvailable";
import Searchbar from "./UI/Searchbar";

const data = [
  {
    id: 1,
    name: "List Your Vehicle",
    desc: "sohan is a good boy",
    redirect: "/submit",
  },
  {
    id: 2,
    name: "Showrooms",
    desc: "mohan is a good boy",
    redirect: "/showroom",
  },
  { id: 3, name: "Raffle", desc: "lalu is a good boy", redirect: "/carraffle" },
  { id: 4, name: "Feautres", desc: "modi is a good boy", redirect: "feautres" },
  {
    id: 5,
    name: "Charity Actions",
    desc: "sohan is a good boy",
    redirect: "/charity",
  },
  {
    id: 6,
    name: "About",
    desc: "sohan is a good boy",
    redirect: "/aboutshibnobi",
  },
  { id: 7, name: "Faq", desc: "sohan is a good boy", redirect: "/faq" },
  { id: 8, name: "Store", desc: "sohan is a good boy", redirect: "/shop" },
];

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [sowAutoCompleate, setSowAutoCompleate] = useState(false);

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
  // const [sowAutoCompleate, setSowAutoCompleate] = useState(false);

  const dispatch = useDispatch();
  const logingUser = useSelector((state) => state);
  const [showReg, setShowReg] = useState(false);
  const [showForgPass, setShowForgPass] = useState(false);

  const featchSearchApi = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_URL + `globalSearch`
      );
      if (response.data.vehicle.length >= 0) {
        setSearchData(response.data.vehicle);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    featchSearchApi();
  }, []);

  const handleSearch = (e) => {
    const Value = e.target.value.toLowerCase();
    setSearchValue(Value);
    // featchSearchApi(Value);
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
  const logout = () => {
    dispatch(reset());
    notify("Logout successfully ! 😎🤐");
    navigate("/");
    window.location.reload(false);
  };

  const handleBlur = (e) => {
    // setSowAutoCompleate(false);
  };
  const handleFocus = (e) => {
    setSowAutoCompleate(true);
  };

  const filteredData =
    searchData &&
    searchData.filter((item) =>
      item.make
        ? item.make.toLowerCase().includes(searchValue) ||
          item.model.toLowerCase().includes(searchValue) ||
          item.year.includes(searchValue)
        : item
    );

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
                <div className="dddd">
                  <button
                    className="navbar-toggler navbar-toggler-right collapsed"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navb"
                  >
                    <span className="navbarToggler"></span>
                  </button>

                  <div
                    className="collapse navbar-collapse mobileOnly hidemenu"
                    id="navb"
                  >
                    <ul className="navbar-nav mobileOnly">
                      <li className="nav-item"
                        // style={{ cursor: "pointer" }}
                      >
                        <Searchbar />
                      </li>

                      <li className="nav-item">
                        {/* <Link className="nav-link" to="/auction">
                        Auctions
                      </Link> */}

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
                            location.pathname === "/classifiedaddList" && "navActive"
                          }`}
                          to="/classifiedaddList"
                        >
                          Classifieds 
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

                            {logingUser.login.token &&
                              logingUser.login.admin && (
                                <li className="nav-item">
                                  <Link
                                    className={`nav-link ${
                                      location.pathname ===
                                        "/vehicle-submission" && "navActive"
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
                          Gas Guzzlrs
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to="/">
                          Gear Store
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="toNv" id="">
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
                        {/* <form className="searchForm">
                          <input
                            type="search"
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
                        </form> */}
                        <Searchbar />
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

                      <Link
                        className="nav-link"
                        style={{
                          color: `${
                            location.pathname === "/aboutshibnobi" ? "#000" : ""
                          }`,
                        }}
                        to="/aboutshibnobi"
                      >
                        About
                      </Link>
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
                </div>
              </nav>
            </div>
            <div className="col-md-12 mobileOnlyHide p-0">
              <nav className="navbar navbar-expand secondNavbar">
                <div className="container-fluid wrapper_second">
                  <div className="" id="navbarNavDropdown">
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
                            {/* <Link className="nav-link" to="/auctionpremium">
                            Premium
                          </Link>
                          <Link className="nav-link" to="/auctionresults">
                            Resullt
                          </Link> */}
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
                          <Link
                            // onClick={handleShow}
                            className="nav-link"
                          >
                            Raffles
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
                          className={`nav-link ${
                            location.pathname === "/classifiedaddList" && "navActive"
                          }`}
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
      {/* {sowAutoCompleate && (
        <div onClick={() => setSowAutoCompleate(false)} className="searchBg">
          <div onClick={() => setSowAutoCompleate(false)} className="autoCom">
            {filteredData <= 0 ? (
              <ResultNotFound text="Result not found! 🙄" />
            ) : (
              filteredData.map((curElem) => {
                return (
                  <div key={curElem.id}>
                    {curElem.name && (
                      <Link to="/showroom" className="row searchList">
                        <p className="title">{curElem.make} &nbsp; </p>
                        <p className="dec">{curElem.description}</p>
                      </Link>
                    )}
                  </div>
                );
              })
            )}
            
          </div>
        </div>
      )} */}
    </>
  );
}

export default Header;
