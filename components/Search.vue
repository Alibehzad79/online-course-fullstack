<script setup>
const load = ref(true)
tryOnMounted(() => {
    load.value = false
})

const {isDesktop, isMobile} = useDevice()
const search = ref(null)

</script>

<template>
    <div>
        <UContainer class="mt-10">
            <div v-if="load && isDesktop" class="flex flex-col gap-10 w-full items-center">
                <div class="flex flex-col gap-3 w-full items-center">
                    <MySkeleton class="h-5 w-1/2" />
                    <MySkeleton class="h-5 w-1/2" />
                    <MySkeleton class="h-5 w-1/3" />
                </div>
                <div class="flex items-center gap-2 w-full justify-center">
                    <MySkeleton class="h-10 w-1/2" />
                    <MySkeleton class="h-4 w-52" />
                </div>
            </div>
            <div v-if="load && isMobile" class="flex flex-col gap-10 w-full items-center">
                <div class="flex flex-col gap-3 w-full items-center">
                    <MySkeleton class="h-5 w-full" />
                    <MySkeleton class="h-5 w-full" />
                    <MySkeleton class="h-5 w-1/2" />
                </div>
                <div class="flex flex-col items-center gap-2 w-full justify-center">
                    <MySkeleton class="h-10 w-full" />
                    <MySkeleton class="h-4 w-1/2" />
                </div>
            </div>

            <div v-if="!load" class="flex flex-col gap-10 w-full items-center">
                <p class="text-center text-xl md:text-2xl font-bold">
                    Search among <mark class="text-primary bg-transparent">58340</mark> courses and <br> find your
                    favorite course
                </p>
                <div class="flex flex-col gap-2 w-full justify-center items-center md:flex-row">
                    <UInput type="search" v-model="search" required placeholder="Search Anything" trailing size="xl"
                        class="w-full md:w-2/3" color="gray">
                        <template #trailing>
                            <span class="i-heroicons-magnifying-glass text-2xl text-gray-400"
                                v-if="search === null || search === ''"></span>
                            <UKbd class="text-gray-500 dark:text-gray-400 text-xs"
                                v-if="search !== null && search !== ''">ENTER</UKbd>
                        </template>
                    </UInput>
                    <span class="text-gray-400">Or view the following courses...</span>
                </div>
            </div>
        </UContainer>
    </div>
</template>