import React from 'react'
import { NavBar } from '../../../commons/navBar'

interface IAppLayoutProps {
    children: React.ReactNode
}

const AppLayout = (props: IAppLayoutProps) => {
    return (
        <div>
            <NavBar />
            {props.children}
        </div>
    )
}

export default AppLayout