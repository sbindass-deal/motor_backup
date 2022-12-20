import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import img_01 from "../../../Assets/images/img-1.webp";
import SmallSpinner from "../../UI/SmallSpinner";

const OrderCartDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState([]);
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_URL}GetallorderItem/${id}`
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
    <>
      <section className="ptb_80 pt_sm_50">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-12 col-lg-12">
              <h2 class="title_combo title_Center casrt">My Orders</h2>
              <div class="table-responsive">
                <table width={"100%"} className="cartSection">
                  <tr>
                    <th></th>
                    <th>name</th>
                    <th>Size</th>
                    <th>No. of Items</th>
                    <th>Item Price</th>
                    <th>Total Value</th>
                  </tr>
                  {order.map((curElem) => {
                    return (
                      <tr key={curElem.id}>
                        <td className="productImg">
                          <img src={img_01} />
                        </td>
                        <td>{2002342517}</td>
                        <td>xl</td>
                        <td>2</td>
                        <td>100</td>
                        <td>$1,198,50</td>
                      </tr>
                    );
                  })}
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default OrderCartDetails;
