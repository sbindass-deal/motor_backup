import React from 'react'

export default function CheckoutDetails() {

  const [data,setData]=React.useState([])

  const inputHandle=(e)=>{
    e.preventDefault();
    setData((pre)=>({...pre,[e.target.name]:e.target.value}))
    
    console.log(data)
  }
  return (<>
    <div className='container pt-5' style={{minHeight:"100vh"}}>
    <form class="row g-5 col-sm" onSubmit={inputHandle}>
  <div class="col-md-6">
    <label for="validationDefault01" class="form-label">name</label>
    <input type="text" 
    name="name"
    value={data.name}
    onChange={inputHandle}
    class="form-control" id="validationDefault01" required/>
  </div>
  <div class="col-md-6">
    <label for="validationDefault02" class="form-label">Email</label>
    <input type="text" 
    name="email"
    value={data.email}
    onChange={inputHandle}

    class="form-control" id="validationDefault02"  required/>
  </div>
  <div class="col-md-6">
    <label for="validationDefaultUsername" class="form-label">address</label>
    <div class="input-group">
      <input type="text"
      name="address"
      value={data.address}
    onChange={inputHandle}

       class="form-control" id="validationDefaultUsername"  aria-describedby="inputGroupPrepend2" required />
    </div>
  </div>
   <div class="col-md-6">
    <label for="validationDefault03" class="form-label">Phone</label>
    <input type="text"
    name="phone"
    value={data.phone}
    onChange={inputHandle}

     class="form-control" id="validationDefault03" required />
  </div>
  
  <div class="col-md-6 ">
    <label for="validationDefault04" class="form-label">Delivery type</label>
    <select class="form-select w-100" id="validationDefault04" 
    name="deliveryType"
    value={data.deliveryType}
    onChange={inputHandle}
    required >
      <option selected disabled value="">Choose...</option>
      <option value="cash on delivery">cash on delivery</option>
      <option value="online pay">online pay</option>
    </select>
  </div>
  
  {/* <div class="col-12 mt-3">
    <div class="form-check">
      <input class="form-check-input" type="checkbox" value="" id="invalidCheck2" required />
      <label class="form-check-label" for="invalidCheck2">
        Agree to terms and conditions
      </label>
    </div>
  </div> */}
  <div class="col-6">
    <button class="btn btn-primary mt-3" type='submit'>Submit form</button>
  </div>
</form>

    </div>
    </>);
}
