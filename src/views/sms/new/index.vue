<template> 
  <div class="app-container" >
    <el-card class="filter-container" shadow="never">
      <div style="margin-bottom: 15px">
        <span>员工管理</span>
        <el-button
          style="float:right"
          type="primary"
          @click="addList()"
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
        <span style="font-size: small;width: 500px;padding: 10px;border-radius: 5px">员工信息</span>
        <el-form :inline="true" :model="listQuery" size="small" label-width="180px" style="margin-top: 30px">
          <el-form-item label="员工姓名：">
            <el-input v-model="listQuery.staff_name" class="input-width" placeholder="必填" style="width:300px"></el-input>
          </el-form-item>
          <el-form-item label="用户id：">
            <el-input v-model="listQuery.user_id" class="input-width" placeholder="必填" style="width:300px"></el-input>
          </el-form-item>

          <el-form-item label="身份证号：">
            <el-input v-model="listQuery.id_number" class="input-width" placeholder="必填" style="width:300px"></el-input>
          </el-form-item>
          <el-form-item label="性别：">
            <el-radio v-model="listQuery.sex" label='0'>男</el-radio>
            <el-radio v-model="listQuery.sex" label='1'>女</el-radio>
          </el-form-item>
          <el-form-item label="出生日期：">
            <el-input v-model="listQuery.birth_date" class="input-width" placeholder="必填" style="width:300px"></el-input>
          </el-form-item>
          <el-form-item label="所属部门：">
            <el-input v-model="listQuery.subordinate_department" class="input-width" placeholder="必填" style="width:300px"></el-input>
          </el-form-item>
          <el-form-item label="所属团队：">
            <el-input v-model="listQuery.subordinate_team" class="input-width" placeholder="必填" style="width:300px"></el-input>
          </el-form-item>
          <el-form-item label="民族：">
            <el-input v-model="listQuery.nation" class="input-width" placeholder="必填" style="width:300px"></el-input>
          </el-form-item>
          <el-form-item label="岗位职级：">
            <el-input v-model="listQuery.position_rank" class="input-width" placeholder="必填" style="width:300px"></el-input>
          </el-form-item>
          <el-form-item label="电话号码：">
            <el-input v-model="listQuery.phone_number" class="input-width" placeholder="必填" style="width:300px"></el-input>
          </el-form-item>

          <el-form-item label="合同开始时间：">
            <el-input v-model="listQuery.start_time" class="input-width" placeholder="必填" style="width:300px"></el-input>
          </el-form-item>
          <el-form-item label="员工类型：">
            <el-radio v-model="listQuery.staff_type" label='0'>劳动合同工</el-radio>
            <el-radio v-model="listQuery.staff_type" label='1'>临时工</el-radio>
          </el-form-item>
          <el-form-item label="合同结束时间：">
            <el-input v-model="listQuery.end_time" class="input-width" placeholder="必填" style="width:300px"></el-input>
          </el-form-item>
          <el-form-item label="员工状态：">
            <el-radio v-model="listQuery.staff_status" label='0'>在职</el-radio>
            <el-radio v-model="listQuery.staff_status" label='1'>离职</el-radio>
          </el-form-item>
          <el-form-item label="开户行：">
            <el-input v-model="listQuery.bank" class="input-width" placeholder="必填" style="width:300px"></el-input>
          </el-form-item>
          <el-form-item label="银行卡号：">
            <el-input v-model="listQuery.bank_card_number" class="input-width" placeholder="必填" style="width:300px"></el-input>
          </el-form-item>
        </el-form>
      </el-card>
    </el-card>

    <el-card class="operate-container" shadow="never" >
      <i class="el-icon-tickets"></i>
      <span>员工信息列表</span>
    </el-card>
    <el-card class="filter-container" shadow="never" style="margin-top: 20px">

    </el-card>
    <div class="table-container" style="width: 100%">
      <el-table ref="orderTable"
                :data="list"
                style="width: 100%;"
                @selection-change="handleSelectionChange"
                v-loading="listLoading" border>
        <el-table-column type="selection" width="60" align="center"></el-table-column>
        <el-table-column label="编号" width="100" align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="员工名称" width="180" align="center">
          <template slot-scope="scope">{{scope.row.staff_name}}</template>
        </el-table-column>
        <el-table-column label="身份证号" width="" align="center">
          <template slot-scope="scope">{{scope.row.id_number}}</template>
        </el-table-column>
        <el-table-column label="性别" width="" align="center">
          <template slot-scope="scope">{{scope.row.sex}}</template>
        </el-table-column>
        <el-table-column label="职级名称" align="center">
          <template slot-scope="scope">{{scope.row.position_rank}}</template>
        </el-table-column>
        <el-table-column label="岗位名称" align="center">
          <template slot-scope="scope">{{scope.row.subordinate_department}}</template>
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
        style="margin: 20px"
        class="search-button"
        @click="handleBatchOperate()"
        type="danger"
        size="small">
        批量删除
      </el-button>
    </div>



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
        searchList:{
          'member_name':''
        },
        query_string:{
          'page':1,
          'page_size':10
        },
        multipleSelection:[],
        operateType:1,
        listQuery:{
          "id":0,
          "user_id":null,
          "staff_name":"",
          "sex":0,
          "id_number":"",
          "birth_date":"",
          "subordinate_department":"",
          "subordinate_team":"",
          "nation":"",
          "position_rank":"",
          "phone_number":"",
          "staff_type":0,
          "start_time":0,
          "end_time":0,
          "staff_status":0,
          "bank":"",
          "bank_card_number":"",
          "created_at":"",
          "updated_at":""
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
          getList(this.searchList,"/member-manage/check-out/search").then(response => {
            this.listLoading = false;
            this.list = response.data;
            console.log(response)
          });
        }
      },
      addList(){
        this.listQuery.sex=parseInt(this.listQuery.sex)
        this.listQuery.id=parseInt(this.listQuery.id)
        this.listQuery.staff_type=parseInt(this.listQuery.staff_type)
        this.listQuery.start_time=parseInt(this.listQuery.start_time)
        this.listQuery.end_time=parseInt(this.listQuery.end_time)
        this.listQuery.staff_status=parseInt(this.listQuery.staff_status)
        console.log(this.listQuery)
        this.listLoading=true;
        appointList(this.listQuery,'/personnel-management/staff-manage/').then(response => {
          this.listLoading = false;
          if(response.status == 200){
            this.$message({
              type: 'success',
              message: response.message
            });
          };
          console.log(response.data)
          this.getList()
        });
      },
      handleViewDetail(index,row){
        this.$router.push({path:'/sms/newDetail',query:{id:row.id}})
      },

      handleDeleteDetail(index,row){
        this.$confirm('是否要进行删除操作?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteOrder('/personnel-management/staff-manage/',row.id).then(response=>{
            this.getList();
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          });
          this.getList()
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
            deleteOrder('/personnel-management/staff-manage/',ids[i]).then(response=>{
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
        getList(this.query_string,'/personnel-management/staff-manage/list').then(response => {
          this.listLoading = false;
          this.list = response.data.data;
          console.log(this.list)
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




