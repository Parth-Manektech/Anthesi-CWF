import React from 'react'


export function Loader() {
  return (
    <div className='loading d-flex align-items-center justify-content-center top-0 left-0 position-fixed h-100 w-100'>
      <div className="progress-spinner progress-spinner-active">
        <span className="visually-hidden">Caricamento...</span>
      </div>
    </div>
  )
}
