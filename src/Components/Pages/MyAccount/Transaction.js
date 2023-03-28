import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import MyAccountLeftNav from "./MyAccountLeftNav";

function Transaction() {
    const [allData, setAllData] = useState([])
    const [loading, setloading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')


    useEffect(() => {
        const getSubscription = async () => {
            try {
                const res = await axios.get(
                    `${process.env.REACT_APP_URL}transactionhistory`
                );
                console.log(89099, res.data.data)
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
                                Transaction

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
                                        <table class="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Sr.No</th>
                                                    {/* <th scope="col">Id</th> */}
                                                    <th scope="col">Type</th>
                                                    {/* <th scope="col">Qty</th> */}
                                                    <th scope="col">Amount</th>
                                                    <th scope="col">Transaction ID</th>
                                                    <th scope="col">Status</th>
                                                    <th scope="col">Date</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    allData?.filter((curVal) => {
                                                        if (searchTerm == '') {
                                                            return curVal
                                                        } else if (curVal.status.toLowerCase().includes(searchTerm.toLowerCase())
                                                            || curVal.type.toLowerCase().includes(searchTerm.toLowerCase())
                                                        ) {
                                                            return curVal
                                                        }
                                                    })
                                                        ?.map((curVal, i) => {
                                                            console.log(6788, curVal)
                                                            return <tr>
                                                                <td >{i + 1}</td>
                                                                {/* <td>{curVal?.id}</td> */}
                                                                <td>{curVal.type}</td>
                                                                {/* <td>{curVal.qty}</td> */}
                                                                <td>${curVal.amount}</td>
                                                                <td>{curVal.transaction_id}</td>
                                                                <td>{curVal.status}</td>
                                                                <td>{new Date(curVal.updated_at).toDateString()}</td>
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

export default Transaction;
