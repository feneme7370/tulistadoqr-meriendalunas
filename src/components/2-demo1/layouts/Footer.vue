<script setup>
    // importar iconos
    import SocialIcons from '@/components/sistem/SocialIcons.vue'

    import { ref, watch } from 'vue';
    // helper de uri
    import { urlBack } from '@/helpers/config'

    const props = defineProps({
        companiesDates: {type: Object, required: true},
    })

    // poner fecha en el footer
    const date = new Date()
    const dateYear = date.getFullYear()

    const img_logo = ref('')    
    // Utilizar el hook watch para esperar cambios en props.companiesDates
    watch(() => props.companiesDates, () => {
        img_logo.value = urlBack()+props.companiesDates.image_logo_uri+props.companiesDates.image_logo;
    });
</script>

<template>


<footer class="bg-gray-900 border-t border-gray-300">

    <!-- card del footer -->
    <div class="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">

        <!-- contenido -->
        <div class="flex flex-col justify-between w-full">

            <!-- nombre de la empresa y logo -->
            <div class="mb-3">
                <a class="flex items-center justify-center">
                    <img
                        loading="lazy" 
                        :src="img_logo" 
                        class="h-8 me-3" 
                        alt="Logo" 
                    />

                    <span class="self-center text-3xl font-semibold whitespace-nowrap text-gray-100">{{ companiesDates.name }}</span>
                </a>

                <hr class="my-6 border border-gray-700 sm:mx-auto lg:my-8" />
            </div>

            <!-- datos responsive-->
            <div class="grid grid-cols-1 gap-3 sm:gap-6 sm:grid-cols-3 text-center mb-4">

                <!-- contacto -->
                <div>
                    <h2 class="mb-2 text-lg font-semibold text-gray-100 uppercase">Datos</h2>
                    <ul class="text-gray-400 font-medium">
                        <li class="mb-2">
                            <a class="text-sm">{{ companiesDates.email }}</a>
                        </li>
                        <li class="mb-2">
                            <a class="text-sm">{{ companiesDates.phone }}</a>
                        </li>
                        <li class="mb-2">
                            <a class="text-sm">{{ companiesDates.city }}</a>
                        </li>
                        <li class="mb-2">
                            <a class="text-sm">{{ companiesDates.url }}</a>
                        </li>
                    </ul>
                </div>

                <!-- nosotros -->
                <div>
                    <h2 class="mb-2 text-lg font-semibold text-gray-100 uppercase ">Nosotros</h2>
                    <ul class="text-gray-400  font-medium">
                        <li class="mb-2">
                            <a class="text-sm whitespace-pre-wrap">{{ companiesDates.times_description }}</a>
                        </li>
                    </ul>
                </div>

                <!-- redes sociales -->
                <div>
                    <h2 class="mb-4 text-center text-lg font-semibold text-gray-100 uppercase ">Redes Sociales</h2>
    
                    <div class="flex flex-wrap justify-center items-center mt-4 sm:mt-0">
    
                        <div v-for="social in companiesDates.socialMedia" :key="social.id" class="flex justify-center flex-wrap">
                            <a  v-if="social.pivot.url != '' && social.pivot.url.includes('www')" :href="(social.pivot.url.includes('http') ? '' : 'https://')+social.pivot.url" target="_blank" class="m-2 text-gray-500 hover:text-gray-100">
                                <SocialIcons :icon="social.slug" class="bg-gray-200 p-2 rounded-3xl"/>
                            </a>
                        </div>
                            
                    </div>
                </div> 
            </div>

        </div>

        <hr class="my-6 border border-gray-700 mx-auto lg:my-8" />

        <!-- derechos reservados -->
        <div class="flex items-center justify-center">
            <div class="text-center">
                <p class="text-sm text-gray-400 sm:text-center mb-3">Si queres tener tu pagina entra a <a href="https://tulistadoqr.femaser.com" target="_blank" class="hover:underline">www.tulistadoqr.femaser.com</a>
                </p>

                <p class="text-sm text-gray-400 sm:text-center mb-3">Podes mandarnos un email a tulistadoqr@gmail.com
                </p>
          
                <p class="text-sm text-gray-400 sm:text-center mb-3">o al Whatsapp <a class="flex items-center justify-center gap-1 text-gray-400 font-bold hover:underline" target="_blank" :href="'https://api.whatsapp.com/send/?phone='+urlDeWhatsapp+'&amp;text='+encodeURIComponent('\*Quiero consultar\*: \n')">
                    <SocialIcons icon="whatsapp" class=" fill-gray-400"/>
                    <span class="text-gray-400 font-bold">+ 54 9 2396513953</span>
                </a>
                </p>
            </div>
        </div>
        <!-- derechos reservados -->
        <div class="flex items-center justify-center">
            <div class="text-center">
                <span class="text-sm text-gray-400 sm:text-center ">© {{ dateYear }} - <a href="https://tulistadoqr.femaser.com" target="_blank" class="hover:underline">TuListadoQR</a>. All Rights Reserved.
                </span>
            </div>
        </div>

    </div>

</footer>

</template>

<style scoped>

</style>