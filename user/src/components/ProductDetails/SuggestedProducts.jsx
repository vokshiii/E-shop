import React, { Fragment, useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import AppURL from "../../api/AppURL";
import axios from "axios";

function SuggestedProducts({ subcategory }) {
  const [ProductData, setProductData] = useState([]);
  useEffect(() => {
    window.scroll(0, 0);
    axios
      .get(AppURL.SimilarProduct(subcategory))
      .then((response) => {
        setProductData(response.data);
      })
      .catch((error) => {});
  }, []);

  if (ProductData.length > 0) {
    const MyView = ProductData.map((ProductList, i) => {
      if (ProductList.special_price == "na") {
        return (
          <Col className="p-1" key={1} xl={2} lg={2} md={2} sm={4} xs={6}>
            <Link
              className="text-link"
              to={"/productdetails/" + ProductList.id}
            >
              <Card className="image-box card">
                <img className="center" src={ProductList.image} alt="" />

                <Card.Body>
                  <p className="product-name-on-card">{ProductList.title}</p>
                  <p className="product-price-on-card">
                    Price : {ProductList.price}
                  </p>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        );
      } else {
        return (
          <Col className="p-2" key={1} xl={2} lg={2} md={2} sm={4} xs={6}>
            <Link
              className="text-link"
              to={"/productdetails/" + ProductList.id}
            >
              <Card className="image-box card">
                <img className="center" src={ProductList.image} alt="" />

                <Card.Body>
                  <p className="product-name-on-card">{ProductList.title}</p>
                  <p className="product-price-on-card">
                    Price :{" "}
                    <strike className="text-secondary">
                      ${ProductList.price}
                    </strike>{" "}
                    ${ProductList.special_price}
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
        <Container className="text-center " fluid={true}>
          <div className="section-title text-center mb-55">
            <h2>YOU MAY ALSO LIKE</h2>
            <p>Some of our Exclusive Collection, You may like.</p>
          </div>

          <Row className="p-3">{MyView}</Row>
        </Container>
      </Fragment>
    );
  } else {
    <Fragment>
        <Container className="text-center" fluid={true}>
          <div className="section-title text-center mb-55">
            <h2>YOU MAY ALSO LIKE</h2>
            <p>Some of our Exclusive Collection, You may like.</p>
          </div>

        <p>There have no similar product</p>

        </Container>
      </Fragment>
  }
}

export default SuggestedProducts;
