import React from 'react'
import car_01 from '../../Assets/images/car_01.jpg'
import car_02 from '../../Assets/images/car_02.jpg'
import car_03 from '../../Assets/images/car_03.jpg'
import car_04 from '../../Assets/images/car_04.jpg'

function Store() {
  return (
    <div>
        <section className="storeHeroSection d-flex align-items-center">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-lg-8 offset-lg-2">
                        <div className="heroText">
                            <h1>We have over 20 stores around the UK</h1>
                            <a href="#" className="btn">VIEW INVENTORY</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section className="pt_80 pt_sm_50">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <ul className="postTopOption">
                            <li className="post_search">
                                <input type="text" name="" placeholder="Search for a make or model"/>
                            </li>
                            <li className="">
                                <button type="button" className="gry_btn" data-toggle="modal" data-target="#FiltersModal"><i className="fa-solid fa-filter mr-2"></i> Filters</button>
                            </li>
                            <li className="">
                                <select className="post_select">
                                    <option>Recently Closed</option>
                                    <option>Popular</option>
                                    <option>Highest Bid</option>
                                    <option>Oldest</option>
                                </select>
                            </li>
                        </ul>
                    </div>
                </div>


        <div className="modal fade" id="FiltersModal">
        <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">

            <div className="modal-header border-0">
                <h4 className="modal-title">Filters</h4>
                <button type="button" className="close" data-dismiss="modal"><i className="fa-solid fa-xmark"></i></button>
            </div>

           
            <div className="modal-body">
                
                <form>
                    <div className="row row_gap_5">
                        <div className="col-12 col-md-6">
                            <label>Vehicle Year</label>
                            <div className="form-group">
                                <input type="text" name="" className="field" placeholder="1900"/>
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <label>To</label>
                            <div className="form-group">
                                <input type="text" name="" className="field" placeholder="2023"/>
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
                                <input type="text" name="" className="field" placeholder="Enter"/>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <button type="button" className="btn">Filters</button>
                    </div>
                </form>
            </div>
            </div>
        </div>
        </div>

            </div>
        </section>

        <section className="pt_40">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-6 col-lg-4">
                        <div className="card_post">
                            <a href="#" className="card_postImg card_postImg_200">
                                <img src={car_01}/>
                            </a>
                            <div className="card_postInfo pt-3">
                                <h6><a href="#">1967 Amphicar Model 770</a></h6>
                                <ul className="priceDateList">
                                    <li className="price__">$9,999</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4">
                        <div className="card_post">
                            <a href="#" className="card_postImg card_postImg_200">
                                <img src={car_02} />
                            </a>
                            <div className="card_postInfo pt-3">
                                <h6><a href="#">1948 Chris-Craft Deluxe Runabout</a></h6>
                                <ul className="priceDateList">
                                    <li className="price__">$10,540</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4">
                        <div className="card_post">
                            <a href="#" className="card_postImg card_postImg_200">
                                <img src={car_03}/>
                            </a>
                            <div className="card_postInfo pt-3">
                                <h6><a href="#">1967 Amphicar Model 770</a></h6>
                                <ul className="priceDateList">
                                    <li className="price__">$9,499</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4">
                        <div className="card_post">
                            <a href="#" className="card_postImg card_postImg_200">
                            <img src={car_04}/>
                            </a>
                            <div className="card_postInfo pt-3">
                                <h6><a href="#">1948 Chris-Craft Deluxe Runabout</a></h6>
                                <ul className="priceDateList">
                                    <li className="price__">$8,889</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4">
                        <div className="card_post">
                            <a href="#" className="card_postImg card_postImg_200">
                            <img src={car_03}/>
                            </a>
                            <div className="card_postInfo pt-3">
                                <h6><a href="#">1967 Amphicar Model 770</a></h6>
                                <ul className="priceDateList">
                                    <li className="price__">$12,100</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4">
                        <div className="card_post">
                            <a href="#" className="card_postImg card_postImg_200">
                            <img src={car_04}/>
                            </a>
                            <div className="card_postInfo pt-3">
                                <h6><a href="#">1948 Chris-Craft Deluxe Runabout</a></h6>
                                <ul className="priceDateList">
                                    <li className="price__">$10,500</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4">
                        <div className="card_post">
                            <a href="#" className="card_postImg card_postImg_200">
                            <img src={car_02}/>
                            </a>
                            <div className="card_postInfo pt-3">
                                <h6><a href="#">1967 Amphicar Model 770</a></h6>
                                <ul className="priceDateList">
                                    <li className="price__">$12,200</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4">
                        <div className="card_post">
                            <a href="#" className="card_postImg card_postImg_200">
                            <img src={car_02}/>
                            </a>
                            <div className="card_postInfo pt-3">
                                <h6><a href="#">1948 Chris-Craft Deluxe Runabout</a></h6>
                                <ul className="priceDateList">
                                    <li className="price__">$14,000</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4">
                        <div className="card_post">
                            <a href="#" className="card_postImg card_postImg_200">
                            <img src={car_01}/>
                            </a>
                            <div className="card_postInfo pt-3">
                                <h6><a href="#">1967 Amphicar Model 770</a></h6>
                                <ul className="priceDateList">
                                    <li className="price__">$22,000</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4">
                        <div className="card_post">
                            <a href="#" className="card_postImg card_postImg_200">
                            <img src={car_04}/>
                            </a>
                            <div className="card_postInfo pt-3">
                                <h6><a href="#">1948 Chris-Craft Deluxe Runabout</a></h6>
                                <ul className="priceDateList">
                                    <li className="price__">$10,250</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4">
                        <div className="card_post">
                            <a href="#" className="card_postImg card_postImg_200">
                            <img src={car_01}/>
                            </a>
                            <div className="card_postInfo pt-3">
                                <h6><a href="#">1967 Amphicar Model 770</a></h6>
                                <ul className="priceDateList">
                                    <li className="price__">$12,140</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4">
                        <div className="card_post">
                            <a href="#" className="card_postImg card_postImg_200">
                            <img src={car_03}/>
                            </a>
                            <div className="card_postInfo pt-3">
                                <h6><a href="#">1948 Chris-Craft Deluxe Runabout</a></h6>
                                <ul className="priceDateList">
                                    <li className="price__">$10,500</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4">
                        <div className="card_post">
                            <a href="#" className="card_postImg card_postImg_200">
                            <img src={car_02}/>
                            </a>
                            <div className="card_postInfo pt-3">
                                <h6><a href="#">1967 Amphicar Model 770</a></h6>
                                <ul className="priceDateList">
                                    <li className="price__">$11,249</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4">
                        <div className="card_post">
                            <a href="#" className="card_postImg card_postImg_200">
                            <img src={car_04}/>
                            </a>
                            <div className="card_postInfo pt-3">
                                <h6><a href="#">1948 Chris-Craft Deluxe Runabout</a></h6>
                                <ul className="priceDateList">
                                    <li className="price__">$9,999</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4">
                        <div className="card_post">
                            <a href="#" className="card_postImg card_postImg_200">
                            <img src={car_02}/>
                            </a>
                            <div className="card_postInfo pt-3">
                                <h6><a href="#">1967 Amphicar Model 770</a></h6>
                                <ul className="priceDateList">
                                    <li className="price__">$8,499</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 text-center">
                        <a href="#" className="btn mt-4">View More</a>
                    </div>
                </div>
            </div>
        </section>
    </div>
  )
}

export default Store