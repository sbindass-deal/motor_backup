import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { clearCart } from "../../../redux/reducers/cartSlice";
import NotAvailable from "../../UI/NotAvailable";
import CartItem from "./CartItem";

const Cart = () => {
  const product = useSelector((state) => state.cartSlice);
  const dispatch = useDispatch();
  const notify = (val) =>
    toast.error(val, {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

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
                      <th className="text-center" scope="col" colspan="2">
                        Product
                      </th>
                      <th className="text-center" scope="col">
                        Price
                      </th>
                      <th className="text-center" scope="col">
                        Quantity({product.quantity})
                      </th>
                      <th className="text-center" scope="col">
                        Total
                      </th>
                    </tr>
                    {product.products.map((curElem) => {
                      return (
                        <CartItem
                          key={curElem.id}
                          id={curElem.id}
                          price={curElem.product_inventry}
                          title={curElem.title}
                          image={curElem.images}
                          quantity={curElem.quantity}
                          color={curElem.product_inventry}
                          size={curElem.product_inventry}
                          description={curElem.description}
                          stocks={curElem.product_inventry}
                          size_id={curElem?.size_id}
                          productId={curElem?.productId}
                        />
                      );
                    })}
                    <tr className="text-center">
                      <td colSpan="3"></td>
                      <td>Subtotal </td>
                      <td>${product?.total}</td>
                    </tr>
                    <tr className="right-align">
                      <td colSpan="5">
                        <button
                          onClick={() => {
                            dispatch(clearCart());
                            notify("Cart Clear Successfully!");
                          }}
                          className="btn bg-danger"
                        >
                          Clear Cart
                        </button>
                        <Link to="/shop" className="btn">
                          Continue Shopping
                        </Link>

                        <Link to="/place-order" className="btn">
                          Check Out
                        </Link>
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
