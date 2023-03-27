import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import men_face from "../../../../Assets/images/men-face.jpg";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { toCommas } from "../../../UI/globaleVar";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Comment = ({ id, getVehicleComment, commentRef }) => {
  const loginUser = useSelector((state) => state.login);
  const [commentVal, setCommentVal] = useState("");
  const [commentData, setCommentData] = useState([]);
  const [btnLoading, setBtnLoading] = useState(false);
  const [showMoreLess, setShowMoreLess] = useState(false);

  const notify = (val) =>
    toast.success(val, {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  useEffect(() => {
    const fetchCommentDataApi = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_URL}comment/vehicle/${id}`
        );
        const data = res.data.data;
        if (res.data.status === 200) {
          setCommentData(data);
          getVehicleComment(data.length);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchCommentDataApi();
  }, [id]);

  const submitUserComment = async (e) => {
    e.preventDefault();
    if (loginUser.token === null && loginUser.admin === null) {
      return notify("Please login or register");
    } else if (loginUser.token !== null && loginUser.admin === null) {
      setBtnLoading(true);
      await axios
        .post(`${process.env.REACT_APP_URL}comments`, {
          vehicleId: id,
          comment: commentVal,
        })
        .then(function (response) {
          setBtnLoading(false);
          const data = response.data.data;
          if (response.data.status === 200) {
            setCommentData(data);
            getVehicleComment(data.length);
          }
          setCommentVal("");
        })
        .catch(function (error) {
          console.log(error);
          setBtnLoading(false);
        });
    } else if (loginUser.admin !== null) {
      return notify("You are admin so you can't comment");
    }
  };

  const handleLikeDislike = async (id, type) => {
    axios
      .post(`${process.env.REACT_APP_URL}like_or_dislike`, {
        comment_id: id,
        like_or_dislike: type,
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
      <div className="card_ " ref={commentRef}>
        <div className="row ">
          <div className="col-12">
            <h3 className="cardTitle">Guzzlrs Chat</h3>
            <form onSubmit={submitUserComment} className="mb-3">
              <div className="form-group">
                <textarea
                  placeholder="Add comment here"
                  className="field"
                  value={commentVal}
                  onChange={(e) => setCommentVal(e.target.value)}
                  required
                ></textarea>
              </div>
              <div className="form-group">
                {btnLoading ? (
                  <button className="gry_btn">Loading...</button>
                ) : (
                  <button type="submit" className="btn">
                    Submit
                  </button>
                )}
              </div>
            </form>
          </div>
          <div className="col-12 pt-3">
            {commentData.map((curElem, i) => {
              return (
                <div key={i} className="commentRow">
                  <div className="commentHead">
                    <div className="com_byPic">
                      {/* <img src={men_face} /> */}
                      <AccountCircleIcon />
                    </div>
                    <div className="com_by">{curElem.name}</div>
                    <div className="com_date">
                      <i className="fa-solid fa-clock mr-1"></i>{" "}
                      {curElem.created_at &&
                        new Date(curElem.created_at).toDateString()}
                    </div>
                  </div>
                  <div className="commentBody">
                    {curElem.category === "bid" ? (
                      <p className=" p-2 text-danger fw-bolder">
                        <strong>
                          ${" "}
                          {curElem?.bid_amount && toCommas(curElem?.bid_amount)}{" "}
                          bid placed
                        </strong>
                      </p>
                    ) : (
                      <p className="p-2">{curElem?.description}</p>
                    )}
                  </div>
                  {curElem.category !== "bid" && (
                    <div className="commentFooter">
                      <a
                        onClick={() => handleLikeDislike(curElem.id, 1)}
                        className="mr-3"
                      >
                        <i
                          className={`fa-solid fa-thumbs-up ${
                            curElem.user_reaction_on_commnet == 1 &&
                            "text-warning"
                          }`}
                        ></i>{" "}
                        {curElem?.Like_count}
                      </a>
                      <a
                        onClick={() => handleLikeDislike(curElem.id, 2)}
                        className="mr-3"
                      >
                        <i
                          className={`fa-solid fa-thumbs-down ${
                            curElem.user_reaction_on_commnet == 2 &&
                            "text-warning"
                          }`}
                        ></i>{" "}
                        {curElem?.Dislike_count}
                      </a>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Comment;
