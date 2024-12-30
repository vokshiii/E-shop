import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import AppURL from "../../api/AppURL";
import SliderLoading from "../PlaceHolder/SliderLoading";
import FeaturedLoading from "../PlaceHolder/FeaturedLoading";
function FeaturedProducts() {
  const [ProductData, setProductData] = useState([]);
  const [isLoading, setIsLoading] = useState("");
  const [mainDiv, setMainDiv] = useState("d-none");

  useEffect(() => {
    axios
      .get(AppURL.ProductListByRemark("/featured"))
      .then((response) => {
        setProductData(response.data);
        setIsLoading("d-none");
        setMainDiv("")
      })
      .catch((error) => {});
  }, []);

  const FeaturedList = ProductData;
  const MyView = FeaturedList.map((featuredlist, i) => {
    if (featuredlist.special_price == "na") {
      return (
        <Col className="p-2" key={1} xl={2} lg={3} md={3} sm={4} xs={6}>
          <Link className="text-link" to={"/productdetails/" + featuredlist.id}>
            <Card className="image-box card">
              <img className="center" src={featuredlist.image} alt="" />

              <Card.Body>
                <p className="product-name-on-card">{featuredlist.title}</p>
                <p className="product-price-on-card">
                Price : {featuredlist.price}
              </p>
              </Card.Body>
            </Card>
          </Link>
        </Col>
      );
    } else {
      return (
        <Col className="p-2" key={1} xl={2} lg={3} md={3} sm={4} xs={6}>
          <Link className="text-link" to={"/productdetails/" + featuredlist.id}>
            <Card className="image-box card">
              <img className="center" src={featuredlist.image} alt="" />

              <Card.Body>
                <p className="product-name-on-card">{featuredlist.title}</p>
                <p className="product-price-on-card">
                  Price :{" "}
                  <strike className="text-secondary">
                    ${featuredlist.price}
                  </strike>{" "}
                  ${featuredlist.special_price}
                </p>
              </Card.Body>
            </Card>
          </Link>
        </Col>
      );
    }
  });
  return (
    <Fragment>
      <FeaturedLoading isLoading={isLoading} />
      <div className={mainDiv}>
      <Container className="text-center" fluid={true}>
        <div className="section-title text-center mb-55">
          <h2>FEATURED PRODUCT</h2>
          <p>Some of our Exclusive Collection, You may like.</p>
        </div>
        <SliderLoading isLoading={isLoading} />
        <div className={mainDiv}>
        <Row className="p-3">{MyView}</Row>
        </div>
      </Container>
      </div>
    </Fragment>
  );
}

export default FeaturedProducts;
