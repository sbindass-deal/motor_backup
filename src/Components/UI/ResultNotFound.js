import React from "react";

const ResultNotFound = ({ text }) => {
  return (
    <div
      className="container"
      style={{
        height: "50vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="row">
        <h2>{text}</h2>
      </div>
    </div>
  );
};

export default ResultNotFound;
