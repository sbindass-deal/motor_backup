import React,{useState} from 'react'
import "react-credit-cards/es/styles-compiled.css";
import Cards from "react-credit-cards";

const CreditCard = () => {
    const [number, SetNumber] = useState("");
    const [name, SetName] = useState("");
    const [date, SetDate] = useState("");
    const [cvc, SetCvc] = useState("");
    const [focus, SetFocus] = useState("");


    const handleSubmit = (e) => {
        e.preventDefault()
    }

  return (
      <div>

          <div clasName="rccs__card rccs__card--unknown">
              <Cards
                  number={number}
                  name={name}
                  expiry={date}
                  cvc={cvc}
                  focused={focus}
              />
          </div>

          <br />
          <form>
              <div className="row">
                  <div className="col-sm-11">
                      <label for="name">Card Number</label>
                      <input
                          type="text"
                          className="form-control"
                          value={number}
                          name="number"
                          onChange={(e) => {
                              SetNumber(e.target.value);
                          }}
                          onFocus={(e) => SetFocus(e.target.name)}
                      ></input>
                  </div>
              </div>
              <br />
              <div className="row">
                  <div className="col-sm-11">
                      <label for="name">Card Name</label>
                      <input
                          type="text"
                          className="form-control"
                          value={name}
                          name="name"
                          onChange={(e) => {
                              SetName(e.target.value);
                          }}
                          onFocus={(e) => SetFocus(e.target.name)}
                      ></input>
                  </div>
              </div>
              <br />
              <div className="row">
                  <div className="col-sm-6">
                      <label for="name">Expiration Date</label>
                      <input
                          type="text"
                          name="expiry"
                          className="form-control"
                          value={date}
                          onChange={(e) => {
                              SetDate(e.target.value);
                          }}
                          onFocus={(e) => SetFocus(e.target.name)}
                      ></input>
                  </div>
                  <div className="col-sm-5">
                      <label for="name">CVV</label>
                      <input
                          type="tel"
                          name="cvc"
                          className="card"
                          value={cvc}
                          onChange={(e) => {
                              SetCvc(e.target.value);
                          }}
                          onFocus={(e) => SetFocus(e.target.name)}
                      ></input>
                  </div>
                  <div>
                      
                  <button type='submit' className='btn mt-4' onClick={handleSubmit}>Submit</button>
</div>
              </div>
          </form>
      </div>
  )
}

export default CreditCard