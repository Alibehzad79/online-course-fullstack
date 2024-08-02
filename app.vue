<script setup>
const isLoading = ref(true)
const loadValue = ref(0)
const nuxtapp = useNuxtApp()

nuxtapp.hook('page:loading:start', () => {
  isLoading.value = true
  loadValue.value = 70
})
nuxtapp.hook('page:loading:end', () => {
  loadValue.value = 100
  setTimeout(() => {
    isLoading.value = false
  }, 500);
})

</script>

<template>
  <div>
    <div v-if="isLoading" class="absolute top-0">
      <UProgress size="sm" :value="loadValue" />
    </div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
