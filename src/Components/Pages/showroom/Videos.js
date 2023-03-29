import React from "react";
import ReactPlayer from "react-player";

const Videos = ({ data }) => {
  return (
    <>
      <div className="card_ ptb_40">
        <h3 className="cardTitle">Videos</h3>
        <div className="card-group videoColl">
          {data?.video_link?.map((curElem, i) => {
            return (
              <>
                <div className="col-lg-6 mb-10" key={i}>
                  <ReactPlayer className="videoWidth" url={curElem} />
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Videos;
