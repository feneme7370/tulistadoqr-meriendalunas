<script setup>
    import { ref, onMounted, computed } from 'vue';
    import { initFlowbite } from 'flowbite'  // cargar datos con id

    import { useRouter, useRoute } from 'vue-router';
    const router = useRouter()
    const route = useRoute()
    
    // importar api de datos
    import { useProductsStore } from '@/stores/products'
    const apiProducts = useProductsStore()

    // carrito
    import { useListStore } from '@/stores/list';
    const apiList = useListStore()
    
    import ListProduct from '@/components/2-demo1/layouts/ListProduct.vue';
    import ProductDates from '@/components/2-demo1/cards/ProductDates.vue';

    // cargar productos de la empresa y obtener el del url
    onMounted(async ()=>{
        await apiProducts.loadDates(route.params.idCompany)    
        productObtained.value = await apiProducts.productsDates.filter( product => product.id == route.params.idProduct)
        initFlowbite();
    })

    // poner producto y modificarlo rapidamete con el computed
    const productObtained = ref('')
    const productObtainedComputed = computed( () => {
        productObtained.value = productObtained.value
        return productObtained.value
    })

</script>

<template>
    <!-- pantalla completa -->
    <div class="bg-gray-300 mb-5">

        <!-- contenedor de todos los datos -->
        <div class="max-w-5xl mx-auto relative">

            <!-- portada -->
            <ProductDates v-for="item in productObtainedComputed"
                class="mb-2" 
                :product="item"
                :addToListButton="1"
            />

        </div>

    </div>
</template>

<style scoped>

</style>