<script setup>
const load = ref(true)
tryOnMounted(() => {
    load.value = false
})

const { isDesktop, isMobile } = useDevice()

const { data: categories } = await useFetch('https://fakestoreapi.com/products/categories')
</script>

<template>
    <div>
        <div v-if="load && isDesktop" class="flex gap-2 justify-center items-center">
            <MySkeleton class="h-10 w-28" v-for="n in 10" />
        </div>
        <div v-if="load && isMobile" class="flex gap-2 justify-center items-center">
            <MySkeleton class="h-10 w-28" v-for="n in 3" />
        </div>
        <div v-if="!load" class="w-full flex items-center gap-5">
            <UButton variant="soft" color="white" class="border" label="Categories" size="lg" icon="i-heroicons-tag" />
            <UCarousel v-slot="{ item }" :items="categories"
                :ui="{ container: 'gap-3 mx-auto mx-2 md:mx-0', wrapper: 'w-full overflow-hidden' }">
                <UButton :label="item" variant="soft" size="lg" />
            </UCarousel>
        </div>
    </div>
</template>