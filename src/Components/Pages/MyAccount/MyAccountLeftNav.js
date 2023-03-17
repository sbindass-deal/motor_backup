import React from "react";
import { Link, useLocation } from "react-router-dom";

function MyAccountLeftNav() {
  const location = useLocation();
  return (
    <div>
      <ul class="sideBar__">
        <li>
          <Link
            to="/accountinfo"
            className={` ${
              location.pathname === "/accountinfo" ? "active" : ""
            } `}
          >
            Account Info
          </Link>
        </li>
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
        <li>
          <Link
            className={` ${location.pathname === "/listing" ? "active" : ""} `}
            to="/listing"
          >
            Listings
          </Link>
        </li>
        <li>
          <Link
            className={` ${location.pathname === "/bidswins" ? "active" : ""} `}
            to="/bidswins"
          >
            Bids & Wins
          </Link>
        </li>
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
        <li>
          <Link
            className={`${location.pathname === "/user-blog" ? "active" : ""}`}
            to="/user-blog"
          >
            Blog
          </Link>
        </li>
        <li>
          <Link
            className={`${
              location.pathname === "/user-meeting" ? "active" : ""
            }`}
            to="/user-meeting"
          >
            Create Event
          </Link>
        </li>
        <li>
          <Link
            className={` ${
              location.pathname === "/orders-cart" && "navActive"
            }`}
            to="/orders-cart"
          >
            My Orders
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default MyAccountLeftNav;
