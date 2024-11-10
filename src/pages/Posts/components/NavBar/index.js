import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function NavBar(props) {
  return (
    <Navbar expand="lg" className="bg-body-tertiary w-100 border-bottom">
      <Container>
        <Navbar.Brand>Sala de Aula</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {props.user && props.user.role !== 'student' && ( <Nav.Link  onClick={props.handleShowCreatePostModal}>Nova postagem</Nav.Link> )}
            <NavDropdown title={props.user && props.user.name} id="basic-nav-dropdown" className="justify-content-end">
              <NavDropdown.Item href="#action/3.2" onClick={() =>{props.signOut()}}>
                Sair
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;