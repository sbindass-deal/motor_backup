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
        
     <Modal show={show} onHide={handleClose}>
        <Modal.Header closebutton>
          <Modal.Title>Payment Process</Modal.Title>
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
        <Modal.Footer>
          <button variant="secondary" onClick={handleClose}>
            Close
          </button>
          <button variant="primary" onClick={handleClose}>
            Save Changes
          </button>
        </Modal.Footer>
      </Modal>

     

     </>
  )
}

export default PaymentProcess