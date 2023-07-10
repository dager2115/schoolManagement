import * as types from './types'

const initialState: types.IMattersState = {
    matters: []
}

export function mattersReducers(
    state = initialState,
    action: types.IMattersTypes
): types.IMattersState {
    switch (action.type) {
        case types.UPDATE_MATTERS:
            return {
                ...state,
                matters: action.payload
            }

        default:
            return {
                ...state
            }
    }
}