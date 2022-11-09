import React from 'react'
import car_01 from '../../../Assets/images/car_01.jpg'
import car_02 from '../../../Assets/images/car_02.jpg'
import car_03 from '../../../Assets/images/car_03.jpg'
import car_04 from '../../../Assets/images/car_04.jpg'
import MyAccountLeftNav from './MyAccountLeftNav'

function MyBidsWins() {
  return (
    <div>
        <section className="ptb_80 pt_sm_50">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-4 col-lg-3">
                        <div className="card_Gray mb-5 mb-md-0">
                            <h5>My Account</h5>
                            <hr/>
                           <MyAccountLeftNav/>
                        </div>
                    </div>
                    <div className="col-12 col-md-8 col-lg-9">
                    <div class="FlexCol">
                        <h3>My Bids &amp; Wins</h3>
                        <select class="field">
                            <option>Recent Bid</option>
                            <option>Winner Bid</option>
                        </select>
                    </div>
                        <hr/>

                        <div className="row">
                            <div className="col-12">
                                <div className="bidsListRow">
                                    <div className="bidsImg">
                                        <img src={car_01} alt="car_01"/>
                                    </div>
                                    <div className="bidsInfo">
                                        <div className="">
                                            <h6>2008 BMW M3 Sedan 6-Speed</h6>
                                            <ul className="bidsLabelList">
                                                <li><i className="fa-solid fa-dollar-sign"></i> 15,000</li>
                                                <li><i className="fa-solid fa-calendar-days"></i> 10-10-2022</li>
                                            </ul>
                                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry...</p>
                                        </div>
                                        <div className="pl-md-3">
                                            <a href="#" className="gry_btn"><i className="fa-solid fa-eye mr-2"></i> View</a>
                                        </div>
                                    </div>
                                </div>

                                <div className="bidsListRow">
                                    <div className="bidsImg">
                                        <img src={car_02} alt="car_02"/>
                                    </div>
                                    <div className="bidsInfo">
                                        <div className="">
                                            <h6>2008 BMW M3 Sedan 6-Speed</h6>
                                            <ul className="bidsLabelList">
                                                <li><i className="fa-solid fa-dollar-sign"></i> 15,000</li>
                                                <li><i className="fa-solid fa-calendar-days"></i> 10-10-2022</li>
                                            </ul>
                                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry...</p>
                                        </div>
                                        <div className="pl-md-3">
                                            <a href="#" className="gry_btn"><i className="fa-solid fa-eye mr-2"></i> View</a>
                                        </div>
                                    </div>
                                </div>

                                <div className="bidsListRow">
                                    <div className="bidsImg">
                                    <img src={car_03} alt="car_03"/>
                                    </div>
                                    <div className="bidsInfo">
                                        <div className="">
                                            <h6>2008 BMW M3 Sedan 6-Speed</h6>
                                            <ul className="bidsLabelList">
                                                <li><i className="fa-solid fa-dollar-sign"></i> 15,000</li>
                                                <li><i className="fa-solid fa-calendar-days"></i> 10-10-2022</li>
                                            </ul>
                                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry...</p>
                                        </div>
                                        <div className="pl-md-3">
                                            <a href="#" className="gry_btn"><i className="fa-solid fa-eye mr-2"></i> View</a>
                                        </div>
                                    </div>
                                </div>

                                <div className="bidsListRow">
                                    <div className="bidsImg">
                                    <img src={car_04} alt="car_04"/>
                                    </div>
                                    <div className="bidsInfo">
                                        <div className="">
                                            <h6>2008 BMW M3 Sedan 6-Speed</h6>
                                            <ul className="bidsLabelList">
                                                <li><i className="fa-solid fa-dollar-sign"></i> 15,000</li>
                                                <li><i className="fa-solid fa-calendar-days"></i> 10-10-2022</li>
                                            </ul>
                                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry...</p>
                                        </div>
                                        <div className="pl-md-3">
                                            <a href="#" className="gry_btn"><i className="fa-solid fa-eye mr-2"></i> View</a>
                                        </div>
                                    </div>
                                </div>

                                <div className="bidsListRow">
                                    <div className="bidsImg">
                                    <img src={car_01} alt="car_01"/>
                                    </div>
                                    <div className="bidsInfo">
                                        <div className="">
                                            <h6>2008 BMW M3 Sedan 6-Speed</h6>
                                            <ul className="bidsLabelList">
                                                <li><i className="fa-solid fa-dollar-sign"></i> 15,000</li>
                                                <li><i className="fa-solid fa-calendar-days"></i> 10-10-2022</li>
                                            </ul>
                                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry...</p>
                                        </div>
                                        <div className="pl-md-3">
                                            <a href="#" className="gry_btn"><i className="fa-solid fa-eye mr-2"></i> View</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    </div>
  )
}

export default MyBidsWins