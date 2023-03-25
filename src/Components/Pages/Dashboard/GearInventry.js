import { React, useState, useEffect } from 'react';
import AdminLeftNav from "./AdminLeftNav";
import axios from 'axios';

export default function GearInventry() {

    const [addNewColor, setAddNewColor] = useState("");
    const [addNewSize, setAddNewSize] = useState("");
    const [addNewCategory, setAddNewCategory] = useState("");
    const [refresh, setRefresh] = useState(false);
    const TOKEN = "eyJpdiI6InhnclZZSm5mZ2FubzRFSEFyNk43M1E9PSIsInZhbHVlIjoiQW9tbDlXTkprYXBCWmFKWW5pMXlNd09jM3RPelduMnFqU1pXdHo4QzVMMD0iLCJtYWMiOiJkYWVlNjE3ZTI4OWFjZDE3ZGU4Yzg2ZWI5ZGM3NmZlZmZjYWZlYmU3ZGQ2NGE0MWY2MDk2ZmMwNzFhMDI2OTYxIiwidGFnIjoiIn0="
    const [category, setCategory] = useState();
    const [size, setSize] = useState();
    const [color, setColor] = useState();
    const [inputColor , setInputColor] = useState();


    useEffect(() => {

        axios({
            method: "get",
            url: `${process.env.REACT_APP_URL}getAllColors`,
            "Authorization": TOKEN
        }).then((d) => { setColor(d.data.data); });

        axios({
            method: "get",
            url: `${process.env.REACT_APP_URL}getAllSize`,
            "Authorization": TOKEN
        }).then((d) => { setSize(d.data.data); });

        axios({
            method: "get",
            url: `${process.env.REACT_APP_URL}getAllCategory`,
            "Authorization": TOKEN
        }).then((d) => { setCategory(d.data.data); });

    }, [refresh])

    const handleAddColor = () => {
        if (addNewColor == "")
            return alert("Please Enter Something");
        axios({
            method: "post",
            data: {
                color: addNewColor
            },
            url: `${process.env.REACT_APP_URL}addColors`,
            "Authorization": TOKEN
        }).then(() => {
            setAddNewColor("");
            setRefresh(!refresh);
        })
    }


    const handleAddSize = () => {
        if (addNewSize == "")
            return alert("Please Enter Something");
        axios({
            method: "post",
            data: {
                size: addNewSize
            },
            url: `${process.env.REACT_APP_URL}addSize`,
            "Authorization": TOKEN
        }).then(() => {
            setAddNewSize("");
            setRefresh(!refresh);
        })
    }

    const handleAddcategory = () => {
        if (addNewCategory == "")
            return alert("Please Enter Something");
        axios({
            method: "post",
            data: {
                category: addNewCategory
            },
            url: `${process.env.REACT_APP_URL}addproductCategory`,
            "Authorization": TOKEN
        }).then(() => {
            setAddNewCategory("");
            setRefresh(!refresh);
        })
    }


    return (
        <>
            <section className="ptb_80 pt_sm_50">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-4 col-lg-3">
                            <div className="card_Gray mb-5 mb-md-0 divSticky">
                                <AdminLeftNav />
                            </div>
                        </div>
                        <div className="col-8 d-flex justify-content-between">
                            <div className="dropdown">
                                <a className="btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Add New Color
                                </a>

                                <ul className="dropdown-menu">
                                    <div className='d-flex'><input type="text" value={addNewColor} placeholder="Add New Color" onChange={(e) => { setAddNewColor(e.target.value) }} /><a onClick={handleAddColor}><i className="fa fa-plus-circle p-2 text-success d-block" aria-hidden="true"></i></a></div>
                                    {
                                        color?.map((d, i) => {
                                            let a = d?.color
                                            return (
                                                <div key={i} className='d-flex'>
                                                    <input value={a} onChange={(e) => {a = e.target.value}} className='border-0' type="text " />
                                                    <a><i className="fa fa-check p-2 text-success d-block" aria-hidden="true"></i></a>
                                                    <a
                                                    onClick={async () => { let a = await axios.delete(`${process.env.REACT_APP_URL}deleteColors/${d.id}`); if (a) { setRefresh(!refresh) } }}
                                                    >
                                                        <i className="fa fa-trash p-2 text-danger d-block" aria-hidden="true"></i>
                                                    </a>
                                                </div>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                            <div class="dropdown">
                                <a class="btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Add New Size
                                </a>

                                <ul class="dropdown-menu">
                                    <li><a class="dropdown-item" href="#">Action</a></li>
                                    <li><a class="dropdown-item" href="#">Another action</a></li>
                                    <li><a class="dropdown-item" href="#">Something else here</a></li>
                                </ul>
                            </div>
                            <div class="dropdown">
                                <a class="btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Add New Category
                                </a>

                                <ul class="dropdown-menu">
                                    <li><a class="dropdown-item" href="#">Action</a></li>
                                    <li><a class="dropdown-item" href="#">Another action</a></li>
                                    <li><a class="dropdown-item" href="#">Something else here</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className='d-flex'>
                            <div>
                                <div><h6>Add New Color</h6></div>
                                <div className="d-flex">
                                    <input type="text" value={addNewColor} placeholder="Add New Color" onChange={(e) => { setAddNewColor(e.target.value) }} />
                                    <a onClick={handleAddColor} className="px-2">+</a>
                                </div>
                                {
                                    color?.map((d, i) => {
                                        return (
                                            <div key={i} className="d-flex">
                                                <p>{d?.color}
                                                </p>
                                                <a onClick={async () => { let a = await axios.delete(`${process.env.REACT_APP_URL}deleteColors/${d.id}`); if (a) { setRefresh(!refresh) } }}>
                                                    <i class="fa fa-trash ml-3 mt-1" aria-hidden="true"></i>
                                                </a>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div>
                                <div><h6>Add New Size</h6></div>
                                <div className="d-flex">
                                    <input type="text" value={addNewSize} placeholder="Add New Size" onChange={(e) => { setAddNewSize(e.target.value) }} />
                                    <a onClick={handleAddSize} className="px-2">+</a>
                                </div>
                                {
                                    size?.map((d, i) => {
                                        return (
                                            <div key={i} className="d-flex">
                                                <p>{d?.size}
                                                </p>
                                                <a onClick={async () => { let a = await axios.delete(`${process.env.REACT_APP_URL}deleteSize/${d.id}`); if (a) { setRefresh(!refresh) } }}>
                                                    <i class="fa fa-trash ml-3 mt-1" aria-hidden="true"></i>
                                                </a>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div>
                                <div><h6>Add New Category</h6></div>
                                <div className="d-flex">
                                    <input type="text" value={addNewCategory} placeholder="Add New Category" onChange={(e) => { setAddNewCategory(e.target.value) }} />
                                    <a onClick={handleAddcategory} className="px-2">+</a>
                                </div>
                                {
                                    category?.map((d, i) => {
                                        return (
                                            <div key={i} className="d-flex">
                                                <p>{d?.category}
                                                </p>
                                                <a onClick={async () => { let a = await axios.delete(`${process.env.REACT_APP_URL}deleteCategory/${d.id}`); if (a) { setRefresh(!refresh) } }}>
                                                    <i class="fa fa-trash ml-3 mt-1" aria-hidden="true"></i>
                                                </a>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}
