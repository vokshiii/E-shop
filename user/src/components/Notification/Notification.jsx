import React, { Component, Fragment, useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Modal } from "react-bootstrap";
import AppURL from "../../api/AppURL";
import axios from "axios";
import { useNavigate } from "react-router";

function Notification() {
  const navigate = useNavigate();
  if (!localStorage.getItem("token")) {
    navigate("/login");
  }

  const [show, setShow] = useState(false);
  const [NotificationData, setNotificationData] = useState([]);
  const [NotificationMsg, setNotificationMsg] = useState("");
  const [NotificationTitle, setNotificationTitle] = useState("");
  const [NotificationDate, setNotificationDate] = useState("");

  const [isLoading, setIsLoading] = useState("");
  const [mainDiv, setMainDiv] = useState("d-none");

  const handleClose = () => setShow(false);
  const handleShow = (event) => {
    setShow(true);
    let Nmsg = event.target.getAttribute("data-message");
    let Ntitle = event.target.getAttribute("data-title");
    let Ndate = event.target.getAttribute("data-date");
    setNotificationMsg(Nmsg);
    setNotificationTitle(Ntitle);
    setNotificationDate(Ndate);
  }

  useEffect(() => {
    axios
      .get(AppURL.NotificationHistory)
      .then((response) => {
        setNotificationData(response.data);
        setIsLoading("d-none");
        setMainDiv("");
      })
      .catch((error) => {});
  }, []);

  const NotificationList = NotificationData;
  const MyView = NotificationList.map((NotificationList, i) => {
    return (
      <Col className=" p-1 " md={6} lg={6} sm={12} xs={12}>
        <Card onClick={handleShow} className="notification-card">
          <Card.Body>
            <h6> {NotificationList.title}</h6>
            <p className="py-1  px-0 text-primary m-0">
              <i className="fa  fa-bell"></i> Date: {NotificationList.date} | Status: Unread
            </p>
            <Button data-title={NotificationList.title} data-date={NotificationList.date} data-message={NotificationList.message} className="btn btn-danger">Details</Button>
          </Card.Body>
        </Card>
      </Col>
    );
  });

  return (
    <Fragment>
      <Container className="TopSection">
        <Row>
          {MyView}
        </Row>
      </Container>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <h6>
            <i className="fa fa-bell"></i> Date:{NotificationDate}
          </h6>
        </Modal.Header>
        <Modal.Body>
          <h6>{NotificationTitle}</h6>
          <p>
           {NotificationMsg}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
}

export default Notification;
