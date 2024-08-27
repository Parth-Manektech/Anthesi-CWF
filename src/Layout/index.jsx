import React, { Suspense } from 'react'
import PropTypes from 'prop-types'
import { Loader } from '../Components/Loader'
import Header from '../Components/Header'
import Footer from '../Components/Footer'


function MainLayout({ children }) {
  return (
    <div className='main-layout'>
      <Header />
      <Suspense fallback={<Loader />}>
        <main>{children}</main>
      </Suspense>
      <Footer />
    </div>
  )
}
MainLayout.propTypes = {
  children: PropTypes.node.isRequired
}
export default MainLayout
