import React, { useEffect } from "react";
import MyAccountLeftNav from "../MyAccountLeftNav";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { noImage, notify, strToHtml } from "../../../UI/globaleVar";
import parse from "html-react-parser";
import { Avatar, Image, Space } from "antd";
// import { handleGarage } from "../../../../redux/reducers/planReducer";
// import MyGaragesList from "./MyGaragesList";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import men_face from "../../../../Assets/images/men-face.jpg";

import { Modal } from "react-bootstrap";
import GaragesVehicle from "../../garages/GaragesVehicle";
import GaragesAuction from "../../garages/GaragesAuction";
import GaragesBlog from "../../garages/GaragesBlog";
import { handleGarage } from "../../../../redux/reducers/planReducer";

function UserGarage() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [garagesData, setGaragesData] = useState({});
  const [showMore, setShowMore] = useState(false);
  const [dealerData, setDealerData] = useState({});
  const [garagesDataList, setGaragesDataList] = useState([]);

  const userId = useSelector((state) => state);
  const id = userId.login.user.user_id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userInfo, setUserinfo] = useState({});
  const [isPrivateOrPublic, setIsPrivateOrPublic] = useState(false);

  const fetchUsrApi = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_URL}getGarageReturn`
      );
      if (res.data.data) {
        setUserinfo(res.data.data);
        setIsPrivateOrPublic(res.data.data.published == 0 ? false : true);
      } else {
        setUserinfo(userInfo);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchUsrApi();
  }, []);

  const handlePrivateOrPublic = (e) => {
    setIsPrivateOrPublic(e.target.checked);
    axios
      .post(`${process.env.REACT_APP_URL}profile_public`, {
        publish: `${isPrivateOrPublic == true ? 0 : 1}`,
      })
      .then(function (response) {
        if (response.data.status === 200) {
          fetchUsrApi();
          notify(response.data.message, response.data.status);
        } else {
          notify(response.data.message, response.data.status);
        }
      })
      .catch(function (error) {
        notify(error.message, error.status);
      });
  };

  // =======================
  useEffect(() => {
    const fetchDealer = async () => {
      axios
        .post(`${process.env.REACT_APP_URL}getuserDetailById`, {
          id,
        })
        .then(function (response) {
          if (response.data.data) {
            setGaragesData({ ...response.data.data[0] });
          } else {
            setGaragesData({});
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    fetchDealer();
  }, [id]);

  const fetchGarages = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_URL}garages`);
      setGaragesDataList([...res.data.data]);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchGarages();
  }, []);

  useEffect(() => {
    const fetchDealer = async () => {
      axios
        .post(`${process.env.REACT_APP_URL}getuserDetailById`, {
          id,
        })
        .then(function (response) {
          if (response.data.data) {
            setDealerData({ ...response.data.data[0] });
          } else {
            setDealerData({});
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    fetchDealer();

    // const vehicleDataAfterFilter = vehicleData
    //   .filter((item) => item.userId === parseInt(id, 10))
    //   .map((data) => data);
    // let initialState = [];
    // vehicleDataAfterFilter.map((data) => {
    //   initialState = [...data.images, ...initialState];
    // });

    // setUserVehicleImage(initialState);
  }, [id]);

  // =======================

  return (
    <div>
      <section className="ptb_80 pt_sm_50">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-4 col-lg-3">
              <div className="card_Gray mb-5 mb-md-0">
                <h5>Garage</h5>
                <hr />
                <MyAccountLeftNav />
              </div>
            </div>

            <div className="col-12 col-md-8 col-lg-9">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div className="d-flex ">
                  <h3>Garage</h3>
                  <Link
                    to={`/garages-user-details/${id}`}
                    className="px-3 VIEWEY"
                  >
                    <i class="fa-solid fa-eye"></i>
                  </Link>
                </div>
                <div className="d-flex align-items-center">
                  {userInfo.dealer == "No" && (
                    <div className="tg-item mx-4">
                      <input
                        className="tgl tgl-skewed"
                        name="news"
                        onChange={(e) => handlePrivateOrPublic(e)}
                        id="cb1"
                        type="checkbox"
                        checked={isPrivateOrPublic}
                      />
                      <label
                        className="tgl-btn"
                        data-tg-off="Private"
                        data-tg-on="Public"
                        for="cb1"
                      ></label>
                    </div>
                  )}
                  {/* <button
                    onClick={() => {
                      handleShow();
                    }}
                    className="gry_btn px-3 mx-2"
                  >
                    + Add Post
                  </button> */}
                  <button
                    onClick={() => {
                      navigate("/vechiles");
                      dispatch(handleGarage(false));
                    }}
                    className="gry_btn px-3 mx-2"
                  >
                    + Add Garage
                  </button>
                  {/* <Link to="/editmyaccount-garages" className="gry_btn px-3">
                    Edit Garage
                  </Link> */}
                </div>
              </div>
              <hr />
              {/* <ul className="labelList_">
                <li>
                  <div className="labelList_label">Title</div>
                  <div className="labelList_text">
                    {userInfo.title} <br />
                  </div>
                </li>
                <li>
                  <div className="labelList_label">About us</div>
                  <div className="labelList_text">
                    {userInfo.about_us && parse(userInfo.about_us, strToHtml)}
                  </div>
                </li>
                <li>
                  <div className="labelList_label">Description</div>
                  <div className="labelList_text">
                    {userInfo?.description &&
                      parse(userInfo?.description, strToHtml)}
                  </div>
                </li>

                {true && (
                  <>
                    <h6>Logo</h6>
                    <hr />
                    <div className="imgCross">
                      <Image.PreviewGroup>
                        {userInfo?.logo?.map((curElem, i) => {
                          return (
                            <span key={i}>
                              <Image
                                loading="lazy"
                                src={`${process.env.REACT_APP_URL}/${curElem?.logo}`}
                                onError={({ currentTarget }) => {
                                  currentTarget.onError = null;
                                  currentTarget.src = noImage;
                                }}
                                alt="logo"
                              />
                            </span>
                          );
                        })}
                      </Image.PreviewGroup>
                    </div>
                    <h6 className="mt-3">Banner</h6>
                    <hr />
                    <div className="imgCross">
                      <Image.PreviewGroup>
                        {userInfo?.image_Banner?.map((curElem, i) => {
                          return (
                            <span key={i}>
                              <Image
                                loading="lazy"
                                src={`${process.env.REACT_APP_URL}/${curElem?.logo}`}
                                onError={({ currentTarget }) => {
                                  currentTarget.onError = null;
                                  currentTarget.src = noImage;
                                }}
                                alt="banner"
                              />
                            </span>
                          );
                        })}
                      </Image.PreviewGroup>
                    </div>
                    <h6 className="mt-3">Gallery</h6>
                    <hr />
                    <div className="imgCross">
                      <Image.PreviewGroup>
                        {userInfo?.image_Gallery?.map((curElem, i) => {
                          return (
                            <span key={i}>
                              <Image
                                loading="lazy"
                                src={`${process.env.REACT_APP_URL}/${curElem?.logo}`}
                                onError={({ currentTarget }) => {
                                  currentTarget.onError = null;
                                  currentTarget.src = noImage;
                                }}
                                alt="gallery"
                              />
                            </span>
                          );
                        })}
                      </Image.PreviewGroup>
                    </div>
                  </>
                )}
              </ul> */}
              {/* <MyGaragesList id={userId.login.user.user_id} /> */}

              {/* ============================ added new user garages start */}

              <div className="container">
                <div className="row">
                  <div className="col-md-12 ">
                    <div className="UserImZ mt-4">
                      <Space direction="vertical" size={16}>
                        <Space wrap size={16}>
                          <Avatar
                            size={100}
                            icon={
                              <img
                                className="slidImg"
                                loading="lazy"
                                src={
                                  userInfo?.logo &&
                                  `${process.env.REACT_APP_URL}/${userInfo?.logo[0]?.logo}`
                                }
                                onError={({ currentTarget }) => {
                                  currentTarget.onError = null;
                                  currentTarget.src = noImage;
                                }}
                                alt="Logo"
                              />
                            }
                          />
                        </Space>
                      </Space>
                      <div className="followers">
                        <ul className="fwrList">
                          <li>
                            <span>22</span> Followers
                          </li>
                          <li>
                            <span>2</span>Following
                          </li>
                          <li>
                            <span>12</span>Post
                          </li>
                        </ul>
                        <button className="btn">Follow</button>
                      </div>
                    </div>
                    <h2 className="mt-4">
                      {userInfo.title}
                      <Link to="/editmyaccount-garages">
                        <i class="fa-solid fa-pen-to-square"></i>
                      </Link>
                    </h2>
                    <ul className="labelList_">
                      {/* <li>
                       
                        <div className="labelList_text">
                          {userInfo.about_us &&
                            parse(userInfo.about_us, strToHtml)}
                        </div>
                      </li> */}
                      <li>
                        <div className="labelList_text">
                          {userInfo?.description &&
                            parse(userInfo?.description, strToHtml)}
                        </div>
                      </li>
                    </ul>
                    <ul class="nav nav-tabs my-4 tBB" id="myTab" role="tablist">
                      <li class="nav-item" role="presentation">
                        <button
                          class="nav-link active"
                          id="home-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#home-tab-pane"
                          type="button"
                          role="tab"
                          aria-controls="home-tab-pane"
                          aria-selected="true"
                        >
                          Garage
                        </button>
                      </li>
                      <li class="nav-item" role="presentation">
                        <button
                          class="nav-link"
                          id="profile-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#profile-tab-pane"
                          type="button"
                          role="tab"
                          aria-controls="profile-tab-pane"
                          aria-selected="false"
                        >
                          Auctions
                        </button>
                      </li>
                      <li class="nav-item" role="presentation">
                        <button
                          class="nav-link"
                          id="contact-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#contact-tab-pane"
                          type="button"
                          role="tab"
                          aria-controls="contact-tab-pane"
                          aria-selected="false"
                        >
                          Posts
                        </button>
                      </li>
                      <li class="nav-item" role="presentation">
                        <button
                          class="nav-link"
                          id="video-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#video-tab-pane"
                          type="button"
                          role="tab"
                          aria-controls="video-tab-pane"
                          aria-selected="false"
                        >
                          Replies
                        </button>
                      </li>
                      <li class="nav-item" role="presentation">
                        <button
                          class="nav-link"
                          id="video-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#blog-tab-pane"
                          type="button"
                          role="tab"
                          aria-controls="blog-tab-pane"
                          aria-selected="false"
                        >
                          Blog
                        </button>
                      </li>
                      <li class="nav-item" role="presentation">
                        <button
                          class="nav-link"
                          id="gallery-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#gallery-tab-pane"
                          type="button"
                          role="tab"
                          aria-controls="gallery-tab-pane"
                          aria-selected="false"
                        >
                          Gallery
                        </button>
                      </li>
                    </ul>
                    <div class="tab-content" id="myTabContent">
                      <div
                        class="tab-pane fade show active"
                        id="home-tab-pane"
                        role="tabpanel"
                        aria-labelledby="home-tab"
                        tabindex="0"
                      >
                        <GaragesVehicle id={id} />
                        {/* <div className="row pt-4 row_gridList false">
                  <div class="col-12 col-lg-4 col-md-4 pb-3 auctionLive">
                    <div class="card_post">
                      <div class="card_postImg">
                        <div class="list_wrapper">
                          <a class="auction_image" href="/detail/125">
                            <img
                              loading="lazy"
                              src="https://api.GasGuzzlrs.com//./upload/vehicles//Vehicle-41309003081.webp"
                              alt="Ferrari"
                            />
                          </a>
                        </div>
                      </div>
                      <div class="card_postInfo">
                        <h4 class="car_title">
                          <a href="/detail/125"> Ferrari Spyder 2020</a>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div class="col-12 col-lg-4 col-md-4 pb-3 auctionLive">
                    <div class="card_post">
                      <div class="card_postImg">
                        <div class="list_wrapper">
                          <a class="auction_image" href="/detail/125">
                            <img
                              loading="lazy"
                              src="https://api.GasGuzzlrs.com//./upload/vehicles//Vehicle-41309003081.webp"
                              alt="Ferrari"
                            />
                          </a>
                        </div>
                      </div>
                      <div class="card_postInfo">
                        <h4 class="car_title">
                          <a href="/detail/125"> Ferrari Spyder 2020</a>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div class="col-12 col-lg-4 col-md-4 pb-3 auctionLive">
                    <div class="card_post">
                      <div class="card_postImg">
                        <div class="list_wrapper">
                          <a class="auction_image" href="/detail/125">
                            <img
                              loading="lazy"
                              src="https://api.GasGuzzlrs.com//./upload/vehicles//Vehicle-41309003081.webp"
                              alt="Ferrari"
                            />
                          </a>
                        </div>
                      </div>
                      <div class="card_postInfo">
                        <h4 class="car_title">
                          <a href="/detail/125"> Ferrari Spyder 2020</a>
                        </h4>
                      </div>
                    </div>
                  </div>
                </div> */}
                      </div>
                      <div
                        class="tab-pane fade"
                        id="profile-tab-pane"
                        role="tabpanel"
                        aria-labelledby="profile-tab"
                        tabindex="0"
                      >
                        <GaragesAuction
                          dealerName={dealerData.name}
                          userId={id}
                          showUserName={false}
                        />
                      </div>
                      <div
                        class="tab-pane fade"
                        id="contact-tab-pane"
                        role="tabpanel"
                        aria-labelledby="contact-tab"
                        tabindex="0"
                      >
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
                                            <img src={men_face} alt="logo" />
                                          }
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
                                        <span className="socialCount">
                                          <i class="fa-solid fa-bars-progress"></i>
                                        </span>
                                        <span className="socialCount">
                                          <i class="fa-solid fa-face-smile"></i>
                                        </span>
                                        <span className="socialCount">
                                          <i class="fa-solid fa-business-time"></i>
                                        </span>

                                        <span className="socialCount">
                                          <i class="fa-solid fa-location-dot"></i>
                                        </span>
                                      </div>
                                      <button class="btn">Post</button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="row ">
                              <div className="col-12 text-center pb_30"></div>

                              <div className="col-12 Videos ghhh">
                                <div className="row">
                                  <div className="col-lg-12 col-md-12 col-sm-12">
                                    <div className="row">
                                      <div className="row">
                                        <div className="col-md-12 ">
                                          <div className="PostInfo">
                                            <div className="userImG">
                                              <Space
                                                direction="vertical"
                                                size={16}
                                              >
                                                <Space wrap size={16}>
                                                  <Avatar
                                                    size={64}
                                                    icon={
                                                      <img
                                                        src={men_face}
                                                        alt="logo"
                                                      />
                                                    }
                                                  />
                                                </Space>
                                              </Space>
                                            </div>
                                            <div className="DecIbp">
                                              <h5>User</h5>
                                              <p>
                                                This is a wider card with
                                                supporting text below as a
                                                natural lead-in to additional
                                                content. This content is a
                                                little bit longer.
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
                                                  <i
                                                    className={`fa-solid fa-thumbs-up `}
                                                  ></i>{" "}
                                                  22
                                                </span>
                                                <span className="socialCount">
                                                  <i class="fa-solid fa-comments"></i>{" "}
                                                  2
                                                </span>
                                                <span
                                                  onClick={() => {
                                                    handleShow();
                                                  }}
                                                  style={{ cursor: "pointer" }}
                                                  className="socialCount"
                                                >
                                                  <i class="fa-solid fa-share-from-square"></i>{" "}
                                                  12
                                                </span>
                                                <span className="socialCount">
                                                  <i class="fa-solid fa-heart"></i>{" "}
                                                  8,427
                                                </span>

                                                <span className="socialCount">
                                                  <i class="fa-solid fa-eye"></i>{" "}
                                                  99k
                                                </span>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="row">
                                        <div className="col-md-12 ">
                                          <div className="PostInfo">
                                            <div className="userImG">
                                              <Space
                                                direction="vertical"
                                                size={16}
                                              >
                                                <Space wrap size={16}>
                                                  <Avatar
                                                    size={64}
                                                    icon={
                                                      <img
                                                        src={men_face}
                                                        alt="logo"
                                                      />
                                                    }
                                                  />
                                                </Space>
                                              </Space>
                                            </div>
                                            <div className="DecIbp">
                                              <h5>User</h5>
                                              <p>
                                                This is a wider card with
                                                supporting text below as a
                                                natural lead-in to additional
                                                content. This content is a
                                                little bit longer.
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
                                                  <i
                                                    className={`fa-solid fa-thumbs-up `}
                                                  ></i>{" "}
                                                  22
                                                </span>
                                                <span className="socialCount">
                                                  <i class="fa-solid fa-comments"></i>{" "}
                                                  2
                                                </span>
                                                <span className="socialCount">
                                                  <i class="fa-solid fa-share-from-square"></i>{" "}
                                                  12
                                                </span>
                                                <span
                                                  onClick={() => {
                                                    handleShow();
                                                  }}
                                                  style={{ cursor: "pointer" }}
                                                  className="socialCount"
                                                >
                                                  <i class="fa-solid fa-heart"></i>{" "}
                                                  8,427
                                                </span>

                                                <span className="socialCount">
                                                  <i class="fa-solid fa-eye"></i>{" "}
                                                  99k
                                                </span>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      {/* <Image.PreviewGroup>
                                {garagesData?.image_gallery &&
                                  [...garagesData?.image_gallery].map(
                                    (curElem, i) => {
                                      return (
                                        <div key={i} className="col-md-4 Gld">
                                          <div className="galleryImgSect gg">
                                            <Image
                                              loading="lazy"
                                              src={
                                                curElem?.logo &&
                                                `${process.env.REACT_APP_URL}/${curElem?.logo}`
                                              }
                                              onError={({ currentTarget }) => {
                                                currentTarget.onError = null;
                                                currentTarget.src =
                                                  "http://www.freeiconspng.com/uploads/no-image-icon-11.PNG";
                                              }}
                                              alt="Gallery"
                                            />
                                          </div>
                                        </div>
                                      );
                                    }
                                  )}
                              </Image.PreviewGroup> */}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </section>
                      </div>
                      <div
                        class="tab-pane fade"
                        id="blog-tab-pane"
                        role="tabpanel"
                        aria-labelledby="blog-tab"
                        tabindex="0"
                      >
                        <section className="py-4 mobileSpec" id="">
                          <div className="container">
                            <div className="row">
                              <GaragesBlog id={id} />
                            </div>
                          </div>
                        </section>
                      </div>
                      <div
                        class="tab-pane fade"
                        id="gallery-tab-pane"
                        role="tabpanel"
                        aria-labelledby="gallery-tab"
                        tabindex="0"
                      >
                        {true && (
                          <>
                            {/* <h6>Logo</h6>
                            <hr />
                            <div className="imgCross">
                              <Image.PreviewGroup>
                                {userInfo?.logo?.map((curElem, i) => {
                                  return (
                                    <span key={i}>
                                      <Image
                                        loading="lazy"
                                        src={`${process.env.REACT_APP_URL}/${curElem?.logo}`}
                                        onError={({ currentTarget }) => {
                                          currentTarget.onError = null;
                                          currentTarget.src = noImage;
                                        }}
                                        alt="logo"
                                      />
                                    </span>
                                  );
                                })}
                              </Image.PreviewGroup>
                            </div> */}
                            {/* <h6 className="mt-3">Banner</h6>
                            <hr /> */}
                            <div className="imgCross">
                              <Image.PreviewGroup>
                                {(userInfo?.image_Banner ||
                                  userInfo?.image_Gallery) &&
                                  [
                                    ...userInfo.image_Banner,
                                    ...userInfo.image_Gallery,
                                  ].map((curElem, i) => {
                                    return (
                                      <span key={i}>
                                        <Image
                                          loading="lazy"
                                          src={`${process.env.REACT_APP_URL}/${curElem?.logo}`}
                                          onError={({ currentTarget }) => {
                                            currentTarget.onError = null;
                                            currentTarget.src = noImage;
                                          }}
                                          alt="banner"
                                        />
                                      </span>
                                    );
                                  })}
                              </Image.PreviewGroup>
                            </div>
                            {/* <h6 className="mt-3">Gallery</h6>
                            <hr /> */}
                            {/* <div className="imgCross">
                              <Image.PreviewGroup>
                                {userInfo?.image_Gallery?.map((curElem, i) => {
                                  return (
                                    <span key={i}>
                                      <Image
                                        loading="lazy"
                                        src={`${process.env.REACT_APP_URL}/${curElem?.logo}`}
                                        onError={({ currentTarget }) => {
                                          currentTarget.onError = null;
                                          currentTarget.src = noImage;
                                        }}
                                        alt="gallery"
                                      />
                                    </span>
                                  );
                                })}
                              </Image.PreviewGroup>
                            </div> */}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ============================ added new user garages end */}
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
                          <span className="socialCount">
                            <i class="fa-solid fa-bars-progress"></i>
                          </span>
                          <span className="socialCount">
                            <i class="fa-solid fa-face-smile"></i>
                          </span>
                          <span className="socialCount">
                            <i class="fa-solid fa-business-time"></i>
                          </span>

                          <span className="socialCount">
                            <i class="fa-solid fa-location-dot"></i>
                          </span>
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
    </div>
  );
}

export default UserGarage;
