import React from 'react'
import '../navBar.scss'

interface INavBarlayoutProps {

}

const NavBarLayout = (props: INavBarlayoutProps) => {
    return (
        <div className='nav-bar-container'>
            <div className='logo-container'>
                <h1>Students tool</h1>
            </div>
        </div>
    )
}

export default NavBarLayout