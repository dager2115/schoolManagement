import { ITeacher } from '../../services/teachersService/teachersService'
import * as types from './types'

export const updateTeachersAction = (teachers: ITeacher[]) => ({
    type: types.UPDATE_TEACHERS,
    payload: teachers
})