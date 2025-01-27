import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPosts, createPost, fetchComments, createComment } from '../../redux/postsSlice';
import { signOut } from '../../redux/authSlice';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FaArrowLeft, FaComments, FaPlus, FaPaperPlane } from 'react-icons/fa';
import {
  PostsPage,
  Title,
  PostList,
  PostItem,
  CommentList,
  CommentForm,
  FormContainer,
  BackButton,
  ErrorMessage,
} from './style';
import NavBar from '../../components/NavBar';

function Posts() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { posts, loading, error } = useSelector((state) => state.posts);
  const { headers, user } = useSelector((state) => state.auth);

  const [postData, setPostData] = useState({ title: '', description: '', post_type: 'comunicado' });
  const [activityFields, setActivityFields] = useState([{ field_type: 'text', label: '', options: '' }]);
  const [commentData, setCommentData] = useState({});
  const [isCreatePostModalOpen, setCreatePostModalOpen] = useState(false);
  const [expandedComments, setExpandedComments] = useState({});

  useEffect(() => {
    if (headers) {
      dispatch(fetchPosts({ classroomId: id, headers }));
    }
  }, [dispatch, headers, id]);

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (headers) {
      const newPostData = { ...postData };
      if (postData.post_type === 'atividade') {
        newPostData.fields_attributes = activityFields;
      }
      dispatch(createPost({ classroomId: id, postData: newPostData, headers }));
      setPostData({ title: '', description: '', post_type: 'comunicado' });
      setActivityFields([{ field_type: 'text', label: '', options: '' }]);
      setCreatePostModalOpen(false);
    }
  };

  const handlePostTypeChange = (e) => {
    const postType = e.target.value;
    setPostData({ ...postData, post_type: postType });
    if (postType === 'atividade') {
      setActivityFields([{ field_type: 'text', label: '', options: '' }]);
    } else {
      setActivityFields([]);
    }
  };

  const handleFieldChange = (index, key, value) => {
    const updatedFields = [...activityFields];
    updatedFields[index][key] = value;
    setActivityFields(updatedFields);
  };

  const handleAddField = () => {
    setActivityFields([...activityFields, { field_type: 'text', label: '', options: '' }]);
  };

  const handleBack = () => {
    navigate('/home');
  };

  const handleFetchComments = (postId) => {
    if (headers) {
      dispatch(fetchComments({ classroomId: id, postId, headers }));
      setExpandedComments({ ...expandedComments, [postId]: !expandedComments[postId] });
    }
  };

  const handleSignOut = () => {
    if (headers) {
      dispatch(signOut(headers)).then(() => {
        navigate('/');
      });
    }
  };

  const handleCreateComment = (postId) => {
    if (headers) {
      const content = commentData[postId] || '';
      dispatch(createComment({ classroomId: id, postId, commentData: { content }, headers }));
      setCommentData({ ...commentData, [postId]: '' });
    }
  };

  return (
    <PostsPage>
       <NavBar
        user={user}
        handleShowCreatePostModal={() => setCreatePostModalOpen(true)}
        signOut={handleSignOut}
      />
      {loading && <p>Carregando postagens...</p>}
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <PostList>
        <div style={{ display: 'flex', width: '100%', marginBottom: 20, marginTop: 20, justifyContent: 'space-between' }}>
          <Button
            variant="link"
            onClick={handleBack}
            className="p-0 text-decoration-none text-muted"
            style={{ minWidth: 150 }}
          >
            <FaArrowLeft className="me-2" /> Voltar para salas
          </Button>

          <h2 style={{ flex: 1, textAlign: 'center', margin: 0 }}>Postagens da Sala de Aula {id}</h2>
          <div style={{ minWidth: 150 }}></div>
        </div>

        {posts.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'gray' }}>Não há postagens disponíveis nesta sala de aula.</p>
        ) : posts.map((post) => (
          <PostItem key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.description}</p>

            <Button variant="outline-primary"  onClick={() => handleFetchComments(post.id)}>
              <FaComments className="me-2" />
              {expandedComments[post.id] ? 'Ocultar Comentários' : 'Comentários'}
            </Button>

            {user && user.data.role === 'teacher' && post.post_type === 'atividade' && (
              <Button
                variant="primary"
                style={{marginLeft: 20}}
                onClick={() => navigate(`/classrooms/${id}/posts/${post.id}/responses`)}
              >
                Ver Respostas
              </Button>
            )}

            {post.post_type === 'atividade' && (
              <Button variant="primary" style={{marginLeft: 20}} onClick={() => navigate(`/classrooms/${id}/posts/${post.id}/response`)}>
                Responder Atividade
              </Button>
            )}

            {expandedComments[post.id] && (
              <>
                <CommentList>
                  {post.comments && post.comments.map((comment) => (
                    <li key={comment.id}>
                  
                      <strong>{comment.user?.name || user.data.name}</strong>: {comment.content}
                    </li>
                  ))}
                </CommentList>
                <CommentForm>
                  <textarea
                    placeholder="Escreva um comentário..."
                    value={commentData[post.id] || ''}
                    onChange={(e) => setCommentData({ ...commentData, [post.id]: e.target.value })}
                    required
                  />
                  <Button variant="primary" onClick={() => handleCreateComment(post.id)}>
                    <FaPaperPlane className="me-2" /> Comentar
                  </Button>
                </CommentForm>
              </>
            )}
          </PostItem>
        ))}
      </PostList>

      {user && user.data.role !== 'student' && (
        <Modal
          centered
          show={isCreatePostModalOpen}
          onHide={() => setCreatePostModalOpen(false)}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Criar Novo Post</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formPostTitle">
                <Form.Label>Título</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Título"
                  value={postData.title}
                  onChange={(e) => setPostData({ ...postData, title: e.target.value })}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formPostDescription">
                <Form.Label>Descrição</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Descrição"
                  value={postData.description}
                  onChange={(e) => setPostData({ ...postData, description: e.target.value })}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formPostType">
                <Form.Label>Tipo de Post</Form.Label>
                <Form.Control as="select" value={postData.post_type} onChange={handlePostTypeChange}>
                  <option value="comunicado">Comunicado</option>
                  <option value="atividade">Atividade</option>
                </Form.Control>
              </Form.Group>

              {postData.post_type === 'atividade' && (
                <>
                  <h5>Campos da Atividade</h5>
                  {activityFields.map((field, index) => (
                    <div key={index} style={{ marginBottom: '1em' }}>
                      <Form.Group controlId={`fieldType-${index}`}>
                        <Form.Label>Tipo de Campo</Form.Label>
                        <Form.Control
                          as="select"
                          value={field.field_type}
                          onChange={(e) => handleFieldChange(index, 'field_type', e.target.value)}
                        >
                          <option value="text">Texto</option>
                          <option value="checkbox">Checkbox</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group className='mt-2' controlId={`fieldLabel-${index}`}>
                        <Form.Label>Label</Form.Label>
                        <Form.Control
                          type="text"
                          value={field.label}
                          onChange={(e) => handleFieldChange(index, 'label', e.target.value)}
                          required
                        />
                      </Form.Group>
                      {field.field_type === 'checkbox' && (
                        <Form.Group controlId={`fieldOptions-${index}`}>
                          <Form.Label>Opções (separadas por vírgula)</Form.Label>
                          <Form.Control
                            type="text"
                            value={field.options}
                            onChange={(e) => handleFieldChange(index, 'options', e.target.value)}
                          />
                        </Form.Group>
                      )}
                    </div>
                  ))}
                  <Button variant="link" onClick={handleAddField}>
                    <FaPlus /> Adicionar Campo
                  </Button>
                </>
              )}

              
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setCreatePostModalOpen(false)}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={handleCreatePost}>
                Criar postagem
              </Button>
          </Modal.Footer>
        </Modal>
      )}
    </PostsPage>
  );
}

export default Posts;
