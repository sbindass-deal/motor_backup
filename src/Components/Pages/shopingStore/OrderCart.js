import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import img_01 from "../../../Assets/images/img-1.webp";
import NotAvailable from "../../UI/NotAvailable";
import SmallSpinner from "../../UI/SmallSpinner";
import MyAccountLeftNav from "../MyAccount/MyAccountLeftNav";
import { noImage } from "../../UI/globaleVar";

const OrderCart = () => {
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${process.env.REACT_APP_URL}getUserOrder`);
      
      console.log(87980, res)
      if (res.data.status === 200 && res.data.data) {
        // const activeOrder = res.data.data.filter(
        //   (item) => item.order_status === "New"
        // );
        setOrder(res.data.data);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchOrders();
  }, []);
  if (loading) {
    return <SmallSpinner spin={true} />;
  }
  const handleCancleOrder = async (id) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_URL}orderReject/${id}`
      );
      if (res.status === 200) {
        fetchOrders();
      }
    } catch (err) {
      console.log(err);
    }
  };

  console.log(78989,order)
  return (
    <>
      <section className="ptb_80 pt_sm_50">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-4 col-lg-3">
              <div className="card_Gray mb-5 mb-md-0">
                <h5>My Account</h5>
                <hr />
                <MyAccountLeftNav />
              </div>
            </div>
            <div className="col-12 col-md-8 col-lg-9">
              <div class="FlexCol">
                <h3>My Orders</h3>
              </div>
              <hr />
              <ul className="postTopOption" id="widthChnge">
                <li className="post_search">
                  <input
                    type="search"
                    name="search"
                    placeholder="Search…"
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                    }}
                  />
                </li>
              </ul>
              <div className="row">
                <div className="col-12">
                  <div className="col-12 col-md-12 col-lg-12">
                    <div className="table-responsive">
                      <table width={"100%"} className="cartSection">
                        <tr>
                          <th>Sno.</th>
                          <th>Order Number</th>
                          <th>Order Date</th>
                          {/* <th>No. of Items</th> */}
                          <th>Order Status</th>
                          <th>Total Value</th>
                          <th>Action</th>
                          <th>View</th>
                        </tr>
                        {order
                          ?.filter((curVal) => {
                            if (searchTerm == "") {
                              return curVal;
                            } else if (
                              curVal.order_id
                                .toLowerCase()
                                .includes(searchTerm.toLowerCase())
                            ) {
                              return curVal;
                            }
                          })
                          ?.map((curElem,i) => {
                            console.log(99809, curElem)
                            return (
                              <tr>
                                {/* <td className="productImg">
                                  <img
                                    loading="lazy"
                                    src={
                                      curElem?.image &&
                                      `${process.env.REACT_APP_URL}upload/products/${curElem?.image[0]?.image}`
                                    }
                                    
                                    onError={({ currentTarget }) => {
                                      currentTarget.onError = null;
                                      currentTarget.src = noImage;
                                    }}
                                    alt="product"
                                  />
                                </td> */}
                                <td>{1+i}</td>
                                <td>{curElem?.order_id}</td>
                                <td>
                                  {new Date(
                                    curElem?.created_at
                                  )?.toDateString()}
                                </td>
                                {/* <td>2</td> */}
                                <td>{curElem?.order_status}</td>
                                <td>${curElem?.amount}</td>
                                <td>
                                  <button
                                    onClick={() =>
                                      handleCancleOrder(curElem?.order_id)
                                    }
                                    className="removeBtn"
                                    href=""
                                  >
                                    Cancel
                                  </button>
                                </td>
                                <td>
                                  <Link
                                    to={`/orders-cart/${curElem?.order_id}`}
                                    className="btn"
                                  >
                                    View
                                  </Link>
                                </td>
                              </tr>
                            );
                          })}
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default OrderCart;
