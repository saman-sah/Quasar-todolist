<template>
  <q-list  padding separator>
      <q-item 
      v-for="(task, key) in tasks"
      :key="key"
      :class="task.completed ? 'bg-cyan-1' : 'bg-pink-1'"      
      tag="label"     
      v-ripple>
        <!-- <q-item-section side >
          <q-checkbox v-model="task.completed" />
        </q-item-section> -->

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
    </q-list>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {  
  computed: {
    ...mapGetters('tasks',[
      'tasks'
    ])
  },
  methods: {
    ...mapActions('tasks',[
      'updateTask',
      'deleteTask'
    ]),
    confirmDeleteTask(taskId) {
      this.$q.dialog({
        title: 'Confirm',
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