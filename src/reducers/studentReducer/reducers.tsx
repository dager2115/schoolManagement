import * as types from './types'

const initialState: types.IStudentsState = {
    students: []
}

export function studentsReducers(
    state = initialState,
    action: types.IStudentsTypes
): types.IStudentsState {
    switch (action.type) {
        case types.UPDATE_STUDENTS:
            return {
                students: action.payload
            }

        default:
            return {
                ...state
            }
    }
}