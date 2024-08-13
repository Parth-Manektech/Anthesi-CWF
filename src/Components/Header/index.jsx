import React from 'react'
import SITE_image from '../../Assets/Images/SITE.png'
import { SearchIcon, UserIcon } from '../../Assets/SVGs'
import { NavDropdown } from 'react-bootstrap'

function Header() {
    return (
        <div className='header'>
            <div className='HearderBar'>
                <div className='header-left'>
                    <span className='Bar-title'>Anthesi coustom workflow</span>
                </div>
                <div className='header-right'>
                    <span>
                        <UserIcon />
                    </span>
                    <span className='H_line'></span>
                    <span>
                        <NavDropdown
                            id="nav-dropdown-dark"
                            title="Login"
                            menuVariant="light"
                        >
                            <NavDropdown.Item >Profile</NavDropdown.Item>
                            <NavDropdown.Item >
                                Action
                            </NavDropdown.Item>
                            <NavDropdown.Item >Change Password</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item >
                                Log out
                            </NavDropdown.Item>
                        </NavDropdown>
                    </span>
                </div>
            </div>
            <div className='MainHeader'>
                <div className='header-left'>
                    <img onClick={() => window.location.reload()} className='SiteLogo' src={SITE_image} height={80} width={200} alt="SITE image" />
                </div>
                <div className='header-right'>
                    <span className='HeaderSearchIcon'>
                        <SearchIcon />
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Header