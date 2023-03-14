import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const EventDetailPage = () => {
    const { id } = useParams()
    const [getEventdata, setGetEventdata]=useState([])
    const handleSubmit = (e) => {
        e.preventDefault()
    }

    useEffect(() => {
        const fetchMeeting = async () => {
            try {
                const res = await axios.get(
                    `${process.env.REACT_APP_URL}getEventBYId/${id}`
                );
                setGetEventdata(res.data.data)
                console.log(56565,res.data.data)
            } catch (err) {
                console.log(err);
            }
        };
        fetchMeeting();
    }, []);


    return (

        <div className="container mt-3">
            <div className="row ">
                <div className="col-md-8">
                    <p>All Event</p>
                    <h1 className='textHeading'>{getEventdata.title }</h1>


                    <p>
                        <img className='img-fluid' src={`https://api.gasguzzlrs.com/upload/event/${getEventdata.image}`} alt="" />
                    </p>

                </div>
            </div>

            <div className="row ">
                <div className="col-md-7">
                    <h3>From the organizer:</h3>
                    {/* <p>The Atlanta SpeedTour at Michelin Raceway Road Atlanta’s world-class, 12-turn, 2.54-mile road circuit offers a full slate of sprint races for all of SVRA’s race groups. A Mazda Miata Heritage Cup Series race has been added to the schedule. The track’s challenging combination of blind corners, fast sweepers, serpentine esses, steep elevation changes, and high-speed straights keeps everyone coming back year after year. The rich history of stock car racing will be showcased with a Stock Car feature.</p> */}
                    <p>{getEventdata.description }</p>

                    {/* <p>
                        Since opening in 1970, the 750-acre Road Atlanta complex has hosted just about every major race series run in the US including Can-Am, Trans-Am, the SCCA National Championships, the American Le Mans Series, and the Tudor United Sports Car Series. Road Atlanta’s great racing history, challenging track, nearby resorts, and proximity to the city of Atlanta adds to the popularity of this venue.
                    </p> */}

                    {/* <p>
                        Join us for one of the most entertaining race weekends on the 2022 schedule.
                    </p> */}
                </div>

                {/* <div className="col-3 border h-25 p-2" >

                    <h5>Get The Shibnobi Daily Email</h5>

                    <p>
                        Your daily digest of everything <br />
                        happening on the site.
                    </p>

                    <p>
                        <input className='p-1' type="text" name="" id="" placeholder='Enter your email address' />
                        <input className='p-1 bg-dark text-white' style={{ marginLeft: "5px" }} type="submit" value="Sign Up" id="" />
                    </p>

                    <p style={{ fontSize: "10px" }}>
                        This site is protected by reCAPTCHA and the Google <br /> Privacy Policy and Terms of Service apply
                    </p>





                </div> */}



            </div>


            <div className="row mb-4">
                <div className="col-md-6 backgroundlight p-4">
                    <h5 className='textHeading'>details</h5>
                    <div>
                        <span>Start</span>
                        <p>{getEventdata.start_date}</p>
                    </div>

                    <div>
                        <span>End</span>
                        <p>{getEventdata.end_date }</p>
                    </div>

                    <div>
                        <span>Website</span>
                        <p>{getEventdata.url }</p>
                    </div>
                </div>




            </div>




            <div className="row mb-4">
                <div className="col-md-6  p-4">
                    <div class="post-share">
                        <a class="post-share-link post-share-link-facebook" href={getEventdata.facebook} target="_blank" title="Facebook" aria-label="Share this listing on Facebook" data-share-height="300" data-share-width="609">
                            <img src="https://bringatrailer.com/wp-content/themes/bringatrailer/assets/img/social-facebook.svg" alt="Facebook icon" aria-hidden="true" />        </a>

                        <a class="post-share-link post-share-link-twitter" href={getEventdata.twitter} target="_blank" title="Twitter" aria-label="Share this listing on Twitter" data-share-height="257" data-share-width="626">
                            <img src="https://bringatrailer.com/wp-content/themes/bringatrailer/assets/img/social-twitter.svg" alt="Twitter icon" aria-hidden="true" />        </a>


                        <a class="post-share-link post-share-link-email poppable-link" href={getEventdata.email} target="_blank" aria-label="Share this listing on email">
                            <img src="https://bringatrailer.com/wp-content/themes/bringatrailer/assets/img/social-email.svg" alt="Email icon" aria-hidden="true" />        </a>

                    </div>


                    <div class="comments-header">
                        <a id="comments-anchor"></a>
                        <h4 class="comments-title" data-realtime_id="54577401" data-realtime_prop="comments-updated.display">No Comments</h4>
                    </div>


                    <div>
                        <form action="" onSubmit={handleSubmit}>
                            <textarea name="" id="" cols="74" rows="3"></textarea>
                            <div class="comment-submission-actions"><div class="comment-submission-actions-subscribe"><span class="subscribe-to-comments">Keep me in this conversation via email</span></div><div class="comment-submission-actions-submit"><input type="submit" class="submit button button-white button-narrow " value="Submit" /></div></div>
                        </form>



                    </div>

                </div>



            </div>

            {/* <div className="row">
                <div className="col-md-7 p-4"></div>
                <div className="col-md-3 topmargin">
                    <h6 className='textHeading'>Recent Shibnobi Features</h6>

                    
                    <p className='imagepart'>
                        <p>
                            <img width={120} src="https://bringatrailer.com/wp-content/uploads/2023/06/Site-Header-85994.png?resize=235%2C159" alt="" />
                            <p>New Make and Model Pages</p>
                        </p>
                        <p className='imgLeft'>
                            <img width={120} src="https://bringatrailer.com/wp-content/uploads/2023/05/1930_ford_model-a_89223cb7-9751-44c7-a366-0f89696b8934_1_105_c-42766-11059.webp?resize=235%2C159" alt="" />
                            <p>Shibnobi Auction Success Story: <br /> This Prewar Pickup is a Shibnobi Hat Trick</p>
                        </p>
                    </p>
                    <p className='imagepart'>
                        <p>
                            <img width={120} src="https://bringatrailer.com/wp-content/uploads/2023/03/1975_ferrari_308_gt4_1633359789208495d561975_ferrari_308_gt4_1633359789f98764da1624359033f98764daDSC_1198-kopieren-scaled-NIbdtn-05534-e1678305561701.webp?resize=235%2C159" alt="" />
                            <p>New Make and Model Pages</p>
                        </p>
                        <p className='imgLeft'>
                            <img width={120} src="https://bringatrailer.com/wp-content/uploads/2023/05/1990_porsche_911-carrera-4-coupe_photo-jan-13-2023-1-45-16-pm-68960-43534.webp?resize=235%2C159" alt="" />
                            <p>Shibnobi Auction Success Story: <br /> This Prewar Pickup is a Shibnobi Hat Trick</p>
                        </p>
                    </p>
                    <p className='imagepart'>
                        <p>
                            <img width={120} src="https://bringatrailer.com/wp-content/uploads/2023/05/1990_porsche_911-carrera-4-coupe_photo-jan-13-2023-1-45-16-pm-68960-43534.webp?resize=235%2C159" alt="" />
                            <p>New Make and Model Pages</p>
                        </p>
                        <p className='imgLeft'>
                            <img width={120} src="https://bringatrailer.com/wp-content/uploads/2023/04/Screen-Shot-2023-02-22-at-3.12.38-PM-07690-e1677107728372.png?resize=235%2C159" alt="" />
                            <p>Shibnobi Auction Success Story: <br /> This Prewar Pickup is a Shibnobi Hat Trick</p>
                        </p>
                    </p>

                    <div ><h5 class="widget-title">Upcoming Events</h5>
                        <ol >
                            <li >



                                <span >
                                    WRC Guanajuato Rally México					</span>





                                <div >
                                    <span >March 16</span> - <span >19, 2023</span>					</div>

                                <hr />
                            </li>
                            <li >

                                <span >
                                    Rally In The 100 Acre Wood					</span>





                                <div >
                                    <span >March 17</span> - <span >18, 2023</span>					</div>


                            </li>
                            <hr />
                            <li >

                                <span >
                                    2023 SVRA Road Atlanta Speedtour					</span>



                                <div >
                                    <span >March 23</span> - <span >26, 2023</span>					</div>


                            </li>
                            <hr />
                            <li >

                                <span >
                                    AACA Southeastern Spring Nationals					</span>




                                <div >
                                    <span >April 13</span> - <span >15, 2023</span>					</div>

                            </li>
                            <hr />
                            <li >

                                <span >
                                    Copperstate 1000					</span>





                                <div >
                                    <span >April 15</span> - <span >19, 2023</span>					</div>


                            </li>
                            <hr />
                        </ol>

                    </div>




                    <div ><h5 >Current Shibnobi Auctions</h5>

                        <div class="current-auctions group">


                            <div class="current-auction current-auction-featured  " data-pusher="post;list;55008234">



                                <img width="470" height="318" src="https://bringatrailer.com/wp-content/uploads/2023/02/2020_ferrari_488-pista-atelier_dsc09296-1-51016.jpg?resize=470%2C318" class="current-auction-image wp-post-image" alt="2020 Ferrari 488 Pista" loading="lazy" />
                                <div class="current-auction-data-holder">
                                    <div class="current-auction-data-outer">
                                        <div class="current-auction-data">
                                            <div class="current-auction-data-inner">

                                                Current Bid:                                <span data-listing-current="55008234">$515,000</span>

                                                <div class="current-auction-data-time">
                                                    Ends in:                                    <br />
                                                    <span data-auction-ends-id="55008234" data-auction-ends="2023-3-10-18-00-00" data-layout="{hn} {hl}, {mn} {ml}" class="is-countdown">1 hour, 10 minutes</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            
                        </div>



                       



                        <div class="current-auction   " data-pusher="post;list;55217404">


                            <a class="current-auction-link" href="https://bringatrailer.com/listing/1997-porsche-911-carrera-targa-8/">
                                <img width="235" height="159" src="https://bringatrailer.com/wp-content/uploads/2023/02/1997_porsche_911-carrera-targa_dsc_1206-91515.jpg?resize=235%2C159" class="current-auction-image wp-post-image" alt="1997 Porsche 911 Carrera Targa 6-Speed" loading="lazy"/>
                                    <div class="current-auction-data-holder">
                                        <div class="current-auction-data-outer">
                                            <div class="current-auction-data">
                                                <div class="current-auction-data-inner">

                                                    Current Bid:                                <span data-listing-current="55217404">$61,000</span>

                                                    <div class="current-auction-data-time">
                                                        Ends in:                                    <br/>
                                                            <span data-auction-ends-id="55217404" data-auction-ends="2023-3-10-18-10-00" data-layout="{hn} {hl}, {mn} {ml}" class="is-countdown">1 hour, 20 minutes</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                            </a>
                        </div>



                        <div class="current-auction   " data-pusher="post;list;54192460">


                           
                                <img width="235" height="159" src="https://bringatrailer.com/wp-content/uploads/2023/02/1996_nissan_skyline_jcd_8072-09525.jpg?resize=235%2C159" class="current-auction-image wp-post-image" alt="2.7L-Powered 1996 Nissan Skyline GT-R 5-Speed" loading="lazy"/>
                                    <div class="current-auction-data-holder">
                                        <div class="current-auction-data-outer">
                                            <div class="current-auction-data">
                                                <div class="current-auction-data-inner">

                                                    Current Bid:                                <span data-listing-current="54192460">$65,000</span>

                                                    <div class="current-auction-data-time">
                                                        Ends in:                                    <br/>
                                                            <span data-auction-ends-id="54192460" data-auction-ends="2023-3-10-18-15-00" data-layout="{hn} {hl}, {mn} {ml}" class="is-countdown">1 hour, 25 minutes</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                        
                        </div>



                        <div class="current-auction   " data-pusher="post;list;55083039">


                          
                                <img width="235" height="159" src="https://bringatrailer.com/wp-content/uploads/2023/02/1993_land-rover_defender-130_4470-90303.jpg?resize=235%2C159" class="current-auction-image wp-post-image" alt="1993 Land Rover Defender 130 V8 5-Speed" loading="lazy"/>
                                    <div class="current-auction-data-holder">
                                        <div class="current-auction-data-outer">
                                            <div class="current-auction-data">
                                                <div class="current-auction-data-inner">

                                                    Current Bid:                                <span data-listing-current="55083039">$16,260</span>

                                                    <div class="current-auction-data-time">
                                                        Ends in:                                    <br/>
                                                            <span data-auction-ends-id="55083039" data-auction-ends="2023-3-10-18-20-00" data-layout="{hn} {hl}, {mn} {ml}" class="is-countdown">1 hour, 30 minutes</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                            
                        </div>



                        <div class="current-auction   " data-pusher="post;list;54988252">


                            
                                <img width="235" height="159" src="https://bringatrailer.com/wp-content/uploads/2023/02/1966_mercedes-benz_230sl_pagoda-1197-06197.jpg?resize=235%2C159" class="current-auction-image wp-post-image" alt="No Reserve: 2.8L-Powered 1966 Mercedes-Benz 230SL 4-Speed" loading="lazy"/>
                                    <div class="current-auction-data-holder">
                                        <div class="current-auction-data-outer">
                                            <div class="current-auction-data">
                                                <div class="current-auction-data-inner">

                                                    Current Bid:                                <span data-listing-current="54988252">$36,000</span>

                                                    <div class="current-auction-data-time">
                                                        Ends in:                                    <br/>
                                                            <span data-auction-ends-id="54988252" data-auction-ends="2023-3-10-18-25-00" data-layout="{hn} {hl}, {mn} {ml}" class="is-countdown">1 hour, 35 minutes</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                            
                        </div>



                        <div class="current-auction   " data-pusher="post;list;54557359">


                            
                                <img width="235" height="159" src="https://bringatrailer.com/wp-content/uploads/2023/02/1932_plymouth_coupe_20230210_092952-05993.jpg?resize=235%2C159" class="current-auction-image wp-post-image" alt="Supercharged 1932 Plymouth Coupe Hot Rod" loading="lazy"/>
                                    <div class="current-auction-data-holder">
                                        <div class="current-auction-data-outer">
                                            <div class="current-auction-data">
                                                <div class="current-auction-data-inner">

                                                    Current Bid:                                <span data-listing-current="54557359">$25,000</span>

                                                    <div class="current-auction-data-time">
                                                        Ends in:                                    <br/>
                                                            <span data-auction-ends-id="54557359" data-auction-ends="2023-3-10-18-30-00" data-layout="{hn} {hl}, {mn} {ml}" class="is-countdown">1 hour, 40 minutes</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                            
                        </div>



                        <div class="current-auction   " data-pusher="post;list;54250903">


                            
                                <img width="235" height="159" src="https://bringatrailer.com/wp-content/uploads/2023/02/1976_vespa_super-150_20230206_130423-10009.jpg?resize=235%2C159" class="current-auction-image wp-post-image" alt="No Reserve: 1976 Vespa Super 150" loading="lazy"/>
                                    <div class="current-auction-data-holder">
                                        <div class="current-auction-data-outer">
                                            <div class="current-auction-data">
                                                <div class="current-auction-data-inner">

                                                    Current Bid:                                <span data-listing-current="54250903">$4,000</span>

                                                    <div class="current-auction-data-time">
                                                        Ends in:                                    <br/>
                                                            <span data-auction-ends-id="54250903" data-auction-ends="2023-3-10-18-32-00" data-layout="{hn} {hl}, {mn} {ml}" class="is-countdown">1 hour, 42 minutes</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                            
                        </div>



                        <div class="current-auction   " data-pusher="post;list;54377867">


                            
                                <img width="235" height="159" src="https://bringatrailer.com/wp-content/uploads/2023/02/1957_bmw_isetta-300_20230218_152747-04667.jpg?resize=235%2C159" class="current-auction-image wp-post-image" alt="1957 BMW Isetta 300" loading="lazy"/>
                                    <div class="current-auction-data-holder">
                                        <div class="current-auction-data-outer">
                                            <div class="current-auction-data">
                                                <div class="current-auction-data-inner">

                                                    Current Bid:                                <span data-listing-current="54377867">$28,500</span>

                                                    <div class="current-auction-data-time">
                                                        Ends in:                                    <br/>
                                                            <span data-auction-ends-id="54377867" data-auction-ends="2023-3-10-18-34-00" data-layout="{hn} {hl}, {mn} {ml}" class="is-countdown">1 hour, 44 minutes</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                            
                        </div>

                    </div>
                </div>


            </div>
        </div> */}


        </div >
    )
}

export default EventDetailPage
