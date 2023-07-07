import { IUser } from '../../services/userService/userService'
import * as types from './types'

export const updateStudentsAction = (teachers: IUser[]) => ({
    type: types.UPDATE_STUDENTS,
    payload: teachers
})