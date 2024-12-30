import React, { Fragment, useState } from "react";
import { Container, Row, Col, Form, Button, Breadcrumb } from "react-bootstrap";
import SuggestedProducts from "./SuggestedProducts";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import InnerImageZoom from "react-inner-image-zoom";
import ReviewList from "./ReviewList";
import cogoToast from "cogo-toast";
import axios from "axios";
import AppURL from "../../api/AppURL";

function ProductDetails({ data, user }) {
  const [previewImg, setPreviewImg] = useState("0");
  const [isSize, setIsSize] = useState(null);
  const [isColor, setIsColor] = useState(null);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState("");
  const [productCode, setProductCode] = useState(null);
  const [AddToCart, setAddToCart] = useState("Add To Cart");
  const [AddToFav, setAddToFav] = useState("Favourite");
  const [OrderNow, setOrderNow] = useState("Order Now")

  const navigate = useNavigate();

  let title = data["productList"][0]["title"];
  let brand = data["productList"][0]["brand"];
  let category = data["productList"][0]["category"];
  let subcategory = data["productList"][0]["subcategory"];
  let image = data["productList"][0]["image"];

  if (previewImg === "0") {
    setPreviewImg(image);
  }

  let price = data["productList"][0]["price"];
  let product_code = data["productList"][0]["product_code"];
  let remark = data["productList"][0]["remark"];
  let special_price = data["productList"][0]["special_price"];
  let star = data["productList"][0]["star"];

  let image_one = data["productDetails"][0]["image_one"];
  let image_two = data["productDetails"][0]["image_two"];
  let image_three = data["productDetails"][0]["image_three"];
  let image_four = data["productDetails"][0]["image_four"];
  let productColor = data["productDetails"][0]["color"];
  let productSize = data["productDetails"][0]["size"];
  let product_id = data["productDetails"][0]["product_id"];
  let short_description = data["productDetails"][0]["short_description"];
  let long_description = data["productDetails"][0]["long_description"];

  const imgOnClick = (event) => {
    let imgSrc = event.target.getAttribute("src");
    setPreviewImg(imgSrc);
  };

  const addToCart = () => {
    let IsSize = isSize;
    let IsColor = isColor;
    let Color = color;
    let Size = size;
    let Quantity = quantity;
    let ProductCode = product_code;
    let Email = user.email;

    if (IsColor === "YES" && Color.length === 0) {
      cogoToast.error("Please Select Color", { position: "top-right" });
    } else if (productSize !== "na" && Size.length === 0) {
      cogoToast.error("Please Select Size", { position: "top-right" });
    } else if (Quantity.length === 0) {
      cogoToast.error("Please Select Quantity", { position: "top-right" });
    } else if (!localStorage.getItem("token")) {
      cogoToast.error("Please You Have to Login First", {
        position: "top-right",
      });
    } else {
      setAddToCart("Adding...");
      let MyFormData = new FormData();
      MyFormData.append("color", Color);
      MyFormData.append("size", Size);
      MyFormData.append("quantity", Quantity);
      MyFormData.append("product_code", ProductCode);
      MyFormData.append("email", Email);

      axios
        .post(AppURL.addToCart, MyFormData)
        .then((response) => {
          if (response.data === 1) {
            cogoToast.success("Product Added Successfully", {
              position: "top-right",
            });
            setAddToCart("Add To Cart");
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          } else {
            cogoToast.error("Your Request is not done! Try Again", {
              position: "top-right",
            });
            setAddToCart("Add To Cart");
          }
        })
        .catch((error) => {
          cogoToast.error("Your Request is not done! Try Again", {
            position: "top-right",
          });
          setAddToCart("Add To Cart");
        });
    }
  };

  const orderNow = () => {
    let IsSize = isSize;
    let IsColor = isColor;
    let Color = color;
    let Size = size;
    let Quantity = quantity;
    let ProductCode = product_code;
    let Email = user.email;

    if (IsColor === "YES" && Color.length === 0) {
      cogoToast.error("Please Select Color", { position: "top-right" });
    } else if (productSize !== "na" && Size.length === 0) {
      cogoToast.error("Please Select Size", { position: "top-right" });
    } else if (Quantity.length === 0) {
      cogoToast.error("Please Select Quantity", { position: "top-right" });
    } else if (!localStorage.getItem("token")) {
      cogoToast.error("Please You Have to Login First", {
        position: "top-right",
      });
    } else {
      setOrderNow("Adding...");
      let MyFormData = new FormData();
      MyFormData.append("color", Color);
      MyFormData.append("size", Size);
      MyFormData.append("quantity", Quantity);
      MyFormData.append("product_code", ProductCode);
      MyFormData.append("email", Email);

      axios
        .post(AppURL.addToCart, MyFormData)
        .then((response) => {
          if (response.data === 1) {
            cogoToast.success("Product Added Successfully", {
              position: "top-right",
            });
            setOrderNow("Order Now");
            setTimeout(() => {
              navigate("/cart")
            }, 1000);
          } else {
            cogoToast.error("Your Request is not done! Try Again", {
              position: "top-right",
            });
            setAddToCart("Add To Cart");
          }
        })
        .catch((error) => {
          cogoToast.error("Your Request is not done! Try Again", {
            position: "top-right",
          });
          setAddToCart("Add To Cart");
        });
    }
  };

  const colorOnChange = (e) => {
    setColor(e.target.value);
  };

  const sizeOnChange = (e) => {
    setSize(e.target.value);
  };

  const quantityOnChange = (e) => {
    setQuantity(e.target.value);
  };

  function PriceOption(price, special_price) {
    if (special_price == "na") {
      return <p className="product-price-on-card">Price : {price}$</p>;
    } else {
      return (
        <p className="product-price-on-card">
          Price : <strike className="text-secondary">{price}$</strike>{" "}
          {special_price}$
        </p>
      );
    }
  }

  var ColorDiv = "d-none";
  if (color != "na") {
    let ColorArray = productColor.split(",");
    var ColorOption = ColorArray.map((ColorList, i) => {
      return <option value={ColorList}>{ColorList}</option>;
    });
    ColorDiv = "";
  } else {
    ColorDiv = "d-none";
  }

  var SizeDiv = "d-none";
  if (productSize != "na") {
    let SizeArray = productSize.split(",");
    var SizeOption = SizeArray.map((SizeList, i) => {
      return <option value={SizeList}>{SizeList}</option>;
    });
    SizeDiv = "";
  } else {
    SizeDiv = "d-none";
  }

  if (isSize === null) {
    if (size != "na") {
      setIsSize("YES");
    } else {
      setIsSize("NO");
    }
  }

  if (isColor === null) {
    if (size != "na") {
      setIsColor("YES");
    } else {
      setIsColor("NO");
    }
  }

  if (productCode === null) {
    setProductCode(product_code);
  }

  const addToFav = () => {
    setAddToFav("Adding...");
    let productCode = product_code;
    let email = user.email;

    if (!localStorage.getItem("token")) {
      cogoToast.error("Please You Have to Login First", {
        position: "top-right",
      });
    } else {
      axios
        .get(AppURL.AddFavourite(product_code, email))
        .then((response) => {
          if (response.data === 1) {
            cogoToast.success("Product is Now in Favourite", {
              position: "top-right",
            });
            setAddToFav("Favourite");
          } else {
            cogoToast.error("Your Request is not done! Try Again", {
              position: "top-right",
            });
            setAddToFav("Favourite");
          }
        })
        .catch((error) => {
          cogoToast.error("Your Request is not done! Try Again", {
            position: "top-right",
          });
          setAddToFav("Favourite");
        });
    }
  };

  return (
    <Fragment>
      <Container fluid={true} className="BetweenTwoSection">
        <div className="breadbody">
          <Breadcrumb>
            <Breadcrumb.Item>
              {" "}
              <Link to="/">Home</Link>{" "}
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to={"/productcategory/" + category}> {category} </Link>
            </Breadcrumb.Item>

            <Breadcrumb.Item>
              <Link to={"/productsubcategory/" + category + "/" + subcategory}>
                {" "}
                {subcategory}{" "}
              </Link>
            </Breadcrumb.Item>

            <Breadcrumb.Item>
              <Link to={"/productdetails/" + product_code}> {title} </Link>
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <Row className="p-4">
          <Col
            className="shadow-sm bg-white pt-4 pb-3 mt-4 "
            md={12}
            lg={12}
            sm={12}
            xs={12}
          >
            <Row>
              <Col className="p-3 " md={6} lg={6} sm={12} xs={12}>
                <div className="details">
                <InnerImageZoom
                  className="detailimage"
                  zoomScale={1.8}
                  zoomType={"hover"}
                  src={previewImg}
                  zoomSrc={previewImg}
                />
                <Container className="my-3">
                  <Row >
                    <Col className="p-0 m-0" md={3} lg={3} sm={3} xs={3}>
                      <img
                        className="w-100 smallimage product-sm-img"
                        onClick={imgOnClick}
                        src={image_one}
                      />
                    </Col>
                    <Col className="p-0 m-0" md={3} lg={3} sm={3} xs={3}>
                      <img
                        className="w-100 smallimage product-sm-img"
                        onClick={imgOnClick}
                        src={image_two}
                      />
                    </Col>
                    <Col className="p-0 m-0" md={3} lg={3} sm={3} xs={3}>
                      <img
                        className="w-100 smallimage product-sm-img"
                        onClick={imgOnClick}
                        src={image_three}
                      />
                    </Col>
                    <Col className="p-0 m-0" md={3} lg={3} sm={3} xs={3}>
                      <img
                        className="w-100 smallimage product-sm-img"
                        onClick={imgOnClick}
                        src={image_four}
                      />
                    </Col>
                  </Row>
                </Container>
                </div>
              </Col>
              <Col className="p-3" md={6} lg={6} sm={12} xs={12}>
                <h5 className="Product-Name">{title}</h5>
                <h6 className="section-sub-title">{short_description}</h6>
                {PriceOption(price, special_price)}
                <h6 className="mt-2">
                  Category: <b>{category}</b>
                </h6>
                <h6 className="mt-2">
                  SubCategory: <b>{subcategory}</b>
                </h6>
                <h6 className="mt-2">
                  Brand: <b>{brand}</b>
                </h6>
                <h6 className="mt-2">
                  Product Code: <b>{product_code}</b>
                </h6>

                <div className={ColorDiv}>
                  <h6 className="mt-2">Choose Color</h6>
                  <select
                    onChange={colorOnChange}
                    className="form-control form-select"
                  >
                    <option>Choose Color</option>
                    {ColorOption}
                  </select>
                </div>

                <div className={SizeDiv}>
                  <h6 className="mt-2">Choose Size</h6>
                  <select
                    onChange={sizeOnChange}
                    className="form-control form-select"
                  >
                    <option>Choose Size</option>
                    {SizeOption}
                  </select>
                </div>

                <div className="">
                  <h6 className="mt-2">Choose Quantity</h6>
                  <select
                    onChange={quantityOnChange}
                    className="form-control form-select"
                  >
                    <option>Choose Quantity</option>
                    <option value="01">01</option>
                    <option value="02">02</option>
                    <option value="03">03</option>
                    <option value="04">04</option>
                    <option value="05">05</option>
                    <option value="06">06</option>
                    <option value="07">07</option>
                    <option value="08">08</option>
                    <option value="09">09</option>
                    <option value="10">10</option>
                  </select>
                </div>

                <div className="input-group mt-3">
                  <button onClick={addToCart} className="btn site-btn m-1 ">
                    {" "}
                    <i className="fa fa-shopping-cart"></i> {AddToCart}
                  </button>
                  <button onClick={orderNow} className="btn btn-primary m-1">
                    {" "}
                    <i className="fa fa-car"></i> {OrderNow}
                  </button>
                  <button onClick={addToFav} className="btn btn-primary m-1">
                    {" "}
                    <i className="fa fa-heart"></i> {AddToFav}
                  </button>
                </div>
              </Col>
            </Row>

            <Row>
              <Col className="" md={6} lg={6} sm={12} xs={12}>
                <h6 className="mt-2">DETAILS</h6>
                <p>{long_description}</p>
              </Col>

              <Col className="" md={6} lg={6} sm={12} xs={12}>
                <ReviewList code={product_code} />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>

      <SuggestedProducts subcategory={subcategory} />
    </Fragment>
  );
}

export default ProductDetails;
