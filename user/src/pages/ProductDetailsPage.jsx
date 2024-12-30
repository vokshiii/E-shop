import React, { Fragment, useEffect } from "react";
import NavMenuDesktop from "../components/common/NavMenuDesktop";
import NavMenuMobile from "../components/common/NavMenuMobile";
import FooterDesktop from "../components/common/FooterDesktop";
import FooterMobile from "../components/common/FooterMobile";
import ProductDetails from "../components/ProductDetails/ProductDetails";
import SuggestedProducts from "../components/ProductDetails/SuggestedProducts";
import { useState } from "react";
import { useParams } from "react-router";
import AppURL from "../api/AppURL";
import axios from "axios";
import SliderLoading from "../components/PlaceHolder/SliderLoading";

function ProductDetailsPage({user}) {
  const [ProductData, setProductData] = useState([]);
  const { code } = useParams();

  const [isLoading, setIsLoading] = useState("");
  const [mainDiv, setMainDiv] = useState("d-none");

  useEffect(() => {
    window.scroll(0, 0);
    axios
      .get(AppURL.ProductDetails(code))
      .then((response) => {
        setProductData(response.data);
        setIsLoading("d-none");
        setMainDiv("");
      })
      .catch((error) => {});
  }, []);
  if (mainDiv == "d-none") {
    return (
      <Fragment>
        <div className="Desktop">
        <NavMenuDesktop email={user.email} />
        </div>
        <div className="Mobile">
          <NavMenuMobile />
        </div>

        <SliderLoading isLoading={isLoading} />

        <div className="Desktop">
          <FooterDesktop />
        </div>
        <div className="Mobile">
          <FooterMobile />
        </div>
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <div className="Desktop">
          <NavMenuDesktop />
        </div>
        <div className="Mobile">
          <NavMenuMobile />
        </div>

        <ProductDetails data={ProductData} user={user} />
        <SuggestedProducts />

        <div className="Desktop">
          <FooterDesktop />
        </div>
        <div className="Mobile">
          <FooterMobile />
        </div>
      </Fragment>
    );
  }
}

export default ProductDetailsPage;
