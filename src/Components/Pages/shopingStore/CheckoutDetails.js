import React from 'react'
import FormInput from '../../UI/FormInput';

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
    <FormInput 
    name="name"
    value={data.name}
    onChange={inputHandle}
    label="Name"
    class="form-control" id="validationDefault01" required={true}/>
  </div>
  <div class="col-md-6">
    <FormInput
    name="email"
    value={data.email}
    onChange={inputHandle}
    label="Email"
    class="form-control" id="validationDefault02"  required={true}/>
  </div>
  <div class="col-md-6">
    <FormInput
    name="phone"
    value={data.phone}
    onChange={inputHandle}
    label="Phone"
    pattern="^[0-9]{1,10}$"
    errorMessage="only use valid phone number"
     class="form-control" id="validationDefault03" required={true} />
  </div>
  
  <div class="col-md-6">
    <label for="validationDefaultUsername" class="form-label">Address</label>
    <div class="input-group">
      <textarea 
      name="address"
      value={data.address}
    onChange={inputHandle}

       class="form-control" id="validationDefaultUsername"  aria-describedby="inputGroupPrepend2" required />
    </div>
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
  <div class="col-md-6">
    <FormInput
    name="pincode"
    value={data.pincode}
    onChange={inputHandle}
    label="Pincode"
    pattern="^[0-9]{1,9}$"
    errorMessage="only use valid pincode number"
    class="form-control" id="validationDefault03" required={true} />
  </div>
  <div class="col-6">

    <button class="btn btn-primary mt-3" type='submit'>Place Order</button>
  </div>
</form>

    </div>
    </>);
}


 
