<template>
  <q-page class="bg-accent q-pa-md" >
    <task-component
    @update-task="updateTask($event)" />
    <div class="absolute-bottom text-center q-pa-sm">
      <q-btn 
      @click="addTaskAction()"
      outline round 
      color="primary" icon="add" 
      size="20px"/>
    </div>

    <q-dialog v-model="showModalAddTask" ref="dialogtest">
       <add-task-modal 
       :editTask="editTask"
       :taskId="taskId"
       @close-add-modal="showModalAddTask= false"
       />            
    </q-dialog>

    
  </q-page>
   
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  data(){
    return {
      showModalAddTask: false,
      editTask: {},
      keyTask: ''
    }
  },
  components: {
    'task-component': require('components/tasks/Task.vue').default,
    'add-task-modal': require('components/tasks/AddTask.vue').default
  },
  methods: {
    updateTask(payload) {
      this.taskId= payload.id;
      this.editTask= payload.task;
      this.showModalAddTask= true;
    },
    addTaskAction() {
      this.editTask={}
      this.showModalAddTask= true
    }
  },
})
</script>

<style>
.completed {
  text-decoration: line-through;
}
</style>