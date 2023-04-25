import React from "react";
import { useState } from "react";

const Interior = ({ vinDetails }) => {
  const [readMoreInt, setReadMoreInt] = useState(false);
  const [handleShow, setHandleShow] = useState(true);

  return (
    <>
      {vinDetails?.options[0]?.options?.length > 0 && (
        <div className="box_backgroundD mt-15">
          <h3 className="cardTitle riTArrow">
            {vinDetails?.options && vinDetails?.options[0]?.category}
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
              // style={{
              //   maxHeight: `${readMoreInt ? "100%" : "50vh"}`,
              //   overflow: "hidden",
              //   height: `${handleShow ? "0px" : ""}`,
              // }}
            >
              {vinDetails?.options &&
                vinDetails?.options[0]?.options?.map((curElem, i) => {
                  return <li key={i}>{curElem?.name}</li>;
                })}
            </ul>
            {/* {!handleShow && ( */}
            <button
              onClick={() => setReadMoreInt(!readMoreInt)}
              className="btn more_"
            >
              {readMoreInt ? "Read Less" : "Read more"}
            </button>
          </div>}

        </div>
      )}
    </>
  );
};

export default Interior;
