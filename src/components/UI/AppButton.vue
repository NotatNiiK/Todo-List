<template>
    <button class="button">
        <slot>Click</slot>
    </button>
</template>

<script>
export default {
    name: 'AppButton'
}
</script>

<style lang="scss">
.button{
    cursor: pointer;
    font-weight: 700;
    font-size: 1.25rem;
    line-height: 160%;
    color: #FFFFFF;
    border: 2px solid #FFFFFF;
    border-radius: 5px;
    padding: 7px 15px;
    transition: all .4s ease 0s;
    @media all and (min-width: 62em){
        &:hover{
            background: #fff;
            color: #333;
        }
    }
    &:disabled{
        cursor: not-allowed;
        &:hover{
            background: transparent;
            color: #fff;
        }
    }
}
</style>