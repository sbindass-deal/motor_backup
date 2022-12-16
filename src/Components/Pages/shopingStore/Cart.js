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
      </section>
    </>
  );
};

export default Cart;
