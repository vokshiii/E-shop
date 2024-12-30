import React, { Fragment} from "react";
import { Container, Row, Col, Card, Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";
function Category({ProductData, Category}) {


    const MyView = ProductData.map((ProductList, i) => {
      if (ProductList.special_price === "na") {
        return (
          <Col className="p-2" xl={3} lg={3} md={3} sm={6} xs={6}>
          <Link className="text-link" to={"/productdetails/" + ProductList.id}>
            <Card className="image-box card w-100">
              <img className="center w-75" src={ProductList.image} alt="" />
  
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
          <Col className="p-2" xl={3} lg={3} md={3} sm={6} xs={6}>
          <Link className="text-link" to={"/productdetails/" + ProductList.id}>
            <Card className="image-box card w-100">
              <img className="center w-75" src={ProductList.image} alt="" />
  
              <Card.Body>
                <p className="product-name-on-card">{ProductList.title}</p>
                <p className="product-price-on-card">
                    Price : <strike className="text-secondary">${ProductList.price}</strike> ${ProductList.special_price} 
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
    <Container className="text-center" >
    <div className="breadbody">
    <Breadcrumb>
      <Breadcrumb.Item> <Link to="/" >Home</Link> </Breadcrumb.Item>
      <Breadcrumb.Item >
          <Link to={"/productcategory/" + Category}> {Category} </Link>
      </Breadcrumb.Item>
    </Breadcrumb>
    </div>
      <div className="section-title text-center mb-40 mt-2">
        <h2>{Category}</h2>
      </div>
      <Row>{MyView}</Row>
    </Container>
  </Fragment>
  )
}

export default Category