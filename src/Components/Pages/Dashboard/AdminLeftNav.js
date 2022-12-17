import React from 'react'
import { Link,  useLocation, useNavigate } from "react-router-dom";


function AdminLeftNav() {
    const location = useLocation();
    return (
    <div>
       <h5>My Admin</h5>
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
                    className={` ${location.pathname === "/raffleadmin" ? "active" : ""} `}
                    to="/raffleadmin"
                >
                    Raffle
                </Link>
            </li>
                    <li>
                      <Link
                        className={` ${location.pathname === "/merchandise" ? "active" : ""} `}
                        to="/merchandise"
                      >
                        Merchandise
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={` ${
                          location.pathname === "/Orders" ? "active" : ""
                        } `}
                        to="/Orders"
                      >
                        Orders
                      </Link>
                    </li>
                   
                    <li>
                      <Link
                        className={` ${
                          location.pathname === "/blog" ? "active" : ""
                        } `}
                        to="/blog"
                      >
                        Blog
                      </Link>
                    </li>
                   
                  </ul>
                </div>
  )
}

export default AdminLeftNav