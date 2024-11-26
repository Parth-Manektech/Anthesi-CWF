import React from 'react'
import { CWFLOGO, DownIcon, FacebookLogo, InstaLogo, Menubar, SearchIcon, Twitterlogo, UserLineIcon } from '../../Assets/SVGs'
import { Link } from 'react-router-dom'

function Header() {
    return (
        <>
            <div className="it-header-slim-wrapper">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="it-header-slim-wrapper-content">
                                <a className="d-lg-block navbar-brand" href="#">Ente appartenenza</a>
                                <div className="it-header-slim-right-zone">
                                    <div className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            <span className="visually-hidden">Selezione lingua: lingua selezionata</span>
                                            <span className='me-1'>ITA</span>
                                            <DownIcon />
                                        </a>
                                        <div className="dropdown-menu">
                                            <div className="row">
                                                <div className="col-12">
                                                    <div className="link-list-wrapper">
                                                        <ul className="link-list">
                                                            <li><a className="dropdown-item list-item" href="#"><span>ITA <span className="visually-hidden">selezionata</span></span></a></li>
                                                            <li><a className="dropdown-item list-item" href="#"><span>ENG</span></a></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <a href="#" className="btn btn-primary btn-icon btn-full">
                                        <span className="rounded-icon">
                                            <UserLineIcon className='userLineIcon' />
                                        </span>
                                        <span className="d-none d-lg-block">Accedi all&#39;area personale</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="it-header-center-wrapper">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="it-header-center-content-wrapper">
                                <div className='d-flex align-items-center gap-3'>
                                    <span className='menubar'>
                                        <Menubar />
                                    </span>
                                    <div className="it-brand-wrapper">
                                        <a href="#">

                                            <span className='me-3 CWF-logo'><CWFLOGO /></span>
                                            <div className="it-brand-text">
                                                <div className="it-brand-title">Nome dell&apos;Istituzione</div>
                                                <div className="it-brand-tagline d-none d-md-block">Tag line dell&apos;Istituzione</div>
                                            </div>
                                        </a>
                                    </div>
                                </div>

                                <div className="it-right-zone">
                                    <div className="it-socials d-none d-md-flex">
                                        <span>Seguici su</span>
                                        <ul className='ms-3 d-flex gap-3'>
                                            <li>
                                                <a href="#" aria-label="Facebook" target="_blank">
                                                    <FacebookLogo />
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" aria-label="Github" target="_blank">
                                                    <InstaLogo />
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" aria-label="Twitter" target="_blank">
                                                    <Twitterlogo />
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="it-search-wrapper">
                                        <span className="d-none d-md-block">Cerca</span>
                                        <a className="rounded-icon" aria-label="Cerca nel sito" href="#">
                                            <SearchIcon className='SearchIcon' />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='SeccondHeaderBar'>
                <div className='header-left d-flex gap- align-items-center'>
                    <Link rel="stylesheet" href="#" >Link</Link>
                    <Link rel="stylesheet" href="#" >Link</Link>
                    <Link rel="stylesheet" href="#" >Link</Link>
                    <Link rel="stylesheet" href="#" >Link</Link>
                    <Link rel="stylesheet" href="#" >Link</Link>
                </div>
                <div className='header-right d-flex gap-2 align-items-center'>
                    <Link rel="stylesheet" href="#" >Link</Link>
                    <Link rel="stylesheet" href="#" >Link</Link>
                    <Link rel="stylesheet" href="#" >Link</Link>
                    <Link rel="stylesheet" href="#" >Link</Link>
                </div>
            </div>
        </>
    )
}

export default Header