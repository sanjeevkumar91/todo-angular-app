export interface Todo {
    id: number
    title: string
    completed: boolean
    canEdit: boolean
}
  
export interface TodoState {
    todo: Todo[]
}
