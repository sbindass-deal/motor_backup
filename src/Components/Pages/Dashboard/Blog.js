import React from 'react'
import AdminLeftNav from './AdminLeftNav';
import img_01 from "../../../Assets/images/img-1.webp"

function Blog() {
  return (
    <div>
        <section className="ptb_80 pt_sm_50">
            <div className="container">
            <div className="row">
                <div className="col-12 col-md-4 col-lg-3">
                <div className="card_Gray mb-5 mb-md-0">
                    <AdminLeftNav/>
                </div>
                </div>

                <div className="col-12 col-md-8 col-lg-9">
                <h3>My Blogs</h3>
                <hr />
                <div class="card_Gray table-responsive merchant vehicleSub">
                    <table class="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Image </th>
                            <th scope="col">Name</th>
                            <th scope="col">Description</th>
                            <th scope="col" style={{textAlign: "right"}}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>
                                <div className="cartImg">
                                    <img src={img_01}/>
                                </div>
                            </td>
                            <td>Blog Name </td>
                            <td>This 1962 Jaguar XKE is a left-hand-drive Series I coupe that was completed on June 7, 1962, and is said to have been sold new in California. It was moved to Michigan in 1987 and underwent a mechanical refurbishment by Eclectic Motorworks of Holland, Michigan, that was completed in 2020 before it was acquired by the selling dealer from its owner of 35 years in 2021.</td>
                        
                            <td className='actionBtn'>
                                <button data-toggle="modal" data-target="#EditBlog"><i class="fa-solid fa-pencil"></i></button>
                                <button><i class="fa-sharp fa-solid fa-plus"></i></button>
                                <button><i class="fa-solid fa-trash-can"></i></button>  
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>
                                <div className="cartImg">
                                    <img src={img_01}/>
                                </div>
                            </td>
                            <td>Blog Name </td>
                            <td>This 1962 Jaguar XKE is a left-hand-drive Series I coupe that was completed on June 7, 1962, and is said to have been sold new in California. It was moved to Michigan in 1987 and underwent a mechanical refurbishment by Eclectic Motorworks of Holland, Michigan, that was completed in 2020 before it was acquired by the selling dealer from its owner of 35 years in 2021.</td>
                        
                            <td className='actionBtn'>
                                <button data-toggle="modal" data-target="#EditBlog"><i class="fa-solid fa-pencil"></i></button>
                                <button><i class="fa-sharp fa-solid fa-plus"></i></button>
                                <button><i class="fa-solid fa-trash-can"></i></button>  
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td>
                                <div className="cartImg">
                                    <img src={img_01}/>
                                </div>
                            </td>
                            <td>Blog Name </td>
                            <td>This 1962 Jaguar XKE is a left-hand-drive Series I coupe that was completed on June 7, 1962, and is said to have been sold new in California. It was moved to Michigan in 1987 and underwent a mechanical refurbishment by Eclectic Motorworks of Holland, Michigan, that was completed in 2020 before it was acquired by the selling dealer from its owner of 35 years in 2021.</td>
                        
                            <td className='actionBtn'>
                                <button data-toggle="modal" data-target="#EditBlog"><i class="fa-solid fa-pencil"></i></button>
                                <button><i class="fa-sharp fa-solid fa-plus"></i></button>
                                <button><i class="fa-solid fa-trash-can"></i></button>  
                            </td>
                        </tr>
                        
                    
                    </tbody>
                    </table>
                </div>

                {/* <!-- Edit PopUp--> */}

                <div class="card_Gray table-responsive vehicleSub">
                        <div className="container">
                        
                            <div className="modal fade" id="EditBlog">
                                <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content">
                                    <div className="modal-header border-0">
                                    <h4 className="modal-title">Edit Blog</h4>
                                    <button type="button" className="close" data-dismiss="modal">
                                        <i className="fa-solid fa-xmark"></i>
                                    </button>
                                    </div>

                                    <div className="modal-body">
                                    <form>
                                        <div className="row row_gap_5">
                                        <div className="col-12 col-md-12">
                                            <label>Upload Photos</label>
                                            <div className="form-group">
                                                <input type="file" class="field" id="formFileMultiple" multiple/>
                                            </div>
                                            <small>(Accepted file types: jpg, jpeg, png, Max. file size: 10 MB, Max. files: 200.)</small>
                                        </div>
                                     
                                        <div className="col-12 col-md-12">
                                            <label>Blog Name</label>
                                            <div className="form-group">
                                            <input
                                                type="text"
                                                name=""
                                                className="field"
                                                placeholder="Product Name"
                                            />
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-12">
                                            <label>Blog Description</label>
                                            <div className="form-group">
                                            <textarea className="field" placeholder='Description here'></textarea>
                                            </div>
                                        </div>
                                       
                                        {/* <div className="col-12 col-md-12">
                                            <label>Category</label>
                                            <div className="form-group">
                                            <input
                                                type="text"
                                                name=""
                                                className="field"
                                                placeholder="Category Name"
                                            />
                                            </div>
                                        </div>
                                         */}
                                        
                                       
                                        </div>
                                        <div className="form-group">
                                        <button type="button" className="btn">
                                            Submit
                                        </button>
                                        </div>
                                    </form>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </section>
    </div>
  )
}

export default Blog