import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function AdminLeftNav() {
  const location = useLocation();
  return (
    <div className="">
      <h5>Admin Dashboard </h5>
      <hr />
      <ul className="sideBar__">
        <li>
          <Link
            to="/vehicle-submission"
            className={` ${
              location.pathname === "/vehicle-submission" ? "active" : ""
            } `}
          >
            Vehicle Submission
          </Link>
        </li>
        <li>
          <Link
            className={` ${
              location.pathname === "/admin/vehicle-listing" ? "active" : ""
            } `}
            to="/admin/vehicle-listing"
          >
            Listing Plan
          </Link>
        </li>
        <li>
          <Link
            className={` ${
              location.pathname === "/raffleadmin" ? "active" : ""
            } `}
            to="/raffleadmin"
          >
            Giveaways
          </Link>
        </li>
        <li>
          <Link
            className={` ${
              location.pathname === "/gear-product" ? "active" : ""
            } `}
            to="/gear-product"
          >
            Gear Products
          </Link>
        </li>
        <li>
          <Link
            className={` ${
              location.pathname === "/gear-inventry" ? "active" : ""
            } `}
            to="/gear-inventry"
          >
            Gear Inventory
          </Link>
        </li>
        <li>
          <Link
            className={` ${location.pathname === "/Orders" ? "active" : ""} `}
            to="/Orders"
          >
            Orders List
          </Link>
        </li>

        <li>
          <Link
            className={` ${location.pathname === "/blog" ? "active" : ""} `}
            to="/blog"
          >
            Blogs
          </Link>
        </li>
        <li>
          <Link
            className={` ${
              location.pathname === "/admin-dealer" ? "active" : ""
            } `}
            to="/admin-dealer"
          >
            Dealer List
          </Link>
        </li>
        <li>
          <Link
            className={` ${
              location.pathname === "/admin-garages" ? "active" : ""
            } `}
            to="/admin-garages"
          >
            Garages List
          </Link>
        </li>
        {/* <li>
          <Link
            className={` ${
              location.pathname === "/admin-vehicle-ad" ? "active" : ""
            } `}
            to="/admin-vehicle-ad"
          >
            Classified Vehicle List
          </Link>
        </li> */}

        <li>
          <Link
            className={` ${
              location.pathname === "/admin-meeting" ? "active" : ""
            } `}
            to="/admin-meeting"
          >
            Events
          </Link>
        </li>
        <li>
          <Link
            className={` ${
              location.pathname === "/admin-faq" ? "active" : ""
            } `}
            to="/admin-faq"
          >
            FAQ
          </Link>
        </li>
        <li>
          <Link
            className={` ${
              location.pathname === "/admin-enquiry" ? "active" : ""
            } `}
            to="/admin-enquiry"
          >
            Customer Enquiry
          </Link>
        </li>

        <li>
          <Link
            className={` ${
              location.pathname === "/admin-privacy-policy" ? "active" : ""
            } `}
            to="/admin-privacy-policy"
          >
            Privacy policy
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default AdminLeftNav;
