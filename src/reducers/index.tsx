//@import dependencies
import { combineReducers } from 'redux'
//@end

// @import types
import { ITeachersState } from './teacherReducer/types'
import { IStudentsState } from './studentReducer/types'
import { IMattersState } from './mattersReducer/types'
import { IPeriodsState } from './periodsReducer/types'
// @end

//@import reducers
import { teacherReducers } from './teacherReducer/reducers'
import { studentsReducers } from './studentReducer/reducers'
import { mattersReducers } from './mattersReducer/reducers'
import { periodsReducer } from './periodsReducer/reducers'
//@end

// @INFO Interface Combinar reducers
export interface CombineReducers {
  teacherReducers: ITeachersState
  studentsReducer: IStudentsState
  mattersReducers: IMattersState
  periodsReducer: IPeriodsState
}

// @INFO: Convinar reducers
const reducers = combineReducers({
  teacherReducers: teacherReducers,
  studentsReducer: studentsReducers,
  mattersReducers: mattersReducers,
  periodsReducer: periodsReducer
})

const rootReducer = (state: any, action: any) => {
  return reducers(state, action)
}

export type IRootState = ReturnType<typeof rootReducer>

export default rootReducer