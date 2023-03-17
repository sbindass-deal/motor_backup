import Carousel from "react-bootstrap/Carousel";

const Carousal = ({ dealerData }) => {
  return (
    <>
      <Carousel fade className="newDelarSlid">
        {dealerData?.image_banner &&
          dealerData?.image_banner.map((curElem, i) => {
            return (
              <Carousel.Item key={i}>
                <img
                  className="slidImg"
                  src={
                    curElem.logo &&
                    `${process.env.REACT_APP_URL}/${curElem.logo}`
                  }
                  alt="First slide"
                />
                <Carousel.Caption>
                  {/* <h3 className="sliderTile">First slide label</h3>
                  <p>
                    Nulla vitae elit libero, a pharetra augue mollis interdum.
                  </p> */}
                </Carousel.Caption>
              </Carousel.Item>
            );
          })}
      </Carousel>
    </>
  );
};

export default Carousal;
