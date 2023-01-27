import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Blogs = () => {
  const blogs = useSelector((state) => state.blogReducer.blogData);

  return (
    <section className="ptb_80 blogSection">
      <div className="container">
        <div className="row">
          <div className="col-12 text-center pb_30">
            <h2>All Blogs</h2>
          </div>
          <div className="col-12 ">
            {blogs &&
              blogs.map((curElem, i) => {
                return (
                  <div key={i} className="row pb_30">
                    <div
                      className={`order-md-${
                        i % 2 === 0 ? 0 : 1
                      } col-12 col-md-6 col-lg-7`}
                    >
                      <div className="blogPost">
                        <img
                          src={`${process.env.REACT_APP_URL}${curElem.image}`}
                          alt={curElem.title}
                        />
                      </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-5 d-flex align-items-center">
                      <div className="blogPostText">
                        <h4>{curElem.title}</h4>
                        <ul className="post_labelList">
                          <li>
                            <i className="fa-solid fa-clock"></i>{" "}
                            {curElem.created_at &&
                              new Date(curElem.created_at).toDateString()}
                          </li>
                          <li>
                            <i className="fa-solid fa-location-dot"></i>{" "}
                            {curElem.location}
                          </li>
                          <li>
                            <i className="fa-solid fa-comment-dots"></i>{" "}
                            {curElem.comment}
                            Comments
                          </li>
                        </ul>
                        <p>{curElem.description.substr(0, 500)}</p>
                        {curElem.description.length > 500 && (
                          <Link
                            to={`/blogdetail/${curElem.id}`}
                            className="btn"
                          >
                            Read More
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blogs;
