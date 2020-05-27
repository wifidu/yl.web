<template>
    <accident-editor :is-edit='false'></accident-editor>
</template>

<script>
    import AccidentEditor from "./compoments/accidentEditor";
    export default {
        name: "accidentShow",
      components: {AccidentEditor}
    }
</script>

<style scoped>

</style>
