import React, { useEffect, useState } from "react";
import AdminLeftNav from "./AdminLeftNav";
import img_01 from "../../../Assets/images/img_001.webp";
import axios from "axios";
import { Link } from "react-router-dom";
function RaffleAdmin() {
  const [showLotary, setShowLotary] = useState([]);
  useEffect(() => {
    const fetchLotaryApi = async () => {
      try {
        const response = await axios.get(
          process.env.REACT_APP_URL + "getLotteryDetail"
        );
        if (response.data.data.length > 0) {
          console.log("refral", showLotary);
          setShowLotary(response.data.data);
        } else {
          console.log("Data is empty");
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchLotaryApi();
  }, []);

  const approveLottery = async (id) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_URL}lottery/active/${id}`
      );
      if (res.data.status === 200) {
        window.location.reload(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <section className="ptb_80 pt_sm_50">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-4 col-lg-3">
              <div className="card_Gray mb-5 mb-md-0 divSticky">
                <AdminLeftNav />
              </div>
            </div>

            <div className="col-12 col-md-8 col-lg-9">
              <div
                className="d-flex"
                style={{ justifyContent: "space-between" }}
              >
                <h3>Raffle Admin</h3>
                <Link to="/raffleadmin/add-raffel" className="orange_btn">
                  + Add raffle
                </Link>
              </div>

              <hr />
              <ul className="postTopOption">
                <li className="post_search">
                  <input type="search" name="search" placeholder="Search…" />
                </li>
              </ul>
              <div class="card_Gray table-responsive vehicleSub raffle">
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">S.no</th>
                      <th scope="col">Name</th>
                      <th scope="col" className="description">
                        Description{" "}
                      </th>
                      <th scope="col">Price of 1 ticket</th>
                      <th scope="col">Total ticket stock</th>
                      <th scope="col">Deadline to purchase ticket</th>
                      <th scope="col">Lucky draw date</th>
                      <th scope="col" style={{ textAlign: "right" }}>
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {showLotary.length > 0
                      ? showLotary.map((data, index) => (
                          <tr>
                            <th scope="row">{index + 1}</th>
                            <td> {data.name}</td>
                            <td>{data.description}</td>
                            <td>{data.price}</td>
                            <td>20</td>
                            <td>{data.dealEndDate}</td>
                            <td>15-01-2023</td>
                            <td className="actionBtn">
                              {/* {data.active && ( */}
                              <button
                                onClick={() => approveLottery(data.id)}
                                className={`${
                                  data.active === "1"
                                    ? ""
                                    : "bg-light text-dark"
                                } `}
                              >
                                Approve
                              </button>
                              <Link
                                to={`/raffleadmin/edit-raffel/${data.id}`}
                                className=""
                              >
                                <i class="fa-solid fa-pencil"></i>
                              </Link>
                              {/* <button><i class="fa-sharp fa-solid fa-plus"></i></button> */}
                              {/* <button><i class="fa-solid fa-trash-can"></i></button>   */}
                            </td>
                          </tr>
                        ))
                      : null}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default RaffleAdmin;
