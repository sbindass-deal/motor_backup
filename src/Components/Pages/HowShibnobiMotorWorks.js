import React from 'react'
import ic_01 from '../../Assets/images/ic_01.svg'
import ic_02 from '../../Assets/images/ic_02.svg'
import ic_03 from '../../Assets/images/ic_03.svg'
import ic_04 from '../../Assets/images/ic_04.svg'
import HIW from '../../Assets/images/HIW.jpg'
import HIW3 from '../../Assets/images/HIW3.jpg'
import HIW2 from '../../Assets/images/HIW2.jpg'
import HIW4 from '../../Assets/images/HIW4.jpeg'

function HowShibnobiMotorWorks() {
  return (
    <div>
        <section className="howItWorkSection d-flex align-items-center">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-lg-8 offset-lg-2">
                        <div className="heroText">
                            <h1>How Gas Guzzlrs Works</h1>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section className="pt_80">
            <div className="container">
                <div className="row">
                    <div className="col-12 text-center pb_30">
                        <h2 className="title_combo title_Center">What makes Shibnobi different?</h2>
                    </div>

                    <div className="col-12 col-md-6 col-lg-3 mb-4">
                        <div className="card_ic text-center">
                            <div className="card_icHead"><img src={ic_01} alt="ic_01"/></div>
                            <div className="card_icBody">
                                <h5>We represent each car honestly</h5>
                                <p>with objectively-written listings and comprehensive photo galleries.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-3 mb-4">
                        <div className="card_ic text-center">
                            <div className="card_icHead"><img src={ic_02} alt="ic_02"/></div>
                            <div className="card_icBody">
                                <h5>Each seller is provided</h5>
                                <p>a dedicated point of contact throughout the auction process.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-3 mb-4">
                        <div className="card_ic text-center">
                            <div className="card_icHead"><img src={ic_03} alt="ic_03"/></div>
                            <div className="card_icBody">
                                <h5>Comment threads on each listing</h5>
                                <p>with objectively-written listings and comprehensive photo galleries.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-3 mb-4">
                        <div className="card_ic text-center">
                            <div className="card_icHead"><img src={ic_04} alt="ic_04"/></div>
                            <div className="card_icBody">
                                <h5>Sniping protection extends</h5>
                                <p>with objectively-written listings and comprehensive photo galleries.</p>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </section>

        <section className="ptb_80">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <img src={HIW} alt="HIW"/>
                    </div>
                    <div className="col-12 col-md-6 d-flex align-items-center">
                        <div>
                            <h3>Submitting a Vehicle for Auction</h3>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.</p>
                            <h6>1. classNameic</h6>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                            <hr/>
                            <h6>2. Plus Photography</h6>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                            <hr/>
                            <h6>3. White Glove Service</h6>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                        </div>
                    </div>
                </div>
                <div className="row pt_80">
                    <div className="col-12 col-md-6 order-md-1">
                        <img src={HIW3} alt="HIW3"/>
                    </div>
                    <div className="col-12 col-md-6 order-md-0 d-flex align-items-center">
                        <div>
                            <h3>How our Live Auctions Work</h3>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
                            <ul className="dotList">
                                <li>Lorem Ipsum has been the industry's standard</li> 
                                <li>dummy text ever since the 1500s</li>
                                <li>When an unknown printer took a galley of type</li>
                                <li>Scrambled it to make a type specimen book.</li> 
                                <li>It has survived not only five centuries.</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="row pt_80">
                    <div className="col-12 col-md-6">
                        <img src={HIW4} alt="HIW4"/>
                    </div>
                    <div className="col-12 col-md-6 d-flex align-items-center">
                        <div>
                            <h3>How Bidding Works</h3>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
                            <ul className="dotList">
                                <li>Lorem Ipsum has been the industry's standard</li> 
                                <li>dummy text ever since the 1500s</li>
                                <li>When an unknown printer took a galley of type</li>
                                <li>Scrambled it to make a type specimen book.</li> 
                                <li>It has survived not only five centuries.</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="row pt_80">
                    <div className="col-12 col-md-8 offset-md-2 text-center">
                        <h2>The Submission Process</h2>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
                    </div>
                    <div className="col-12 col-md-12 mt-4">
                        <img src={HIW2} alt="HIW2"/>
                    </div>
                </div>
            </div>
        </section>
    </div>
  )
}

export default HowShibnobiMotorWorks