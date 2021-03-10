import { useContext } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "../keycloak";
import { Container, Row, Col } from "react-bootstrap";

import AppContext from "../context/AppContext";
import Navbar from "./NavBar";
import ErrorMessage from "./ErrorMessage";
import Home from "./Home";
import Posts from "./Posts";

import "bootstrap/dist/css/bootstrap.min.css";

function KeycloakApp() {
  const { setToken } = useContext(AppContext);

  const onTokens = async (tokens) => {
    console.log("keycloak tokens: ", tokens);
    // alert("keycloak tokens: "+ tokens);

    setToken(tokens ? tokens.token : undefined, keycloak);
  };

  const onEvent = (event, error) => {
    console.log("onKeycloakEvent", event, error ? error : "");
    // alert("onEvent: "+ event + (error ? error : ""));
  };

  return (
    <ReactKeycloakProvider
      authClient={keycloak}
      initOptions={{ onLoad: "check-sso" }}
      onTokens={onTokens}
      onEvent={onEvent}
    >
      <BrowserRouter>
        <Navbar />
        <Container style={{ marginTop: "20px" }}>
          <Row>
            <Col>
              <ErrorMessage />
            </Col>
          </Row>
          <Row style={{ marginTop: "30px" }}>
            <Col>
              <Switch>
                <Route exact path="/posts" render={(routeProps) => <Posts />} />
                <Route exact path="/" render={(routeProps) => <Home />} />
                <Redirect to="/" />
              </Switch>
            </Col>
          </Row>
        </Container>
      </BrowserRouter>
    </ReactKeycloakProvider>
  );
}

export default KeycloakApp;
