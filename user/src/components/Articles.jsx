import React, { useState, useEffect } from 'react';
import { Card, ListGroup, ListGroupItem, Row, Col } from 'react-bootstrap';
import axios from 'axios';

function Articles() {
  const [articles, setArticles] = useState([]);
  const [comments, setComments] = useState({});

  useEffect(() => {
    // Fetch articles from the first API
    axios.get('http://127.0.0.1:8000/api/allarticles')
      .then((response) => {
        setArticles(response.data);
        // For each article, fetch comments from the second API using their IDs
        response.data.forEach((article) => {
          axios.get(`http://127.0.0.1:8000/api/comment/${article.name}`)
            .then((commentsResponse) => {
              setComments((prevComments) => ({
                ...prevComments,
                [article.name]: commentsResponse.data,
              }));
            })
            .catch((error) => {
              console.error('Error fetching comments:', error);
            });
        });
      })
      .catch((error) => {
        console.error('Error fetching articles:', error);
      });
  }, []);

  // Function to create card components with comments
  const renderArticleCards = () => {
    return articles.map((article) => (
      <Col key={article.id} sm={6} md={4} lg={3}>
        <Card>
          <Card.Body>
            <Card.Title>{article.name}</Card.Title>
            <Card.Text>Title: {article.title}</Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroupItem>
              <strong>ID:</strong> {article.id}
            </ListGroupItem>
            <ListGroupItem>
              <strong>Created At:</strong> {article.created_at}
            </ListGroupItem>
            <ListGroupItem>
              <strong>Updated At:</strong> {article.updated_at}
            </ListGroupItem>
            <ListGroupItem>
              <strong>Comments:</strong>
              <ul>
                {comments[article.name]?.map((comment) => (
                  <li key={comment.id}>{comment.message}</li>
                ))}
              </ul>
            </ListGroupItem>
          </ListGroup>
        </Card>
      </Col>
    ));
  };

  return (
    <div className="articles">
      <h1>Articles</h1>
      <Row className="mx-2">{renderArticleCards()}</Row>
    </div>
  );
}

export default Articles;
