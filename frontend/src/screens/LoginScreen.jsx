//package imports
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
//app imports
import FormContainer from '../components/utility/FormContainer';
import Message from '../components/utility/Message';
import Loader from '../components/utility/Loader';
import { login } from '../store/slices/userAuth';

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const user = useSelector((state) => state.features.userAuth);
  const { loading, error, userLogin } = user;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  //figure out why it would be good to put a redirect here rather than
  //pushing straight to profile page
  useEffect(() => {
    if (userLogin.name) {
      history.push('/profile');
    }
  }, [history, userLogin, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}></Form.Control>
        </Form.Group>
        <Button type='submit' variant='primary'>
          Sign In
        </Button>
      </Form>
      <Row className='py-3'>
        <Col>
          New Here?{' '}
          <Link to={redirect ? `/register?redirect=${redirect}` : `/register`}>
            Register 🌞
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
