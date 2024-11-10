import styled from 'styled-components';

export const HomePage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

`;

export const Title = styled.h2`
  margin-top: 20px;
`;

export const ClassroomList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  width: 100%;
  max-width: 1200px;
  margin-top: 20px;
`;

export const ClassroomItem = styled.div`
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.02);
  }

  h3 {
    font-size: 1.2em;
    margin-bottom: 8px;
  }

  p {
    font-size: 1em;
    color: #666;
    margin-bottom: 12px;
  }

  button {
    margin-top: 8px;
  }
`;

export const ErrorMessage = styled.p`
  color: red;
  font-weight: bold;
`;
