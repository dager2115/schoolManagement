import { ITeacher } from "../../services/teachersService/teachersService"

export const UPDATE_TEACHERS = "UPDATE_TEACHERS"

export interface ITeachersState {
    teachers: ITeacher[]
}

interface IUpdateTeachersAction {
    type: typeof UPDATE_TEACHERS,
    payload: ITeacher[]
}

export type ITeacherTypes = IUpdateTeachersAction