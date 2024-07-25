<script setup>
const isLoading = ref(true)
const nuxtapp = useNuxtApp()

nuxtapp.hook('page:loading:start', () => {
  isLoading.value = true
})
nuxtapp.hook('page:loading:end', () => {
  isLoading.value = false
})

</script>

<template>
  <div>
    <div v-if="isLoading">
      <UProgress animation="carousel" size="sm" />
    </div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
