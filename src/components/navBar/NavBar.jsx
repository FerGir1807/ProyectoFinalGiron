import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

function NavBar() {
    return (
        <>
            <Navbar bg="primary" data-bs-theme="dark" sticky="top">
                <Container>
                    <Navbar.Brand href="/"><i className="bi bi-shop text-info"></i></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/productos/damas">Damas</Nav.Link>
                            <Nav.Link as={Link} to="/productos/caballeros">Caballeros</Nav.Link>
                            <Nav.Link as={Link} to="/productos/accesorios">Accesorios</Nav.Link>
                            <Nav.Link as={Link} to="/orders">Ordenes completas</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}
export default NavBar