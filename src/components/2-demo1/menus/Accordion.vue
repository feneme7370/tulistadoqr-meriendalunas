<script setup>
  // importar componentes de vue
  import { ref } from 'vue'

  // importar forma de card
  import CardProduct from '@/components/2-demo1/cards/CardProduct.vue'

  // lightbox
  import ImgTumbLightbox from '@/components/sistem/ImgTumbLightbox.vue'

  // helper de uri
  import { urlBack, urlFront } from '@/helpers/config'

  const props = defineProps({
      productsDates: { type: Object, required: true },
      levelsDates: { type: Object, required: true },
      categoriesDates: { type: Object, required: true },
      companiesDates: { type: Object, required: true },
  })


  // mostrar solo las que pertenencen al level
  const filterCategories = (levelId) => {
    return props.categoriesDates.filter( category => category.level_id === levelId)
  }

  // mostrar solo las que pertenecen a la categoria
  const filterProducts = (categoryId) => {
    return props.productsDates.filter( product => product.category_id === categoryId)
  }

  // array donde se expanden las categorias
  const activeIndices  = ref([]);
  const toggleAccordion = (index) => {
    
      const indexPosition = activeIndices.value.indexOf(index);
        if (indexPosition === -1) {
          // Si el índice no está en el array, lo añade
          activeIndices.value.push(index);
        } else {
          // Si el índice está en el array, lo quita
          activeIndices.value.splice(indexPosition, 1);
        }
  };
</script>

<template>
  <!-- div para recibir los estilos -->
  <div>

    <!-- recorrer categoria general -->
    <div v-for="level in levelsDates" :key="level.id">

      <!-- evaluar si tiene categorias, sino no se muestra -->
      <div v-if="categoriesDates.some(category => category.level_id === level.id)">

        <hr class="mx-10 mb-5 t_border-hr">
        
        <!-- titulo de la categoria general -->
        <!-- <div class="flex justify-center items-center gap-3 px-3"> -->
          <h2 class="t_level-title">{{ level.name }}</h2>
        <!-- </div> -->
  
        <!-- recorrer las categorias -->
        <div v-for="(category, index) in filterCategories(level.id)" :key="index">

          <!-- filtrar categorias que tenga productos, sino no se muestra -->
          <div v-if="productsDates.some(product => product.category_id === category.id)">

            <!-- solo mostrar la categoria correspondiente a la categoria general -->
            <!-- <div v-if="category.level_id === level.id"> -->
            
              <!-- datos de las categorias -->
              <div :id="'accordion-collapse-heading-' + (index + 1) + '-' + category.level_id" class="t_bg-category transition-all ease-in-out animate__animated animate__flipInX ">

                <button
                  type="button"
                  class="accordion-button w-full flex justify-between items-center"
                  :class="{ 'active': activeIndices.includes(index) }"
                  @click="toggleAccordion(index+'-'+category.level_id)"
                >
    
                  <!-- imagen de la categoria y titulo -->
                  <div class="flex justify-start items-center gap-3">
                    <ImgTumbLightbox 
                        v-if="category.image_hero"
                        class="t_bg-category-img"
                        :uri="urlBack()+category.image_hero_uri"
                        :name="category.image_hero"
                        :nameImg="category.name"
                    />
                    <span class="t_category-title">{{ category.name }}</span>
                  </div>
      
                  <!-- icono arrow down -->
                  <svg
                    data-accordion-icon
                    class="w-3 h-3 mx-3 rotate-180 shrink-0"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5"/>
                  </svg>
    
                </button>
                
              </div>
    
              <!-- datos de los productos -->
              <div
                :id="'accordion-collapse-body-' + (index + 1) + '-' + category.level_id"
                class="accordion-body"
                :aria-labelledby="'accordion-collapse-heading-' + (index + 1) + '-' + category.level_id"
                v-show="activeIndices.includes(index+'-'+category.level_id)"
              >

                <div :class="{ 'border-t-0': index === 0 }">
                  
                  <!-- listados de productos de cada categoria -->
                  <!-- <div v-for="product in productsDates" :key="product.id">
                      <div v-if="product.category_id === category.id"> -->
    
                        <CardProduct 
                          v-for="product in filterProducts(category.id)" 
                          :key="product.id"
                          
                          class="animate__animated animate__fadeInLeftBig animate__faster"
                          :product="product"
                          :addToListButton="companiesDates.membership.list_product"
                        />
    
                  <!-- </div> -->
                
                </div>
              
              </div>


            <!-- </div> -->

          </div>
        </div>
        <!-- recorrer las categorias end -->
        
      </div>

    </div>
    
  </div>

</template>

<style scoped>

</style>