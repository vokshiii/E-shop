import React, { Fragment } from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import UserLoginPage from '../pages/UserLoginPage'
import ContactPage from '../pages/ContactPage'
import PurchasePage from '../pages/PurchasePage'
import PrivacyPage from '../pages/PrivacyPage'
import RefundPage from '../pages/RefundPage'

function AppRoutes() {
  return (
    <Fragment>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<UserLoginPage />} />
        <Route path='/contact' element={<ContactPage />} />
        <Route path='/purchase' element={<PurchasePage />} />
        <Route path='/privacy' element={<PrivacyPage />} />
        <Route path='/refund' element={<RefundPage />} />
      </Routes>
    </Fragment>
  )
}

export default AppRoutes