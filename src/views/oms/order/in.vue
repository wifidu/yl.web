<template>
  <div style="margin-top: 50px;justify-content: center" >
    <el-form :model="value"
             ref="productRelationForm"
             label-width="120px"
             style="width: 680px"
             size="small">
      <el-button
        type="primary" size="medium" @click="handleViewOrder()">恭喜你，入住成功！</el-button>
    </el-form>
  </div>

</template>

<script>
    export default {
        name: "in",
        methods: {
          handleViewOrder() {
          this.$router.push({path: '/oms/order', })
          }
        }
    }

</script>

<style scoped>

</style>
