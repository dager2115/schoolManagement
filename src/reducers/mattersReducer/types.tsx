import { IMatter } from "../../services/mattersService/matterService"

export const UPDATE_MATTERS = "UPDATE_MATTERS"

export interface IMattersState {
    matters: IMatter[]
}

interface IUpdateMattersAction {
    type: typeof UPDATE_MATTERS,
    payload: IMatter[]
}

export type IMattersTypes = IUpdateMattersAction