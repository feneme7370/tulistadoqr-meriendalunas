<script setup>
    import { ref, onMounted } from 'vue';
    // importar lightbox
    import ImgTumbLightbox from '@/components/sistem/ImgTumbLightbox.vue'
    import ImgLightbox from '@/components/sistem/ImgLightbox.vue'
    
    // helper de moneda y uri
    import { formatCurrency } from '@/helpers/price'
    import { urlBack, urlFront } from '@/helpers/config'

    // carrito
    import { useListStore } from '@/stores/list';
  
    // modal
    import { initFlowbite } from 'flowbite'
    // cargar datos con id
    onMounted(async ()=>{
            initFlowbite();
    })

    const apiList = useListStore()

    const props = defineProps({
        product: {type: Object, required: true},
        addToListButton: {type: Number},
    })

    const imageGallery = ref(urlBack()+props.product.image_hero_uri+props.product.image_hero)
    const setImageGalley = (image) => {
        imageGallery.value = image
    }

    const showModal = ref(false)
</script>

<template>



    <div class="my-2 px-2 py-1 bg-primary-100 h-full">

        <hr class="t_border-hr-card">

        <div class="card__product">
            <ImgTumbLightbox 
                v-if="product.image_hero != ''"
                class="card__product-img"
                :uri="urlBack()+product.image_hero_uri"
                :name="product.image_hero"
                :nameImg="product.category + ' - ' + product.name"
                nameAlbum="offers"
                tumb=true
            />


            <div class="py-1 px-2 flex flex-col justify-between w-full h-full">

            
                <div class="t_card__product-descriptions-prices">
                    <div v-if="product.price_original < product.price_seller || product.price_seller == '' || product.price_seller == '0'">
                        <p class="t_card__product-descriptions-price-green">{{ formatCurrency(product.price_original)}}</p>
                    </div>
                    <div v-else>
                        <span class="mr-2 t_card__product-descriptions-price-green">{{ formatCurrency(product.price_seller)}}</span>
                        <span class="t_card__product-descriptions-price-red">{{ formatCurrency(product.price_original)}}</span>
                    </div>
                </div>
                <div>
                    <p class="card__product-descriptions-name">{{ product.name }}</p>

                    <p class="card__product-descriptions-description">{{ product.description }}</p>
                </div>

                <div class="card__product-descriptions-tags">

                    <span v-for="tag in product.tags" class="card__product-descriptions-tag ">{{ tag.name }}</span>

                </div>

                <div class="flex justify-between items-center">
                    <div v-if="addToListButton">
                        <button class="t_card__product-descriptions-add" @click="apiList.addToList(product)">Agregar</button>
                    </div>

                </div>
            </div>

        </div>

        <hr class="t_border-hr-card">
    </div>


</template>

<style scoped>

    .card__product{
        @apply flex flex-col md:flex-row items-start justify-between gap-1 my-2  text-gray-700 w-full min-h-36;
    }
    .card__product-descriptions-name{
        @apply text-gray-800 text-base font-bold;
    }
    .card__product-descriptions-description{
        @apply mb-1 font-light text-sm line-clamp-2;
    }
    .card__product-descriptions-tags{
        @apply my-1 flex items-center gap-1 overflow-x-auto overflow-hidden;
    }
    .card__product-descriptions-tag{
        @apply block whitespace-nowrap  bg-primary-200 text-primary-800 border-b border-primary-800 text-xs font-medium my-2 me-2 px-2.5 py-0.5 rounded;
    }

    .card__product-img{
        @apply max-w-48 h-48 mx-auto rounded-sm overflow-hidden md:mr-5;
    }
</style>