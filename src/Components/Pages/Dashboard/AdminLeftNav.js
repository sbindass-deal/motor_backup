import React from 'react'
import { Link,  useLocation, useNavigate } from "react-router-dom";


function AdminLeftNav() {
    const location = useLocation();
    return (
    <div>
        <ul class="sideBar__">
            <li>
                <Link
                        to="/adminHome"
                        className={` ${
                          location.pathname === "/adminHome" ? "active" : ""
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
                    My Listings
                </Link>
            </li>
                    <li>
                      <Link
                        className={` ${location.pathname === "/bidswins" ? "active" : ""} `}
                        to="/bidswins"
                      >
                        My Bids & Wins
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={` ${
                          location.pathname === "/myshipments" ? "active" : ""
                        } `}
                        to="/myshipments"
                      >
                        My Shipments
                      </Link>
                    </li>
                  </ul>
                </div>
  )
}

export default AdminLeftNav