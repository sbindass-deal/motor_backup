import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../../redux/reducers/cartSlice";
import NotAvailable from "../../UI/NotAvailable";
import CartItem from "./CartItem";
// import img_01 from "../../../Assets/images/img_001.webp";

const Cart = () => {
  const product = useSelector((state) => state.cartSlice);
  const dispatch = useDispatch();
  return (
    <>
      <section className="ptb_80 pt_sm_50">
        <div className="container">
          <div className="row">
            {product.products.length <= 0 ? (
              <NotAvailable text="Cart is empty" />
            ) : (
              <div className="col-12 col-md-12 col-lg-12">
                <h2 class="title_combo title_Center casrt">My Cart</h2>
                <div class="table-responsive">
                  <table width={"100%"} className="cartSection cartth">
                    <tr>
                      <th scope="col" colspan="2">
                        Product
                      </th>
                      <th scope="col">Price</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Total</th>
                    </tr>
                    {product.products.map((curElem) => {
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
                    })}
                    <tr>
                      <td colSpan="3"></td>
                      <td>Subtotal </td>
                      <td>$50.00</td>
                    </tr>
                    <tr className="right-align">
                      <td colSpan="5">
                        <button
                          onClick={() => dispatch(clearCart())}
                          className="btn bg-danger"
                        >
                          Clear Cart
                        </button>
                        <button className="btn">Continue Shopping</button>
                        <button className="btn">Check Out</button>
                      </td>
                    </tr>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
