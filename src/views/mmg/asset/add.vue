<template>
  <fixed-detail :is-edit='true' :edit-id='true'></fixed-detail>
</template>

<script>
  import FixedDetail from "./components/fixedDetail";
  export default {
    name: 'addAsset',
    components: { FixedDetail }
  }
</script>
<style>
</style>
