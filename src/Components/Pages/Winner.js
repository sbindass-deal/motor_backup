import React from 'react'
import winnerTitle from '../../Assets/images/winnerTitle.png'
import men_face2 from '../../Assets/images/men-face2.webp'
function Winner() {
  return (
    <div>
        <section className="ptb_40">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-6 offset-md-3">
                        <div className="card_Gray2 winnerCard">
                            <div className="winnerTitle_img zoom-in-zoom-out"><img src={winnerTitle}/></div>
                            <div className="winnerCol">
                                <div className="winnerTitle">
                                    <h3>Congratulations!</h3>
                                    <p>Leverage agile frameworks to provide a robust synopsis for high level overviews.</p>
                                </div>						
                                <div className="winnerInfo_ pb-3">
                                    <div className="winnerImg_">
                                        <img src={men_face2}/>
                                    </div>
                                    <h6>Nikhil Patil</h6>
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

export default Winner