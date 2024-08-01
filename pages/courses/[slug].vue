<script setup>

const route = useRoute()

</script>

<template>
    <div>
        <UContainer class="mt-5">
            {{ route.params.slug }}
        </UContainer>
    </div>
</template>