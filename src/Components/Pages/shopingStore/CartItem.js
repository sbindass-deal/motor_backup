import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import img_01 from "../../../Assets/images/img-1.webp";
import {
  decreaseCart,
  increaseCart,
  removeFromCart,
} from "../../../redux/reducers/cartSlice";
import axios from "axios";

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
  size_id
}) => {
  const dispatch = useDispatch();
  const [size2 , setSize2] = useState();
  const [color2 , setColor2] = useState();

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

    useEffect(() => {
      axios.get(`${process.env.REACT_APP_URL}getAllSize`).
      then((d) => {
        setSize2(d?.data?.data);
        })

        axios.get(`${process.env.REACT_APP_URL}getAllColors`).
      then((d) => {
        setColor2(d?.data?.data);
        })
    }, []) 

  return (
    <>
      <tr>
        <td className="productImg">
          <div className="cartImg">
            <img
              src={`${process.env.REACT_APP_URL}upload/products/${image[0]?.image}`}
              alt="car_01"
            />
          </div>
        </td>
        <td>
          <p className="proName">{title}</p>
          <p>{description.substr(0, 80)}...</p>
          <p className="size">
            Size: <span>{
            size2?.map((ele) => {
              if(ele?.id == size_id){
              return (ele?.size + " ")
            }
            })
              }</span>
          </p>
          {/* <p className="color">
            Color: <span>{color?.map((d) => {return (
            color2?.map((ele) => {
              if(ele?.id == d?.color_id)
              return (ele?.color)
            })
              )})}</span>
          </p> */}
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
        <td className="text-center">${price?.map((d)=>{
          if(d?.size_id ==  size_id)
          return d?.price
          })}</td>
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
                if (stocks?.map((d)=>{if(d?.size_id == size_id) return d?.stock})?.reverse()?.pop() > quantity) {
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
        <td className="text-center">${quantity * price?.map((d)=>{if(d?.size_id ==  size_id)return d?.price})?.reverse()?.pop()}</td>
      </tr>
    </>
  );
};

export default CartItem;
