<script setup>

useSeoMeta({
    title: "Home | Online Course"
})

const router = useRouter()

</script>

<template>
    <div>
        <UContainer class="my-5 flex flex-col gap-20">
            <Categories />
            <Hero />
            <Search />
            <NewCourses />
        </UContainer>
    </div>
</template>