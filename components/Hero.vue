<script setup>
import { useImage } from '@vueuse/core'

const load = ref(true)
tryOnMounted(() => {
    load.value = false
})

const router = useRouter()

const image = '/hero.jpg'
const { isLoading } = useImage({ src: image })

</script>

<template>
    <div>
        <div v-if="load" class="flex items-center justify-between">
            <div class="md:col-6 flex flex-col gap-10 w-full">
                <div class="flex flex-col gap-2">
                    <MySkeleton class="h-4 w-40" />
                    <MySkeleton class="h-4 w-80" />
                    <MySkeleton class="h-4 w-80" />
                    <MySkeleton class="h-4 w-60" />
                </div>
                <MySkeleton class="h-10 w-32" />
            </div>
            <div class="md:col-6 w-full">
                <MySkeleton class="h-96 w-full" />
            </div>
        </div>
        <div v-if="!load" class="flex flex-col md:flex-row flex-col-reverse items-center justify-between gap-10">
            <div class="w-full md:col-6 flex flex-col gap-10">
                <p class="text-2xl md:text-4xl font-bold leading-10">
                    🙌 Hello friends <br>
                    I am Sofia and we want to start a web design course together. Do you like it too 😍 ?
                </p>
                <UButton label="Start Course Now" class="md:w-1/2 justify-center" size="xl" color="black"
                    icon="i-heroicons-chevron-right" trailing @click="router.push(`/courses/ui-ux`)" />
            </div>
            <div class="w-full md:col-6">
                <MySkeleton class="h-96 w-full" v-if="isLoading" />
                <NuxtImg v-if="!isLoading" :src="image" alt="hero" title="hero" class="rounded-xl" />
            </div>
        </div>
    </div>
</template>