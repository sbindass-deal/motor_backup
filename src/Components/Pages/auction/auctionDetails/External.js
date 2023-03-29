import React from "react";
import { useState } from "react";

const External = ({ vinDetails }) => {
  const [readMoreExt, setReadMoreExt] = useState(false);
  const [handleShow, setHandleShow] = useState(true);
  
  return (
    <>
      <div className="box_backgroundD mt-15">
        <h3 className="cardTitle riTArrow">
          {vinDetails.options && vinDetails?.options[1]?.category}
          <span  onClick={() => {
              setHandleShow(!handleShow);
            }}>
          <i class="fa-solid fa-chevron-down"></i>
          </span>
          
        </h3>
        <ul
          className="UlList"
          style={{
            maxHeight: `${readMoreExt ? "100%" : "50vh"}`,
            overflow: "hidden",
          }}
        >
          {vinDetails.options &&
            vinDetails?.options[1]?.options.map((curElem, i) => {
              return <li key={i}>{curElem.name}</li>;
            })}
        </ul>
        <button
          onClick={() => setReadMoreExt(!readMoreExt)}
          className="btn more_"
        >
          {readMoreExt ? "Read Less" : "Read more"}
        </button>
      </div>
    </>
  );
};

export default External;
