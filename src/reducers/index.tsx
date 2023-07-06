//@import dependencies
import { combineReducers } from 'redux'
//@end

// @import types
// @end

//@import reducers
import {teacherReducers} from './teacherReducer/reducers'
import { ITeachersState } from './teacherReducer/types'
//@end

// @INFO Interface Combinar reducers
export interface CombineReducers {
  teacherReducers: ITeachersState
}

// @INFO: Convinar reducers
const reducers = combineReducers({
  teacherReducers: teacherReducers
})

const rootReducer = (state: any, action: any) => {
  return reducers(state, action)
}

export type IRootState = ReturnType<typeof rootReducer>

export default rootReducer