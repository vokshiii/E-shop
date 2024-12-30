import React, { Fragment, useEffect } from "react";
import FeaturedProducts from "../components/home/FeaturedProducts";
import Categories from "../components/home/Categories";
import Collection from "../components/home/Collection";
import NewArrival from "../components/home/NewArrival";
import HomeTop from "../components/home/HomeTop";
import NavMenuDesktop from "../components/common/NavMenuDesktop";
import NavMenuMobile from "../components/common/NavMenuMobile";
import HomeTopMobile from "../components/home/HomeTopMobile";
import FooterDesktop from "../components/common/FooterDesktop";
import FooterMobile from "../components/common/FooterMobile";
import axios from "axios";
import AppURL from "../api/AppURL";
import Chatbot from "../components/common/Chatbot";
import Articles from "../components/Articles";

function HomePage({user}) {
  useEffect(()=>{
    window.scroll(0,0);
    GetVisitorDetails();
  },[])

  const GetVisitorDetails = ()=>{
    axios.get(AppURL.VisitorDetails).then().catch();
  }
  return (
    <Fragment>
      <div className="Desktop">
        <NavMenuDesktop email={user.email} />
        <HomeTop />
      </div>
      <div className="Mobile">
        <NavMenuMobile />
        <HomeTopMobile />
      </div>
      <Articles />
      <FeaturedProducts />
      <NewArrival />
      <Categories />
      <Collection />
      <div className="Desktop">
        <FooterDesktop />
      </div>
      <div className="Mobile">
        <FooterMobile />
      </div>
      <Chatbot />
    </Fragment>
  );
}

export default HomePage;
