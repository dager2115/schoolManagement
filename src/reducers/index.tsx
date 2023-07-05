//@import dependencies
import {combineReducers} from 'redux'
//@end

// @import types
// @end

//@import reducers
//@end

// @INFO Interface Combinar reducers


// @INFO: Convinar reducers
const reducers = combineReducers({
})

const rootReducer = (state: any, action: any) => {
  return reducers(state, action)
}

export type IRootState = ReturnType<typeof rootReducer>

export default rootReducer