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
import "react-toastify/dist/ReactToastify.css";
import { Carousel } from "antd";
import { Image } from "antd";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

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
  const [sizeRepeater, setSizeRepeater] = useState([]);
  const [imageValue, setImageValsue] = useState(0);

  const [getSizeCategories, setGetSizeCategories] = useState([]);
  const [sizeSelect, setSizeSelect] = useState("");
  const [colorSelect, setColorSelect] = useState("");
  const [getPrice, setGetPrice] = useState("");
  const [addCart, setAddCart] = useState(false);
  // console.log(111100, getPrice)

  const navigate = useNavigate();
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
      axios.get(`${process.env.REACT_APP_URL}allproduct`).then((d) => {
        d?.data?.data?.product.map((d, i) => {
          if (d?.id == id) {
            setProductId(d?.product_inventry[0].id);
            setProduct(d);
          }
        });
      });
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }

    axios.get(`${process.env.REACT_APP_URL}getAllSize`).then((d) => {
      setSize(d?.data?.data);
    });

    axios.get(`${process.env.REACT_APP_URL}getAllColors`).then((d) => {
      setColor_id(d?.data?.data);
    });
  }, [id]);

  // useEffect(() => {
  //   getSizeCategories?.product_inventory
  //     ?.map((curVal,i=0) => {

  //         setGetPrice(curVal?.price)

  //       // return curVal?.size_id == e.target.value
  //     })
  // }, [getSizeCategories])

  const handleChange = (e) => {
    setSizeSelect(e.target.value);

    getSizeCategories?.product_inventory?.filter((curVal) => {
      if (curVal?.size_id == e.target.value) {
        setGetPrice(curVal?.price);
      }
    });
  };

  const handleChangeColor = (e) => {
    setColorSelect(e.target.value);
  };

  console.log(8000, colorSelect);

  const getProductDetail = () => {
    // Make a request for a user with a given ID
    axios
      .get(`${process.env.REACT_APP_URL}getProductDetail/${id}`)
      .then(function (response) {
        // handle success
        console.log(100, response);
        setGetSizeCategories(response.data.data);
        setSizeSelect(response.data.data.sizes[0].size_id);
        setGetPrice(response.data.data.product_inventory[0].price);
        setColorSelect(response.data.data.colors[0].color_id);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  };

  console.log(979890, sizeSelect);
  useEffect(() => {
    getProductDetail();
  }, []);

  console.log(787800009, getSizeCategories);

  const handleProduct = () => {
    setAddCart(true);
    // if (size_id == undefined) {
    //   return toast.warn("Please Choose Size", {
    //     position: "bottom-center",
    //     autoClose: 5000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "light",
    //   });
    // }

    dispatch(
      addProduct({
        ...product,
        quantity: 1,
        size_id: sizeSelect,
        productId: id,
        color_id: colorSelect,
      })
    );
    notify("Item Added to cart !");

    // if (productRedux.map((d) => {
    //   if (d.size_id == size_id && d.productId == productId) {
    //     notify2("Item Already Added to cart.");
    //     return true
    //   }
    // }).filter((d) => d != undefined).pop() != true) {
    //   dispatch(addProduct({ ...product, quantity: 1, size_id: size_id, productId: productId, color_id: color_id2 }));
    //   notify("Added to cart.");
    // }
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

  console.log(678908, sizeSelect);

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
                  {getSizeCategories?.image?.map((d, i) => {
                    return (
                      <img
                        onClick={() => setImageValsue(i)}
                        src={`${process.env.REACT_APP_URL}upload/products/${d?.image}`}
                        alt={"title"}
                      />
                    );
                  })}
                </div>
                <div className="productBigImg">
                  {getSizeCategories?.image?.length > 0 && (
                    <img
                      src={`${process.env.REACT_APP_URL}upload/products/${getSizeCategories?.image[imageValue]?.image}`}
                      alt={"title"}
                    />
                  )}
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
                  <Image src={`${index}`} />
                </Image.PreviewGroup>
              </div>
            </div>

            <div className="col-md-6 rightSec productDTl">
              <div className="">
                <h2>{getSizeCategories?.title}</h2>
                <h5 className="catagories">
                  <small>Category: </small>
                  {getSizeCategories?.category}
                </h5>
              </div>
              {getSizeCategories?.product_inventory?.map((d, i) => {
                if (productId == d?.id)
                  return <p className="price__">$ {getPrice && getPrice}</p>;
              })}

              {/* <p className="price__">${getSizeCategories?.product_inventory[0]?.price}</p> */}

              {getSizeCategories?.multiplier &&
                getSizeCategories?.coupon_code && (
                  <div className="" id="main_width">
                    <div class="w">
                      <div class="coupon-card">
                        <h3>{product?.coupon_code}</h3>
                        {/* <span>0X</span> */}
                        <p>{getSizeCategories?.multiplier + "X"}</p>
                        <div class="circle1"></div>
                        <div class="circle2"></div>
                      </div>
                      <Link class="price__" to={"/carraffle"}>
                        Giveways Entries
                      </Link>
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
                )}

              <p className="product_dec">
                {/* <b>Product ID: {product.id}</b> */}
                <br />
                {getSizeCategories?.description}
              </p>
              <div className="sizeColor">
                {/* <div className="sizeColor">Category : {product.category}</div> */}
                <div className="size">
                  <select
                    className="size"
                    value={sizeSelect}
                    onChange={(e) => handleChange(e)}
                  >
                    {getSizeCategories?.sizes?.map((curVal, i) => {
                      return (
                        <option value={curVal?.size_id}>
                          {curVal?.size_name}
                        </option>
                      );
                    })}
                    {/* <option value={""}>SIZE</option>
                    <option value={"XL"}>XL</option>
                    <option value={"L"}>L</option>
                    <option value={"M"}>M</option>
                    <option value={"SM"}>SM</option> */}
                  </select>

                  <select
                    className="size"
                    value={colorSelect}
                    onChange={(e) => handleChangeColor(e)}
                  >
                    {getSizeCategories?.colors?.map((curVal, i) => {
                      return (
                        <option value={curVal?.color_id}>
                          {curVal?.color_name}
                        </option>
                      );
                    })}
                    {/* <option value={""}>COLOR</option>
                    <option value={"Red"}>Red</option>
                    <option value={"Blue"}>Blue</option>
                    <option value={"Green"}>Green</option>
                    <option value={"Black"}>Black</option> */}
                  </select>
                </div>
                {/* <div className="size d-flex"><p className="my-auto">Size :</p>  {
                  product?.product_inventry?.map((d, i) => {
                    return size?.map((data, index) => {
                      if (data?.id == d?.size_id) {
                        sizeRepeater.push(d?.size_id)
                        return (<button className={`mx-2 btn btn-light px-2 py-1`} onClick={() => {setColor_id2(d?.color_id); setProductId(d?.id); setSize_id(d?.size_id); }}>{data?.size}</button>)
                      }
                    })
                  })
                }
                </div> */}

                {/* <div className="size d-flex">Color : {
                  product?.product_inventry?.map((d, i) => {
                    if (d?.id == productId)
                      return color_id?.map((data, index) => {
                        if (d?.color_id == data.id) {
                          return (<p className={`mx-2 `} >{data?.color}</p>)
                        }
                      })
                  })
                }
                </div> */}
              </div>
              {/* <h5 className="catagories"><small>Stock: </small>{product?.product_inventry?.map((d, i) => {
                if (productId == d?.id)
                  return d?.stock + " "
              })}</h5> */}

              {addCart ? (
                <button
                  type="button"
                  className="btn"
                  onClick={() => navigate("/cart")}
                >
                  Added to Cart
                </button>
              ) : (
                <button onClick={handleProduct} type="button" className="btn">
                  Add to Cart
                </button>
              )}
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
