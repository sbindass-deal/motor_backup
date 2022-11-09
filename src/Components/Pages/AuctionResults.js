import React from 'react'
import axios from 'axios'
import icGrid from '../../Assets/images/icGrid.svg'
import img_01 from '../../Assets/images/img_01.jpg'

function AuctionResults() {

    const [auctions ,setauctions ] = React.useState([])

    React.useEffect(()=>{
    
        axios.get(process.env.REACT_APP_URL + 'vehicles')
        .then((response)=>{
            setauctions(response.data.data)
        })
    },[])
  return (
    <div>
        <section className="howItWorkSection d-flex align-items-center">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-lg-8 offset-lg-2">
                        <div className="heroText">
                            <h2 className="title_combo title_Center">Auction Results <span>View 89,646 Completed Auctions</span></h2>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section className="ptb_80 pt-4 pb-5">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <ul className="postTopOption">
                            <li className="post_search">
                                <input type="text" name="" placeholder="Filter auctions for make, model, category…"/>
                            </li>
                            <li className="">
                                <button type="button" className="gry_btn"><i className="fa-solid fa-star mr-2"></i> Watched</button>
                            </li>
                            <li className="d-flex">
                                <button type="button" className="gry_btn gridView active"><img src={icGrid} alt=""/></button>
                                <button type="button" className="gry_btn listView"><i className="fa-sharp fa-solid fa-list"></i></button>
                            </li>
                            <li className="">
                                <select className="post_select">
                                    <option value="td">Recently Closed</option>
                                    <option value="vd">Popular</option>
                                    <option value="bd">Highest Bid</option>
                                    <option value="ta">Oldest</option>
                                </select>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="row pt-4 row_gridList">
                    
                    {
                        auctions.filter(data=> data.done === 0).map(data=>(<div className="col-12 col-md-6 col-lg-4 pb-3">
                        <div className="card_post">
                            <div className="card_postImg">
                                <div className="card_postImg_labe">Popular</div>
                                <button type="button" className="watchedIc"><i className="fa-solid fa-star"></i></button>
                                <img src={img_01} alt=""/>
                            </div>
                            <div className="card_postInfo">
                                <h4><a href="detail.html">{data.name}</a></h4>
                                <ul className="labelList priceDateList">
                                    <li className="price__"><span>$126,888</span></li>
                                    <li className="Date__"><label><i className="fa-solid fa-clock"></i></label> <span>5 days</span></li>
                                </ul>
                            </div>
                        </div>
                    </div>))
                    }
                </div>
            </div>
        </section>
    </div>
  )
}

export default AuctionResults