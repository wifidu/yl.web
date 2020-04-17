<template>
  <div>
    <el-card class="form-container" shadow="never">
      <el-form :model="value"  ref="fixedDetailForm" :inline="true" :rules="rules" label-width="120px" size="small">
        <p>
          <el-form-item  label="资产编号：" prop="id">
            <el-input :disabled="true" size="mini" v-model="value.id"></el-input>
          </el-form-item>
          <el-button v-if="editId" size="small" @click="getAssetsNumber()">自动生成资产编号</el-button>
        </p>
        <p>
          <el-form-item label="资产名称：" prop="name">
            <el-input :disabled="!isEdit" v-model="value.name"></el-input>
          </el-form-item>
          <el-form-item label="分类：" prop="classification">
            <el-select :disabled="!isEdit" v-model="value.classification">
              <el-option v-for="item in classificationOptions"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </p>
        <p>
                <el-form-item label="序列号：">
                  <el-input :disabled="!isEdit" v-model="value.serial_number"></el-input>
                </el-form-item>
                <el-form-item label="品牌：">
                  <el-input :disabled="!isEdit" v-model="value.brand"></el-input>
                </el-form-item>
              </p>
        <p>
                <el-form-item label="位置：">
                  <el-input :disabled="!isEdit" v-model="value.position"></el-input>
                </el-form-item>
                <el-form-item label="型号：">
                  <el-input :disabled="!isEdit" v-model="value.model"></el-input>
                </el-form-item>
              </p>
        <p>
                <el-form-item label="责任部门：">
                  <el-input :disabled="!isEdit" v-model="value.department"></el-input>
                </el-form-item>
                <el-form-item label="责任人：">
                  <el-input :disabled="!isEdit" v-model="value.administrators"></el-input>
                </el-form-item>
              </p>
        <p>
          <el-form-item label="金额：">
            <el-input :disabled="!isEdit" v-model="value.price"></el-input>
          </el-form-item>
          <el-form-item label="状态：" prop="type">
            <el-select v-model="value.type" :disabled="!isEdit">
              <el-option v-for="item in typeOptions"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </p>
        <p>
                <el-form-item label="安装日期：" prop="install_date">
                  <el-date-picker
                    v-model="value.install_date"
                    :disabled="!isEdit"
                    type="date"
                    placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="保修期：">
                  <el-date-picker
                    v-model="value.warranty"
                    :disabled="!isEdit"
                    type="date"
                    placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
              </p>
        <p>
          <el-form-item label="备注：">
            <el-input
              v-model="value.remarks"
              :disabled="!isEdit"
              type="textarea"
              :rows="2"
              style="width: 500px">
            </el-input>
          </el-form-item>
        </p>
        <el-form-item v-if="isEdit" label="图片：">
          <el-upload v-model="value.picture_url"
            class="selectProductPics"
            action=""
            :limit=1
            :auto-upload=false
            :on-remove="handleRemove"
            list-type="picture">
            <el-button type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">支持上传PNG、JPEG格式</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <el-form style="text-align: center">
        <el-button type="success" size="mini" @click="handleSave('fixedDetailForm')" v-if="isEdit">保存</el-button>
        <el-button size="mini" @click="handleCancel" v-if="isEdit">取消</el-button>
      </el-form>
    </el-card>

  </div>
</template>

<script>
  import {asset_data, asset_save, get_asset_number} from '@/api/fixedAssets';
  import {formatDate} from '@/utils/date.js';

  const defaultValue = {
    id: '',
    name: null,
    classification: '家电耗材',
    serial_number: null,
    brand: null,
    position: null,
    model: null,
    department: null,
    administrators: null,
    price: null,
    type: 0,
    install_date: null,
    warranty: null,
    remarks: null,
    picture_url: null
  };
  export default {
    name: "fixedDetail",
    props: {
      isEdit: {
        type: Boolean,
        default: false
      },
      editId: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        value: null,
        classificationOptions: [
          {value: 1, label: '家电耗材'}
        ],
        typeOptions: [
          {value: 0, label:'已损坏'},
          {value: 1, label:'在用'},
          {value: 2, label:'维修中'},
        ],
        rules: {
          id: [{required: true, message: '该项为必填项'}],
          name: [{required: true, message: '该项为必填项'}],
          install_date: [{required: true, message: '该项为必填项'}],
          type: [{required: true, message: '该项为必填项'}],
          classification: [{required: true, message: '该项为必填项'}]
        }
      };
    },
    created(){
      if(!this.editId){
        asset_data(this.$route.query.id).then(response => {
          this.value = response.data;
          // this.value.install_data = formatDate(this.value.install_date, "yyyy-MM-dd hh:mm");
          // console.log(this.value.install_date)
        })
      }else{
        this.value = Object.assign({},defaultValue);
      }
    },
    filters:{
      formatDate(time) {
        let date = new Date(time);
        return formatDate(date, "yyyy-MM-dd hh:mm");
      }
    },
    methods: {
      getAssetsNumber(){
        get_asset_number().then( response =>{
          this.value.id = response.data.assets_number
        })
      },
      handleSave(formName){
        this.$refs[formName].validate((valid) => {
          if(valid){
            this.$confirm('是否提交数据', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.value.install_date = (new Date(this.value.install_date)).getTime()/1000;
              this.$router.back()
            })

          }else{
            this.$message({
              message: '带*为必填信息',
              type: 'error',
              duration: 1000
            });
            return false;
          }
        });
      },
      handleCancel() {
        this.$router.back();
      },
      handleRemove() {
        console.log('??');
      },
    }
  }
</script>

<style scoped>
  .form-container {
    width: 800px;
  }
</style>
