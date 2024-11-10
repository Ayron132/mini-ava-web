import React, { useState, useEffect } from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPostById, submitActivityResponse } from '../../redux/postsSlice';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaArrowLeft } from 'react-icons/fa'; // Importa o ícone de seta

function ActivityResponse() {
  const { id, classroomId } = useParams(); 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { post } = useSelector((state) => state.posts);
  const { headers } = useSelector((state) => state.auth);
  const [responses, setResponses] = useState({});

  useEffect(() => {
    if (headers) {
      dispatch(fetchPostById({ classroomId, postId: id, headers }));
    }
  }, [dispatch, headers, classroomId, id]);

  const handleResponseChange = (fieldId, option) => {
    setResponses((prevResponses) => ({
      ...prevResponses,
      [fieldId]: option
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const payload = {
      response: {
        data: responses 
      }
    };
    
    dispatch(submitActivityResponse({ classroomId, postId: id, payload, headers }))
      .then(() => navigate(`/classrooms/${classroomId}/posts`));
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow-lg border-0">
            <Card.Body>
              <Button 
                variant="link" 
                onClick={() => navigate(`/classrooms/${classroomId}/posts`)} 
                className="mb-4 p-0 text-decoration-none text-muted"
              >
                <FaArrowLeft className="me-2" /> Voltar para postagens
              </Button>
              <h2 className="text-center mb-4">Responder Atividade</h2>
              <h5 className="text-center text-muted">{post?.title}</h5>
              <Form onSubmit={handleSubmit} className="mt-4">
                {post?.fields?.map((field) => (
                  <Form.Group key={field.id} className="mb-4">
                    <Form.Label className="font-weight-bold">{field.label}</Form.Label>
                    {field.field_type === 'text' ? (
                      <Form.Control
                        type="text"
                        value={responses[field.id] || ''}
                        onChange={(e) => setResponses({ ...responses, [field.id]: e.target.value })}
                        required
                        placeholder="Digite sua resposta"
                      />
                    ) : (
                      field.options.split(',').map((option, index) => (
                        <Form.Check 
                          key={index}
                          type="radio"
                          label={option.trim()}
                          name={`field-${field.id}`}
                          checked={responses[field.id] === option.trim()}
                          onChange={() => handleResponseChange(field.id, option.trim())}
                          className="mt-2"
                        />
                      ))
                    )}
                  </Form.Group>
                ))}
                <div className="d-grid">
                  <Button variant="primary" type="submit" size="lg">Enviar Resposta</Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default ActivityResponse;
