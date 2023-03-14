import React from "react";
import { Image } from "antd";
import { useState } from "react";
import ReactPlayer from "react-player";

const Gallery = ({ vehicle }) => {
  const [showAuctionGallery, setShowAuctionGallery] = useState(false);

  return (
    <>
      <div className="card_ ptb_40">
        <h3 className="cardTitle">Gallery</h3>
        <div className="row galleryPh">
          {/* <div className={`col-lg-5 firstImg col-sm-12`}>
            {vehicle.image_gallery && (
              <Image
                loading="lazy"
                className="card-img-top"
                src={`${process.env.REACT_APP_URL}/${vehicle?.image_gallery[0]?.imagePath}/${vehicle?.image_gallery[0]?.imageName}`}
                onError={({ currentTarget }) => {
                  currentTarget.onError = null;
                  currentTarget.src =
                    "http://www.freeiconspng.com/uploads/no-image-icon-11.PNG";
                }}
                alt="Maskgroup1"
              />
            )}
          </div> */}
          <div className={` col-lg-7 col-sm-12`}>
            <div className="row rightGallery sixOption">
              <Image.PreviewGroup>
                {vehicle.image_gallery &&
                  vehicle.image_gallery.map((curElem) => {
                    return (
                      <div>
                        <Image
                          loading="lazy"
                          className="card-img-top"
                          src={`${process.env.REACT_APP_URL}/${curElem.imagePath}/${curElem.imageName}`}
                          onError={({ currentTarget }) => {
                            currentTarget.onError = null;
                            currentTarget.src =
                              "http://www.freeiconspng.com/uploads/no-image-icon-11.PNG";
                          }}
                          alt="Maskgroup1"
                        />
                      </div>
                    );
                  })}
              </Image.PreviewGroup>
            </div>
          </div>
          <div
            className={` col-12`}
            style={{ display: `${showAuctionGallery ? "" : "none"}` }}
          >
            <div className="row rightGallery">
              <Image.PreviewGroup>
                {vehicle.image_gallery &&
                  vehicle.image_document &&
                  [...vehicle.image_document, ...vehicle.image_gallery].map(
                    (curElem) => {
                      return (
                        <div>
                          <Image
                            loading="lazy"
                            className="card-img-top"
                            src={`${process.env.REACT_APP_URL}/${curElem.imagePath}/${curElem.imageName}`}
                            onError={({ currentTarget }) => {
                              currentTarget.onError = null;
                              currentTarget.src =
                                "http://www.freeiconspng.com/uploads/no-image-icon-11.PNG";
                            }}
                            alt="Maskgroup1"
                          />
                        </div>
                      );
                    }
                  )}
              </Image.PreviewGroup>
            </div>
          </div>

          <button
            onClick={() => setShowAuctionGallery(!showAuctionGallery)}
            className="btn more_"
          >
            {showAuctionGallery ? "Show Less" : "Show more"}{" "}
          </button>
        </div>
        <div className=" phG">
          <h3>Youtube Videos</h3>
          <div className="card-group">
            {vehicle?.description?.map((curElem, i) => {
              return (
                <div key={i}>
                  <ReactPlayer className="m-1" url={curElem} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Gallery;
