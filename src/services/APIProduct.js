import api from "../lib/axios";

// tomar api de productos, ya tiene la url el termino api
export default {
    getProducts(id){
        return api.get('/products/'+Number(id))
        // return api.get('/list.php?c=list')
    }
}