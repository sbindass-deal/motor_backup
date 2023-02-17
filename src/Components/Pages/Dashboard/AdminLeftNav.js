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
            className={` ${location.pathname === "/vehicle-submission" ? "active" : ""
              } `}
          >
            Vehicle Submission
          </Link>
        </li>
        <li>
          <Link
            className={` ${location.pathname === "/admin/vehicle-listing" ? "active" : ""
              } `}
            to="/admin/vehicle-listing"
          >
            Listing Plan
          </Link>
        </li>
        <li>
          <Link
            className={` ${location.pathname === "/raffleadmin" ? "active" : ""
              } `}
            to="/raffleadmin"
          >
            Raffle Admin
          </Link>
        </li>
        <li>
          <Link
            className={` ${location.pathname === "/gear-product" ? "active" : ""
              } `}
            to="/gear-product"
          >
            Gear Products
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
            My Blogs
          </Link>
        </li>
        <li>
          <Link
            className={` ${location.pathname === "/admin-dealer" ? "active" : ""
              } `}
            to="/admin-dealer"
          >
            Dealer List
          </Link>
        </li>
        <li>
          <Link
            className={` ${location.pathname === "/admin-vehicle-ad" ? "active" : ""
              } `}
            to="/admin-vehicle-ad"
          >
            Classified Vehicle List
          </Link>
        </li>
        <li>
          <Link
            className={` ${location.pathname === "/admin-enquiry" ? "active" : ""
              } `}
            to="/admin-enquiry"
          >
            Customer Support
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default AdminLeftNav;
