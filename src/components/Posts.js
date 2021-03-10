import React, { useState, useEffect } from "react";
import axios from "axios";
import { useKeycloak } from "@react-keycloak/web";
import Card from "react-bootstrap/Card";

const Posts = (props) => {
  const [postList, setPostList] = useState();
  const { keycloak, initialized } = useKeycloak();

  const { authenticated } = keycloak;
  const {token} = props;

  useEffect(
    () => getPosts(),
    // eslint-disable-next-line
    []
  );

  const getPosts = async () => {
    console.log("Get posts...");

    setPostList([]);

    if (! initialized || !authenticated || ! token || token === "") {
      return;
    }

    try {
      // console.log(
      //   "Get posts from https://jsonplaceholder.typicode.com/users/1/posts"
      // );
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users/1/posts"
      );
      const data = response.data;
      console.log('Data is:', data);

      setPostList(data);
    } catch (error) {
      console.log("Failed to retrieve the posts. error: ", error);
    }
  };

  console.log("initialized:", initialized, ", authenticated: ", authenticated);
  console.log("Posts: ", postList);

  if (!authenticated) {
    return <div>You don't have access to this page</div>;
  }

  if (!postList || postList.length === 0) {
    return <div>No post was found.</div>;
  }

  return (
    <div>
      {postList.map((post) => (
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
