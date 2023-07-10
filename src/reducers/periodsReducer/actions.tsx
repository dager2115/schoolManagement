import { IAcademicPeriod } from '../../services/academicPeriodService/academicPeriodService'
import * as types from './types'

export const updatePeriodsAction = (periods: IAcademicPeriod[]) => ({
    type: types.UPDATE_PERIODS,
    payload: periods
})