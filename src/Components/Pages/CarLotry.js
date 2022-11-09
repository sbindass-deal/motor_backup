import React from 'react'
import ads_car from '../../Assets/images/ads_car.png'
import bnb_coin from '../../Assets/images/bnb_coin.svg'
import bi_ticket from '../../Assets/images/bi_ticket.svg'
import bnbCoin from '../../Assets/images/bnb_coin.svg'

function CarRaffle() {
  return (
    <div>
        <section className="ptb_80 pt_sm_50">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-8 col-lg-8">
                        <div className="orangeCard mb-4">
                            <div className="row">
                                <div className="col-12 col-md-7">
                                    <div id="adsSlide" className="carousel slide" data-ride="carousel">
                                    <ul className="carousel-indicators">
                                        <li data-target="#adsSlide" data-slide-to="0" className="active"></li>
                                        <li data-target="#adsSlide" data-slide-to="1"></li>
                                        <li data-target="#adsSlide" data-slide-to="2"></li>
                                    </ul>
                                  
                                    <div className="carousel-inner">
                                        <div className="carousel-item active">
                                        <img src={ads_car} alt="ads car"/>
                                        </div>
                                        <div className="carousel-item">
                                        <img src={ads_car} alt="ads car"/>
                                        </div>
                                        <div className="carousel-item">
                                        <img src={ads_car} alt="ads car"/>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                <div className="col-12 col-md-5">
                                    <div className="">
                                        <h5 className="m-0">Lottery Prize</h5>
                                        <div className="lotteryPriceNumber">
                                           
                                            <div className="price_normal">$40247.13</div>
                                        </div>
                                        <div className="mb-3">
                                            <i className="fa-solid fa-circle-info"></i> Lottery Breakdown
                                        </div>

                                        <div className="counterCol">
                                            <h5>Countdown to the next draw</h5>
                                            <div id="clockdiv">
                                            <div>
                                                <span className="days" id="day">2</span>
                                                <div className="smalltext">Days</div>
                                            </div>
                                            <div>
                                                <span className="hours" id="hour">4</span>
                                                <div className="smalltext">Hours</div>
                                            </div>
                                            <div>
                                                <span className="minutes" id="minute">50</span>
                                                <div className="smalltext">Minutes</div>
                                            </div>
                                            <div>
                                                <span className="seconds" id="second">10</span>
                                                <div className="smalltext">Seconds</div>
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card_Gray2">
                            <div className="row row_gap_5">
                                <div className="col-12 mb-3">
                                    <h5><img src={bnb_coin} className="mr-2"/> Enter Car Lottery</h5>
                                </div>
                                <div className="col-12 col-md-12">
                                    <div className="form-group">
                                        <label>Enter amount</label>
                                        <select className="field">
                                            <option>Enter amount</option>
                                            <option>100</option>
                                            <option>200</option>
                                            <option>300</option>
                                            <option>400</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-12 col-md-12">
                                    <div className="form-group">
                                        <button type="button" className="btn w-full">Enter Lottery</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-4 col-lg-4">
                        <div className="card_Gray2 mt-5 mt-md-0">
                            <div className="">
                                <div className="cardBorder">
                                    <h6>My Tickets</h6>
                                    <div className="myTicketRow">
                                        <div className="myTicketCol">
                                            <div className="MT_ic"><img src={bi_ticket}/></div>
                                            <div className="MT_Count">10</div>
                                            <div className="MT_Price">$3229</div>
                                        </div>
                                        <div className="">1 Ticket = 0.01 BNB</div>
                                    </div>
                                </div>

                               
                                    <h6>My Winnings</h6>
                                    <div className="myTicketCol">
                                        <div className="MT_ic"><img src={bnbCoin.png}/></div>
                                        <div className="MT_Count">1000</div>
                                        <div className="MT_Price">$325,000</div>
                                    </div>
                                    <button type="button" className="gry_btn mt-2">Claim</button>
                             

                               <hr/>

                                <div className="cardBorder">
                                    <h5>Reffer Friend</h5>
                                    <ul className="refferFriendList mt-3">
                                        <li>
                                            <div className="RF_title">Total Refferals</div>
                                            <div className="">5</div>
                                        </li>
                                        <li>
                                            <div className="">Total Earnings (BNB)</div>
                                            <div className="">12</div>
                                        </li>
                                    </ul>
                                    <button type="button" className="gry_btn w-full">Copy Refferal Link</button>
                                    <p className="small mt-2"><i className="fa-solid fa-circle-info"></i> 3% of their purchased amount will go back to you</p>
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

export default CarRaffle