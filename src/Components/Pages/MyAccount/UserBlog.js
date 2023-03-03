import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import parse from "html-react-parser";
import { strToHtml } from "../../UI/globaleVar";
import MyAccountLeftNav from "./MyAccountLeftNav";
import { useSelector } from "react-redux";

function UserBlog() {
  const data = useSelector((state) => state);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_URL}admin/getblogs/${data.login.user.user_id}`
        );
        setBlogs(res.data.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchBlogs();
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`${process.env.REACT_APP_URL}deleteblogs/${id}`)
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
                My Blogs
                <div>
                  {/* <Link to="/admin/add-UserBlog" className="btn">
                    <i class="fa-sharp fa-solid fa-plus"></i>
                  </Link> */}
                  <Link
                    to="/add-user-blog"
                    className="orange_btn"
                    style={{
                      padding: "4px",
                      fontSize: "18px",
                      fontWeight: "100",
                    }}
                  >
                    + Add My Blogs
                  </Link>
                </div>
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
                        <th scope="col">Image </th>
                        <th scope="col">Title</th>
                        <th scope="col">Description</th>
                        <th scope="col">Created Date</th>
                        <th scope="col" style={{ textAlign: "center" }}>
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {blogs &&
                        blogs
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
                                <td>
                                  <div className="">
                                    <img
                                      width={200}
                                      className="img-fluid"
                                      src={`${process.env.REACT_APP_URL}upload/blogs/${curElem.image}`}
                                    />
                                  </div>
                                </td>
                                <td>{curElem.title} </td>
                                {/* <td>{ curElem?.description.substr(0, 100)}</td> */}

                                <td>
                                  {parse(
                                    curElem?.description?.substr(0, 300),
                                    strToHtml
                                  )}
                                </td>
                                <td>
                                  {curElem.created_at &&
                                    new Date(
                                      curElem.created_at
                                    ).toLocaleDateString()}
                                </td>
                                <td className="actionBtn">
                                  <Link to={`/edit-user-blog/${curElem.id}`}>
                                    <button>
                                      <i class="fa-solid fa-pencil"></i>
                                    </button>
                                  </Link>
                                  <button
                                    onClick={() => handleDelete(curElem.id)}
                                  >
                                    <i class="fa-solid fa-trash-can"></i>
                                  </button>
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

export default UserBlog;
