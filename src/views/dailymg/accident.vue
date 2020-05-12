<template>
    <div>
      <el-container>
        <el-aside width="100px">
          <el-tree :data="menu"></el-tree>
          <el-button icon="el-icon-plus" type="mini" style="width: 100px"></el-button>
        </el-aside>
        <el-main>
          <el-card class="filter-container" shadow="never">
            <div style="margin-top: 15px">
              <el-form :inline="true" size="small">
                <el-select v-model="valueName" size="small" style="width: 125px">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
                <el-date-picker
                  size="small"
                  v-model="time"
                  type="datetime"
                  align="right"
                  placeholder="请选择来访时间">
                </el-date-picker>
                <el-button type="info" icon="el-icon-search" size="small"></el-button>
              </el-form>
            </div>
          </el-card>
          <el-table :data="tableData"
                    style="margin-top: 15px;width:100%"
                    v-loading="listLoading"
                    border>
            <el-table-column label="会员姓名" prop="visitingName" align="center"></el-table-column>
            <el-table-column label="床位" prop="visitingName" align="center"></el-table-column>
            <el-table-column label="事故等级" prop="tel" align="center"></el-table-column>
            <el-table-column label="发生时间" prop="visitingTime" align="center"></el-table-column>
            <el-table-column label="值班人员" prop="name" align="center"></el-table-column>
            <el-table-column label="负责人" prop="beds" align="center"></el-table-column>
            <el-table-column label="事故描述" prop="because" align="center"></el-table-column>
            <el-table-column label="操作" width="250" align="center">
              <template slot-scope="scope">
                <p>
                  <el-button size="mini" @click="handleShow(scope.$index, scope.row)">详情</el-button>
                </p>
              </template>
            </el-table-column>
          </el-table>
          <div class="batch-operate-container">
            <el-button style="margin-left: 20px" size="small" type="success" @click="handleRegistation">事故登记</el-button>
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
        </el-main>
      </el-container>
    </div>
</template>

<script>
    export default {
        name: "accidenct",
      data (){
          return {
            menu: [{
              label: '全部',
              children: [{
                label: '残疾'
              }]
            }],
            valueName: null,
            options: [{
              value: 0, label: '发生时间'
            }, {
              value: 1, label: '会员姓名'
            }, {
              value: 2, label: '床位'
            }],
            time: null,
            listLoading: false,
            tableData: [{
              visitingName: 0,
              visitingTime: 0,
              tel: 0,
              name: 0,
              beds: 0,
              because: 0
            }],
            total: null,
            currentPage: null
          }
      },
      methods: {
        handleSizeChange(val) {
          console.log('???');
        },
        handleCurrentChange(val) {
          console.log('!!');
        },
        handleShow(index, row) {
          this.$router.push({path: '/dailymg/accidentShow', query:{id:row.id}});
        },
        handleRegistation() {
          this.$router.push({path: '/dailymg/accidentEdit'});
        }
      }
    }
</script>

<style scoped>
  .el-aside {
    background-color: #D3DCE6;
    text-align: center;
    height: 100%;
  }
  .el-tree {
    font-weight: bold;
  }
</style>
