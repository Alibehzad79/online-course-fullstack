<script setup>
import { storeToRefs } from "pinia"
import { useAuthStore } from "~/store/auth";


const { isAuthenticated } = storeToRefs(useAuthStore())
const router = useRouter()

const { logUserOut } = useAuthStore()


const goLogout = () => {
    logUserOut()
    router.push('/accounts/login')
}

const isOpen = ref(false)

const colorMode = useColorMode()
const changeTheme = () => {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}


const links = [{
    label: 'Home',
    icon: 'i-heroicons-home',
    to: '/',
    click: () => {
        isOpen.value = false
    }
}, {
    label: 'Courses',
    icon: 'i-heroicons-chart-bar',
    click: () => {
        isOpen.value = false
    }
}, {
    label: 'About',
    icon: 'i-heroicons-command-line',
    click: () => {
        isOpen.value = false
    }
}]

const authLinks = [
    {
        label: "Login",
        icon: "i-heroicons-key",
        to: "/accounts/login",
        click: () => {
            isOpen.value = false
        }
    },
    {
        label: "Register",
        icon: "i-heroicons-users",
        to: "/accounts/register",
        click: () => {
            isOpen.value = false
        }
    },
]

const userLinks = [
    {
        label: 'Profile',
        avatar: {
            src: 'https://avatars.githubusercontent.com/u/739984?v=4'
        },
        to: "/accounts/user",
        click: () => {
            isOpen.value = false
        }
    },
    {
        label: 'Logout',
        icon: "i-heroicons-x-mark",
        labelClass: "text-red-600",
        iconClass: "text-red-600",
        click: () => {
            isOpen.value = false
            goLogout()
        }
    },

]

</script>

<template>
    <div class="sticky top-0">
        <div class="container mx-auto mt-5 flex justify-between hidden md:flex items-center shadow-xl p-5 rounded-xl z-50 bg-white dark:bg-zinc-800">
            <NuxtLink to="/">
                <NuxtImg src="/logo.png" class="me-5 dark:bg-white rounded-md" style="max-width: 120px; max-height: 120px;" />
            </NuxtLink>
            <UHorizontalNavigation :links="links" class="dark:border-gray-800 md:w-3/4" />
            <UHorizontalNavigation v-if="!isAuthenticated" :links="authLinks"
                class="dark:border-gray-800 md:w-1/4" />
            <UHorizontalNavigation v-if="isAuthenticated" :links="userLinks"
                class="dark:border-gray-800 md:w-1/4" />
            <UButton :icon="colorMode.value === 'dark' ? 'i-heroicons-sun' : 'i-heroicons-moon'" @click="changeTheme" />
        </div>
        <div class="md:hidden flex justify-between mt-2 p-2">
            <NuxtLink to="/">
                <NuxtImg src="/logo.png" class="me-5" style="max-width: 120px; max-height: 120px;" />
            </NuxtLink>
            <div class="flex gap-2 items-center">
                <UButton :icon="colorMode.value === 'dark' ? 'i-heroicons-sun' : 'i-heroicons-moon'" @click="changeTheme" />
                <UButton icon="i-heroicons-bars-3" label="Menu" @click="isOpen = true" />
            </div>
        </div>
        <div>
            <USlideover v-model="isOpen" class="md:hidden">
                <UCard class="flex flex-col flex-1"
                    :ui="{ body: { base: 'flex-1' }, ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
                    <template #header>
                        <UButton color="gray" variant="ghost" size="sm" icon="i-heroicons-x-mark-20-solid"
                            class="flex sm:hidden absolute end-5 top-5 z-10" square padded @click="isOpen = false" />
                        <h6 class="font-bold">Menu</h6>
                    </template>
                    <div class="flex gap-2 mb-5">
                        <UInput type="text" class="w-full" placeholder="Search..." />
                        <UButton icon="i-heroicons-magnifying-glass" />
                    </div>
                    <div class="flex flex-col gap-5">
                        <UVerticalNavigation :links="links" />
                        <UVerticalNavigation :links="userLinks" v-if="isAuthenticated" />
                        <UVerticalNavigation :links="authLinks" v-if="!isAuthenticated" />
                    </div>
                </UCard>
            </USlideover>
        </div>
    </div>
</template>