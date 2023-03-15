// import React, { useRef } from "react";
// import car_01 from "../../Assets/images/car_01.jpg";
// import car_02 from "../../Assets/images/car_02.jpg";
// import car_03 from "../../Assets/images/car_03.jpg";
// import car_04 from "../../Assets/images/car_04.jpg";

// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import EastIcon from "@mui/icons-material/East";
// import WestIcon from "@mui/icons-material/West";
// import axios from "axios";
// // import { Navigate, useNavigation } from "react-router-dom";

// function MakeAnModel() {
//   const [data, setData] = React.useState([]);
//   const [make, setMake] = React.useState([]);
//   // const navigate = useNavigation()
//   const slide = useRef(null);
//   const slide1 = useRef(null);
//   const slide2 = useRef(null);
//   const slide3 = useRef(null);

//   React.useEffect(() => {
//     axios.get(process.env.REACT_APP_URL + "vehicles").then((response) => {
//       let uniqueObjArray = [
//         ...new Map(
//           response.data.data.map((item) => [item["make"], item])
//         ).values(),
//       ];

//       setMake(uniqueObjArray);
//       setData(response.data.data);
//     });
//   }, []);

//   function SampleNextArrow(props) {
//     const { className, style, onClick } = props;
//     return (
//       <div
//         className={className}
//         style={{ ...style, display: "block", background: "red" }}
//         onClick={onClick}
//       />
//     );
//   }

//   function SamplePrevArrow(props) {
//     const { className, style, onClick } = props;
//     return (
//       <div
//         className={className}
//         style={{ ...style, display: "block", background: "green" }}
//         onClick={onClick}
//       />
//     );
//   }

//   const settings = {
//     dots: true,
//     infinite: true,
//     slidesToShow: 4,
//     slidesToScroll: 1,
//     arrows: false,
//     nextArrow: <SampleNextArrow />,
//     prevArrow: <SamplePrevArrow />,
//     // autoplay: true,
//     // speed: 10000,
//     // pauseOnHover: true,
//     // cssEase: "linear"
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 1,
//           infinite: true,
//           dots: true,
//         },
//       },
//       {
//         breakpoint: 600,
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 2,
//           initialSlide: 2,
//         },
//       },
//       {
//         breakpoint: 480,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//         },
//       },
//     ],
//   };
//   return (
//     <>
//       <section className="pt_80 pt_sm_50">
//         <div className="container">
//           <div className="row">
//             <div className="col-12 text-center pb_30">
//               <h2 className="title_combo title_Center">
//                 Makes and Models Directory
//               </h2>
//             </div>
//             <div className="col-12">
//               <ul className="postTopOption">
//                 <li className="post_search">
//                   <input
//                     type="text"
//                     name=""
//                     placeholder="Search for a make or model"
//                   />
//                 </li>
//                 <li className="">
//                   <button
//                     type="button"
//                     className="gry_btn"
//                     data-toggle="modal"
//                     data-target="#FiltersModal"
//                   >
//                     <i className="fa-solid fa-filter mr-2"></i> Filters
//                   </button>
//                 </li>
//               </ul>
//             </div>
//           </div>

//           <div className="modal fade" id="FiltersModal">
//             <div className="modal-dialog modal-dialog-centered">
//               <div className="modal-content">
//                 <div className="modal-header border-0">
//                   <h4 className="modal-title">Filters</h4>
//                   <button type="button" className="close" data-dismiss="modal">
//                     <i className="fa-solid fa-xmark"></i>
//                   </button>
//                 </div>

//                 <div className="modal-body">
//                   <form>
//                     <div className="row row_gap_5">
//                       <div className="col-12 col-md-6">
//                         <label>Vehicle Year</label>
//                         <div className="form-group">
//                           <input
//                             type="text"
//                             name=""
//                             className="field"
//                             placeholder="1900"
//                           />
//                         </div>
//                       </div>
//                       <div className="col-12 col-md-6">
//                         <label>To</label>
//                         <div className="form-group">
//                           <input
//                             type="text"
//                             name=""
//                             className="field"
//                             placeholder="2023"
//                           />
//                         </div>
//                       </div>
//                       <div className="col-12 col-md-6">
//                         <label>List Date</label>
//                         <div className="form-group">
//                           <select className="field">
//                             <option>All Time</option>
//                             <option>7 Days</option>
//                             <option>Last Month</option>
//                             <option>Last Year</option>
//                             <option>Last 2 Year</option>
//                             <option>Last 5 Year</option>
//                           </select>
//                         </div>
//                       </div>
//                       <div className="col-12 col-md-6">
//                         <label>Result</label>
//                         <div className="form-group">
//                           <select className="field">
//                             <option>All</option>
//                             <option>Sold Only</option>
//                             <option>Reserve Not Met</option>
//                           </select>
//                         </div>
//                       </div>
//                       <div className="col-12 col-md-6">
//                         <label>High Bid</label>
//                         <div className="form-group">
//                           <select className="field">
//                             <option>No Min</option>
//                             <option>$5k</option>
//                             <option>#10k</option>
//                             <option>#15k</option>
//                             <option>#20k</option>
//                             <option>#25k</option>
//                             <option>#30k</option>
//                           </select>
//                         </div>
//                       </div>
//                       <div className="col-12 col-md-6">
//                         <label>To</label>
//                         <div className="form-group">
//                           <select className="field">
//                             <option>No Max</option>
//                             <option>$5k</option>
//                             <option>#10k</option>
//                             <option>#15k</option>
//                             <option>#20k</option>
//                             <option>#25k</option>
//                             <option>#30k</option>
//                           </select>
//                         </div>
//                       </div>
//                       <div className="col-12 col-md-12">
//                         <label>Exclude Words / Models / Tags</label>
//                         <div className="form-group">
//                           <input
//                             type="text"
//                             name=""
//                             className="field"
//                             placeholder="Enter"
//                           />
//                         </div>
//                       </div>
//                     </div>
//                     <div className="form-group">
//                       <button type="button" className="btn">
//                         Filters
//                       </button>
//                     </div>
//                   </form>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {make.length > 0 ? (
//         <section className="pt_40">
//           <div className="container">
//             <div className="row">
//               <div className="col-12 pb-3">
//                 <h3 className="title_combo">{make[0].make}</h3>
//               </div>

//               <div
//                 style={{ position: "absolute", right: "8%", cursor: "pointer" }}
//               >
//                 <span onClick={() => slide.current.slickPrev()}>
//                   <span>
//                     <WestIcon />
//                   </span>
//                   <span>Prev</span>
//                 </span>
//                 <span
//                   onClick={() => slide.current.slickNext()}
//                   style={{ marginLeft: 50 }}
//                 >
//                   <span>Next</span>
//                   <span style={{ height: "100px" }}>
//                     <EastIcon />
//                   </span>
//                 </span>
//               </div>

//               <div className="col-12 " style={{ height: "290px" }}>
//                 <div className="makes_Slide arrowTop_Slide ">
//                   <Slider ref={slide} {...settings}>
//                   {data
//                       .filter((filter) => filter.make === make[0].make)
//                       .map((data) => (
//                         <div>
//                           <div className="card_post">
//                             <div className="card_postImg">
//                               <a href="detail">
//                                 <button
//                                   type="button"
//                                   className="watchedIc"
//                                   // onClick={()=>navigate("/details/"+ data.isd)}

//                                 >
//                                   <span
//                                     data-toggle="tooltip"
//                                     data-placement="bottom"
//                                     title="Notify me when one is listed"
//                                   >
//                                     <i className="fa-solid fa-bell"></i>
//                                   </span>
//                                 </button>
//                                 <img src={process.env.REACT_APP_URL + data.stepOneImage} alt="car_01" />
//                               </a>
//                             </div>
//                             <div className="card_postInfo">
//                               <h6>
//                                 <a href="#">
//                                   {data.model}
//                                 </a>
//                               </h6>
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                   </Slider>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//       ) : null}

//       {make.length > 1 ? (
//         <section className="pt_40">
//           <div className="container">
//             <div className="row">
//               <div className="col-12 pb-3">
//                 <h3 className="title_combo">{make[1].make}</h3>
//               </div>

//               <div
//                 style={{ position: "absolute", right: "8%", cursor: "pointer" }}
//               >
//                 <span onClick={() => slide1.current.slickPrev()}>
//                   <span>
//                     <WestIcon />
//                   </span>
//                   <span>Prev</span>
//                 </span>
//                 <span
//                   onClick={() => slide1.current.slickNext()}
//                   style={{ marginLeft: 50 }}
//                 >
//                   <span>Next</span>
//                   <span style={{ height: "100px" }}>
//                     <EastIcon />
//                   </span>
//                 </span>
//               </div>

//               <div className="col-12" style={{ height: "290px" }}>
//                 <div className="makes_Slide arrowTop_Slide">
//                   <Slider ref={slide1} {...settings}>
//                   {data
//                       .filter((filter) => filter.make === make[1].make)
//                       .map((data) => (
//                         <div>
//                           <div className="card_post">
//                             <div className="card_postImg">
//                               <a href="detail">
//                                 <button
//                                   type="button"
//                                   className="watchedIc"
//                                   data-toggle="modal"
//                                   data-target="#loginModal"
//                                 >
//                                   <span
//                                     data-toggle="tooltip"
//                                     data-placement="bottom"
//                                     title="Notify me when one is listed"
//                                   >
//                                     <i className="fa-solid fa-bell"></i>
//                                   </span>
//                                 </button>
//                                 <img src={process.env.REACT_APP_URL + data.stepOneImage} alt="car_01" />
//                               </a>
//                             </div>
//                             <div className="card_postInfo">
//                               <h6>
//                                 <a href="#">
//                                   {data.model}
//                                 </a>
//                               </h6>
//                             </div>
//                           </div>
//                         </div>
//                       ))}

//                   </Slider>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//       ) : null}

//       {make.length > 2 ? (
//         <section className="pt_40">
//           <div className="container">
//             <div className="row">
//               <div className="col-12 pb-3">
//                 <h3 className="title_combo">{make[2].make}</h3>
//               </div>
//               <div
//                 style={{ position: "absolute", right: "8%", cursor: "pointer" }}
//               >
//                 <span onClick={() => slide2.current.slickPrev()}>
//                   <span>
//                     <WestIcon />
//                   </span>
//                   <span>Prev</span>
//                 </span>
//                 <span
//                   onClick={() => slide2.current.slickNext()}
//                   style={{ marginLeft: 50 }}
//                 >
//                   <span>Next</span>
//                   <span style={{ height: "100px" }}>
//                     <EastIcon />
//                   </span>
//                 </span>
//               </div>

//               <div className="col-12" style={{ height: "290px" }}>
//                 <div className="makes_Slide arrowTop_Slide">
//                   <Slider ref={slide2} {...settings}>
//                   {data
//                       .filter((filter) => filter.make === make[2].make)
//                       .map((data) => (
//                         <div>
//                           <div className="card_post">
//                             <div className="card_postImg">
//                               <a href="detail">
//                                 <button
//                                   type="button"
//                                   className="watchedIc"
//                                   data-toggle="modal"
//                                   data-target="#loginModal"
//                                 >
//                                   <span
//                                     data-toggle="tooltip"
//                                     data-placement="bottom"
//                                     title="Notify me when one is listed"
//                                   >
//                                     <i className="fa-solid fa-bell"></i>
//                                   </span>
//                                 </button>
//                                 <img src={car_01} alt="car_01" />
//                               </a>
//                             </div>
//                             <div className="card_postInfo">
//                               <h6>
//                                 <a href="#">
//                                   sdafasdfasd 3.5 Litre & 4 1/4 Litre
//                                 </a>
//                               </h6>
//                             </div>
//                           </div>
//                         </div>
//                       ))}

//                   </Slider>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//       ) : null}

//       {make.length > 3 ? (
//         <section className="pt_40">
//           <div className="container">
//             <div className="row">
//               <div className="col-12 pb-3">
//                 <h3 className="title_combo">{make[3].make}</h3>
//               </div>
//               <div
//                 style={{ position: "absolute", right: "8%", cursor: "pointer" }}
//               >
//                 <span onClick={() => slide3.current.slickPrev()}>
//                   <span>
//                     <WestIcon />
//                   </span>
//                   <span>Prev</span>
//                 </span>
//                 <span
//                   onClick={() => slide3.current.slickNext()}
//                   style={{ marginLeft: 50 }}
//                 >
//                   <span>Next</span>
//                   <span style={{ height: "100px" }}>
//                     <EastIcon />
//                   </span>
//                 </span>
//               </div>

//               <div className="col-12" style={{ height: "290px" }}>
//                 <div className="makes_Slide arrowTop_Slide">
//                   <Slider ref={slide3} {...settings}>
//                     {data
//                       .filter((filter) => filter.make === make[3].make)
//                       .map((data) => (
//                         <div>
//                           <div className="card_post">
//                             <div className="card_postImg">
//                               <a href="detail">
//                                 <button
//                                   type="button"
//                                   className="watchedIc"
//                                   data-toggle="modal"
//                                   data-target="#loginModal"
//                                 >
//                                   <span
//                                     data-toggle="tooltip"
//                                     data-placement="bottom"
//                                     title="Notify me when one is listed"
//                                   >
//                                     <i className="fa-solid fa-bell"></i>
//                                   </span>
//                                 </button>
//                                 <img src={car_01} alt="car_01" />
//                               </a>
//                             </div>
//                             <div className="card_postInfo">
//                               <h6>
//                                 <a href="#">
//                                   sdafasdfasd 3.5 Litre & 4 1/4 Litre
//                                 </a>
//                               </h6>
//                             </div>
//                           </div>
//                         </div>
//                       ))}

//                   </Slider>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//       ) : null}
//     </>
//   );
// }

// export default MakeAnModel;

// New Code Added

import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import car_01 from "../../Assets/images/car_01.jpg";
import car_02 from "../../Assets/images/car_02.jpg";
import car_03 from "../../Assets/images/car_03.jpg";
import car_04 from "../../Assets/images/car_04.jpg";

function MakeAnModel() {
  const [search, setSearch] = useState("");
  const [make, setMake] = useState([]);
  const [data, setData] = useState([]);

  const fetchVehiclesApi = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_URL + "vehicles");
      let uniqueObjArray = [
        ...new Map(
          response.data.data.map((item) => [item["make"], item])
        ).values(),
      ];
      console.log("vehicle", uniqueObjArray);
      console.log("total data", response.data.data);
      setMake(uniqueObjArray);
      setData(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchVehiclesApi();
  }, []);
  return (
    <>
      <section className="pt_80 pt_sm_50">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center pb_30">
              <h2 className="title_combo title_Center">
                Makes and Models Directory
              </h2>
            </div>
            <div className="col-12">
              <ul className="postTopOption">
                <li className="post_search">
                  <input
                    type="text"
                    value={search}
                    name="search"
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search for a make or model"
                  />
                </li>
                <li className="">
                  <button
                    type="button"
                    className="gry_btn"
                    data-toggle="modal"
                    data-target="#FiltersModal"
                  >
                    <i className="fa-solid fa-filter mr-2"></i> Filters
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="modal fade" id="FiltersModal">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header border-0">
                  <h4 className="modal-title forg">Filters</h4>
                  <button type="button" className="close" data-dismiss="modal">
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                </div>

                <div className="modal-body">
                  <form>
                    <div className="row row_gap_5">
                      <div className="col-12 col-md-6">
                        <label>Vehicle Year</label>
                        <div className="form-group">
                          <input
                            type="text"
                            name=""
                            className="field"
                            placeholder="1900"
                          />
                        </div>
                      </div>
                      <div className="col-12 col-md-6">
                        <label>To</label>
                        <div className="form-group">
                          <input
                            type="text"
                            name=""
                            className="field"
                            placeholder="2023"
                          />
                        </div>
                      </div>
                      <div className="col-12 col-md-6">
                        <label>List Date</label>
                        <div className="form-group">
                          <select className="field">
                            <option>All Time</option>
                            <option>7 Days</option>
                            <option>Last Month</option>
                            <option>Last Year</option>
                            <option>Last 2 Year</option>
                            <option>Last 5 Year</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-12 col-md-6">
                        <label>Result</label>
                        <div className="form-group">
                          <select className="field">
                            <option>All</option>
                            <option>Sold Only</option>
                            <option>Reserve Not Met</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-12 col-md-6">
                        <label>High Bid</label>
                        <div className="form-group">
                          <select className="field">
                            <option>No Min</option>
                            <option>$5k</option>
                            <option>#10k</option>
                            <option>#15k</option>
                            <option>#20k</option>
                            <option>#25k</option>
                            <option>#30k</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-12 col-md-6">
                        <label>To</label>
                        <div className="form-group">
                          <select className="field">
                            <option>No Max</option>
                            <option>$5k</option>
                            <option>#10k</option>
                            <option>#15k</option>
                            <option>#20k</option>
                            <option>#25k</option>
                            <option>#30k</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-12 col-md-12">
                        <label>Exclude Words / Models / Tags</label>
                        <div className="form-group">
                          <input
                            type="text"
                            name=""
                            className="field"
                            placeholder="Enter"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <button type="button" className="btn">
                        Filters
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {make
        .filter(
          (filt) =>
            filt.name.toLowerCase().includes(search) ||
            filt.name.toUpperCase().includes(search)
        )
        .map((curElem) => {
          return (
            <section key={curElem.id} className="pt_40">
              <div className="container">
                <div className="row">
                  <div className="col-12 pb-3">
                    <h3 className="title_combo">{curElem.name}</h3>
                  </div>

                  <div className="col-12">
                    <div className="makes_Slide arrowTop_Slide">
                      <div>
                        {data
                          .filter((filter) => filter.make === curElem.make)
                          .map((curItem) => {
                            return (
                              <div className="card_post" key={curItem}>
                                <div className="card_postImg">
                                  <button
                                    type="button"
                                    className="watchedIc"
                                    data-toggle="modal"
                                    data-target="#loginModal"
                                  >
                                    <span
                                      data-toggle="tooltip"
                                      data-placement="bottom"
                                      title="Notify me when one is listed"
                                    >
                                      <i className="fa-solid fa-bell"></i>
                                    </span>
                                  </button>
                                 <a href={`detail/${curItem.id}`}>
                                 <img
                                    src={
                                      process.env.REACT_APP_URL +
                                      curItem.stepOneImage
                                    }
                                    alt={curItem.name}
                                  />
                                 </a>
                                </div>
                                <div className="card_postInfo">
                                  <h6>
                                    <a href="#">{curItem.model}</a>
                                  </h6>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                      {/* <div>
                      <div className="card_post">
                        <div className="card_postImg">
                          <button
                            type="button"
                            className="watchedIc"
                            data-toggle="modal"
                            data-target="#loginModal"
                          >
                            <span
                              data-toggle="tooltip"
                              data-placement="bottom"
                              title="Notify me when one is listed"
                            >
                              <i className="fa-solid fa-bell"></i>
                            </span>
                          </button>
                          <img src={car_02} />
                        </div>
                        <div className="card_postInfo">
                          <h6>
                            <a href="#">Acura Integra Type R</a>
                          </h6>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="card_post">
                        <div className="card_postImg">
                          <button
                            type="button"
                            className="watchedIc"
                            data-toggle="modal"
                            data-target="#loginModal"
                          >
                            <span
                              data-toggle="tooltip"
                              data-placement="bottom"
                              title="Notify me when one is listed"
                            >
                              <i className="fa-solid fa-bell"></i>
                            </span>
                          </button>
                          <img src={car_01} alt="car_03" />
                        </div>
                        <div className="card_postInfo">
                          <h6>
                            <a href="#">Acura Legend</a>
                          </h6>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="card_post">
                        <div className="card_postImg">
                          <button
                            type="button"
                            className="watchedIc"
                            data-toggle="modal"
                            data-target="#loginModal"
                          >
                            <span
                              data-toggle="tooltip"
                              data-placement="bottom"
                              title="Notify me when one is listed"
                            >
                              <i className="fa-solid fa-bell"></i>
                            </span>
                          </button>
                          <img src={car_04} alt="car_04" />
                        </div>
                        <div className="card_postInfo">
                          <h6>
                            <a href="#">Acura Legend</a>
                          </h6>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="card_post">
                        <div className="card_postImg">
                          <button
                            type="button"
                            className="watchedIc"
                            data-toggle="modal"
                            data-target="#loginModal"
                          >
                            <span
                              data-toggle="tooltip"
                              data-placement="bottom"
                              title="Notify me when one is listed"
                            >
                              <i className="fa-solid fa-bell"></i>
                            </span>
                          </button>
                          <img src={car_01} alt="car_01" />
                        </div>
                        <div className="card_postInfo">
                          <h6>
                            <a href="#">Acura NSX NA1/NA2</a>
                          </h6>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="card_post">
                        <div className="card_postImg">
                          <button
                            type="button"
                            className="watchedIc"
                            data-toggle="modal"
                            data-target="#loginModal"
                          >
                            <span
                              data-toggle="tooltip"
                              data-placement="bottom"
                              title="Notify me when one is listed"
                            >
                              <i className="fa-solid fa-bell"></i>
                            </span>
                          </button>
                          <img src={car_02} alt="car_02" />
                        </div>
                        <div className="card_postInfo">
                          <h6>
                            <a href="#">Acura NSX NC1</a>
                          </h6>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="card_post">
                        <div className="card_postImg">
                          <button
                            type="button"
                            className="watchedIc"
                            data-toggle="modal"
                            data-target="#loginModal"
                          >
                            <span
                              data-toggle="tooltip"
                              data-placement="bottom"
                              title="Notify me when one is listed"
                            >
                              <i className="fa-solid fa-bell"></i>
                            </span>
                          </button>
                          <img src={car_03} alt="car_03" />
                        </div>
                        <div className="card_postInfo">
                          <h6>
                            <a href="#">Acura RSX</a>
                          </h6>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="card_post">
                        <div className="card_postImg">
                          <button
                            type="button"
                            className="watchedIc"
                            data-toggle="modal"
                            data-target="#loginModal"
                          >
                            <span
                              data-toggle="tooltip"
                              data-placement="bottom"
                              title="Notify me when one is listed"
                            >
                              <i className="fa-solid fa-bell"></i>
                            </span>
                          </button>
                          <img src={car_03} alt="car_03" />
                        </div>
                        <div className="card_postInfo">
                          <h6>
                            <a href="#">Acura RSX</a>
                          </h6>
                        </div>
                      </div>
                    </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          );
        })}

      {/* <section className="pt_40">
        <div className="container">
          <div className="row">
            <div className="col-12 pb-3">
              <h3 className="title_combo">Alfa Romeo</h3>
            </div>

            <div className="col-12">
              <div className="makes_Slide arrowTop_Slide">
                <div>
                  <div className="card_post">
                    <div className="card_postImg">
                      <button
                        type="button"
                        className="watchedIc"
                        data-toggle="modal"
                        data-target="#loginModal"
                      >
                        <span
                          data-toggle="tooltip"
                          data-placement="bottom"
                          title="Notify me when one is listed"
                        >
                          <i className="fa-solid fa-bell"></i>
                        </span>
                      </button>
                      <img src={car_01} alt="car_01" />
                    </div>
                    <div className="card_postInfo">
                      <h6>
                        <a href="#">Alfa Romeo 105 Series Sedan</a>
                      </h6>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="card_post">
                    <div className="card_postImg">
                      <button
                        type="button"
                        className="watchedIc"
                        data-toggle="modal"
                        data-target="#loginModal"
                      >
                        <span
                          data-toggle="tooltip"
                          data-placement="bottom"
                          title="Notify me when one is listed"
                        >
                          <i className="fa-solid fa-bell"></i>
                        </span>
                      </button>
                      <img src={car_02} alt="car_02" />
                    </div>
                    <div className="card_postInfo">
                      <h6>
                        <a href="#">Alfa Romeo 105/115 Series Coupe</a>
                      </h6>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="card_post">
                    <div className="card_postImg">
                      <button
                        type="button"
                        className="watchedIc"
                        data-toggle="modal"
                        data-target="#loginModal"
                      >
                        <span
                          data-toggle="tooltip"
                          data-placement="bottom"
                          title="Notify me when one is listed"
                        >
                          <i className="fa-solid fa-bell"></i>
                        </span>
                      </button>
                      <img src={car_03} alt="car_03" />
                    </div>
                    <div className="card_postInfo">
                      <h6>
                        <a href="#">Alfa Romeo 105/115 Series Spider</a>
                      </h6>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="card_post">
                    <div className="card_postImg">
                      <button
                        type="button"
                        className="watchedIc"
                        data-toggle="modal"
                        data-target="#loginModal"
                      >
                        <span
                          data-toggle="tooltip"
                          data-placement="bottom"
                          title="Notify me when one is listed"
                        >
                          <i className="fa-solid fa-bell"></i>
                        </span>
                      </button>
                      <img src={car_04} alt="car_04" />
                    </div>
                    <div className="card_postInfo">
                      <h6>
                        <a href="#">Alfa Romeo 164</a>
                      </h6>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="card_post">
                    <div className="card_postImg">
                      <button
                        type="button"
                        className="watchedIc"
                        data-toggle="modal"
                        data-target="#loginModal"
                      >
                        <span
                          data-toggle="tooltip"
                          data-placement="bottom"
                          title="Notify me when one is listed"
                        >
                          <i className="fa-solid fa-bell"></i>
                        </span>
                      </button>
                      <img src={car_01} alt="car_01" />
                    </div>
                    <div className="card_postInfo">
                      <h6>
                        <a href="#">Alfa Romeo 4C</a>
                      </h6>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="card_post">
                    <div className="card_postImg">
                      <button
                        type="button"
                        className="watchedIc"
                        data-toggle="modal"
                        data-target="#loginModal"
                      >
                        <span
                          data-toggle="tooltip"
                          data-placement="bottom"
                          title="Notify me when one is listed"
                        >
                          <i className="fa-solid fa-bell"></i>
                        </span>
                      </button>
                      <img src={car_02} alt="car_02" />
                    </div>
                    <div className="card_postInfo">
                      <h6>
                        <a href="#">Alfa Romeo 75/Milano</a>
                      </h6>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="card_post">
                    <div className="card_postImg">
                      <button
                        type="button"
                        className="watchedIc"
                        data-toggle="modal"
                        data-target="#loginModal"
                      >
                        <span
                          data-toggle="tooltip"
                          data-placement="bottom"
                          title="Notify me when one is listed"
                        >
                          <i className="fa-solid fa-bell"></i>
                        </span>
                      </button>
                      <img src={car_03} alt="car_03" />
                    </div>
                    <div className="card_postInfo">
                      <h6>
                        <a href="#">Alfa Romeo 8C</a>
                      </h6>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="card_post">
                    <div className="card_postImg">
                      <button
                        type="button"
                        className="watchedIc"
                        data-toggle="modal"
                        data-target="#loginModal"
                      >
                        <span
                          data-toggle="tooltip"
                          data-placement="bottom"
                          title="Notify me when one is listed"
                        >
                          <i className="fa-solid fa-bell"></i>
                        </span>
                      </button>
                      <img src={car_03} alt="car_03" />
                    </div>
                    <div className="card_postInfo">
                      <h6>
                        <a href="#">Alfa Romeo 8C</a>
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pt_40">
        <div className="container">
          <div className="row">
            <div className="col-12 pb-3">
              <h3 className="title_combo">AMC</h3>
            </div>

            <div className="col-12">
              <div className="makes_Slide arrowTop_Slide">
                <div>
                  <div className="card_post">
                    <div className="card_postImg">
                      <button
                        type="button"
                        className="watchedIc"
                        data-toggle="modal"
                        data-target="#loginModal"
                      >
                        <span
                          data-toggle="tooltip"
                          data-placement="bottom"
                          title="Notify me when one is listed"
                        >
                          <i className="fa-solid fa-bell"></i>
                        </span>
                      </button>
                      <img src={car_01} alt="car_01" />
                    </div>
                    <div className="card_postInfo">
                      <h6>
                        <a href="#">AMC AMX</a>
                      </h6>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="card_post">
                    <div className="card_postImg">
                      <button
                        type="button"
                        className="watchedIc"
                        data-toggle="modal"
                        data-target="#loginModal"
                      >
                        <span
                          data-toggle="tooltip"
                          data-placement="bottom"
                          title="Notify me when one is listed"
                        >
                          <i className="fa-solid fa-bell"></i>
                        </span>
                      </button>
                      <img src={car_02} alt="car_02" />
                    </div>
                    <div className="card_postInfo">
                      <h6>
                        <a href="#">AMC Gremlin</a>
                      </h6>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="card_post">
                    <div className="card_postImg">
                      <button
                        type="button"
                        className="watchedIc"
                        data-toggle="modal"
                        data-target="#loginModal"
                      >
                        <span
                          data-toggle="tooltip"
                          data-placement="bottom"
                          title="Notify me when one is listed"
                        >
                          <i className="fa-solid fa-bell"></i>
                        </span>
                      </button>
                      <img src={car_03} alt="car_03" />
                    </div>
                    <div className="card_postInfo">
                      <h6>
                        <a href="#">AMC Javelin</a>
                      </h6>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="card_post">
                    <div className="card_postImg">
                      <button
                        type="button"
                        className="watchedIc"
                        data-toggle="modal"
                        data-target="#loginModal"
                      >
                        <span
                          data-toggle="tooltip"
                          data-placement="bottom"
                          title="Notify me when one is listed"
                        >
                          <i className="fa-solid fa-bell"></i>
                        </span>
                      </button>
                      <img src={car_04} alt="car_04" />
                    </div>
                    <div className="card_postInfo">
                      <h6>
                        <a href="#">AMC Pacer</a>
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pt_40">
        <div className="container">
          <div className="row">
            <div className="col-12 pb-3">
              <h3 className="title_combo">Bentley</h3>
            </div>

            <div className="col-12">
              <div className="makes_Slide arrowTop_Slide">
                <div>
                  <div className="card_post">
                    <div className="card_postImg">
                      <button
                        type="button"
                        className="watchedIc"
                        data-toggle="modal"
                        data-target="#loginModal"
                      >
                        <span
                          data-toggle="tooltip"
                          data-placement="bottom"
                          title="Notify me when one is listed"
                        >
                          <i className="fa-solid fa-bell"></i>
                        </span>
                      </button>
                      <img src={car_01} alt="car_01" />
                    </div>
                    <div className="card_postInfo">
                      <h6>
                        <a href="#">Bentley 3.5 Litre & 4 1/4 Litre</a>
                      </h6>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="card_post">
                    <div className="card_postImg">
                      <button
                        type="button"
                        className="watchedIc"
                        data-toggle="modal"
                        data-target="#loginModal"
                      >
                        <span
                          data-toggle="tooltip"
                          data-placement="bottom"
                          title="Notify me when one is listed"
                        >
                          <i className="fa-solid fa-bell"></i>
                        </span>
                      </button>
                      <img src={car_02} alt="car_02" />
                    </div>
                    <div className="card_postInfo">
                      <h6>
                        <a href="#">Bentley Arnage</a>
                      </h6>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="card_post">
                    <div className="card_postImg">
                      <button
                        type="button"
                        className="watchedIc"
                        data-toggle="modal"
                        data-target="#loginModal"
                      >
                        <span
                          data-toggle="tooltip"
                          data-placement="bottom"
                          title="Notify me when one is listed"
                        >
                          <i className="fa-solid fa-bell"></i>
                        </span>
                      </button>
                      <img src={car_03} alt="car_03" />
                    </div>
                    <div className="card_postInfo">
                      <h6>
                        <a href="#">Bentley Azure</a>
                      </h6>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="card_post">
                    <div className="card_postImg">
                      <button
                        type="button"
                        className="watchedIc"
                        data-toggle="modal"
                        data-target="#loginModal"
                      >
                        <span
                          data-toggle="tooltip"
                          data-placement="bottom"
                          title="Notify me when one is listed"
                        >
                          <i className="fa-solid fa-bell"></i>
                        </span>
                      </button>
                      <img src={car_04} alt="car_04" />
                    </div>
                    <div className="card_postInfo">
                      <h6>
                        <a href="#">Bentley Continental Flying Spur</a>
                      </h6>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="card_post">
                    <div className="card_postImg">
                      <button
                        type="button"
                        className="watchedIc"
                        data-toggle="modal"
                        data-target="#loginModal"
                      >
                        <span
                          data-toggle="tooltip"
                          data-placement="bottom"
                          title="Notify me when one is listed"
                        >
                          <i className="fa-solid fa-bell"></i>
                        </span>
                      </button>
                      <img src={car_01} alt="car_01" />
                    </div>
                    <div className="card_postInfo">
                      <h6>
                        <a href="#">Bentley Continental GT</a>
                      </h6>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="card_post">
                    <div className="card_postImg">
                      <button
                        type="button"
                        className="watchedIc"
                        data-toggle="modal"
                        data-target="#loginModal"
                      >
                        <span
                          data-toggle="tooltip"
                          data-placement="bottom"
                          title="Notify me when one is listed"
                        >
                          <i className="fa-solid fa-bell"></i>
                        </span>
                      </button>
                      <img src={car_04} alt="car_04" />
                    </div>
                    <div className="card_postInfo">
                      <h6>
                        <a href="#">Bentley Mark VI</a>
                      </h6>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="card_post">
                    <div className="card_postImg">
                      <button
                        type="button"
                        className="watchedIc"
                        data-toggle="modal"
                        data-target="#loginModal"
                      >
                        <span
                          data-toggle="tooltip"
                          data-placement="bottom"
                          title="Notify me when one is listed"
                        >
                          <i className="fa-solid fa-bell"></i>
                        </span>
                      </button>
                      <img src={car_03} alt="car_03" />
                    </div>
                    <div className="card_postInfo">
                      <h6>
                        <a href="#">Bentley S-Type</a>
                      </h6>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="card_post">
                    <div className="card_postImg">
                      <button
                        type="button"
                        className="watchedIc"
                        data-toggle="modal"
                        data-target="#loginModal"
                      >
                        <span
                          data-toggle="tooltip"
                          data-placement="bottom"
                          title="Notify me when one is listed"
                        >
                          <i className="fa-solid fa-bell"></i>
                        </span>
                      </button>
                      <img src={car_04} alt="car_04" />
                    </div>
                    <div className="card_postInfo">
                      <h6>
                        <a href="#">Bentley SZ Coupe</a>
                      </h6>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="card_post">
                    <div className="card_postImg">
                      <button
                        type="button"
                        className="watchedIc"
                        data-toggle="modal"
                        data-target="#loginModal"
                      >
                        <span
                          data-toggle="tooltip"
                          data-placement="bottom"
                          title="Notify me when one is listed"
                        >
                          <i className="fa-solid fa-bell"></i>
                        </span>
                      </button>
                      <img src={car_03} alt="car_03" />
                    </div>
                    <div className="card_postInfo">
                      <h6>
                        <a href="#">Bentley SZ Saloon</a>
                      </h6>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="card_post">
                    <div className="card_postImg">
                      <button
                        type="button"
                        className="watchedIc"
                        data-toggle="modal"
                        data-target="#loginModal"
                      >
                        <span
                          data-toggle="tooltip"
                          data-placement="bottom"
                          title="Notify me when one is listed"
                        >
                          <i className="fa-solid fa-bell"></i>
                        </span>
                      </button>
                      <img src={car_03} alt="car_03" />
                    </div>
                    <div className="card_postInfo">
                      <h6>
                        <a href="#">Bentley SZ Saloon</a>
                      </h6>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="card_post">
                    <div className="card_postImg">
                      <button
                        type="button"
                        className="watchedIc"
                        data-toggle="modal"
                        data-target="#loginModal"
                      >
                        <span
                          data-toggle="tooltip"
                          data-placement="bottom"
                          title="Notify me when one is listed"
                        >
                          <i className="fa-solid fa-bell"></i>
                        </span>
                      </button>
                      <img src={car_03} alt="car_03" />
                    </div>
                    <div className="card_postInfo">
                      <h6>
                        <a href="#">Bentley SZ Saloon</a>
                      </h6>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="card_post">
                    <div className="card_postImg">
                      <button
                        type="button"
                        className="watchedIc"
                        data-toggle="modal"
                        data-target="#loginModal"
                      >
                        <span
                          data-toggle="tooltip"
                          data-placement="bottom"
                          title="Notify me when one is listed"
                        >
                          <i className="fa-solid fa-bell"></i>
                        </span>
                      </button>
                      <img src={car_03} alt="car_03" />
                    </div>
                    <div className="card_postInfo">
                      <h6>
                        <a href="#">Bentley SZ Saloon</a>
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
    </>
  );
}

export default MakeAnModel;
