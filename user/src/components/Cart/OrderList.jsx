import React, { Fragment, useEffect, useState } from "react";
import AppURL from "../../api/AppURL";
import axios from "axios";
import cogoToast from "cogo-toast";
import { Button, Card, Col, Container, Modal, Row } from "react-bootstrap";
import { useNavigate } from "react-router";

function OrderList({ user }) {
  const navigate = useNavigate();
  if (!localStorage.getItem("token")) {
    navigate("/login");
  }

  const [ProductData, setProductData] = useState([]);
  const [name, setName] = useState("");
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const [productName, setProductName] = useState("");
  const [productCode, setProductCode] = useState("");
  const [ReviewModal, setReviewModal] = useState(false);

  const [show, setShow] = useState(false);


  const fetchData = () => {
    axios
      .get(AppURL.OrderListByUser(user.email))
      .then((response) => {
        setProductData(response.data);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    fetchData();
  }, [user.email]);

  const ReviewModalOpen = (product_code, product_name) => {
    setReviewModal(true);
    setProductCode(product_code);
    setProductName(product_name);
  };

  const ReviewModalClose = () => {
    setReviewModal(false);
  };

  const nameOnChange = (e) => {
    setName(e.target.value);
  };

  const ratingOnChange = (e) => {
    setRating(e.target.value);
  };

  const commentOnChange = (e) => {
    setComment(e.target.value);
  };

  const PostReview = () => {
    if (name.length === 0) {
      cogoToast.error("Name Is Required", {
        position: "top-right",
      });
    } else if (comment.length === 0) {
      cogoToast.error("Comment Is Required", {
        position: "top-right",
      });
    } else if (rating.length === 0) {
      cogoToast.error("Rating Is Required", {
        position: "top-right",
      });
    } else if (comment.length > 50) {
      cogoToast.error("Comments can't more than 150 characters", {
        position: "top-right",
      });
    } else {
      let MyFormData = new FormData();
      console.log(rating)
      MyFormData.append("product_name", productName);
      MyFormData.append("product_code", productCode);
      MyFormData.append("reviewer_name", name);
      MyFormData.append("reviewer_photo", "");
      MyFormData.append("email", user.email);
      MyFormData.append("reviewer_rating", rating);
      MyFormData.append("reviewer_comment", comment);

      axios
        .post(AppURL.PostReview,MyFormData)
        .then((response) => {
          if (response.data === 1) {
            cogoToast.success("Review Submitted", {
              position: "top-right",
            });
          } else {
            cogoToast.error("Your Request is not done! Try Again", {
              position: "top-right",
            });
          }
        })
        .catch((error) => {
        //   cogoToast.error(error, {
        //     position: "top-right",
        //   });
        console.log(error);
        });
    }
  };

  const MyList = ProductData;
  const MyView = MyList.map((ProductList, i) => {
    return (
      <div>
        <Col md={6} lg={6} sm={12} xs={12}>
          <h5 className="product-name">{ProductList.product_name}</h5>
          <h6> Quantity = {ProductList.quantity} </h6>
          <p>
            {ProductList.size} | {ProductList.color}
          </p>
          <h6>
            Price = {ProductList.unit_price} x {ProductList.quantity} ={" "}
            {ProductList.total_price}$
          </h6>
          <h6>Status = {ProductList.order_status}</h6>
        </Col>
        <Button
          onClick={() =>
            ReviewModalOpen(ProductList.product_code, ProductList.product_name)
          }
          className="btn btn-danger"
        >
          Post Review
        </Button>
        <hr />
      </div>
    );
  });

  return (
    <Fragment>
      <Container>
        <div className="section-title text-center mb-55">
          <h2>Order History By ({user.name})</h2>
        </div>
        <Card>
          <Card.Body>
            <Row>{MyView}</Row>
          </Card.Body>
        </Card>
      </Container>

      <Modal show={ReviewModal} onHide={ReviewModalClose}>
        <Modal.Header closeButton>
          <h6>
            <i className="fa fa-bell"></i> Post Your Review
          </h6>
        </Modal.Header>
        <Modal.Body>
          <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
            <label className="form-label">Your Name</label>
            <input
              onChange={nameOnChange}
              className="form-control"
              type="text"
              placeholder={user.name}
            />
          </div>

          <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
            <label className="form-label">Select Product Rating</label>
            <select onChange={ratingOnChange} className="form-control">
              <option value="">Choose</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>

          <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
            <label className="form-label">Your Comment</label>
            <textarea
              onChange={commentOnChange}
              rows={2}
              className="form-control"
              type="text"
              placeholder="Your Message"
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={PostReview} variant="secondary">
            Post
          </Button>
          <Button variant="secondary" onClick={ReviewModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
}

export default OrderList;
