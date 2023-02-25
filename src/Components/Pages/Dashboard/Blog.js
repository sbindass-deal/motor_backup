import React from "react";
import AdminLeftNav from "./AdminLeftNav";
import img_01 from "../../../Assets/images/img-1.webp";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import parse from "html-react-parser";
import { strToHtml } from "../../UI/globaleVar";

function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_URL}/getblogs`);
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
                <AdminLeftNav />
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
                  {/* <Link to="/admin/add-blog" className="btn">
                    <i class="fa-sharp fa-solid fa-plus"></i>
                  </Link> */}
                  <Link
                    to="/admin/add-blog"
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
                                  <Link to={`/editBlog/${curElem.id}`}>
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

              {/* <!-- Edit PopUp--> */}

              {/* <div class="card_Gray table-responsive vehicleSub">
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
              </div> */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Blog;
