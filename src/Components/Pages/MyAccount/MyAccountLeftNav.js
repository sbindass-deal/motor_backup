import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { useDispatch, useSelector } from "react-redux";
import {
  blogTab,
  bookMarkTab,
  favoritesTab,
  postTab,
  replyTab,
  socialMediaTab,
  vehicleTab,
} from "../../../redux/reducers/garagesTabReducer";
import {
  handleShowAuction,
  handleShowGarage,
} from "../../../redux/reducers/dayAndNightMode";

function MyAccountLeftNav() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const userId = useSelector((state) => state);
  const tabState = userId.garagesTabReducer;
  if (
    location.pathname !== "/listing" ||
    location.pathname !== "/bids" ||
    location.pathname !== "/wins"
  ) {
    dispatch(handleShowAuction(false));
    dispatch(handleShowGarage(false));
  }
  return (
    <div className="mr-5">
    

      <ul className="sideBar__  swef">
        <ProSidebar className="sideBar__">
          <Menu iconShape="square">
            <MenuItem>
              <Link
                to="/accountinfo"
                className={` ${
                  location.pathname === "/accountinfo" ? "active" : ""
                } `}
              >
                Account Info
              </Link>
            </MenuItem>

            <MenuItem>
              <Link
                className={`${
                  location.pathname === "/getalerts" ? "#EF6031" : ""
                }`}
                to="/getalerts"
              >
                Get Alerts
              </Link>
            </MenuItem>

            {/* <SubMenu
              onClick={() => {
                dispatch(handleShowGarage(true));
                dispatch(handleShowAuction(false));
              }}
              defaultOpen={userId.dayAndNightMode.showGarage}
              title="Garage"
            >
              <MenuItem>
                <Link
                  to="/user-garage"
                  className={` ${tabState.vehicle_tab === true && "active"} `}
                  onClick={() => dispatch(vehicleTab())}
                >
                  Vehicles
                </Link>
              </MenuItem>
              <MenuItem>
                <Link
                  to="/user-garage"
                  className={` ${
                    tabState.socialMedia_tab === true && "active"
                  } `}
                  onClick={() => dispatch(socialMediaTab())}
                >
                  Social media
                </Link>
              </MenuItem>
              <MenuItem>
                <Link
                  to="/user-garage"
                  className={` ${tabState.post_tab === true && "active"} `}
                  onClick={() => dispatch(postTab())}
                >
                  Posts
                </Link>
              </MenuItem>
              <MenuItem>
                <Link
                  to="/user-garage"
                  className={` ${tabState.reply_tab === true && "active"} `}
                  onClick={() => dispatch(replyTab())}
                >
                  Replies
                </Link>
              </MenuItem>

              <MenuItem>
                <Link
                  to="/user-garage"
                  className={` ${tabState.bookmark_tab === true && "active"} `}
                  onClick={() => dispatch(bookMarkTab())}
                >
                  Bookmark
                </Link>
              </MenuItem>
              <MenuItem>
                <Link
                  to="/user-garage"
                  className={` ${tabState.favorites_tab === true && "active"} `}
                  onClick={() => dispatch(favoritesTab())}
                >
                  Favorites
                </Link>
              </MenuItem>

              <MenuItem>
                <Link
                  to="/user-garage"
                  className={` ${tabState.blog_tab === true && "active"} `}
                  onClick={() => dispatch(blogTab())}
                >
                  Blog
                </Link>
              </MenuItem>
            </SubMenu> */}

            {/* <SubMenu
              title="Auctions"
              defaultOpen={userId.dayAndNightMode.showAuction}
              onClick={() => {
                dispatch(handleShowAuction(true));
                dispatch(handleShowGarage(false));
              }}
            >
              <MenuItem>
                <Link
                  className={` ${
                    location.pathname === "/listing" ? "active" : ""
                  } `}
                  to="/listing"
                >
                  Listings
                </Link>
              </MenuItem>
              <MenuItem>
                <Link
                  to="/bids"
                  className={` ${
                    location.pathname === "/bids" ? "active" : ""
                  } `}
                >
                  Bids
                </Link>
              </MenuItem>
              <MenuItem>
                <Link
                  to="/wins"
                  className={` ${
                    location.pathname === "/wins" ? "active" : ""
                  } `}
                >
                  Won
                </Link>
              </MenuItem>
            </SubMenu> */}



            <div id="accordion" className="accordion">
              <div className="card">
                <div className="card-header" id="headingOne">
                  <h5 className="mb-0">
                    <button
                      className="btn btn-link fdrD"
                      data-toggle="collapse"
                      data-target="#collapseOne"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >
                      Garage
                    </button>
                  </h5>
                </div>

                <div
                  id="collapseOne"
                  className="collapse "
                  aria-labelledby="headingOne"
                  data-parent="#accordion"
                >
                  <div className="card-body Edv">
                    <MenuItem>
                      <Link
                        to="/user-garage"
                        className={` ${
                          tabState.vehicle_tab === true && "active"
                        } `}
                        onClick={() => dispatch(vehicleTab())}
                      >
                        Vehicles
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link
                        to="/user-garage"
                        className={` ${
                          tabState.socialMedia_tab === true && "active"
                        } `}
                        onClick={() => dispatch(socialMediaTab())}
                      >
                        Social media
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link
                        to="/user-garage"
                        className={` ${
                          tabState.post_tab === true && "active"
                        } `}
                        onClick={() => dispatch(postTab())}
                      >
                        Posts
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link
                        to="/user-garage"
                        className={` ${
                          tabState.reply_tab === true && "active"
                        } `}
                        onClick={() => dispatch(replyTab())}
                      >
                        Replies
                      </Link>
                    </MenuItem>

                    <MenuItem>
                      <Link
                        to="/user-garage"
                        className={` ${
                          tabState.bookmark_tab === true && "active"
                        } `}
                        onClick={() => dispatch(bookMarkTab())}
                      >
                        Bookmark
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link
                        to="/user-garage"
                        className={` ${
                          tabState.favorites_tab === true && "active"
                        } `}
                        onClick={() => dispatch(favoritesTab())}
                      >
                        Favorites
                      </Link>
                    </MenuItem>

                    <MenuItem>
                      <Link
                        to="/user-garage"
                        className={` ${
                          tabState.blog_tab === true && "active"
                        } `}
                        onClick={() => dispatch(blogTab())}
                      >
                        Blog
                      </Link>
                    </MenuItem>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-header" id="headingTwo">
                  <h5 className="mb-0">
                    <button
                      className="btn btn-link collapsed fdrD"
                      data-toggle="collapse"
                      data-target="#collapseTwo"
                      aria-expanded="false"
                      aria-controls="collapseTwo"
                    >
                      Auctions
                    </button>
                  </h5>
                </div>
                <div
                  id="collapseTwo"
                  className="collapse"
                  aria-labelledby="headingTwo"
                  data-parent="#accordion"
                >
                  <div className="card-body Edv">
                    <MenuItem>
                      <Link
                        className={` ${
                          location.pathname === "/listing" ? "active" : ""
                        } `}
                        to="/listing"
                      >
                        Listings
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link
                        to="/bids"
                        className={` ${
                          location.pathname === "/bids" ? "active" : ""
                        } `}
                      >
                        Bids
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link
                        to="/wins"
                        className={` ${
                          location.pathname === "/wins" ? "active" : ""
                        } `}
                      >
                        Won
                      </Link>
                    </MenuItem>
                  </div>
                </div>
              </div>
            </div>

            {/* <MenuItem>
              <Link
                className={` ${location.pathname === "/listing" ? "active" : ""} `}
                to="/listing"
              >
                Listings
              </Link>
            </MenuItem> */}

            {/* <MenuItem>
              <li>
                <Link
                  className={` ${location.pathname === "/bids" ? "active" : ""} `}
                  to="/bids"
                >
                  Bids
                </Link>
              </li>
            </MenuItem> */}

            {/* <MenuItem>
              <li>
                <Link
                  className={` ${location.pathname === "/wins" ? "active" : ""} `}
                  to="/wins"
                >
                  Won
                </Link>
              </li>
            </MenuItem> */}

            <MenuItem>
              <li>
                <Link
                  className={`${
                    location.pathname === "/myshipments" ? "active" : ""
                  }`}
                  to="/myshipments"
                >
                  Shipments
                </Link>
              </li>
            </MenuItem>

            {/* <MenuItem>
              <li>
                <Link
                  className={`${location.pathname === "/user-blog" ? "active" : ""}`}
                  to="/user-blog"
                >
                  Blogs
                </Link>
              </li>
            </MenuItem> */}

            <MenuItem>
              <li>
                <Link
                  className={`${
                    location.pathname === "/user-meeting" ? "active" : ""
                  }`}
                  to="/user-meeting"
                >
                  Events
                </Link>
              </li>
            </MenuItem>

            <MenuItem>
              <li>
                <Link
                  className={` ${
                    location.pathname === "/orders-cart" ? "active" : ""
                  }`}
                  to="/orders-cart"
                >
                  Orders
                </Link>
              </li>
            </MenuItem>

            <MenuItem>
              <li>
                <Link
                  className={`${
                    location.pathname === "/subscription" ? "active" : ""
                  }`}
                  to="/subscription"
                >
                  Subscription
                </Link>
              </li>
            </MenuItem>

            <MenuItem>
              <li>
                <Link
                  className={`${
                    location.pathname === "/transaction" ? "active" : ""
                  }`}
                  to="/transaction"
                >
                  Transaction
                </Link>
              </li>
            </MenuItem>

            {/* <MenuItem>
              <li>
                <Link
                  className={`${
                    location.pathname === "/watch" ? "active" : ""
                  }`}
                  to="/watch"
                >
                  Watch List
                </Link>
              </li>
            </MenuItem> */}
            <MenuItem>
              <li>
                <Link
                  className={`${
                    location.pathname === "/settings" ? "active" : ""
                  }`}
                  to="/settings"
                >
                  Settings
                </Link>
              </li>
            </MenuItem>
            <MenuItem>
              <li>
                <Link
                  className={`${
                    location.pathname === "/contact" ? "active" : ""
                  }`}
                  to="/contact"
                >
                  Contact Us
                </Link>
              </li>
            </MenuItem>
          </Menu>
        </ProSidebar>

        {/* <li>
          <Link
            to="/accountinfo"
            className={` ${location.pathname === "/accountinfo" ? "active" : ""
              } `}
          >
            Account Info
          </Link>
        </li> */}
        {/* <li>
          <Link
            to="/user-garage"
            className={` ${
              location.pathname === "/user-garage" ? "active" : ""
            } `}
          >
            Garage
          </Link>
        </li> */}

        {/* <li className="nav-item" >
          <div className="dropdown">
            <Link
              // className={`nav-link ${location.pathname === "/garages" &&
              //   "navActive"
              //   }`}
              to="#"
            >
              Garage
            </Link>
            <div className="dropdown-content">
              <Link className=""
              // to="/garagessocialmedia"
              >
                Social media
              </Link>
              <Link className=""
              // to="/garagespost"
              >
                Posts
              </Link>
              <Link className=""
              // to="/garagesreplies"
              >
                Replies
              </Link>
              <Link className=""
              // to="/garagesblognew"
              >
                Blog
              </Link>
            </div>
          </div>
        </li> */}

        {/* <li>
          <ProSidebar>
            <Menu iconShape="square">
              <SubMenu title="Garage">
                <MenuItem > Social media</MenuItem>
                <MenuItem> Posts</MenuItem>
                <MenuItem> Replies</MenuItem>
                <MenuItem> Blog</MenuItem>
              </SubMenu>
            </Menu>
          </ProSidebar>
       </li> */}

        {/* <li>
          <Link
            className={` ${
              location.pathname === "/notifications" ? "active" : ""
            } `}
            to="/notifications"
          >
            Notifications
          </Link>
        </li> */}
        {/* <li>
          <Link
            className={` ${location.pathname === "/listing" ? "active" : ""} `}
            to="/listing"
          >
            Listings
          </Link>
        </li> */}
        {/* <li>
          <Link
            className={` ${location.pathname === "/bids" ? "active" : ""} `}
            to="/bids"
          >
            Bids
          </Link>
        </li> */}
        {/* <li>
          <Link
            className={` ${location.pathname === "/wins" ? "active" : ""} `}
            to="/wins"
          >
            Won
          </Link>
        </li> */}
        {/* <li>
          <Link
            className={`${location.pathname === "/myshipments" ? "active" : ""
              }`}
            to="/myshipments"
          >
            Shipments
          </Link>
        </li> */}
        {/* <li>
          <Link
            className={`${location.pathname === "/user-blog" ? "active" : ""}`}
            to="/user-blog"
          >
            Blogs
          </Link>
        </li> */}
        {/* <li>
          <Link
            className={`${location.pathname === "/user-meeting" ? "active" : ""
              }`}
            to="/user-meeting"
          >
            Events
          </Link>
        </li> */}
        {/* <li>
          <Link
            className={` ${location.pathname === "/orders-cart" ? "active" : ""
              }`}
            to="/orders-cart"
          >
            Orders
          </Link>
        </li> */}

        {/* <li>
          <Link
            className={`${location.pathname === "/subscription" ? "active" : ""
              }`}
            to="/subscription"
          >
            Subscription
          </Link>
        </li> */}
        {/* <li>
          <Link
            className={`${location.pathname === "/transaction" ? "active" : ""
              }`}
            to="/transaction"
          >
            Transaction
          </Link>
        </li> */}
      </ul>
    </div>
  );
}

export default MyAccountLeftNav;
