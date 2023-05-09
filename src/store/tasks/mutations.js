import { uid } from 'quasar'

export function UPDATE_TASK (state, payload) {
    Object.assign(state.tasks[payload.id], payload.updates)
}
export function DELETE_TASK (state, taskId) {
    delete state.tasks[taskId]
}
export function ADD_TASK (state, newTask) {
    let randomTaskId = uid()
    state.tasks[randomTaskId]= newTask;
    console.log(state.tasks);
}
