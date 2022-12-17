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
  const id = 1;
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_URL}getbyidorder/1`
        );
        setOrder(res.data.data);
        setLoading(false);
        console.log(res.data.data);
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
        {/* {loading ? (
          <SmallSpinner spin={true} />
        ) : false <= 0 ? (
          <NotAvailable text="No Order yet" />
        ) : ( */}
        {/* {order.length <= 0 && <NotAvailable text="No Order Yet" />} */}
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
                {/* {(order.length > 0 || order !== undefined) &&
                  order.map((curElem) => { */}
                {/* return ( */}
                <tr>
                  <td className="productImg">
                    <img src={img_01} />
                  </td>
                  <td>2002342517</td>
                  <td>14-02-2023</td>
                  <td>2</td>
                  <td>Shipped</td>
                  <td>$1,198,50</td>
                  <td>
                    <button className="removeBtn" href="">
                      Cancel
                    </button>
                  </td>
                  <td>
                    <Link to={`/orders-cart/${id}`} className="btn">
                      View
                    </Link>
                  </td>
                </tr>
                {/* );
                  })} */}
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderCart;
