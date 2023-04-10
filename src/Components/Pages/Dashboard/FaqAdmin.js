import React from "react";
import AdminLeftNav from "./AdminLeftNav";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import parse from "html-react-parser";
import { notify, strToHtml } from "../../UI/globaleVar";
import { useSelector } from "react-redux";
import Dropdown from "react-bootstrap/Dropdown";
import { toast } from "react-toastify";

function FaqAdmin() {
  const [faqData, setFaqData] = useState([]);
  const data = useSelector((state) => state);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchBlogs = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_URL}getFaqs`);
      setFaqData(res.data.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_URL}deleteFaqs/${id}`
      );
      if (res.status === 200) {
        fetchBlogs();
        notify(res.data.message, res.status);
      }
    } catch (err) {
      console(err);
      notify(err.message, err.status);
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
                id="widthChnge"
                style={{ justifyContent: "space-between" }}
              >
                <h3>Faq Management</h3>
                <div>
                  <Link to="/admin-faq/add" className="orange_btn">
                    + Add New Faq
                  </Link>
                </div>
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
                className="card_Gray table-responsive merchant vehicleSub"
                id="scrollable"
              >
                {loading ? (
                  <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                ) : (
                  <table
                    className="table 
                  //table-striped
                  "
                  >
                    <thead>
                      <tr>
                        <th scope="col">Sr.No</th>
                        <th scope="col">Question</th>
                        <th scope="col">Answer</th>
                        <th scope="col">Created Date</th>
                        <th scope="col" style={{ textAlign: "center" }}>
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {faqData &&
                        faqData
                          .filter((curElem) => {
                            if (searchTerm == "") {
                              return curElem;
                            } else if (
                              curElem.title
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
                                <td>{curElem.question} </td>
                                <td>
                                  {curElem?.ans &&
                                    parse(
                                      curElem?.ans?.substr(0, 180),
                                      strToHtml
                                    )}
                                </td>
                                <td>
                                  {curElem.created_at &&
                                    new Date(curElem.created_at).toDateString()}
                                </td>
                                <td className="actionBtn">
                                  <Dropdown className="neWm">
                                    <Dropdown.Toggle variant="success" id="">
                                      <i className="fa-solid fa-ellipsis-vertical"></i>
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                      <Dropdown.Item href="#/action-1">
                                        <Link
                                          to={`/admin-faq/add/${curElem.id}`}
                                        >
                                          <button>
                                            <i className="fa-solid fa-pencil"></i>{" "}
                                            Edit
                                          </button>
                                        </Link>
                                      </Dropdown.Item>
                                      <Dropdown.Item href="#/action-2">
                                        <button
                                          onClick={() =>
                                            handleDelete(curElem.id)
                                          }
                                        >
                                          <i className="fa-solid fa-trash-can"></i>{" "}
                                          Delete
                                        </button>
                                      </Dropdown.Item>
                                    </Dropdown.Menu>
                                  </Dropdown>
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

export default FaqAdmin;
