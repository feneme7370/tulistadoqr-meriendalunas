<script setup>
    // importar configuraciones
    import { urlBack } from '@/helpers/config'
    import { ref,watch } from 'vue';

    // recibir datos
    const props = defineProps({
        companiesDates: {type: Object, required: true}
    })

    const img_hero = ref('')    
    const img_logo = ref('')    
    // Utilizar el hook watch para esperar cambios en props.companiesDates
    watch(() => props.companiesDates, () => {
        img_hero.value = urlBack()+props.companiesDates.image_hero_uri+props.companiesDates.image_hero;
        img_logo.value = urlBack()+props.companiesDates.image_logo_uri+props.companiesDates.image_logo;
    });
</script>

<template>

<section class="bg-center bg-no-repeat bg-gray-700 w-full p-2 relative">

    <!-- imagen de portada -->
    <img 
        loading="lazy"
        class="w-full opacity-30 object-cover min-h-48"
        :src="img_hero" 
        alt="imagen portada"
    >

    <!-- imagen de logo -->
    <img 
        loading="lazy"
        class="absolute border border-primary-200 object-cover h-24 w-24 right-5 -bottom-10"
        :src="urlBack()+companiesDates.image_logo_uri+ companiesDates.image_logo" 
        alt="imagen logo"
    >

    <!-- descripcion sobre la portada -->
    <div class="absolute top-0 right-0 bottom-0 left-0 px-1 mx-auto max-w-screen-xl text-center flex items-center justify-center flex-col text-gray-100 f-dosis">

        <h1 class="mb-4 text-xl sm:text-2xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl animate__animated animate__delay-2s animate__bounce">{{ companiesDates.name }}</h1>

        <p class="mb-8 text-lg font-normal lg:text-lg sm:px-16 leading-none ease-linear">{{ companiesDates.short_description}}</p>

    </div>

</section>

</template>

<style scoped>

</style>