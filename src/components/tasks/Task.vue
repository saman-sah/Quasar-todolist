<template>
  <q-list  padding separator>
    <q-banner inline-actions class="text-white bg-red text-center bg-red-14" >
      <span class="text-h5">Task To DO</span>
    </q-banner>
    <template v-if="Object.keys(tasksToDo).length">
       <q-item 
    v-for="(task, key) in tasksToDo"
    :key="key"
    :class="task.completed ? 'bg-cyan-1' : 'bg-pink-1'"      
    tag="label"     
    v-ripple>
      <q-item-section side >
        <q-checkbox v-model="task.completed" />
      </q-item-section>

      <q-item-section>
        <q-item-label
        clickable
        @click="updateTask({id: key, updates:{completed: !task.completed}})"
        :class="{'completed': task.completed}"
        >{{ task.title }}</q-item-label>
      </q-item-section>
      
      <q-item-section side>          
        <q-item-label caption>
          <q-icon v-if="task.dueDate" name="event" size="16px" class="justify-center"/>
            {{ task.dueDate }}
          </q-item-label>
        <q-item-label caption>
          {{ task.dueTime }}
        </q-item-label>
      </q-item-section>
      <q-item-section side>
        <div class="row">
          <q-btn @click.stop="confirmDeleteTask(key)"
          flat round color="primary" icon="delete" />
          <q-btn @click="this.$emit('update-task', {id: key, task:task})"
          flat round color="secondary" icon="edit" />
        </div>
      </q-item-section>
    </q-item>
    </template>
    <template v-else>
      <div class="col">
        <q-banner :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'">
          <template v-slot:avatar>
            <q-icon name="block" color="primary" />
          </template>
          <span class="text-h6">There is no task To Do</span>
          <template v-slot:action>
            <q-btn flat color="primary" label="Add Task" />
          </template>
        </q-banner>
        
      </div>
    </template>
  </q-list>


<hr>
  <q-list  padding separator>
    <q-banner inline-actions class="text-white bg-red text-center bg-cyan-13" >
      <span class="text-h5">Tasks Completed</span> 
    </q-banner>
    
    <template v-if="Object.keys(tasksCompleted).length">
      <q-item 
      v-for="(task, key) in tasksCompleted"
      :key="key"
      :class="task.completed ? 'bg-cyan-1' : 'bg-pink-1'"      
      tag="label"     
      v-ripple>
        <q-item-section side >
          <q-checkbox v-model="task.completed" />
        </q-item-section>

        <q-item-section>
          <q-item-label
          clickable
          @click="updateTask({id: key, updates:{completed: !task.completed}})"
          :class="{'completed': task.completed}"
          >{{ task.title }}</q-item-label>
        </q-item-section>
        
        <q-item-section side>          
          <q-item-label caption>
            <q-icon v-if="task.dueDate" name="event" size="16px" class="justify-center"/>
              {{ task.dueDate }}
            </q-item-label>
          <q-item-label caption>
            {{ task.dueTime }}
          </q-item-label>
        </q-item-section>
        <q-item-section side>
          <div class="row">
            <q-btn @click.stop="confirmDeleteTask(key)"
            flat round color="primary" icon="delete" />
            <q-btn @click="this.$emit('update-task', {id: key, task:task})"
            flat round color="secondary" icon="edit" />
          </div>
        </q-item-section>
      </q-item>
    </template>
    <template v-else>
      <div class="col">
        <q-banner :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'">
          <template v-slot:avatar>
            <q-icon name="remove_done" color="primary" />
          </template>
          <span class="text-h6">No task has been completed</span>
        </q-banner>
        
      </div>
    </template>
  </q-list>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {  
  computed: {
    ...mapGetters('tasks',[
      'tasksToDo',
      'tasksCompleted'
    ])
  },
  methods: {
    ...mapActions('tasks',[
      'updateTask',
      'deleteTask'
    ]),
    confirmDeleteTask(taskId) {
      this.$q.dialog({
        title: 'Delete',
        message: 'Are you sure?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.deleteTask(taskId)
      })
    }
  },
}
</script>

<style>

</style>