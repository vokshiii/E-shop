import React, { Fragment, useState } from "react";
import { Col, Container, Form, Row, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import ForgetImg from "../../assets/images/forget.jpg";
import axios from "axios";
import AppURL from "../../api/AppURL";
import {ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';



function ResetPassword() {
  const [token, setToken] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setPassword_confirmation] = useState('');

  const formSubmit = (e) =>{
    e.preventDefault();
    const data = {
      token:token,
      email:email,
      password:password,
      password_confirmation:password_confirmation,
    }

    axios.post(AppURL.UserResetPassword,data).then(response =>{
      toast.success(response.data.message,{
        position: "top-right"
      })
      document.getElementById("formreset").reset();
    
    }).catch(error=>{
      toast.error(error.response.data.message,{
        position: "top-right"
      })
    })
  }
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
              <Form onSubmit={formSubmit} className="onboardForm" id="formreset">
                <h4 className="section-title-login">Reset Password</h4>

                <input
                  className="form-control m-2"
                  type="text"
                  placeholder="Enter Your Pin Code"
                  onChange={(e)=>setToken(e.target.value)}

                />

                <input
                  className="form-control m-2"
                  type="text"
                  placeholder="Enter Your Email"
                  onChange={(e)=>setEmail(e.target.value)}
                />

                <input
                  className="form-control m-2"
                  type="password"
                  placeholder="Your New Password"
                  onChange={(e)=>setPassword(e.target.value)}

                />

                <input
                  className="form-control m-2"
                  type="password"
                  placeholder="Confirm Your Password"
                  onChange={(e)=>setPassword_confirmation(e.target.value)}

                />
                <Button type="submit" className="btn btn-block m-2 site-btn-login">
                  {" "}
                  Reset Password{" "}
                </Button>
               </Form>
            </Col>
            <Col className="p-0 Desktop m-0" md={6} lg={6} sm={6} xs={6}>
            <img className="onboardBanner" src={ForgetImg} alt="1" />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
    <ToastContainer />
  </Fragment>
  )
}

export default ResetPassword