import * as types from './types'

const initialState: types.IMattersState = {
    matters: []
}

export function studentsReducers(
    state = initialState,
    action: types.IMattersTypes
): types.IMattersState {
    switch (action.type) {
        case types.UPDATE_MATTERS:
            return {
                matters: action.payload
            }

        default:
            return {
                ...state
            }
    }
}