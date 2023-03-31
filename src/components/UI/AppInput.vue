<template>
    <input type="text" class="input">
</template>

<script>
export default {
    name: 'AppInput'
}
</script>

<style lang="scss" scoped>
.input{
    color: #fff;
    font-size: 1.2rem;
    padding: 8px 12px;
    background: none;
    border: none;
    border-bottom: 3px solid #fff;
    &::placeholder{
        font-weight: 700;
        font-size: 1.25rem;
        line-height: 160%;
        color: rgba(255, 255, 255, 0.8);
    }
}
</style>