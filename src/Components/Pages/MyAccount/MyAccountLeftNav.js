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
            className={` ${location.pathname === "/bids" ? "active" : ""} `}
            to="/bids"
          >
            Bids
          </Link>
        </li>
        <li>
          <Link
            className={` ${location.pathname === "/wins" ? "active" : ""} `}
            to="/wins"
          >
            Wins
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
            Blogs
          </Link>
        </li>
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
      </ul>
    </div>
  );
}

export default MyAccountLeftNav;
