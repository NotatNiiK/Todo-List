<template>
    <li class="todo__item item-todo" :class="{isReady: localTodo.completed}">
        <div class="item-todo__content" >
            <div class="item-todo__title" v-if="isEditNotActive">{{ title }}</div>
            <form action="#" class="item-todo__edit" @submit.prevent v-else>
                <textarea type="text" class="item-todo__input" v-model="localTodo.title" ref="textarea"></textarea>
                <button class="item-todo__edit-button" @click="saveTodoEdit">Save</button>
            </form>
            <div class="item-todo__time">
                {{ localTodo.time }}
                <span v-if="localTodo.isEdited">(edited)</span>
            </div>
        </div>
        <div class="item-todo__buttons">
            <template v-if="!localTodo.completed">
                <button class="item-todo__button icon-check-markom" title="Ready" @click="readyTodo"></button>
                <button class="item-todo__button icon-edit" title="Edit" @click="editTodo"></button>
            </template>
            <button class="item-todo__button icon-delete" title="Delete" @click="deleteTodo"></button>
        </div>
    </li>
</template>

<script>
export default {
    props: {
        todo: {
            type: Object,
            required: true,
            default(){
                return {
                    id: Date.now(),
                    title: 'Some task',
                    completed: false,
                }
            }
        },
    },
    data(){
        return {
            localTodo: this.todo,
            isEditNotActive: true,
            tmpTodoTitle: ''
        }
    },
    emits: {
        delete: null,
        saveChange: null,
        readyTodo: null
    },
    methods: {
        deleteTodo(){
            const todoID = this.todo.id;
            this.$emit('delete', todoID);
        },
        editTodo(){
            this.tmpTodoTitle = this.localTodo.title;
            this.isEditNotActive = false;
            setTimeout(() => {
                this.$refs.textarea.focus();
            }, 0);
        },
        saveTodoEdit(){
            if(this.localTodo.title.trim() !== this.tmpTodoTitle.trim()){
                this.localTodo.isEdited = true;
            }
            this.isEditNotActive = true;
            this.$emit('saveChange', this.localTodo);
        },
        readyTodo(){
            if(!this.isEditNotActive){
                this.isEditNotActive = true;
            }
            this.localTodo.completed = true;
            this.$emit('readyTodo', this.localTodo);
        }
    },
    computed: {
        title(){
            const title = this.localTodo.title;
            const firstLetterToUpperCase = title.slice(0,1).toUpperCase();
            const newTitle = firstLetterToUpperCase + title.slice(1);
            return newTitle;
        }
    }
}
</script>

<style lang="scss" scoped> 
.item-todo{
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: rgba(255, 255, 255, 0.81);
    border: 1px dashed rgba(255, 255, 255, 0.81);
    border-radius: 5px;
    padding: 10px 25px;
    margin-bottom: 30px;
    transition: all .3s ease 0s;
    @media all and (max-width: 48em){
        display: block;
    }
    &:hover{
        box-shadow: 0px 0px 10px #fff;
    }

    &__content{
        flex:  1 1 auto;
        @media all and (max-width: 48em){
            margin-bottom: 30px;
        }
    }
    &__title{
        font-weight: 700;
        font-size: 1.2rem;
        line-height: 160%;
        color: #333333;
        margin-bottom: 10px;
        @media all and (max-width: 48em){
            font-size: 1rem;
        }
    }
    &__input{
        width: 70%;
        height: 60px;
        min-width: 200px;
        border: none;
        outline: none;
        padding: 10px;
        border-radius: 5px;
        font-size: 1.2rem;
        resize: none;
        white-space: pre-wrap;
    }
    &__edit{
        display: flex;
        align-items: flex-end;
        margin-bottom: 10px;
        @media all and (max-width: 30em){
            flex-direction: column;
            align-items: flex-start;
        }
    }
    &__edit-button{
        cursor: pointer;
        background: #fff;
        padding: 7px 15px;
        border-radius: 5px;
        color: #000;
        font-size: 1.2rem;
        border: 2px solid rgb(51, 147, 126);
        margin-left: 10px;
        transition: all .4s ease 0s;
        @media all and (min-width: 62em){
            &:hover{
                background: rgb(51, 147, 126);
                color: #fff;
            }
        }
        @media all and (max-width: 30em){
            margin: 10px 0 0;
        }
    }
    &__time{
        color: #333;
        @media all and (max-width: 48em){
            font-size: 0.875rem;
        }
    }
    &__buttons{
        flex: 0 0 200px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }
    &__button{
        font-weight: 700;
        color: #000;
        cursor: pointer;
        font-size: 2rem;
        margin-left: 24px;
        font-weight: 700;
        transition: all .4s ease 0s;
        &.icon-check-markom{
            @media all and (min-width: 62em){
                &:hover{
                    color: green;
                }
            }
        }
        &.icon-edit{
            @media all and (min-width: 62em){
                &:hover{
                    color: blue;
                }
            }
        }
        &.icon-delete{
            @media all and (min-width: 62em){
                &:hover{
                    color: red;
                }
            }
        }
    }
}

.isReady{
    color: #fff;
    background: #2ebf91;
    &:hover{
        box-shadow: 0px 0px 10px #2ebf91;
    }
    .item-todo__title{
        color: #fff;
    }
    .item-todo__time{
        color: #fff;
    }
    .item-todo__button{
        color: #fff;
        &.icon-delete{
            @media all and (min-width: 62em){
                &:hover{
                    color: rgb(117, 48, 48);
                }
            }
        }
    }
}
</style>