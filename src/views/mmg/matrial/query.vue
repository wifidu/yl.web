<template> 
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <el-button
          style="float: right"
          @click="handleAdd()"
          type="primary"
          size="small">
          新增物资
        </el-button>
        <el-button
          style="float: right;margin-right: 15px"
          @click="handleOut"
          type="primary"
          size="small">
          出库
        </el-button>
        <el-button
          style="float: right;margin-right: 15px;margin-block-end: 15px"
          @click="handlePut"
          type="primary"
          size="small">
          入库
        </el-button>
      </div>
    </el-card>
    <div class="table-container">
      <el-table :data="tableData"
                style="width: 100%"
                border>
        <el-table-column label="物资名称" align="center">
          <template slot-scope="scope">{{scope.row.name}}</template>
        </el-table-column>
        <el-table-column label="品牌" width="150" align="center">
          <template slot-scope="scope">
            <p>{{scope.row.brand}}</p>
          </template>
        </el-table-column>
        <el-table-column label="型号" width="150" align="center">
          <template slot-scope="scope">
            <p>{{scope.row.model}}</p>
          </template>
        </el-table-column>
        <el-table-column label="单位" width="120" align="center">
          <template slot-scope="scope">
            <p>{{scope.row.unit}}</p>
          </template>
        </el-table-column>
        <el-table-column label="数量" align="center">
          <template slot-scope="scope">{{scope.row.number}}</template>
        </el-table-column>
<!--        <el-table-column label="仓库" width="100" align="center">-->
<!--          <template slot-scope="scope">{{scope.row.mate.warehouse_name}}</template>-->
<!--        </el-table-column>-->
<!--        <el-table-column label="" width="100" align="center"></el-table-column>-->
<!--        <el-table-column label="类别" align="center">-->
<!--          <template slot-scope="scope">-->
<!--            <p>{{scope.row.mate.classification}}</p>-->
<!--          </template>-->
<!--        </el-table-column>-->
<!--        <el-table-column label="单号" align="center">-->
<!--          <template slot-scope="scope">-->
<!--            <p>{{scope.row.odd_number}}</p>-->
<!--          </template>-->
<!--        </el-table-column>-->
        <el-table-column label="操作" width="250" align="center">
          <template slot-scope="scope">
            <p>
              <el-button
                size="mini"
                @click="handleShow(scope.$index, scope.row)">详情
              </el-button>
              <el-button
                size="mini"
                @click="handleUpdate(scope.$index, scope.row)">编辑
              </el-button>
            </p>
            <p>
              <el-button
                size="mini"
                type="info">预警设置
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
    <div class="pagination-container" style="float: end;margin-block-end: 30px">
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
  import {getList, material_del} from '@/api/mmg_material'
  import {formatDate} from '@/utils/date.js';

  export default {
    name: "queryAsset",
    data() {
      return {
        currentPage: 5,
        total: null,
        listLoading: true,
        tableData: null,
        page: 1,
        pageSize: 15,
      }
    },
    created() {
      this.getTable();
    },
    filters:{
      formatDate(time) {
        let date = new Date(time);
        return formatDate(date, "yyyy-MM-dd hh:mm");
      }
    },
    methods: {
      getTable(){
        this.listLoading = true;
        getList({page: 1, pageSize: 15}).then(response => {
          this.tableData = response.data.data;
          this.total = response.data.total;
          this.current_page = response.data.current_page;
        })
      },
      handleAdd() {
        this.$router.push({path:'/mmg/addMaterial'});
      },
      handleDelete(index, row){
        this.$confirm('是否要进行删除操作?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.updateDeleteStatus(row.id);
        });
      },
      handlePut(){
        this.$router.push({path:'/mmg/putAsset'})
      },
      handleOut(){
        this.$router.push({path:'/mmg/outAsset'})
      },
      handleUpdate(index,row){
        this.$router.push({path:'/mmg/updateMaterial',query:{id:row.id}});
      },
      handleShow(index,row){
        this.$router.push({path:'/mmg/viewMaterial',query:{id:row.id}});
      },
      updateDeleteStatus(ids) {
        material_del(ids).then(response => {
          this.$message({
            message: '删除成功',
            type: 'success',
            duration: 1000
          })
        })
        this.getTable();
      }
    }
  }
</script>
<style></style>
