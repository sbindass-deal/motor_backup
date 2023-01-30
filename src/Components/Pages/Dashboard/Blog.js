import React from "react";
import AdminLeftNav from "./AdminLeftNav";
import img_01 from "../../../Assets/images/img-1.webp";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

function Blog() {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_URL}/getblogs`);
        setBlogs(res.data.data);
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
                style={{ justifyContent: "space-between" }}
              >
                My Blogs
                <div>
                  <Link to="/admin/add-blog" className="btn">
                    <i class="fa-sharp fa-solid fa-plus"></i>
                  </Link>
                </div>
              </h3>

              <hr />
              <ul className="postTopOption">
                <li className="post_search">
                  <input type="search" name="search" placeholder="Search…" />
                </li>
              </ul>
              <div class="card_Gray table-responsive merchant vehicleSub">
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">Id</th>
                      <th scope="col">Image </th>
                      <th scope="col">Title</th>
                      <th scope="col">Description</th>
                      <th scope="col">Created Date</th>
                      <th scope="col" style={{ textAlign: "right" }}>
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {blogs &&
                      blogs.map((curElem, i) => {
                        return (
                          <tr key={curElem.id}>
                            <th scope="row">{i + 1}</th>
                            <td>
                              <div className="cartImg">
                                <img
                                  src={`${process.env.REACT_APP_URL}upload/blogs/${curElem.image}`}
                                />
                              </div>
                            </td>
                            <td>{curElem.title} </td>
                            <td>{curElem.description}</td>
                            <td>
                              {curElem.created_at &&
                                new Date(
                                  curElem.created_at
                                ).toLocaleDateString()}
                            </td>
                            <td className="actionBtn">
                              {/* <button data-toggle="modal" data-target="#EditBlog">
                              <i class="fa-solid fa-pencil"></i>
                            </button> */}
                              <button onClick={() => handleDelete(curElem.id)}>
                                <i class="fa-solid fa-trash-can"></i>
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
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
