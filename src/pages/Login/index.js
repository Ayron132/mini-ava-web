import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; 
import { login, restoreLogin  } from '../../redux/authSlice';

import {
  LoginPage,
  LoginContainer,
  Title,
  Form,
  InputGroup,
  Button,
  Error,
} from './style';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector((state) => state.auth);

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  useEffect(() => {
    dispatch(restoreLogin());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      navigate('/home');
    }
  }, [user, navigate]);

  return (
    <LoginPage>
      <LoginContainer>
        <Title>Login</Title>
        <Form onSubmit={handleLogin}>
          <InputGroup>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </InputGroup>
          <InputGroup>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </InputGroup>
          <Button type="submit" disabled={loading}>
            Entrar
          </Button>
          <Button onClick={() => navigate('/register')}>Cadastrar</Button>
          {error && <Error>{error}</Error>}
        </Form>
      </LoginContainer>
      
    </LoginPage>
  );
}

export default Login;
