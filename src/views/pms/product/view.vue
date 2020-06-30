<template> 
  <product-detail :is-edit='false' :edit-id="false"></product-detail>
</template>
<script>
  import ProductDetail from './components/ProductDetail'
  export default {
    name: 'ProductView',
    components: { ProductDetail }
  }
</script>
<style>
</style>
