import React, { Fragment, useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import axios from "axios";
import AppURL from "../../api/AppURL";
import CollectionLoading from "../PlaceHolder/CollectionLoading";
import { Link } from "react-router-dom";

function Collection() {
  const [ProductData, setProductData] = useState([]);
  const [isLoading, setIsLoading] = useState("");
  const [mainDiv, setMainDiv] = useState("d-none");


  useEffect(() => {
    axios
      .get(AppURL.ProductListByRemark("/COLLECTION"))
      .then((response) => {
        setProductData(response.data);
        setIsLoading("d-none");
        setMainDiv("")
      })
      .catch((error) => {});
  }, []);

  const CollectionList = ProductData;
  const MyView = CollectionList.map((collectionList, i) => {
    if (collectionList.special_price == "na") {
      return (
        <Col className="p-2" xl={2} lg={3} md={3} sm={4} xs={6}>
          <Link className="text-link" to={"/productdetails/" + collectionList.id}>
          <Card className="image-box card w-100">
            <img className="center w-75" src={collectionList.image} alt="" />

            <Card.Body>
              <p className="product-name-on-card">{collectionList.title}</p>
              <p className="product-price-on-card">
                Price : {collectionList.price}
              </p>
            </Card.Body>
          </Card>
          </Link>
        </Col>
      );
    } else {
      return (
        <Col className="p-2" xl={2} lg={3} md={3} sm={4} xs={6}>
          <Link className="text-link" to={"/productdetails/" + collectionList.id}>
          <Card className="image-box card w-100">
            <img className="center w-75" src={collectionList.image} alt="" />

            <Card.Body>
              <p className="product-name-on-card">{collectionList.title}</p>
              <p className="product-price-on-card">
                  Price : <strike className="text-secondary">${collectionList.price}</strike> ${collectionList.special_price} 
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
      <CollectionLoading isLoading={isLoading} />
      <div className={mainDiv}>
      <Container className="text-center" fluid={true}>
        <div className="section-title text-center mb-55">
          <h2>PRODUCT COLLECTION</h2>
          <p>Some of our Exclusive Collection, You may like.</p>
        </div>
        <Row className="p-3">{MyView}</Row>
      </Container>
      </div>
    </Fragment>
  );
}

export default Collection;
