import React, { Component } from "react";
import { AppComponent } from "../../../layouts/AppComponent";
import TeachersScreenLayout from "..";
import UserService, { IUser } from "../../../../services/userService/userService";
import store from "../../../../store/redux-storage";
import { updateTeachersAction } from "../../../../reducers/teacherReducer/actions";

interface ITeachersScreenState {
    teachers: IUser[]

}

class TeachersScreenContainer extends Component<any, ITeachersScreenState> {

    private userService = new UserService()

    constructor(props: any) {
        super(props)

        this.state = {
            teachers: []
        }
    }

    componentDidMount() {
        //@ts-ignore
        this.getTeachers()
    }

    getTeachers = () => {
        const teachers = store.getState().teacherReducers.teachers
        if (!teachers?.length) {
            const response = this.userService.getUsers('teachers')
            if (response.code === 200) {
                this.setState({ teachers: response.users })
                store.dispatch(updateTeachersAction(response.users))
            }
        } else {
            this.setState({ teachers })
        }
    }

    render() {
        return (
            <AppComponent>
                <TeachersScreenLayout teachers={this.state.teachers} />
            </AppComponent>
        )
    }
}

export default TeachersScreenContainer