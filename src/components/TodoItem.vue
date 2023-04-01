<template>
    <li class="todo__item item-todo" :class="{isReady: localTodo.completed}">
        <div class="item-todo__content" >
            <div class="item-todo__title" v-if="isEditNotActive">{{ title }}</div>
            <form action="#" class="item-todo__edit" @submit.prevent v-else>
                <textarea type="text" class="item-todo__input" v-model="localTodo.title" ref="textarea"></textarea>
                <button class="item-todo__edit-button" @click="saveTodoEdit">Save</button>
            </form>
        </div>
        <div class="item-todo__buttons">
            <button class="item-todo__button icon-check-markom" @click="readyTodo"></button>
            <button class="item-todo__button icon-edit" @click="editTodo"></button>
            <button class="item-todo__button icon-delete" @click="deleteTodo"></button>
        </div>
    </li>
</template>

<script>
export default {
    props: {
        todo: Object,
    },
    data(){
        return {
            localTodo: this.todo,
            isEditNotActive: true,
        }
    },
    methods: {
        deleteTodo(){
            const todoID = this.todo.id;
            this.$emit('delete', todoID);
        },
        editTodo(){
            this.isEditNotActive = false;
            setTimeout(() => {
                this.$refs.textarea.focus();
            }, 0);
        },
        saveTodoEdit(){
            this.isEditNotActive = true;
            this.$emit('saveChange', this.localTodo);
        },
        readyTodo(){
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
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: rgba(255, 255, 255, 0.81);
    border-radius: 5px;
    padding: 10px 30px;
    margin-bottom: 30px;
    &__title{
        font-weight: 700;
        font-size: 20px;
        line-height: 160%;
        color: #333333;
    }
    &__input{
        border: none;
        outline: none;
        padding: 7px 5px;
        border-radius: 5px;
        font-size: 1.2rem;
        resize: none;
    }
    &__edit{
        display: flex;
        align-items: flex-end;
    }
    &__edit-button{
        cursor: pointer;
        background: #fff;
        padding: 7px 15px;
        border-radius: 5px;
        color: #000;
        font-size: 1.2rem;
        border: 2px solid #8E2DE2;
        margin-left: 10px;
        transition: all .4s ease 0s;
        @media all and (min-width: 62em){
            &:hover{
                background: #8E2DE2;
                color: #fff;
            }
        }
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
    background: rgb(13, 177, 114);
    .item-todo__title{
        color: #fff;
    }
    .item-todo__button{
        color: #fff;
    }
}
</style>