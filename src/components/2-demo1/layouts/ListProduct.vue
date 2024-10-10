<script setup>
    // importar componentes de vue
    import { computed, ref } from 'vue';

    // importar iconos
    import SocialIcons from '@/components/sistem/SocialIcons.vue'

    // helper de precio
    import { formatCurrency } from '@/helpers/price'

    // carrito
    import { useListStore } from '@/stores/list';
    
    const apiList = useListStore()
  
    const props = defineProps({
        companiesDates: {type: Object, required: true},
        urlDeWhatsapp: {type: String, required: true},
        isFixed: {type: Boolean, required: true}
    })

    // calcular monto total a pagar
    const totalAmount = computed(()=>{
        return apiList.ListProduct.reduce((total, product) => 
            total + (product.cantidad * ((product.price_seller > 0 && product.price_seller < product.price_original) ? product.price_seller : product.price_original)), 0
        )
    })

    // variables para enviar mensaje
    const nameClient = ref('')
    const adressClient = ref('')
    const formatClient = ref('')

    // armar listado de productos para el mensaje
    const totalWsp = computed(()=>{
        return apiList.ListProduct.reduce((total, product) => 
            total + (product.cantidad +' - '+product.name+', \n'), ''
        )
    })

</script>

<template>

    <div class="px-2" >

        <!-- boton flotante para listado -->
        <div :class="isFixed ? 'fixed' : ''" class=" top-8 left-5 md:right-auto z-50">
            <button data-modal-target="list-product-modal" data-modal-toggle="list-product-modal" class="bg-primary-700 text-gray-50 font-bold border-2 border-primary-900 rounded-2xl" type="button">
                <SocialIcons icon="cart" class="p-4"/>
            </button>
        </div>

        <!-- modal del carrito -->
        <div id="list-product-modal" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 bg-gray-800 bg-opacity-80 justify-center items-center w-full md:inset-0 p-3 h-full max-h-full">

            <div class="relative m-4 w-full max-w-2xl max-h-full">
                
                <!-- Modal content -->
                <div class="relative bg-white px-4 pt-5 pb-10 rounded-lg shadow ">
                    
                    <!-- vaciar lista y cerrar modal -->
                    <div class="w-full flex justify-between items-center">

                        <button class=" bg-primary-200 text-primary-900 text-xs font-medium my-2 me-2 px-3 py-2 rounded"  @click="apiList.clearList">Vaciar lista</button>

                        <button type="button" class="text-primary-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center " data-modal-hide="list-product-modal">
                            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <span class="sr-only">Close modal</span>
                        </button>

                    </div>

                    <hr class="border-primary-300 mt-1 w-10/12 mx-auto">

                    <!-- listado de productos a comprar -->
                    <div v-for="product in apiList.ListProduct" :key="product.id">
                    
                        <div class="flex items-center justify-between gap-1 my-2">

                            <!-- cantidad de producto y nombres -->
                            <div>
                                <div class="flex items-center gap-2">
                                    <span class="text-gray-700 text-base font-bold">({{ product.cantidad }})</span>
                                    <span class="text-gray-800 text-sm font-bold">{{ product.name }}</span>
                                </div>
                                <div class="flex items-center justify-between gap-1">
                            
                                    <span class="text-gray-700 text-xs font-medium">c/u:{{ formatCurrency((product.price_seller > 0 && product.price_seller < product.price_original) ? product.price_seller : product.price_original)}}</span>

                                </div>
                            </div>
                    
                            <!-- ver precio total del producto y botones de sumar y restar -->
                            <div class="flex items-center gap-1">
                                <button class="block whitespace-nowrap  bg-primary-200 text-primary-900 text-sm font-medium my-2 px-2.5 py-0.5 w-6 h-6 rounded " @click="apiList.lessAmount(product.id)">-</button>
                                <span class="text-gray-700 text-xs font-medium">{{ formatCurrency(product.cantidad * ((product.price_seller > 0 && product.price_seller < product.price_original) ? product.price_seller : product.price_original))}}</span>
                                <button class="block whitespace-nowrap  bg-primary-200 text-primary-900 text-sm font-medium my-2 px-2.5 py-0.5 w-6 h-6 rounded " @click="apiList.moreAmount(product.id)">+</button>
                            </div>
                        </div>

                        <hr class="border-primary-300 mb-1 w-10/12 mx-auto">
                    
                    </div>
                    
                    <!-- precio total de los productos -->
                    <div v-if="totalAmount">
                        <div>
                            <p  class="flex justify-between mt-10 items-center text-gray-800 text-base font-bold">
                                <span>Total a pagar:</span>
                                <span>{{ formatCurrency(totalAmount) }}</span>
                            </p>
                        </div>
                    </div>
                    <p v-else class="font-bold italic text-center my-5">Agregue productos a su pedido</p>

                    <hr class="border-primary-300 mb-1 w-10/12 mx-auto">

                    <!-- datos del cliente a llenar -->
                    <div class="w-full">
                        <p class="italic text-xs text-center font-extralight mt-5">Complete los datos para realizar el pedido</p>

                        <!-- nombre -->
                        <div>
                            <label for="name_client" class="block mt-2 text-sm font-medium text-gray-900 ">Nombre</label>
                            <input v-model="nameClient" type="text" id="name_client" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg active:outline-none focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5" placeholder="Su nombre" />
                        </div>

                        <!-- direccion -->
                        <div>
                            <label for="adress_client" class="block mt-2 text-sm font-medium text-gray-900 ">Direccion</label>
                            <input v-model="adressClient" type="text" id="adress_client" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg active:outline-none focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5" placeholder="Su direccion" />
                        </div>

                        <!-- forma de pedir -->
                        <div>
                            <label for="format_client" class="block mt-2 text-sm font-medium text-gray-900 ">Forma del pedido</label>
                            <select v-model="formatClient" id="format_client" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg active:outline-none focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5">
                                <option selected value="Envio a domicilio">Envio a domicilio</option>
                                <option value="Paso a retirar">Paso a retirar</option>
                                <!-- <option value="Pedido desde la mesa">Pedido desde la mesa</option> -->
                            </select>
                        </div>
                    </div>

                    <!-- boton de enviar -->
                    <div>
                        <a :href="'https://api.whatsapp.com/send/?phone='+urlDeWhatsapp+'&amp;text='+encodeURIComponent('\*Quiero pedir:\* \n'+totalWsp+'\n\*Nombre:\* '+nameClient+'\n\*Direccion:\* '+adressClient+'\n\*Metodo:\* '+formatClient+'.')" target="_blank"
                            class="block w-full px-2 py-3 mt-3 text-base font-semibold text-center text-white bg-gray-900 rounded shadow-sm hover:bg-primary-600">Pedir por Whatsapp</a>
                    </div>

                </div>
                <!-- Modal content end -->

            </div>

        </div>
        <!-- modal del carrito end -->

    </div>
    
</template>

<style scoped>

</style>