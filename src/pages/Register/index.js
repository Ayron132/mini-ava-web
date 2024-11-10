import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../redux/authSlice';
import { useNavigate } from 'react-router-dom';

import {
  LoginPage,
  LoginContainer,
  Title,
  Form,
  InputGroup,
  Button,
  Error,
} from './style';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('teacher');
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleRegister = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    dispatch(register({ name, email, password, password_confirmation: confirmPassword, role }))
      .then(() => navigate('/home'))
      .catch((err) => console.error(err));
  };

  return (
    <LoginPage>
      <LoginContainer>
        <Title>Cadastro</Title>
        <Form onSubmit={handleRegister}>
          <InputGroup>
            <label>Nome:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </InputGroup>
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
            <label>Senha:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </InputGroup>
          <InputGroup>
            <label>Confirmar Senha:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </InputGroup>
          <InputGroup>
            <label>Role:</label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="teacher">Professor</option>
              <option value="student">Estudante</option>
            </select>
          </InputGroup>
          <Button type="submit" disabled={loading}>
            Cadastrar
          </Button>
          {error && <Error>{typeof error === 'string' ? error : JSON.stringify(error)}</Error>}
        </Form>
      </LoginContainer>
    </LoginPage>
  );
}

export default Register;
