export function updateTask ({ commit }, payload) {    
    commit('UPDATE_TASK', payload)
}
export function deleteTask ({ commit }, taskId) {    
    commit('DELETE_TASK', taskId)
}
export function addTask ({ commit }, newTask) {    
    commit('ADD_TASK', newTask)
}
