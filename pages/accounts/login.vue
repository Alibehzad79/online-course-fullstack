<script setup>

import { storeToRefs } from "pinia"
import { useAuthStore } from "~/store/auth";
const { authenticationUser } = useAuthStore()
const { isAuthenticated, loading, error } = storeToRefs(useAuthStore())


definePageMeta({
    name: "login",
    middleware: "auth"
})

useSeoMeta({
    title: "Login Page"
})

const router = useRouter()
const btnLoading = ref(false)
const user = ref({
    email: "",
    password: ""
})

const doLogin = async () => {
    btnLoading.value = loading
    await authenticationUser(user.value.email, user.value.password)
    if (isAuthenticated.value) {
        router.push('/')
    }
    if (!isAuthenticated.value) {
        btnLoading.value = false
    }
}


const selected = ref(false)


</script>

<template>
    <div>
        <div class="container mx-auto p-5 mt-5 flex gap-5 items-center">
            <NuxtImg src="/login.png" :loading="imageLoading" class="hidden md:flex md:w-1/2" />
            <form @submit.prevent="doLogin" class="flex flex-col gap-5 w-full md:w-1/2">
                <h1 class="text-xl md:text-4xl font-bold">Login</h1>
                <UInput v-model="user.email" type="email" required placeholder="Email" size="xl"
                    icon="i-heroicons-envelope" />
                <UInput v-model="user.password" :type="selected ? 'text' : 'password'" size="xl" required
                    placeholder="Password" icon="i-heroicons-key">
                </UInput>
                <div class="flex gap-1 items-center justify-between">
                    <div class="flex items-center gap-1">
                        <UToggle v-model="selected" /><span>Show Password</span>
                    </div>
                    <NuxtLink to="/accounts/forget-password" class="text-primary">Forget Password?</NuxtLink>
                </div>
                <UButton label="Login" type="submit" :loading="btnLoading" size="xl" class="justify-center" />
            </form>
        </div>
    </div>
</template>