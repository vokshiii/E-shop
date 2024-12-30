import React, { Fragment, useEffect, useState } from "react";
import NavMenuDesktop from "../components/common/NavMenuDesktop";
import NavMenuMobile from "../components/common/NavMenuMobile";
import FooterDesktop from "../components/common/FooterDesktop";
import FooterMobile from "../components/common/FooterMobile";
import axios from "axios";
import AppURL from "../api/AppURL";
import { useParams } from "react-router";
import SubCategory from "../components/ProductDetails/SubCategory";

function ProductSubCategoryPage({user}) {
  const [ProductData, setProductData] = useState([]);
  const { category } = useParams();
  const { subcategory } = useParams();


    useEffect(() => {
    window.scroll(0, 0);
    axios
      .get(AppURL.ProductListBySubCategory(category, subcategory))
      .then((response) => {
        setProductData(response.data);
      })
      .catch((error) => {});

  },[category, subcategory]);
  return (
    <Fragment>
    <div className="Desktop">
    <NavMenuDesktop email={user.email} />
    </div>
    <div className="Mobile">
      <NavMenuMobile />
    </div>

    <SubCategory  Category={category} SubCategory={subcategory} ProductData={ProductData} />

    <div className="Desktop">
      <FooterDesktop />
    </div>
    <div className="Mobile">
      <FooterMobile />
    </div>
  </Fragment>
  )
}

export default ProductSubCategoryPage