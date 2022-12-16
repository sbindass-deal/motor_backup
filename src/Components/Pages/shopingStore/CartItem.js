import React from "react";
import { useDispatch } from "react-redux";
import img_01 from "../../../Assets/images/img-1.webp";
import { decreaseCart, increaseCart } from "../../../redux/reducers/cartSlice";

const CartItem = ({ price, title, image, quantity, id }) => {
  const dispatch = useDispatch();
  return (
    <>
      <tr>
        <td className="productImg">
          <img src={image ? image : img_01} />
        </td>
        <td>
          <p className="proName">{title}</p>
          <p className="size">
            Size: <span>XS</span>
          </p>
          <p className="color">
            Color: <span>Red</span>
          </p>
          <button className="removeBtn">Remove</button>
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
