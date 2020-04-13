<template> 

  <div class="app-container" >
    <el-card class="filter-container" shadow="never">
      <div class="app-container">
        <!--    <span style="font-size: small;width: 500px;padding: 10px;border-radius: 5px;background: #9E9E9E">退住信息</span>-->
              <i class="el-icon-tickets"></i>
              <span>业务变更</span>
              <el-button
                size="mini"
                type="primary"
                style="float:right"
                @click="handleConfirm"
                class="btn-add">确认变更
              </el-button>
              <el-form :inline="true" :model="businessList" size="small" label-width="180px" style="margin-top: 25px">
                <el-form-item label="会员编号：">
                  <el-input v-model="businessList.id" class="input-width" placeholder="必填" style="width:300px"></el-input>
                </el-form-item>
                <el-form-item label="变更原因：">
                  <el-input v-model="businessList.reason" class="input-width" placeholder="必填" style="width:300px"></el-input>
                </el-form-item>
                <el-form-item label="变更日期：">
                  <el-input v-model="businessList.date" class="input-width" placeholder="必填" style="width:300px"></el-input>
                </el-form-item>
              </el-form>


              <el-form :inline="true"  size="small" label-width="180px" style="margin-top: 25px">
                <el-form-item style="margin-left: 100px">
                  <el-radio-group v-model="chooseList" size="medium">
                    <el-radio border label="业务变更" ></el-radio>
                    <el-radio border label="膳食变更" ></el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form label="业务变更：" v-if="this.chooseList=='业务变更'" style="display: flex;flex-direction: column;margin-left: 100px">
                  <el-form-item>
                   <el-input v-model="bed_cost.cost" class="input-width" placeholder="变更价格" style="width:300px" ></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-input v-model="bed_cost.change" class="input-width" placeholder="变更服务" style="width:300px" ></el-input>
                  </el-form-item>
                </el-form>
                <el-form label="膳食变更：" v-if="this.chooseList=='膳食变更'" style="display: flex;flex-direction: column;margin-left: 100px">
                  <el-form-item>
                    <el-input v-model="meal_cost.cost" class="input-width" placeholder="变更价格" style="width:300px" ></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-input v-model="meal_cost.change" class="input-width" placeholder="变更膳食" style="width:300px" ></el-input>
                  </el-form-item>
                </el-form>
              </el-form>
      </div>



<!--    <el-card class="operate-container" shadow="never" >-->
<!--      <i class="el-icon-tickets"></i>-->
<!--      <span>业务数据列表</span>-->
<!--    </el-card>-->
<!--    <div class="table-container" style="width: 90%">-->
<!--      <el-table ref="orderTable"-->
<!--                :data="list"-->
<!--                style="width: 100%;"-->
<!--                @selection-change="handleSelectionChange"-->
<!--                v-loading="listLoading" border>-->
<!--        <el-table-column type="selection" width="60" align="center"></el-table-column>-->
<!--        <el-table-column label="会员编号" width="100" align="center">-->
<!--          <template slot-scope="scope">{{scope.row.id}}</template>-->
<!--        </el-table-column>-->
<!--&lt;!&ndash;        <el-table-column label="变更时间" width="180" align="center">&ndash;&gt;-->
<!--&lt;!&ndash;          <template slot-scope="scope">{{scope.row.created_at }}</template>&ndash;&gt;-->
<!--&lt;!&ndash;        </el-table-column>&ndash;&gt;-->
<!--        <el-table-column label="会员名称" width="180" align="center">-->
<!--          <template slot-scope="scope">{{scope.row.member_name}}</template>-->
<!--        </el-table-column>-->
<!--        <el-table-column label="身份证号" width="" align="center">-->
<!--          <template slot-scope="scope">{{scope.row.member_ID}}</template>-->
<!--        </el-table-column>-->
<!--        <el-table-column label="床位号" width="" align="center">-->
<!--          <template slot-scope="scope">{{scope.row.bed}}</template>-->
<!--        </el-table-column>-->
<!--        <el-table-column label="变更原因" align="center">-->
<!--          <template slot-scope="scope">{{scope.row['check-out_reason']}}</template>-->
<!--        </el-table-column>-->
<!--        <el-table-column label="变更时间" align="center">-->
<!--          <template slot-scope="scope">{{scope.row['check-out_time']}}</template>-->
<!--        </el-table-column>-->
<!--        <el-table-column label="操作" width="200" align="center">-->
<!--          &lt;!&ndash;进入详情页&ndash;&gt;-->
<!--          <template slot-scope="scope">-->
<!--            <el-button-->
<!--              size="mini"-->
<!--              @click="handleViewDetail(scope.$index, scope.row)"-->
<!--            >查看详情</el-button>-->
<!--            <el-button-->
<!--              size="mini"-->
<!--              type="danger"-->
<!--              @click="handleDeleteDetail(scope.$index, scope.row)">删除</el-button>-->
<!--          </template>-->
<!--        </el-table-column>-->
<!--      </el-table>-->
<!--    </div>-->
    </el-card>
  </div>
</template>
<script>
  import {formatDate} from '@/utils/date';
  import {changeList,deleteReason,updateStatus,addReason,getReasonDetail,updateReason} from '@/api/returnReason';
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 5
  };
  const defaultReturnReason = {
    name:null,
    sort:0,
    status:1,
    createTime:null
  };
  export default {
    name: 'returnReasonList',
    data() {
      return {
        list: null,
        total: null,
        multipleSelection: [],
        listLoading:true,
        chooseList:{},
        businessList:{
          'id':0,
          'reason':'',
          'date':0,
        },
        bed_cost:{
          'cost':'',
          'change':''
        },
        meal_cost:{
          'cost':'',
          'change':''
        },
        listQuery:Object.assign({}, defaultListQuery),
        operateType:null,
        operateOptions: [
          {
            label: "删除",
            value: 1
          }
        ],
        dialogVisible:false,
        returnReason:Object.assign({},defaultReturnReason),
        operateReasonId:null
      }
    },
    created(){
      this.getList();
    },
    filters:{
      formatCreateTime(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
      }
    },
    methods: {
      handleAdd() {
        this.dialogVisible=true;
        this.operateReasonId=null;
        this.returnReason=Object.assign({},defaultReturnReason);
      },
      handleConfirm(){
        if(this.chooseList=='业务变更'){
          this.businessList.bed_cost=this.bed_cost
        }
        if(this.chooseList=='膳食变更'){
          this.businessList.meal_cost=this.meal_cost
        }
        this.businessList.id=parseInt(this.businessList.id)
        this.businessList.date=parseInt(this.businessList.date)
        this.businessList.bed_cost.cost=parseInt(this.businessList.bed_cost.cost)
        // this.businessList.meal_cost.cost=parseInt(this.businessList.meal_cost.cost)
        console.log('this.businessList')
        console.log(this.businessList)
        addReason(this.businessList,'/api/member-manage/check-in/odd_number/').then(response=>{
          this.dialogVisible=false;
          console.log(response)
          this.$message({
            message: '添加成功！',
            type: 'success',
            duration:1000
          });
          this.getList();
        });
        // if(this.operateReasonId==null){
        //   //添加操作
        //   this.businessList.id=parseInt(this.businessList.id)
        //   this.businessList.date=parseInt(this.businessList.date)
        //   this.businessList.bed_cost.cost=parseInt(this.businessList.bed_cost.cost)
        //   // this.businessList.meal_cost.cost=parseInt(this.businessList.meal_cost.cost)
        //   console.log(this.businessList)
        //   addReason(this.businessList,'/api/member-manage/check-in/odd_number').then(response=>{
        //     this.dialogVisible=false;
        //     console.log(response)
        //     this.$message({
        //       message: '添加成功！',
        //       type: 'success',
        //       duration:1000
        //     });
        //     this.getList();
        //   });
        // }else{
        //   //编辑操作
        //   updateReason(this.operateReasonId,this.returnReason).then(response=>{
        //     this.dialogVisible=false;
        //     this.operateReasonId=null;
        //     this.$message({
        //       message: '修改成功！',
        //       type: 'success',
        //       duration:1000
        //     });
        //     this.getList();
        //   });
        // }
      },
      handleUpdate(index, row){
        this.dialogVisible=true;
        this.operateReasonId=row.id;
        getReasonDetail(row.id).then(response=>{
          this.returnReason=response.data;
        });
      },
      handleViewDetail(){
        this.$router.push({path:'/oms/changeDetail',query:{id:row.id}})
      },
      handleDelete(index, row){
        let ids=[];
        ids.push(row.id);
        this.deleteReason(ids);
      },
      handleSelectionChange(val){
        this.multipleSelection = val;
      },
      handleStatusChange(index,row){
        let ids=[];
        ids.push(row.id);
        let param = new URLSearchParams();
        param.append("status",row.status);
        param.append("ids",ids);
        updateStatus(param).then(response=>{
          this.$message({
            message: '状态修改成功',
            type: 'success'
          });
        });
      },
      handleBatchOperate(){
        if(this.multipleSelection==null||this.multipleSelection.length<1){
          this.$message({
            message: '请选择要操作的条目',
            type: 'warning',
            duration: 1000
          });
          return;
        }
        if(this.operateType===1){
          let ids=[];
          for(let i=0;i<this.multipleSelection.length;i++){
            ids.push(this.multipleSelection[i].id);
          }
          this.deleteReason(ids);
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
        this.listLoading = true;
        changeList().then(response => {
          this.listLoading = false;
          this.list = response.data.data;

        });
      },
      deleteReason(ids){
        this.$confirm('是否要进行该删除操作?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = new URLSearchParams();
          params.append("ids",ids);
          deleteReason(params).then(response=>{
            this.$message({
              message: '删除成功！',
              type: 'success',
              duration: 1000
            });
            this.listQuery.pageNum=1;
            this.getList();
          });
        })
      },
    }
  }
</script>
<style scoped>
  .input-width {
    width: 80%;
  }
</style>


