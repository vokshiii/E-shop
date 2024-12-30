import React, { Fragment, useEffect } from "react";
import NavMenuDesktop from "../components/common/NavMenuDesktop";
import NavMenuMobile from "../components/common/NavMenuMobile";
import FooterDesktop from "../components/common/FooterDesktop";
import FooterMobile from "../components/common/FooterMobile";
import OrderList from "../components/Cart/OrderList";

function OrderListPage({ user }) {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  return (
    <Fragment>
      <div className="Desktop">
        <NavMenuDesktop email={user.email} />
      </div>
      <div className="Mobile">
        <NavMenuMobile />
      </div>

      <OrderList user={user} />

      <div className="Desktop">
        <FooterDesktop />
      </div>
      <div className="Mobile">
        <FooterMobile />
      </div>
    </Fragment>
  );
}

export default OrderListPage;
