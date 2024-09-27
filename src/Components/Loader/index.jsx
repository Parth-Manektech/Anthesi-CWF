import React from 'react'


export function Loader() {
  return (
    <div className='mainLoading d-flex align-items-center justify-content-center'>
      <div className="progress-spinner progress-spinner-active">
        <span className="visually-hidden">Caricamento...</span>
      </div>
    </div>
  )
}
