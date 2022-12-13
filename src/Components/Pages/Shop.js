import React from 'react'
import img_01 from '../../Assets/images/img-1.jpg'
import img_02 from '../../Assets/images/img-2.webp'
import img_03 from '../../Assets/images/img-3.webp'
import img_04 from '../../Assets/images/img-4.png'
import img_05 from '../../Assets/images/img-5.png'
import img_06 from '../../Assets/images/img-6.webp'


import smoters_icon from '../../Assets/images/smoters-icon.png'
function Shop() {
  return (
    <>
    <section class="shopHeroSection d-flex align-items-center">
        <div class="container">
            <div class="row">
                <div class="col-12 col-lg-8 offset-lg-2">
                    <div class="heroText shop">
                        <img src={smoters_icon}/>
                        <h1>Gas Guzzlrs <span>STORE</span></h1>

                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="pt_80 pt_sm_50">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <ul class="postTopOption">
                        <li class="post_search">
                            <input type="text" name="" placeholder="Search for a make or model"/>
                        </li>
                        <li class="">
                            <button type="button" class="gry_btn" data-toggle="modal" data-target="#FiltersModal"><i class="fa-solid fa-filter mr-2"></i> Filters</button>
                        </li>
                        <li class="">
                            <select class="post_select">
                                <option>Recently Closed</option>
                                <option>Popular</option>
                                <option>Highest Bid</option>
                                <option>Oldest</option>
                            </select>
                        </li>
                    </ul>
                </div>
            </div>

    {/* <!-- The FiltersModal --> */}
    <div class="modal fade" id="FiltersModal">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">

        {/* <!-- Modal Header --> */}
        <div class="modal-header border-0">
            <h4 class="modal-title">Filters</h4>
            <button type="button" class="close" data-dismiss="modal"><i class="fa-solid fa-xmark"></i></button>
        </div>

        {/* <!-- Modal body --> */}
        <div class="modal-body">
            
            <form>
                <div class="row row_gap_5">
                    <div class="col-12 col-md-6">
                        <label>Vehicle Year</label>
                        <div class="form-group">
                            <input type="text" name="" class="field" placeholder="1900"/>
                        </div>
                    </div>
                    <div class="col-12 col-md-6">
                        <label>To</label>
                        <div class="form-group">
                            <input type="text" name="" class="field" placeholder="2023"/>
                        </div>
                    </div>
                    <div class="col-12 col-md-6">
                        <label>List Date</label>
                        <div class="form-group">
                            <select class="field">
                                <option>All Time</option>
                                <option>7 Days</option>
                                <option>Last Month</option>
                                <option>Last Year</option>
                                <option>Last 2 Year</option>
                                <option>Last 5 Year</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-12 col-md-6">
                        <label>Result</label>
                        <div class="form-group">
                            <select class="field">
                                <option>All</option>
                                <option>Sold Only</option>
                                <option>Reserve Not Met</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-12 col-md-6">
                        <label>High Bid</label>
                        <div class="form-group">
                            <select class="field">
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
                    <div class="col-12 col-md-6">
                        <label>To</label>
                        <div class="form-group">
                            <select class="field">
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
                    <div class="col-12 col-md-12">
                        <label>Exclude Words / Models / Tags</label>
                        <div class="form-group">
                            <input type="text" name="" class="field" placeholder="Enter"/>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <button type="button" class="btn">Filters</button>
                </div>
            </form>
        </div>
        </div>
    </div>
    </div>

        </div>
    </section>

    <section class="pt_40 shopPg">
        <div class="container">
            <div class="row">
                <div class="col-12 col-md-6 col-lg-4">
                    <div class="card_post">
                        <a href="#" class="card_postImg card_postImg_200">
                            <img src={img_01}/>
                        </a>
                        <div class="card_postInfo pt-3">
                            <h6><a href="#">Womens Gas Guzzlrs T Shirt</a></h6>
                            <ul class="priceDateList">
                                <li class="price__">$24.99</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-md-6 col-lg-4">
                    <div class="card_post">
                        <a href="#" class="card_postImg card_postImg_200">
                            <img src={img_02}/>
                        </a>
                        <div class="card_postInfo pt-3">
                            <h6><a href="#">Gas Guzzlrs Binary Shirt</a></h6>
                            <ul class="priceDateList">
                                <li class="price__">$28.99</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-md-6 col-lg-4">
                    <div class="card_post">
                        <a href="#" class="card_postImg card_postImg_200">
                            <img src={img_03}/>
                        </a>
                        <div class="card_postInfo pt-3">
                            <h6><a href="#">Gas Guzzlrs FLEXHAT</a></h6>
                            <ul class="priceDateList">
                                <li class="price__">$29.99</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-md-6 col-lg-4">
                    <div class="card_post">
                        <a href="#" class="card_postImg card_postImg_200">
                            <img src={img_04}/>
                        </a>
                        <div class="card_postInfo pt-3">
                            <h6><a href="#">Gas Guzzlrs Coin</a></h6>
                            <ul class="priceDateList">
                                <li class="price__">$15.99</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-md-6 col-lg-4">
                    <div class="card_post">
                        <a href="#" class="card_postImg card_postImg_200">
                            <img src={img_05}/>
                        </a>
                        <div class="card_postInfo pt-3">
                            <h6><a href="#">Gas Guzzlrs Tumbler</a></h6>
                            <ul class="priceDateList">
                                <li class="price__">$31.99</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-md-6 col-lg-4">
                    <div class="card_post">
                        <a href="#" class="card_postImg card_postImg_200">
                            <img src={img_06}/>
                        </a>
                        <div class="card_postInfo pt-3">
                            <h6><a href="#">Golf Towel</a></h6>
                            <ul class="priceDateList">
                                <li class="price__">$19.99</li>
                            </ul>
                        </div>
                    </div>
                </div>
                

                <div class="col-12 text-center">
                    <a href="#" class="btn mt-4">View More</a>
                </div>
            </div>
        </div>
    </section>
    
    </>
  )
}

export default Shop