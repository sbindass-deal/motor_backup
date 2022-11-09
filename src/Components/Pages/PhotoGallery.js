import React from 'react'
// import car_01 from '../../Assets/images/car_01.jpg'
import car_01 from '../../Assets/images/car_01.jpg'

function PhotoGallery() {
  return (
    <>
        <section class="ptb_80 pt_sm_50">
            <div class="container">
                <div class="row">
                    <div class="col-12 text-center pb_30">
                        <h2 class="title_combo title_Center">PHOTO GALLERY</h2>
                    </div>
                </div>

                <div class="row row_gap_5 imgGalleryRow">
                    <div class="col-6 col-sm-6 col-lg-4">
                            <img src={car_01} alt="car_01" />
                    </div>
                    <div class="col-6 col-sm-6 col-lg-4">
                            <img src={car_01} alt="car_01" />                       
                    </div>
                    <div class="col-6 col-sm-6 col-lg-4">
                            <img src={car_01} alt="car_01" />                        
                    </div>
                    <div class="col-6 col-sm-6 col-lg-4">
                            <img src={car_01} alt="car_01" />                        
                    </div>
                    <div class="col-6 col-sm-6 col-lg-4">
                            <img src={car_01} alt="car_01" />                        
                    </div>
                    <div class="col-6 col-sm-6 col-lg-4">
                            <img src={car_01} alt="car_01" />                       
                    </div>
                    <div class="col-6 col-sm-6 col-lg-4">
                            <img src={car_01} alt="car_01" />                        
                    </div>
                    <div class="col-6 col-sm-6 col-lg-4">
                            <img src={car_01} alt="car_01" />                       
                    </div>
                    <div class="col-6 col-sm-6 col-lg-4">
                            <img src={car_01} alt="car_01" />                       
                    </div>
                    <div class="col-6 col-sm-6 col-lg-4">
                            <img src={car_01} alt="car_01" />                       
                    </div>
                    <div class="col-6 col-sm-6 col-lg-4">
                            <img src={car_01} alt="car_01" />                        
                    </div>
                    <div class="col-6 col-sm-6 col-lg-4">
                            <img src={car_01} alt="car_01" />                       
                    </div>
                </div>

            </div>
        </section>
    </>
  )
}

export default PhotoGallery