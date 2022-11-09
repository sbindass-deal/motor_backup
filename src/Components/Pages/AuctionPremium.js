import React from 'react'
import img_01 from '../../Assets/images/img_01.jpg'
import axios from 'axios'
function AuctionPremium() {


    const [auctions ,setauctions ] = React.useState([])

    React.useEffect(()=>{
    
        axios.get(process.env.REACT_APP_URL + 'vehicles')
        .then((response)=>{
            setauctions(response.data.data)
        })
    },[])


  return (
    <div>
        <section className="ptb_80 pt_sm_50">
            <div className="container">
                <div className="row">
                    <div className="col-12 text-center pb_30">
                        <h2 className="title_combo title_Center">Premium Listings <span>20 AUCTIONS NOW LIVE</span></h2>
                    </div>
                </div>

                <div className="row pt-4 row_gridList premiumListings">
                    {auctions.filter(data=>data.premium === 0).map((data)=>(<div className="col-12 col-md-6 pb-3">
                        <div className="card_post">
                            <div className="card_postImg">
                                <button type="button" className="watchedIc"><i className="fa-solid fa-star"></i></button>
                                <img src={img_01} alt=""/>
                            </div>
                            <div className="card_postInfo">
                                <h4><a href="detail.html">{data.name}</a></h4>
                                <ul className="labelList">
                                    <li><label>Current Bid:</label> <span>$126,888</span></li>
                                    <li><label>Time Remaining:</label> <span id="demo"></span></li>
                                </ul>
                            </div>
                        </div>
                    </div>))}
                     
                </div>
            </div>
        </section>
    </div>
  )
}

export default AuctionPremium