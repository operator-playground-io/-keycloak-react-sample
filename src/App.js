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
  const [token, setToken] = useState(undefined);
  const [user, setUser] = useState({});

  const onTokens = async (tokens) => {
    console.log("keycloak tokens: ", tokens);
    // alert("keycloak tokens: "+ tokens);

    // keycloak.loadUserProfile()
    // .then(function(profile) {
    //     alert(JSON.stringify(profile, null, "  "))
    // }).catch(function() {
    //     alert('Failed to load user profile');
    // });

    // console.log('Current token: ', token, ', new token: ', tokens.token);

    if (tokens && tokens.token && tokens.token !== token ) {
      setToken(tokens ? tokens.token : undefined);

      const profile = await keycloak.loadUserInfo();
      console.log("User profile:", profile);
      // alert(JSON.stringify(profile, null, "  "));
      setUser(profile);
    }
  };

  const onEvent = (event, error) => {
    console.log('onKeycloakEvent', event, (error ? error : ""));
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
        <Navbar user={user} />
        <Container>
          <Row style={{ marginTop: "50px" }}>
            <Col>
              <Switch>
                <Route
                  exact
                  path="/posts"
                  render={(routeProps) => <Posts token={token} />}
                />
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

export default App;
