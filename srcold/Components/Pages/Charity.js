import React from 'react'
import icGrid from '../../Assets/images/icGrid.svg'
import img_01 from '../../Assets/images/img_01.jpg'
import img_02 from '../../Assets/images/img_02.jpg'
import img_03 from '../../Assets/images/img_03.jpg'
import img_04 from '../../Assets/images/img_04.jpg'
import img_05 from '../../Assets/images/img_05.jpg'
import img_06 from '../../Assets/images/img_06.jpg'
function Charity() {
  return (
    <div>
        <section className="ptb_80 pt_sm_50">
            <div className="container">
                <div className="row">
                    <div className="col-12 text-center pb_30">
                        <h2 className="title_combo title_Center">Charity Auctions <span>710 AUCTIONS NOW LIVE</span></h2>
                    </div>
                    <div className="col-12">
                        <ul className="postTopOption">
                            <li className="post_search">
                                <input type="text" name="" placeholder="Filter auctions for make, model, category…"/>
                            </li>
                            <li className="">
                                <button type="button" className="gry_btn"><i className="fa-solid fa-heart mr-2"></i> Watched</button>
                            </li>
                            <li className="d-flex">
                                <button type="button" className="gry_btn gridView active"><img src={icGrid}/></button>
                                <button type="button" className="gry_btn listView"><i className="fa-sharp fa-solid fa-list"></i></button>
                            </li>
                            <li className="">
                                <select className="post_select">
                                    <option>Ending Soonest</option>
                                    <option>Bid: Low to High</option>
                                    <option>Bid: High to Low</option>
                                    <option>Ending Latest</option>
                                    <option>Closest to postal code...</option>
                                </select>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="row pt-4 row_gridList">
                    <div className="col-12 col-md-6 pb-3">
                        <div className="card_post">
                            <div className="card_postImg">
                                <button type="button" className="watchedIc"><i className="fa-solid fa-heart"></i></button>
                                <img src={img_01}/>
                            </div>
                            <div className="card_postInfo">
                                <h4><a href="detail.html">12k-Mile 2009 Aston Martin DBS 6-Speed</a></h4>
                                <p>This 2009 Aston Martin DBS is finished in Casino Royale Metallic over a black leather and Alcantara interior and is powered by a 5.9-liter V12 mated to a six-speed manual transaxle and a limited-slip differential. Additional equipment includes front and rear parking sensors, 20” alloy wheels, carbon-ceramic brakes…</p>
                                <ul className="labelList">
                                    <li><label>Current Bid:</label> <span>$126,888</span></li>
                                    <li><label>Ends In:</label> <span>5 days</span></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 pb-3">
                        <div className="card_post">
                            <div className="card_postImg">
                                <button type="button" className="watchedIc"><i className="fa-solid fa-heart"></i></button>
                                <img src={img_02}/>
                            </div>
                            <div className="card_postInfo">
                                <h4><a href="detail.html">12k-Mile 2009 Aston Martin DBS 6-Speed</a></h4>
                                <p>This 2009 Aston Martin DBS is finished in Casino Royale Metallic over a black leather and Alcantara interior and is powered by a 5.9-liter V12 mated to a six-speed manual transaxle and a limited-slip differential. Additional equipment includes front and rear parking sensors, 20” alloy wheels, carbon-ceramic brakes…</p>
                                <ul className="labelList">
                                    <li><label>Current Bid:</label> <span>$126,888</span></li>
                                    <li><label>Ends In:</label> <span>5 days</span></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 pb-3">
                        <div className="card_post">
                            <div className="card_postImg">
                                <button type="button" className="watchedIc"><i className="fa-solid fa-heart"></i></button>
                                <img src={img_03}/>
                            </div>
                            <div className="card_postInfo">
                                <h4><a href="detail.html">12k-Mile 2009 Aston Martin DBS 6-Speed</a></h4>
                                <p>This 2009 Aston Martin DBS is finished in Casino Royale Metallic over a black leather and Alcantara interior and is powered by a 5.9-liter V12 mated to a six-speed manual transaxle and a limited-slip differential. Additional equipment includes front and rear parking sensors, 20” alloy wheels, carbon-ceramic brakes…</p>
                                <ul className="labelList">
                                    <li><label>Current Bid:</label> <span>$126,888</span></li>
                                    <li><label>Ends In:</label> <span>5 days</span></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 pb-3">
                        <div className="card_post">
                            <div className="card_postImg">
                                <button type="button" className="watchedIc"><i className="fa-solid fa-heart"></i></button>
                                <img src={img_04}/>
                            </div>
                            <div className="card_postInfo">
                                <h4><a href="detail.html">12k-Mile 2009 Aston Martin DBS 6-Speed</a></h4>
                                <p>This 2009 Aston Martin DBS is finished in Casino Royale Metallic over a black leather and Alcantara interior and is powered by a 5.9-liter V12 mated to a six-speed manual transaxle and a limited-slip differential. Additional equipment includes front and rear parking sensors, 20” alloy wheels, carbon-ceramic brakes…</p>
                                <ul className="labelList">
                                    <li><label>Current Bid:</label> <span>$126,888</span></li>
                                    <li><label>Ends In:</label> <span>5 days</span></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 pb-3">
                        <div className="card_post">
                            <div className="card_postImg">
                                <button type="button" className="watchedIc"><i className="fa-solid fa-heart"></i></button>
                                <img src={img_05}/>
                            </div>
                            <div className="card_postInfo">
                                <h4><a href="detail.html">12k-Mile 2009 Aston Martin DBS 6-Speed</a></h4>
                                <p>This 2009 Aston Martin DBS is finished in Casino Royale Metallic over a black leather and Alcantara interior and is powered by a 5.9-liter V12 mated to a six-speed manual transaxle and a limited-slip differential. Additional equipment includes front and rear parking sensors, 20” alloy wheels, carbon-ceramic brakes…</p>
                                <ul className="labelList">
                                    <li><label>Current Bid:</label> <span>$126,888</span></li>
                                    <li><label>Ends In:</label> <span>5 days</span></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 pb-3">
                        <div className="card_post">
                            <div className="card_postImg">
                                <button type="button" className="watchedIc"><i className="fa-solid fa-heart"></i></button>
                                <img src={img_06}/>
                            </div>
                            <div className="card_postInfo">
                                <h4><a href="detail.html">12k-Mile 2009 Aston Martin DBS 6-Speed</a></h4>
                                <p>This 2009 Aston Martin DBS is finished in Casino Royale Metallic over a black leather and Alcantara interior and is powered by a 5.9-liter V12 mated to a six-speed manual transaxle and a limited-slip differential. Additional equipment includes front and rear parking sensors, 20” alloy wheels, carbon-ceramic brakes…</p>
                                <ul className="labelList">
                                    <li><label>Current Bid:</label> <span>$126,888</span></li>
                                    <li><label>Ends In:</label> <span>5 days</span></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
  )
}

export default Charity