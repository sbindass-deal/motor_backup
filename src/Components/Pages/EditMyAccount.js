import React from 'react'

function EditMyAccount() {
  return (
    <div>
        <section className="ptb_80 pt_sm_50">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-4 col-lg-3">
                        <div className="card_Gray mb-5 mb-md-0">
                            <h5>My Account</h5>
                            <hr/>
                            <ul className="sideBar__">
                                <li><a href="accountinfo" className="active">Account Info</a></li>
                                <li><a href="notifications">Notifications</a></li>
                                <li><a href="listings">My Listings</a></li>
                                <li><a href="bidswins">My Bids & Wins</a></li>
                                <li><a href="myshipments">My Shipments</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-12 col-md-8 col-lg-9">
                        <h3>Enter Your Shibnobi User Info</h3>
                        <hr/>
                        <div className="row">
                            <div className="col-12 col-md-6">
                                <div className="form-group">
                                    <label>Email</label>
                                    <input type="text" name="" placeholder="Enter your email" className="field" value="miss.aditirai@gmail.com"/>
                                </div>
                            </div>
                            <div className="col-12 col-md-6">
                                <div className="form-group">
                                    <label>Username</label>
                                    <input type="text" name="" placeholder="Enter your Username" className="field" value="Aditirai2001" disabled/>
                                </div>
                            </div>
                            <div className="col-12 col-md-6">
                                <div className="form-group">
                                    <label>New Password</label>
                                    <input type="text" name="" placeholder="Enter New Password" className="field" value=""/>
                                </div>
                            </div>
                            <div className="col-12 col-md-6">
                                <div className="form-group">
                                    <label>Confirm Password</label>
                                    <input type="text" name="" placeholder="Enter Confirm Password" className="field" value=""/>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="form-group">
                                    <a href="my-account.html" className="gry_btn mt-3">Save Changes</a>
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

export default EditMyAccount