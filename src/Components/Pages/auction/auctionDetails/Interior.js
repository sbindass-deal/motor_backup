import React from "react";
import { useState } from "react";

const Interior = ({ vinDetails }) => {
  const [readMoreInt, setReadMoreInt] = useState(false);
  const [handleShow, setHandleShow] = useState(false);

  return (
    <>
      <div className="box_backgroundD mt-15">
        <h3 className="cardTitle riTArrow">
          {vinDetails?.options && vinDetails?.options[0]?.category}
          <span
            onClick={() => {
              setHandleShow(!handleShow);
            }}
          >
            <i class="fa-solid fa-chevron-down"></i>
          </span>
        </h3>
        <ul
          className="UlList"
          style={{
            maxHeight: `${readMoreInt ? "100%" : "50vh"}`,
            overflow: "hidden",
            height: `${handleShow ? "0px" : ""}`,
          }}
        >
          {vinDetails?.options &&
            vinDetails?.options[0]?.options?.map((curElem, i) => {
              return <li key={i}>{curElem?.name}</li>;
            })}
        </ul>
        {!handleShow && (
          <button
            onClick={() => setReadMoreInt(!readMoreInt)}
            className="btn more_"
          >
            {readMoreInt ? "Read Less" : "Read more"}
          </button>
        )}
      </div>
    </>
  );
};

export default Interior;
