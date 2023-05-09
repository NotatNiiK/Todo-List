<template>
    <div class="wrapper">
        <section class="main">
            <div class="main__container">
                <div class="main__body">
                    <h1 class="main__title">TodoList Application</h1>
                    <p class="main__description">
                        A to-do list is a simple and effective tool for managing tasks and tracking progress. 
                        It is a list of tasks or activities that need to be completed, typically ordered by priority. 
                        To-do lists can be created on paper or electronically, and they can be used for personal, professional, or academic purposes.
                    </p>
                    <router-link to="/todo" class="main__button">
                        <app-button>Create task</app-button>
                    </router-link>
                </div>
            </div>
        </section>
    </div>
</template>

<style lang="scss" scoped>
.main{
    &__container{
        padding: 80px 15px;
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    &__body{
        position: relative;
        z-index: 2;
        text-align: center;
    }
    &__title{
        font-weight: 700;
        font-size: 3.5rem;
        line-height: 114%;
        color: #FFFFFF;
        margin-bottom: 30px;
        @media all and (max-width: 48em) {
            font-size: 2.5rem;
        }
    }
    &__description{
        font-weight: 700;
        font-size: 1.25rem;
        line-height: 160%;
        color: #FFFFFF;
        margin-bottom: 25px;
        @media all and (max-width: 48em) {
            font-size: 1rem;
        }
    }
}
</style>