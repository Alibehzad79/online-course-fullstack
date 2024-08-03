<script setup>
const load = ref(true)

tryOnMounted(() => {
    load.value = false
})

const items = [
    {
        label: 'All Courses',
        key: "all"
    },
    {
        label: 'Design',
        key: "design"
    },
    {
        label: 'Development',
        key: "dev"
    },
    {
        label: 'Photography',
        key: "photo"
    },
    {
        label: 'Music',
        key: "music"
    }
]

</script>

<template>
    <div>
        <div v-if="load" class="flex flex-col gap-10">
            <div class="flex justify-between items-center">
                <MySkeleton class="h-4 w-20" />
                <MySkeleton class="h-4 w-60" />
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 justify-items-center">
                <MySkeleton class="h-60 w-72" v-for="x in 8" />
            </div>
        </div>
        <div v-if="!load" class="flex flex-col gap-10">
            <div class="flex justify-between items-center">
                <strong class="uppercase">New Courses</strong>
                <div class="flex gap-3">
                    <UTabs :items="items">
                        <template #item="{ item }">
                            <div v-if="item.key === 'all'">
                                All Courses
                            </div>
                            <div v-if="item.key === 'design'">
                                Designs
                            </div>
                            <div v-if="item.key === 'dev'">
                                Development
                            </div>
                            <div v-if="item.key === 'photo'">
                                Photography
                            </div>
                            <div v-if="item.key === 'music'">
                                Musics
                            </div>
                        </template>
                    </UTabs>
                </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 justify-items-center">

            </div>
        </div>
    </div>
</template>