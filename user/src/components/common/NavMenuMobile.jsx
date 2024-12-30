import React, { Fragment, useState, useEffect, useRef } from "react";
import { Button, Col, Container, Navbar } from "react-bootstrap";
import Logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";
import MegaMenuMobile from "../home/MegaMenuMobile";

function NavMenuMobile() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target) && event.target.tagName !== "BUTTON") {
        setMobileMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [containerRef]);

  function handleMobileMenuToggle() {
    setMobileMenu(!mobileMenu);
  }

  return (
    <Fragment>
      <div className="TopSectionDown">
        <Container fluid={true} className="fixed-top shadow-sm p-2 mb-0 navbar">
          <Col lg={4} md={4} sm={12} xs={12} className="nav-mobile" >
          <Button onClick={handleMobileMenuToggle} style={{backgroundColor: "#280245"}} className="btn" >
              <i className={`fa ${mobileMenu ? "fa-times" : "fa-bars"}`} style={{fontSize: "1.6rem"}}></i>
            </Button>
            <Link to="/">
              <img className="nav-logo" src={Logo} alt="1" />
            </Link>
            <Button className="cart-btn">
                <i className="fa fa-shopping-cart"></i> 3 Items
            </Button>
          </Col>
        </Container>
        <div ref={containerRef} className={mobileMenu ? "sideNavOpen" : "sideNavClose"}>
          <MegaMenuMobile />
        </div>
      </div>
    </Fragment>
  );
}

export default NavMenuMobile;
