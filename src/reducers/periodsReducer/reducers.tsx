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
                periods: action.payload.map(period => ({
                    ...period,
                    year: typeof period.year === 'string' ? period.year : JSON.stringify(period.year)
                }))
            }

        default:
            return {
                ...state
            }
    }
}