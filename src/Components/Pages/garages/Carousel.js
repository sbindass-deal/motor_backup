import Carousel from "react-bootstrap/Carousel";

const CarousalGarages = ({ garagesData }) => {
  return (
    <>
      <Carousel interval={3000} className="newDelarSlid">
        {garagesData?.image_banner &&
          garagesData?.image_banner.map((curElem, i) => {
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
