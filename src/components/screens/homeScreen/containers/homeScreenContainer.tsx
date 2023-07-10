import React, { Component } from 'react'
import HomeScreenLayout from '..'
import { AppComponent } from '../../../layouts/AppComponent'
import { IUser } from '../../../../services/userService/userService'
import { IMatter } from '../../../../services/mattersService/matterService'
import { generarCodeId } from '../../../../utils/commons'
class HomeScreenContainer extends Component<any> {

    componentDidMount() {
        const { v4: uuidv4 } = require('uuid');
        const teachers = localStorage.getItem('teachers')
        if (!teachers) {
            const newTeachers: IUser[] = [
                {
                    id: uuidv4(),
                    name: "German",
                    lastName: "Perez",
                    age: 30,
                    address: "calle 1 # 1-1",
                    phone: 3102949274,
                    code: generarCodeId(0, 99999)
                },
                {
                    id: uuidv4(),
                    name: "Francisco",
                    lastName: "Lopez",
                    age: 30,
                    address: "calle 1 # 1-1",
                    phone: 3124787265,
                    code: generarCodeId(0, 99999)
                },
            ]
            localStorage.setItem('teachers', JSON.stringify(newTeachers))
        }
        const students = localStorage.getItem('students')
        if (!students) {
            const newStudents: IUser[] = [
                {
                    id: uuidv4(),
                    name: "Juan",
                    lastName: "Molina",
                    age: 20,
                    address: "calle 1 # 1-1",
                    phone: 3102949274,
                    code: generarCodeId(0, 99999)
                },
                {
                    id: uuidv4(),
                    name: "Pablo",
                    lastName: "Mateus",
                    age: 20,
                    address: "calle 1 # 1-1",
                    phone: 3124787265,
                    code: generarCodeId(0, 99999)
                },
            ]
            localStorage.setItem('students', JSON.stringify(newStudents))
        }
        const matters = localStorage.getItem('matters')
        if (!matters) {
            const newMatters: IMatter[] = [
                {
                    id: uuidv4(),
                    name: "Matemáticas",
                    code: generarCodeId(0, 99999)
                },
                {
                    id: uuidv4(),
                    name: "Español",
                    code: generarCodeId(0, 99999)
                },
            ]
            localStorage.setItem('matters', JSON.stringify(newMatters))
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

export default HomeScreenContainer
