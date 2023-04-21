import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import MyAccountLeftNav from "./MyAccountLeftNav";
import { noImage } from "../../UI/globaleVar";

function WatchList() {
    const [allData, setAllData] = useState([])
    const [loading, setloading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')


    useEffect(() => {
        const getSubscription = async () => {
            try {
                const res = await axios.post(
                    `${process.env.REACT_APP_URL}getWatchListByUserId`, {}
                );
                console.log(888190, res)
                setAllData(res.data.data)
                setloading(false)
            } catch (err) {
                console.log(err);
            }
        };
        getSubscription();
    }, []);

    return (
        <div>
            <section className="ptb_80 pt_sm_50">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-4 col-lg-3">
                            <div className="card_Gray mb-5 mb-md-0 divSticky">
                                <h5>Transaction</h5>
                                <hr />
                                <MyAccountLeftNav />
                            </div>
                        </div>

                        <div className="col-12 col-md-8 col-lg-9">
                            <h3
                                className="d-flex"
                                id="widthChnge"
                                style={{ justifyContent: "space-between" }}
                            >
                                Watch List

                            </h3>

                            <hr id="hr" />
                            <ul className="postTopOption" id="widthChnge">
                                <li className="post_search">
                                    <input
                                        type="search"
                                        name="search"
                                        placeholder="Search…"
                                        onChange={(e) => {
                                            setSearchTerm(e.target.value);
                                        }}
                                    />
                                </li>
                            </ul>
                            <div
                                class="card_Gray table-responsive merchant vehicleSub"
                                id="scrollable"
                            >
                                {
                                    loading ? <div class="d-flex justify-content-center">
                                        <div class="spinner-border" role="status">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div> :
                                        <table class="table table-striped text-center">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Sr.No</th>
                                                    <th scope="col">imges</th>
                                                    <th scope="col">Name</th>
                                                    
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    allData?.filter((curVal) => {
                                                        if (searchTerm == '') {
                                                            return curVal
                                                        } else if (curVal.title.toLowerCase().includes(searchTerm.toLowerCase())
                                                            // || curVal.model.toLowerCase().includes(searchTerm.toLowerCase())
                                                            // || curVal.year.toLowerCase().includes(searchTerm.toLowerCase())
                                                        ) {
                                                            return curVal
                                                        }
                                                    })
                                                        ?.map((curVal, i) => {
                                                            console.log(6788, curVal)
                                                            return <tr>
                                                                <td >{i + 1}</td>
                                                                
                                                                    <img src={
                                                                        curVal?.image_banner[0]
                                                                            ? `${process.env.REACT_APP_URL}/${curVal?.image_banner[0]?.imagePath}/${curVal?.image_banner[0]?.imageName}`
                                                                            : noImage
                                                                    } alt="" />
                                                                
                                                                <td>{`${curVal.make} ${curVal.model} ${curVal.year}`}</td>
                                                                
                                                            </tr>
                                                        })
                                                }

                                            </tbody>
                                        </table>
                                }




                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default WatchList;
