<script setup>

  // importar componentes de vue
  import { ref } from 'vue';
  // importar forma de card
  import CardProduct from '@/components/2-demo1/cards/CardProduct.vue'
  // helper de uri
  import { urlBack, urlFront } from '@/helpers/config'

  const props = defineProps({
      productsDates: { type: Object, required: true },
      levelsDates: { type: Object, required: true },
      categoriesDates: { type: Object, required: true },
      companiesDates: { type: Object, required: true },
  })

  // variables para filtar categorias
  const levelId = ref('')
  const categoryId = ref('')

  const levelIdSelected = (id) => {
    levelId.value = id
    categoryId.value = ''
  }

  // mostrar solo las que pertenencen al level
  const filterCategories = (levelId) => {
    return props.categoriesDates.filter( category => category.level_id === levelId)
  }

  // mostrar solo las que pertenecen a la categoria
  const filterProducts = (categoryId) => {
    return props.productsDates.filter( product => product.category_id === categoryId)
  }

</script>

<template>

  <div>
    <hr class="mx-10 mb-5 t_border-hr">

    <!-- titulo de categoria general -->
    <h2 class="t_level-title">Categorias Generales</h2>

    <!-- listado de niveles -->
    <!-- <div class="flex flex-wrap justify-center items-center gap-3 py-10 bg-primary-200"> -->
    <div class="t_bg-category-menurouter">
      <div v-for="level in levelsDates" :key="level.id" >
        
        <!-- mostrar categorias generales que tengan categorias asignadas -->
        <div v-if="categoriesDates.some(category => category.level_id === level.id)" >

          <!-- imagen y nombre de la categoria general, con evento click para marcar id -->
          <div @click="levelIdSelected(level.id)" 
            class="my-2 bg-center bg-no-repeat px-1 mx-5 relative animate__animated animate__backInUp animate__faster flex items-center justify-center flex-col"
            :class="level.image_hero ? 'w-28 h-28' : 'w-28 h-5'"
          >
            
            <img 
              v-if="level.image_hero"
              loading="lazy"
              class="t_bg-category-menurouter-img"
              :src="urlBack()+level.image_hero_uri+level.image_hero" 
              alt="imagen portada"
            >
            
            <div class="absolute -bottom-5 mx-auto min-w-28 px-1 max-w-screen-xl text-center flex items-center justify-center flex-col cursor-pointer">
              <a class="bg-primary-100 rounded-lg block w-full border-2 border-primary-200">
                <h1 class="my-2 text-base sm:text-xl line-clamp-2 px-1 font-extrabold text-gray-800 ">{{ level.name }}</h1>
              </a>
            </div>
    
          </div>

        </div>
  
      </div>
    </div>
    <!-- listado de niveles end -->
    
    <!-- listado de categorias segun level -->
    <div v-if="levelId" class="mt-5">
      <!-- titulo -->
      <h2 class="text-center t_category-title">Categorias</h2>

      <!-- listado de categorias -->
      <div class="flex flex-wrap items-center justify-center">
        <!-- recorrer categorias -->
        <!-- <div v-for="category in categoriesDates" :key="category.id"> -->
        <div v-for="category in filterCategories(levelId)" :key="category.id">
          <!-- mostrar solo las que tengan productos asignados -->
          <div v-if="productsDates.some(product => product.category_id === category.id)">

            <!-- imagen y titulo de las categorias correspondientes al nivel seleccionado -->
            <!-- v-if="category.level_id == levelId"  -->
            <div 
              @click="categoryId = category.id"
              class="animate__animated animate__backInUp animate__faster mb-10 bg-center bg-no-repeat  cursor-pointer relative mx-5 flex items-center justify-center flex-col"
              :class="category.image_hero ? 'w-20 h-20' : 'w-20 h-5'"
            >
                <img 
                  v-if="category.image_hero"
                  loading="lazy"
                  class="t_bg-category-menurouter-img"
                  :src="urlBack()+category.image_hero_uri+category.image_hero" 
                  alt="imagen category"
                >

                <div class="absolute -bottom-5 mx-auto min-w-20 text-center flex items-center justify-center flex-col">
                    <a class="bg-primary-100 rounded-lg text-center mx-auto w-full line-clamp-2 px-1 border-2 border-primary-200 py-1 text-sm text-gray-800">
                      {{ category.name }}
                    </a>
                </div>

            </div>

          </div>
        </div>

      </div>
    </div>
    <!-- listado de categorias segun level end -->

    <!-- listados de productos de cada categoria -->
    <div v-if="categoryId" class="mt-5">

      <!-- recorrer productos -->
      <!-- <div v-for="product in productsDates" :key="product.id"> -->
  
        <!-- mostrar productos correspondientes a la categoria -->
        <!-- <div v-if="product.category_id === categoryId"> -->
    
          <CardProduct 
            v-for="product in filterProducts(categoryId)" 
            :key="product.id"
            
            class=" max-w-lg mx-auto lg:rounded-md animate__animated animate__backInUp animate__faster"
            :product="product"
            :addToListButton="companiesDates.membership.list_product"
          />
    
        <!-- </div> -->
      <!-- </div> -->
    </div>

  </div>
</template>

<style scoped>

</style>