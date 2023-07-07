import React, { Component } from 'react'
import HomeScreenLayout from '..'
import { AppComponent } from '../../../layouts/AppComponent'
import { IUser } from '../../../../services/userService/userService'
import { connect } from 'react-redux'
import store from '../../../../store/redux-storage'
import { updateTeachersAction } from '../../../../reducers/teacherReducer/actions'
import { updateStudentsAction } from '../../../../reducers/studentReducer/actions'
import { IMatter } from '../../../../services/mattersService/matterService'
import { updateMattersAction } from '../../../../reducers/mattersReducer/actions'

class HomeScreenContainer extends Component<any> {

    componentDidMount() {
        const { v4: uuidv4 } = require('uuid');
        const teachers = localStorage.getItem('teachers')
        if (!teachers) {
            const newTeachers: IUser[] = [
                {
                    id: uuidv4(),
                    name: "teacher",
                    lastName: "prueba1",
                    age: 30,
                    address: "calle 1 # 1-1",
                    phone: 3102949274
                },
                {
                    id: uuidv4(),
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
        const students = localStorage.getItem('students')
        if (!students) {
            const newStudents: IUser[] = [
                {
                    id: uuidv4(),
                    name: "student",
                    lastName: "prueba1",
                    age: 20,
                    address: "calle 1 # 1-1",
                    phone: 3102949274
                },
                {
                    id: uuidv4(),
                    name: "student",
                    lastName: "prueba2",
                    age: 20,
                    address: "calle 1 # 1-1",
                    phone: 3124787265
                },
            ]
            localStorage.setItem('students', JSON.stringify(newStudents))
            store.dispatch(updateStudentsAction(newStudents))
        }
        const matters = localStorage.getItem('matters')
        if (!matters) {
            const newMatters: IMatter[] = [
                {
                    id: uuidv4(),
                    name: "Matemáticas"
                },
                {
                    id: uuidv4(),
                    name: "Español"
                },
            ]
            localStorage.setItem('matters', JSON.stringify(newMatters))
            store.dispatch(updateMattersAction(newMatters))
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
