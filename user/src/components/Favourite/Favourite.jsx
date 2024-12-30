import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import AppURL from "../../api/AppURL";
import cogoToast from "cogo-toast";
import { useNavigate } from "react-router";

function Favourite({ user }) {
  const [ProductData, setProductData] = useState([]);
  const [isLoading, setIsLoading] = useState("");
  const [mainDiv, setMainDiv] = useState("d-none");
  const navigate = useNavigate();

  if(!localStorage.getItem('token')){
    navigate("/login")
  }

  const fetchData = () => {
    axios
      .get(AppURL.FavouriteList(user.email))
      .then((response) => {
        setProductData(response.data);
        setIsLoading("d-none");
        setMainDiv("");
      })
      .catch((error) => {});
  };

  useEffect(() => {
    fetchData();
  }, [user.email]);

  const removeItem = (event) => {
    let product_code = event.currentTarget.dataset.code;

    axios
      .get(AppURL.FavouriteRemove(product_code, user.email))
      .then((response) => {
        cogoToast.success("Item Removed Successfully", {
          position: "top-right",
        });
        fetchData();
      })
      .catch((error) => {
        cogoToast.error("Your Request is not done! Try Again", {
          position: "top-right",
        });
      });
  };

  let MyView;
  if (ProductData.length > 0) {
    MyView = ProductData.map((ProductList, i) => (
      <Col className="p-0" xl={3} lg={3} md={3} sm={6} xs={6} key={i}>
        <Card className="image-box card w-100">
          <img className="center w-75" src={ProductList.image} alt="" />

          <Card.Body>
            <p className="product-name-on-card">{ProductList.product_name}</p>
            <Button
              onClick={removeItem}
              data-code={ProductList.product_code}
              className="btn btn-sm"
            >
              <i className="fa fa-trash-alt">Remove</i>
            </Button>
          </Card.Body>
        </Card>
      </Col>
    ));
  } else {
    MyView = <p>No favourite items found.</p>;
  }

  return (
    <Fragment>
      <Container className="text-center" fluid={true}>
        <div className="section-title text-center mb-55">
          <h2>MY FAVOURITE ITEMS</h2>
          <p>Some of our Exclusive Collection, You may like.</p>
        </div>
        <Row>{MyView}</Row>
      </Container>
    </Fragment>
  );
}

export default Favourite;
