<script setup>

useSeoMeta({
    title: "Home | Online Course"
})

const router = useRouter()

</script>

<template>
    <div class="container mx-auto mt-5">
        <h1>Index Page</h1>
        {{ router }}
    </div>
</template>