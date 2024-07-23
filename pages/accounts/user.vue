<script setup>
const verifyToken = useVerifyToken()
tryOnMounted(() => {
    verifyToken
})

definePageMeta({
    name: "user",
    middleware: "auth"
})
useSeoMeta({
    title: "User Info"
})

const token = useCookie('token')

const {data, status, pending, error} = await useFetch('http://localhost:8000/api/accounts/user/', {
    method: "get",
    headers: {
        Authorization: `Bearer ${token.value}`
    }
})

</script>

<template>
    <div>
        {{ data }}
    </div>
</template>