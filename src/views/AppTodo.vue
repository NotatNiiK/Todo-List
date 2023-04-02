<template>
    <div class="wrapper">
        <app-header />
        <section class="todo">
            <div class="todo__container">
                <div class="todo__body">
                    <form action="#" @submit.prevent class="todo__form">
                        <div class="todo__inputs" v-if="currentPage === 1">
                            <app-input 
                                class="todo__input" 
                                placeholder="Add task..." 
                                v-model="task" 
                                @focus="inputFocus"
                                @blur="blurInput"
                            ></app-input>
                            <app-button class="todo__button" @click="createTodo">Add</app-button>
                            <app-button class="todo__button" @click="clearTodos">Clear all</app-button>
                        </div>
                        <transition>
                            <div class="todo__validation" v-if="isValidationNotCorrect">{{ validationText }}</div>
                        </transition>
                       <!--  <div class="todo__tabs tabs-todo">
                            <button 
                                class="tabs-todo__tab" 
                                @click="changeTab('all')"
                                :class="{'active-tab': filteredBy == 'all'}"
                            >
                                All
                            </button>
                            <button 
                                class="tabs-todo__tab" 
                                @click="changeTab('pending')"
                                :class="{'active-tab': filteredBy == 'pending'}"
                            >
                                Pending
                            </button>
                            <button 
                                class="tabs-todo__tab" 
                                @click="changeTab('completed')"
                                :class="{'active-tab': filteredBy == 'completed'}"
                            >
                                Completed
                            </button>
                        </div> -->
                        <div class="todo__statistic">
                            <p>Number of tasks: <strong>{{ todos.length }}</strong></p>
                            <p>Ready tasks: <strong>{{ readyTasks }}</strong></p>
                        </div>
                    </form>
                    <transition-group name="list" tag="ul" class="todo__list" v-if="todos.length !== 0">
                        <todo-item 
                            v-for="todo in visibleTodos" 
                            :key="todo.id" 
                            :todo="todo" 
                            @delete="deleteTodo"
                            @save-change="saveChange"
                            @ready-todo="readyTodo"
                        />
                    </transition-group>
                    <div class="todo__empty" v-else>Create some task!</div>
                    <div class="todo__paggination" v-if="todos.length > 5 && visibleTodos.length !== 0">
                        <button 
                            class="todo__paggination-button" 
                            v-for="(n, idx) in pages" 
                            :key="idx"
                            @click="changePage(n)"
                            :disabled="isPagginationButtonActive(n)"
                        >
                            {{ n }}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import AppHeader from '../components/AppHeader';
import TodoItem from '../components/TodoItem.vue';
import generateTime from '@/api/generateTime';
import getTodos from '@/api/api';
export default {
    components: {
        AppHeader,
        TodoItem,
    },
    data(){
        return {
            task: '',
            isValidationNotCorrect: false,
            validationText: '',
            todos: [],
            maxTasksPerPage: 5,
            startIndex: 0,
            endIndex: 5,
            currentPage: 1,
            filteredBy: 'all'
        }
    },
    methods: {
        createTodo(){
            const newTodo = {
                id: Date.now(),
                title: this.task,
                isEdited: false,
                time: generateTime()
            }
            console.log(newTodo)
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
                this.validationText = 'This task already exists'
            }
        },
        deleteTodo(ID){
            this.todos = this.todos.filter(todo => todo.id !== ID);
            if(this.todos.length % 5 === 0){
                this.currentPage--;
                this.changePage(this.currentPage)
            }
            localStorage.setItem('todos', JSON.stringify(this.todos));
        },
        saveChange(todo){
            this.saveTodoChangeInStorage(todo, 'title')
        },
        changePage(n){
            this.currentPage = n;
            this.endIndex = this.currentPage * this.maxTasksPerPage
            this.startIndex = this.endIndex - this.maxTasksPerPage;
        },
        isPagginationButtonActive(n){
            const isActive = this.currentPage === n;
            return isActive;
        },
        readyTodo(todo){
            this.saveTodoChangeInStorage(todo, 'completed')
        },
        saveTodoChangeInStorage(someTodo, key){
            for(let i = 0; i < this.todos.length; i++){
                const todo = this.todos[i];
                if(todo.id === someTodo.id){
                    todo[key] = someTodo[key];
                }
            }
            localStorage.setItem('todos', JSON.stringify(this.todos));
        },
        inputFocus(e){
            this.isValidationNotCorrect = false;
            e.target.placeholder = '';
        },
        blurInput(e){
            e.target.placeholder = 'Add task...';
        },
        clearTodos(){
            this.todos = [];
            localStorage.clear();
        },
        /* changeTab(value){
            this.filteredBy = value;
            this.startIndex = 0;
            this.endIndex = 5;
            this.currentPage = 1;
        } */
    },
    mounted(){
        getTodos();
        this.todos = JSON.parse(localStorage.getItem('todos'));
    },
    watch: {
        task(newValue){
            if(newValue.length > 0){
                this.isValidationNotCorrect = false;
            }
        }
    },
    computed:{
        pages(){
            return Math.ceil(this.todos.length / this.maxTasksPerPage); 
        },
        visibleTodos(){
           /*  if(this.filteredBy === 'all'){
                return this.todos.slice(this.startIndex, this.endIndex);
            }
            if(this.filteredBy === 'pending'){
                return this.todos.slice(this.startIndex, this.endIndex).filter(todo => !todo.completed);
            }
            return this.todos.slice(this.startIndex, this.endIndex).filter(todo => todo.completed); */
            return this.todos.slice(this.startIndex, this.endIndex);
        },
        readyTasks(){
            return this.todos.filter(todo => todo.completed).length;
        }
    }
}
</script>

<style lang="scss" scoped>
.todo{
    padding: 100px 0 40px;
    flex: 1 1 auto;
    &__form{
        padding: 40px 0;
    }
    &__inputs{
        display: flex;
        @media all and (max-width: 48em){
        }
    }
    &__input{
        @media all and (max-width: 48em){
            flex: 0 0 600px;
        }
    }
    &__validation{
        color: red;
        font-size: 1.2rem;
        padding: 10px 0 0;
    }
    &__button{
        flex: 0 0 120px;
        margin-left: 15px;
    }
    &__input{
        flex: 1 1 auto;
    }
    &__empty{
        font-size: 1.2rem;
        text-align: center;
        line-height: 120%;
        padding: 30px 0;
        text-transform: uppercase;
        font-weight: 700;
        letter-spacing: 2px;
    }
    &__statistic{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 25px 0 0;
        font-size: 1rem;
        p{
            &:first-child{
                margin-right: 15px;
            }
        }
    }
    &__paggination{
        display: flex;
    }
    &__paggination-button{
        cursor: pointer;
        margin-right: 15px;
        width: 40px;
        height: 40px;
        background: #FFFFFF;
        border-radius: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        font-weight: 700;
        font-size: 18px;
        line-height: 178%;
        color: #333333;
        transition: all .4s ease 0s;
        @media all and (min-width: 62em){
            &:hover{
                background: #d2d1d1;
            }
        }
        &:disabled{
            cursor: not-allowed;
            background: rgba(255, 255, 255, 0.57);
            border: 2px solid #fff;
            @media all and (min-width: 62em){
                &:hover{
                    background: rgba(255, 255, 255, 0.57);
                }
            }
        }
    }
}

.tabs-todo{
    padding: 20px 0;
    display: flex;
    align-items: center;
    &__tab{
        cursor: pointer;
        font-size: 1.1rem;
        font-weight: 700;
        padding: 20px;
        text-align: center;
        flex: 0 0 33%;
        color: #fff;
        border-bottom: 2px solid #fff;
    }
}

.active-tab{
    background: #fff;
    color: #333;
}

.list-move, 
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
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