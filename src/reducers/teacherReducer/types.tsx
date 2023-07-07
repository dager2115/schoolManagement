import { IUser } from "../../services/userService/userService"

export const UPDATE_TEACHERS = "UPDATE_TEACHERS"

export interface ITeachersState {
    teachers: IUser[]
}

interface IUpdateTeachersAction {
    type: typeof UPDATE_TEACHERS,
    payload: IUser[]
}

export type ITeacherTypes = IUpdateTeachersAction