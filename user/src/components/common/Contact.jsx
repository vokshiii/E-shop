import React, { Fragment, useState } from "react";
import { Col, Container, Form, Row, Button } from "react-bootstrap";
import validation from "../../validation/Validation";
import axios from "axios";
import AppURL from "../../api/AppURL";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

function Contact() {
  const [state, setState] = useState({
    name: "",
    email: "",
    message: "",
  });

  const nameOnChange = (event) => {
    let name = event.target.value;
    setState((prevState) => ({ ...prevState, name }));
  };
  const emailOnChange = (event) => {
    let email = event.target.value;
    setState((prevState) => ({ ...prevState, email }));
  };
  const messageOnChange = (event) => {
    let message = event.target.value;
    setState((prevState) => ({ ...prevState, message }));
  };

  const onFormSubmit = (event) => {
    let name = state.name;
    let email = state.email;
    let message = state.message;
    let sendBtn = document.getElementById("sendBtn");
    let contactForm = document.getElementById("contactForm");

    if (message.length === 0) {
      toast.error("Please Write your message!");
    } else if (name.length === 0) {
      toast.error("Please Write your name!");
    } else if (email.length === 0) {
      toast.error("Please Write your email!");
    } else if (!validation.NameRegx.test(name)) {
      toast.error("Invalid Name");
    } else {
      sendBtn.innerHTML = "Sending...";
      let MyFormData = new FormData();
      MyFormData.append("name", name);
      MyFormData.append("email", email);
      MyFormData.append("message", message);

      axios
        .post(AppURL.PostContact, MyFormData)
        .then(function (response) {
          if (response.status === 200 && response.data === 1) {
            toast.success("Message Sent Successfully");
            sendBtn.innerHTML = "Send";
            contactForm.reset()
          } else {
            toast.error("Error");
            sendBtn.innerHTML = "Send";
          }
        })
        .catch(function (error) {
          toast.error(error);
          sendBtn.innerHTML = "Send";
        });
    }
    event.preventDefault();
  };
  return (
    <Fragment>
      <Container>
        <Row className="p-2">
          <Col
            className="shadow-sm bg-white mt-2"
            md={12}
            lg={12}
            sm={12}
            xs={12}
          >
            <Row className="text-center">
              <Col
                className="d-flex justify-content-center"
                md={6}
                lg={6}
                sm={12}
                xs={12}
              >
                <Form id="contactForm" onSubmit={onFormSubmit} className="onboardForm">
                  <h4 className="section-title-login">Contact With US</h4>
                  <h6 className="section-sub-title">Please Contact with Us</h6>
                  <input
                    onChange={nameOnChange}
                    className="form-control m-2"
                    type="text"
                    placeholder="Enter Your Name"
                  />
                  <input
                    onChange={emailOnChange}
                    className="form-control m-2"
                    type="text"
                    placeholder="Enter Email"
                  />
                  <Form.Control
                    onChange={messageOnChange}
                    className="form-control m-2"
                    as="textarea"
                    rows={3}
                    placeholder="Message"
                  />
                  <Button
                    id="sendBtn"
                    type="submit"
                    className="btn btn-block m-2 site-btn-login"
                  >
                    Send
                  </Button>
                </Form>
              </Col>
              <Col className="p-0 Desktop m-0" md={6} lg={6} sm={6} xs={6}>
                <br />
                <br />
                <p className="section-title-contact">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.{" "}
                  <br />
                  Rconsequuntur perspiciatisdolorum? Nostrum, praesentium?
                </p>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d46940.2115854205!2d21.11752769581094!3d42.66637271822143!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13549ee605110927%3A0x9365bfdf385eb95a!2sPristina!5e0!3m2!1sen!2s!4v1681391435216!5m2!1sen!2s"
                  width="550"
                  title="pristina"
                  height="450"
                  styles="border:0;"
                  allowfullscreen=""
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                ></iframe>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      <ToastContainer />
    </Fragment>
  );
}

export default Contact;
