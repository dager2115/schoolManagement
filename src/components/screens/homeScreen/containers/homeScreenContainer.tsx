import React, { Component } from 'react'
import HomeScreenLayout from '..'
import { AppComponent } from '../../../layouts/AppComponent'
import { ITeacher } from '../../../../services/teachersService/teachersService'
import { connect } from 'react-redux'
import store from '../../../../store/redux-storage'
import { updateTeachersAction } from '../../../../reducers/teacherReducer/actions'

class HomeScreenContainer extends Component<any> {

    componentDidMount() {
        const teachers = localStorage.getItem('teachers')
        if (!teachers) {
            const newTeachers: ITeacher[] = [
                {
                    id: 1,
                    name: "teacher",
                    lastName: "prueba1",
                    age: 30,
                    address: "calle 1 # 1-1",
                    phone: 3102949274
                },
                {
                    id: 2,
                    name: "teacher",
                    lastName: "prueba2",
                    age: 30,
                    address: "calle 1 # 1-1",
                    phone: 3124787265
                },
            ]
            localStorage.setItem('teachers', JSON.stringify(newTeachers))
            store.dispatch(updateTeachersAction(newTeachers))
        }
    }

    render() {
        return (
            <AppComponent>
                <HomeScreenLayout />
            </AppComponent>
        )
    }
}

export default connect()(HomeScreenContainer)
