<script setup>
    // importar componentes de vue
    import { computed, ref, onMounted } from 'vue';

    // importar lightbox
    import ImgTumbLightbox from '@/components/sistem/ImgTumbLightbox.vue'
    import ImgLightbox from '@/components/sistem/ImgLightbox.vue'

    import { useRouter, useRoute } from 'vue-router';
    const router = useRouter()
    const route = useRoute()
    
    // helper de moneda y uri
    import { formatCurrency } from '@/helpers/price'
    import { urlBack, urlFront } from '@/helpers/config'

    // modal
    import { initFlowbite } from 'flowbite'
    // cargar datos con id
    onMounted(async ()=>{
            initFlowbite();
    })

    // importar api de datos
    import { useProductsStore } from '@/stores/products'
    const apiProducts = useProductsStore()
    // carrito
    import { useListStore } from '@/stores/list';
    const apiList = useListStore()
    import ListProduct from '@/components/2-demo1/layouts/ListProduct.vue';

    const props = defineProps({
        product: {type: Object, required: true},
        addToListButton: {type: Number},
    })

    const imageGallery = ref(urlBack()+props.product.image_hero_uri+props.product.image_hero)
    const setImageGalley = (image) => {
        imageGallery.value = image
    }

</script>

<template>

    <!-- Modal content -->
    <div class="relative bg-white rounded-lg shadow dark:bg-gray-700 max-w-3xl">
        <!-- Modal header -->
        <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                {{ product.name }}
            </h3>
            <button type="button" @click="router.go(-1)" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" :data-modal-hide="'default-modal'+product.id">
                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                <span class="sr-only">Close modal</span>
            </button>
        </div>
        <!-- Modal body -->
        <div class="p-1 md:p-5 space-y-1">

            <div class="flex justify-between items-center">

                <ListProduct 
                class="max-w-5xl"
                :companiesDates="apiProducts.companiesDates"
                :urlDeWhatsapp="urlDeWhatsapp"
                :class="apiProducts.companiesDates.list_product ? 'block' : 'hidden'"
                :isFixed="false"
                />

                <div class="px-4 card__product-descriptions-tags">
                    <span v-for="tag in product.tags" class="card__product-descriptions-tag">{{ tag.name }}</span>
                </div>
            </div>

            <div class="px-4 t_card__product-descriptions-prices">
                <div v-if="product.price_original < product.price_seller || product.price_seller == '' || product.price_seller == '0'">
                <p class="t_card__product-descriptions-price-green">{{ formatCurrency(product.price_original)}}</p>
                </div>
            <div v-else>
                <span class="mr-2 t_card__product-descriptions-price-green">{{ formatCurrency(product.price_seller)}}</span>
                <span class="t_card__product-descriptions-price-red">{{ formatCurrency(product.price_original)}}</span>
            </div>
            <div v-if="addToListButton">
                <button class="t_card__product-descriptions-add" @click="apiList.addToList(product)">Agregar</button>
            </div>
            </div>      

        <hr class="border-primary-300 my-2 pb-3 w-10/12 mx-auto">
        
        <div class="grid gap-4">
            <div class="rounded-lg overflow-hidden">
                <ImgLightbox 
                    v-if="product.image_hero != ''"
                    class="h-auto max-w-full rounded-lg"
                    :uri="imageGallery"
                    :name="''"
                    :nameImg="product.category + ' - ' + product.name"
                    :nameAlbum="product.id"
                />
            </div>

            <div class="grid grid-cols-6 gap-4 mb-2">
                <div>
                    <img class="h-full max-w-full rounded-lg object-cover" @click="setImageGalley(urlBack()+product.image_hero_uri+product.image_hero)" :src="urlBack()+product.image_hero_uri+product.image_hero" alt="">
                    
                    <ImgLightbox 
                        v-if="product.image_hero != ''"
                        class="h-auto max-w-full rounded-lg hidden"
                        :uri="urlBack()+product.image_hero_uri+product.image_hero"
                        :name="''"
                        :nameImg="product.category + ' - ' + product.name"
                        :nameAlbum="product.id"
                    />
                </div>

                <div v-for="picture in product.pictures">
                    <img class="h-full max-w-full rounded-lg object-cover" @click="setImageGalley(urlBack()+picture.route+picture.name)" :src="urlBack()+picture.route+picture.name" alt="">

                    <ImgLightbox 
                        v-if="product.image_hero != ''"
                        class="h-auto max-w-full rounded-lg hidden"
                        :uri="urlBack()+picture.route+picture.name"
                        :name="''"
                        :nameImg="product.category + ' - ' + product.name"
                        :nameAlbum="product.id"
                    />
                </div>
            </div>
        </div>


        
        <hr class="border-primary-300 my-2 w-10/12 mx-auto">

        <h3 class="text-sm font-bold text-gray-900 dark:text-white">
                {{ product.name }}
        </h3>

        <p class="card__product-descriptions-description2 space-y-1">
            <p class="whitespace-pre-wrap">{{ product.description }}</p> 
            <p class="whitespace-pre-wrap">{{ product.description2 }}</p> 
            <p class="whitespace-pre-wrap">{{ product.description3 }}</p>
        </p>

        </div>

        <!-- Modal footer -->
        <div class="flex items-center justify-end p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
            <!-- <button :data-modal-hide="'default-modal'+product.id" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">I accept</button> -->
            <button @click="router.go(-1)" type="button" class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Atras</button>
        </div>
    </div>


</template>

<style scoped>

/* Asegura que el modal cubra toda la pantalla */
.modal-overlay {
  background-color: rgba(0, 0, 0, 0.8);
}


    .card__product{
        @apply flex justify-center gap-1 my-2 text-gray-700;
    }
    .card__product-descriptions{
        @apply py-1 px-2 flex flex-col justify-between;
    }
    .card__product-descriptions-name{
        @apply text-gray-800 text-sm font-bold;
    }
    .card__product-descriptions-description{
        @apply mb-1 font-light text-sm line-clamp-3;
    }
    .card__product-descriptions-description2{
        @apply mb-1 font-light text-sm;
    }
    .card__product-descriptions-description-without-line{
        @apply mb-1 font-light text-sm;
    }
    .card__product-descriptions-tags{
        @apply my-1 flex items-center gap-1 overflow-x-auto overflow-hidden;
    }
    .card__product-descriptions-tag{
        @apply block whitespace-nowrap  bg-primary-200 text-primary-800 text-xs font-medium my-2 me-2 px-2.5 py-0.5 rounded;
    }

    .card__product-img{
        @apply max-w-32 max-h-32 rounded-sm overflow-hidden;
    }
</style>