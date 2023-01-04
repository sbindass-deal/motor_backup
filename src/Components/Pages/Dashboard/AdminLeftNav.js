import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function AdminLeftNav() {
  const location = useLocation();
  return (
    <div className="">
      <h5>Admin Dashboard </h5>
      <hr />
      <ul class="sideBar__">
        <li>
          <Link
            to="/vehicle-submission"
            className={` ${
              location.pathname === "/vehicle-submission" ? "active" : ""
            } `}
          >
            Vehicle submission
          </Link>
        </li>
        <li>
          <Link
            className={` ${
              location.pathname === "/admin/vehicle-listing" ? "active" : ""
            } `}
            to="/admin/vehicle-listing"
          >
            Listing plan
          </Link>
        </li>
        <li>
          <Link
            className={` ${
              location.pathname === "/raffleadmin" ? "active" : ""
            } `}
            to="/raffleadmin"
          >
            Raffle
          </Link>
        </li>
        <li>
          <Link
            className={` ${
              location.pathname === "/gear-product" ? "active" : ""
            } `}
            to="/gear-product"
          >
            Gear products
          </Link>
        </li>
        <li>
          <Link
            className={` ${location.pathname === "/Orders" ? "active" : ""} `}
            to="/Orders"
          >
            Orders
          </Link>
        </li>

        <li>
          <Link
            className={` ${location.pathname === "/blog" ? "active" : ""} `}
            to="/blog"
          >
            Blog
          </Link>
        </li>
        <li>
          <Link
            className={` ${
              location.pathname === "/admin-enquiry" ? "active" : ""
            } `}
            to="/admin-enquiry"
          >
            Customer support
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default AdminLeftNav;
