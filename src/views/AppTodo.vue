<template>
    <div class="wrapper">
        <section class="todo">
            <div class="todo__container">
                <AppHeader />
                <div class="todo__body"></div>
            </div>
        </section>
    </div>
</template>

<script>
import AppHeader from '../components/AppHeader';
export default {
    components: {
        AppHeader
    }
}
</script>