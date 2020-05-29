<template> 
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>搜索</span>
        <el-button style="float: right" size="small" @click="handleSearch()">查询结果</el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
          <el-form-item label="输入搜索：">
            <el-input style="width: 203px" v-model="listQuery.content" placeholder="这里输入需要搜索的名称"></el-input>
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
                v-loading="listLoading"
                border>
        <el-table-column type="selection" width="60" align="center"></el-table-column>
        <el-table-column label="序号" width="100" align="center">
          <template slot-scope="scope">{{scope.row.serial_number}}</template>
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
          <template slot-scope="scope">
            {{scope.row.type === 0?'已损坏':(scope.row.type === 1?'在用':'维修中')}}
          </template>
        </el-table-column>
        <el-table-column label="安装日期" align="center">
          <template slot-scope="scope">
            <p>{{scope.row.install_date | formatDate}}</p>
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
        @size-change="handleSizeChange()"
        @current-change="handleCurrentChange()"
        layout="total, sizes,prev, pager, next,jumper"
        :page-sizes="[5,10,15]"
        :current-page.sync="pageSize"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import {searchList, asset_data_batchdel} from '@/api/mmg_asset'
  import {formatDate} from '@/utils/date.js';

  const defaultListQuery = {
    search_index: null,
    content: null
  };
  export default {
    name: "fixedAsset",
    data() {
      return {
        currentPage: 5,
        total: null,
        multipleSelection: [],
        tableData: null,
        listLoading: true,
        page: 1,
        pageSize: 15,
        listQuery: Object.assign({}, defaultListQuery),
      }
    },
    created() {
      this.getTableData();
    },
    filters:{
      formatDate(time) {
        let date = new Date(time);
        return formatDate(date, "yyyy-MM-dd hh:mm");
      }
    },
    methods: {
      getTableData() {
        this.listLoading = true;
        searchList(this.listQuery).then(response => {
          this.listLoading = false;
          this.tableData = response.data;
          this.total = response.data.length;
        })
      },
      handleAdd() {
        this.$router.push({path:'/mmg/addAsset'});
      },
      handleShow(index, row) {
        this.$router.push({path:'/mmg/viewAsset', query:{id:row.id}});
      },
      handleUpdate(index, row) {
        this.$router.push({path:'/mmg/updateAsset', query:{id:row.id}});
      },
      handleDelete(index, row){
        this.$confirm('是否要进行删除操作?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let ids = [];
          ids.push(row.id);
          this.updataDelete(ids);
        });
      },
      handleBatchOperate() {
        if(this.multipleSelection === null || this.multipleSelection.length < 1){
          this.$message({
            message: '请选择要删除的物品',
            type: 'warning',
            duration: 1000
          });
          return ;
        }
        this.$confirm('是否删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let ids = [];
          for(let i = 0;i < this.multipleSelection.length;++i){
            ids.push(this.multipleSelection[i].id);
          }
          this.updataDelete(ids)
        })
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleSizeChange(val) {
        this.page = 1;
        this.pageSize = val;
        this.getTableData();
      },
      handleCurrentChange(val) {
        this.page = val;
        this.getTableData();
      },
      handleSearch() {
        this.listQuery.search_index = "name";
        this.listQuery.pageNum = 1;
        this.getTableData();
      },
      updataDelete(ids){
        asset_data_batchdel(ids).then(response => {
          this.$message ({
            message: '删除成功',
            center: true,
            type: 'success'
          });
          this.getTableData();
        });
      },
    }
  }
</script>
<style></style>
