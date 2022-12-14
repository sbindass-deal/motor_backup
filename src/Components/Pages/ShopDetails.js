import Carousel from "react-bootstrap/Carousel";
import img_04 from "../../Assets/images/img-4.png";
import img_05 from "../../Assets/images/img-5.png";
import img_06 from "../../Assets/images/img-6.webp";

const ShopDetails = () => {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <Carousel slide={false}>
              <Carousel.Item>
                <img className="d-block w-100" src={img_04} alt="First slide" />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={img_05}
                  alt="Second slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img className="d-block w-100" src={img_06} alt="Third slide" />
              </Carousel.Item>
            </Carousel>
          </div>
          <div className="col-md-6">Hello</div>
        </div>
      </div>
    </>
  );
};

export default ShopDetails;
