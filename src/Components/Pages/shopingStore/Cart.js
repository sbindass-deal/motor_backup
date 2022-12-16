import React from "react";
import img_01 from "../../../Assets/images/img-1.webp";

const Cart = () => {
  return (
    <div>
      {/* <!-- My Orders --> */}
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
                  
                  <td className="productImg"><img src={img_01}/></td>
                  <td>2002342517</td>
                  <td>14-02-2023</td>
                  <td>2</td>
                  <td>Shipped</td>
                  <td>$1,198,50</td>
                  <td><a href="">Cancel</a></td>
                </tr>
              </table>
            </div>
            </div>

         
          </div>
        </div>
      </section>

       {/* <!-- My Cart --> */}
      <section className="ptb_80 pt_sm_50">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-12 col-lg-12">
            <h2 class="title_combo title_Center casrt">My Cart</h2>
            <div class="table-responsive">
              <table width={"100%"} className="cartSection cartth">
                <tr>
                  <th colspan="2">Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
                <tr>
               
                  <td className="productImg" ><img src={img_01}/></td>
                  <td>
                    <p className="proName">Navy 204A</p>
                    <p className="size">Size: <span>XS</span></p>
                    <p className="color">Color: <span>Red</span></p>
                    <button className="removeBtn">Remove</button>

                  </td>
                  <td>$150</td>
                  <td>
                    <div className="count">
                    <button className="addCountIcon negtv">-</button><span>2</span><button className="addCountIcon">+</button>
                    </div>
                    </td>
                  <td>$300</td>
                  
                </tr>
              </table>
            </div>
            </div>

         
          </div>
        </div>
      </section>
   
</div>

  );

};

export default Cart;
