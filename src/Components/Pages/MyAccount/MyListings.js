import React from 'react'
import MyAccountLeftNav from './MyAccountLeftNav'


function MyListings() {
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
                        <h5>Interested in selling your vehicle on Bring a Trailer?</h5>
                        <p>Bring a Trailer has three ways to sell a vehicle.</p>
                        <ul className="labelList_">
                            <li>
                                <div className="labelList_label">classNameic</div>
                                <div className="labelList_text">Our tried and true listing service for $99.</div>
                            </li>
                            <li>
                                <div className="labelList_label">Plus</div>
                                <div className="labelList_text">An at-your-door vehicle photography shoot added to your classNameic listing.</div>
                            </li>
                            <li>
                                <div className="labelList_label">White Glove</div>
                                <div className="labelList_text">For significant cars and collections, give us a call and we'll handle the rest.</div>
                            </li>
                        </ul>
                        <a href="submit" className="gry_btn mt-3">START A VEHICLE SUBMISSION</a>
                        
                        <div className="card_Gray mt-5 pt-5 pb-5 text-center">
                            <h4>Have a part, engine, or automobilia to sell? Just $99 to list.</h4>
                            <a href="submit" className="gry_btn mt-3">START A PART SUBMISSION</a>
                        </div>

                    </div>
                </div>
            </div>
        </section>
        
    </div>
  )
}

export default MyListings