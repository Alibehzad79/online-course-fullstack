import { storeToRefs } from "pinia"
import { useAuthStore } from "~/store/auth"
export default defineNuxtRouteMiddleware((to, from) => {
    const { isAuthenticated } = storeToRefs(useAuthStore())
    const token = useCookie('token')

    if (token.value) {
        isAuthenticated.value = true
    }

    if (token.value && to?.name === "login") {
        return navigateTo('/');
    }

    if (!token.value && to?.name !== "login") {
        abortNavigation()
        return navigateTo("/accounts/login")
    }

})