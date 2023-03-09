import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import men_face from "../../../../Assets/images/men-face.jpg";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Comment = ({ id, getVehicleComment, commentRef }) => {
  const [commentVal, setCommentVal] = useState("");
  const [commentData, setCommentData] = useState([]);
  const [btnLoading, setBtnLoading] = useState(false);
  const [showMoreLess, setShowMoreLess] = useState(false);

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
  }, []);

  const submitUserComment = async (e) => {
    e.preventDefault();
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
                  placeholder="add comment here"
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
                        new Date(curElem.created_at).toLocaleString()}
                    </div>
                  </div>
                  <div className="commentBody">
                    {curElem.category === "bid" ? (
                      <p className="bg-light p-2 text-danger fw-bolder">
                        <strong>$ {curElem?.bid_amount} bid placed</strong>
                      </p>
                    ) : (
                      <p className="p-2">{curElem?.description}</p>
                    )}
                  </div>
                  <div className="commentFooter">
                    <a href="#" className="mr-3">
                      <i className="fa-solid fa-thumbs-up"></i> 0
                    </a>
                    <a href="#" className="mr-3">
                      <i className="fa-solid fa-thumbs-down"></i> 0
                    </a>
                  </div>
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
