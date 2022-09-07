import axios from 'axios'

const settings = {
    withCredentials: true,
    headers: {
        "API-KEY": "c02b931f-80a3-4924-ae3f-14e4aedc46da",
    },
}
export const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.1/todo-lists/`,
    ...settings
})
//types
export type TodoListType = {
    id: string,
    title: string,
    addedDate: string,
    order: number
}

export type GetTaskResponseType = {
    items: Array<TaskDataType>
    totalCount: number,
    error: null | string
}
export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    High = 2,
    Urgently = 3,
    Later = 4 ,
}
export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3,
}
export type TaskDataType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export type UpdateBodyType = {
    title: string,
    description: string,
    status: number
    priority: number
    startDate: string
    deadline: string
}
export type ResponseType<D = {}> = {  //это дженерик тип. <D = {}> значение по умолчанию типа D = пустой объект
    fieldsErrors: Array<string>
    messages: Array<string>
    resultCode: 0|1
    data: D
}

//api
export const taskAPI = {
    getTasks(todolistId: string) {
        return instance.get <GetTaskResponseType> (`${todolistId}/tasks`)
    },
    createTask(todolistID: string, title: string) {
        return instance.post<ResponseType<{item:TaskDataType}>>(`${todolistID}/tasks`, {title})
    },
    updateTaskTitle(todoListID: string, taskID: string, model: UpdateBodyType) {
        return instance.put<ResponseType<{item:Array<TaskDataType>}>>(`${todoListID}/tasks/${taskID}`, model)
    },
    deleteTask(todoListID: string, taskID: string) {
        return instance.delete<ResponseType<{item:Array<TaskDataType>}>>(`${todoListID}/tasks/${taskID}`)
    },

}