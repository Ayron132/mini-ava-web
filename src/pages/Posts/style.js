import styled from 'styled-components';

export const PostsPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

`;

export const Title = styled.h2`
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
`;

export const PostList = styled.div`
  width: 100%;
  max-width: 800px;
`;

export const PostItem = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  background-color: #f9f9f9;
`;

export const Button = styled.button`
  padding: 10px 20px;
  margin-top: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

export const FormContainer = styled.div`
  margin-top: 20px;
  width: 100%;
  max-width: 800px;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  h3 {
    margin-bottom: 10px;
    color: #333;
  }

  form {
    display: flex;
    flex-direction: column;
  }

  input,
  textarea {
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
`;

export const ErrorMessage = styled.p`
  color: red;
  font-weight: bold;
`;

export const BackButton = styled(Button)`
  background-color: #6c757d;
  &:hover {
    background-color: #5a6268;
  }
`;

export const CommentList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-top: 10px;

  li {
    border-top: 1px solid #ddd;
    padding: 10px 0;
  }

  li:first-child {
    border-top: none;
  }

  strong {
    color: #333;
  }

  p {
    margin: 0;
    color: #555;
  }
`;

export const CommentForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 10px;

  textarea {
    padding: 8px;
    margin-bottom: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    resize: vertical;
  }
`;
