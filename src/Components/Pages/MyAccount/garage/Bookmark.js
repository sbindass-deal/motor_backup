import { Avatar, Space } from "antd";
import React, { useEffect, useState, useRef } from "react";
import men_face from "../../../../Assets/images/men-face.jpg";
import { Modal } from "react-bootstrap";
import axios from "axios";
import { noImage, notify } from "../../../UI/globaleVar";
import { RWebShare } from "react-web-share";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

const Bookmark = ({ id, logo }) => {
  const [file, setFile] = useState([]);
  const [filer, setFiler] = useState([]);
  const [content, setContent] = useState("");
  const [postData, setPostData] = useState([]);
  const [userData, setUserData] = useState({});
  const [commentId, setCommentId] = useState(null);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingr, setLoadingr] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setShow(true);
    setCommentId(id);
  };

  const inputRef = useRef();

  const getPostData = async () => {
    axios
      .post(`${process.env.REACT_APP_URL}getPost/${id}`, {
        page: "bookmark",
      })
      .then(function (res) {
        setPostData(res.data.data);
        // setUserData(res.data.userProfile);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    getPostData();
  }, [id]);

  const handlePost = async (e) => {
    e.preventDefault();
    setLoading(true);
    const url = `${process.env.REACT_APP_URL}addPost`;
    let formdata = new FormData();
    formdata.append("image", file[0]);
    formdata.append("content", content);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    await axios
      .post(url, formdata, config)
      .then((response) => {
        notify(response.data.message, response.status);
        getPostData();
        setContent("");
        setFile([]);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        notify(error.message, error.status);
      });
  };

  const handleLike = async (id) => {
    axios
      .post(`${process.env.REACT_APP_URL}like_dislike_post`, {
        postId: id,
        like_or_dislike: 1,
      })
      .then(function (response) {
        getPostData();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleSavePost = async (id, saved) => {
    axios
      .post(`${process.env.REACT_APP_URL}addSavePost`, {
        postId: id,
        saved: saved,
      })
      .then(function (response) {
        getPostData();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // =================== post again
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    setLoadingr(true);
    const url = `${process.env.REACT_APP_URL}AddRePost`;
    let formdata = new FormData();
    formdata.append("image", filer[0]);
    formdata.append("content", comment);
    formdata.append("rePostId", commentId);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    await axios
      .post(url, formdata, config)
      .then((response) => {
        notify(response.data.message, response.status);
        getPostData();
        setComment("");
        setFiler([]);
        setLoadingr(false);
        handleClose();
      })
      .catch((error) => {
        console.log(error);
        setLoadingr(false);
        notify(error.message, error.status);
      });
  };

  // const handleCommentSubmit = async (e) => {
  //   e.preventDefault();
  //   axios
  //     .post(`${process.env.REACT_APP_URL}addCommentByPost`, {
  //       postId: commentId,
  //       comment: comment,
  //     })
  //     .then(function (response) {
  //       getPostData();
  //       handleClose();
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // };

  return (
    <>
      <section className="py-4 mobileSpec" id="">
        <div className="container">
          <div className="row ">
            <div className="col-12 text-center pb_30"></div>
            <div className="col-12 Videos ghhh">
              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12">
                  <div className="row">
                    {postData.length > 0 &&
                      postData.map((curElem) => {
                        return (
                          <>
                            <div key={curElem.id} className="col-md-12 ">
                              <div className="PostInfo  mb-0">
                                <div className="userImG">
                                  <Space direction="vertical" size={16}>
                                    <Space wrap size={16}>
                                      <Avatar
                                        size={64}
                                        icon={
                                          <img
                                            className="slidImg"
                                            loading="lazy"
                                            src={
                                              curElem?.profileImg &&
                                              `${process.env.REACT_APP_URL}${curElem?.profileImg}`
                                            }
                                            onError={({ currentTarget }) => {
                                              currentTarget.onError = null;
                                              currentTarget.src = noImage;
                                            }}
                                            alt="post"
                                          />
                                        }
                                      />
                                    </Space>
                                  </Space>
                                </div>
                                <div className="DecIbp">
                                  <h5>{curElem?.username}</h5>
                                  <p>{curElem?.content}</p>
                                  <div class="card">
                                    <img
                                      className="slidImg"
                                      loading="lazy"
                                      src={
                                        curElem?.image_path &&
                                        `${process.env.REACT_APP_URL}/${curElem?.image_path}`
                                      }
                                      onError={({ currentTarget }) => {
                                        currentTarget.onError = null;
                                        currentTarget.src = noImage;
                                      }}
                                      alt="post"
                                    />
                                  </div>
                                  <div className="py-3">
                                    <span
                                      onClick={() => handleLike(curElem.id)}
                                      style={{ cursor: "pointer" }}
                                      className="socialCount"
                                    >
                                      {curElem?.liked == 0 ? (
                                        <FavoriteBorderIcon />
                                      ) : (
                                        <FavoriteIcon className="fa-heart" />
                                      )}
                                      &nbsp;{curElem.likes}
                                    </span>
                                    {/* <span
                                    className="socialCount"
                                  >
                                    <i class="fa-sharp fa-solid fa-thumbs-down"></i>
                                  </span> */}
                                    {/* <span
                                      
                                      style={{ cursor: "pointer" }}
                                      className="socialCount"
                                    >
                                      <i class="fa-solid fa-comments"></i>{" "}
                                      {curElem?.comment?.length}
                                    </span> */}
                                    <span
                                      onClick={() => {
                                        handleShow(curElem.id);
                                      }}
                                      className="socialCount"
                                      style={{ cursor: "pointer" }}
                                    >
                                      <i class="fa-solid fa-paper-plane"></i>{" "}
                                      {curElem?.repost?.length}
                                    </span>
                                    {/* <span
                                    onClick={() => {
                                      handleShow();
                                    }}
                                    style={{ cursor: "pointer" }}
                                    className="socialCount"
                                  >
                                    <i class="fa-solid fa-share-from-square"></i>{" "}
                                    0
                                  </span> */}

                                    <span>
                                      <RWebShare
                                        data={{
                                          text: "Gas guzzlrs",
                                          url: "https://beta.gasguzzlrs.com/",
                                          title: "Gas guzzlrs",
                                        }}
                                        onClick={() =>
                                          console.log("shared successfully!")
                                        }
                                      >
                                        <span
                                          className="socialCount"
                                          style={{ cursor: "pointer" }}
                                        >
                                          <i class="fa-solid fa-share-nodes"></i>{" "}
                                          0
                                        </span>
                                      </RWebShare>
                                    </span>
                                    <span className="socialCount">
                                      <i class="fa-solid fa-eye"></i> 99k
                                    </span>
                                    {curElem?.saved == 1 ? (
                                      <span
                                        onClick={() =>
                                          handleSavePost(curElem.id, 0)
                                        }
                                        className="socialCount"
                                        style={{ cursor: "pointer" }}
                                      >
                                        <BookmarkIcon />
                                      </span>
                                    ) : (
                                      <span
                                        onClick={() =>
                                          handleSavePost(curElem.id, 1)
                                        }
                                        style={{ cursor: "pointer" }}
                                        className="socialCount"
                                      >
                                        <BookmarkBorderIcon />
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                              {curElem?.repost?.length > 0 ? (
                                curElem?.repost?.map((com, i) => {
                                  return (
                                    <div key={i} className="PostInfo cm">
                                      <div className="userImG">
                                        <Space direction="vertical" size={16}>
                                          <Space wrap size={16}>
                                            <Avatar
                                              size={64}
                                              icon={
                                                <img
                                                  className="slidImg"
                                                  loading="lazy"
                                                  src={
                                                    com?.profileImg &&
                                                    `${process.env.REACT_APP_URL}${com?.profileImg?.logo}`
                                                  }
                                                  onError={({
                                                    currentTarget,
                                                  }) => {
                                                    currentTarget.onError =
                                                      null;
                                                    currentTarget.src = noImage;
                                                  }}
                                                  alt="comment-user"
                                                />
                                              }
                                            />
                                          </Space>
                                        </Space>
                                      </div>

                                      <div className="DecIbp py-3">
                                        <h5>{com.username}</h5>
                                        <p>{com.content}</p>
                                        <div class="card">
                                          <img
                                            className="slidImg"
                                            loading="lazy"
                                            src={
                                              com?.image_path &&
                                              `${process.env.REACT_APP_URL}/${com?.image_path}`
                                            }
                                            onError={({ currentTarget }) => {
                                              currentTarget.onError = null;
                                              currentTarget.src = noImage;
                                            }}
                                            alt="post"
                                          />
                                        </div>
                                        <div className="py-3">
                                          <span
                                            onClick={() => handleLike(com.id)}
                                            style={{ cursor: "pointer" }}
                                            className="socialCount"
                                          >
                                            {com?.liked == 0 ? (
                                              <FavoriteBorderIcon />
                                            ) : (
                                              <FavoriteIcon className="fa-heart" />
                                            )}
                                            &nbsp;{com.likes}
                                          </span>
                                          {/* <span
                                    className="socialCount"
                                  >
                                    <i class="fa-sharp fa-solid fa-thumbs-down"></i>
                                  </span> */}
                                          {/* <span
                                      
                                      style={{ cursor: "pointer" }}
                                      className="socialCount"
                                    >
                                      <i class="fa-solid fa-comments"></i>{" "}
                                      {curElem?.comment?.length}
                                    </span> */}
                                          <span
                                            onClick={() => {
                                              handleShow(com.id);
                                            }}
                                            className="socialCount"
                                            style={{ cursor: "pointer" }}
                                          >
                                            <i class="fa-solid fa-paper-plane"></i>{" "}
                                            0
                                          </span>
                                          {/* <span
                                    onClick={() => {
                                      handleShow();
                                    }}
                                    style={{ cursor: "pointer" }}
                                    className="socialCount"
                                  >
                                    <i class="fa-solid fa-share-from-square"></i>{" "}
                                    0
                                  </span> */}

                                          <span>
                                            <RWebShare
                                              data={{
                                                text: "Gas guzzlrs",
                                                url: "https://beta.gasguzzlrs.com/",
                                                title: "Gas guzzlrs",
                                              }}
                                              onClick={() =>
                                                console.log(
                                                  "shared successfully!"
                                                )
                                              }
                                            >
                                              <span
                                                className="socialCount"
                                                style={{ cursor: "pointer" }}
                                              >
                                                <i class="fa-solid fa-share-nodes"></i>{" "}
                                                0
                                              </span>
                                            </RWebShare>
                                          </span>
                                          <span className="socialCount">
                                            <i class="fa-solid fa-eye"></i> 99k
                                          </span>
                                          {com?.saved == 1 ? (
                                            <span
                                              onClick={() =>
                                                handleSavePost(com.id, 0)
                                              }
                                              className="socialCount"
                                              style={{ cursor: "pointer" }}
                                            >
                                              <BookmarkIcon />
                                            </span>
                                          ) : (
                                            <span
                                              onClick={() =>
                                                handleSavePost(com.id, 1)
                                              }
                                              style={{ cursor: "pointer" }}
                                              className="socialCount"
                                            >
                                              <BookmarkBorderIcon />
                                            </span>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })
                              ) : (
                                <br />
                              )}
                            </div>
                          </>
                        );
                      })}

                    {/* <div className="row">
                      <div className="col-md-12 ">
                        <div className="PostInfo">
                          <div className="userImG">
                            <Space direction="vertical" size={16}>
                              <Space wrap size={16}>
                                <Avatar
                                  size={64}
                                  icon={<img src={men_face} alt="logo" />}
                                />
                              </Space>
                            </Space>
                          </div>
                          <div className="DecIbp">
                            <h5>User</h5>
                            <p>
                              This is a wider card with supporting text below as
                              a natural lead-in to additional content. This
                              content is a little bit longer.
                            </p>
                            <div class="card">
                              <img
                                src="https://tse1.mm.bing.net/th?id=OIP.cedHozvsh9JzkHQgRVg8XQHaE8&pid=Api&P=0"
                                class="card-img-bottom"
                                alt="..."
                              />
                            </div>
                            <div className="py-3">
                              <span className="socialCount">
                                <i className={`fa-solid fa-thumbs-up `}></i> 22
                              </span>
                              <span className="socialCount">
                                <i class="fa-solid fa-comments"></i> 2
                              </span>
                              <span className="socialCount">
                                <i class="fa-solid fa-share-from-square"></i> 12
                              </span>
                              <span
                                onClick={() => {
                                  handleShow();
                                }}
                                style={{ cursor: "pointer" }}
                                className="socialCount"
                              >
                                <i class="fa-solid fa-heart"></i> 8,427
                              </span>

                              <span className="socialCount">
                                <i class="fa-solid fa-eye"></i> 99k
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Modal show={show} onHide={handleClose} className="modal fade" centered>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header border-0">
              <button
                onClick={handleClose}
                type="button"
                className="close"
                data-dismiss="modal"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <div className="modal-body">
              <div className="row youPage frrt">
                <div className="col-md-12 ">
                  <div className="PostInfo">
                    <div className="userImG">
                      <Space direction="vertical" size={16}>
                        <Space wrap size={16}>
                          <Avatar
                            size={64}
                            icon={
                              <img
                                src={
                                  logo?.logo &&
                                  `${process.env.REACT_APP_URL}/${logo?.logo[0]?.logo}`
                                }
                                onError={({ currentTarget }) => {
                                  currentTarget.onError = null;
                                  currentTarget.src = noImage;
                                }}
                                alt="logo"
                              />
                            }
                          />
                        </Space>
                      </Space>
                    </div>
                    {/* <form onSubmit={handleCommentSubmit}>
                      <div className="DecIbp ">
                        <textarea
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          className="field"
                          rows="8"
                          cols="100"
                          placeholder="What’s happening?"
                          required
                        ></textarea>
                        <div className="youD">
                          <div className="py-3">
                           
                          </div>
                          <button type="submit" class="btn">
                            Post
                          </button>
                        </div>
                      </div>
                    </form> */}
                    <form onSubmit={handleCommentSubmit} className="DecIbp ">
                      <div className="field">
                        <textarea
                          className="field border-0"
                          rows="4"
                          cols="100"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          placeholder="What’s happening?"
                          required
                        ></textarea>
                        <div className="field border-0">
                          {Array.from(filer).map((items) => {
                            return (
                              <span>
                                <img
                                  src={
                                    items ? URL.createObjectURL(items) : null
                                  }
                                  style={{
                                    width: "200px",
                                    height: "200px",
                                    objectFit: "cover",
                                    padding: "15px",
                                  }}
                                />
                              </span>
                            );
                          })}
                        </div>
                      </div>
                      <div className="youD">
                        <div className="py-3">
                          <span>
                            <input
                              onChange={(e) => {
                                return setFiler((prevState) => [
                                  ...e.target.files,
                                ]);
                              }}
                              name="file"
                              type="file"
                              accept="image/gif, image/jpeg, image/png, image/jpg"
                              ref={inputRef}
                              hidden
                            />
                            <span
                              onClick={() => inputRef.current.click()}
                              style={{ cursor: "pointer" }}
                              className="socialCount"
                            >
                              <i class="fa-solid fa-image"></i>
                            </span>
                          </span>
                          {/* <span className="socialCount">
                        <i class="fa-solid fa-bars-progress"></i>
                      </span> */}
                          {/* <span
                        style={{ cursor: "pointer" }}
                        className="socialCount"
                      >
                        <i class="fa-solid fa-face-smile"></i>
                      </span> */}
                          {/* <span className="socialCount">
                        <i class="fa-solid fa-business-time"></i>
                      </span> */}

                          {/* <span className="socialCount">
                        <i class="fa-solid fa-location-dot"></i>
                      </span> */}
                        </div>
                        {loadingr ? (
                          <button type="button" className="btn">
                            Posting...
                          </button>
                        ) : (
                          <button type="submit" class="btn">
                            Post
                          </button>
                        )}
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Bookmark;
