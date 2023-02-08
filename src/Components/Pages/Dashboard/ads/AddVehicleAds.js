const AddVehicleAds = () => {
  return (
    <div
      className="container py-5 px-md-5"
      style={{ minHeight: "100vh", display: "flex", justifyContent: "center" }}
    >
      <div className="row">
        <form>
          <div className="row row_gap_5">
            <div className="col-12 ">
              <label>Vehicle make</label>
              <div className="form-group">
                <input
                  type="text"
                  name="title"
                  className="field"
                  placeholder="Product Name"
                  required
                />
              </div>
            </div>
            <div className="col-12 ">
              <label>image</label>
              <div className="form-group">
                <input
                  type="file"
                  name="image"
                  className="field"
                  placeholder="Product imge"
                />
              </div>
            </div>
            <div className="col-12 ">
              <label>Blog Description</label>
              <div className="form-group">
                <textarea
                  className="field"
                  name="desc"
                  placeholder="Description here"
                  required
                  rows={11}
                ></textarea>
              </div>
            </div>
          </div>
          <div className="form-group">
            <button type="submit" className="btn">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddVehicleAds;
