import React from "react";
import AdminLeftNav from "./AdminLeftNav";
import img_01 from "../../../Assets/images/img-1.webp";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import parse from "html-react-parser";
import { strToHtml } from "../../UI/globaleVar";
import { useSelector } from "react-redux";
import Dropdown from "react-bootstrap/Dropdown";
import { toast } from "react-toastify";

function Blog() {
  const [blogs, setBlogs] = useState([]);
  const data = useSelector((state) => state);
  // console.log(111, data.login.user.user_id)

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

  console.log(blogs);

  const notify = (val) =>
    toast.success(val, {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });


  const handleDelete = (id) => {
    axios
      .delete(`${process.env.REACT_APP_URL}deleteblogs/${id}`)
      .then((response) => {
        if (response.status === 200) {
          notify("Deleted successfully !");
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
              <div
                className="d-flex"
                id="widthChnge"
                style={{ justifyContent: "space-between" }}
              >
                <h3>Blogs Management</h3>
                <div>
                  {/* <Link to="/admin/add-blog" className="btn">
                    <i className="fa-sharp fa-solid fa-plus"></i>
                  </Link> */}
                  <Link to="/admin/add-blog" className="orange_btn">
                    + Add New Blogs
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
                  <table className="table 
                  //table-striped
                  ">
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
                                      className="img-fluid2"
                                      src={`${process.env.REACT_APP_URL}upload/blogs/${curElem.image}`}
                                    />
                                  </div>
                                </td>
                                <td>{curElem.title} </td>
                                {/* <td>{ curElem?.description.substr(0, 100)}</td> */}

                                <td>
                                  {curElem?.description &&
                                    parse(
                                      curElem?.description?.substr(0, 300),
                                      strToHtml
                                    )}
                                </td>
                                <td>
                                  {curElem.created_at &&
                                    new Date(
                                      curElem.created_at
                                    ).toDateString()}
                                </td>
                                <td className="actionBtn">
                                  <Dropdown className="neWm">
                                    <Dropdown.Toggle variant="success" id="">
                                      <i className="fa-solid fa-ellipsis-vertical"></i>
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                      <Dropdown.Item href="#/action-1">
                                        <Link to={`/editBlog/${curElem.id}`}>
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

              {/* <!-- Edit PopUp--> */}

              {/* <div className="card_Gray table-responsive vehicleSub">
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
                                    className="field"
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
