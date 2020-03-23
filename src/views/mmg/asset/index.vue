<template> 
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>搜索</span>
        <el-button style="float: right" type="primary" size="small">查询结果</el-button>
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
      <el-button class="btn-add" size="mini" @click="handleAdd()">添加</el-button>
    </el-card>
    <div class="table-container">
      <el-table :data="tableData"
                style="width: 100%"
                @selection-change="handleSelectionChange"
                border>
        <el-table-column type="selection" width="60" align="center"></el-table-column>
        <el-table-column label="序号" width="100" align="center">
          <template slot-scope="scope">{{scope.row.number}}</template>
        </el-table-column>
        <el-table-column label="名称" width="150" align="center">
          <template slot-scope="scope">
            <p>{{scope.row.name}}</p>
          </template>
        </el-table-column>
        <el-table-column label="资产编号" width="120" align="center">
          <template slot-scope="scope">
            <p>{{scope.row.id}}</p>
          </template>
        </el-table-column>
        <el-table-column label="分类" width="100" align="center">
          <template slot-scope="scope">{{scope.row.classification}}</template>
        </el-table-column>
        <el-table-column label="品牌" width="100" align="center">
          <template slot-scope="scope">{{scope.row.brand}}</template>
        </el-table-column>
        <el-table-column label="状态" width="100" align="center">
          <template slot-scope="scope">{{scope.row.type}}</template>
        </el-table-column>
        <el-table-column label="安装日期" align="center">
          <template slot-scope="scope">
            <p>{{scope.row.install_date}}</p>
          </template>
        </el-table-column>
        <el-table-column label="保修日期" align="center">
          <template slot-scope="scope">
            <p>{{scope.row.warranty}}</p>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="250" align="center">
          <template slot-scope="scope">
            <p>
              <el-button
                size="mini"
                @click="handleShow(scope.$index, scope.row)">查看
              </el-button>
              <el-button
                size="mini"
                @click="handleUpdate(scope.$index, scope.row)">编辑
              </el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除
              </el-button>
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
        layout="total, sizes,prev, pager, next,jumper"
        :page-sizes="[5,10,15]"
        :current-page.sync="currentPage"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  export default {
    name: "fixedAsset",
    data() {
      return {
        currentPage: 5,
        total: null,
        multipleSelection: null,
        tableData: [{
          number: null,
          name: null,
          id: null,
          classification: null,
          brand: null,
          type: null,
          install_date: null,
          warranty: null
        }]
      }
    },
    methods: {
      handleAdd() {
        this.$router.push({path:'/mmg/addAsset'});
      },
      handleShow() {
        this.$router.push({path:'/mmg/viewAsset'});
      },
      handleUpdate() {
        this.$router.push({path:'/mmg/updateAsset'});
      },
      handleDelete(index, row){
        this.$confirm('是否要进行删除操作?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let ids = [];
          ids.push(row.id);
          this.updateDeleteStatus(1,ids);
        });
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
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      updateDeleteStatus(deleteStatus, ids) {
        // let params = new URLSearchParams();
        // params.append('ids', ids);
        // params.append('deleteStatus', deleteStatus);
        // updateDeleteStatus(params).then(response => {
        //   this.$message({
        //     message: '删除成功',
        //     type: 'success',
        //     duration: 1000
        //   });
        // });
        // this.getList();
      }
    }
  }
</script>
<style></style>
