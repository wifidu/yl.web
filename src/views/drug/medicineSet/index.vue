<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>搜索</span>
        <el-button
          style="float: right"
          type="primary"
          size="small">
          查询结果
        </el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" size="small" label-width="140px">
          <el-form-item label="输入搜索：">
            <el-input style="width: 203px" placeholder="这里输入关键词"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button
        class="btn-add"
        @click="handleAddDrug()"
        size="mini">
        添加
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table :data="tableData"
                style="width:100%"
                border>
        <el-table-column type="selection" width="60" align="center"></el-table-column>
        <el-table-column label="会员名称" prop="name" align="center" width="150"></el-table-column>
        <el-table-column label="床位号" prop="category" align="center" width="150"></el-table-column>
        <el-table-column label="备注" prop="manufacturer" align="center"></el-table-column>
        <el-table-column label="用药设置（药品名称/用药单位/用药剂量/用法/评论/服药时间）" prop="specification" align="center"></el-table-column>
        <el-table-column label="操作" width="250" align="center">
          <template slot-scope="scope">
            <p>
              <el-button size="mini" @click="handleShowDrug(scope.$index, scope.row)">查看</el-button>
              <el-button size="mini" @click="handleUpdateDrug(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" @click="handleDel" type="danger">删除</el-button>
            </p>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="batch-operate-container">
      <el-button style="margin-left: 20px" size="small" type="danger" @click="handleBatchOperate">批量删除</el-button>
    </div>
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 15]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    name: "medicineSet",
    data(){
      return {
        total: 1,
        currentPage: 5,
        tableData: [{
          name: '阿莫西林',
          category: '甲类',
          manufacturer: 'i do not know',
          specification: 'who care',
          unit: '瓶',
          dosage_form: '片',
        }],
        multipleSelection: []
      }
    },
    methods: {
      handleSizeChange(val) {
        console.log('??');
      },
      handleCurrentChange(val) {
        console.log('!!');
      },
      handleAddDrug() {
        this.$router.push({path:'/drug/addMedicine'});
      },
      handleUpdateDrug(index, row) {
        this.$router.push({path:'/drug/updatemedicine',query:{id:row.id}});
      },
      handleShowDrug(index, row) {
        this.$router.push({path:'/drug/showmedicine',query:{id:row.id}});
      },
      handleDel() {
        this.$confirm('是否删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            message: '删除成功',
            center: true,
            type: 'success'
          })
        })
      },
      handleBatchOperate() {
        // if(this.multipleSelection === null || this.multipleSelection.length < 1){
        //   this.$message({
        //     message: '请选择要删除的物品',
        //     type: 'warning',
        //     duration: 1000
        //   });
        //   return ;
        // }
        this.$confirm('是否删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message ({
            message: '删除成功',
            center: true,
            type: 'success'
          })
        })
      }
    }
  }
</script>

<style scoped>

</style>
