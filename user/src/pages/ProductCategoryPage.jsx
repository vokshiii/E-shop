import React, { Fragment, useEffect, useState } from "react";
import NavMenuDesktop from "../components/common/NavMenuDesktop";
import NavMenuMobile from "../components/common/NavMenuMobile";
import FooterDesktop from "../components/common/FooterDesktop";
import FooterMobile from "../components/common/FooterMobile";
import Category from "../components/ProductDetails/Category";
import axios from "axios";
import AppURL from "../api/AppURL";
import { useParams } from "react-router";

function ProductCategoryPage({user}) {
  const [ProductData, setProductData] = useState([]);
  const { category } = useParams();


    useEffect(() => {
    window.scroll(0, 0);
    axios
      .get(AppURL.ProductListByCategory(category))
      .then((response) => {
        setProductData(response.data);
      })
      .catch((error) => {});

  }, []);

  return (
    <Fragment>
      <div className="Desktop">
      <NavMenuDesktop email={user.email} />
      </div>
      <div className="Mobile">
        <NavMenuMobile />
      </div>

      <Category Category={category} ProductData={ProductData} />

      <div className="Desktop">
        <FooterDesktop />
      </div>
      <div className="Mobile">
        <FooterMobile />
      </div>
    </Fragment>
  );
}

export default ProductCategoryPage;
