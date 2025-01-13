import React from 'react';
import { Container, Nav, Navbar} from 'react-bootstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';

function NavbarPage() {
    return (
        <Container fluid>
            <Navbar expand="lg" className="bg-light border-bottom border-dark">
                <Container fluid>
                    {/* Logo Section */}
                    <div className="d-flex align-items-center ms-5">
                        <span className="fs-1 mt-4 text-shadow">Github-find</span>
                    </div>

                    {/* Toggle Button for Small Screens */}
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
    

                        {/* Navigation Links */}
                        <Nav className="ms-auto me-4">
        
                            <Nav.Link as={NavLink} to="/signup" className="nav-link-custom">
                                SingUp
                            </Nav.Link>
                            <Nav.Link as={NavLink} to="/login" className="nav-link-custom">
                                Login
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </Container>
    );
}

export default NavbarPage;
