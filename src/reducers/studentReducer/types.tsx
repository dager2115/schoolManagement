import { IUser } from "../../services/userService/userService"

export const UPDATE_STUDENTS = "UPDATE_STUDENTS"

export interface IStudentsState {
    students: IUser[]
}

interface IUpdateStudentsAction {
    type: typeof UPDATE_STUDENTS,
    payload: IUser[]
}

export type IStudentsTypes = IUpdateStudentsAction