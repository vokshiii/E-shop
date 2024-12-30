import React, { Fragment, useState } from "react";
import { Col, Container, Form, Row, Button } from "react-bootstrap";
import Login from "../../assets/images/login.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AppURL from "../../api/AppURL";

function UserLogin({setUser}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  
  const formSubmit = (e) =>{
    e.preventDefault();
    const data = {
      email:email,
      password:password,
    }

    axios.post(AppURL.UserLogin,data).then(response =>{
      localStorage.setItem('token',response.data.token);
      setLoggedIn(true);
      setUser(response.data.user)
      navigate('/profile');
    }).catch(error=>{

    })
  }
  if(localStorage.getItem('token')){
    navigate("/profile")
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
                <Form onSubmit={formSubmit} className="onboardForm">
                  <h4 className="section-title-login">User Sign In</h4>

                  <input
                    className="form-control m-2"
                    type="text"
                    placeholder="Enter Your Email"
                    onChange={(e)=>setEmail(e.target.value)}
                  />

                  <input
                    className="form-control m-2"
                    type="password"
                    placeholder="Enter Your Password"
                    onChange={(e)=>setPassword(e.target.value)}

                  />
                  <Button type="submit" className="btn btn-block m-2 site-btn-login">
                    {" "}
                    Login{" "}
                  </Button>
                  <br /><br />
                  <hr />
                  <p> <b> Forget My Password?</b> <b> <Link to="/forget">Forget Password</Link> </b></p>

                  <p> <b> Don't Have An Account?</b> <b><Link to="/register">Register</Link></b> </p>
                </Form>
              </Col>
              <Col className="p-0 Desktop m-0" md={6} lg={6} sm={6} xs={6}>
                <img className="onboardBanner" src={Login} alt="1" />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}

export default UserLogin;
