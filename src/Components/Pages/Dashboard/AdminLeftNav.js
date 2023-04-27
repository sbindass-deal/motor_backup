import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";

function AdminLeftNav() {
  const location = useLocation();

  const [show, setShow] = useState(true);

  return (
    <div className="">
      <h5>Admin Dashboard </h5>
      <hr />
      <ul className="sideBar__">
        <ProSidebar>
          <Menu iconShape="square">
            <MenuItem>
              <Link
                to="/vehicle-submission"
                className={` ${
                  location.pathname === "/vehicle-submission" ? "active" : ""
                } `}
              >
                Vehicle Submission
              </Link>
            </MenuItem>

            <MenuItem>
              <li>
                <Link
                  className={` ${
                    location.pathname === "/admin/vehicle-listing"
                      ? "active"
                      : ""
                  } `}
                  to="/admin/vehicle-listing"
                >
                  Listing Plan
                </Link>
              </li>
            </MenuItem>

            <MenuItem>
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
            </MenuItem>

            <SubMenu title="Gear" defaultOpen={true}>
              <MenuItem>
                <li>
                  <Link
                    className={` ${
                      location.pathname === "/gear-product" ? "active" : ""
                    } `}
                    to="/gear-product"
                  >
                    Products
                  </Link>
                </li>
              </MenuItem>
              <MenuItem>
                <li>
                  <Link
                    className={` ${
                      location.pathname === "/gear-inventry" ? "active" : ""
                    } `}
                    to="/gear-inventry"
                  >
                    Product Settings
                  </Link>
                </li>
              </MenuItem>
              <MenuItem>
                <li>
                  <Link
                    className={` ${
                      location.pathname === "/Orders" ? "active" : ""
                    } `}
                    to="/Orders"
                  >
                    Orders List
                  </Link>
                </li>
              </MenuItem>
            </SubMenu>

            {/* <MenuItem>
              <li>
                <Link
                  className={` ${location.pathname === "/gear-product" ? "active" : ""
                    } `}
                  to="/gear-product"
                >
                  Gear Products
                </Link>
              </li>
            </MenuItem> */}
            {/* <MenuItem>
              <li>
                <Link
                  className={` ${location.pathname === "/gear-inventry" ? "active" : ""
                    } `}
                  to="/gear-inventry"
                >
                  Gear Inventory
                </Link>
              </li>
            </MenuItem> */}
            {/* <MenuItem>
              <li>
                <Link
                  className={` ${location.pathname === "/Orders" ? "active" : ""} `}
                  to="/Orders"
                >
                  Orders List
                </Link>
              </li>
            </MenuItem> */}
            <MenuItem>
              <li>
                <Link
                  className={` ${
                    location.pathname === "/blog" ? "active" : ""
                  } `}
                  to="/blog"
                >
                  Blogs
                </Link>
              </li>
            </MenuItem>
            {/* <MenuItem>
              <li>
                <Link
                  className={` ${location.pathname === "/blog" ? "active" : ""} `}
                  to="/blog"
                >
                  Blogs
                </Link>
              </li>
            </MenuItem>
            <MenuItem>
              <li>
                <Link
                  className={` ${location.pathname === "/blog" ? "active" : ""} `}
                  to="/blog"
                >
                  Blogs
                </Link>
              </li>
            </MenuItem> */}
            <MenuItem>
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
            </MenuItem>
            <MenuItem>
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
            </MenuItem>

            <MenuItem>
              <li>
                <Link
                  className={` ${
                    location.pathname === "/admin-vehicle-ad" ? "active" : ""
                  } `}
                  to="/admin-vehicle-ad"
                >
                  Classified Vehicle List
                </Link>
              </li>
            </MenuItem>

            <MenuItem>
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
            </MenuItem>
            <MenuItem>
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
            </MenuItem>
            <MenuItem>
              <li>
                <Link
                  className={` ${
                    location.pathname === "/admin-enquiry" ? "active" : ""
                  } `}
                  to="/admin-enquiry"
                >
                  Contact Us
                </Link>
              </li>
            </MenuItem>
            <SubMenu title="Policy" defaultOpen={true}>
              <MenuItem>
                <li>
                  <Link
                    className={` ${
                      location.pathname === "/admin-privacy-policy"
                        ? "active"
                        : ""
                    } `}
                    to="/admin-privacy-policy"
                  >
                    Giveaway Official
                  </Link>
                </li>
              </MenuItem>
              <MenuItem>
                <li>
                  <Link
                    className={` ${
                      location.pathname === "/admin-privacy" ? "active" : ""
                    } `}
                    to="/admin-privacy"
                  >
                    Privacy policy
                  </Link>
                </li>
              </MenuItem>
              <MenuItem>
                <li>
                  <Link
                    className={` ${
                      location.pathname === "/admin-termcondition"
                        ? "active"
                        : ""
                    } `}
                    to="/admin-termcondition"
                  >
                    Terms and Conditions
                  </Link>
                </li>
              </MenuItem>
              <MenuItem>
                <li>
                  <Link
                    className={` ${
                      location.pathname === "/admin-aml-policy" ? "active" : ""
                    } `}
                    to="/admin-aml-policy"
                  >
                    AML Policy
                  </Link>
                </li>
              </MenuItem>
            </SubMenu>
          </Menu>
        </ProSidebar>

        {/* <li>
          <Link
            to="/vehicle-submission"
            className={` ${
              location.pathname === "/vehicle-submission" ? "active" : ""
            } `}
          >
            Vehicle Submission
          </Link>
        </li> */}
        {/* <li>
          <Link
            className={` ${
              location.pathname === "/admin/vehicle-listing" ? "active" : ""
            } `}
            to="/admin/vehicle-listing"
          >
            Listing Plan
          </Link>
        </li> */}
        {/* <li>
          <Link
            className={` ${
              location.pathname === "/raffleadmin" ? "active" : ""
            } `}
            to="/raffleadmin"
          >
            Giveaways
          </Link>
        </li> */}
        {/* <li>
          <Link
            className={` ${
              location.pathname === "/gear-product" ? "active" : ""
            } `}
            to="/gear-product"
          >
            Gear Products
          </Link>
        </li> */}
        {/* <li>
          <Link
            className={` ${
              location.pathname === "/gear-inventry" ? "active" : ""
            } `}
            to="/gear-inventry"
          >
            Gear Inventory
          </Link>
        </li> */}
        {/* <li>
          <Link
            className={` ${location.pathname === "/Orders" ? "active" : ""} `}
            to="/Orders"
          >
            Orders List
          </Link>
        </li> */}

        {/* <li>
          <Link
            className={` ${location.pathname === "/blog" ? "active" : ""} `}
            to="/blog"
          >
            Blogs
          </Link>
        </li> */}
        {/* <li>
          <Link
            className={` ${
              location.pathname === "/admin-dealer" ? "active" : ""
            } `}
            to="/admin-dealer"
          >
            Dealer List
          </Link>
        </li> */}
        {/* <li>
          <Link
            className={` ${
              location.pathname === "/admin-garages" ? "active" : ""
            } `}
            to="/admin-garages"
          >
            Garages List
          </Link>
        </li> */}
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

        {/* <li>
          <Link
            className={` ${
              location.pathname === "/admin-meeting" ? "active" : ""
            } `}
            to="/admin-meeting"
          >
            Events
          </Link>
        </li> */}
        {/* <li>
          <Link
            className={` ${
              location.pathname === "/admin-faq" ? "active" : ""
            } `}
            to="/admin-faq"
          >
            FAQ
          </Link>
        </li> */}
        {/* <li>
          <Link
            className={` ${
              location.pathname === "/admin-enquiry" ? "active" : ""
            } `}
            to="/admin-enquiry"
          >
            Customer Enquiry
          </Link>
        </li> */}

        {/* <li>
          <Link
            className={` ${
              location.pathname === "/admin-privacy-policy" ? "active" : ""
            } `}
            to="/admin-privacy-policy"
          >
            Giveaways Official Rules
          </Link>
        </li> */}
        {/* <li>
          <Link
            className={` ${location.pathname === "/admin-privacy" ? "active" : ""
              } `}
            to="/admin-privacy"
          >
            Privacy policy

          </Link>
        </li> */}
        {/* <li>
          <Link
            className={` ${
              location.pathname === "/admin-termcondition" ? "active" : ""
            } `}
            to="/admin-termcondition"
          >
            Term And Condition
          </Link>
        </li> */}
        {/* <li>
          <Link
            className={` ${
              location.pathname === "/admin-aml-policy" ? "active" : ""
            } `}
            to="/admin-aml-policy"
          >
            AML Policy

          </Link>
        </li> */}
      </ul>
    </div>
  );
}

export default AdminLeftNav;
