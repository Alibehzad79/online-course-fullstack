<script setup>
definePageMeta({
    name: "register",
    middleware: "auth"
})

useSeoMeta({
    title: "Register Page"
})

const load = ref(true)
tryOnMounted(() => {
    load.value = false
})

const passwordError = ref(false)
const exitsUserError = ref(false)
const btnLoading = ref(false)
const user = ref({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    rePassword: "",
})

const doRegister = async () => {
    if (user.value.password !== user.value.rePassword) {
        btnLoading.value = false
        passwordError.value = true
    } else {
        passwordError.value = false
        btnLoading.value = true
        const { data, status, pending } = await useFetch('http://127.0.0.1:8000/api/accounts/register/', {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: {
                "first_name": user.value.firstName,
                "last_name": user.value.lastName,
                "email": user.value.email,
                "password": user.value.password,
            }
        })
        if (data.value && status.value === "success") {
            navigateTo("/accounts/login")
        }
        if (status.value !== "success") {
            btnLoading.value = false
            exitsUserError.value = true
        }
    }

}
const selected = ref(false)

const imageUrl = '/register.png'
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
                <MySkeleton class="h-10 w-full" />
                <MySkeleton class="h-10 w-full" />
                <MySkeleton class="h-10 w-full" />
                <MySkeleton class="h-4 w-20" />
                <MySkeleton class="h-10 w-full" />
            </div>
        </div>
        <div class="container mx-auto p-5 mt-5 flex gap-5 items-center" v-if="!load">
            <MySkeleton v-if="isLoading" class="hidden md:flex md:w-1/2 h-96" />
            <NuxtImg :src="imageUrl" v-if="!isLoading" class="hidden md:flex md:w-1/2" />
            <form @submit.prevent="doRegister" class="flex flex-col gap-5 w-full md:w-1/2">
                <h1 class="text-xl md:text-4xl font-bold">Register</h1>

                <UInput v-model="user.firstName" minlength="5" type="text" required placeholder="First Name" size="xl"
                    icon="i-heroicons-user" />

                <UInput v-model="user.lastName" minlength="5" type="text" required placeholder="Last Name" size="xl"
                    icon="i-heroicons-user" />

                <UInput v-model="user.email" type="email" :color="exitsUserError ? 'red' : 'white'" required
                    placeholder="Email" size="xl" icon="i-heroicons-envelope" />

                <UInput v-model="user.password" :color="passwordError ? 'red' : 'white'"
                    :type="selected ? 'text' : 'password'" size="xl" required placeholder="Password"
                    icon="i-heroicons-key">
                </UInput>

                <UInput v-model="user.rePassword" :color="passwordError ? 'red' : 'white'"
                    :type="selected ? 'text' : 'password'" size="xl" required placeholder="Confirm Password"
                    icon="i-heroicons-key">
                </UInput>
                <div>
                    <UAlert title="Passwords is not equal" v-if="passwordError" color="rose" />
                    <UAlert title="Email is aleady exist." v-if="exitsUserError" color="rose" />
                </div>
                <div class="flex gap-1 items-center justify-between">
                    <div class="flex items-center gap-1">
                        <UToggle v-model="selected" /><span>Show Password</span>
                    </div>
                </div>
                <UButton label="Register" type="submit" :loading="btnLoading" size="xl" class="justify-center" />
            </form>
        </div>
    </div>
</template>