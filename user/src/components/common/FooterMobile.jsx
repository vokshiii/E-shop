import React, { Fragment } from 'react'
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Apple from "../../assets/images/apple.png";
import Google from "../../assets/images/google.png";

function FooterMobile() {
  return (
    <Fragment>
      <div className="footerback m-0 mt-5 pt-3 shadow-sm">
        <Container className='text-center'>
          <Row className="px-0 my-5">
            <Col className="p-2" lg={3} md={3} sm={6} xs={12}>
              <h5 className="footer-menu-title">OFFICE ADDRESS</h5>
              <p>
                121 wakdmmc kmwam ma kmkam ma ma mcwakmkcwa m mcamcskmcof v m c
                jeanc awn wa <br /> Email: awdkwxk@gmail.com
              </p>
              <h5 className="footer-menu-title">SOCIAL LINK</h5>
              <a href="">
                <i className="fab m-1 h4 fa-facebook"></i>
              </a>
              <a href="">
                <i className="fab m-1 h4 fa-instagram"></i>
              </a>
              <a href="">
                <i className="fab m-1 h4 fa-twitter"></i>
              </a>
            </Col>
            
            
            <Col className="p-2 footer-menu" lg={3} md={3} sm={6} xs={12}>
              <h5 className="footer-menu-title">DOWNLOAD APPS</h5>
              <a>
                <img src={Google} alt="1" />
              </a>
              <a>
                <img className="mt-2" src={Apple} alt="1" />
              </a>
            </Col>
          </Row>
        </Container>
        <Container fluid={true} className="text-center m-0 pt-3 pb-1 bg-dark">
          <Container>
            <Row>
              <h6 className="text-white">@ Copyright 2023 by @EasyShop, All Rights Reserved</h6>
            </Row>
          </Container>
        </Container>
      </div>
    </Fragment>
  )
}

export default FooterMobile