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
            <div class="flex justify-between items-start w-full flex-col gap-2">
                <strong class="uppercase">New Courses</strong>
                <div class="flex gap-3 w-full">
                    <UTabs :items="items" class="w-full">
                        <template #item="{ item }">
                            <div v-if="item.key === 'all'"
                                class="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-5">
                                <CourseCard v-for="x in 6" title="All lorem ipsum is good to use fake content for projects"
                                    image="/image.png"
                                    lesson="20" students="162" rank="Beginner" rate="4" />
                            </div>
                            <div v-if="item.key === 'design'"
                                class="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-5">
                                <CourseCard v-for="x in 6" title="Desing lorem ipsum is good to use fake content for projects"
                                    image="/image.png"
                                    lesson="20" students="80" rank="Beginner" rate="5" />
                            </div>
                            <div v-if="item.key === 'dev'"
                                class="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-5">
                                <CourseCard v-for="x in 6" title="Development lorem ipsum is good to use fake content for projects"
                                    image="/image.png"
                                    lesson="20" students="90" rank="Beginner" rate="3" />
                            </div>
                            <div v-if="item.key === 'photo'"
                                class="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-5">
                                <CourseCard v-for="x in 6" title="Photography lorem ipsum is good to use fake content for projects"
                                    image="/image.png"
                                    lesson="20" students="150" rank="Beginner" rate="4" />
                            </div>
                            <div v-if="item.key === 'music'"
                                class="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-5">
                                <CourseCard v-for="x in 6" title="Music lorem ipsum is good to use fake content for projects"
                                    image="/image.png"
                                    lesson="20" students="162" rank="Beginner" rate="5" />
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