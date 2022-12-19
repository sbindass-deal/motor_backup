import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import img_01 from "../../../Assets/images/img-1.webp";
import {
  decreaseCart,
  increaseCart,
  removeFromCart,
} from "../../../redux/reducers/cartSlice";

const CartItem = ({ price, title, image, quantity, id }) => {
  const dispatch = useDispatch();
  const notify = (val) =>
    toast.warn(val, {
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
      <tr>
        <td className="productImg">
          <div className="cartImg">
            <img src={image ? image : img_01} />
          </div>
        </td>
        <td>
          <p className="proName">{title}</p>
          <p className="size">
            Size: <span>XS</span>
          </p>
          <p className="color">
            Color: <span>Red</span>
          </p>
          <button
            onClick={() => {
              dispatch(removeFromCart(id));
              notify("Item Removed Successfully");
            }}
            className="removeBtn"
          >
            Remove
          </button>
        </td>
        <td>${price}</td>
        <td>
          <div className="count">
            <button
              onClick={() => dispatch(decreaseCart(id))}
              className="addCountIcon negtv"
            >
              -
            </button>
            <span>{quantity}</span>
            <button
              onClick={() => dispatch(increaseCart(id))}
              className="addCountIcon"
            >
              +
            </button>
          </div>
        </td>
        <td>${quantity * price}</td>
      </tr>
    </>
  );
};

export default CartItem;
