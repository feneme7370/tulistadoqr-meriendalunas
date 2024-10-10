import { defineStore } from "pinia";
import { reactive, ref, onMounted, watch } from 'vue';
import { toastrError, toastrSuccess } from "@/helpers/toastr-message";

export const useListStore = defineStore( 'apiList', () => {

    const ListProduct = ref([])
 
    watch(ListProduct, () => {
        guardarLocalStorage()
    }, {
        deep: true
    })

    onMounted(() => {       
        const ListProductStorage = localStorage.getItem('ListProduct')
        if(ListProductStorage){
            ListProduct.value = JSON.parse(ListProductStorage)
        }
    })

    const addToList = (product)=>{
        
        //devuelve la posicion del producto en el ListProduct
        const existProduct = ListProduct.value.findIndex(producto => producto.id === product.id)
        // console.log(existProduct);
        
        //si no existe es -1, al clickear por segunda vez tiene posicion y es 0 o mas
        if(existProduct >= 0){
            // if(ListProduct.value[existProduct].cantidad >= maxListProduct) return
            ListProduct.value[existProduct].cantidad++;
            // console.log(ListProduct.value[existProduct].cantidad);
        }else{
            product.cantidad = 1;
            ListProduct.value.push(product);
        }
        toastrSuccess('Agregado al pedido')
    }

    const lessAmount = (id) => {
        //busca el id en el ListProduct y tomo el producto
        const index = ListProduct.value.findIndex(producto => producto.id == id)
        if(ListProduct.value[index].cantidad <= 1){
            deleteProduct(id)
            return
        }
        ListProduct.value[index].cantidad--
        // guardarLocalStorage()
    }
    const moreAmount = (id) => {
        const index = ListProduct.value.findIndex(producto => producto.id == id)
        // if(ListProduct.value[index].cantidad >= maxListProduct) return
        ListProduct.value[index].cantidad++
        // guardarLocalStorage()
    }

    const deleteProduct = (id) => {
        ListProduct.value = ListProduct.value.filter(producto => producto.id !== id)
        // guardarLocalStorage()
        toastrSuccess('Eliminado del pedido')
    }

    const clearList = () => {
        ListProduct.value = []
        // guardarLocalStorage()
        toastrSuccess('Se vacio el pedido')

    }

    const guardarLocalStorage = () => {
        //convierto ListProduct en string para almacenar
        localStorage.setItem('ListProduct', JSON.stringify(ListProduct.value))
    }
    return {
        ListProduct,
        addToList,
        deleteProduct,
        clearList,
        moreAmount,
        lessAmount,
    }
})