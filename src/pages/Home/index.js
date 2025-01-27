import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchClassrooms, createClassroom, joinClassroom } from '../../redux/classroomsSlice';
import { signOut } from '../../redux/authSlice';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import {
  HomePage,
  Title,
  ClassroomList,
  ClassroomItem,
  ErrorMessage,
} from './style';
import NavBar from '../../components/NavBar';

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { classrooms, loading, error } = useSelector((state) => state.classrooms);
  const { headers, user } = useSelector((state) => state.auth);
  const [classroomData, setClassroomData] = useState({ title: '', description: '' });
  const [joinCode, setJoinCode] = useState('');
  
  const [isJoinModalOpen, setJoinModalOpen] = useState(false);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);

  const handleCloseJoinModal = () => setJoinModalOpen(false);
  const handleShowJoinModal = () => setJoinModalOpen(true);

  const handleCloseCreateModal = () => setCreateModalOpen(false);
  const handleShowCreateModal = () => setCreateModalOpen(true);

  useEffect(() => {
    if (headers) {
      dispatch(fetchClassrooms(headers));
    }
  }, [dispatch, headers]);

  const handleCreateClassroom = (e) => {
    e.preventDefault();
    if (headers) {
      dispatch(createClassroom({ classroomData, headers }));
      setClassroomData({ title: '', description: '' });
      handleCloseCreateModal();
      dispatch(fetchClassrooms(headers));
    }
  };

  const handleSignOut = () => {
    if (headers) {
      dispatch(signOut(headers)).then(() => {
        navigate('/');
      });
    }
  };

  const handleViewPosts = (id) => {
    navigate(`/classrooms/${id}/posts`);
  };

  const handleJoinClassroom = (e) => {
    e.preventDefault();
    if (headers) {
      dispatch(joinClassroom({ code: joinCode, headers }));
      setJoinCode('');
      handleCloseJoinModal();
      dispatch(fetchClassrooms(headers));
    }
  };

  return (
    <HomePage>
      <NavBar
        user={user && user.data} 
        signOut={handleSignOut} 
        handleShowJoinModal={handleShowJoinModal}
        handleShowCreateModal={handleShowCreateModal} 
      />
      <Title style={{marginTop: 20}}>Suas turmas</Title>
      {loading && <p>Carregando...</p>}
      {error && <ErrorMessage>{error}</ErrorMessage>}
      
      {classrooms.length === 0 ? (
        <p>Não há turmas cadastradas.</p> // Exibe a mensagem caso não haja turmas
      ) : (
        <ClassroomList>
          {classrooms.map((classroom) => (
            <ClassroomItem key={classroom.id}>
              <h3>{classroom.title}</h3>
              <p>{classroom.description}</p>
              <p>Código da turma: {classroom.code}</p>
              <Button onClick={() => handleViewPosts(classroom.id)}>Ver postagens</Button>
            </ClassroomItem>
          ))}
        </ClassroomList>
      )}

      <Modal
        centered
        show={isJoinModalOpen}
        onHide={handleCloseJoinModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Ingressar em uma turma</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Código da turma</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              autoFocus
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseJoinModal}>Fechar</Button>
          <Button variant="primary" onClick={handleJoinClassroom}>Entrar</Button>
        </Modal.Footer>
      </Modal>

      <Modal
        centered
        show={isCreateModalOpen}
        onHide={handleCloseCreateModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Criar nova turma</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formClassroomTitle">
              <Form.Label>Título</Form.Label>
              <Form.Control
                type="text"
                placeholder="Título"
                value={classroomData.title}
                onChange={(e) => setClassroomData({ ...classroomData, title: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formClassroomDescription">
              <Form.Label>Descrição</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Descrição"
                value={classroomData.description}
                onChange={(e) => setClassroomData({ ...classroomData, description: e.target.value })}
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCreateModal}>Fechar</Button>
          <Button variant="primary" onClick={handleCreateClassroom}>Criar nova turma</Button>
        </Modal.Footer>
      </Modal>
    </HomePage>
  );
}

export default Home;
