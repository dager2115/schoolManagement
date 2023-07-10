import React, { Component } from "react";
import { AppComponent } from "../../../layouts/AppComponent";
import StudentsScreenLayout from "..";
import UserService, { IUser } from "../../../../services/userService/userService";
import store from "../../../../store/redux-storage";
import { updateStudentsAction } from "../../../../reducers/studentReducer/actions";

interface IStudentsScreenState {
    students: IUser[]
}

class StudentsScreenContainer extends Component<any, IStudentsScreenState> {

    private userService = new UserService()

    constructor(props: any) {
        super(props)

        this.state = {
            students: []
        }
    }

    componentDidMount() {
        this.getStudents()
    }

    getStudents = () => {
        const students = store.getState().studentsReducer.students
        if (!students?.length) {
            const response = this.userService.getUsers('students')
            if (response.code === 200) {
                this.setState({ students: response.users })
                store.dispatch(updateStudentsAction(response.users))
            }
        } else {
            this.setState({ students })
        }
    }

    render() {
        return (
            <AppComponent>
                <StudentsScreenLayout students={this.state.students} />
            </AppComponent>
        )
    }
}

export default StudentsScreenContainer