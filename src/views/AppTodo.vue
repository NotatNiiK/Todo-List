<template>
    <div class="wrapper">
        <section class="todo">
            <div class="todo__container">
                <AppHeader />
                <div class="todo__body">
                    <form action="#" @submit.prevent class="todo__form">
                        <AppInput class="todo__input"></AppInput>
                        <AppButton class="todo__button">Add</AppButton>
                    </form>
                    <ul class="todo__list" v-for="todo in todos" :key="todo.id">
                        <TodoItem :todo="todo" />
                    </ul>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import AppHeader from '../components/AppHeader';
import TodoItem from '../components/TodoItem.vue'
import { mapGetters } from 'vuex';
export default {
    components: {
        AppHeader,
        TodoItem
    },
    mounted(){
        this.$store.dispatch('getTodos');
    },
    computed: {
        ...mapGetters(['todos'])
    }
}
</script>

<style lang="scss" scoped>
.todo{
    &__container{
        position: relative;
        z-index: 2;
    }
}
</style>