import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Space } from "antd";
import men_face from "../../../Assets/images/men-face.jpg";
import ads_car from "../../../Assets/images/ads_car.png";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Carousel from "./Carousel";
import CarousalGarages from "./Carousel";
import { Image } from "antd";
import Videos from "./Videos";
import { noImage, strToHtml } from "../../UI/globaleVar";
import parse from "html-react-parser";
import LatestGuzzlrsAuction from "../auction/auctionDetails/LatestGuzzlrsAuction";
import GaragesAuction from "./GaragesAuction";
import GaragesBlog from "./GaragesBlog";
import GaragesVehicle from "./GaragesVehicle";
import { Modal } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { RWebShare } from "react-web-share";
import Post from "./Post";
import Replies from "./Replies";
import Bookmark from "./Bookmark";
import Favorite from "./Favorite";

const GaragesUserDetails = () => {
  const [garagesData, setGaragesData] = useState({});
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [postCount, setPostCount] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [dealerData, setDealerData] = useState({});
  const [garagesDataList, setGaragesDataList] = useState([]);
  const { id } = useParams();
  const [userInfo, setUserinfo] = useState({});

  const fetchUsrApi = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_URL}getGarageReturn`
      );
      if (res.data.data) {
        setUserinfo(res.data.data);
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

  return (
    <>
      <div className="row">
        <CarousalGarages dealerData={garagesData} />
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <div className="UserImZ mt-4">
              <Space direction="vertical" size={16}>
                <Space wrap size={16}>
                  <Avatar
                    className="avtr"
                    size={200}
                    icon={
                      <img
                        className="slidImg"
                        loading="lazy"
                        src={
                          garagesData?.image_logo &&
                          `${process.env.REACT_APP_URL}/${garagesData?.image_logo[0]?.logo}`
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
            <h2 className="mt-4">{garagesData.name}</h2>
            <span className="text-muted">{garagesData?.username}</span>
            <p>
              {garagesData?.dealerDescription &&
                parse(garagesData?.dealerDescription, strToHtml)}
            </p>
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
                  Garages
                </button>
              </li>
              {/* <li class="nav-item" role="presentation">
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
              </li> */}
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
                  Favorite
                </button>
              </li>
              {/* <li class="nav-item" role="presentation">
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
              </li> */}
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
                {/* <section className="py-4 mobileSpec" id="">
                  <div className="container">
                    <div className="row ">
                      <div className="col-12 Videos ghhh">
                        <div className="row">
                          <div className="col-lg-12 col-md-12 col-sm-12">
                                                        <div className="row">
                              <div className="col-md-12 ">
                                <div className="PostInfo mb-0">
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
                                  <div className="DecIbp">
                                    <div className="efrtd">
                                    <div className="uRButton">
                                      <h5>User</h5>
                                      <p>
                                        This is a wider card with supporting text
                                        below as a natural lead-in to additional
                                        content. This content is a little bit
                                        longer.
                                      </p>
                                    </div>

                                      <Dropdown>
                                      <Dropdown.Toggle variant="success" id="dropdown-basic" className="postDrop">
                                          <i class="fa-solid fa-ellipsis-vertical"></i>
                                      </Dropdown.Toggle>

                                      <Dropdown.Menu>
                                        <Dropdown.Item href="#/action-1">Report Ads</Dropdown.Item>
                                      </Dropdown.Menu>
                                    </Dropdown>
                                    </div>
                                    
                                    <div class="card">
                                      <img
                                        src="https://tse1.mm.bing.net/th?id=OIP.cedHozvsh9JzkHQgRVg8XQHaE8&pid=Api&P=0"
                                        class="card-img-bottom"
                                        alt="..."
                                      />
                                    </div>
                                    <div className="py-3">
                                     
                                      <span className="socialCount">
                                        <i class="fa-solid fa-comments"></i> 2
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
                                        <i class="fa-solid fa-heart"></i> 8,427
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


                                <div className="PostInfo cm">
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
                                <div className="DecIbp">
                                    <div className="naTf">
                                      <h5>MAG MOTORS</h5>
                                      <p>Glad you liked it!</p>
                                    </div>
                                    <div className="py-3">
                                    <span
                                     
                                     className="socialCount"
                                   >
                                    
                                       <FavoriteBorderIcon />
                                    
                                   
                                   </span>
                                   
                                    <span
                                     
                                      style={{ cursor: "pointer" }}
                                      className="socialCount"
                                    >
                                      <i class="fa-solid fa-comments"></i>{" "}
                                     
                                    </span>
                                    

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
                                          onClick={handleShow}
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
                            </div>
                        

                            
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section> */}
                <Post id={id} setPostCount={setPostCount} logo={garagesData} />
              </div>
              <div
                class="tab-pane fade"
                id="replies-tab-pane"
                role="tabpanel"
                aria-labelledby="replies-tab"
                tabindex="0"
              >
                <Replies logo={garagesData} id={id} />
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
                    <div className="row ">
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
                <Bookmark logo={garagesData} id={id} />
              </div>
              <div
                class="tab-pane fade"
                id="fav-tab-pane"
                role="tabpanel"
                aria-labelledby="fav-tab"
                tabindex="0"
              >
                <Favorite logo={garagesData} id={id} />
              </div>
              <div
                class="tab-pane fade"
                id="video-tab-pane"
                role="tabpanel"
                aria-labelledby="video-tab"
                tabindex="0"
              >
                <Videos data={garagesData} />
              </div>
            </div>
          </div>
        </div>
      </div>
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
    </>
  );
};

export default GaragesUserDetails;
