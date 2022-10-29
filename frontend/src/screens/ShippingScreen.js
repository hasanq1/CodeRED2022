import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { saveShippingAddress } from '../actions/cartActions'


const ShippingScreen = ({ history }) => {

    const orderListMy2 = useSelector((state) => state.orderListMy)
    const { loading: loadingOrders, error: errorOrders, orders } = orderListMy2

  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  const [address, setAddress] = useState(shippingAddress.address)
  const [addressOpt, setAddressOpt] = useState(shippingAddress.addressOpt)
  const [city, setCity] = useState(shippingAddress.city)
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
  const [states, setStates] = useState(shippingAddress.state)
  const [before, setBefore] = useState(shippingAddress.before)



  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
      dispatch(saveShippingAddress({ address, addressOpt, city, postalCode, states, before }))
    history.push('/payment')
  }


    return (

    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='address'>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter address'
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='addressOpt'>
          <Form.Label>Address 2</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter address (optional)'
            value={addressOpt}
            onChange={(e) => setAddressOpt(e.target.value)}
          ></Form.Control>
                </Form.Group>

        <Form.Group controlId='city'>
          <Form.Label>City</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter city'
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='postalCode'>
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter postal code'
            value={postalCode}
            required
            onChange={(e) => setPostalCode(e.target.value)}
          ></Form.Control>
        </Form.Group>

        
        <Form.Group controlId='states'>
          <Form.Label>State of Residence</Form.Label>
          <Form.Control
          as='select'
          custom
          value={states}
          onChange={(e) => setStates(e.target.value)}>
          
          <option value='AL'>ALABAMA</option> <option value='AK'>ALASKA</option> <option value='AZ'>ARIZONA</option> 
          <option value='AR'>ARKANSAS</option> <option value='CA'>CALIFORNIA</option> <option value='CO'>COLORADO</option> 
          <option value='CT'>CONNETTICUT</option> <option value='DE'>DELAWARE</option> <option value='FL'>FLORIDA</option> 
          <option value='GA'>GEORGIA</option> <option value='HI'>HAWAII</option> <option value='ID'>IDAHO</option> 
          <option value='IL'>ILLINOIS</option> <option value='IN'>INDIANA</option> <option value='IA'>IOWA</option> 
          <option value='KS'>KANSAS</option> <option value='KY'>KENTUCKY</option> <option value='LA'>LOUISIANA</option> 
          <option value='ME'>MASSACHUSETS</option> <option value='MH'>MICHIGAN</option> <option value='MD'>MARYLAND</option> 
          <option value='MA'>MAINE</option> <option value='MI'>MISSOURI</option> <option value='MN'>MINNESOTA</option> 
          <option value='MS'>MISSISSIPPI</option> <option value='MO'>MONTANA</option> <option value='NE'>NEBRASKA</option> 
          <option value='NV'>NEVADA</option> <option value='NH'>NEW HAMPSHIRE</option> <option value='NJ'>NEW JERSEY</option> 
          <option value='NM'>NEW MEXICO</option> <option value='NY'>NEW YORK</option> <option value='NC'>NORTH CAROLINA</option> 
          <option value='ND'>NORTH DAKOTA</option> <option value='OH'>OHIO</option> <option value='OK'>OKLAHOMA</option> 
          <option value='OR'>OREGON</option> <option value='PA'>PENNSYLVAINIA</option> <option value='RI'>RHODE ISLAND</option> 
          <option value='SC'>SOUTH CAROLINA</option> <option value='SD'>SOUTH DAKOTA</option> <option value='TN'>TENNESSEE</option> 
          <option value='TX'>TEXAS</option> <option value='UT'>UTAH</option> <option value='VT'>VERMONT</option> 
          <option value='VI'>VIRGINIA</option> <option value='WA'>WASHINGTON</option> <option value='WV'>WEST VIRGINIA</option> 
          <option value='WI'>WISCONSIN</option> <option value='WY'>WYOMING</option>
          </Form.Control>
        </Form.Group>


                <Form.Group controlId='Orderbefore'>
                    <Form.Label>Have you ordered before?</Form.Label>
                    <Form.Control
                        as='select'
                        custom
                        value={before}
                        onChange={(e) => setBefore(e.target.value)}>
                        <option disabled> If you have ordered before you will have the option to click yes </option> 
                        <option > No </option>
                        {orders.slice(0, 1).map((order) => (
                            <option value="yes" > Yes </option>
                        ))} 
                    </Form.Control>
                </Form.Group>

        <Button type='submit' variant='primary'>
          Continue
        </Button>
      </Form>
    </FormContainer>


  )
}

export default ShippingScreen