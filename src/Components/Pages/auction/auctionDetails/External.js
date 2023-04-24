import React from "react";
import { useState } from "react";

const External = ({ vinDetails }) => {
  const [readMoreExt, setReadMoreExt] = useState(false);
  const [handleShow, setHandleShow] = useState(true);

  return (
    <>
      {vinDetails?.options[1]?.options?.length > 0 && (
        <div className="box_backgroundD mt-15">
          <h3 className="cardTitle riTArrow">
            {vinDetails.options && vinDetails?.options[1]?.category}
            <span className="pointer"
              onClick={() => {
                setHandleShow(!handleShow);
              }}
            >
              <i className="fa-solid fa-chevron-down"></i>
            </span>
          </h3>
          {handleShow && <div>
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
          </div>}
        </div>
      )}
    </>
  );
};

export default External;
