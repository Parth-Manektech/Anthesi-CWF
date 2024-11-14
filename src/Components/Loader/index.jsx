import React from 'react'


export function Loader() {
  return (
    <div className='mainLoading d-flex align-items-center justify-content-center'>
      <div className="progress-spinner">
        <i className="fa-solid fa-circle-notch fa-spin loader-icon"></i>
        <span className="visually-hidden">Caricamento...</span>
      </div>
    </div>
  )
}
