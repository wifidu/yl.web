<template> 
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <!--        <i class="el-icon-search"></i>这里添加icon-->
        <span>退住登记</span>
        <el-button
          style="float:right"
          type="primary"
          @click="handleSearchList()"
          size="small">
          保存
        </el-button>
        <el-button
          style="float:right;margin-right: 15px"
          @click="handleResetSearch()"
          size="small">
          返回
        </el-button>
      </div>


      <div style="margin-top: 15px">
        <div style="background: #afb1b3; width: 100%; height: 32px; padding: 5px; margin: 10px; border-radius: 5px">
          <span style="font-size: small;width: 500px;padding: 10px;border-radius: 5px">退住信息</span>
        </div>
        <el-form :inline="true" :model="listQuery" size="small" label-width="180px" style="margin-top: 30px">
          <el-form-item label="会员姓名：">
            <el-input v-model="listQuery.id" class="input-width" placeholder="姓名" style="width:300px"></el-input>
          </el-form-item>
          <el-form-item label="身份证号：">
            <el-input v-model="listQuery.id" class="input-width" placeholder="" style="width:300px"></el-input>
            <!--            <el-select v-model="listQuery.status" placeholder="正在使用" clearable class="input-width">-->
            <!--              <el-option v-for="item in statusOptions"-->
            <!--                         :key="item.value"-->
            <!--                         :label="item.label"-->
            <!--                         :value="item.value">-->
            <!--              </el-option>-->
            <!--            </el-select>-->
          </el-form-item>
          <el-form-item label="退住时间：">
            <el-date-picker
              class="input-width"
              v-model="listQuery.handleTime"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="选择退住日期" style="width:300px">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="床位：">
            <el-input v-model="listQuery.id" class="input-width" placeholder="" style="width:300px"></el-input>
          </el-form-item>
          <el-form-item label="退住原因：">
            <el-input v-model="listQuery.id" class="input-width" placeholder="" style="width:300px"></el-input>
          </el-form-item>
          <el-form-item label="经办人：">
            <el-input v-model="listQuery.id" class="input-width" placeholder="" style="width:300px"></el-input>
          </el-form-item>
          <el-form-item label="经办时间：">
            <el-date-picker
              class="input-width"
              v-model="listQuery.handleTime"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="选择时间" style="width:300px">
            </el-date-picker>
          </el-form-item>
        </el-form>
        <div style="background: #afb1b3; width: 100%; height: 32px; padding: 5px; margin: 10px; border-radius: 5px">
          <span style="font-size: small;width: 500px;padding: 10px; border-radius: 5px">结算信息</span>
        </div>
        <el-form :inline="true" :model="listQuery" size="small" label-width="180px">
          <el-form-item label="账户余额：" style="margin-top: 30px">
            <el-input v-model="listQuery.id" class="input-width" placeholder="" style="width:300px"></el-input>
          </el-form-item>
        </el-form>
      </div>

      <div class="table-container" align="center">
        <el-table ref="returnApplyTable"
                  :data="list"
                  style="width: 70%;"
                  @selection-change="handleSelectionChange"
                  v-loading="listLoading" border>
          <el-table-column label="费用项目" width="200" align="center">
            <template slot-scope="scope">{{scope.row.id}}</template>
          </el-table-column>
          <el-table-column label="余额" width="200" align="center">
            <template slot-scope="scope">0</template>
          </el-table-column>
          <el-table-column label="应退金额" width="200" align="center">
            <template slot-scope="scope">￥{{scope.row | formatReturnAmount}}</template>
          </el-table-column>
          <el-table-column label="实退金额" width="200" align="center">
            <template slot-scope="scope">￥{{scope.row | formatReturnAmount}}</template>
          </el-table-column>
        </el-table>
      </div>

      <div class="pagination-container">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          layout="total, sizes,prev, pager, next,jumper"
          :current-page.sync="listQuery.pageNum"
          :page-size="listQuery.pageSize"
          :page-sizes="[5,10,15]"
          :total="total">
        </el-pagination>
      </div>

    </el-card>




  </div>
</template>
<script>
  import {formatDate} from '@/utils/date';
  import {fetchList,deleteApply} from '@/api/returnApply';
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
    id: null,
    receiverKeyword: null,
    status: null,
    createTime: null,
    handleMan: null,
    handleTime: null
  };
  const  sex=[{
    label:'男',
    value:0
  },
    {
      label:'女',
      value:1
    }]
  const defaultStatusOptions=[
    {
      label: '正在使用',
      value: 0
    },
    {
      label: '空闲中',
      value: 1
    },
    // {
    //   label: '已完成',
    //   value: 2
    // },
    // {
    //   label: '已拒绝',
    //   value: 3
    // }
  ];
  export default {
    name:'returnApplyList',
    data() {
      return {
        listQuery:Object.assign({},defaultListQuery),
        statusOptions: Object.assign({},defaultStatusOptions),
        list:null,
        total:null,
        listLoading:false,
        multipleSelection:[],
        operateType:1,
        operateOptions: [
          {
            label: "批量删除",
            value: 1
          }
        ],
      }
    },
    created(){
      this.getList();
    },
    filters:{
      formatTime(time) {
        if(time==null||time===''){
          return 'N/A';
        }
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
      },
      formatStatus(status){
        for(let i=0;i<defaultStatusOptions.length;i++){
          if(status===defaultStatusOptions[i].value){
            return defaultStatusOptions[i].label;
          }
        }
      },
      formatReturnAmount(row){
        return row.productRealPrice*row.productCount;
      }
    },
    methods:{
      handleSelectionChange(val){
        this.multipleSelection = val;
      },
      handleResetSearch() {
        this.listQuery = Object.assign({}, defaultListQuery);
      },
      handleSearchList() {
        this.listQuery.pageNum = 1;
        this.getList();
      },
      handleViewDetail(index,row){
        this.$router.push({path:'/oms/returnApplyDetail',query:{id:row.id}})
      },
      handleBatchOperate(){
        if(this.multipleSelection==null||this.multipleSelection.length<1){
          this.$message({
            message: '请选择要操作的申请',
            type: 'warning',
            duration: 1000
          });
          return;
        }
        if(this.operateType===1){
          //批量删除
          this.$confirm('是否要进行删除操作?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let params = new URLSearchParams();
            let ids=[];
            for(let i=0;i<this.multipleSelection.length;i++){
              ids.push(this.multipleSelection[i].id);
            }
            params.append("ids",ids);
            deleteApply(params).then(response=>{
              this.getList();
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            });
          })
        }
      },
      handleSizeChange(val){
        this.listQuery.pageNum = 1;
        this.listQuery.pageSize = val;
        this.getList();
      },
      handleCurrentChange(val){
        this.listQuery.pageNum = val;
        this.getList();
      },
      getList(){
        this.listLoading=true;
        fetchList(this.listQuery).then(response => {
          this.listLoading = false;
          this.list = response.data.list;
          this.total = response.data.total;
        });
      }
    }
  }
</script>
<style scoped>
  .input-width {
    width: 203px;
  }
</style>






<!--<template> -->
<!--  <el-card class="form-container" shadow="never">-->
<!--    <el-form :model="orderSetting"-->
<!--             ref="orderSettingForm"-->
<!--             :rules="rules"-->
<!--             label-width="150px">-->
<!--      <el-form-item label="入住时间：" prop="flashOrderOvertime">-->
<!--        <el-input v-model="orderSetting.flashOrderOvertime" class="input-width">-->
<!--          <template slot="append">年</template>-->
<!--        </el-input>-->
<!--        <el-input v-model="orderSetting.flashOrderOvertime" class="input-width">-->
<!--          <template slot="append">月</template>-->
<!--        </el-input>-->
<!--        <el-input v-model="orderSetting.flashOrderOvertime" class="input-width">-->
<!--          <template slot="append">日</template>-->
<!--        </el-input>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="持续时间：" prop="confirmOvertime">-->
<!--        <el-input v-model="orderSetting.confirmOvertime" class="input-width">-->
<!--          <template slot="append">年</template>-->
<!--        </el-input>-->
<!--        <el-input v-model="orderSetting.flashOrderOvertime" class="input-width">-->
<!--          <template slot="append">月</template>-->
<!--        </el-input>-->
<!--        <el-input v-model="orderSetting.flashOrderOvertime" class="input-width">-->
<!--          <template slot="append">日</template>-->
<!--        </el-input>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="床位：" prop="normalOrderOvertime">-->
<!--        <el-input v-model="orderSetting.normalOrderOvertime" class="input-width">-->
<!--          <template slot="append">号</template>-->
<!--        </el-input>-->
<!--      </el-form-item>-->

<!--      <el-form-item>-->
<!--        <el-button-->
<!--          @click="confirm('orderSettingForm')"-->
<!--          type="primary">提交</el-button>-->
<!--      </el-form-item>-->
<!--    </el-form>-->
<!--  </el-card>-->
<!--</template>-->
<!--<script>-->
<!--  import {getOrderSetting,updateOrderSetting} from '@/api/orderSetting';-->
<!--  const defaultOrderSetting = {-->
<!--    id: null,-->
<!--    flashOrderOvertime: 0,-->
<!--    normalOrderOvertime: 0,-->
<!--    confirmOvertime: 0,-->
<!--    finishOvertime: 0,-->
<!--    commentOvertime: 0-->
<!--  };-->
<!--  const checkTime = (rule, value, callback) => {-->
<!--    if (!value) {-->
<!--      return callback(new Error('时间不能为空'));-->
<!--    }-->
<!--    console.log("checkTime",value);-->
<!--    let intValue = parseInt(value);-->
<!--    if (!Number.isInteger(intValue)) {-->
<!--      return callback(new Error('请输入数字值'));-->
<!--    }-->
<!--    callback();-->
<!--  };-->
<!--  export default {-->
<!--    name: 'orderSetting',-->
<!--    data() {-->
<!--      return {-->
<!--        orderSetting: Object.assign({}, defaultOrderSetting),-->
<!--        rules: {-->
<!--          flashOrderOvertime:{validator: checkTime, trigger: 'blur' },-->
<!--          normalOrderOvertime:{validator: checkTime, trigger: 'blur' },-->
<!--          confirmOvertime: {validator: checkTime, trigger: 'blur' },-->
<!--          finishOvertime: {validator: checkTime, trigger: 'blur' },-->
<!--          commentOvertime:{validator: checkTime, trigger: 'blur' }-->
<!--        }-->
<!--      }-->
<!--    },-->
<!--    created(){-->
<!--      this.getDetail();-->
<!--    },-->
<!--    methods:{-->
<!--      confirm(formName){-->
<!--        this.$refs[formName].validate((valid) => {-->
<!--          if (valid) {-->
<!--            this.$confirm('是否要提交修改?', '提示', {-->
<!--              confirmButtonText: '确定',-->
<!--              cancelButtonText: '取消',-->
<!--              type: 'warning'-->
<!--            }).then(() => {-->
<!--              updateOrderSetting(1,this.orderSetting).then(response=>{-->
<!--                this.$message({-->
<!--                  type: 'success',-->
<!--                  message: '提交成功!',-->
<!--                  duration:1000-->
<!--                });-->
<!--              })-->
<!--            });-->
<!--          } else {-->
<!--            this.$message({-->
<!--              message: '提交参数不合法',-->
<!--              type: 'warning'-->
<!--            });-->
<!--            return false;-->
<!--          }-->
<!--        });-->
<!--      },-->
<!--      getDetail(){-->
<!--        getOrderSetting(1).then(response=>{-->
<!--          this.orderSetting=response.data;-->
<!--        })-->
<!--      }-->
<!--    }-->
<!--  }-->
<!--</script>-->
<!--<style scoped>-->
<!--  .input-width {-->
<!--    width: 50%;-->
<!--  }-->

<!--  .note-margin {-->
<!--    margin-left: 15px;-->
<!--  }-->
<!--</style>-->


