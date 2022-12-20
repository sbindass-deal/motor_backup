import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import img_01 from "../../../Assets/images/img-1.webp";
import NotAvailable from "../../UI/NotAvailable";
import SmallSpinner from "../../UI/SmallSpinner";

const OrderCart = () => {
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState([]);
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_URL}getbyidorder/1`
        );
        if (res.data.status === 200 && res.data.data) {
          setOrder(res.data.data);
        }
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);
  if (loading) {
    return <SmallSpinner spin={true} />;
  }
  return (
    <section className="ptb_80 pt_sm_50">
      <div className="container">
        {order.length <= 0 ? (
          <NotAvailable text="Order not available 😒" />
        ) : (
          <div className="row">
            <div className="col-12 col-md-12 col-lg-12">
              <h2 className="title_combo title_Center casrt">My Orders</h2>
              <div className="table-responsive">
                <table width={"100%"} className="cartSection">
                  <tr>
                    <th></th>
                    <th>Ourder Number</th>
                    <th>Order Date</th>
                    <th>No. of Items</th>
                    <th>Order Status</th>
                    <th>Total Value</th>
                    <th>Action</th>
                    <th>View</th>
                  </tr>
                  {order.map((curElem) => {
                    return (
                      <tr>
                        <td className="productImg">
                          <img src={img_01} />
                        </td>
                        <td>{curElem.order_id}</td>
                        <td>
                          {new Date(curElem.created_at).toLocaleDateString()}
                        </td>
                        <td>2</td>
                        <td>Shipped</td>
                        <td>${curElem.amount}</td>
                        <td>
                          <button className="removeBtn" href="">
                            Cancel
                          </button>
                        </td>
                        <td>
                          <Link
                            to={`/orders-cart/${curElem.order_id}`}
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
        )}
      </div>
    </section>
  );
};

export default OrderCart;
