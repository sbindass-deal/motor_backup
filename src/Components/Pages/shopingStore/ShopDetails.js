import React, { useEffect, useState } from "react";
import "./Shopdetail.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SliderProduct from "./SliderProduct";
import axios from "axios";
import { useParams } from "react-router";
import SmallSpinner from "../../UI/SmallSpinner";
import NotAvailable from "../../UI/NotAvailable";
import { useDispatch } from "react-redux";
import { addProduct } from "../../../redux/reducers/cartSlice";
import { toast } from "react-toastify";
import { Carousel } from "antd";
import { Image } from "antd";
const ShopDetails = () => {
  const id = useParams().id;
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const [addButton , setAddButton] = useState(false)
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

  useEffect(() => {

      setLoading(true);
      try {
        axios.get(
          `${process.env.REACT_APP_URL}allproduct`
        ).then((d) => {
          d?.data?.data?.product.map((d , i) =>{
            if(d?.id == id)
             setProduct(d)
          })
        })
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }

  }, [id]);

  const handleProduct = () => {
    dispatch(addProduct({ ...product, quantity: 1 }));
    notify("Added to cart.");
    setAddButton(true)
  };
  const contentStyle = {
    maxHeight: "60vh",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
    cursor: "pointer",
  };

  return (
    <>
      <div className="container">
        {loading ? (
          <SmallSpinner spin={true} />
        ) : !product ? (
          <NotAvailable text="Product is not available" />
        ) : (
          <div className="row">
            <div className="col-md-6 sliderSec ">
              <Carousel autoplay>
                <div>
                  <img
                    src={`${process.env.REACT_APP_URL}upload/products/${product?.images[0]?.image}`}
                    alt={product.title}
                    style={contentStyle}
                    className="img-fluid"
                    onClick={() => setVisible(true)}
                  />
                </div>
              </Carousel>
              <div
                style={{
                  display: "none",
                }}
              >
                <Image.PreviewGroup
                  preview={{
                    visible,
                    onVisibleChange: (vis) => setVisible(vis),
                  }}
                >
                  <Image
                    src={`${process.env.REACT_APP_URL}upload/products/${product.image}`}
                  />
                </Image.PreviewGroup>
              </div>
            </div>

            <div className="col-md-6 rightSec">
              <h5 className="catagories">{product.category}</h5>
              <h2>{product.title}</h2>
              <p className="price__">$ {product?.product_inventry[0].price}</p>
              <p className="product_dec">
                <b>Product ID: {product.id}</b>
                <br />
                {product.description}
              </p>

              <div className="sizeColor">
                <div className="sizeColor">Category: {product.category}</div>
                <div className="size">Size: {product.size}</div>
              </div>
              <p className="product_dec">Stock: {product.stocks}</p>
              <button onClick={handleProduct} type="button" className="btn" disabled ={addButton}>
                Add to Cart
              </button>
            </div>
          </div>
        )}
      </div>
      {/* <SliderProduct /> */}
      {/* <AddtocarPopup /> */}
    </>
  );
};

export default ShopDetails;
