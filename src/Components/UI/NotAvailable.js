import React from "react";

const NotAvailable = ({ text }) => {
  return (
    <>
      <div
        className="container"
        style={{
          height: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="row">
          <h2>{text}</h2>
        </div>
      </div>
    </>
  );
};

export default NotAvailable;
