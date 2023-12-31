import { IUser } from '../../services/userService/userService'
import * as types from './types'

export const updateTeachersAction = (teachers: IUser[]) => ({
    type: types.UPDATE_TEACHERS,
    payload: teachers
})