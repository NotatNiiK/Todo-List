<template>
    <div class="wrapper">
        <AppHeder />
        <section class="authorization">
            <div class="authorization__container">
                <div class="authorization__body">
                    <h1 class="authorization__title">Log in</h1>
                    <form action="#" class="authorization__form">
                        <div>
                            <label for="login">Login:</label>
                            <input type="text" id="login" class="authorization__input" placeholder="Enter login...">
                        </div>
                        <div>
                            <label for="password">Password:</label>
                            <input type="text" id="password" class="authorization__input" placeholder="Enter password...">
                        </div>
                        <div class="authorization__buttons">
                            <AppButton class="authorization__button">Log in</AppButton>
                            <button class="authorization__create">Create account</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import AppHeder from '../components/AppHeader';
export default {
    components:{
        AppHeder
    },
   /*  data(){
        return {
            currentComponent
        }
    } */
}
</script>

<style lang="scss" scoped>
.authorization{
    padding: 150px 0 60px;
    &__body{
        text-align: center;
        max-width: 524px;
        margin: 0 auto;
    }
    &__title{
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
    &__input{
        font-size: 1rem;
        width: 100%;
        padding: 15px 20px;
        background: #FFFFFF;
        border-radius: 5px;
        border: none;
        margin-bottom: 22px;
        transition: all .4s ease 0s;
        &::placeholder{
            font-size: 1rem;
            line-height: 200%;
            color: rgba(51, 51, 51, 0.6);
        }
        &:focus{
            box-shadow: 0px 0px 10px #fff;
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
}
</style>