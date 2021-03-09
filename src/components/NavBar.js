import { useKeycloak } from "@react-keycloak/web";
import React, { useState, Fragment } from "react";
import { Link } from "react-router-dom";
import { Nav, Container, Row, Col } from "react-bootstrap";

const NavBar = (props) => {
  const [selectedTab, setSelectedTab] = useState("/");
  const { user } = props;

  const { keycloak, initialized } = useKeycloak();

  const { authenticated } = keycloak;

  const renderAuthLinks = () => {
    console.log("Render auth links - authenticated: ", authenticated);
   

    if (authenticated) {
      return (
        <Row>
          <Col>
            <Nav.Item>
              <Nav.Link eventKey="/" as="div">
                <Link to="/">Home</Link>
              </Nav.Link>
            </Nav.Item>
          </Col>
          <Col xl={5}>
            <Nav.Item>
              <Nav.Link eventKey="/posts" as="div" href="/posts">
                <Link to="/posts">Posts</Link>
              </Nav.Link>
            </Nav.Item>
          </Col>
          <Col>
            <Nav.Item>
              <Nav.Link eventKey="/logoff" as="div" href="#">
                Welcome {user.name}
              </Nav.Link>
            </Nav.Item>
          </Col>
          <Col>
            <Nav.Item>
              <Nav.Link eventKey="/logoff" as="div" href="#" onClick={logout}>
                <Link to="/logoff">Logout</Link>
              </Nav.Link>
            </Nav.Item>
          </Col>
        </Row>
      );
    }

    return (
      <Row>
        <Col xs={7}>
          <Nav.Item>
            <Nav.Link eventKey="/" as="div">
              <Link to="/">Home</Link>
            </Nav.Link>
          </Nav.Item>
        </Col>
        <Col>
          <Nav.Item>
            <Nav.Link eventKey="/login" as="div" href="/#" onClick={login}>
              <Link to="/login">Login</Link>
            </Nav.Link>
          </Nav.Item>
        </Col>
      </Row>
    );
  };

  const selectTab = (selectedKey) => {
    console.log("select tab ", selectedKey);
    console.log("userInfo:", user);
    setSelectedTab(selectedKey);
  };

  const login = async (e) => {
    console.log("login: ", e);
    e.preventDefault();
    await keycloak.login();
  };

  const logout = async (e) => {
    console.log("logout: ", e);
    e.preventDefault();
    await keycloak.logout();
  };

  const links = renderAuthLinks();

  return (
    <Nav
      variant="tabs"
      defaultActiveKey="/"
      activeKey={selectedTab}
      onSelect={selectTab}
    >
      <Container>
      {links}        
      </Container>
    </Nav>
  );
};

export default NavBar;
