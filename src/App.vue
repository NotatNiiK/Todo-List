<template>
  <Transition>
    <RouterView></RouterView>
  </Transition>
</template>

<script>

</script>

<style lang="scss" scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
