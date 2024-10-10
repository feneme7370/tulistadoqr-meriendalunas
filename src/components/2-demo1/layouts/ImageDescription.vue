<script setup>

    // importar configuraciones
    import { urlBack } from '@/helpers/config'

    import { ref, watch } from 'vue';
    // recibir datos
    const props = defineProps({
        companiesDates: {type: Object, required: true}
    })

    const img_hero = ref('')    
    // Utilizar el hook watch para esperar cambios en props.companiesDates
    watch(() => props.companiesDates, () => {
        img_hero.value = urlBack()+props.companiesDates.image_hero_uri+props.companiesDates.image_hero;
    });

</script>

<template>

<section class="w-full h-40 relative bg-gray-700 overflow-hidden bg-center bg-no-repeat border-t-2 border-b-2 border-primary-300">

    <!-- imagen -->
    <div class="h-40 w-full">
        <img :src="img_hero" alt="imagen portada" class="w-full object-cover opacity-20">
    </div>

    <!-- texto sobre la imagen -->
    <div class="absolute top-0 right-0 bottom-0 left-0 mx-auto h-auto max-w-screen-xl text-center flex items-center justify-center flex-col text-gray-100 f-dosis">

        <p class="px-1 py-3 text-lg font-normal lg:text-lg sm:px-16  ease-linear whitespace-pre-wrap">{{ companiesDates.description}}</p>

    </div>
</section>

</template>

<style scoped>

</style>