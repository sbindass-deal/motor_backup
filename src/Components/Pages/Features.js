import React,{useRef} from 'react'
import img_001 from '../../Assets/images/img_001.webp'
import img_002 from '../../Assets/images/img_002.jpg'
import img_003 from '../../Assets/images/img_003.webp'
import img_004 from '../../Assets/images/img_004.jpg'
import img_005 from '../../Assets/images/img_005.jpg'
import img_006 from '../../Assets/images/img_006.jpg' 
import car_01 from '../../Assets/images/car_01.jpg'
import car_02 from '../../Assets/images/car_02.jpg'
import car_03 from '../../Assets/images/car_03.jpg'
import car_04 from '../../Assets/images/car_04.jpg'

import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import EastIcon from '@mui/icons-material/East';
import WestIcon from '@mui/icons-material/West';


function Features() {

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
    <div>
        <section className="ptb_80 pt_sm_50">
            <div className="container">
                <div className="row">
                    <div className="col-12 text-center pb_30">
                        <h2 className="title_combo title_Center">Shibnobi Features</h2>
                    </div>
                    <div className="col-12 col-md-6 pb-3">
                        <div className="card_post">
                            <div className="card_postImg">
                                <img src={img_001} alt="img_001"/>
                            </div>
                            <div className="card_postInfo">
                                <h4><a href="detail.html">Lorem Ipsum is simply dummy text</a></h4>
                                <ul className="labelList">
                                    <li>October 14, 2022</li>
                                    <li><i className="fa-solid fa-user mr-2"></i> sludgo's Mile Markers</li>
                                </ul>
                                <p>Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition…</p>						
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 pb-3">
                        <div className="card_post">
                            <div className="card_postImg">
                            <img src={img_002} alt="img_002"/>
                            </div>
                            <div className="card_postInfo">
                                <h4><a href="detail.html">Lorem Ipsum has been the industry's</a></h4>
                                <ul className="labelList">
                                    <li>October 14, 2022</li>
                                    <li><i className="fa-solid fa-user mr-2"></i> sludgo's Mile Markers</li>
                                </ul>
                                <p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took…</p>						
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 pb-3">
                        <div className="card_post">
                            <div className="card_postImg">
                            <img src={img_003} alt="img_003"/>
                            </div>
                            <div className="card_postInfo">
                                <h4><a href="detail.html">Lorem Ipsum is simply dummy text</a></h4>
                                <ul className="labelList">
                                    <li>October 14, 2022</li>
                                    <li><i className="fa-solid fa-user mr-2"></i> sludgo's Mile Markers</li>
                                </ul>
                                <p>Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition…</p>
                                
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 pb-3">
                        <div className="card_post">
                            <div className="card_postImg">
                            <img src={img_004} alt="img_004"/>
                            </div>
                            <div className="card_postInfo">
                                <h4><a href="detail.html">Lorem Ipsum has been the industry's</a></h4>
                                <ul className="labelList">
                                    <li>October 14, 2022</li>
                                    <li><i className="fa-solid fa-user mr-2"></i> sludgo's Mile Markers</li>
                                </ul>
                                <p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took…</p>						
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 pb-3">
                        <div className="card_post">
                            <div className="card_postImg">
                            <img src={img_005} alt="img_005"/>
                            </div>
                            <div className="card_postInfo">
                                <h4><a href="detail.html">Lorem Ipsum is simply dummy text</a></h4>
                                <ul className="labelList">
                                    <li>October 14, 2022</li>
                                    <li><i className="fa-solid fa-user mr-2"></i> sludgo's Mile Markers</li>
                                </ul>
                                <p>Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition…</p>
                                
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 pb-3">
                        <div className="card_post">
                            <div className="card_postImg">
                            <img src={img_006} alt="img_006"/>
                            </div>
                            <div className="card_postInfo">
                                <h4><a href="detail.html">Lorem Ipsum has been the industry's</a></h4>
                                <ul className="labelList">
                                    <li>October 14, 2022</li>
                                    <li><i className="fa-solid fa-user mr-2"></i> sludgo's Mile Markers</li>
                                </ul>
                                <p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took…</p>						
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 pb-3">
                        <div className="card_post">
                            <div className="card_postImg">
                            <img src={img_001} alt="img_001"/>
                            </div>
                            <div className="card_postInfo">
                                <h4><a href="detail.html">Lorem Ipsum is simply dummy text</a></h4>
                                <ul className="labelList">
                                    <li>October 14, 2022</li>
                                    <li><i className="fa-solid fa-user mr-2"></i> sludgo's Mile Markers</li>
                                </ul>
                                <p>Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition…</p>						
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 pb-3">
                        <div className="card_post">
                            <div className="card_postImg">
                            <img src={img_002} alt="img_002"/>
                            </div>
                            <div className="card_postInfo">
                                <h4><a href="detail.html">Lorem Ipsum has been the industry's</a></h4>
                                <ul className="labelList">
                                    <li>October 14, 2022</li>
                                    <li><i className="fa-solid fa-user mr-2"></i> sludgo's Mile Markers</li>
                                </ul>
                                <p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took…</p>						
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 pb-3">
                        <div className="card_post">
                            <div className="card_postImg">
                            <img src={img_003} alt="img_003"/>
                            </div>
                            <div className="card_postInfo">
                                <h4><a href="detail.html">Lorem Ipsum is simply dummy text</a></h4>
                                <ul className="labelList">
                                    <li>October 14, 2022</li>
                                    <li><i className="fa-solid fa-user mr-2"></i> sludgo's Mile Markers</li>
                                </ul>
                                <p>Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition…</p>
                                
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 pb-3">
                        <div className="card_post">
                            <div className="card_postImg">
                            <img src={img_004} alt="img_004"/>
                            </div>
                            <div className="card_postInfo">
                                <h4><a href="detail.html">Lorem Ipsum has been the industry's</a></h4>
                                <ul className="labelList">
                                    <li>October 14, 2022</li>
                                    <li><i className="fa-solid fa-user mr-2"></i> sludgo's Mile Markers</li>
                                </ul>
                                <p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took…</p>						
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 pb-3">
                        <div className="card_post">
                            <div className="card_postImg">
                            <img src={img_005} alt="img_005"/>
                            </div>
                            <div className="card_postInfo">
                                <h4><a href="detail.html">Lorem Ipsum is simply dummy text</a></h4>
                                <ul className="labelList">
                                    <li>October 14, 2022</li>
                                    <li><i className="fa-solid fa-user mr-2"></i> sludgo's Mile Markers</li>
                                </ul>
                                <p>Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition…</p>
                                
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 pb-3">
                        <div className="card_post">
                            <div className="card_postImg">
                            <img src={img_006} alt="img_006"/>
                            </div>
                            <div className="card_postInfo">
                                <h4><a href="detail.html">Lorem Ipsum has been the industry's</a></h4>
                                <ul className="labelList">
                                    <li>October 14, 2022</li>
                                    <li><i className="fa-solid fa-user mr-2"></i> sludgo's Mile Markers</li>
                                </ul>
                                <p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took…</p>						
                            </div>
                        </div>
                    </div>

                    <div className="col-12">
                        <ul className="pagination justify-content-center mt-4">
                            <li className="page-item disabled"><a className="page-link" href="#"><i className="fa-solid fa-arrow-left"></i></a></li>
                            <li className="page-item active"><a className="page-link" href="#">1</a></li>
                            <li className="page-item"><a className="page-link" href="#">2</a></li>
                            <li className="page-item"><a className="page-link" href="#">3</a></li>
                            <li className="page-item"><a className="page-link" href="#">...</a></li>
                            <li className="page-item"><a className="page-link" href="#">10</a></li>
                            <li className="page-item"><a className="page-link" href="#"><i className="fa-solid fa-arrow-right"></i></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>

        <section className="ptb_80">
            <div className="container">
                <div className="row">
                    <div className="col-12 pb_30">
                        <h2 className="title_combo">Technically Interesting</h2>
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
                                    <img src={car_01} alt="car_01"/>
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
                                    <img src={car_02} alt="car_02"/>
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
                                    <img src={car_03} alt="car_03"/>
                                    </div>
                                    <div className="card_postInfo">
                                        <h5><a href="#">New Inventory in the Shibnobi Gear Store!</a></h5>
                                        <ul className="priceDateList">
                                            <li className="Date__"><i className="fa-solid fa-clock"></i> 2 days</li>
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
                                            <li className="Date__"><i className="fa-solid fa-clock"></i> 5 days</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="card_post">
                                    <div className="card_postImg">
                                    <img src={car_01} alt="car_01"/>
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
                                    <img src={car_02} alt="car_02"/>
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
                                    <img src={car_03} alt="car_03"/>
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
                                    <img src={car_04} alt="car_04"/>
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
    </div>
  )
}

export default Features