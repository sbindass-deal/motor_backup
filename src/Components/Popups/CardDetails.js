import React, { useState } from 'react'
import FormInput from '../UI/FormInput'


const CardDetails = ( {inputValue,getInputField}) => {
  return (
    <div className='container col-md col-sm p-3' style={{backgroundColor:"#000"}}>

        <div class="row g-3 needs-validation"   >
  <div class="col-md-12 position-relative">
    <FormInput type="text" 
    class="form-control" 
    name='name'
    value={inputValue.name}
    onChange={getInputField}
    label="name (as it appears on your card)"
    errorMessage="use please vaild name"
    pattern="^[A-Za-z ]{3,16}$"

     required={true}/>
    
  </div>
  <div class="col-md-12 position-relative">
    <FormInput type="text" class="form-control"
    name='phone'
    value={inputValue.phone} 
    onChange={getInputField}
label="Phone"
errorMessage="use only valid phone number"
pattern="^[0-9]{10,12}$"
required={true}/>

    
  </div>
  <div class="col-md-12 position-relative">
      <FormInput  class="form-control" 
      name='address'
      value={inputValue.address}
      onChange={getInputField}
     label="Address"
     errorMessage="use please valid address"
      required={true}/>
  </div>

      
  <div class="col-md-12 position-relative">
    <FormInput type="text" class="form-control"
    name='zip'
    value={inputValue.zip}
    onChange={getInputField}
label="Zip / Postal Code"
errorMessage="please vaild 16 digits zip code"
pattern="^[0-9]{3,16}"
     require={true}/>
    
  </div>
  <div class="col-md-12 position-relative">
    <FormInput type="text" class="form-control" 
    name='country'
    value={inputValue.country}
    onChange={getInputField}
    label="Country"
    errorMessage="use  vaild country"
    pattern="^[A-Za-z ]{3,10}$"
    required={true}/>

    
  </div>
  <div class="col-md-12 position-relative">
    <FormInput type="text" class="form-control"
    name='cardnumber'
    value={inputValue.cardnumber}
    onChange={getInputField}
label="Credit Card Number"
errorMessage="please vaild 16 digits card number"
pattern='^[0-9]{6,16}$'
     required={true}/>
   
  </div>
  <div class="col-md-6 position-relative">
    <label for="validationTooltip04" class="form-label">Expiration</label> <br/>
    <select class="form-select" 
    name='month'
    value={inputValue.month}
    onChange={getInputField}
    required>
      <option selected disabled value="">Choose...</option>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
      <option value="6">6</option>
      <option value="7">7</option>
      <option value="8">8</option>
      <option value="9">9</option>
      <option value="10">10</option>
      <option value="11">11</option>
      <option value="12">12</option>
    </select>

    <select class="form-select" 
    name="year"
    value={inputValue.year}
    onChange={getInputField}

    required>
      <option selected disabled value="">Choose...</option>
      <option value="2023">2023</option>
      <option value="2024">2024</option>
      <option value="2025">2025</option>
      <option value="2026">2026</option>
      <option value="2027">2027</option>
      <option value="2028">2028</option>
      <option value="2029">2029</option>
      <option value="2030">2030</option>
      <option value="2031">2031</option>
      <option value="2032">2032</option>
    </select>
    
  </div> 
  <div class="col-md-12 position-relative">
    <FormInput type="text" class="form-control" 
    name="cvc"
    value={inputValue.cvc}
    onChange={getInputField}
    label="CVC (3 or 4 digit code)"
    errorMessage="valid cvc number"
    pattern="^[0-9]{3,4}$"
    required={true}/>
  </div>

   
  <div class="col-md-12 position-relative">
    <label for="validationTooltip05" class="form-label">
Where did you hear about BaT?</label>
    <select type="text" class="form-control" 
    name='bat'
    value={inputValue.bat}
    onChange={getInputField}

    required>
    <option value="facebook">facebook </option>
    <option value="instagram">instagram </option>
    <option value="Google">Google </option>
    </select>
  </div>
  
</div>
    </div>
  )
}

export default CardDetails