<script setup>
    // recibir datos desde home
    const props = defineProps({
        uri: {type: String, required: true},
        name: {type: String, required: true},
        nameAlbum: {type: String},
        nameImg: {type: String},
        tumb: {type: String},
    })

    // config de lightbox
    lightbox.option({
        'alwaysShowNavOnTouchDevices': true,
        'showImageNumberLabel': true,
        'imageFadeDuration': 10,
        'resizeDuration': 10,
        'positionFromTop':50,
        'fadeDuration': 10,
        'disableScrolling': true,
        'wrapAround': true,
        'albumLabel': "Imagen %1 de %2",
    })

</script>

<template>

    <!-- enlace para ampliar imagen -->
    <a 
        :href="uri + name" 
        :data-lightbox="nameAlbum ? nameAlbum : name"
        :data-title="nameImg ? nameImg : name"
    >
        <img 
            loading="lazy"
            class="w-full h-full object-cover object-center"
            :src="tumb ? uri + name : uri + 'tumb_' + name" 
            alt="imagen"
        >
    </a>
</template>

<style scoped>

</style>