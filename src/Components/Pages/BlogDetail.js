import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Car_img from "../../Assets/images/img_05.jpg";

const BlogDetail = () => {
  const { id } = useParams();
  const blogs = useSelector((state) => state.blogReducer.blogData);
  const [blog, setBlog] = useState({});
  useEffect(() => {
    const filteredBlog = blogs.find((item) => item.id == id);
    setBlog(filteredBlog);
  }, [id]);

  return (
    <section className="ptb_80 pt_sm_50">
      <div className="auction_container">
        <div className="row ">
          <div className="col-sm-9 col-12 pb-3">
            <div className="mainImg">
              <img
                src={`${process.env.REACT_APP_URL}upload/blogs/${blog.image}`}
                alt="details-images"
                loading="lazy"
              />
            </div>
            <div className="blogInfo">
              <h2 className="title_combo ">{blog.title}</h2>
              <ul className="post_labelList">
                <li>
                  <i className="fa-solid fa-clock"></i>{" "}
                  {blog.created_at && new Date(blog.created_at).toDateString()}
                </li>
                <li>
                  <i className="fa-solid fa-location-dot"></i> {blog.location}
                </li>
                <li>
                  <i className="fa-solid fa-comment-dots"></i> {blog.comment}{" "}
                  Comments
                </li>
              </ul>
            </div>
            <div className="blogDesc">
              <p>{blog.description}</p>
            </div>
          </div>

          <div class="col-12 col-lg-3">
            <div class="card_Gray pt-3 pb-3 sidebarPostRow">
              <div class="sidebarPostHead">
                <h6>Recent Blogs</h6>
              </div>
              {blogs &&
                blogs.slice(0, 6).map((curElem) => {
                  return (
                    <Link
                      class="sidebarPost"
                      key={curElem.id}
                      to={`/blogdetail/${curElem.id}`}
                    >
                      <div class="sidebarPost_Img">
                        <img
                          src={`${process.env.REACT_APP_URL}upload/blogs/${curElem.image}`}
                          loading="lazy"
                        />
                      </div>
                      <div class="sidebarPost_text">{curElem.title}</div>
                    </Link>
                  );
                })}

              <div class="sidebarPostFooter text-center">
                <Link to="/blogs" class="gry_btn w-full">
                  More features
                </Link>
              </div>
            </div>

            {/* <div class="card_Gray mt-3 pt-3">
              <h6>Feature Blogs</h6>
              <ul class="sidebar_Event">
                <li>
                  <a href="#">
                    Gas Guzzlrs Alumni Gathering: October 1 in conjunction with
                    the Audrain Newport Concours &amp; Motor Week – REGISTRATION
                    IS OPEN{" "}
                  </a>
                  <div class="event_date">
                    {" "}
                    <i class="fa-solid fa-clock"></i> October 1, 2022
                  </div>
                </li>
                <li>
                  <a href="#">
                    20th Rallylegend 2022 Republic of San Marino, Italy
                  </a>
                  <div class="event_date">
                    <i class="fa-solid fa-clock"></i> October 13 - 16, 2022
                  </div>
                </li>
                <li>
                  <a href="#">Targa Florio Classica – Palermo, Italy</a>
                  <div class="event_date">
                    <i class="fa-solid fa-clock"></i> October 13 - 16, 2022
                  </div>
                </li>
                <li>
                  <a href="#">Velocity Invitational</a>
                  <div class="event_date">
                    {" "}
                    <i class="fa-solid fa-clock"></i> October 14 - 16, 2022
                  </div>
                </li>
                <li>
                  <a href="#">SoCal Vintage BMW</a>
                  <div class="event_date">
                    <i class="fa-solid fa-clock"></i> November 5, 2022
                  </div>
                </li>
              </ul>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogDetail;
