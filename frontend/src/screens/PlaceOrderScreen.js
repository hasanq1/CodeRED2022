import React, { useState, useEffect } from 'react'
import { Link, Router } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'
import { createOrder, listMyOrders  } from '../actions/orderActions'
import { ORDER_CREATE_RESET } from '../constants/orderConstants'
import { USER_DETAILS_RESET } from '../constants/userConstants'
import { OrderCheck } from './OrderCheck'

const PlaceOrderScreen = ({ match, history }) => {

  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)


  if (!cart.shippingAddress.address) {
    history.push('/shipping')
  } else if (!cart.paymentMethod) {
    history.push('/payment')
  }
  //   Calculate prices
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }


    cart.itemsPrice2 = cart.cartItems.reduce((acc, item) => acc + item.qty, 0)



    var x;
    var z;

    if (cart.shippingAddress.states == "TX") {
        cart.shippingPrice = .02
    }
    else {
        cart.shippingPrice = .04
    }


    if (cart.shippingAddress.before == "yes") {
        cart.orderbefore = -.01
    }
    else {
        cart.orderbefore = 0
    }

    if (cart.itemsPrice2 > 1000 ) {
        x = .02
    }
    else {
        x = .03
    }        

    var y; 
     y = .1 


  cart.totalPrice = (
    Number(cart.shippingPrice) +
    Number(cart.orderbefore) +
    Number(x) + 
    Number (y)
    ).toFixed(2)

    cart.itemsQuan = cart.cartItems.reduce((acc, item) => acc + item.qty, 0)

    cart.itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.price, 0)

    var taxes = (Number(cart.itemsPrice) * Number(cart.totalPrice)).toFixed(3)
    var sugPrice = (Number(taxes) + Number(cart.itemsPrice)).toFixed(3)
    var finalPrice = (Number(cart.itemsQuan) * Number(sugPrice)).toFixed(2)

    const orderCreate = useSelector((state) => state.orderCreate)
    const { order, success, error } = orderCreate

    useEffect(() => {
        dispatch(listMyOrders())
    }, [dispatch])

  useEffect(() => {
    if (success) {
      history.push('/profile')
      dispatch({ type: USER_DETAILS_RESET })
      dispatch({ type: ORDER_CREATE_RESET })
    }
    // eslint-disable-next-line
  }, [history, success])

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        orderbefore: cart.orderbefore,
        totalPrice: finalPrice,
        Quantity: x, 
        Companys: y,
        Margin: taxes,
        Suggested: sugPrice,
        TaxPrice: z
      })
    )
  }

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address:</strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.setAddressOpt}, {cart.shippingAddress.city}{' '}
                {cart.shippingAddress.postalCode},{' '}
                {cart.shippingAddress.states}
              </p>
            </ListGroup.Item>


            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          Quantity: {item.qty} 
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Quote Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>{cart.itemsPrice2}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Location Factor</Col>
                  <Col>${cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Rate History Factor</Col>
                  <Col>${cart.orderbefore}</Col>
                </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                <Row>
                  <Col>Gallons Requested Factor </Col>
                  <Col>${x}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                  <Col>Company Profit Factor</Col>
                  <Col>${y}</Col>
                </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                  <Col>Margin</Col>
                  <Col>${taxes}</Col>
                </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                  <Col>Suggested Price/Gallon</Col>
                  <Col>${sugPrice}</Col>
                </Row>
                </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${finalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && <Message variant='danger'>{error}</Message>}
              </ListGroup.Item>
             
              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-block'
                  disabled={cart.cartItems === 0}
                  onClick={placeOrderHandler}>
                  Save Quote
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default PlaceOrderScreen