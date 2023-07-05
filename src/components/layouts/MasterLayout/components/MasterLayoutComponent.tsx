import React, { Fragment } from 'react'
import AppNavigationRouter from '../../../../routers/components/AppNavigationRouter'

interface IMasterLayoutComponentProps {

}

const MasterLayoutComponent = (props: IMasterLayoutComponentProps) => {
    return (
        <Fragment>
            <AppNavigationRouter />
        </Fragment>
    )
}

export default MasterLayoutComponent