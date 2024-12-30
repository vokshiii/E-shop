import React, { Fragment, useEffect, useRef, useState } from "react";
import { Button, Col, Container, Navbar } from "react-bootstrap";
import Logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import MegaMenuAll from "../home/MegaMenuAll";
import axios from "axios";
import AppURL from "../../api/AppURL";

function NavMenuDesktop({ email }) {
  const navigate = useNavigate();
  const [mobileMenu, setMobileMenu] = useState(false);
  const containerRef = useRef(null);
  const [searchKey, setSearchKey] = useState("");
  const [cartCount, setCartCount] = useState(0);

  const fetchData = (email) => {
    axios
      .get(AppURL.CartCount(email))
      .then((response) => {
        setCartCount(response.data);
      })
      .catch((error) => {
        // handle the error
      });
  };

  useEffect(() => {
    if (email !== "" && email !== undefined) {
      fetchData(email);
    }
  }, [email]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target) &&
        event.target.tagName !== "BUTTON"
      ) {
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

  function SearchOnChange(event) {
    let SearchKey = event.target.value;
    setSearchKey(SearchKey);
  }

  function SearchOnClick() {
    if (searchKey.length > 2) {
      navigate(`/productbysearch/${searchKey}`);
    }
  }

  const logout = () => {
    localStorage.clear();
  };

  return (
    <Fragment>
      <div className="TopSectionDown">
        {/* ... */}
        <Navbar  fixed={"top"}>
        <Container
            fluid={true}
            className="fixed-top navbar shadow-sm p-2 mb-0"
          >
            <Col lg={3} md={3} sm={12} xs={12}>
              <Button
                onClick={handleMobileMenuToggle}
                style={{ backgroundColor: "#280245" }}
                className="btn"
              >
                <i
                  style={{ color: "white", fontSize: "1.6rem" }}
                  className={`fa ${mobileMenu ? "fa-times" : "fa-bars"}`}
                ></i>
              </Button>

              <Link to="/">
                <img className="nav-logo" src={Logo} alt="1" />
              </Link>
            </Col>

            <Col className="p-1 mt-1" lg={4} md={4} sm={12} xs={12}>
              <div className="input-group w-100 ">
                <input
                  onChange={SearchOnChange}
                  type="text"
                  className="form-control"
                />
                <Button
                  onClick={SearchOnClick}
                  type="button"
                  className="btn site-btn"
                >
                  <i className="fa fa-search"></i>
                </Button>
              </div>
            </Col>
        <Col className="p-1 mt-1 nav-right" lg={5} md={5} sm={12} xs={12}>
          {localStorage.getItem("token") ? (
            <div>
              <Link to="/favourite" className="btn">
                <i className="fa h4 fa-heart"></i>{" "}
                <sup>
                  <span className="badge text-white bg-danger">3</span>
                </sup>
              </Link>

              <Link to="/notification" className="btn">
                <i className="fa h4 fa-bell"></i>{" "}
                <sup>
                  <span className="badge text-white bg-danger">5</span>
                </sup>
              </Link>

              <a href="" className="btn">
                <i className="fa h4 fa-mobile-alt"></i>
              </a>
              <Link to="/profile" className="h4 btn">
                PROFILE
              </Link>
              <Link to="/login" onClick={logout} className="h4 btn">
                LOGOUT
              </Link>
              <Link to="/cart" className="cart-btn">
                <i className="fa fa-shopping-cart"></i> {cartCount} Items
              </Link>
            </div>
          ) : (
            <div>
              <Link to="/favourite" className="btn">
                <i className="fa h4 fa-heart"></i>{" "}
                <sup>
                  <span className="badge text-white bg-danger">3</span>
                </sup>
              </Link>

              <Link to="/notification" className="btn">
                <i className="fa h4 fa-bell"></i>{" "}
                <sup>
                  <span className="badge text-white bg-danger">5</span>
                </sup>
              </Link>

              <a href="" className="btn">
                <i className="fa h4 fa-mobile-alt"></i>
              </a>
              <Link to="/login" className="h4 btn">
                LOGIN
              </Link>
              <Link to="/register" className="h4 btn">
                REGISTER
              </Link>
              <Link to="/cart" className="cart-btn">
                <i className="fa fa-shopping-cart"></i> 0 Items
              </Link>
            </div>
          )}
        </Col>
        {/* ... */}
        </Container>
        </Navbar>
      </div>

      <div
        ref={containerRef}
        className={mobileMenu ? "sideNavOpen" : "sideNavClose"}
      >
        <MegaMenuAll />
      </div>
    </Fragment>
  );
}

export default NavMenuDesktop;
