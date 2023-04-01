<template>
    <div class="wrapper">
        <AppHeader />
        <section class="todo">
            <div class="todo__container">
                <div class="todo__body">
                    <form action="#" @submit.prevent class="todo__form">
                        <div class="todo__inputs">
                            <AppInput class="todo__input" placeholder="Add task..." v-model="task"></AppInput>
                            <AppButton class="todo__button" @click="createTodo">Add</AppButton>
                        </div>
                        <Transition>
                            <div class="todo__validation" v-if="isValidationNotCorrect">{{ validationText }}</div>
                        </Transition>
                    </form>
                    <TransitionGroup name="list" tag="ul" class="todo__list" v-if="todos.length !== 0">
                        <TodoItem 
                            v-for="todo in todos" 
                            :key="todo.id" 
                            :todo="todo" 
                            @delete="deleteTodo"
                            @save-change="saveChange"
                        />
                    </TransitionGroup>
                    <div class="todo__empty" v-else>Create some task!</div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import AppHeader from '../components/AppHeader';
import TodoItem from '../components/TodoItem.vue'
export default {
    components: {
        AppHeader,
        TodoItem
    },
    data(){
        return {
            task: '',
            isValidationNotCorrect: false,
            validationText: '',
            todos: []
        }
    },
    methods: {
        createTodo(){
            const newTodo = {
                id: Date.now(),
                title: this.task
            }
            const isTodoInArray = this.todos.find(todo => todo.title.toLowerCase() === newTodo.title.toLowerCase());
            if(this.task.length === 0){
                this.isValidationNotCorrect = true;
                this.validationText = 'Enter some text!'
            }
            if(!isTodoInArray && this.task.length > 0){
                this.todos.unshift(newTodo);
                localStorage.setItem('todos', JSON.stringify(this.todos));
                this.task = '';
            }
            if(isTodoInArray){
                this.isValidationNotCorrect = true;
                this.validationText = 'This task already exist'
            }
        },
        deleteTodo(ID){
            this.todos = this.todos.filter(todo => todo.id !== ID);
            localStorage.setItem('todos', JSON.stringify(this.todos));
        },
        saveChange(chagenedTodo){
            for(let i = 0; i < this.todos.length; i++){
                const todo = this.todos[i];
                if(todo.id === chagenedTodo.id){
                    todo.title = chagenedTodo.title;
                }
            }
            localStorage.setItem('todos', JSON.stringify(this.todos));
        }
    },
    mounted(){
        this.$store.dispatch('getTodos');
        this.todos = JSON.parse(localStorage.getItem('todos'));
    },
}
</script>

<style lang="scss" scoped>
.todo{
    &__container{
        position: relative;
        z-index: 2;
    }
    &__form{
        padding: 40px 0;
    }
    &__inputs{
        display: flex;
    }
    &__validation{
        color: rgb(177, 79, 79);
        font-size: 1.5rem;
        padding: 10px 0 0;
    }
    &__button{
        flex: 0 0 150px;
    }
    &__input{
        flex: 1 1 auto;
        margin-right: 20px;
    }
    &__empty{
        font-size: 1.5rem;
        text-align: center;
        line-height: 120%;
        padding: 30px 0;
        text-transform: uppercase;
        font-weight: 700;
        letter-spacing: 2px;
    }
}
.list-move, 
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.list-leave-active {
  position: absolute;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>