<script setup>

useSeoMeta({
    title: "Home | Online Course"
})

const router = useRouter()

</script>

<template>
    <div>
        <UContainer class="mt-5 flex flex-col gap-10">
            <Categories />
            <Hero />
        </UContainer>
    </div>
</template>