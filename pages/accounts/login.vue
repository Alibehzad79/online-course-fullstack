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

const showPassword = ref(false)
const btnLoading = ref(false)
const toast = useToast()
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
    if (error.value) {
        btnLoading.value = false
        toast.add(
            {
                id: 'loginError',
                title: "Login Faild",
                description: `"Invalid Email Or Password (${error.value})"`,
                icon: "i-heroicons-x-circle",
                color: "rose"
            }
        )
    }
}


</script>

<template>
    <div>
        <div class="container mx-auto p-5 mt-5 flex gap-5 items-center">
            <UNotifications />
            <NuxtImg src="/login.png" class="hidden md:flex md:w-1/2" />
            <form @submit.prevent="doLogin" class="flex flex-col gap-5 w-full md:w-1/2">
                <h1 class="text-xl md:text-4xl font-bold">Login</h1>
                <UInput v-model="user.email" type="email" required placeholder="Email" icon="i-heroicons-envelope" />
                <UInput v-model="user.password" :type="showPassword ? 'text' : 'password'" required
                    placeholder="Password" icon="i-heroicons-key">
                    <template #leading>
                        <UIcon :name="showPassword ? 'i-heroicons-eye' : 'i-heroicons-eye-slash'"
                            @click="showPassword = !showPassword" />
                    </template>
                </UInput>
                <UButton label="Login" type="submit" :loading="btnLoading" class="justify-center" />
            </form>
        </div>
    </div>
</template>