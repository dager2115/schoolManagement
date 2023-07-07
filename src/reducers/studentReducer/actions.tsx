import { IUser } from '../../services/userService/userService'
import * as types from './types'

export const updateStudentsAction = (students: IUser[]) => ({
    type: types.UPDATE_STUDENTS,
    payload: students
})