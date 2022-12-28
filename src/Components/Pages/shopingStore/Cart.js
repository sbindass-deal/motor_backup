import { ConnectButton } from "@rainbow-me/rainbowkit";
import axios from "axios";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import { toast } from "react-toastify";
import { clearCart } from "../../../redux/reducers/cartSlice";
import NotAvailable from "../../UI/NotAvailable";
import CartItem from "./CartItem";
// import img_01 from "../../../Assets/images/img_001.webp";

const Cart = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const product = useSelector((state) => state.cartSlice);
  const dispatch = useDispatch();
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

  const onToken = (token, addresses) => {
    navigate("/orders-cart");
    dispatch(clearCart());
    notify("Order place successfully");
  };
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };
  const handleOrder = () => {
    const items = product.products.map((curElem) => {
      return { id: curElem.id, quantity: curElem.quantity };
    });
    axios
      .post(`${process.env.REACT_APP_URL}addorder`, {
        order_status: "New",
        items,
      })
      .then((result) => {
        if (result.status === 200) {
          handleShow();
        }
      })
      .catch((error) => {
        notify(error.message);
      });
  };

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
                      <th scope="col">Quantity({product.quantity})</th>
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
                      <td>${product.total}</td>
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
                        
                        <Link to="/place-order" onClick={handleOrder} className="btn">
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
      <Modal show={show} onHide={handleClose} className="payTPop">
        <Modal.Header closebutton>
          <Modal.Title>Payment Process</Modal.Title>
          <button variant="secondary" onClick={handleClose}>
            X
          </button>
        </Modal.Header>
        <Modal.Body>
          <div className="processPy">
            <h2>Model Name : 2021 BMW Nexon</h2>
            <h3 className="price__">Price : $2000</h3>

            {/* <small className="ticketCount">1 Ticket = $100</small> */}
            <br />
            <p>Choose Payment Option:</p>
            <div className="ress">
              <div className="ProcessPymt">
                <ConnectButton></ConnectButton>

                {/* <img src={Paypal} />
              <img src={Stipe} /> */}
              </div>
              <div>
                <StripeCheckout
                  className="Btn"
                  stripeKey="pk_test_m9Dp6uaJcynCkZNTNS1nDR8B00AQg2m6vJ"
                  token={onToken}
                />
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Cart;
