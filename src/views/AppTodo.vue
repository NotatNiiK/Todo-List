<template>
    <div class="wrapper">
        <app-header />
        <section class="todo">
            <div class="todo__container">
                <div class="todo__please-log-in please-log-in" v-if="!canUserUseApp">
                   <h2 class="please-log-in__title">Please log in to your account!</h2>
                   <div class="please-log-in__img">
                        <img src="@/assets/img/please-log-in.jpg" alt="Log in">
                   </div>
                </div>
                <div class="todo__body" v-else>
                    <form action="#" @submit.prevent class="todo__form">
                        <div class="todo__inputs" v-if="currentPage === 1">
                            <div>
                                <input type="text"
                                    class="todo__input" 
                                    placeholder="Add task..." 
                                    v-model.trim="task" 
                                    @focus="inputFocus"
                                    @blur="blurInput"
                                />
                            </div>
                            <div>
                                <app-button class="todo__button" @click="createTodo">Add</app-button>
                                <app-button class="todo__button" @click="clearTodos">Clear all</app-button>
                            </div>
                        </div>
                        <transition>
                            <div class="todo__validation" v-if="isValidationNotCorrect">{{ validationText }}</div>
                        </transition>
                        <div class="todo__tabs tabs-todo">
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
                        </div>
                    </form>
                    <transition-group name="list" tag="ul" class="todo__list" v-if="visibleTodos().length !== 0">
                        <todo-item 
                            v-for="todo in visibleTodos()" 
                            :key="todo.id" 
                            :todo="todo" 
                            @delete="deleteTodo"
                            @save-change="saveChange"
                            @ready-todo="readyTodo"
                        />
                    </transition-group>
                    <div class="todo__empty" v-else>Create some task!</div>
                    <div class="todo__paggination" v-if="isPagginationVisible">
                        <button 
                            class="todo__paggination-button" 
                            v-for="(n, idx) in pages" 
                            :key="idx"
                            @click="changePage(n)"
                            :disabled="isPagginationButtonDisabled(n)"
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
export default {
    components: {
        AppHeader,
        TodoItem,
    },
    data(){
        return {
            canUserUseApp: null,
            task: '',
            isValidationNotCorrect: false,
            validationText: '',
            todos: [],
            maxTasksPerPage: 5,
            startIndex: 0,
            endIndex: 5,
            currentPage: 1,
            filteredBy: 'all',
            isPagginationVisible: false,
            pages: 1,
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
            const isTodoInArray = this.todos.find(todo => todo.title.toLowerCase() === newTodo.title.toLowerCase());
            if(this.task.length === 0){
                this.isValidationNotCorrect = true;
                this.validationText = 'Enter some text!'
            }
            if(!isTodoInArray && this.task.length > 0){
                this.todos.unshift(newTodo);
                this.task = '';
            }
            if(isTodoInArray){
                this.isValidationNotCorrect = true;
                this.validationText = 'This task already exists'
            }
        },
        deleteTodo(ID){
            this.todos = this.todos.filter(todo => todo.id !== ID);
            if((this.visibleTodos().length % 5 === 0) && this.currentPage !== 1){
                this.currentPage--;
                this.changePage(this.currentPage)
            }
        },
        saveChange(todo){
            this.saveTodoChange(todo, 'title')
        },
        changePage(n){
            this.currentPage = n;
            this.endIndex = this.currentPage * this.maxTasksPerPage
            this.startIndex = this.endIndex - this.maxTasksPerPage;
        },
        isPagginationButtonDisabled(n){
            const isActive = Number(this.currentPage) === n;
            return isActive;
        },
        readyTodo(todo){
            this.saveTodoChange(todo, 'completed')
        },
        saveTodoChange(someTodo, key){
            for(let i = 0; i < this.todos.length; i++){
                const todo = this.todos[i];
                if(todo.id === someTodo.id){
                    todo[key] = someTodo[key];
                }
            }
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
            localStorage.removeItem('todos');
            this.isPagginationVisible = false;
        },
        changeTab(value){
            if(this.filteredBy === value){
                return;
            }
            this.filteredBy = value;
            this.startIndex = 0;
            this.endIndex = 5;
            this.currentPage = 1;
        },
        visibleTodos(){
            if(this.filteredBy === 'completed'){
                const todosArr = this.todos.filter(todo => todo.completed);
                this.pages = Math.ceil(todosArr.length / this.maxTasksPerPage);
                if(todosArr.length > 5){
                    this.isPagginationVisible = true;
                }
                else{
                    this.isPagginationVisible = false;
                }
                return todosArr.slice(this.startIndex, this.endIndex);
            }
            if(this.filteredBy === 'pending'){
                const todosArr = this.todos.filter(todo => !todo.completed);
                this.pages = Math.ceil(todosArr.length / this.maxTasksPerPage);
                if(todosArr.length > 5){
                    this.isPagginationVisible = true;
                }
                else{
                    this.isPagginationVisible = false;
                }
                return todosArr.slice(this.startIndex, this.endIndex);
            }
            if(this.filteredBy === 'all'){
                const todosArr = this.todos;
                this.pages = Math.ceil(todosArr.length / this.maxTasksPerPage);
                if(todosArr.length > 5){
                    this.isPagginationVisible = true;
                }
                else{
                    this.isPagginationVisible = false;
                }
                return todosArr.slice(this.startIndex, this.endIndex);
            }
        },
        saveCurrentPageChangesInURL(page){
            const urlParams = new URLSearchParams(window.location.search);
            urlParams.set('page', page);
            const newUrl = window.location.origin + window.location.pathname + '?' + urlParams.toString();
            window.history.pushState({path:newUrl},'',newUrl);
        }
    },
    mounted(){
        const urlParams = new URLSearchParams(window.location.search);
        const pageValue = urlParams.get('page') || this.currentPage;
        this.changePage(pageValue);
        this.currentPage = pageValue;
        this.saveCurrentPageChangesInURL(pageValue);
        if(JSON.parse(localStorage.getItem('canUserUseApp'))){
            this.canUserUseApp = true;
        }
        this.todos = JSON.parse(localStorage.getItem('todos')) || [];
        this.pages = Math.ceil(this.todos?.length / this.maxTasksPerPage);
    },
    watch: {
        task(newValue){
            if(newValue.length > 0){
                this.isValidationNotCorrect = false;
            }
        },
        todos: {
            handler(newValue){
                localStorage.setItem('todos', JSON.stringify(newValue));
            },
            deep: true
        },
        currentPage(newValue){
            this.saveCurrentPageChangesInURL(newValue);
        }
    },
}
</script>

<style lang="scss" scoped>
.todo{
    padding: 100px 0 40px;
    &__form{
        padding: 40px 0;
    }
    &__inputs{
        display: flex;
        @media all and (max-width: 48em){
            flex-direction: column;
        }
        div{
            &:first-child{
                flex: 1 1 auto;   
                 @media all and (max-width: 48em){
                    flex: 0 1 auto;
                 }
            }
            &:last-child{
                @media all and (max-width: 48em){
                    display: flex;
                    justify-content: flex-end;
                    margin-top: 15px;
                }
                @media all and (max-width: 30em){
                    justify-content: center;
                }
            }
        }
    }
    &__input{
        width: 100%;
        height: 100%;
    }
    &__validation{
        color: red;
        font-size: 1.2rem;
        padding: 10px 0 0;
    }
    &__button{
        flex: 0 0 120px;
        margin-left: 15px;
        padding-left: 30px;
        padding-right: 30px;
        @media all and (max-width: 48em){
            flex: 0 1 auto;
        }
    }
    &__input{
        flex: 1 1 auto;
        color: #fff;
        font-size: 1.2rem;
        padding: 8px 12px;
        background: none;
        border: none;
        border-bottom: 3px solid #fff;
        transition: all .4s ease 0s;
        &:focus{
            box-shadow: 2px 2px 2px #fff;
        }
        &::placeholder{
            font-weight: 700;
            font-size: 1.25rem;
            line-height: 160%;
            color: rgba(255, 255, 255, 0.8);
        }
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
        @media all and (max-width: 30em){
            margin-top: 10px;
            font-size: 0.875rem;
            padding: 15px;
        }
    }
}

.active-tab{
    background: #fff;
    color: #333;
}

.please-log-in{
    padding: 120px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    &__title{
        text-transform: uppercase;
        font-weight: 700;
        font-size: 48px;
        line-height: 54px;
        color: #FFFFFF;
        margin-bottom: 30px;
    }
    &__img{
        width: 220px;
        height: 220px;
        img{
            max-width: 100%;
        }
    }
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