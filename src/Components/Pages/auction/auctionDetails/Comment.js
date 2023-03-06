import React from "react";
import men_face from "../../../../Assets/images/men-face.jpg";

const Comment = () => {
  return (
    <>
      <div className="card_ ">
        <div className="row ">
          <div className="col-12">
            <h3 className="cardTitle">Guzzlrs Chat</h3>
            <form className="mb-3">
              <div className="form-group">
                <textarea
                  placeholder="add comment here"
                  className="field"
                ></textarea>
              </div>
              <div className="form-group">
                <button type="submit" className="gry_btn">
                  Submit
                </button>
              </div>
            </form>
          </div>
          <div className="col-12 pt-3">
            <div className="commentRow">
              <div className="commentHead">
                <div className="com_byPic">
                  <img src={men_face} />
                </div>
                <div className="com_by">Z32kerber</div>
                <div className="com_date">
                  <i className="fa-solid fa-clock mr-1"></i> Sep 23 at 7:31 PM
                </div>
              </div>
              <div className="commentBody">
                <p>Amazing car but the drive video was a disappointment.</p>
              </div>
              <div className="commentFooter">
                <a href="#" className="mr-3">
                  <i className="fa-solid fa-thumbs-up"></i> 349
                </a>
                <a href="#" className="mr-3">
                  <i className="fa-solid fa-thumbs-down"></i> 20
                </a>
              </div>
            </div>
            <div className="commentRow">
              <div className="commentRow">
                <div className="commentHead">
                  <div className="com_byPic">
                    <img src={men_face} />
                  </div>
                  <div className="com_by">NobleMotorGroup</div>
                  <div className="com_date">
                    <i className="fa-solid fa-clock mr-1"></i> Sep 23 at 7:31 PM
                  </div>
                </div>
                <div className="commentBody">
                  <p>
                    I’ve sold this car a couple times. It’s an amazing,
                    beautiful spec. Whoever ends up with it will be immensely
                    happy. Good luck bidders!
                  </p>
                </div>
                <div className="commentFooter">
                  <a href="#" className="mr-3">
                    <i className="fa-solid fa-thumbs-up"></i> 349
                  </a>
                  <a href="#" className="mr-3">
                    <i className="fa-solid fa-thumbs-down"></i> 20
                  </a>
                </div>
              </div>
              <div className="commentRow">
                <div className="commentHead">
                  <div className="com_byPic">
                    <img src={men_face} />
                  </div>
                  <div className="com_by">DaveBrewer</div>
                  <div className="com_date">
                    <i className="fa-solid fa-clock mr-1"></i> Sep 23 at 7:31 PM
                  </div>
                </div>
                <div className="commentBody">
                  <p>
                    Dang, and to think I was scared to list my Mustang “No
                    Reserve”…
                  </p>
                </div>
                <div className="commentFooter">
                  <a href="#" className="mr-3">
                    {" "}
                    <i className="fa-solid fa-thumbs-up"></i> 349
                  </a>
                  <a href="#" className="mr-3">
                    <i className="fa-solid fa-thumbs-down"></i> 20
                  </a>
                </div>
              </div>

              <div className="pt-4">
                <button type="button" className="gry_btn">
                  Read More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Comment;
