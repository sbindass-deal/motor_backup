import React, { useState } from 'react'

function MyAccountLeftNav() {

// const [toggle, setToggle]= useState(true)



  return (
    <div>
         <ul class="sideBar__">
            <li><a href="accountinfo"  className="active" >Account Info</a></li>
            <li><a href="notifications">Notifications</a></li>
            <li><a href="listings">My Listings</a></li>
            <li><a href="bidswins">My Bids & Wins</a></li>
            <li><a href="myshipments">My Shipments</a></li>
        </ul>
    </div>
  )
}

export default MyAccountLeftNav