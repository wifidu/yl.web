<template>
  <add-medicine :is-edit="false"></add-medicine>
</template>

<script>
    import AddMedicine from "./components/addMedicine";
    export default {
        name: "showmedicine",
      components: {AddMedicine}
    }
</script>

<style scoped>

</style>
