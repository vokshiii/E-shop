import React, { Fragment, useEffect, useState } from "react";
import NavMenuDesktop from "../components/common/NavMenuDesktop";
import NavMenuMobile from "../components/common/NavMenuMobile";
import FooterDesktop from "../components/common/FooterDesktop";
import FooterMobile from "../components/common/FooterMobile";
import AppURL from '../api/AppURL';
import { useParams } from 'react-router';
import axios from "axios";
import SearchList from "../components/ProductDetails/SearchList";

function SearchPage({user}) {
const [ProductData, setProductData] = useState([]);
  const { searchKey } = useParams();


    useEffect(() => {
    window.scroll(0, 0);
    axios
      .get(AppURL.ProductBySearch(searchKey))
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

    <SearchList SearchKey={searchKey} ProductData={ProductData} />

    <div className="Desktop">
      <FooterDesktop />
    </div>
    <div className="Mobile">
      <FooterMobile />
    </div>
  </Fragment>
  )
}

export default SearchPage