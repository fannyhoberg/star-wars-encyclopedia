import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import logo from "../assets/images/star-wars-seeklogo.svg";

const Navigation = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="md" sticky="top">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          <img
            src={logo}
            alt="Star Wars logo"
            height="30"
            className="d-inline-block align-top"
          />{" "}
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} end to="/films">
              Films
            </Nav.Link>
            <Nav.Link as={NavLink} end to="/people">
              People
            </Nav.Link>

            <Nav.Link as={NavLink} end to="/planets">
              Planets
            </Nav.Link>

            <Nav.Link as={NavLink} end to="/species">
              Species
            </Nav.Link>

            <Nav.Link as={NavLink} end to="/starships">
              Starships
            </Nav.Link>

            <Nav.Link as={NavLink} end to="/vehicles">
              Vehicles
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
