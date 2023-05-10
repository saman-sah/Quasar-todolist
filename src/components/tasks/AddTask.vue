<template>
    <q-card>     
        <q-card-section class="row">
          <div class="text-h6">{{ actionButton }}</div>
          <q-space />
          <q-btn icon="close" flat round  v-close-popup />
        </q-card-section>

        <form @submit.prevent="submitForm">
            <q-card-section class="q-pt-none">
                <q-input v-model="newTask.title" 
                ref="_ref_taskTitle"
                :rules="[val => !!val || 'Field is required']"
                outlined 
                autofocus
                label="Task Title">
                <template v-slot:append v-if="newTask.title">
                    <q-icon name="close" @click="newTask.title = ''" class="cursor-pointer" />
                </template>

                </q-input>
                <q-input outlined v-model="newTask.dueDate" class="q-mb-md" >
                <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-date v-model="newTask.dueDate">
                        <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Close" color="primary" flat />
                        </div>
                        </q-date>
                    </q-popup-proxy>
                    </q-icon>
                    <q-icon v-if="newTask.dueDate && newTask.dueDate.length"
                    name="close" @click="clearDates()" 
                    class="cursor-pointer" />
                </template>
                </q-input>
                <q-input outlined v-model="newTask.dueTime" class="q-mb-sm">
                <template v-slot:append>
                    <q-icon name="access_time" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-time v-model="newTask.dueTime" 
                        :disable="!newTask.dueDate">
                        <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Close" color="primary" flat />
                        </div>
                        </q-time>
                    </q-popup-proxy>
                    </q-icon>
                    <q-icon v-if="newTask.dueTime && newTask.dueTime.length"
                    name="close" @click="newTask.dueTime=''" 
                    class="cursor-pointer" />
                </template>
                </q-input>
            </q-card-section>
            <q-card-actions align="right">
                <q-btn type="submit" :label="actionButton" color="primary"  />
            </q-card-actions>
        </form>
    </q-card>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    props: ['editTask', 'taskId'],
    data(){
        return {
            newTask: {
                title: '',
                dueDate: '',
                dueTime: '',
                completed: false,
            },
            tempTask: {},
            actionButton: 'Add Task',
            add_update_task: 'add'
        }
    },
    mounted() {
        if(this.editTask && this.editTask.title) {
            this.tempTask= {
                title: this.editTask.title,
                dueDate: this.editTask.dueDate,
                dueTime: this.editTask.dueTime,
            };
            this.newTask=this.tempTask
            this.actionButton= 'Update Task'
            this.add_update_task= 'update'
        }
    },
    methods: {
        ...mapActions('tasks',{
        addTask: 'addTask',
        updateTask: 'updateTask'
        }),
        submitForm() {
        this.$refs._ref_taskTitle.validate();
        if(!this.$refs._ref_taskTitle.hasError) {
            if(this.add_update_task== 'update') {
                this.updateTask({id: this.taskId, updates:{
                    title: this.newTask.title,
                    dueDate: this.newTask.dueDate,
                    dueTime: this.newTask.dueTime,
                }});
                this.$emit('close-add-modal');
            }else {
                this.addTask(this.newTask);
                this.$emit('close-add-modal');
            }
            this.newTask= {
                title: '',
                dueDate: '',
                dueTime: '',
                completed: false,
            }
        }      
        
        },
        clearDates() {
            this.newTask.dueDate=''
            this.newTask.dueTime=''
        },
        clearTaskObject() {
            this.newTask= {
                title: '',
                dueDate: '',
                dueTime: '',
                completed: false,
            }
        },
    },
}
</script>

<style>

</style>