import React, { useEffect, useRef, useState } from 'react'
import Img_01 from '../../Assets/images/img_01.jpg'
import Img_02 from '../../Assets/images/img_02.jpg'
import ic_scrollDown from '../../Assets/images/ic_scrollDown.svg'
import car_01 from '../../Assets/images/car_01.jpg'
import car_02 from '../../Assets/images/car_02.jpg'
import car_03 from '../../Assets/images/car_03.jpg'
import car_04 from '../../Assets/images/car_04.jpg'
import img_05 from '../../Assets/images/img_05.jpg'
import img_06 from '../../Assets/images/img_06.jpg'
import addBanner from '../../Assets/images/Mask-group.png'
import Header from '../Header'
import Footer from '../Footer'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import EastIcon from '@mui/icons-material/East';
import WestIcon from '@mui/icons-material/West';
import axios from 'axios'


function Home() {
    const [banner, setBanner] = useState([])

    const getBanner = async() => {
        try {
          const response = await axios.get(`http://ec2-34-207-128-251.compute-1.amazonaws.com:8081/`);
          console.log(response.data);
          setBanner(response.data)
        } catch (error) {
          console.error(error);
        }
      }

      useEffect(() => {
        getBanner()
      
      }, [])
      

    const slide=useRef(null)
    const slide1=useRef(null)


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
        slidesToShow: 2,
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
    const settings1 = {
        dots: false,
        infinite: true,
        slidesToShow: 3,
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
                slidesToShow: 3,
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
    <div>

        <section className="heroSection d-flex align-items-center">
            <button type="button" className="scrollDownIc" onclick="smoothScroll(document.getElementById('second'))"><img src={ic_scrollDown} alt="ic_scrollDown"/></button>
            <div className="container">
                <div className="row">
                    <div className="col-12 col-lg-8 offset-lg-2">
                        <div className="heroText">
                            <h1>WE ARE DEDICATED TO PARKING YOUR DREAM IN YOUR DRIVEWAY</h1>
                            <a href="#" className="btn">VIEW INVENTORY</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section className="ptb_80" id="second">
            <div className="container">
                <div className="row ">
                    <div className="col-12 text-center pb_30">
                        <h2>Featured Auctions</h2>
                    </div>
                    <div style={{position:"absolute", left:"48%", top:"21.5%", zIndex:"1", cursor:"pointer"}}>
                    <span onClick={()=>slide.current.slickPrev()}>
                        <span><WestIcon/></span>
                        <span>Prev</span> 
                    </span>
                    <span  onClick={()=>slide.current.slickNext()} style={{marginLeft:50}}>
                        <span>Next</span> 
                        <span><EastIcon/></span>
                         </span>
                    </div>
                    <div className="col-12" style={{height:"550px"}}>
                        <div className="featuredAuctions_Slide">
                    <Slider ref={slide} {...settings}>
                            <div>
                                <div className="card_post">
                                    <div className="card_postImg">
                                        <img src={Img_01} alt="Img_01"/>
                                    </div>
                                    <div className="card_postInfo">
                                        <h4>12k-Mile 2009 Aston Martin DBS 6-Speed</h4>
                                        <p>This 2009 Aston Martin DBS is finished in Casino Royale Metallic over a black leather and Alcantara interior and is powered by a 5.9-liter V12 mated to a six-speed manual transaxle and a limited-slip differential. Additional equipment includes front and rear parking sensors, 20” alloy wheels, carbon-ceramic brakes…</p>
                                        <ul className="labelList">
                                            <li><label>Current Bid:</label> <span>$126,888</span></li>
                                            <li><label>Ends In:</label> <span>5 days</span></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="card_post">
                                    <div className="card_postImg">
                                        <img src={Img_02} alt="Img_02"/>
                                    </div>
                                    <div className="card_postInfo">
                                        <h4>12k-Mile 2009 Aston Martin DBS 6-Speed</h4>
                                        <p>This 2009 Aston Martin DBS is finished in Casino Royale Metallic over a black leather and Alcantara interior and is powered by a 5.9-liter V12 mated to a six-speed manual transaxle and a limited-slip differential. Additional equipment includes front and rear parking sensors, 20” alloy wheels, carbon-ceramic brakes…</p>
                                        <ul className="labelList">
                                            <li><label>Current Bid:</label> <span>$126,888</span></li>
                                            <li><label>Ends In:</label> <span>5 days</span></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="card_post">
                                    <div className="card_postImg">
                                        <img src={Img_01} alt="Img_01"/>
                                    </div>
                                    <div className="card_postInfo">
                                        <h4>12k-Mile 2009 Aston Martin DBS 6-Speed</h4>
                                        <p>This 2009 Aston Martin DBS is finished in Casino Royale Metallic over a black leather and Alcantara interior and is powered by a 5.9-liter V12 mated to a six-speed manual transaxle and a limited-slip differential. Additional equipment includes front and rear parking sensors, 20” alloy wheels, carbon-ceramic brakes…</p>
                                        <ul className="labelList">
                                            <li><label>Current Bid:</label> <span>$126,888</span></li>
                                            <li><label>Ends In:</label> <span>5 days</span></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="card_post">
                                    <div className="card_postImg">
                                        <img src={Img_02} alt="Img_02"/>
                                    </div>
                                    <div className="card_postInfo">
                                        <h4>12k-Mile 2009 Aston Martin DBS 6-Speed</h4>
                                        <p>This 2009 Aston Martin DBS is finished in Casino Royale Metallic over a black leather and Alcantara interior and is powered by a 5.9-liter V12 mated to a six-speed manual transaxle and a limited-slip differential. Additional equipment includes front and rear parking sensors, 20” alloy wheels, carbon-ceramic brakes…</p>
                                        <ul className="labelList">
                                            <li><label>Current Bid:</label> <span>$126,888</span></li>
                                            <li><label>Ends In:</label> <span>5 days</span></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            
                    </Slider>
                        </div>
                        {/* <!--featuredAuctions_Slide--> */}
                    </div>
                </div>
            </div>
        </section>

        <section className="ptb_50">
            <div className="container">
                <div className="row">
                    <div className="col-12 pb_30">
                        <h2 className="title_combo">Latest Bids <span>(684 Auctions Now Live)</span></h2>
                    </div>
                    <div style={{position:"absolute",right:"10%",top:"23.5%", cursor:"pointer"}}>
                    <span onClick={()=>slide1.current.slickPrev()}>
                        <span><WestIcon/></span>
                        <span>Prev</span> 
                        </span>
                    <span  onClick={()=>slide1.current.slickNext()} style={{marginLeft:50}}>
                        <span>Next</span>
                        <span style={{height:"100px"}}><EastIcon/></span>
                    </span>
                    </div>

                </div>
            </div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="latestBids_Slide arrowTop_Slide" style={{height:"400px",width:"90%", margin:"auto"}}>
                            <Slider ref={slide1} {...settings1}>
                            <div>
                                <div className="card_post">
                                    <div className="card_postImg">
                                        <img src={car_01} alt="car_01"/>
                                    </div>
                                    <div className="card_postInfo">
                                        <h5><a href="#">2005 Morgan Aero 8</a></h5>
                                        <ul className="priceDateList">
                                            <li className="price__">$126,888</li>
                                            <li className="Date__"><i className="fa-solid fa-clock"></i> 5 days</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="card_post">
                                    <div className="card_postImg">
                                        <img src={car_02} alt="car_02"/>
                                    </div>
                                    <div className="card_postInfo">
                                        <h5><a href="#">1966 Porsche 912 Coupe</a></h5>
                                        <ul className="priceDateList">
                                            <li className="price__">$50,000</li>
                                            <li className="Date__"><i className="fa-solid fa-clock"></i> 5 days</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="card_post">
                                    <div className="card_postImg">
                                        <img src={car_03} alt="car_03"/>
                                    </div>
                                    <div className="card_postInfo">
                                        <h5><a href="#">2008 BMW M3 Sedan 6-Speed</a></h5>
                                        <ul className="priceDateList">
                                            <li className="price__">$15,000</li>
                                            <li className="Date__"><i className="fa-solid fa-clock"></i> 5 days</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="card_post">
                                    <div className="card_postImg">
                                        <img src={car_04} alt="car_04"/>
                                    </div>
                                    <div className="card_postInfo">
                                        <h5><a href="#">1999 Mercedes-Benz SL500</a></h5>
                                        <ul className="priceDateList">
                                            <li className="price__">$16,250</li>
                                            <li className="Date__"><i className="fa-solid fa-clock"></i> 5 days</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="card_post">
                                    <div className="card_postImg">
                                        <img src={car_04} alt="car_04"/>
                                    </div>
                                    <div className="card_postInfo">
                                        <h5><a href="#">2005 Morgan Aero 8</a></h5>
                                        <ul className="priceDateList">
                                            <li className="price__">$126,888</li>
                                            <li className="Date__"><i className="fa-solid fa-clock"></i> 5 days</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="card_post">
                                    <div className="card_postImg">
                                        <img src={car_02} alt="car_02"/>
                                    </div>
                                    <div className="card_postInfo">
                                        <h5><a href="#">1966 Porsche 912 Coupe</a></h5>
                                        <ul className="priceDateList">
                                            <li className="price__">$50,000</li>
                                            <li className="Date__"><i className="fa-solid fa-clock"></i> 5 days</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="card_post">
                                    <div className="card_postImg">
                                        <img src={car_03} alt="car_03"/>
                                    </div>
                                    <div className="card_postInfo">
                                        <h5><a href="#">2008 BMW M3 Sedan 6-Speed</a></h5>
                                        <ul className="priceDateList">
                                            <li className="price__">$15,000</li>
                                            <li className="Date__"><i className="fa-solid fa-clock"></i> 5 days</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="card_post">
                                    <div className="card_postImg">
                                        <img src={car_04} alt="car_04"/>
                                    </div>
                                    <div className="card_postInfo">
                                        <h5><a href="#">1999 Mercedes-Benz SL500</a></h5>
                                        <ul className="priceDateList">
                                            <li className="price__">$16,250</li>
                                            <li className="Date__"><i className="fa-solid fa-clock"></i> 5 days</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            </Slider>
                        </div>
                        {/* <!--latestBids_Slide--> */}
                    </div>
                </div>
            </div>
        </section>

        <section className="ptb_80 bgHolder bgImg01 d-flex align-items-center">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-lg-4 offset-md-1 text-center text-md-left">
                        <h1 className="text-back">Find Your Dream Car</h1>
                        <a href="#" className="btn mt-2">VIEW INVENTORY</a>
                    </div>
                </div>
            </div>
        </section>

        <section className="ptb_80 bgHolder bgImg02 d-flex align-items-center">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5 offset-md-4 offset-lg-5 offset-xl-6 text-center text-md-right">
                        <h1>Sell Your High Quality classNameic Car</h1>
                        <a href="#" className="btn mt-2">VIEW INVENTORY</a>
                    </div>
                </div>
            </div>
        </section>

        <section className="ptb_80 blogSection">
            <div className="container">
                <div className="row">
                    <div className="col-12 text-center pb_30">
                        <h2>Latest Blogs</h2>
                    </div>
                    <div className="col-12 ">
                        <div className="row pb_30">
                            <div className="col-12 col-md-6 col-lg-7">
                                <div className="blogPost">
                                    <img src={car_03} alt="car_03" />
                                </div>
                            </div>
                            <div className="col-12 col-md-6 col-lg-5 d-flex align-items-center">
                                <div className="blogPostText">
                                    <h4>shibnobi Auction: 1984 Ferrari 512 BBi</h4>
                                    <ul className="post_labelList">
                                        <li><i className="fa-solid fa-clock"></i> September 13, 2022</li>
                                        <li><i className="fa-solid fa-location-dot"></i> Italian</li>
                                        <li><i className="fa-solid fa-comment-dots"></i> 14 Comments</li>
                                    </ul>
                                    <p>This 1962 Jaguar XKE is a left-hand-drive Series I coupe that was completed on June 7, 1962, and is said to have been sold new in California. It was moved to Michigan in 1987 and underwent a mechanical refurbishment by Eclectic Motorworks of Holland, Michigan, that was completed in 2020 before it was acquired by the selling dealer from its owner of 35 years in 2021.</p>
                                    <a href="#" className="btn">Read More</a>
                                </div>
                            </div>
                        </div>
                        {/* <!--row--> */}
                        <div className="row pb_30">
                            <div className="col-12 col-md-6 col-lg-7 order-md-1">
                                <div className="blogPost">
                                    <img src={car_04} alt="car_04"/>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 col-lg-5 d-flex align-items-center order-md-0">
                                <div className="blogPostText">
                                    <h4>shibnobi Auction: 50-Years-Owned 1972 Datsun 240Z</h4>
                                    <ul className="post_labelList">
                                        <li><i className="fa-solid fa-clock"></i> September 13, 2022</li>
                                        <li><i className="fa-solid fa-location-dot"></i> Italian</li>
                                        <li><i className="fa-solid fa-comment-dots"></i> 14 Comments</li>
                                    </ul>
                                    <p>This 1962 Jaguar XKE is a left-hand-drive Series I coupe that was completed on June 7, 1962, and is said to have been sold new in California. It was moved to Michigan in 1987 and underwent a mechanical refurbishment by Eclectic Motorworks of Holland, Michigan, that was completed in 2020 before it was acquired by the selling dealer from its owner of 35 years in 2021.</p>
                                    <a href="#" className="btn">Read More</a>
                                </div>
                            </div>
                        </div>
                        {/* <!--row--> */}
                        <div className="row pb_30">
                            <div className="col-12 col-md-6 col-lg-7">
                                <div className="blogPost">
                                    <img src={img_05} alt="img_05"/>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 col-lg-5 d-flex align-items-center">
                                <div className="blogPostText">
                                    <h4>shibnobi Auction: 1984 Ferrari 512 BBi</h4>
                                    <ul className="post_labelList">
                                        <li><i className="fa-solid fa-clock"></i> September 13, 2022</li>
                                        <li><i className="fa-solid fa-location-dot"></i> Italian</li>
                                        <li><i className="fa-solid fa-comment-dots"></i> 14 Comments</li>
                                    </ul>
                                    <p>This 1962 Jaguar XKE is a left-hand-drive Series I coupe that was completed on June 7, 1962, and is said to have been sold new in California. It was moved to Michigan in 1987 and underwent a mechanical refurbishment by Eclectic Motorworks of Holland, Michigan, that was completed in 2020 before it was acquired by the selling dealer from its owner of 35 years in 2021.</p>
                                    <a href="#" className="btn">Read More</a>
                                </div>
                            </div>
                        </div>
                        {/* <!--row--> */}
                        <div className="row pb_30">
                            <div className="col-12 col-md-6 col-lg-7 order-md-1">
                                <div className="blogPost">
                                    <img src={img_06} alt="img_06"/>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 col-lg-5 d-flex align-items-center order-md-0">
                                <div className="blogPostText">
                                    <h4>shibnobi Auction: 50-Years-Owned 1972 Datsun 240Z</h4>
                                    <ul className="post_labelList">
                                        <li><i className="fa-solid fa-clock"></i> September 13, 2022</li>
                                        <li><i className="fa-solid fa-location-dot"></i> Italian</li>
                                        <li><i className="fa-solid fa-comment-dots"></i> 14 Comments</li>
                                    </ul>
                                    <p>This 1962 Jaguar XKE is a left-hand-drive Series I coupe that was completed on June 7, 1962, and is said to have been sold new in California. It was moved to Michigan in 1987 and underwent a mechanical refurbishment by Eclectic Motorworks of Holland, Michigan, that was completed in 2020 before it was acquired by the selling dealer from its owner of 35 years in 2021.</p>
                                    <a href="#" className="btn">Read More</a>
                                </div>
                            </div>
                        </div>
                        {/* <!--row--> */}
                        <div className="row">
                            <div className="col-12 text-center pt_40">
                                <a href="#" className="btn">View More Blogs</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
        <section className="ptb_80 blogSection">
            <div className="container">
                <div className="row">
                    <div className="col-12 text-center pb_30">
                        <img src={addBanner} className="addBanner"/>
                    </div>
                </div>
            </div>
        </section> 
    </div>
  )
}

export default Home



// import React from 'react'
// import Slider from 'react-slick';
// import "slick-carousel/slick/slick.css"; 
// import "slick-carousel/slick/slick-theme.css";

// const Home = () => {
//     var settings = {
//         dots: true,
//         infinite: false,
//         speed: 500,
//         slidesToShow: 4,
//         slidesToScroll: 4,
//         initialSlide: 0,
//         responsive: [
//           {
//             breakpoint: 1024,
//             settings: {
//               slidesToShow: 3,
//               slidesToScroll: 3,
//               infinite: true,
//               dots: true
//             }
//           },
//           {
//             breakpoint: 600,
//             settings: {
//               slidesToShow: 2,
//               slidesToScroll: 2,
//               initialSlide: 2
//             }
//           },
//           {
//             breakpoint: 480,
//             settings: {
//               slidesToShow: 1,
//               slidesToScroll: 1
//             }
//           }
//         ]
//       };
//   return (
//     <div >
//          <div style={{backgroundColor:"red"}}>
//         <h2> Multiple items </h2>
//         <Slider {...settings}>
//           <div>
//             <h3>1</h3>
//           </div>
//           <div>
//             <h3>2</h3>
//           </div>
//           <div>
//             <h3>3</h3>
//           </div>
//           <div>
//             <h3>4</h3>
//           </div>
//           <div>
//             <h3>5</h3>
//           </div>
//           <div>
//             <h3>6</h3>
//           </div>
//           <div>
//             <h3>7</h3>
//           </div>
//           <div>
//             <h3>8</h3>
//           </div>
//           <div>
//             <h3>9</h3>
//           </div>
//         </Slider>
//       </div>
//     </div>
//   )
// }

// export default Home