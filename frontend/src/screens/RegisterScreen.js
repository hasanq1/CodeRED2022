import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { register } from '../actions/userActions'

const RegisterScreen = ({ location, history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [company, setCompany] = useState('')
  const [states, setStates] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const userRegister = useSelector((state) => state.userRegister)
  const { loading, error, userInfo } = userRegister

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(register(name, email, password, company, states))
    }
  }

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='confirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='company'>
          <Form.Label>Enter Company</Form.Label>
          <Form.Control
            type='company'
            placeholder='Enter company'
            value={company}
            onChange={(e) => setCompany(e.target.value)}
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

    
    

        <Button type='submit' variant='primary'>
          Register
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          Have an Account?{' '}
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default RegisterScreen
