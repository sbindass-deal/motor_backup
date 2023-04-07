import React, { useEffect, useState } from "react";
import "./Shopdetail.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SliderProduct from "./SliderProduct";
import axios from "axios";
import { useParams } from "react-router";
import SmallSpinner from "../../UI/SmallSpinner";
import NotAvailable from "../../UI/NotAvailable";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../../redux/reducers/cartSlice";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Carousel } from "antd";
import { Image } from "antd";
import { Link } from "react-router-dom";
const ShopDetails = () => {
  const id = useParams().id;
  const dispatch = useDispatch();
  const productRedux = useSelector((state) => state.cartSlice.products);
  const [visible, setVisible] = useState(false);
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const [index, setIndex] = useState();
  const [size, setSize] = useState();
  const [productId, setProductId] = useState();
  const [size_id, setSize_id] = useState();
  const [color_id, setColor_id] = useState();
  const [color_id2, setColor_id2] = useState();
  const [sizeRepeater  , setSizeRepeater] = useState([]);
  const [imageValue, setImageValsue] = useState(0);

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

  const notify2 = (val) =>
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

    setLoading(true);
    try {
      axios.get(
        `${process.env.REACT_APP_URL}allproduct`
      ).then((d) => {
        d?.data?.data?.product.map((d, i) => {
          if (d?.id == id) {
            setProductId(d?.product_inventry[0].id)
            setProduct(d)
          }
        });

      })
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }

    axios.get(`${process.env.REACT_APP_URL}getAllSize`).
      then((d) => {
        setSize(d?.data?.data);
      })

    axios.get(`${process.env.REACT_APP_URL}getAllColors`).
      then((d) => {
        setColor_id(d?.data?.data);
      })

  }, [id]);

  const handleProduct = () => {
    if (size_id == undefined) {
      return toast.warn("Please Choose Size", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

     if(productRedux.map((d) => {
      if (d.size_id == size_id && d.productId == productId) {
         notify2("Item Already Added to cart.");
         return true
      }
    }).filter((d) => d != undefined).pop() != true){
      dispatch(addProduct({ ...product, quantity: 1, size_id: size_id, productId: productId , color_id : color_id2 }));
      notify("Added to cart.");
    }

    
  };

  const contentStyle = {
    maxHeight: "60vh",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
    cursor: "pointer",
  };

  // console.log(sizeRepeater.filter((item,
  //   index) => sizeRepeater.indexOf(item) === index));
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
              {/* <Carousel autoplay>
                {
                  product?.images?.map((d, i) => {
                    return (
                      <div>
                        <img
                          src={`${process.env.REACT_APP_URL}upload/products/${d?.image}`}
                          alt={product.title}
                          style={contentStyle}
                          className="img-fluid"
                          onClick={() => { setVisible(true); setIndex(`${process.env.REACT_APP_URL}upload/products/${d?.image}`) }}
                        />
                      </div>
                    )
                  })
                }
              </Carousel> */}
               <div className="dTLPr">
            <div className="productBigImgLeft">
              {
                product?.images?.map((d, i) => {
                  return (
                    <img
                      onClick={() => setImageValsue(i)}
                      src={`${process.env.REACT_APP_URL}upload/products/${d?.image}`}
                      alt={"title"}
                    />
                  )
                })
              }
            </div>
            <div className="productBigImg">
                {product?.images?.length > 0 && <img
                  src={`${process.env.REACT_APP_URL}upload/products/${product?.images[imageValue]?.image}`}
                  alt={"title"} 
                />}
            </div>
          </div>
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
                    src={`${index}`}
                  />
                </Image.PreviewGroup>
              </div>
            </div>

            <div className="col-md-6 rightSec productDTl">
                  
                  <div className="">
                    <h2>{product.title}</h2>
                    <h5 className="catagories"><small>Category: </small>{product?.category}</h5>

                   
                    
                  </div>
              {
                product?.product_inventry?.map((d, i) => {
                  if (productId == d?.id)
                    return (
                      <p className="price__">$ {d?.price}</p>
                    )
                })
              }



{
                      product?.multiplier && product?.coupon_code && <div className="" id="main_width">

<div class="w">
            <div class="coupon-card">
                <h3>{product?.coupon_code}</h3>
                {/* <span>0X</span> */}
                <p>{product?.multiplier + "X"}</p>
                <div class="circle1"></div>
                <div class="circle2"></div>
            </div>
            <span class="grid_label">Entries</span>
        </div>
                     
                        {/* <div class="vs_grid_entries entries-default mb-3">
                          <div class="entries-count">
                            <i class="fa-solid fa-ticket" ></i>
                            <span class="grid_entries_count">{product?.coupon_code}</span>
                            <span class="grid_label">Entries</span>
                          </div>
                          <div class="multiplier-value blink-soft ml-3">
                            {product?.multiplier + "X"}
                          </div>
                        </div> */}
                      </div>
                   } 

              <p className="product_dec">
                {/* <b>Product ID: {product.id}</b> */}
                <br />
                {product.description}
              </p>
              <div className="sizeColor">
                {/* <div className="sizeColor">Category : {product.category}</div> */}
                <div className="size d-flex"><p className="my-auto">Size :</p>  {
                  product?.product_inventry?.map((d, i) => {
                    return size?.map((data, index) => {
                      if (data?.id == d?.size_id) {
                        sizeRepeater.push(d?.size_id)
                        return (<button className={`mx-2 btn btn-light px-2 py-1`} onClick={() => {setColor_id2(d?.color_id); setProductId(d?.id); setSize_id(d?.size_id); }}>{data?.size}</button>)
                      }
                    })
                  })
                }
                </div>

                <div className="size d-flex">Color : {
                  product?.product_inventry?.map((d, i) => {
                    if (d?.id == productId)
                      return color_id?.map((data, index) => {
                        if (d?.color_id == data.id) {
                          return (<p className={`mx-2 `} >{data?.color}</p>)
                        }
                      })
                  })
                }
                </div>
              </div>
              <p className="product_dec">Stock : {product?.product_inventry?.map((d, i) => {
                if (productId == d?.id)
                  return d?.stock + " "
              })}</p>
              <button onClick={handleProduct} type="button" className="btn" >
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
