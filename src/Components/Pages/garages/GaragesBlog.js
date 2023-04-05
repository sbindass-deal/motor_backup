import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { noImage, notify } from "../../UI/globaleVar";
import { useEffect } from "react";

const GaragesBlog = ({ id }) => {
  const [blogData, setBlogData] = useState([]);
  const fetchBlogApi = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_URL}dealer_profile/blogs/234`
      );
      setBlogData(res.data.list);
    } catch (err) {
      notify(err.message, err.status);
    }
  };
  useEffect(() => {
    fetchBlogApi();
  }, []);

  return (
    <>
      <div className="col-12 col-md-8 col-lg-9">
        <div className="row pt-4 row_gridList ">
          {blogData.map((curElem) => {
            return (
              <div className="col-12 col-md-4 pb-3 charityOct">
                <div className="card_post">
                  <div className="card_postImg">
                    <Link
                      to={`/blogdetail/${curElem.id}`}
                      className="card_postImg card_postImg_200"
                    >
                      <img
                        loading="lazy"
                        src={
                          curElem.image &&
                          `${process.env.REACT_APP_URL}upload/blogs/${curElem.image}`
                        }
                        onError={({ currentTarget }) => {
                          currentTarget.onError = null;
                          currentTarget.src = noImage;
                        }}
                        alt="Blog"
                      />
                    </Link>
                  </div>
                  <div className="card_postInfo">
                    <h4 class="car_title">
                      <Link to={`/blogdetail/${curElem.id}`}>
                        {curElem.title}
                      </Link>
                    </h4>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default GaragesBlog;
