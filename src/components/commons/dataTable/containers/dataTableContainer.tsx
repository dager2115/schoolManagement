import React, { Component } from 'react'
import DataTableLayout from '..'

export interface IDataTableProps {
    data: any[]
    headerKeys: string[]
    keys: string[]
    actions?: (data: any) => React.ReactNode
    title: string
}

class DataTableContainer extends Component<IDataTableProps, any> {
    render() {
        return (
            <DataTableLayout {...this.props} />
        )
    }
}

export default DataTableContainer