import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Space } from "antd";
import men_face from "../../../Assets/images/men-face.jpg";
import ads_car from "../../../Assets/images/ads_car.png";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Carousel from "./Carousel";
import CarousalGarages from "./Carousel";
import { Image } from "antd";
import Videos from "./Videos";
import { strToHtml } from "../../UI/globaleVar";
import parse from "html-react-parser";

const GaragesListDetails = () => {
  const [garagesData, setGaragesData] = useState({});
  const [showMore, setShowMore] = useState(false);
  const { id } = useParams();
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

  return (
    <>
      <div className="row">
        <CarousalGarages garagesData={garagesData} />
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-4 my-4">
            <h5>User to follow</h5>
            <hr />
            <div
              className="row py-2"
              style={{ display: "flex", alignItems: "center" }}
            >
              <div className="col-md-3">
                <Space direction="vertical" size={16}>
                  <Space wrap size={16}>
                    <Avatar
                      size={64}
                      icon={<img src={men_face} alt="logo" />}
                    />
                  </Space>
                </Space>
              </div>
              <div className="col-md-6">
                AWS Mag <br />
                <span className="text-muted">User123</span>
              </div>
              <div className="col-md-3">
                <button type="button" className="btn-sm follow">
                  Follow
                </button>
              </div>
            </div>
            <div
              className="row py-2"
              style={{ display: "flex", alignItems: "center" }}
            >
              <div className="col-md-3">
                <Space direction="vertical" size={16}>
                  <Space wrap size={16}>
                    <Avatar
                      size={64}
                      icon={<img src={men_face} alt="logo" />}
                    />
                  </Space>
                </Space>
              </div>
              <div className="col-md-6">
                AWS Mag <br />
                <span className="text-muted">User123</span>
              </div>
              <div className="col-md-3">
                <button type="button" className="btn-sm follow">
                  Follow
                </button>
              </div>
            </div>
            <div
              className="row py-2"
              style={{ display: "flex", alignItems: "center" }}
            >
              <div className="col-md-3">
                <Space direction="vertical" size={16}>
                  <Space wrap size={16}>
                    <Avatar
                      size={64}
                      icon={<img src={men_face} alt="logo" />}
                    />
                  </Space>
                </Space>
              </div>
              <div className="col-md-6">
                AWS Mag <br />
                <span className="text-muted">User123</span>
              </div>
              <div className="col-md-3">
                <button type="button" className="btn-sm follow">
                  Follow
                </button>
              </div>
            </div>
            <div
              className="row py-2"
              style={{ display: "flex", alignItems: "center" }}
            >
              <div className="col-md-3">
                <Space direction="vertical" size={16}>
                  <Space wrap size={16}>
                    <Avatar
                      size={64}
                      icon={<img src={men_face} alt="logo" />}
                    />
                  </Space>
                </Space>
              </div>
              <div className="col-md-6">
                AWS Mag <br />
                <span className="text-muted">User123</span>
              </div>
              <div className="col-md-3">
                <button type="button" className="btn-sm follow">
                  Follow
                </button>
              </div>
            </div>
            <div
              className="row py-2"
              style={{ display: "flex", alignItems: "center" }}
            >
              <div className="col-md-3">
                <Space direction="vertical" size={16}>
                  <Space wrap size={16}>
                    <Avatar
                      size={64}
                      icon={<img src={men_face} alt="logo" />}
                    />
                  </Space>
                </Space>
              </div>
              <div className="col-md-6">
                AWS Mag <br />
                <span className="text-muted">User123</span>
              </div>
              <div className="col-md-3">
                <button type="button" className="btn-sm follow">
                  Follow
                </button>
              </div>
            </div>
            <h5>Team to join</h5>
            <hr />
            <div
              className="row py-2"
              style={{ display: "flex", alignItems: "center" }}
            >
              <div className="col-md-3">
                <Space direction="vertical" size={16}>
                  <Space wrap size={16}>
                    <Avatar
                      size={64}
                      icon={<img src={men_face} alt="logo" />}
                    />
                  </Space>
                </Space>
              </div>
              <div className="col-md-6">
                AWS Mag <br />
                <span className="text-muted">User123</span>
              </div>
              <div className="col-md-3">
                <button type="button" className="btn-sm follow">
                  Follow
                </button>
              </div>
            </div>
            <div
              className="row py-2"
              style={{ display: "flex", alignItems: "center" }}
            >
              <div className="col-md-3">
                <Space direction="vertical" size={16}>
                  <Space wrap size={16}>
                    <Avatar
                      size={64}
                      icon={<img src={men_face} alt="logo" />}
                    />
                  </Space>
                </Space>
              </div>
              <div className="col-md-6">
                AWS Mag <br />
                <span className="text-muted">User123</span>
              </div>
              <div className="col-md-3">
                <button type="button" className="btn-sm follow">
                  Follow
                </button>
              </div>
            </div>
            <div
              className="row py-2"
              style={{ display: "flex", alignItems: "center" }}
            >
              <div className="col-md-3">
                <Space direction="vertical" size={16}>
                  <Space wrap size={16}>
                    <Avatar
                      size={64}
                      icon={<img src={men_face} alt="logo" />}
                    />
                  </Space>
                </Space>
              </div>
              <div className="col-md-6">
                AWS Mag <br />
                <span className="text-muted">User123</span>
              </div>
              <div className="col-md-3">
                <button type="button" className="btn-sm follow">
                  Follow
                </button>
              </div>
            </div>
            <div
              className="row py-2"
              style={{ display: "flex", alignItems: "center" }}
            >
              <div className="col-md-3">
                <Space direction="vertical" size={16}>
                  <Space wrap size={16}>
                    <Avatar
                      size={64}
                      icon={<img src={men_face} alt="logo" />}
                    />
                  </Space>
                </Space>
              </div>
              <div className="col-md-6">
                AWS Mag <br />
                <span className="text-muted">User123</span>
              </div>
              <div className="col-md-3">
                <button type="button" className="btn-sm follow">
                  Follow
                </button>
              </div>
            </div>
            <div
              className="row py-2"
              style={{ display: "flex", alignItems: "center" }}
            >
              <div className="col-md-3">
                <Space direction="vertical" size={16}>
                  <Space wrap size={16}>
                    <Avatar
                      size={64}
                      icon={<img src={men_face} alt="logo" />}
                    />
                  </Space>
                </Space>
              </div>
              <div className="col-md-6">
                AWS Mag <br />
                <span className="text-muted">User123</span>
              </div>
              <div className="col-md-3">
                <button type="button" className="btn-sm follow">
                  Follow
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <div className="mt-4">
              <Space direction="vertical" size={16}>
                <Space wrap size={16}>
                  <Avatar
                    size={200}
                    icon={
                      <img
                        className="slidImg"
                        loading="lazy"
                        src={
                          garagesData?.image_logo &&
                          `${process.env.REACT_APP_URL}/${garagesData?.image_logo[0].logo}`
                        }
                        alt="Logo"
                      />
                    }
                  />
                </Space>
              </Space>
            </div>
            <h2 className="mt-4">{garagesData.name}</h2>
            <span className="text-muted">{garagesData?.username}</span>
            <p>
              {garagesData?.dealerDescription &&
                parse(garagesData?.dealerDescription, strToHtml)}
            </p>
            <ul
              style={{ display: "flex", justifyContent: "space-around" }}
              class="nav nav-tabs my-4"
              id="myTab"
              role="tablist"
            >
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
                  Posts
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
                  Replies
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
                  Gallery
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
                  Videos
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
                <div className="row">
                  <div className="col-md-2">
                    <Space direction="vertical" size={16}>
                      <Space wrap size={16}>
                        <Avatar
                          size={64}
                          icon={<img src={men_face} alt="logo" />}
                        />
                      </Space>
                    </Space>
                  </div>
                  <div className="col-md-10">
                    <h5>User</h5>
                    <p>
                      This is a wider card with supporting text below as a
                      natural lead-in to additional content. This content is a
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
                      <span className="">
                        <i className={`fa-solid fa-thumbs-up text-warning`}></i>
                      </span>
                      &nbsp; &nbsp;
                      <i className={`fa-solid fa-thumbs-down text-warning`}></i>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-2">
                    <Space direction="vertical" size={16}>
                      <Space wrap size={16}>
                        <Avatar
                          size={64}
                          icon={<img src={men_face} alt="logo" />}
                        />
                      </Space>
                    </Space>
                  </div>
                  <div className="col-md-10">
                    <h5>User</h5>
                    <p>
                      This is a wider card with supporting text below as a
                      natural lead-in to additional content. This content is a
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
                      <span className="">
                        <i className={`fa-solid fa-thumbs-up text-warning`}></i>
                      </span>
                      &nbsp; &nbsp;
                      <i className={`fa-solid fa-thumbs-down text-warning`}></i>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="tab-pane fade"
                id="profile-tab-pane"
                role="tabpanel"
                aria-labelledby="profile-tab"
                tabindex="0"
              >
                <div className="row">
                  <div className="col-md-2">
                    <Space direction="vertical" size={16}>
                      <Space wrap size={16}>
                        <Avatar
                          size={64}
                          icon={<img src={men_face} alt="logo" />}
                        />
                      </Space>
                    </Space>
                  </div>
                  <div className="col-md-10">
                    <h5>User</h5>
                    <p>
                      This is a wider card with supporting text below as a
                      natural lead-in to additional content. This content is a
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
                      <span className="">
                        <i className={`fa-solid fa-thumbs-up text-warning`}></i>
                      </span>
                      &nbsp; &nbsp;
                      <i className={`fa-solid fa-thumbs-down text-warning`}></i>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-2">
                    <Space direction="vertical" size={16}>
                      <Space wrap size={16}>
                        <Avatar
                          size={64}
                          icon={<img src={men_face} alt="logo" />}
                        />
                      </Space>
                    </Space>
                  </div>
                  <div className="col-md-10">
                    <h5>User</h5>
                    <p>
                      This is a wider card with supporting text below as a
                      natural lead-in to additional content. This content is a
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
                      <span className="">
                        <i className={`fa-solid fa-thumbs-up text-warning`}></i>
                      </span>
                      &nbsp; &nbsp;
                      <i className={`fa-solid fa-thumbs-down text-warning`}></i>
                    </div>
                  </div>
                </div>
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
                    <div className="row ">
                      <div className="col-12 text-center pb_30"></div>

                      <div className="col-12 Videos ghhh">
                        <div className="row">
                          <div className="col-lg-12 col-md-12 col-sm-12">
                            <div className="row">
                              <Image.PreviewGroup>
                                {garagesData?.image_gallery &&
                                  [...garagesData?.image_gallery].map(
                                    (curElem, i) => {
                                      return (
                                        <div key={i} className="col-md-6">
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
                              </Image.PreviewGroup>
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
    </>
  );
};

export default GaragesListDetails;
