import { useKeycloak } from "@react-keycloak/web";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Nav, Container, Row, Col } from "react-bootstrap";

import AppContext from "../context/AppContext";

const NavBar = (props) => {
  const [selectedTab, setSelectedTab] = useState("/");
  const { keycloak, initialized } = useKeycloak();
  const { user } = useContext(AppContext);
  const { authenticated } = keycloak;

  const renderAuthLinks = () => {
    console.log(
      "Render auth links - initialized:",
      initialized,
      ", authenticated: ",
      authenticated
    );

    if (authenticated) {
      return (
        <Row noGutters>
          <Col md={1} lg={1} xl={1}>
            <Nav.Item style={{ textAlign: "left" }}>
              <Nav.Link eventKey="/" href="/" as="div">
                <Link to="/">Home</Link>
              </Nav.Link>
            </Nav.Item>
          </Col>
          <Col md={6} lg={6} xl={6}>
            <Nav.Item style={{ textAlign: "left" }}>
              <Nav.Link eventKey="/posts" href="/posts" as="div">
                <Link to="/posts">Posts</Link>
              </Nav.Link>
            </Nav.Item>
          </Col>
          <Col md={4} lg={3} xl={3}>
            <Nav.Item>
              <Nav.Link eventKey="/logoff" href="#" as="div" disabled>
                Welcome {user.name}
              </Nav.Link>
            </Nav.Item>
          </Col>
          <Col md={1} lg={2} xl={2}>
            <Nav.Item>
              <Nav.Link eventKey="/logoff" href="#" onClick={logout} as="div">
                <Link to="/logoff">Logout</Link>
              </Nav.Link>
            </Nav.Item>
          </Col>
        </Row>
      );
    }

    return (
      <Row noGutters>
        <Col md={10} lg={10} xl={10}>
          <Nav.Item style={{ textAlign: "left" }}>
            <Nav.Link eventKey="/" as="div">
              <Link to="/">Home</Link>
            </Nav.Link>
          </Nav.Item>
        </Col>
        <Col md={2} lg={2} xl={2}>
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

  console.log("userInfo:", user);

  const links = renderAuthLinks();

  return (
    <Nav
      // variant="tabs"
      // fill
      defaultActiveKey="/"
      activeKey={selectedTab}
      onSelect={selectTab}
      style={{ backgroundColor: "cyan" }}
    >
      <Container>{links}</Container>
    </Nav>
  );
};

export default NavBar;
