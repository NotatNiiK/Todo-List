<template>
    <input 
        type="text" 
        class="input"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
    >
</template>

<script>
export default {
    name: 'AppInput',
    props: {
        modelValue: String
    },
    emits: ['update:modelValue']
}
</script>

<style lang="scss" scoped>
.input{
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
    &:disabled{
        cursor: not-allowed;
        background: #d7d5d5;
    }
}
</style>