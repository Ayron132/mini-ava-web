import styled from 'styled-components';

export const LoginPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  padding: 0;
  margin: 0;
 
`;

export const LoginContainer = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  text-align: center;
`;

export const Title = styled.h2`
  margin-bottom: 24px;
  color: #333333;
  font-size: 1.8rem;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  
`;

export const InputGroup = styled.div`
  margin-bottom: 16px;
  text-align: left;
  box-sizing: border-box;
  width: 100%;
  label {
    display: block;
    margin-bottom: 8px;
    font-size: 0.9rem;
    color: #666666;
  }

  input {
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ddd;
    font-size: 1rem;

    &:focus {
      outline: none;
      border-color: #4a90e2;
    }
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: 12px;
  margin-top: 12px;
  font-size: 1rem;
  color: #ffffff;
  background-color: #4a90e2;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }

  &:hover {
    background-color: #357abd;
  }
`;

export const Error = styled.p`
  color: red;
  font-size: 0.9rem;
  margin-top: 10px;
`;