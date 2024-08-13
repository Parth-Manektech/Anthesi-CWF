import React, { Suspense } from 'react'
import PropTypes from 'prop-types'
import { Loader } from '../Components/Loader'
import Header from '../Components/Header'


function MainLayout({ children }) {
  return (
    <div className='main-layout'>
      <Header />
      <Suspense fallback={<Loader />}>
        {children}
      </Suspense>
    </div>
  )
}
MainLayout.propTypes = {
  children: PropTypes.node.isRequired
}
export default MainLayout
