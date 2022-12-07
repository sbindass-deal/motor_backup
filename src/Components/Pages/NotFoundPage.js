import React from "react";
import '../Pages/NotFoundPage.css'
import carGif from '../../Assets/images/not_found.gif'

const NotFoundPage = () => {
  return (
    <>
      <div className="containerSec">
        <div className="col-lg-12 col-md-12 col-sm-12 ">
          <div className="inner-content">
            <h1 className=" animate-charcter">404 <span>Page Not Found</span></h1>

            <img className="carGif" src={carGif}/>
          </div>
        
        </div>
        
      </div>
    </>
  );
};

export default NotFoundPage;
