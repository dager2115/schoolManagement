import React, { Component } from 'react'
import CategoriesComponentLayout from '..'

interface ICategoriesComponentContainerProps {
}


class CategoriesComponentContainer extends Component<ICategoriesComponentContainerProps, any> {
    render() {
        return (
            <CategoriesComponentLayout {...this.props} />
        )
    }
}

export default CategoriesComponentContainer
