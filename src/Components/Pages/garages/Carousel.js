import Carousel from "react-bootstrap/Carousel";

const CarousalGarages = ({ dealerData }) => {
  return (
    <>
      <Carousel interval={3000} className="newDelarSlid">
        {dealerData?.image_banner &&
          dealerData?.image_banner.map((curElem, i) => {
            return (
              <Carousel.Item key={i}>
                <img
                  className="slidImg"
                  loading="lazy"
                  src={
                    curElem.logo &&
                    `${process.env.REACT_APP_URL}/${curElem.logo}`
                  }
                  alt="First slide"
                />
                <Carousel.Caption></Carousel.Caption>
              </Carousel.Item>
            );
          })}
      </Carousel>
    </>
  );
};

export default CarousalGarages;