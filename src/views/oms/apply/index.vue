<template> 
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
<!--        <i class="el-icon-search"></i>这里添加icon-->
        <span>预约床位</span>
        <el-button
          style="float:right"
          type="primary"
          @click="mounted()"
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
      <el-card class="filter-container" shadow="never" style="margin-top: 15px">
          <span>预约信息</span>
        <el-form :inline="true" :model="appointList" size="small" label-width="180px">
          <el-form-item label="预约床位：">
            <el-input v-model="appointList.bed_number" class="input-width" placeholder="必填" style="width:320px"></el-input>
          </el-form-item>
          <el-form-item label="床位费用：">
            <el-input v-model="appointList.bed_cost" class="input-width" placeholder="必填" style="width:320px"></el-input>
<!--            <el-select v-model="listQuery.status" placeholder="正在使用" clearable class="input-width">-->
<!--              <el-option v-for="item in statusOptions"-->
<!--                         :key="item.value"-->
<!--                         :label="item.label"-->
<!--                         :value="item.value">-->
<!--              </el-option>-->
<!--            </el-select>-->
          </el-form-item>
          <el-form-item label="入住日期：">
            <el-input v-model="appointList['check-in_date']" class="input-width" placeholder="必填" style="width:320px"></el-input>
          </el-form-item>
          <el-form-item label="预约押金：">
            <el-input v-model="appointList.appoint_deposit" class="input-width" placeholder="" style="width:320px"></el-input>
          </el-form-item>
          <el-form-item label="联系电话：">
            <el-input v-model="appointList.contract_number" class="input-width" placeholder="必填" style="width:320px"></el-input>
          </el-form-item>
          <el-form-item label="预约人：">
            <el-input v-model="appointList.appoint_person" class="input-width" placeholder="必填" style="width:320px"></el-input>
          </el-form-item>
          <el-form-item label="预约时间：">
            <el-input v-model="appointList.appoint_time" class="input-width" placeholder="" style="width:320px"></el-input>
          </el-form-item>
        </el-form>
       </el-card>
      <el-card class="filter-container" shadow="never" style="margin-top: 15px">
        <span>老人信息</span>
        <el-form :inline="true" :model="appointList" size="small" label-width="180px">
          <el-form-item label="身份证号：">
            <el-input v-model="appointList.elderly_ID" class="input-width" placeholder="" style="width:320px"></el-input>
          </el-form-item>
          <el-form-item label="老人姓名：">
            <el-input v-model="appointList.elderly_name" class="input-width" placeholder="必填" style="width:320px"></el-input>
          </el-form-item>
          <el-form-item label="年龄：">
            <el-input v-model="appointList.elderly_age" class="input-width" placeholder="" style="width:320px"></el-input>
            <!--            <el-select v-model="listQuery.status" placeholder="正在使用" clearable class="input-width">-->
            <!--              <el-option v-for="item in statusOptions"-->
            <!--                         :key="item.value"-->
            <!--                         :label="item.label"-->
            <!--                         :value="item.value">-->
            <!--              </el-option>-->
            <!--            </el-select>-->
          </el-form-item>
          <el-form-item label="性别：">
            <el-radio v-model="appointList.elderly_gender" label='0' >男</el-radio>
            <el-radio v-model="appointList.elderly_gender" label='1' >女</el-radio>
          </el-form-item>
        </el-form>
        <el-form :inline="true" :model="appointList" size="small" label-width="180px">
          <el-form-item label="居住地址：">
            <el-input v-model="appointList.address" class="input-width" placeholder="" style="width:320px"></el-input>
          </el-form-item>
          <el-form-item label="自理能力：">
            <el-radio v-model="appointList['self-care_ability']" :label="0">自理</el-radio>
            <el-radio v-model="appointList['self-care_ability']" :label="1">半自理</el-radio>
            <el-radio v-model="appointList['self-care_ability']" :label="2">失能</el-radio>
          </el-form-item>
          <el-form-item label="备注：">
            <el-input v-model="appointList.remark" class="input-width" placeholder="必填" style="width:320px"></el-input>
          </el-form-item>
        </el-form>
      </el-card>
    </el-card>

<!--    <el-card class="filter-container" shadow="never" style="margin-top: 15px">-->
<!--      <div>-->
<!--        <i class="el-icon-search"></i>-->
<!--        <span>预约订单搜索</span>-->
<!--        <el-button-->
<!--          style="float:right"-->
<!--          type="primary"-->
<!--          @click="handleSearchList()"-->
<!--          size="small">-->
<!--          查询搜索-->
<!--        </el-button>-->
<!--        <el-button-->
<!--          style="float:right;margin-right: 15px"-->
<!--          @click="handleResetSearch()"-->
<!--          size="small">-->
<!--          重置-->
<!--        </el-button>-->
<!--      </div>-->

<!--      <div style="margin-top: 15px">-->
<!--        <el-form :inline="true" :model="searchList" size="small" label-width="140px">-->
<!--          <el-form-item label="会员名称：">-->
<!--            <el-input v-model="searchList.elderly_name" class="input-width" placeholder=""></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="会员手机号：">-->
<!--            <el-input v-model="searchList.contract_number" class="input-width" placeholder=""></el-input>-->
<!--          </el-form-item>-->
<!--        </el-form>-->
<!--      </div>-->
<!--    </el-card>-->
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>预约订单列表</span>
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
            <el-input v-model="searchList.elderly_name" class="input-width" placeholder="会员名称"></el-input>
          </el-form-item>
          <el-form-item label="电话号码：">
            <el-input v-model="searchList.contract_number" class="input-width" placeholder="电话号码"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <div class="table-container">
      <el-table ref="returnApplyTable"
                :data="list"
                style="width: 100%;"
                @selection-change="handleSelectionChange"
                v-loading="listLoading" border>
        <el-table-column type="selection" width="60" align="center"></el-table-column>
        <el-table-column label="编号" width="60" align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="房间号" align="center">
          <template slot-scope="scope">{{scope.row.bed_number}}</template>
        </el-table-column>
        <el-table-column label="预约时间" width="180" align="center">
          <template slot-scope="scope">{{scope.row.created_at | formatTime}}</template>
        </el-table-column>
        <el-table-column label="会员名称" width="180" align="center">
          <template slot-scope="scope">{{scope.row.elderly_name}}</template>
        </el-table-column>
        <el-table-column label="预约人" width="180" align="center">
          <template slot-scope="scope">{{scope.row.appoint_person}}</template>
        </el-table-column>
        <el-table-column label="联系方式" width="180" align="center">
          <template slot-scope="scope">{{scope.row.contract_number}}</template>
        </el-table-column>
        <el-table-column label="房间价格" width="180" align="center">
          <template slot-scope="scope">￥{{scope.row.bed_cost}}</template>
        </el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button
            size="mini"
            @click="handleViewDetail(scope.$index, scope.row)">查看详情</el-button>
            <el-button
              size="mini"
              type="warning"
              @click="handleCancel(scope.$index, scope.row)">取消</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
<!--    <div class="batch-operate-container">-->
<!--      <el-select-->
<!--        size="small"-->
<!--        v-model="operateType" placeholder="批量操作">-->
<!--        <el-option-->
<!--          v-for="item in operateOptions"-->
<!--          :key="item.value"-->
<!--          :label="item.label"-->
<!--          :value="item.value">-->
<!--        </el-option>-->
<!--      </el-select>-->
      <el-button
        style="margin: 20px"
        class="search-button"
        @click="handleBatchOperate()"
        type="warning"
        size="small">
        批量取消
      </el-button>
<!--    </div>-->
<!--    <div class="pagination-container">-->
<!--      <el-pagination-->
<!--        background-->
<!--        @size-change="handleSizeChange"-->
<!--        @current-change="handleCurrentChange"-->
<!--        layout="total, sizes,prev, pager, next,jumper"-->
<!--        :current-page.sync="listQuery.pageNum"-->
<!--        :page-size="listQuery.pageSize"-->
<!--        :page-sizes="[5,10,15]"-->
<!--        :total="total">-->
<!--      </el-pagination>-->
<!--    </div>-->
  </div>
</template>
<script>
  import {formatDate} from '@/utils/date';
  import {bookList,deleteApply,appointList,cancelOrder,searchList} from '@/api/returnApply';
  import {deleteOrder,getList} from '@/api/order';
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
        searchList:{
          'contract_number':'',
          'elderly_name':''
        },
        search_phone:{'contract_number':'',},
        search_name:{'elderly_name':''},
        appointList:{
          'bed_number':'',
          'bed_cost':0,
         // 'checkin_date':0,
          'check-in_date':0,
          'contract_number':'',
          'appoint_person':'',
          'elderly_name':'',
          'elderly_gender':'0',
          'self-care_ability':null,
          //'selfcare_ability':null,
          'remark':'',
          'appoint_deposit':'',
          'appoint_time':'',
          'elderly_ID':'',
          'elderly_age':'',
          'address':'',
          'is_checkin':'',
          'is_cancel':	'',
        },
        total:null,
        listLoading:false,
        multipleSelection:[],
        operateType:1,
        array:[],
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
      mounted(){
        console.log(this.appointList)
        // this.appointList['check-in_date'] =  this.appointList.checkin_date
        // this.appointList['self-care_ability'] =  this.appointList.selfcare_ability
        this.appointList.elderly_gender=parseInt(this.appointList.elderly_gender)
        // this.appointList.elderly_gender == '0'?this.appointList["elderly_gender"]=0:this.appointList["elderly_gender"]=1
        // delete this.appointList.checkin_date
        // delete this.appointList.selfcare_ability
        console.log(this.appointList)
        appointList(this.appointList,'/member-manage/book-bed').then(response =>{
          console.log(response)
          this.$message({
            message: '预约成功！',
            type: 'success',
            duration: 1000
          });
        })
        this.getList()
      },
      handleSelectionChange(val){
        this.multipleSelection = val;
      },
      handleResetSearch() {
        this.getList()
      },
      handleSearchList() {
        this.listQuery.pageNum = 1;
        this.listLoading = true;
        console.log('handleSearchList')
        if(this.searchList.elderly_name == '' && this.searchList.contract_number == ''){
          this.getList()
        } else if(this.searchList.contract_number == ''){
          this.search_name.elderly_name=this.searchList.elderly_name
          console.log(this.search_name)
          getList(this.search_name,"/member-manage/book-bed/search/").then(response => {
            this.listLoading = false;
            this.list = response.data;
            console.log(response)
          });
        }else {
          this.search_phone.contract_number=this.searchList.contract_number
          console.log(this.contract_number)
          getList(this.search_phone,"/member-manage/book-bed/search/").then(response => {
            this.listLoading = false;
            this.list = response.data;
            console.log(response)
          });
        }
      },
      handleViewDetail(index,row){
        this.$router.push({path:'/oms/returnApplyDetail',query:{id:row.id}})
      },
      handleCancel(index,row){
        this.$confirm('是否要取消预约?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteOrder('/member-manage/book-bed/',row.id).then(response=>{
            console.log(response)
            this.$message({
              message: '取消成功！',
              type: 'success',
              duration: 1000
            });
            this.getList();
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
            deleteOrder('/member-manage/book-bed/',ids[i]).then(response=>{
              this.$message({
                message: '删除成功！',
                type: 'success',
                duration: 1000
              });
            });
            this.getList();
          }
        })
        // if(this.multipleSelection==null||this.multipleSelection.length<1){
        //   this.$message({
        //     message: '请选择要操作的申请',
        //     type: 'warning',
        //     duration: 1000
        //   });
        //   return;
        // }
        // if(this.operateType===1){
        //   //批量删除
        //   this.$confirm('是否要进行删除操作?', '提示', {
        //     confirmButtonText: '确定',
        //     cancelButtonText: '取消',
        //     type: 'warning'
        //   }).then(() => {
        //     let params = new URLSearchParams();
        //     let ids=[];
        //     for(let i=0;i<this.multipleSelection.length;i++){
        //       ids.push(this.multipleSelection[i].id);
        //     }
        //     params.append("ids",ids);
        //     deleteApply(params).then(response=>{
        //       this.getList();
        //       this.$message({
        //         type: 'success',
        //         message: '删除成功!'
        //       });
        //     });
        //   })
        // }
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
        bookList('page=1&page_size=10').then(response => {
          this.listLoading = false;
          console.log(response)
          this.list = response.data.data;
          console.log(this.list)
          // this.total = response.data.total;
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


