import React from "react";

const NotAvailable = ({ text }) => {
  return (
    <>
      <div
        className="container notAvailable"
        
      >
        <div className="row">
          <h2>{text}</h2>
        </div>
      </div>
    </>
  );
};

export default NotAvailable;
