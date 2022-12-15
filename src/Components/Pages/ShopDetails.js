import React,{useRef} from 'react'

import Carousel from "react-bootstrap/Carousel";
import './Shopdetail.css'
import img_04 from "../../Assets/images/img-4.png";
import img_05 from "../../Assets/images/img-8.webp";
import img_06 from "../../Assets/images/img-6.webp";
import img_07 from "../../Assets/images/img-7.jpeg";
import img_01 from "../../Assets/images/img-1.webp";
import img_02 from "../../Assets/images/img-2.webp";
import img_03 from "../../Assets/images/img-3.webp";

import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import EastIcon from '@mui/icons-material/East';
import WestIcon from '@mui/icons-material/West';

import AddtocarPopup from "./AddtocarPopup";
const ShopDetails = () => {
  const slide=useRef(null)


  function SampleNextArrow(props) {
      const { className, style, onClick } = props;
      return (
        <div
          className={className}
          style={{ ...style, display: "block", background: "red" }}
          onClick={onClick}
        />
      );
    }
    
    function SamplePrevArrow(props) {
      const { className, style, onClick } = props;
      return (
        <div
          className={className}
          style={{ ...style, display: "block", background: "green" }}
          onClick={onClick}
        />
      );
    }
    


    const settings = {
      dots: true,
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 1,
      arrows:false,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
      // autoplay: true,
      // speed: 10000,
      // pauseOnHover: true,
      // cssEase: "linear"
      responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
  
    };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-6 sliderSec ">
            <Carousel slide={false}>
              <Carousel.Item>
                <img className="d-block w-100" src={img_01} alt="First slide" />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={img_05}
                  alt="Second slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img className="d-block w-100" src={img_07} alt="Third slide" />
              </Carousel.Item>
            </Carousel>
          </div>
          <div className="col-md-6 rightSec">
            <h5 className="catagories">M&S COLLECTION</h5>
            <h2>Womens Gas Guzzlrs T Shirt</h2>
            <p className="price__">$24.99</p>
            <p className="product_dec"><b>Product ID: T77/4733B</b><br/>
Spread festive cheer with this playful pure cotton top. Comfy regular fit. Features a whimsical print of three penguins decorating a Christmas tree, plus the slogan 'Shine bright.' A touch of glitter adds an extra bit of magic. We only ever use responsibly sourced cotton for our clothe</p>
           
            <div className="sizeColor">
              <select className="color">
                <option>Select Color</option>
                <option>Black</option>
                <option>Red </option>
              </select>
              <select className="size">
                <option>Select Size</option>
                <option>2-3 Years </option>
                <option>2-3 Years </option>
              </select>
            </div>
            <button type="button" className="btn">Add to Cart</button>

          </div>
        </div>
      </div>
      <section className="ptb_80">
            <div className="container">
                <div className="row">
                    <div className="col-12 pb_30">
                        <h2 className="title_combo">Related Products</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">

                    <div style={{position:"absolute", right:"4%", cursor:"pointer",top:"-8%"}}>
                    <span onClick={()=>slide.current.slickPrev()}>
                        <span><WestIcon/></span>
                        <span>Prev</span> 
                        </span>
                    <span  onClick={()=>slide.current.slickNext()} style={{marginLeft:50}}>
                        <span>Next</span>
                        <span style={{height:"100px"}}><EastIcon/></span>
                    </span>
                    </div>

                        <div className="fore_Slide arrowTop_Slide" style={{height:"350px"}}>
                            <Slider ref={slide} {...settings}>
                            <div>
                                <div className="card_post">
                                    <div className="card_postImg">
                                    <img src={img_01} alt="car_01"/>
                                    </div>
                                    <div className="card_postInfo">
                                        <h5><a href="#">New Make, Model, and Category Pages</a></h5>
                                        <ul className="priceDateList">
                                            <li className="Date__"><i className="fa-solid fa-clock"></i> 5 days</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                          
                            <div>
                                <div className="card_post">
                                    <div className="card_postImg">
                                    <img src={img_02} alt="car_02"/>
                                    </div>
                                    <div className="card_postInfo">
                                        <h5><a href="#">Model, and Category Pages</a></h5>
                                        <ul className="priceDateList">
                                            <li className="Date__"><i className="fa-solid fa-clock"></i> 2 days</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="card_post">
                                    <div className="card_postImg">
                                    <img src={img_03} alt="car_03"/>
                                    </div>
                                    <div className="card_postInfo">
                                        <h5><a href="#">New Inventory in the Gas Guzzlrs Gear Store!</a></h5>
                                        <ul className="priceDateList">
                                            <li className="Date__"><i className="fa-solid fa-clock"></i> 2 days</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="card_post">
                                    <div className="card_postImg">
                                    <img src={img_04} alt="car_04"/>
                                    </div>
                                    <div className="card_postInfo">
                                        <h5><a href="#">1999 Mercedes-Benz SL500</a></h5>
                                        <ul className="priceDateList">
                                            <li className="Date__"><i className="fa-solid fa-clock"></i> 5 days</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="card_post">
                                    <div className="card_postImg">
                                    <img src={img_05} alt="car_01"/>
                                    </div>
                                    <div className="card_postInfo">
                                        <h5><a href="#">2005 Morgan Aero 8</a></h5>
                                        <ul className="priceDateList">
                                            <li className="Date__"><i className="fa-solid fa-clock"></i> 5 days</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="card_post">
                                    <div className="card_postImg">
                                    <img src={img_07} alt="car_02"/>
                                    </div>
                                    <div className="card_postInfo">
                                        <h5><a href="#">1966 Porsche 912 Coupe</a></h5>
                                        <ul className="priceDateList">
                                            <li className="Date__"><i className="fa-solid fa-clock"></i> 5 days</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="card_post">
                                    <div className="card_postImg">
                                    <img src={img_01} alt="car_03"/>
                                    </div>
                                    <div className="card_postInfo">
                                        <h5><a href="#">2008 BMW M3 Sedan 6-Speed</a></h5>
                                        <ul className="priceDateList">
                                            <li className="Date__"><i className="fa-solid fa-clock"></i> 5 days</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="card_post">
                                    <div className="card_postImg">
                                    <img src={img_02} alt="car_04"/>
                                    </div>
                                    <div className="card_postInfo">
                                        <h5><a href="#">1999 Mercedes-Benz SL500</a></h5>
                                        <ul className="priceDateList">
                                            <li className="Date__"><i className="fa-solid fa-clock"></i> 5 days</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                              </Slider>
                        </div>

                    </div>
                </div>
            </div>
        </section>


     <AddtocarPopup/>
    </>
  );
};

export default ShopDetails;
