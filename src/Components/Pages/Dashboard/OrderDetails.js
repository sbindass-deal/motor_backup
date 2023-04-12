import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import img_01 from "../../../Assets/images/img-1.webp";
import SmallSpinner from "../../UI/SmallSpinner";
import { toast } from "react-toastify";

const OrderDetail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState([]);
  const [resultsPerPage, setResultsPerPage] = useState("");
 

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
  useEffect(() => {
   
    fetchOrders();
  }, []);

  if (loading) {
    return <SmallSpinner spin={true} />;
  }

  const orderShipmentApi = (data, productId) => {
    
    axios.post(`${process.env.REACT_APP_URL }updateOrderShipmentStatus`, {
      order_status: data,
      id: productId.id
      
    })
      .then(function (response) {
       
        fetchOrders();
        notify("Order updated successfully!");

        
      })
      .catch(function (error) {
        console.log(error);
        
      });
}

  const handleOrder = (data,productId) => {
    orderShipmentApi(data, productId)
    // setResultsPerPage(data)
  }
  

  return (
    <>
      <section className="ptb_80 pt_sm_50">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-12 col-lg-12">
              <h2 className="title_combo title_Center casrt">Order details</h2>
              <div className="table-responsive">
                <table width={"100%"} className="cartSection">
                  <tr>
                    <th>Image</th>
                    <th>name</th>
                    <th>Size</th>
                    <th>No. of Items</th>
                    <th>Item Price</th>
                    <th>Status</th>
                    <th>Total Value</th>
                    <th className="text-center">Action</th>
                  </tr>
                  {order.map((curElem) => {
                    return (
                      <tr key={curElem.id}>
                        <td className="productImg">
                          <img
                            src={`${process.env.REACT_APP_URL}upload/products/${curElem?.image}`}
                          />
                        </td>
                        <td>{curElem.title}</td>
                        <td>{curElem?.size_title}</td>
                        {console.log(8798, curElem)}
                        <td>{curElem.item_quantity}</td>
                        <td>{curElem.item_price}</td>
                        <td>{curElem.order_status}</td>
                        <td>${curElem.item_quantity * curElem.item_price}</td>
                        <td className="mt-3 text-center">
                          <select className="dds" value={resultsPerPage} onChange={(event) => handleOrder(event.target.value, curElem)}>
                            <option value={""}>Order Status</option>
                            <option value={"Order Placed"}>Order Placed</option>
                            <option value={"Cancelled"}>Cancelled</option>
                            <option value={"Confirmed"}>Confirmed</option>
                            <option value={"Shipped"}>Shipped</option>
                            <option value={"Delivered"}>Delivered</option>
                          </select>
                          {/* <p>Results per page: {resultsPerPage}</p> */}
                        </td>
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

export default OrderDetail;
