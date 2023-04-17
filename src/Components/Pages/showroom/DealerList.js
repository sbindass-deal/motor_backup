import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { noImage, strToHtml } from "../../UI/globaleVar";
import parse from "html-react-parser";
import Pagination from "../../Pagination";

const DealerList = ({ handleDealerCount, searchTerm }) => {
  const [dealerData, setDealerData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = dealerData.slice(firstPostIndex, lastPostIndex);

  
  useEffect(() => {
    const fetchDealer = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_URL}get_all_dealers`
        );
        setDealerData([...res.data.featured_dealer, ...res.data.user_dealer]);
        handleDealerCount(res.data.all_dealers_count);
      } catch (err) {
        console.log(err);
      }
    };
    fetchDealer();
  }, []);

  return (
    <>
      <div className="col-12 ListDealer mt-50">
        <div className="row  pt-4 row_gridList">
          {dealerData.length > 0 &&
            dealerData
              ?.filter((curElem) => {
                if (searchTerm == "") {
                  return curElem;
                } else if (
                  curElem?.name.toLowerCase().includes(searchTerm.toLowerCase())
                ) {
                  return curElem;
                }
              })
              ?.map((curElem) => {
                return (
                  <>
                    <div class="col-12 col-md-3 pb-3">
                      <div class="card_post">
                        <div class="card_postImg">
                          <Link to={`/dealerprofile/${curElem?.id}`}>
                            {curElem?.image_logo && (
                              <img
                                loading="lazy"
                                src={
                                  curElem?.image_logo[0]
                                    ? `${process.env.REACT_APP_URL}/${curElem?.image_logo[0]?.logo}`
                                    : noImage
                                }
                                onError={({ currentTarget }) => {
                                  currentTarget.onError = null;
                                  currentTarget.src = noImage;
                                }}
                                alt={curElem?.username}
                              />
                            )}
                          </Link>
                        </div>
                        <div class="card_postInfo">
                          <h4 class="car_title">
                            <Link to={`/dealerprofile/${curElem?.id}`}>
                              {curElem?.name}
                            </Link>
                          </h4>

                          {/* <ul class="labelList">
                          <li>{new Date(curElem?.created_at).toDateString()}</li>
                          <li>
                            <i class="fa-solid fa-user mr-2"></i> 
                          </li>
                        </ul> */}
                          <p>
                            {curElem?.dealerDescription &&
                              parse(
                                curElem?.dealerDescription?.substr(0, 70) +
                                  "...",
                                strToHtml
                              )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}

          <Pagination
            totalPosts={dealerData.length}
            postsPerPage={postsPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </div>
      </div>
    </>
  );
};

export default DealerList;
