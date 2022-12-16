import React from "react";
import { useSelector } from "react-redux";
import NotAvailable from "../../UI/NotAvailable";
import CartItem from "./CartItem";

const Cart = () => {
  const product = useSelector((state) => state.cartSlice);
  return (
    <>
      <section className="ptb_80 pt_sm_50">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-12 col-lg-12">
            <h2 class="title_combo title_Center casrt">My Cart</h2>
            <div className="col-12 cartBody mb-5 card_Gray">
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <h5 className="cartTitle">Product</h5>
                  <div className="cartImgSect">
                    <img src={img_01}/>
                    <h5>Navy 240Z Heavyweight Hoodie
                      <span>Size - XS</span>
                      <span>Color - Red</span>
                      <button className="removeBtn">Remove</button>
                    </h5>
                  </div>
                </div>
                <div className="col-lg-2 col-md-2 col-sm-12">
                  <h5 className="cartTitle">Price</h5>
                  <div className="cartImgSect">
                  <p>$50.00</p>
                  </div>
                </div>
                <div className="col-lg-2 col-md-2 col-sm-12">
                  <h5 className="cartTitle">Count</h5>
                  <div className="cartImgSect">
                    <div className="Count">
                      <button className="addCountIcon negtv">-</button><span>2</span><button className="addCountIcon">+</button>
                  </div>  
                </div>
                </div>
                <div className="col-lg-2 col-md-2 col-sm-12">
                  <h5 className="cartTitle">Total</h5>
                  <div className="cartImgSect">
                  <p>$50.00</p>
                  </div>
                </div>
                
              </div>
             


            </div>
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
                    
                    </div>
                    </td>
                  <td>$300</td>
                  
                </tr>
              </table>
              <h2 class="title_combo title_Center casrt">My Cart</h2>
              <div class="table-responsive">
                <table width={"100%"} className="cartSection cartth">
                  <tr>
                    <th colspan="2">Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                  </tr>
                  {product.products.length <= 0 ? (
                    <NotAvailable text="Cart is empty" />
                  ) : (
                    product.products.map((curElem) => {
                      return (
                        <CartItem
                          key={curElem.id}
                          id={curElem.id}
                          price={curElem.price}
                          title={curElem.title}
                          image={curElem.image}
                          quantity={curElem.quantity}
                        />
                      );
                    })
                  )}
                </table>
              </div>
            </div>
          </div>
        </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
