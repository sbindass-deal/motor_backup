import React from 'react'
import img_01 from "../../Assets/images/img-1.webp";
function AddtocarPopup() {
  return (
    <div className="content addToCart">
    <div className="wrapper-1">
      <div className="wrapper-2">
        <p className="Msg">Great choice! Added to your bag</p>
        <div className="productInfo">
            <img src={img_01} loading="lazy" />
          <table>
            <tr>
              <td>Product Name</td>
              <td>Womens GasGuzzlrs T Shirt</td>
            </tr>
            <tr>
              <td>Product Size</td>
              <td>4years</td>
            </tr>
            <tr>
              <td>Color</td>
              <td>Pink</td>
            </tr>
            <tr>
              <td>Product Price</td>
              <td className="price__">$24.99</td>
            </tr>
          </table>
         
        </div>

        {/* <p>Thanks for subscribing to our news letter.  </p>
        <p>you should receive a confirmation email soon  </p> */}
        <button className="btn">
        Continue shopping
        </button>
        <button className="btn">
        View bag and checjout
        </button>
      </div>
      {/* <div className="footer-like">
        <p>Email not received?
        <a href="#">Click here to send again</a>
        </p>
      </div> */}
    </div>
  </div>
  )
}

export default AddtocarPopup