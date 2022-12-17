import React from "react";
import img_01 from "../../../Assets/images/img-1.webp";

const OrderCartDetails = () => {
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
                    <th>Ourder Number</th>
                    <th>Order Date</th>
                    <th>No. of Items</th>
                    <th>Order Status</th>
                    <th>Total Value</th>
                    <th>Action</th>
                  </tr>
                  <tr>
                    <td className="productImg">
                      <img src={img_01} />
                    </td>
                    <td>2002342517</td>
                    <td>14-02-2023</td>
                    <td>2</td>
                    <td>Shipped</td>
                    <td>$1,198,50</td>
                  </tr>
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
