<template>
  <fixed-detail :is-edit='true' :edit-id="false"></fixed-detail>
</template>

<script>
  import FixedDetail from "./components/fixedDetail";
  export default {
    name: 'updateAsset',
    components: { FixedDetail }
  }
</script>
<style>
</style>
