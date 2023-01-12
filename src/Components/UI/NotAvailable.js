import React from "react";

const NotAvailable = ({ text }) => {
  return (
    <>
      <div className="container notAvailable">
        <div className="row">
          <h2 className="text-warning">{text}</h2>
        </div>
      </div>
    </>
  );
};

export default NotAvailable;
