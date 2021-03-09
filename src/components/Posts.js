import React, { useState, useEffect } from "react";
import axios from "axios";
import { useKeycloak } from "@react-keycloak/web";
import Card from "react-bootstrap/Card";

const Posts = (props) => {
  const [postList, setPostList] = useState();
  const { keycloak, initialized } = useKeycloak();

  const { authenticated } = keycloak;

  useEffect(
    () => getPosts(),
    // eslint-disable-next-line
    []
  );

  const getPosts = async () => {
    console.log("Get posts...");
    if (!authenticated) {
      setPostList([]);
    }

    try {
      console.log(
        "Get posts from https://jsonplaceholder.typicode.com/users/1/posts"
      );
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users/1/posts"
      );
      const data = response.data;
      console.log(data);

      setPostList(data);
    } catch (error) {
      console.log("Failed to retrieve the posts. error: ", error);
    }
  };

  console.log("Posts: ", postList);

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
