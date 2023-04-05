import { Avatar, Space } from "antd";
import React from "react";
import men_face from "../../../Assets/images/men-face.jpg";

const Auction = () => {
  return (
    <>
      <div className="row">
        <div className="col-md-12 ">
          <div className="PostInfo">
            <div className="userImG">
              <Space direction="vertical" size={16}>
                <Space wrap size={16}>
                  <Avatar size={64} icon={<img src={men_face} alt="logo" />} />
                </Space>
              </Space>
            </div>
            <div className="DecIbp">
              <h5>User</h5>
              <p>
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </p>
              <div class="card">
                <img
                  src="https://tse1.mm.bing.net/th?id=OIP.cedHozvsh9JzkHQgRVg8XQHaE8&pid=Api&P=0"
                  class="card-img-bottom"
                  alt="..."
                />
              </div>
              <div className="py-3">
                <span className="socialCount">
                  <i className={`fa-solid fa-thumbs-up `}></i> 22
                </span>
                <span className="socialCount">
                  <i class="fa-solid fa-comments"></i> 2
                </span>
                <span className="socialCount">
                  <i class="fa-solid fa-share-from-square"></i> 12
                </span>
                <span className="socialCount">
                  <i class="fa-solid fa-heart"></i> 8,427
                </span>

                <span className="socialCount">
                  <i class="fa-solid fa-eye"></i> 99k
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 ">
          <div className="PostInfo">
            <div className="userImG">
              <Space direction="vertical" size={16}>
                <Space wrap size={16}>
                  <Avatar size={64} icon={<img src={men_face} alt="logo" />} />
                </Space>
              </Space>
            </div>
            <div className="DecIbp">
              <h5>User</h5>
              <p>
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </p>
              <div class="card">
                <img
                  src="https://tse1.mm.bing.net/th?id=OIP.cedHozvsh9JzkHQgRVg8XQHaE8&pid=Api&P=0"
                  class="card-img-bottom"
                  alt="..."
                />
              </div>
              <div className="py-3">
                <span className="socialCount">
                  <i className={`fa-solid fa-thumbs-up `}></i> 22
                </span>
                <span className="socialCount">
                  <i class="fa-solid fa-comments"></i> 2
                </span>
                <span className="socialCount">
                  <i class="fa-solid fa-share-from-square"></i> 12
                </span>
                <span className="socialCount">
                  <i class="fa-solid fa-heart"></i> 8,427
                </span>

                <span className="socialCount">
                  <i class="fa-solid fa-eye"></i> 99k
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Auction;
