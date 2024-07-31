<script setup>
import { useImage } from '@vueuse/core'
import { storeToRefs } from "pinia"
import { useAuthStore } from "~/store/auth";

const load = ref(true)
tryOnMounted(() => {
    load.value = false
})


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

const imageUrl = '/login.png'
const { isLoading } = useImage({ src: imageUrl })

</script>

<template>
    <div>
        <div v-if="load" class="container mx-auto p-5 mt-5 flex gap-5 items-center">
            <MySkeleton v-if="load" class="hidden md:flex md:w-1/2 h-96" />
            <div class="flex flex-col gap-5 w-full md:w-1/2">
                <MySkeleton class="h-4 w-52" />
                <MySkeleton class="h-10 w-full" />
                <MySkeleton class="h-10 w-full" />
                <div class="flex items-center justify-between">
                    <MySkeleton class="h-4 w-20" />
                    <MySkeleton class="h-4 w-20" />
                </div>
                <MySkeleton class="h-10 w-full" />
            </div>
        </div>
        <div class="container mx-auto p-5 mt-5 flex gap-5 items-center" v-if="!load">
            <MySkeleton v-if="isLoading" class="hidden md:flex md:w-1/2 h-96" />
            <NuxtImg :src="imageUrl" v-if="!isLoading" class="hidden md:flex md:w-1/2" />
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
                <UAlert :title="error.statusCode === 401 ? 'Invalid Email or Password' : 'Error ' + error.statusCode"
                    v-if="error" color="rose" />
            </form>
        </div>
    </div>
</template>