import { useState } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "./keycloak";
import { Container, Row, Col } from "react-bootstrap";

import Navbar from "./components/NavBar";
import Home from "./components/Home";
import Posts from "./components/Posts";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});

  const onAuthSuccess = (e) => {
    console.log("onAuthSuccess: ", e);
  };

  const onAuthLogout = (e) => {
    console.log("onAuthLogout: ", e);
  };

  const onTokens = async (tokens) => {
    console.log("tokens: ", tokens);

    // keycloak.loadUserProfile()
    // .then(function(profile) {
    //     alert(JSON.stringify(profile, null, "  "))
    // }).catch(function() {
    //     alert('Failed to load user profile');
    // });

    setToken(tokens ? tokens.token : "");

    if (tokens && tokens.token) {
      const profile = await keycloak.loadUserInfo();
      console.log("User profile:", profile);
      // alert(JSON.stringify(profile, null, "  "));
      setUser(profile);
    }
  };

  const onEvent = (e) => {
    console.log("onEvent: ", e);
  };

  return (
    <ReactKeycloakProvider
      authClient={keycloak}
      initOptions={{ onLoad: "check-sso" }}
      onTokens={onTokens}
      onAuthSuccess={onAuthSuccess}
      onAuthLogout={onAuthLogout}
      onEvent={onEvent}
    >
      <BrowserRouter>
          <Navbar user={user} />
          <Container>
          <Row style={{marginTop:'50px'}}>
            <Col>
              <Switch>
                <Route exact path="/posts" render={(routeProps) => <Posts />} />
                <Route exact path="/" render={Home} />
                <Redirect to="/" />
              </Switch>
            </Col>
          </Row>
          </Container>
      </BrowserRouter>
    </ReactKeycloakProvider>
  );
}

export default App;
