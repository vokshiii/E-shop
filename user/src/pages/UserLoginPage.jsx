import React, { useEffect } from 'react'
import { Fragment } from 'react'
import NavMenuDesktop from "../components/common/NavMenuDesktop";
import NavMenuMobile from "../components/common/NavMenuMobile";
import FooterDesktop from "../components/common/FooterDesktop";
import FooterMobile from "../components/common/FooterMobile";
import UserLogin from '../components/common/UserLogin';

function UserLoginPage({user, setUser}) {
  useEffect(()=>{
    window.scroll(0,0);
  },[])
  return (
    <Fragment>
    <div className="Desktop">
      <NavMenuDesktop />
    </div>
    <div className="Mobile">
      <NavMenuMobile />
    </div>
    
    <UserLogin setUser={setUser} user={user} />

    <div className="Desktop">
      <FooterDesktop />
    </div>
    <div className="Mobile">
      <FooterMobile />
    </div>
  </Fragment>
  )
}

export default UserLoginPage