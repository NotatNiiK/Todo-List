<template>
    <li class="todo__item item-todo">
        <div class="item-todo__title">{{ todo.title }}</div>
        <div class="item-todo__buttons">
            <button class="item-todo__button">
                <img src="../assets/img/ready.svg" alt="Ready">
            </button>
            <button class="item-todo__button">
                <img src="../assets/img/edit.svg" alt="Edit">
            </button>
            <button class="item-todo__button">
                <img src="../assets/img/delete.svg" alt="Delete">
            </button>
        </div>
    </li>
</template>

<script>
export default {
    props: {
        todo: Object
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
    &__button{
    }
}
</style>