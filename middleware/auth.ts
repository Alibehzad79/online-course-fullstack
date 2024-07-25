import { storeToRefs } from "pinia"
import { useAuthStore } from "~/store/auth"
export default defineNuxtRouteMiddleware((to, from) => {
    const { isAuthenticated } = storeToRefs(useAuthStore())
    const token = useCookie('token')

    if (token.value) {
        isAuthenticated.value = true
    }

    if (token.value && to?.name === "login" || token.value && to?.name === "register") {
        return navigateTo('/');
    }

    if (!token.value && to?.name !== "login") {
        if (!token.value && to?.name === "register") {
            return
        } else {
            abortNavigation()
            return navigateTo("/accounts/login")
        }
    }

})