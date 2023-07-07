import { IMatter } from '../../services/mattersService/matterService'
import * as types from './types'

export const updateMattersAction = (matters: IMatter[]) => ({
    type: types.UPDATE_MATTERS,
    payload: matters
})