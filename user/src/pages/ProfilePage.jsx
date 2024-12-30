import React, { useEffect } from 'react'
import { Fragment } from 'react'
import NavMenuDesktop from "../components/common/NavMenuDesktop";
import NavMenuMobile from "../components/common/NavMenuMobile";
import FooterDesktop from "../components/common/FooterDesktop";
import FooterMobile from "../components/common/FooterMobile";
import Profile from '../components/common/Profile';
function ProfilePage({user}) {
    useEffect(()=>{
      window.scroll(0,0);
      },[])
  return (
    <Fragment>
    <div className="Desktop">
    <NavMenuDesktop email={user.email} />
    </div>
    <div className="Mobile">
      <NavMenuMobile />
    </div>

    <Profile user={user} />

    <div className="Desktop">
      <FooterDesktop />
    </div>
    <div className="Mobile">
      <FooterMobile />
    </div>
  </Fragment>
  )
}

export default ProfilePage