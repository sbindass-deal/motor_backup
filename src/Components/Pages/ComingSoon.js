import React from 'react'
import '../Pages/NotFoundPage.css'
import carGif from '../../Assets/images/transparent.png'

function ComingSoon() {
  return (
    <>
      <div className="containerSec comingSoon">
        <div className="col-lg-12 col-md-12 col-sm-12 mt-50 ">
          <div className="inner-content ">
          <img className="carGif" src={carGif}/>
          <h3 className='comQut'>Quenching your thirst for the open road<br/> Never let your tank get to "E"!</h3>
            <h1 className=" animate-charcter">Coming Soon </h1>
            {/* <span>Page Not Found</span> */}

            
          </div>
        
        </div>
        
      </div>
    </>
  )
}

export default ComingSoon