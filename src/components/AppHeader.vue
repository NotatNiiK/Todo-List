<template>
    <header class="header" :class="{scrolled: isScrolled}">
        <div class="header__container">
            <RouterLink to="/" class="header__logo">
                <img src="../assets/img/logo.svg" alt="logo">
            </RouterLink>
            <nav class="header__nav" :class="{'nav-active': isBurgerActive}">
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
            <div 
                class="header__burger" 
                @click="isBurgerActive = !isBurgerActive" 
                :class="{'active-burger': isBurgerActive}"
            >
                <span></span>
            </div>
        </div>
    </header>
</template>

<script>

export default {
    data(){
        return {
            isBurgerActive: false,
            isScrolled: false
        }
    },
    methods: {
        headerActive(){
            if(pageYOffset > 40) this.isScrolled = true;
            else this.isScrolled = false;
        }
    },
    mounted(){
        window.addEventListener('scroll', this.headerActive);
    },
    beforeUnmount(){
        window.removeEventListener('scroll', this.headerActive);
    }
}
</script>

<style lang="scss" scoped>
.header{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    padding: 20px 0;
    transition: all .4s ease 0s;
    @media all and (max-width:48em) {
        padding: 15px 0;
    }
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
        @media all and (max-width:48em) {
            width: 35px;
            height: 35px;
        }

    }
    &__nav{
        transition: all .4s ease 0s;
        @media all and (max-width:48em) {
            position: fixed;
            left: -100%;
            top: 0;
            width: 100%;
            height: 100%;
            background: #2ebf91;
            z-index: 100;
            padding: 80px 40px;
            overflow: auto;
        }
    }
    &__list{
        display: flex;
        align-items: center;
        @media all and (max-width:48em) {
            display: block;
        }
    }
    &__item{
        margin-left: 67px;
        @media all and (max-width:48em) {
            margin: 0 0 40px 0;
        }
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
        @media all and (max-width:48em) {
            font-size: 2rem;
            font-weight: 700;
        }
    }
    &__burger {
        display: none;
        position: relative;
        z-index: 150;
        @media all and (max-width:48em) {
            display: block;
           
            width: 30px;
            height: 20px;
            transition: all 0.3s ease 0s;

            span {
                display: inline-block;
                position: absolute;
                top: 9px;
                width: 100%;
                height: 2px;
                background: #fff;
                transition: all 0.3s ease 0s;
            }

            &::before,
            &::after {
                content: '';
                position: absolute;
                left: 0;
                width: 100%;
                height: 2px;
                background: #fff;
                transition: all 0.3s ease 0s;
            }

            &::before {
                top: 0;
            }

            &::after {
                bottom: 0;
            }
        }
    }
}

.scrolled{
    background: rgba(165,50,71,255);
    border-bottom: 1px solid #fff;
}

.active-burger {
    span {
        transform: scale(0);
    }
    &::before {
        top: 9px;
        transform: rotate(45deg);
        background: #fff;
    }
    &::after {
        bottom: 9px;
        transform: rotate(-45deg);
        background: #fff;
    }
}

.nav-active{
    left: 0;
}

.active-router-link {
    font-weight: 700;
    color: #ffffffd6;
    text-decoration: underline;
    @media all and (min-width: 62em) {
        &:hover{
            text-decoration: none;
        }
    }
}
</style>