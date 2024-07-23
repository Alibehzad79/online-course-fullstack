import { defineStore } from "pinia";

export const useAuthStore = defineStore('auth', {
    state: () => (
        {
            isAuthenticated: false,
            loading: false,
        }
    ),
    actions: {
        async authenticationUser(email: String, password: String) {
            console.log("request from store")
            const { data, pending, error } = await useFetch('http://localhost:8000/api/accounts/token/',
                {
                    method: "post",
                    headers: { 'Content-Type': 'application/json' },
                    body: {
                        "email": email,
                        "password": password
                    }
                }
            )
            this.loading = pending.value

            if (data.value) {
                const token = useCookie("token")
                const refreshToken = useCookie("refresh_token")
                token.value = data?.value?.access
                refreshToken.value = data?.value?.refresh
                this.isAuthenticated = true
            }
        },

        async logUserOut() {
            const token = useCookie("token")
            const refreshToken = useCookie("refresh_token")
            this.isAuthenticated = false
            token.value = null
            refreshToken.value = null
        }
    }
})