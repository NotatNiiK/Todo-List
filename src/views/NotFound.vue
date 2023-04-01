<template>
    <div class="wrapper">
        <div class="not-found">
            <div class="not-found__container">
                <div class="not-found__body">
                    <h1 class="not-found__title">Page Not found</h1>
                    <RouterLink to="/">
                        <AppButton class="not-found__button">Back</AppButton>
                    </RouterLink>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.not-found{
    &__container{
        padding: 80px 0;
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    &__body{
        text-align: center;
        position: relative;
        z-index: 2;
    }
    &__title{
        font-size: 4rem;
        letter-spacing: 2px;
        text-transform: uppercase;
        margin-bottom: 30px;
    }
    &__button{
        padding: 7px 25px;
    }
}
</style>