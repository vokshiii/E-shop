import React, { Fragment, useState, useEffect } from "react";
import { Button, Card, Col, Container, ListGroup, ListGroupItem, Modal, Row } from "react-bootstrap";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import ProfilePhoto from "../../assets/images/profile.jpg"

function Profile({ user }) {
  const navigate = useNavigate();
  if (!localStorage.getItem("token")) {
    navigate("/login");
  }

  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  if (!localStorage.getItem("token")) {
    navigate("/login");
  }
  return (
    <Fragment>
      <Container>
        <div className="section-title text-center mb-55">
          <h2>User Profile Page</h2>
        </div>
        <Row>
          <Col lg={4} md={4} sm={12}>
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src={ProfilePhoto} className="userprofile" />

              <ListGroup className="list-group-flush">
                <ListGroupItem>
                  {" "}
                  <Link className="text-link" to="/orderlist">
                    {" "}
                    <p className="product-name-on-card"> Order List </p>
                  </Link>{" "}
                </ListGroupItem>

                <ListGroupItem>
                  {" "}
                  <Link className="text-link" to="/orderlist">
                    {" "}
                    <p className="product-name-on-card"> Order List </p>
                  </Link>{" "}
                </ListGroupItem>

                <ListGroupItem>
                  {" "}
                  <Link className="text-link" to="/orderlist">
                    {" "}
                    <p className="product-name-on-card"> Order List </p>
                  </Link>{" "}
                </ListGroupItem>
              </ListGroup>
            </Card>
          </Col>

          <Col lg={8} md={8} sm={12}>
            <ul className="list-group">
              <li className="list-group-item">Name: {name}</li>
              <li className="list-group-item">Email: {email}</li>
            </ul>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}

export default Profile;
