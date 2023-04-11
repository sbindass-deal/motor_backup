import { Avatar, Space } from "antd";
import React, { useEffect, useState, useRef } from "react";
import men_face from "../../../../Assets/images/men-face.jpg";
import { Modal } from "react-bootstrap";
import axios from "axios";
import { noImage, notify } from "../../../UI/globaleVar";
import EmojiPicker from "emoji-picker-react";

const Post = () => {
  const [file, setFile] = useState([]);
  const [content, setContent] = useState("");
  const [postData, setPostData] = useState([]);
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showEmoji, setShowEmoji] = useState();
  const handleCloseEmoji = () => setShowEmoji(false);
  const handleShowEmoji = () => setShowEmoji(true);

  const inputRef = useRef();

  const getPostData = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_URL}getPost`);
      if (res.status === 200) {
        setPostData(res.data.data);
        // setUserData(res.data.userProfile);
      }
      console.log(111, res.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getPostData();
  }, []);

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
        like_or_dislike: 2,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      <section className="py-4 mobileSpec" id="">
        <div className="container">
          <div className="row youPage">
            <div className="col-md-12 ">
              <div className="PostInfo">
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
                              userData?.logo &&
                              `${process.env.REACT_APP_URL}${userData?.logo}`
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
                <form onSubmit={handlePost} className="DecIbp ">
                  <div className="field">
                    <textarea
                      className="field border-0"
                      rows="4"
                      cols="100"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="What’s happening?"
                      required
                    ></textarea>
                    <div className="field border-0">
                      {Array.from(file).map((items) => {
                        return (
                          <span>
                            <img
                              src={items ? URL.createObjectURL(items) : null}
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
                            return setFile((prevState) => [...e.target.files]);
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
                    {loading ? (
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
          <div className="row ">
            <div className="col-12 text-center pb_30"></div>
            <div className="col-12 Videos ghhh">
              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12">
                  <div className="row">
                    {postData.length > 0 &&
                      postData.map((curElem) => {
                        return (
                          <div key={curElem.id} className="col-md-12 ">
                            <div className="PostInfo">
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
                                            userData?.logo &&
                                            `${process.env.REACT_APP_URL}${userData?.logo}`
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
                                <h5>{userData.title}</h5>
                                <p>{curElem.content}</p>
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
                                    className="socialCount"
                                  >
                                    <i class="fa-solid fa-heart"></i>{" "}
                                    12
                                  </span>
                                  {/* <span
                                    className="socialCount"
                                  >
                                    <i class="fa-sharp fa-solid fa-thumbs-down"></i>
                                  </span> */}
                                  <span className="socialCount">
                                    <i class="fa-solid fa-comments"></i> 0
                                  </span>
                                  <span
                                    onClick={() => {
                                      handleShow();
                                    }}
                                    style={{ cursor: "pointer" }}
                                    className="socialCount"
                                  >
                                    <i class="fa-solid fa-share-from-square"></i>{" "}
                                    0
                                  </span>
                                  
                                     
                                      
                                      <span
                                        onClick={handleShow}
                                        className="socialCount"
                                        style={{ cursor: "pointer" }}
                                      >
                                        <i class="fa-solid fa-share-nodes"></i>{" "}
                                        12
                                      </span>
                                    

                                      <span className="socialCount">
                                        <i class="fa-solid fa-eye"></i> 99k
                                      </span>
                                      <span className="socialCount">
                                      <i class="fa-regular fa-bookmark"></i>
                                      </span>

                                      <span className="socialCount">
                                          <i class="fa-solid fa-bookmark"></i>
                                      </span>
                                      <span className="socialCount">
                                      <i class="fa-solid fa-paper-plane"></i>
                                      </span>

                                      
                                   
                                </div>
                              </div>
                            </div>
                          </div>
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
                            icon={<img src={men_face} alt="logo" />}
                          />
                        </Space>
                      </Space>
                    </div>
                    <div className="DecIbp ">
                      <textarea
                        className="field"
                        rows="8"
                        cols="100"
                        placeholder="What’s happening?"
                      ></textarea>
                      <div className="youD">
                        <div className="py-3">
                          <span className="socialCount">
                            <i class="fa-solid fa-image"></i>
                          </span>
                          {/* <span className="socialCount">
                            <i class="fa-solid fa-bars-progress"></i>
                          </span> */}
                          {/* <span className="socialCount">
                            <i class="fa-solid fa-face-smile"></i>
                          </span> */}
                          {/* <span className="socialCount">
                            <i class="fa-solid fa-business-time"></i>
                          </span> */}

                          {/* <span className="socialCount">
                            <i class="fa-solid fa-location-dot"></i>
                          </span> */}
                        </div>
                        <button class="btn">Post</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <Modal
        show={showEmoji}
        onHide={handleCloseEmoji}
        className="modal fade"
        centered
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header border-0">
              <button
                onClick={handleCloseEmoji}
                type="button"
                className="close"
                data-dismiss="modal"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <div className="modal-body">
              <EmojiPicker />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Post;
