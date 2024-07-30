<script setup>
import { storeToRefs } from "pinia"
import { useAuthStore } from "~/store/auth";

const loadComponent = ref(true)

tryOnMounted(() => {
    loadComponent.value = false
})

const { isMobile, isDesktop } = useDevice()

const { isAuthenticated } = storeToRefs(useAuthStore())
const router = useRouter()

const { logUserOut } = useAuthStore()


const goLogout = () => {
    isOpen.value = false
    logUserOut()
    router.push('/accounts/login')
}

const isOpen = ref(false)

const colorMode = useColorMode()
const changeTheme = () => {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

const search = ref(null)

</script>

<template>
    <div class="sticky top-0 container mx-auto">
        <div v-if="loadComponent && isDesktop" class="mt-5">
            <div class="flex items-center space-x-4 justify-between">
                <div class="col-6 flex gap-3 items-center">
                    <MySkeleton class="h-4 w-[250px]" />
                    <MySkeleton class="h-4 w-[100px]" />
                    <MySkeleton class="h-4 w-[100px]" />
                    <MySkeleton class="h-4 w-[100px]" />
                    <MySkeleton class="h-4 w-[100px]" />
                </div>
                <div class="col-6 flex gap-3 items-center justify-between">
                    <MySkeleton class="h-10 w-[250px]" />
                    <MySkeleton class="h-10 w-[2px]" />
                    <div class="flex gap-2 items-center">
                        <MySkeleton class="h-12 w-12"
                            :ui="{ rounded: 'rounded-lg', background: 'bg-gray-300 dark:bg-gray-600' }" />
                        <div class="flex flex-col gap-3 justify-between">
                            <MySkeleton class="h-3 w-[100px]" />
                            <MySkeleton class="h-3 w-[100px]" />
                        </div>
                        <MySkeleton class="h-12 w-12"
                            :ui="{ rounded: 'rounded-lg', background: 'bg-gray-300 dark:bg-gray-600' }" />
                    </div>
                </div>
            </div>
        </div>
        <div v-if="loadComponent && isMobile" class="mt-5 p-1">
            <div class="flex items-center space-x-4 justify-between">
                <MySkeleton class="h-4 w-32" />
                <MySkeleton class="h-10 w-10" />
            </div>
        </div>
        <div v-if="!loadComponent" class="mt-5">
            <div class="flex items-center justify-between hidden md:flex" v-if="isDesktop">
                <div class="col-6 flex items-center gap-10">
                    <NuxtLink to="/" class="logo">
                        <NuxtImg alt="LOGO." src="/logo.png" sizes="100vw sm:50vw md:200px"
                            class="dark:bg-white dark:rounded-full" />
                    </NuxtLink>
                    <div class="flex items-center gap-4">
                        <NuxtLink to="/">Home</NuxtLink>
                        <NuxtLink to="/courses">Courses</NuxtLink>
                        <NuxtLink to="/about">About</NuxtLink>
                        <NuxtLink to="/contact">Contact</NuxtLink>
                    </div>
                </div>
                <div class="col-6 flex items-center justify-between gap-5">
                    <UInput color="gray" size="xl" variant="outline" v-model="search" placeholder="Search..." :trailing="true">
                        <template #trailing>
                            <UKbd v-if="search != ''">ENTER</UKbd>
                        </template>
                    </UInput>
                    <span class="h-10 w-px dark:bg-gray-600 bg-gray-200"></span>
                    <div v-if="isAuthenticated" class="flex items-center gap-3">
                        <div class="flex gap-3 items-center">
                            <UAvatar src="https://avatars.githubusercontent.com/u/739984?v=4" alt="user avatar" />
                            <div class="flex flex-col items-start justify-between">
                                <span class="font-bold">User Name</span>
                                <span class="text-gray-400">Web Designer</span>
                            </div>
                        </div>
                        <UButton label="Logout" size="xl" color="rose" icon="i-heroicons-x-mark-20-solid"
                            @click="goLogout" />
                    </div>
                    <div v-if="!isAuthenticated" class="flex items-center gap-3">
                        <UButton label="Login" size="xl" variant="outline" @click="router.push('/accounts/login')" />
                        <UButton label="Register" size="xl" @click="router.push('/accounts/register')" />
                    </div>
                    <UTooltip text="Change Theme" :popper="{ arrow: true }">
                        <UButton size="xl" variant="soft"
                            :icon="colorMode.value === 'dark' ? 'i-heroicons-sun' : 'i-heroicons-moon'"
                            @click="changeTheme" />
                    </UTooltip>
                </div>
            </div>
            <div v-if="isMobile" class="flex items-center justify-between md:hidden">
                <h1 class="ms-2 font-bold text-2xl">Online Courses</h1>
                <div class="flex gap-2">
                    <UButton size="xl" variant="soft"
                        :icon="colorMode.value === 'dark' ? 'i-heroicons-sun' : 'i-heroicons-moon'"
                        @click="changeTheme" />
                    <UButton icon="i-heroicons-bars-3-bottom-right" size="xl" variant="soft" class="me-2"
                        @click="isOpen = !isOpen" />
                    <USlideover v-model="isOpen" class="md:hidden">
                        <UCard class="flex flex-col flex-1"
                            :ui="{ body: { base: 'flex-1' }, ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
                            <template #header>
                                <UButton color="gray" variant="ghost" size="sm" icon="i-heroicons-x-mark-20-solid"
                                    class="flex sm:hidden absolute end-5 top-5 z-10" square padded
                                    @click="isOpen = false" />

                                <h6 class="font-bold">Menu</h6>
                            </template>
                            <div class="flex gap-2">
                                <UInput type="search" placeholder="search..." size="xl" class="w-full" />
                                <UButton icon="i-heroicons-magnifying-glass-20-solid" size="xl" variant="soft" />
                            </div>
                            <div class="flex flex-col items-start gap-4 mt-5">
                                <NuxtLink to="/" @click="isOpen = false">Home</NuxtLink>
                                <NuxtLink to="/courses" @click="isOpen = false">Courses</NuxtLink>
                                <NuxtLink to="/about" @click="isOpen = false">About</NuxtLink>
                                <NuxtLink to="/contact" @click="isOpen = false">Contact</NuxtLink>
                            </div>
                            <div v-if="isAuthenticated" class="flex flex-col items-start gap-3 mt-5">
                                <div class="flex gap-3 items-center">
                                    <UAvatar src="https://avatars.githubusercontent.com/u/739984?v=4"
                                        alt="user avatar" />
                                    <div class="flex flex-col items-start justify-between">
                                        <span class="font-bold">User Name</span>
                                        <span class="text-gray-400">Web Designer</span>
                                    </div>
                                </div>
                                <UButton color="rose" label="Logout" @click="goLogout"
                                    icon="i-heroicons-x-mark-20-solid" />
                            </div>
                            <div v-if="!isAuthenticated" class="flex items-center gap-3 mt-5">
                                <NuxtLink to="/accounts/login" @click="isOpen = false">
                                    <UButton label="Login" size="xl" variant="outline" />
                                </NuxtLink>
                                <NuxtLink to="/accounts/register" @click="isOpen = false">
                                    <UButton label="Register" size="xl" />
                                </NuxtLink>
                            </div>
                        </UCard>
                    </USlideover>
                </div>
            </div>
            <UDivider class="mt-5" />
        </div>
    </div>
</template>