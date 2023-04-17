import React from "react";
import { useState } from "react";

const External = ({ vinDetails }) => {
  const [readMoreExt, setReadMoreExt] = useState(false);

  return (
    <>
      {vinDetails?.options[1]?.options?.length > 0 && (
        <div className="box_backgroundD mt-15">
          <h3 className="cardTitle riTArrow">
            {vinDetails.options && vinDetails?.options[1]?.category}

            <i class="fa-solid fa-chevron-down"></i>
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
      )}
    </>
  );
};

export default External;
