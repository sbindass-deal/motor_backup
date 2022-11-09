import React from 'react'
import MyAccountLeftNav from './MyAccountLeftNav'

function AccountInfo() {
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
                        <h3>Basic Info</h3>
                        <hr/>
                        <ul className="labelList_">
                            <li>
                                <div className="labelList_label">Email Address</div>
                                <div className="labelList_text">miss.aditirai@gmail.com <br/><a href="#">Resend Verification Email</a></div>
                            </li>
                            <li>
                                <div className="labelList_label">Username</div>
                                <div className="labelList_text">Aditirai2001</div>
                            </li>
                            <li>
                                <div className="labelList_label">Password</div>
                                <div className="labelList_text">****************</div>
                            </li>
                        </ul>
                        <a href="editmyaccount" className="gry_btn mt-3">Edit My Account Info</a>
                    </div>
                </div>
            </div>
        </section>
    </div>
  )
}

export default AccountInfo