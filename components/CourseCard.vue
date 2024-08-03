<script setup>
const load = ref(true)
tryOnMounted(() => {
    load.value = false
})

import { useImage } from '@vueuse/core'


const props = defineProps([
    'title',
    'image',
    'lesson',
    'students',
    'rank',
    'rate'
])


const { isLoading } = useImage({ src: props.image })
</script>

<template>
    <div>
        <div v-if="load">
            <MySkeleton class="h-60 w-72" />
        </div>
        <div v-if="!load" class="bg-gray-100 dark:bg-gray-800 rounded-md flex flex-col gap-5 p-4 w-96">
            <div v-if="isLoading" class="items-center justify-center flex h-60">
                <i class="i-heroicons-arrow-path animate-spin"></i>
            </div>
            <NuxtImg :src="props.image" v-if="!isLoading" class="rounded-md" />
            <h6 class="line-clamp-1 font-bold">{{ title }}</h6>
            <div class="flex justify-between">
                <span class="flex items-center"><i
                        class="me-2 i-heroicons-bookmark-square text-xl text-gray-500"></i>Lesson: {{ lesson }}</span>
                <span class="flex items-center"><i class="me-2 i-heroicons-user text-xl text-gray-500"></i>Students:
                    {{ students }}</span>
                <span class="flex items-center"><i class="me-2 i-heroicons-trophy text-xl text-gray-500"></i>{{ rank
                    }}</span>
            </div>
            <div class="flex justify-between">
                <UButton label="Start Course" icon="i-heroicons-chevron-right" color="primary" trailing />
                <div class="flex gap-1">
                    <UIcon name="i-heroicons-star-solid text-xl" v-for="x in parseInt(rate)" class="bg-yellow-400" />
                </div>
            </div>
        </div>
    </div>
</template>