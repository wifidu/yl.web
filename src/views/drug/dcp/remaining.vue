<template>
    <drug-number :remaining="true"></drug-number>
</template>

<script>
    import DrugNumber from "./components/drugNumber";
    export default {
        name: "remaining",
      components: {DrugNumber}
    }
</script>

<style scoped>

</style>
