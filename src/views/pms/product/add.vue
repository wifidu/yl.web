<template> 
<<<<<<< HEAD
  <product-detail :is-edit='false'></product-detail>
=======
  <product-detail :is-edit='true' :edit-id='true'></product-detail>
>>>>>>> 63d93a4f36b2921a5ca4d3a47361b6025fc8bff0
</template>
<script>
  import ProductDetail from './components/ProductDetail'
  export default {
    name: 'addProduct',
    components: { ProductDetail }
  }
</script>
<style>
</style>
