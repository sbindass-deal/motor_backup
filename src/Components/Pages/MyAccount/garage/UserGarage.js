import React, { useEffect } from "react";
import MyAccountLeftNav from "../MyAccountLeftNav";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { noImage, notify, strToHtml } from "../../../UI/globaleVar";
import parse from "html-react-parser";
import { Avatar, Image, Space } from "antd";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import men_face from "../../../../Assets/images/men-face.jpg";
import { Modal } from "react-bootstrap";
import GaragesVehicle from "../../garages/GaragesVehicle";
import GaragesAuction from "../../garages/GaragesAuction";
import GaragesBlog from "../../garages/GaragesBlog";
import { handleGarage } from "../../../../redux/reducers/planReducer";
import Post from "./Post";
import Replies from "./Replies";
import Bookmark from "./Bookmark";
import Favorite from "./Favorite";
import {
  blogTab,
  bookMarkTab,
  favoritesTab,
  replyTab,
  vehicleTab,
  postTab,
  socialMediaTab,
} from "../../../../redux/reducers/garagesTabReducer";
import SocialMedia from "./SocialMedia";

function UserGarage() {
  const [garagesData, setGaragesData] = useState({});
  const [showMore, setShowMore] = useState(false);
  const [dealerData, setDealerData] = useState({});
  const [garagesDataList, setGaragesDataList] = useState([]);
  const [postCount, setPostCount] = useState([]);
  const userId = useSelector((state) => state);
  const id = userId.login.user.user_id;
  const tabState = userId.garagesTabReducer;
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
                <h5>My Account</h5>
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
                  <h3 className="gTitle">
                    Garage /{" "}
                    {tabState.vehicle_tab === true &&
                      tabState.socialMedia_tab === false &&
                      "Vehicle"}{" "}
                    {tabState.socialMedia_tab === true && "Social media"}
                    {tabState.post_tab === true && "Post"}
                    {tabState.reply_tab === true && "Replies"}
                    {tabState.bookmark_tab === true && "Bookmark"}
                    {tabState.favorites_tab === true && "Favorite"}
                    {tabState.blog_tab === true && "Blog"}
                  </h3>
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
                    className="gry_btn px-3 mx-2 addVeh"
                  >
                    + Add Vehicle
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
                <div className="row gRt">
                  <div className="col-md-12 ">
                    <div className="UserImZ mt-4">
                      <div className="avtar">
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
                        <span>
                          <i class="fa-solid fa-pencil"></i>
                        </span>
                      </div>

                      <div className="followers ">
                        <ul className="fwrList">
                          <li>
                            <span>{userInfo.followers}</span> Followers
                          </li>
                          <li>
                            <span>{userInfo.followings}</span>Following
                          </li>
                          <li>
                            <span>{postCount?.length}</span>Post
                          </li>
                        </ul>
                        <button className="btn">Follow</button>
                      </div>
                    </div>
                    <h2 className="gTitle mt-4">
                      {userInfo.title}
                      <Link to="/editmyaccount-garages">
                        <i class="fa-solid fa-pen-to-square"></i>
                      </Link>
                    </h2>
                    <ul className="labelList_ ">
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
                    {/* scrollmenu */}
                    <div className="row neDesT ">
                        <button
                          onClick={() => dispatch(vehicleTab())}
                          className={`nav-link ${
                            tabState.vehicle_tab === true &&
                            tabState.socialMedia_tab === false &&
                            "active"
                          } `}
                        >
                          Vehicles
                        </button>
                        <button
                          onClick={() => dispatch(socialMediaTab())}
                          className={`nav-link ${
                            tabState.socialMedia_tab === true && "active"
                          } `}
                        >
                          Social Media
                        </button>
                        <button
                          onClick={() => dispatch(postTab())}
                          className={`nav-link ${
                            tabState.post_tab === true && "active"
                          } `}
                        >
                          Posts
                        </button>
                        <button
                          onClick={() => dispatch(replyTab())}
                          className={`nav-link ${
                            tabState.reply_tab === true && "active"
                          } `}
                        >
                          Replies
                        </button>
                        <button
                          onClick={() => dispatch(bookMarkTab())}
                          className={`nav-link ${
                            tabState.bookmark_tab === true && "active"
                          } `}
                        >
                          Bookmark
                        </button>
                        <button
                          onClick={() => dispatch(favoritesTab())}
                          className={`nav-link ${
                            tabState.favorites_tab === true && "active"
                          } `}
                        >
                          Favorites
                        </button>
                        <button
                          onClick={() => dispatch(blogTab())}
                          className={`nav-link ${
                            tabState.blog_tab === true && "active"
                          } `}
                        >
                          Blog
                        </button>
                    </div>

                    <div>
                      {tabState.vehicle_tab === true &&
                        tabState.socialMedia_tab === false && (
                          <GaragesVehicle id={id} />
                        )}
                      {tabState.socialMedia_tab === true && (
                        <SocialMedia id={id} logo={userInfo} />
                      )}
                      {tabState.post_tab === true && (
                        <Post
                          id={id}
                          setPostCount={setPostCount}
                          logo={userInfo}
                        />
                      )}

                      {tabState.reply_tab === true && (
                        <Replies id={id} logo={userInfo} />
                      )}
                      {tabState.bookmark_tab === true && (
                        <Bookmark id={id} logo={userInfo} />
                      )}
                      {tabState.favorites_tab === true && (
                        <Favorite id={id} logo={userInfo} />
                      )}
                      {tabState.blog_tab === true && <GaragesBlog id={id} />}
                    </div>
                    {/* <ul class="nav nav-tabs my-4 tBB" id="myTab" role="tablist">
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
                          id="replies-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#replies-tab-pane"
                          type="button"
                          role="tab"
                          aria-controls="replies-tab-pane"
                          aria-selected="false"
                        >
                          Replies
                        </button>
                      </li>
                      <li class="nav-item" role="presentation">
                        <button
                          class="nav-link"
                          id="book-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#book-tab-pane"
                          type="button"
                          role="tab"
                          aria-controls="book-tab-pane"
                          aria-selected="false"
                        >
                          Bookmark
                        </button>
                      </li>
                      <li class="nav-item" role="presentation">
                        <button
                          class="nav-link"
                          id="fav-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#fav-tab-pane"
                          type="button"
                          role="tab"
                          aria-controls="fav-tab-pane"
                          aria-selected="false"
                        >
                          Favorites
                        </button>
                      </li>
                      <li class="nav-item" role="presentation">
                        <button
                          class="nav-link"
                          id="blog-tab"
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
                     
                    </ul> */}
                    {/* <div class="tab-content" id="myTabContent">
                      <div
                        class="tab-pane fade show active"
                        id="home-tab-pane"
                        role="tabpanel"
                        aria-labelledby="home-tab"
                        tabindex="0"
                      >
                        <GaragesVehicle id={id} />
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
                        <Post
                          id={id}
                          setPostCount={setPostCount}
                          logo={userInfo}
                        />
                      </div>

                      <div
                        class="tab-pane fade"
                        id="replies-tab-pane"
                        role="tabpanel"
                        aria-labelledby="replies-tab"
                        tabindex="0"
                      >
                        <Replies id={id} logo={userInfo} />
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
                        id="book-tab-pane"
                        role="tabpanel"
                        aria-labelledby="book-tab"
                        tabindex="0"
                      >
                        <Bookmark id={id} logo={userInfo} />
                      </div>
                      <div
                        class="tab-pane fade"
                        id="fav-tab-pane"
                        role="tabpanel"
                        aria-labelledby="fav-tab"
                        tabindex="0"
                      >
                        <Favorite id={id} logo={userInfo} />
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
                            
                          </>
                        )}
                      </div>
                    </div> */}
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

export default UserGarage;
