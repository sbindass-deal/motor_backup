import React from 'react'
import tracking_mockup from '../../Assets/images/tracking-mockup.png'
import bListing_Module from '../../Assets/images/bListing-Module.png'
import men_face from '../../Assets/images/men-face.jpg'
import men_face2 from '../../Assets/images/men-face2.webp'
import men_face3 from '../../Assets/images/men-face3.jpg'
import men_face4 from '../../Assets/images/men-face4.jfif'

function Shipping() {
  return (
    <div>
        <section className="ptb_80 pt_sm_50">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-4 col-lg-4">
                        <form className="formCard divSticky">
                            <div className="row">
                                <div className="col-12 pb-3">
                                    <h4>Shipping Calculator</h4>
                                    <p>Enter your information below to get an instant quote.</p>
                                </div>
                            </div>
                            <div className="row row_gap_5">
                                <div className="col-12 col-sm-12 col-md-6">
                                    <div className="form-group">
                                        <input type="text" name="" placeholder="Pickup ZIP" className="field"/>
                                    </div>							
                                </div>
                                <div className="col-12 col-sm-12 col-md-6">
                                    <div className="form-group">
                                        <input type="text" name="" placeholder="Delivery ZIP" className="field"/>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-12 col-md-6">
                                    <div className="form-group">
                                        <input type="text" name="" placeholder="Vehicle Year" className="field"/>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-12 col-md-6">
                                    <div className="form-group">
                                        <input type="text" name="" placeholder="Enter Make" className="field"/>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-12 col-md-12">
                                    <div className="form-group">
                                        <input type="text" name="" placeholder="Enter Model" className="field"/>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-12 col-md-12">
                                    <div className="form-group">
                                        <select className="field">
                                            <option value="">Vehicle Pick an option</option>
                                            <option value="car">Car / Truck</option>
                                            <option value="motorcycle">Motorcycle</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-12 col-md-12">
                                    <div className="form-group">
                                        <select className="field">
                                            <option value="">Operable Pick an option</option>
                                            <option value="Yes">Yes</option>
                                            <option value="No">No</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-12 col-md-12">
                                    <button type="button" className="gry_btn w-full">GET INSTANT QUOTE</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="col-12 col-md-8 col-lg-8">
                        <div className="row">
                            <div className="col-12 col-md-7 ptb_40">
                                <h5>Track your shipment in real time</h5>
                                <p>We’ll send you a map tracking link so you can watch your vehicle travel from the pickup location to its destination in real time.</p> 
                                <br/>
                                <h5>Seamless, secure, fully integrated</h5>
                                <p>Every aspect of Bring a Trailer Shipping is managed through our simple My Shipments page. Whether you’re buying on shibnobi Auctions or shipping a private vehicle, everything—including tracking and payment—is in one place.</p>
                                <br/>
                                <h5>Personal support</h5>
                                <p>Following your order, we will reach out to you to finalize logistics details. We are available via phone or email whenever you need us.</p>
                            </div>
                            <div className="col-12 col-md-5 text-center">
                                <img src={tracking_mockup} />
                            </div>
                        </div>
                        <div className="row ptb_40">
                            <div className="col-12 col-md-5 text-center">
                                <img src={bListing_Module} />
                            </div>
                            <div className="col-12 col-md-7 ptb_40">
                                <h5>The door-to-door vehicle transport solution from Bring a Trailer.</h5>
                                <p>Bring a Trailer Shipping is our fully integrated vehicle transport service, available for both shibnobi Auction listings and (new!) your own private vehicles in the contiguous 48 U.S. states. Whether you’re moving, going to an event, or need a simple solution to ship a vehicle bought elsewhere, we have you covered. Let Bring a Trailer Shipping be your trusted partner for all your vehicle transport needs.</p> 
                                <br/>
                                <h5>Instant quotes</h5>
                                <p>The Shipping Calculator here—or on shibnobi Auction listings—lets you quote instant pricing for shipping a vehicle to your door. The price you see is the price you’ll pay: no fees, no hassles. Pick between fully enclosed transport or open transport at a lower cost (motorcycle shipping is available via enclosed transport only). Won an auction, but didn’t get a quote before your win? No problem. Generate a quote anytime on your My Bids & Wins page.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <hr/>

                <div className="row pt_80">
                            <div className="col-12">
                                <h5>Recent Bring a Trailer Shipping Reviews</h5>
                            </div>
                            <div className="col-12 col-md-6 pt-2">
                                <div className="commentRow">
                                    <div className="commentHead">
                                        <div className="com_byPic">
                                            <img src={men_face}/>
                                        </div>
                                        <div className="com_by">Z32kerber</div>
                                        <div className="com_date"><i className="fa-solid fa-clock mr-1"></i> Sep 23 at 7:31 PM</div>
                                    </div>
                                    <div className="commentBody">
                                        <div className="starReview">
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                        </div>
                                        <p>Amazing car but the drive video was a disappointment.</p>
                                    </div>
                                    <div className="commentFooter">
                                        <a href="#" className="mr-3"><i className="fa-solid fa-thumbs-up"></i> 349</a>
                                        <a href="#" className="mr-3"><i className="fa-solid fa-thumbs-down"></i> 20</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 pt-2">
                                <div className="commentRow">
                                    <div className="commentHead">
                                        <div className="com_byPic">
                                            <img src={men_face2} />
                                        </div>
                                        <div className="com_by">Wolfenhaus</div>
                                        <div className="com_date"><i className="fa-solid fa-clock mr-1"></i> Sep 23 at 7:31 PM</div>
                                    </div>
                                    <div className="commentBody">
                                        <div className="starReview">
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                        </div>
                                        <p>Fastest around the track bragging rights means something…and it’s name is Senna.</p>
                                    </div>
                                    <div className="commentFooter">
                                        <a href="#" className="mr-3"><i className="fa-solid fa-thumbs-up"></i> 349</a>
                                        <a href="#" className="mr-3"><i className="fa-solid fa-thumbs-down"></i> 20</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 pt-2">
                                <div className="commentRow">
                                    <div className="commentHead">
                                        <div className="com_byPic">
                                            <img src={men_face3} />
                                        </div>
                                        <div className="com_by">NobleMotorGroup</div>
                                        <div className="com_date"><i className="fa-solid fa-clock mr-1"></i> Sep 23 at 7:31 PM</div>
                                    </div>
                                    <div className="commentBody">
                                        <div className="starReview">
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                        </div>
                                        <p>I’ve sold this car a couple times. It’s an amazing, beautiful spec. Whoever ends up with it will be immensely happy. Good luck bidders!</p>
                                    </div>
                                    <div className="commentFooter">
                                        <a href="#" className="mr-3"><i className="fa-solid fa-thumbs-up"></i> 349</a>
                                        <a href="#" className="mr-3"><i className="fa-solid fa-thumbs-down"></i> 20</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 pt-2">
                                <div className="commentRow">
                                    <div className="commentHead">
                                        <div className="com_byPic">
                                            <img src={men_face4} />
                                        </div>
                                        <div className="com_by">DaveBrewer</div>
                                        <div className="com_date"><i className="fa-solid fa-clock mr-1"></i> Sep 23 at 7:31 PM</div>
                                    </div>
                                    <div className="commentBody">
                                        <div className="starReview">
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                        </div>
                                        <p>Dang, and to think I was scared to list my Mustang “No Reserve”…</p>
                                    </div>
                                    <div className="commentFooter">
                                        <a href="#" className="mr-3"><i className="fa-solid fa-thumbs-up"></i> 349</a>
                                        <a href="#" className="mr-3"><i className="fa-solid fa-thumbs-down"></i> 20</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 pt-4">
                                    <button type="button" className="gry_btn">Read More</button>
                            </div>
                            </div>
            </div>
                
            
        </section>
    </div>
  )
}

export default Shipping