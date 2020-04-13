<template> 
  <div class="app-container" >

    <el-card class="filter-container" shadow="never">
      <div>
        <!--        <i class="el-icon-search"></i>这里添加icon-->
        <span>死亡登记</span>
        <el-button
          style="float:right"
          type="primary"
          @click="handleSaveList()"
          size="small">
          保存
        </el-button>
        <!--        <el-button-->
        <!--          style="float:right;margin-right: 15px"-->
        <!--          @click="handleResetSearch()"-->
        <!--          size="small">-->
        <!--          返回-->
        <!--        </el-button>-->
      </div>


      <el-card style="margin-top: 15px" shadow="never">
        <span style="font-size: small;width: 500px;padding: 10px;border-radius: 5px">用户信息</span>
        <el-form :inline="true" :model="listQuery" size="small" label-width="180px" style="margin-top: 30px">
          <el-form-item label="会员姓名：">
            <el-input v-model="listQuery.member_name" class="input-width" placeholder="必填" style="width:300px"></el-input>
          </el-form-item>
          <el-form-item label="身份证号：">
            <el-input v-model="listQuery.member_ID" class="input-width" placeholder="必填" style="width:300px"></el-input>
          </el-form-item>
          <el-form-item label="死亡时间：">
            <el-input v-model="listQuery.death_time" class="input-width" placeholder="必填" style="width:300px"></el-input>
          </el-form-item>
          <el-form-item label="开具证明时间：">
            <el-input v-model="listQuery.certificate_time" class="input-width" placeholder="必填" style="width:300px"></el-input>
          </el-form-item>
          <el-form-item label="家庭地址：">
            <el-input v-model="listQuery.family_address" class="input-width" placeholder="必填" style="width:300px"></el-input>
          </el-form-item>
          <el-form-item label="联系电话：">
            <el-input v-model="listQuery.contact_number" class="input-width" placeholder="必填" style="width:300px"></el-input>
          </el-form-item>
          <el-form-item label="入住主诊断：">
            <el-input v-model="listQuery['check-in_main_diagnosis']" class="input-width" placeholder="必填" style="width:300px"></el-input>
          </el-form-item>
          <el-form-item label="死亡疾病名称：">
            <el-input v-model="listQuery.death_disease" class="input-width" placeholder="必填" style="width:300px"></el-input>
          </el-form-item>
          <el-form-item label="开具证明医生：">
            <el-input v-model="listQuery.certificate_doctor" class="input-width" placeholder="必填" style="width:300px"></el-input>
          </el-form-item>
        </el-form>
      </el-card>

    </el-card>



    <el-card class="operate-container" shadow="never" >
      <i class="el-icon-tickets"></i>
      <span>死亡登记列表</span>
    </el-card>
    <el-card class="filter-container" shadow="never" style="margin-top: 20px">
      <div>
        <i class="el-icon-search"></i>
        <span>搜索</span>
        <el-button
          style="float:right"
          type="primary"
          @click="handleSearchList()"
          size="small">
          查询搜索
        </el-button>
        <el-button
          style="float:right;margin-right: 15px"
          @click="handleResetSearch()"
          size="small">
          重置列表
        </el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="searchList" size="small" label-width="140px">
          <el-form-item label="会员名称：">
            <el-input v-model="searchList.member_name" class="input-width" placeholder="会员名称"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <div class="table-container" style="width: 100%">
      <el-table ref="orderTable"
                :data="list"
                style="width: 100%;"
                @selection-change="handleSelectionChange"
                v-loading="listLoading" border>
        <el-table-column type="selection" width="60" align="center"></el-table-column>
        <el-table-column label="会员编号" width="100" align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="注册时间" width="180" align="center">
          <template slot-scope="scope">{{scope.row.created_at}}</template>
        </el-table-column>

        <el-table-column label="会员名称" width="180" align="center">
          <template slot-scope="scope">{{scope.row.member_name}}</template>
        </el-table-column>
        <el-table-column label="身份证号" width="" align="center">
          <template slot-scope="scope">{{scope.row.member_ID}}</template>
        </el-table-column>
        <el-table-column label="联系方式" width="" align="center">
          <template slot-scope="scope">{{scope.row.contact_number}}</template>
        </el-table-column>
        <el-table-column label="家庭住址" align="center">
          <template slot-scope="scope">{{scope.row.family_address}}</template>
        </el-table-column>
        <el-table-column label="死亡时间" align="center">
          <template slot-scope="scope">{{scope.row.death_time}}</template>
        </el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <!--进入详情页-->
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleViewDetail(scope.$index, scope.row)"
            >查看详情</el-button>

            <el-button
              size="mini"
              type="danger"
              @click="handleDeleteDetail(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button
        style="margin-left: 20px"
        class="search-button"
        @click="handleBatchOperate()"
        type="danger"
        size="small">
        批量删除
      </el-button>
    </div>


    <!--      <div class="table-container" align="center">-->
    <!--        <el-table ref="returnApplyTable"-->
    <!--                  :data="list"-->
    <!--                  style="width: 70%;"-->
    <!--                  @selection-change="handleSelectionChange"-->
    <!--                  v-loading="listLoading" border>-->
    <!--          <el-table-column label="费用项目" width="200" align="center">-->
    <!--            <template slot-scope="scope">{{scope.row.id}}</template>-->
    <!--          </el-table-column>-->
    <!--          <el-table-column label="余额" width="200" align="center">-->
    <!--            <template slot-scope="scope">0</template>-->
    <!--          </el-table-column>-->
    <!--          <el-table-column label="应退金额" width="200" align="center">-->
    <!--            <template slot-scope="scope">￥{{scope.row | formatReturnAmount}}</template>-->
    <!--          </el-table-column>-->
    <!--          <el-table-column label="实退金额" width="200" align="center">-->
    <!--            <template slot-scope="scope">￥{{scope.row | formatReturnAmount}}</template>-->
    <!--          </el-table-column>-->
    <!--        </el-table>-->
    <!--      </div>-->

    <!--      <div class="pagination-container">-->
    <!--        <el-pagination-->
    <!--          background-->
    <!--          @size-change="handleSizeChange"-->
    <!--          @current-change="handleCurrentChange"-->
    <!--          layout="total, sizes,prev, pager, next,jumper"-->
    <!--          :current-page.sync="listQuery.pageNum"-->
    <!--          :page-size="listQuery.pageSize"-->
    <!--          :page-sizes="[5,10,15]"-->
    <!--          :total="total">-->
    <!--        </el-pagination>-->
    <!--      </div>-->


  </div>
</template>
<script>
  import {formatDate} from '@/utils/date';
  import {deleteApply,appointList} from '@/api/returnApply';
  import {deleteOrder,getList} from '@/api/order'
  const defaultListQuery = {
    'member_name':'',
    'member_ID': '',
    'bed': '',
    'check-out_time': 0,
    'check-out_reason': '',
    'manager': '',
    'remark': '',
    'manage_time': '',
    'account_balance': 0.0,
    'expense_item': {}

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
        // listQuery:Object.assign({},defaultListQuery),
        statusOptions: Object.assign({},defaultStatusOptions),
        list:null,
        total:null,
        listLoading:false,
        multipleSelection:[],
        operateType:1,
        searchList:{
          'member_name':''
        },
        page:{
          page:1,
          page_size:10
        },
        listQuery:{
          "member_name": "",
          "member_ID": "",
          "family_address": "",
          "contact_number":"",
          "check-in_main_diagnosis": "",
          "death_time":0,
          "certificate_time": 0,
          "death_disease":"",
          "certificate_doctor":""
        },
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
      // formatTime(time) {
      //   if(time==null||time===''){
      //     return 'N/A';
      //   }
      //   let date = new Date(time);
      //   return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
      // },
    //   formatStatus(status){
    //     for(let i=0;i<defaultStatusOptions.length;i++){
    //       if(status===defaultStatusOptions[i].value){
    //         return defaultStatusOptions[i].label;
    //       }
    //     }
    //   },
    //   formatReturnAmount(row){
    //     return row.productRealPrice*row.productCount;
    //   }
    },
    methods:{
      handleSelectionChange(val){
        this.multipleSelection = val;
      },
      handleResetSearch() {
        this.getList()
      },
      handleSearchList() {
        this.listQuery.pageNum = 1;
        this.listLoading = true;
        console.log(this.searchList)
        if(this.searchList.member_name == ''){
          this.getList()
        } else {
          getList(this.searchList,"/api/member-manage/death-registration/search/").then(response => {
            this.listLoading = false;
            this.list = response.data;
            console.log(response)
          });
        }
      },
      handleSaveList() {
        this.listQuery['death_time']=parseInt(this.listQuery['death_time'])
        this.listQuery['certificate_time']=parseInt(this.listQuery['certificate_time'])
        console.log(this.listQuery)
        appointList(this.listQuery,'/api/member-manage/death-registration/').then(response=>{
          this.$message({
            type: 'success',
            message: '死亡登记成功!',
            duration:1000
          });
          console.log(response)
          this.getList()
        })
      },
      handleViewDetail(index,row){
        this.$router.push({path:'/oms/deathDetail',query:{id:row.id}})
      },
      handleDeleteDetail(index,row){
        this.$confirm('是否要进行删除操作?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteOrder('/api/member-manage/death-registration/',row.id).then(response=>{
            this.getList();
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          });
        })
      },
      handleBatchOperate(){
        let ids=[];
        for(let i=0;i<this.multipleSelection.length;i++){
          ids.push(this.multipleSelection[i].id);
        }
        this.$confirm('是否要进行该删除操作?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          for(let i=0;i<ids.length;i++){
            console.log('删除编号:'+ids[i])
            deleteOrder('/api/member-manage/death-registration/',ids[i]).then(response=>{
              this.$message({
                message: '删除成功！',
                type: 'success',
                duration: 1000
              });
            });
            this.getList();
          }
        })
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
        getList(this.page,'/api/member-manage/death-registration/list/').then(response => {
          this.listLoading = false;
          this.list = response.data.data;
          console.log(response)
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


