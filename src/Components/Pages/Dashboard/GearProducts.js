import React, { useState } from "react";
import AdminLeftNav from "./AdminLeftNav";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import Dropdown from "react-bootstrap/Dropdown";

function GearProducts() {
  const [searchTerm, setSearchTerm] = useState("");
  const data = useSelector((state) => state);
  const products = data.gearReducer.gearData;

  const handleDelete = (id) => {
    axios
      .delete(`${process.env.REACT_APP_URL}deleteproduct/${id}`)
      .then((response) => {
        if (response.status === 200) {
          window.location.reload(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
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
              {/* <h3>Gear Products</h3>
              <Link to="/add/gear-product" className="orange_btn">
                <i class="fa-sharp fa-solid fa-plus"></i>
              </Link> */}

              <div
                className="d-flex"
                style={{ justifyContent: "space-between" }}
                id="widthChnge"
              >
                <h3>Gear Products</h3>
                <Link to="/add/gear-product" className="orange_btn">
                  <i className="fa-solid fa-plus mr-2"></i>
                  Add Products
                </Link>
              </div>

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
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">Sr.No</th>
                      <th scope="col">Image </th>
                      <th scope="col">Product Name</th>
                      <th scope="col">Price</th>
                      <th scope="col">Color</th>
                      <th scope="col">Size</th>
                      <th scope="col">Category </th>
                      <th scope="col" style={{ textAlign: "center" }}>
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {products
                      .filter((curElem, i) => {
                        if (searchTerm == "") {
                          return curElem;
                        } else if (
                          curElem.title
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase()) ||
                          curElem.color
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase()) ||
                          curElem.size
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase()) ||
                          curElem.category
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase())
                        ) {
                          return curElem;
                        }
                      })
                      .map((curElem, i) => {
                        return (
                          <tr key={curElem.id}>
                            <th scope="row">{i + 1}</th>
                            <td>
                              <div className="">
                                <img
                                  width={100}
                                  className="img-fluid"
                                  src={`${process.env.REACT_APP_URL}upload/products/${curElem.image}`}
                                  alt={curElem.title}
                                />
                              </div>
                            </td>
                            <td>{curElem.title}</td>
                            <td>${curElem.price}</td>
                            <td>{curElem.color}</td>
                            <td>{curElem.size}</td>
                            <td>{curElem.category}</td>
                            {/* <td className="actionBtn">
                              <Link to={`/gear-product/${curElem.id}`}>
                                <button
                                  data-toggle="modal"
                                  data-target="#MerchandiseEdit"
                                >
                                  <i class="fa-solid fa-pencil"></i>
                                </button>
                              </Link>
                              <button onClick={() => handleDelete(curElem.id)}>
                                <i class="fa-solid fa-trash-can"></i>
                              </button>
                            </td> */}

                            <td className="text-right">
                              <Dropdown className="neWm">
                                <Dropdown.Toggle variant="success" id="">
                                  <i class="fa-solid fa-ellipsis-vertical"></i>
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                  <Dropdown.Item href="#/action-1">
                                    <Link
                                      className="editDrop"
                                      to={`/gear-product/${curElem.id}`}
                                      // className="btn"
                                    >
                                      <i class="fa-solid fa-pencil"></i> Edit
                                    </Link>
                                  </Dropdown.Item>
                                  <Dropdown.Item href="#/action-2">
                                    <Link
                                      to={``}
                                      className="editDrop"
                                      onClick={() => handleDelete(curElem.id)}
                                    >
                                      <i class="fa-solid fa-trash-can"></i>{" "}
                                      Delete
                                    </Link>
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </td>
                          </tr>
                        );
                      })}

                    {/* <Link to="/add/gear-product" className="btn mt-4">
                      <i class="fa-sharp fa-solid fa-plus"></i>
                    </Link> */}
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

export default GearProducts;
