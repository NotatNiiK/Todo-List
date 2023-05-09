<template>
    <div class="wrapper">
        <div class="registration">
            <div class="registration__container">
                <div class="registration__body">
                    <h1 class="registration__title">{{ titleText }}</h1>
                    <form action="#" class="registration__form" @submit.prevent v-if="isAccountNotCreated">
                        <div class="registration__input-block">
                            <label for="login-create" class="registration__label">Create login</label>
                            <app-input 
                                id='login-create' 
                                class="registration__input" 
                                v-model.trim="login" 
                                :disabled='isWaiting' 
                                placeholder="Create login..."
                                @focus="inputFocus('login')"
                            /> 
                            <div class="registration__validation" v-if="isLoginNotCorrect">Enter correct data!</div>
                        </div>
                        <div class="registration__input-block">
                            <label for="password-create" class="registration__label">Create password</label>
                            <app-input 
                                id='password-create' 
                                class="registration__input" 
                                v-model.trim="password" 
                                :disabled='isWaiting' 
                                placeholder="Create password..."
                                @focus="inputFocus('password')"
                            /> 
                            <div class="registration__validation" v-if="isPasswordNotCorrect">Enter correct data!</div>
                        </div>
                        <div class="registration__input-block">
                            <label class="registration__label registration__label_mb">Gender</label>
                            <div class="registration__radios">
                                <div class="registration__radio">
                                    <input type="radio" id="r1" name="gender" value="Male" v-model="gender" hidden>
                                    <label for="r1" :class="{'is-gender-btn-active': isWaiting}">
                                        <p></p>
                                    </label>
                                    <p>Male <span></span></p>
                                </div>
                                <div class="registration__radio">
                                    <input type="radio" id="r2" name="gender" value="Female" v-model="gender" hidden>
                                    <label for="r2" :class="{'is-gender-btn-active': isWaiting}">
                                        <p></p>
                                    </label>
                                    <p>Female</p>
                                </div>
                                <div class="registration__radio">
                                    <input type="radio" id="r3" name="gender" value="Not specified" v-model="gender" hidden>
                                    <label for="r3" :class="{'is-gender-btn-active': isWaiting}">
                                        <p></p>
                                    </label>
                                    <p>Not specified<span></span> </p>
                                </div>
                                
                            </div>
                            <div class="registration__validation" v-if="isGenderNotChecked">Choose gender!</div>
                        </div>
                        <app-button @click="createAccount" :disabled='isWaiting' class="registration__button">{{ createBtnText }}</app-button>
                    </form>
                    <div v-else class="registration__complete">
                        <div class="registration__icon icon-successfull"></div>
                        <router-link to="/logIn">
                            <app-button class="registration__back">Back</app-button>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            login: '',
            password: '',
            gender: '',
            isLoginNotCorrect: false,
            isPasswordNotCorrect: false,
            isGenderNotChecked: false,
            isWaiting: false,
            isAccountNotCreated: true,
        }
    },
    methods: {
        createAccount(){
            if(this.login.length >= 5 && this.password.length >= 8 && !this.isGenderNotChecked){
                this.isWaiting = true;
                setTimeout(() => {
                    this.isWaiting = false;
                    this.isAccountNotCreated = false;
                }, 2000)
                const userParams = {
                    login: this.login,
                    password: this.password,
                    gender: this.gender
                };
                localStorage.setItem('userParams', JSON.stringify(userParams));
                localStorage.setItem('isAccountCreated', JSON.stringify(this.isAccountNotCreated));
            }
            if(this.login.length < 5){
                this.isLoginNotCorrect = true;
            }
            if(this.password.length < 8){
                this.isPasswordNotCorrect = true;
            }
            if(!this.gender){
                this.isGenderNotChecked = true;
            }
        },
        inputFocus(param){
            if(param === 'login'){
                this.isLoginNotCorrect = false;
            }
            else{
                this.isPasswordNotCorrect = false;
            }
        },
    },
    watch: {
        gender(newValue){
            if(newValue.length > 0){
                this.isGenderNotChecked = false;
            }
        }
    },
    computed: {
        createBtnText(){
            return this.isWaiting ? 'Creating...' : 'Create'
        },
        titleText(){
            return this.isAccountNotCreated ? 'Create account' : 'Account created!';
        }
    },
    mounted(){
        if(localStorage.getItem('isAccountCreated')){
            this.isAccountNotCreated = false;
        }
    },
}
</script>

<style lang="scss">
.registration {
    padding: 150px 0 60px;
    &__body {
        max-width: 524px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    &__title {
        font-weight: 700;
        font-size: 54px;
        line-height: 119%;
        text-align: center;
        color: #FFFFFF;
        margin-bottom: 24px;
    }

    &__label{
        display: inline-block;
        font-weight: 700;
        font-size: 24px;
        line-height: 133%;
        color: #FFFFFF;
        margin-bottom: 6px;
        &_mb{
            margin-bottom: 15px;
        }
    }
    &__radios{
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        margin-bottom: 13px;
    }
    &__radio {
        display: flex;
        align-items: center;
        margin-right: 57px;
        margin-bottom: 20px;
        label{
            cursor: pointer;
            width: 20px;
            height: 20px;
            background: #fff;
            border-radius: 50%;
            margin-right: 6px;
            font-size: 1rem;
            line-height: 150%;
            color: #FFFFFF;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all .4s ease 0s;
            p {
                display: none;
                width: 10px;
                height: 10px;
                background: #1ed5a1;
                border-radius: 50%;
            }
            @media all and (min-width: 62em) {
                &:hover{
                    background: #d8d7d7;
                }
            }
        }
        input[type='radio']:checked + label{
            p {
                display: block;
            }
        }
    }
    &__validation{
        margin-top: -15px;
        color: red;
        padding: 0 0 10px;
    }
    &__complete{
        display: flex;  
        flex-direction: column;
        align-items: center;
        margin-top: 20px;
    }
    &__icon{
        font-size: 180px;
        margin-bottom: 10px;
        @media all and (max-width: 578px) {
            font-size: 200px;
        }
    }
    &__button{
        padding-right: 35px;
        padding-left: 35px;
    }
    &__back{
        padding-right: 40px;
        padding-left: 40px;
    }
}

.is-gender-btn-active{
    cursor: not-allowed !important;
    &:hover{
        background: #fff !important;
    }
}

</style>