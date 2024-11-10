import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchActivityResponses, fetchPostById } from '../../redux/postsSlice';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaArrowLeft } from 'react-icons/fa';

function ActivityResponses() {
  const { classroomId, postId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { responses, post } = useSelector((state) => state.posts);
  const { headers } = useSelector((state) => state.auth);
  const [selectedResponse, setSelectedResponse] = useState(null);

  useEffect(() => {
    if (headers) {
      dispatch(fetchActivityResponses({ classroomId, postId, headers }));
      dispatch(fetchPostById({ classroomId, postId, headers }));
    }
  }, [dispatch, headers, classroomId, postId]);

  return (
    <Container className="mt-5">
      <h2 className="mb-4 text-center">Respostas para a Atividade</h2>
      <Button 
        variant="link" 
        onClick={() => navigate(`/classrooms/${classroomId}/posts`)} 
        className="mb-4 p-0 text-decoration-none text-muted"
      >
        <FaArrowLeft className="me-2" /> Voltar para postagens
      </Button>

      {/* Verificação de respostas */}
      {responses.length === 0 ? (
        <p className="text-center">Ainda não há respostas para esta atividade.</p>
      ) : (
        <Row className="g-4">
          {responses.map((response) => (
            <Col md={6} lg={4} key={response.id}>
              <Card className="shadow-sm">
                <Card.Body>
                  <Card.Title>{response.user_name || 'Usuário Anônimo'}</Card.Title>
                  <Card.Text>
                    <Button
                      variant="primary"
                      onClick={() => setSelectedResponse(response)}
                      size="sm"
                    >
                      Ver Resposta
                    </Button>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {selectedResponse && (
        <Modal show onHide={() => setSelectedResponse(null)} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Resposta de {selectedResponse.user?.name || 'Usuário'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {post.fields.map((field) => (
              <div key={field.id} className="mb-3">
                <strong>{field.label}:</strong>
                {field.field_type === 'text' ? (
                  <div className="mt-2">{selectedResponse.data[field.id] || 'Sem resposta'}</div>
                ) : (
                  field.options.split(',').map((option, index) => (
                    <Form.Check
                      key={index}
                      type="radio"
                      label={option.trim()}
                      name={`field-${field.id}`}
                      checked={selectedResponse.data[field.id] === option.trim()}
                      readOnly
                      className="mt-2"
                    />
                  ))
                )}
              </div>
            ))}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setSelectedResponse(null)}>
              Fechar
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  );
}

export default ActivityResponses;
