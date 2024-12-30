import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import AppURL from "../../api/AppURL";
import cogoToast from "cogo-toast";

function Cart({ user }) {
  const navigate = useNavigate();
  if (!localStorage.getItem("token")) {
    navigate("/login");
  }

  const [ProductData, setProductData] = useState([]);
  const [confirmBtn, setConfirmBtn] = useState("Confirm Order");
  const [isLoading, setIsLoading] = useState("");
  const [mainDiv, setMainDiv] = useState("d-none");
  const [city, setCity] = useState("");
  const [payment, setPayment] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  const fetchData = () => {
    axios
      .get(AppURL.CartList(user.email))
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

  const removeItem = (id) => {
    axios.get(AppURL.RemoveCartList(id)).then((response) => {
      if (response.data === 1) {
        cogoToast.success("Cart Item Removed Successfully", {
          position: "top-right",
        });
        fetchData();
      } else {
        cogoToast.error("Your Request is not done! Try Again", {
          position: "top-right",
        });
      }
    });
  };

  const cityOnChange = (e) =>{
    setCity(e.target.value)
  }

  const nameOnChange = (e) =>{
    setName(e.target.value)
  }
  
  const paymentMethodOnChange = (e) =>{
    setPayment(e.target.value)
  }

  const addressOnChange = (e) =>{
    setAddress(e.target.value)
  }

  const confirmOnClick = (e) =>{
    if(city.length===0){
      cogoToast.error("Please Select City", {
        position: "top-right",
      });
    }else if(payment.length===0){
      cogoToast.error("Please Select Payment Method", {
        position: "top-right",
      });
    }else if(name.length===0){
      cogoToast.error("Please Select Your Name", {
        position: "top-right",
      });
    }else if(address.length===0){
      cogoToast.error("Please Select Your Address", {
        position: "top-right",
      });
    }else{
      let invoice = new Date().getTime();
      let MyFormData = new FormData();
      MyFormData.append('city',city);
      MyFormData.append('payment_method',payment);
      MyFormData.append('name',name);
      MyFormData.append('delivery_address',address);
      MyFormData.append('email',user.email);
      MyFormData.append('invoice_no',invoice);
      MyFormData.append('delivery_charge',"00");

      axios.post(AppURL.CartOrder,MyFormData).then((response) => {
        if (response.data === 1) {
          cogoToast.success("Order Request Received", {
            position: "top-right",
          });
          navigate("/orderlist");
        } else {
          cogoToast.error("Your Request is not done! Try Again", {
            position: "top-right",
          });
        }
      }).catch(error=>{
        cogoToast.error(error, {
          position: "top-right",
        });
      });
    }
  }


  const ItemPlus = (id, quantity, price) => {
    axios.get(AppURL.CartItemPlus(id, quantity, price)).then((response) => {
      if (response.data === 1) {
        cogoToast.success("Item Quantity Increased", {
          position: "top-right",
        });
        fetchData();
      } else {
        cogoToast.error("Your Request is not done! Try Again", {
          position: "top-right",
        });
      }
    });
  };

  const ItemMinus = (id, quantity, price) => {
    axios.get(AppURL.CartItemMinus(id, quantity, price)).then((response) => {
      if (response.data === 1) {
        cogoToast.success("Item Quantity Decreased", {
          position: "top-right",
        });
        fetchData();
      } else {
        cogoToast.error("Your Request is not done! Try Again", {
          position: "top-right",
        });
      }
    });
  };

  const MyList = ProductData;
  let totalPriceSum = 0
  const MyView = MyList.map((ProductList, i) => {
    totalPriceSum = totalPriceSum + parseInt(ProductList.total_price)
    return (
      <Card>
        <Card.Body>
          <Row>
            <Col md={3} lg={3} sm={6} xs={6}>
              <img className="cart-product-img" src={ProductList.image} />
            </Col>

            <Col md={6} lg={6} sm={6} xs={6}>
              <h5 className="product-name">{ProductList.product_name}</h5>
              <h6> Quantity = {ProductList.quantity} </h6>
              <p>
                {ProductList.size} | {ProductList.color}
              </p>
              <h6>
                Price = {ProductList.unit_price} x {ProductList.quantity} ={" "}
                {ProductList.total_price}$
              </h6>
            </Col>

            <Col md={3} lg={3} sm={12} xs={12}>
              <Button
                onClick={() => removeItem(ProductList.id)}
                className="btn mt-2 mx-1 btn-lg site-btn"
              >
                <i className="fa fa-trash-alt"></i>
              </Button>

              <Button
                onClick={() =>
                  ItemPlus(
                    ProductList.id,
                    ProductList.quantity,
                    ProductList.unit_price
                  )
                }
                className="btn mt-2 mx-1 btn-lg site-btn"
              >
                <i className="fa fa-plus"></i>
              </Button>

              <Button
                onClick={() =>
                  ItemMinus(
                    ProductList.id,
                    ProductList.quantity,
                    ProductList.unit_price
                  )
                }
                className="btn mt-2 mx-1 btn-lg site-btn"
              >
                <i className="fa fa-minus"></i>
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    );
  });
  return (
    <Fragment>
      <Container >
        <div className="section-title text-center mb-55">
          <h2>Product Cart List</h2>
        </div>

        <Row>
          <Col className="p-1" lg={7} md={7} sm={12} xs={12}>
            {MyView}
          </Col>
          <Col className="p-1" lg={5} md={5} sm={12} xs={12}>
            <div className="card p-2">
              <div className="card-body">
                <div className="container-fluid ">
                  <div className="row">
                    <div className="col-md-12 p-1  col-lg-12 col-sm-12 col-12">
                      <h5 className="Product-Name text-danger">
                        Total Price: {totalPriceSum}$
                      </h5>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
                      <label className="form-label">Choose City</label>
                      <select onChange={cityOnChange} className="form-control">
                        <option value="">Choose</option>
                        <option value="Dhaka">Prishtina</option>
                        <option value="Dhaka">Peja </option>
                        <option value="Dhaka">Prizreni </option>
                        <option value="Dhaka">Gjakova </option>
                        <option value="Dhaka">Ferizaji </option>
                        <option value="Dhaka">Gjilani </option>
                        <option value="Dhaka">Mitrovica </option>
                      </select>
                    </div>
                    <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
                      <label className="form-label">
                        Choose Payment Method
                      </label>
                      <select onChange={paymentMethodOnChange} className="form-control">
                        <option value="">Choose</option>
                        <option value="Cash On Delivery">
                          Cash On Delivery
                        </option>
                      </select>
                    </div>
                    <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
                      <label className="form-label">Your Name</label>
                      <input
                        onChange={nameOnChange}
                        className="form-control"
                        type="text"
                        placeholder=""
                      />
                    </div>

                    <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
                      <label className="form-label">Delivery Address</label>
                      <textarea
                        onChange={addressOnChange}
                        rows={2}
                        className="form-control"
                        type="text"
                        placeholder=""
                      />
                    </div>
                    <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
                      <button onClick={confirmOnClick} className="btn  site-btn">{confirmBtn} </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}

export default Cart;
