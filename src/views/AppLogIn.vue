<template>
    <div class="wrapper">
        <AppHeder />
        <section class="authorization">
            <div class="authorization__container">
                <div class="authorization__body" v-if="!isLoggedIn">
                    <h1 class="authorization__title">Log in</h1>
                    <form action="#" @submit.prevent class="authorization__form">
                        <div>
                            <label for="login">Login:</label>
                            <AppInput type="text" id="login" class="authorization__input" placeholder="Enter login..." v-model="login" @focus="isLoginNotCorrect = false"/>
                        </div>
                        <div class="authorization__validation" v-if="isLoginNotCorrect">Enter correct data!</div>
                        <div>
                            <label for="password">Password:</label>
                            <AppInput type="password" id="password" class="authorization__input" placeholder="Enter password..." v-model="password" @focus="isPasswordNotCorrect = false"/>
                        </div>
                        <div class="authorization__validation" v-if="isPasswordNotCorrect">Enter correct data!</div>
                        <div class="authorization__buttons">
                            <app-button class="authorization__button" @click="logIntoAccount">Log in</app-button>
                            <router-link to='/registration' class="authorization__create">Create account</router-link>
                        </div>
                    </form>
                </div>
                <div class="authorization__success" v-else>
                    <h2 class="authorization__title">Welcome «{{ userName }}»</h2>
                    <div class="authorization__success-img icon-smile"></div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import AppInput from '@/components/UI/AppInput.vue';
import AppHeder from '@/components/AppHeader';
export default {
    components:{
        AppHeder,
        AppInput
    },
    data(){
        return {
            login: '',
            password: '',
            isLoggedIn: null,
            userName: '',
            isLoginNotCorrect: false,
            isPasswordNotCorrect: false,
        }
    },
    methods: {
        logIntoAccount(){
            const userParams = JSON.parse(localStorage.getItem('userParams'));
            if(userParams){
                const {login: savedLogin, password: savedPassword} = userParams;
                if(savedLogin === this.login && savedPassword === this.password){
                    localStorage.setItem('canUserUseApp', JSON.stringify(true));
                    this.userName = this.login;
                    this.isLoggedIn = true;
                }
                if(!(savedLogin == this.login)){
                    this.isLoginNotCorrect = true;
                }
                if(!(savedPassword == this.password)){
                    this.isPasswordNotCorrect = true;
                }
                if(!(savedPassword == this.password && savedLogin == this.login)){
                    this.isLoginNotCorrect = true;
                    this.isPasswordNotCorrect = true;
                }
            }
            else{
                this.isLoginNotCorrect = true;
                this.isPasswordNotCorrect = true;
            }
        }
    },
    mounted(){
        if(JSON.parse(localStorage.getItem('canUserUseApp'))){
            this.isLoggedIn = true
        }
        else{
            this.isLoggedIn = false;
        }
        this.userName = JSON.parse(localStorage.getItem('userParams'))?.login;
    }
}
</script>

<style lang="scss" scoped>
.authorization{
    padding: 180px 0 60px;
    &__body{
        text-align: center;
        max-width: 524px;
        margin: 0 auto;
    }
    &__title{
        text-align: center;
        font-weight: 700;
        font-size: 54px;
        line-height: 119%;
        color: #FFFFFF;
        margin-bottom: 34px;
    }
    &__form{
        label{
            text-align: left;
            display: block;
            font-weight: 700;
            font-size: 1.5rem;
            line-height: 133%;
            color: #FFFFFF;
            margin-bottom: 6px;
        }
    }
    &__buttons{
        margin-top: 10px;
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
    }
    &__button{
        text-align: left;
        background: transparent;
        padding-left: 25px;
        padding-right: 25px;
        @media all and (min-width: 62em){
            &:hover{
                background: #fff;
                color: #333;
            }
        }
    }
    &__create{
        font-weight: 500;
        font-size: 18px;
        line-height: 133%;
        text-decoration-line: underline;
        color: #FFFFFF;
    }
    &__success{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    &__success-img{
        margin-top: 10px;
        font-size: 300px;
        @media all and (max-width: 578px) {
            font-size: 200px;
        }
    }
    &__validation{
        font-size: 1rem;
        color: red;
        text-align: left;
        padding-bottom: 15px;
    }
}
</style>