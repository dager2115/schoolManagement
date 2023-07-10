import { IAcademicPeriod } from "../../services/academicPeriodService/academicPeriodService"

export const UPDATE_PERIODS = "UPDATE_PERIODS"

export interface IPeriodsState {
    periods: IAcademicPeriod[]
}

interface IUpdatePeriodsAction {
    type: typeof UPDATE_PERIODS,
    payload: IAcademicPeriod[]
}

export type IPeriodsTypes = IUpdatePeriodsAction