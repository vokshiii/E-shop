import React, { Fragment } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Apple from "../../assets/images/apple.png";
import Google from "../../assets/images/google.png";

function FooterDesktop() {
  return (
    <Fragment>
      <div className="footerback m-0 mt-5 pt-3 shadow-sm">
        <Container>
          <Row className="px-0 my-5">
            <Col className="p-2" lg={3} md={3} sm={6} xs={12}>
              <h5 className="footer-menu-title">OFFICE ADDRESS</h5>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, inventore odit? Voluptatum ipsa sapiente recusandae? <br /> Email: eshop@gmail.com
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
            <Col className="p-2" lg={3} md={3} sm={6} xs={12}>
              <h5 className="footer-menu-title">THE COMPANY</h5>
              <Link to="/about" className="footer-link">
                About Us
              </Link>
              <br />
              <Link to="/" className="footer-link">
                Company Profile
              </Link>
              <br />
              <Link to="/contact" className="footer-link">
                Contact Us
              </Link>
              <br />
            </Col>
            <Col className="p-2" lg={3} md={3} sm={6} xs={12}>
              <h5 className="footer-menu-title">MORE INFO</h5>
              <Link to="/purchase" className="footer-link">
                How To Purchase
              </Link>
              <br />
              <Link to="/" className="footer-link">
                Privacy Policy
              </Link>
              <br />
              <Link to="/" className="footer-link">
                Refund Policy
              </Link>
              <br />
            </Col>
            <Col className="p-2" lg={3} md={3} sm={6} xs={12}>
              <h5 className="footer-menu-title">DOWNLOAD APPS</h5>
              <a>
                <img src={Google} alt="1" />
              </a>
              <a>
                <img className="mt-2" src={Apple} alt="1" />
              </a>
              <br />
              Change Your Language
              <div id="google_translate_element"></div>
            </Col>
          </Row>
        </Container>
        <Container fluid={true} className="text-center m-0 pt-3 pb-1 bg-dark">
          <Container>
            <Row>
              <h6 className="text-white"> @Copyright 2023 by E-Shop, All Rights Reserved</h6>
            </Row>
          </Container>
        </Container>
      </div>
    </Fragment>
  );
}

export default FooterDesktop;
