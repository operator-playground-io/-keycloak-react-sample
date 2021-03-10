import React, { useEffect, useContext } from "react";
import { useKeycloak } from "@react-keycloak/web";
import Card from "react-bootstrap/Card";

import AppContext from "../context/AppContext";

const Posts = (props) => {
  const { keycloak, initialized } = useKeycloak();
  const appContext = useContext(AppContext);
  const { messages, getMessages, loading } = appContext;
  const { authenticated } = keycloak;

  useEffect(
    () => getMessages(),
    // eslint-disable-next-line
    []
  );

  console.log("initialized:", initialized, ", authenticated: ", authenticated);
  console.log("Posts: ", messages);

  if (!authenticated) {
    return <div>You don't have access to this page</div>;
  }

  if ( loading ) {
    return <div>Loading posts...</div>;
  }

  if (!messages || messages.length === 0) {
    return <div>No post was found.</div>;
  }

  return (
    <div>
      {messages.map((post) => (
        <Card bg="light" key={post.id}>
          <Card.Body>
            <Card.Title>{post.title}</Card.Title>
            <Card.Text>{post.body}</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default Posts;
