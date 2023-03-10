import React, { useEffect, useState } from "react";
import AdminLeftNav from "./AdminLeftNav";
import img_01 from "../../../Assets/images/img_001.webp";
import axios from "axios";
import { Link } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';
function RaffleAdmin() {
  const [showLotary, setShowLotary] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm]=useState('')

  useEffect(() => {
    const fetchLotaryApi = async () => {
      try {
        const response = await axios.get(
          process.env.REACT_APP_URL + "getLotteryDetail"
        );
        if (response.data.data.length > 0) {
          console.log("refral", showLotary);
          setShowLotary(response.data.data);
          setLoading(false)
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
                   Add raffle
                </Link>
              </div>

              <hr id="hr" />
              <div className="row">
                <div className="col">


                  {/* ================= */}
                  <ul className="postTopOption" id="widthChnge">
                    <li className="post_search">
                      <input type="search" name="search" placeholder="Search…" onChange={(e) => {
                        setSearchTerm(e.target.value)
                      }}/>
                    </li>
                  </ul>
                  <div class="card_Gray table-responsive vehicleSub raffle"
                    id="scrollable"
                  >
                    {
                      loading ? <div class="d-flex justify-content-center">
                        <div class="spinner-border" role="status">
                          <span class="sr-only">Loading...</span>
                        </div>
                      </div> : <table class="table table-striped">
                        <thead >
                          <tr>
                            <th scope="col">Sr.No</th>
                            <th scope="col">Name</th>
                            <th scope="col" className="description">
                              Description{" "}
                            </th>
                            <th scope="col">Ticket Price</th>
                            <th scope="col">Stock</th>
                            <th scope="col">Purchase Date</th>
                            <th scope="col">Expiry Date</th>
                            <th scope="col" style={{ textAlign: "right" }}>
                              Action
                            </th>


                          </tr>
                        </thead>
                        <tbody>
                          {showLotary.length > 0
                              ?
                              showLotary.filter((data) => {
                                if (searchTerm == '') {
                                  return data
                                } else if (data.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                  data.description.toLowerCase().includes(searchTerm.toLowerCase())
                                ) {
                                  return data
                                }
                              })
                              .map((data, index) => (

                              <tr>
                                <th scope="row">{index + 1}</th>
                                <td> {data.name}</td>
                                <td>{
                                  data.description.substr(0, 50)
                                }</td>
                                <td>{data.price}</td>
                                <td>20</td>
                                <td>{data.drawdate}</td>
                                <td>{data.dealEndDate}</td>

                                <td className="actionBtn">

                                <Dropdown className="neWm">
                                    <Dropdown.Toggle variant="success" id="">
                                    <i class="fa-solid fa-ellipsis-vertical"></i>
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                      <Dropdown.Item href="#/action-1"> 
                                      <Link id=""
                                        to={`/raffleadmin/edit-raffel/${data.id}`}
                                        className=""
                                      >
                                        <i class="fa-solid fa-pencil"></i> Edit
                                      </Link>
                                      </Dropdown.Item>
                                      <Dropdown.Item href="#/action-2">
                                      
                                      </Dropdown.Item>
                                      
                                    </Dropdown.Menu>
                                  </Dropdown>

                                  {/* {data.active && ( */}
                                  {/* <button
                                  onClick={() => approveLottery(data.id)}
                                  className={`${data.active === "1"
                                      ? ""
                                      : "bg-light text-dark"
                                    } `}
                                >
                                  Approve
                                </button> */}
                                  {/* <Link id="linkTag"
                                    to={`/raffleadmin/edit-raffel/${data.id}`}
                                    className=""
                                  >
                                    <i class="fa-solid fa-pencil"></i>
                                  </Link> */}
                                  {/* <button><i class="fa-sharp fa-solid fa-plus"></i></button> */}
                                  {/* <button><i class="fa-solid fa-trash-can"></i></button>   */}
                                </td>
                              </tr>
                            ))
                            : null}
                        </tbody>
                      </table>
                    }
                   

                   
                  </div>
                  {/* ===================== */}


                </div>
              </div>




            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default RaffleAdmin;
