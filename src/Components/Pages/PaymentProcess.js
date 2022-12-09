import React,{useState} from 'react'
import { Modal } from "react-bootstrap";
import Paypal from '../../Assets/images/paypal.png'
import Stipe from '../../Assets/images/strip.png'

function PaymentProcess() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
    
  return (
     <>
      <button className='btn' onClick={handleShow}>
            Save Changes
          </button>
        
     <Modal show={show} onHide={handleClose} className="payTPop">
        <Modal.Header closebutton>
          <Modal.Title>Payment Process</Modal.Title>
          <button variant="secondary" onClick={handleClose}>
            <svg class="svg-inline--fa fa-xmark" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="xmark" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" data-fa-i2svg=""><path fill="currentColor" d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"></path></svg>
          </button>
        </Modal.Header>
        <Modal.Body>
        <div className='processPy'>
          
          <h2>Model Name : 2021 BMW Nexon</h2>
          <h3 className='price__'>Price : $2000</h3>
          <div className='ProcessPymt'>
            <p>Choose Payment Option:</p>
            <img src={Paypal}/>
            <img src={Stipe}/>

            
          </div>
     </div>
        </Modal.Body>
        
      </Modal>

     

     </>
  )
}

export default PaymentProcess