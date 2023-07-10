import React from 'react'
import '../navBar.scss'
import { useNavigate } from 'react-router-dom';

interface INavBarlayoutProps {

}

const NavBarLayout = (props: INavBarlayoutProps) => {

    const navigate = useNavigate()

    return (
        <div className='nav-bar-container'>
            <div style={{cursor: 'pointer'}} className='logo-container' onClick={() => navigate('/')}>
                <h1>School Management</h1>
            </div>
        </div>
    )
}

export default NavBarLayout