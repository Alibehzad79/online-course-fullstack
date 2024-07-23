import { storeToRefs } from "pinia"
import { useAuthStore } from "~/store/auth"

export const useVerifyToken = async () => {
    const token = useCookie("token")
    const { isAuthenticated } = storeToRefs(useAuthStore())
    const { data, status } = await useFetch('http://127.0.0.1:8000/api/accounts/token/verify/', {
        method: "post",
        headers: { 'Content-Type': 'application/json' },
        body: {
            'token': token.value
        }
    })
    if (status.value !== "success") {
        const token = useCookie('token')
        isAuthenticated.value = false
        token.value = null
    }
}