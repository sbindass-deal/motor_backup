import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import MyAccountLeftNav from "./MyAccountLeftNav";

function Subscription() {
  const [allData, setAllData] = useState([]);
  const [loading, setloading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const getSubscription = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_URL}subscriptions`
        );
        console.log(890, res.data.transaction);
        setAllData(res.data.transaction);
        setloading(false);
      } catch (err) {
        console.log(err);
      }
    };
    getSubscription();
  }, []);

  return (
    <div>
      <section className="ptb_80 pt_sm_50">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-4 col-lg-3">
              <div className="card_Gray mb-5 mb-md-0 divSticky">
                <h5>My Account</h5>
                <hr />
                <MyAccountLeftNav />
              </div>
            </div>

            <div className="col-12 col-md-8 col-lg-9">
              <h3
                className="d-flex"
                id="widthChnge"
                style={{ justifyContent: "space-between" }}
              >
                Subscription
              </h3>

              <hr id="hr" />
              <ul className="postTopOption" id="widthChnge">
                <li className="post_search">
                  <input
                    type="search"
                    name="search"
                    placeholder="Search…"
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                    }}
                  />
                </li>
              </ul>
              <div
                class="card_Gray table-responsive merchant vehicleSub"
                id="scrollable"
              >
                {loading ? (
                  <div class="d-flex justify-content-center">
                    <div class="spinner-border" role="status">
                      <span class="sr-only">Loading...</span>
                    </div>
                  </div>
                ) : (
                  <table class="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">Sr.No</th>
                        <th scope="col">Plan Name</th>
                        <th scope="col">Plan Type</th>
                        <th scope="col">Listing Purchased</th>
                        <th scope="col">Listing Remaining</th>
                        <th scope="col">Expiry Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allData
                        ?.filter((curVal) => {
                          if (searchTerm == "") {
                            return curVal;
                          } else if (
                            curVal.plantype
                              .toLowerCase()
                              .includes(searchTerm.toLowerCase())
                          ) {
                            return curVal;
                          }
                        })
                        ?.map((curVal, i) => {
                          console.log(6788, curVal);
                          return (
                            <tr>
                              <td>{i + 1}</td>
                              <td>
                                {curVal?.plan_details.map(
                                  (curVal) => curVal.plan_name
                                )}
                              </td>
                              <td>{curVal.plantype}</td>
                              <td>{curVal.purchase_qty}</td>
                              <td>{curVal.remaining_qty}</td>
                              <td>
                                {new Date(curVal.expire_date).toDateString()}
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Subscription;
