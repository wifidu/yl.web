<template>
  <fixed-detail :is-edit='false' :edit-id="false"></fixed-detail>
</template>

<script>
  import FixedDetail from "./components/fixedDetail";
  export default {
    name: 'viewAsset',
    components: { FixedDetail }
  }
</script>
<style>
</style>
