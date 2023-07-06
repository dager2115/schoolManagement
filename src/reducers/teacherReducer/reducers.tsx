import * as types from './types'

const initialState: types.ITeachersState = {
    teachers: []
}

export function teacherReducers(
    state = initialState,
    action: types.ITeacherTypes
): types.ITeachersState {
    switch (action.type) {
        case types.UPDATE_TEACHERS:
            return {
                teachers: action.payload
            }

        default:
            return {
                ...state
            }
    }
}