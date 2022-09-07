import {setAppErrorAC, setAppStatusAC} from "../state/app-reducer";
import { setTodoListEntityStatusAC} from "../state/todolistsReducer";
import {Dispatch} from "redux";

import {ResponseType} from '../api/taskAPI'


export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch/*<ActionsTasksType |
    ActionsTodoListsType | AppActionsType> | AppActionsType*/, todoListID?: string) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC({error: data.messages[0]}));
    } else {
        dispatch(setAppErrorAC({error: "Some error occupied"}));
    }
    dispatch(setAppStatusAC({status: "failed"}));
    todoListID && dispatch(setTodoListEntityStatusAC({todoListID:todoListID,
        entityStatus: "failed"}));
}
export const handleServerNetworkError = (error: Error, dispatch: Dispatch/*<ActionsTasksType>*/, todoListID?: string) => {
    dispatch(setAppErrorAC({error: error.message ? error.message : "Some error occupied"}));
    dispatch(setAppStatusAC({status: "failed"}));
    if (todoListID)
        dispatch(setTodoListEntityStatusAC({todoListID, entityStatus: "failed"}));
}
