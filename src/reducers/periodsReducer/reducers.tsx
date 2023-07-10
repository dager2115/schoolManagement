import * as types from './types'

const initialState: types.IPeriodsState = {
    periods: []
}

export function periodsReducer(
    state = initialState,
    action: types.IPeriodsTypes
): types.IPeriodsState {
    switch (action.type) {
        case types.UPDATE_PERIODS:
            return {
                ...state,
                periods: action.payload
            }

        default:
            return {
                ...state
            }
    }
}