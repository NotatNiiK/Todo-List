<template>
    <header class="header">
        <div class="header__container">
            <RouterLink to="/main" class="header__logo">
                <img src="../assets/img/logo.svg" alt="logo">
            </RouterLink>
            <nav class="header__nav">
                <ul class="header__list">
                    <li class="header__item">
                        <RouterLink class="header__link" to="/" active-class="active-router-link">Introduction</RouterLink>
                    </li>
                    <li class="header__item">
                        <RouterLink class="header__link" to="/todo" active-class="active-router-link">Todo</RouterLink>
                    </li>
                    <li class="header__item">
                        <RouterLink class="header__link" to="/authorization" active-class="active-router-link">Authorization</RouterLink>
                    </li>
                </ul>
            </nav>
        </div>
    </header>
</template>

<style lang="scss" scoped>
.header{
    padding: 20px 0;
    &__container{
        position: relative;
        z-index: 2;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    &__logo{
        width: 45px;
        height: 45px;
        overflow: hidden;
        img{
            max-width: 100%;
        }
    }
    &__list{
        display: flex;
        align-items: center;
    }
    &__item{
        margin-left: 67px;
    }
    &__link{
        font-size: 1.25rem;
        line-height: 160%;
        color: #FFFFFF;
        transition: all .4s ease 0s;
        @media all and (min-width: 62em) {
            &:hover{
                color: #d7d5d5;
            }
        }
    }
}

.active-router-link {
    font-weight: 700;
    color: #323050;
    text-decoration: underline;
    @media all and (min-width: 62em) {
        &:hover{
            color: #312e5b;
            text-decoration: none;
        }
    }
}
</style>