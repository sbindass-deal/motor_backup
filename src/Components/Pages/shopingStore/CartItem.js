import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import img_01 from "../../../Assets/images/img-1.webp";
import {
  decreaseCart,
  increaseCart,
  removeFromCart,
} from "../../../redux/reducers/cartSlice";

const CartItem = ({
  price,
  title,
  image,
  quantity,
  id,
  color,
  size,
  description,
  stocks,
}) => {
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
            <img
              src={`${process.env.REACT_APP_URL}upload/products/${image}`}
              alt="car_01"
            />
          </div>
        </td>
        <td>
          <p className="proName">{title}</p>
          <p>{description.substr(0, 80)}...</p>
          <p className="size">
            Size: <span>{size}</span>
          </p>
          <p className="color">
            Color: <span>{color}</span>
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
        <td className="text-center">${price}</td>
        <td className="text-center">
          <div className="count">
            <button
              onClick={() => dispatch(decreaseCart(id))}
              className="addCountIcon negtv"
            >
              -
            </button>
            <span>{quantity}</span>
            <button
              onClick={() => {
                if (stocks > quantity) {
                  dispatch(increaseCart(id));
                } else {
                  notify("You reached maximum limit");
                }
              }}
              className="addCountIcon"
            >
              +
            </button>
          </div>
        </td>
        <td className="text-center">${quantity * price}</td>
      </tr>
    </>
  );
};

export default CartItem;
