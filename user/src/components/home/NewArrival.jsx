import React, { Fragment, useEffect, useRef, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import AppURL from "../../api/AppURL";
import NewArrivalLoading from "../PlaceHolder/NewArrivalLoading";
import { Link } from "react-router-dom";

function NewArrival() {
  const [ProductData, setProductData] = useState([]);
  const [isLoading, setIsLoading] = useState("");
  const [mainDiv, setMainDiv] = useState("d-none");

  useEffect(() => {
    axios
      .get(AppURL.ProductListByRemark("/NEW"))
      .then((response) => {
        setProductData(response.data);
        setIsLoading("d-none");
        setMainDiv("");
      })
      .catch((error) => {});
  }, []);

  const NewList = ProductData;
  const MyView = NewList.map((newList, i) => {
    if (newList.special_price == "na") {
      return (
        <div>
          <Link className="text-link" to={"/productdetails/" + newList.id}>
            <Card className="image-box card">
              <img className="center" src={newList.image} alt="" />

              <Card.Body>
                <p className="product-name-on-card">{newList.title}</p>
                <p className="product-price-on-card">
                  Price : ${newList.price}
                </p>
              </Card.Body>
            </Card>
          </Link>
        </div>
      );
    } else {
      return (
        <div>
          <Link className="text-link" to={"/productdetails/" + newList.id}>
            <Card className="image-box card">
              <img className="center" src={newList.image} alt="" />
              <Card.Body>
                <p className="product-name-on-card">{newList.title}</p>
                <p className="product-price-on-card">
                  {" "}
                  Price :{" "}
                  <strike className="text-secondary">${newList.price}</strike> $
                  {newList.special_price}
                </p>
              </Card.Body>
            </Card>
          </Link>
        </div>
      );
    }
  });

  const sliderRef = useRef(null);

  const next = () => {
    sliderRef.current.slickNext();
  };
  const previous = () => {
    sliderRef.current.slickPrev();
  };

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <Fragment>
      <NewArrivalLoading isLoading={isLoading} />
      <div className={mainDiv}>
        <Container className="text-center" fluid={true}>
          <div className="section-title text-center mb-55">
            <h2>
              New Arrival &nbsp;
              <a className="btn btn-sm ml-2 site-btn" onClick={previous}>
                <i className="fa fa-angle-left"></i>
              </a>
              <a className="btn btn-sm ml-2 site-btn" onClick={next}>
                <i className="fa fa-angle-right"></i>
              </a>
            </h2>
            <p>Some of our Exclusive Collection, You may like.</p>
          </div>

          <Row>
            <Slider ref={sliderRef} {...settings}>
              {MyView}
            </Slider>
          </Row>
        </Container>
      </div>
    </Fragment>
  );
}

export default NewArrival;
