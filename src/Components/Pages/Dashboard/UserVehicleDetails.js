import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

const UserVehicleDetails = () => {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState({});
  const fetchVehicleApi = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_URL}vehicle/${id}`
      );
      if (response.data.data) {
        setVehicle(response.data.data[0]);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchVehicleApi();
  }, [id]);

  return (
    <div>
      <section className="ptb_80 pt_sm_50">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center pb_30">
              <h2 className="title_combo title_Center">
                {vehicle.make}-{vehicle.model}-{vehicle.year}
              </h2>
            </div>
            <div className="col-12">
              <div className="detailPostOption"></div>
            </div>
          </div>

          <div className="row pt-4">
            <div className="col-12 pb-3">
              <div className="postHero">
                <img
                  src="https://tse4.mm.bing.net/th?id=OIP.vf11XywUrdCTiM2RtALitAHaFU&pid=Api&P=0"
                  alt="details-images"
                />
              </div>
            </div>
            <div className="col-12 dropdownCol">
              <div className="dropdown mr-2">
                <button
                  type="button"
                  className="gry_btn"
                  data-toggle="dropdown"
                >
                  Make: make
                </button>
                <div className="dropdown-menu">
                  <a className="dropdown-item" href="#">
                    View all listings
                  </a>
                  <a className="dropdown-item" href="#">
                    Notify me about new listings
                  </a>
                </div>
              </div>
              <div className="dropdown mr-2">
                <button
                  type="button"
                  className="gry_btn"
                  data-toggle="dropdown"
                >
                  Model: model name
                </button>
                <div className="dropdown-menu">
                  <a className="dropdown-item" href="#">
                    View all listings
                  </a>
                  <a className="dropdown-item" href="#">
                    Notify me about new listings
                  </a>
                </div>
              </div>

              <div className="dropdown mr-2">
                <button type="button" className="gry_btn">
                  Era: era
                </button>
                <div className="dropdown-menu">
                  <a className="dropdown-item" href="#">
                    View all listings
                  </a>
                  <a className="dropdown-item" href="#">
                    Notify me about new listings
                  </a>
                </div>
              </div>
              <div className="dropdown mr-2">
                <button type="button" className="gry_btn">
                  More Photos
                </button>

                <div className="dropdown-menu">
                  <a className="dropdown-item" href="#">
                    View all listings
                  </a>
                  <a className="dropdown-item" href="#">
                    Notify me about new listings
                  </a>
                </div>
              </div>

              <div className="dropdown">
                {/* <p className="py-4">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Expedita quod nemo ab, harum similique nulla autem unde quo
                  eveniet minus, eaque libero provident dolorum ad. Harum
                  possimus error consequatur quam. Molestiae beatae fuga
                  consequatur provident est tempore quos sequi ut aliquam quasi
                  impedit fugiat, repellendus cumque ad, quas corrupti natus
                  laborum minima dolorum nobis cupiditate, aspernatur id
                  reprehenderit necessitatibus. Iste? Quas, doloribus nesciunt
                  pariatur dicta ex, impedit commodi illo consequuntur fugiat
                  delectus sequi ducimus voluptatibus, sapiente aspernatur
                  suscipit soluta dolorem officia non unde perspiciatis vel
                  tenetur atque nostrum. Quisquam, similique. Rerum sed eius
                  sint suscipit est repellendus exercitationem ad magnam velit
                  porro numquam harum mollitia incidunt deserunt quaerat
                  blanditiis error ut, repellat dignissimos fuga, dolor aliquid.
                  Quisquam pariatur tempora eligendi? Obcaecati eius, quod
                  expedita adipisci praesentium nisi quibusdam iure, quidem non
                  assumenda rerum, placeat est minus vero enim dolorem mollitia.
                </p> */}

                <div className="pb_40" id="placeBid_col">
                  <div className="card_Gray">
                    <h5>CAR INFORMATION</h5>
                    <ul className="bidList_ info_">
                      <li>
                        <label htmlFor="">40 Miles</label>
                      </li>

                      <li>
                        Interstellar <label htmlFor=""> Interstellar</label>
                      </li>

                      <li>
                        <label htmlFor="">Location: delhi</label>
                      </li>

                      <li>
                        <label htmlFor="">
                          {" "}
                          accessories {vehicle.accessories}
                        </label>
                      </li>
                      <li>
                        <label htmlFor="">vehicle details</label>
                      </li>

                      <li>
                        Body Work <label htmlFor=""> Recently Painted</label>
                      </li>

                      <li>
                        <label htmlFor=""> Reserve {vehicle.reserve}</label>
                      </li>

                      <li>
                        Size tires <label htmlFor="">{vehicle.sizetires}</label>
                      </li>
                      <li>
                        <label htmlFor="">pickone</label>
                      </li>

                      <li>
                        Brand <label htmlFor="">brand</label>
                      </li>

                      <li>
                        <label htmlFor="">
                          Private Party or Dealer :dealer
                        </label>
                      </li>
                    </ul>
                  </div>
                </div>
                {/* <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Iusto vel omnis aliquam accusamus eveniet. Ipsa molestias
                  totam, eligendi beatae id inventore nesciunt provident est sed
                  in, impedit at ipsum mollitia! Ad corporis esse architecto cum
                  placeat aspernatur tempore? Odit saepe harum repellat ut
                  aspernatur, officia eius. Officiis veritatis earum quae, et
                  eum nisi quis aut ducimus cum quisquam animi necessitatibus.
                  Ab dolores, distinctio harum alias illum in nam quos, sed
                  blanditiis dignissimos quasi. Incidunt repellendus ab, sunt
                  quisquam neque tempora fugiat nesciunt commodi quo perferendis
                  quod enim reprehenderit necessitatibus illum! Minus beatae
                  maiores eos placeat consequuntur totam? Rerum ratione fugit
                  nobis alias laboriosam, sunt atque. Quia voluptatem aliquam
                  magni eveniet illum ad, autem odio ullam culpa voluptate nemo
                  sint eligendi? Exercitationem optio qui nulla asperiores illo
                  reiciendis quis iure, nesciunt amet illum assumenda eos quidem
                  reprehenderit corporis molestias, odio modi quibusdam vero
                  magnam expedita cupiditate laborum tenetur. Voluptatum, dolor
                  reprehenderit!
                </p> */}
                <div className="row row_gap_5 videoGalleryRow">
                  <div className="col-12 col-sm-6 pt-4">
                    <h5>PHOTO GALLERY</h5>
                    <div className="fancyCol">
                      <img
                        src="https://tse4.mm.bing.net/th?id=OIP.vf11XywUrdCTiM2RtALitAHaFU&pid=Api&P=0"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="col-12 col-sm-6 pt-4">
                    <h5>&nbsp;</h5>
                  </div>
                  {/* <button className="btn btn-warning">Approve</button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UserVehicleDetails;
