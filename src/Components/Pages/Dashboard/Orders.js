import React, { useEffect, useState } from "react";
import AdminLeftNav from "./AdminLeftNav";
import img_01 from "../../../Assets/images/img-1.webp";
import axios from "axios";
import { Link } from "react-router-dom";

function Orders() {
  const [orderList, setOrderList] = useState([]);
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm]=useState('')
  useEffect(() => {
    const fetchOreder = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_URL}getallorder`);
        if (res.status === 200) {
          setOrderList(res.data.data);
          setLoading(false)
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchOreder();
  }, []);

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
              <h3>Orders List</h3>
              <hr  id="hr"/>
              <ul className="postTopOption" id="widthChnge">
                <li className="post_search">
                  <input type="search" name="search" placeholder="Search…" onChange={(e) => {
                    setSearchTerm(e.target.value)
                  }}/>
                </li>
              </ul>
              <div class="card_Gray table-responsive merchant vehicleSub" id="hr">

                {
                  loading ? <div class="d-flex justify-content-center">
                    <div class="spinner-border" role="status">
                      <span class="sr-only">Loading...</span>
                    </div>
                  </div> : <table class="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">Sr.no</th>
                        <th scope="col">Date </th>
                        <th scope="col">Name</th>
                        <th scope="col">Order no</th>
                        <th scope="col">Amount</th>
                        <th scope="col" style={{ textAlign: "center" }}>
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                        {orderList &&
                          orderList.filter((curElem) => {
                            if (searchTerm == "") {
                              return curElem
                            } else if (curElem.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                              return curElem
                            }
                          })
                        .map((curElem, i) => {
                          return (
                            <tr key={curElem.id}>
                              <th scope="row">{i + 1}</th>
                              <td>
                                {/* <div className="cartImg">
                                <img src={img_01} />
                              </div> */}
                                {curElem.created_at &&
                                  new Date(
                                    curElem.created_at
                                  ).toLocaleDateString()}
                              </td>
                              <td> {curElem.name} </td>
                              <td>{curElem.order_id}</td>

                              <td className="actionBtn">
                                {/* <button data-toggle="modal" data-target="#EditBlog">
                          <i class="fa-solid fa-pencil"></i>
                        </button> */}

                                {curElem.amount}
                              </td>
                              <td>
                                <Link
                                  to={`/orders-details/${curElem.order_id}`}
                                  className="orange_btn p-1"
                                  style={{

                                    fontWeight: "100",
                                    fontSize: "13px",
                                    marginLeft: "14px"

                                  }}
                                >
                                  View
                                </Link>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                }

                
              </div>

              {/* <!-- Edit PopUp--> */}

              <div class="card_Gray table-responsive vehicleSub" id="scrollable">
                <div className="container">
                  <div className="modal fade" id="EditBlog">
                    <div className="modal-dialog modal-dialog-centered">
                      <div className="modal-content">
                        <div className="modal-header border-0">
                          <h4 className="modal-title">Edit Blog</h4>
                          <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                          >
                            <i className="fa-solid fa-xmark"></i>
                          </button>
                        </div>

                        <div className="modal-body">
                          <form>
                            <div className="row row_gap_5">
                              <div className="col-12 col-md-12">
                                <label>Upload Photos</label>
                                <div className="form-group">
                                  <input
                                    type="file"
                                    class="field"
                                    id="formFileMultiple"
                                    multiple
                                  />
                                </div>
                                <small>
                                  (Accepted file types: jpg, jpeg, png, Max.
                                  file size: 10 MB, Max. files: 200.)
                                </small>
                              </div>

                              <div className="col-12 col-md-12">
                                <label>Blog Name</label>
                                <div className="form-group">
                                  <input
                                    type="text"
                                    name=""
                                    className="field"
                                    placeholder="Product Name"
                                  />
                                </div>
                              </div>
                              <div className="col-12 col-md-12">
                                <label>Blog Description</label>
                                <div className="form-group">
                                  <textarea
                                    className="field"
                                    placeholder="Description here"
                                  ></textarea>
                                </div>
                              </div>

                              {/* <div className="col-12 col-md-12">
                                        <label>Category</label>
                                        <div className="form-group">
                                        <input
                                            type="text"
                                            name=""
                                            className="field"
                                            placeholder="Category Name"
                                        />
                                        </div>
                                    </div>
                                     */}
                            </div>
                            <div className="form-group">
                              <button type="button" className="btn">
                                Submit
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Orders;
