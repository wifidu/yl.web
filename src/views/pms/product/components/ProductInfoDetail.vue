<template>
  <div>
    <el-form :model="value" :rules="rules" ref="productInfoForm" label-width="120px" style="width: 600px" size="small">
      <el-form-item  label="资产编号：" prop="name" placeholder="001">
          <el-input :disabled="true" v-model="value.id" size="mini"></el-input>
          <el-button v-if="editId">自动生成资产编号</el-button>
      </el-form-item>
      <el-form-item label="资产名称：" prop="name" placeholder="办公桌">
        <el-input :disabled="!isEdit" v-model="value.name"></el-input>
      </el-form-item>
      <el-form-item label="分类：" prop="brandId">
        <el-select
          :disabled="!isEdit"
          v-model="value.brandId"
          @change="handleBrandChange"
          placeholder="办公用品">
          <el-option
            v-for="item in brandOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="序列号：">
        <el-input :disabled="!isEdit" v-model="value.productSn"></el-input>
      </el-form-item>
      <el-form-item label="品牌：">
        <el-input :disabled="!isEdit" v-model="value.productSn"></el-input>
      </el-form-item>
      <el-form-item label="位置：">
        <el-input :disabled="!isEdit" v-model="value.location"></el-input>
      </el-form-item>
      <el-form-item label="型号：">
        <el-input :disabled="!isEdit" v-model="value.productSn"></el-input>
      </el-form-item>
      <el-form-item label="责任部门：">
        <el-input :disabled="!isEdit" v-model="value.productSn"></el-input>
      </el-form-item>
      <el-form-item label="责任人：">
        <el-input :disabled="!isEdit" v-model="value.productSn"></el-input>
      </el-form-item>
      <el-form-item label="金额：">
        <el-input :disabled="!isEdit" v-model="value.productSn"></el-input>
      </el-form-item>
      <el-form-item label="状态：" prop="name">
        <el-input :disabled="!isEdit" v-model="value.productSn"></el-input>
      </el-form-item>
      <el-form-item label="安装日期：" prop="name">
          <el-date-picker
            :disabled="!isEdit"
            v-model="value.installdate"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
      </el-form-item>
      <el-form-item label="保修期：">
        <el-date-picker
          :disabled="!isEdit"
          v-model="value.warrantydate"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="备注：">
        <el-input
          :disabled="!isEdit"
          type="textarea"
          :rows="2"
          v-model="value.textarea">
        </el-input>
      </el-form-item>
      <el-form-item v-if="isEdit" label="图片：">
        <el-upload
          class="selectProductPics"
          action=""
          :limit=1
          :auto-upload=false
          :on-change="onchange2"
          :on-remove="handleRemove2"
          :file-list="fileList2"
          list-type="picture">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">支持上传PNG、JPEG格式</div>
        </el-upload>
      </el-form-item>
    </el-form>
    <el-form style="text-align: center">
      <el-button type="success" size="mini" @click="handleIndex" v-if="isEdit">保存</el-button>
      <el-button size="mini" v-if="isEdit">取消</el-button>
    </el-form>
  </div>
</template>

<script>
  import {fetchListWithChildren} from '@/api/productCate'
  import {fetchList as fetchBrandList} from '@/api/brand'
  import {getProduct} from '@/api/product';

  export default {
    name: "ProductInfoDetail",
    props: {
      value: Object,
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
        hasEditCreated:false,
        //选中商品分类的值
        selectProductCateValue: [],
        productCateOptions: [],
        brandOptions: [],
        rules: {
          name: [
            {required: true, message: '该项为必填项', trigger: 'blur'},
            {min: 2, max: 140, message: '请输入资产名称', trigger: 'blur'}
          ],
          subTitle: [{required: true, message: '请选择类别', trigger: 'blur'}],
          productCategoryId: [{required: true, message: '请选择分类', trigger: 'blur'}],
          brandId: [{required: true, message: '请选择商品品牌', trigger: 'blur'}],
          description: [{required: true, message: '请输入商品介绍', trigger: 'blur'}],
          requiredProp: [{required: true, message: '该项为必填项', trigger: 'blur'}]
        }
      };
    },
    created() {
      this.getProductCateList();
      this.getBrandList();
    },
    computed:{
      //商品的编号
      productId(){
        return this.value.id;
      },
      selectProductPics:{
        get:function () {
          let pics=[];
          if(this.value.pic===undefined||this.value.pic==null||this.value.pic===''){
            return pics;
          }
          pics.push(this.value.pic);
          if(this.value.albumPics===undefined||this.value.albumPics==null||this.value.albumPics===''){
            return pics;
          }
          let albumPics = this.value.albumPics.split(',');
          for(let i=0;i<albumPics.length;i++){
            pics.push(albumPics[i]);
          }
          return pics;
        },
        set:function (newValue) {
          if (newValue == null || newValue.length === 0) {
            this.value.pic = null;
            this.value.albumPics = null;
          } else {
            this.value.pic = newValue[0];
            this.value.albumPics = '';
            if (newValue.length > 1) {
              for (let i = 1; i < newValue.length; i++) {
                this.value.albumPics += newValue[i];
                if (i !== newValue.length - 1) {
                  this.value.albumPics += ',';
                }
              }
            }
          }
        }
      }
    },
    watch: {
      productId:function(newValue){
        if(!this.isEdit)return;
        if(this.hasEditCreated)return;
        if(newValue===undefined||newValue==null||newValue===0)return;
        this.handleEditCreated();
      },
      selectProductCateValue: function (newValue) {
        if (newValue != null && newValue.length === 2) {
          this.value.productCategoryId = newValue[1];
          this.value.productCategoryName= this.getCateNameById(this.value.productCategoryId);
        } else {
          this.value.productCategoryId = null;
          this.value.productCategoryName=null;
        }
      }
    },
    methods: {
      //处理编辑逻辑
      handleEditCreated(){
        if(this.value.productCategoryId!=null){
          this.selectProductCateValue.push(this.value.cateParentId);
          this.selectProductCateValue.push(this.value.productCategoryId);
        }
        this.hasEditCreated=true;
      },
      getProductCateList() {
        fetchListWithChildren().then(response => {
          let list = response.data;
          this.productCateOptions = [];
          for (let i = 0; i < list.length; i++) {
            let children = [];
            if (list[i].children != null && list[i].children.length > 0) {
              for (let j = 0; j < list[i].children.length; j++) {
                children.push({label: list[i].children[j].name, value: list[i].children[j].id});
              }
            }
            this.productCateOptions.push({label: list[i].name, value: list[i].id, children: children});
          }
        });
      },
      getBrandList() {
        fetchBrandList({pageNum: 1, pageSize: 100}).then(response => {
          this.brandOptions = [];
          let brandList = response.data.list;
          for (let i = 0; i < brandList.length; i++) {
            this.brandOptions.push({label: brandList[i].name, value: brandList[i].id});
          }
        });
      },
      getCateNameById(id){
        let name=null;
        for(let i=0;i<this.productCateOptions.length;i++){
          for(let j=0;j<this.productCateOptions[i].children.length;j++){
            if(this.productCateOptions[i].children[j].value===id){
              name=this.productCateOptions[i].children[j].label;
              return name;
            }
          }
        }
        return name;
      },
      handleIndex(){
        this.$message({
          message: '已保存',
          center: true,
          type: 'success'
        })
      },
      handleNext(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$emit('nextStep');
          } else {
            this.$message({
              message: '验证失败',
              type: 'error',
              duration:1000
            });
            return false;
          }
        });
      },
      handleBrandChange(val) {
        let brandName = '';
        for (let i = 0; i < this.brandOptions.length; i++) {
          if (this.brandOptions[i].value === val) {
            brandName = this.brandOptions[i].label;
            break;
          }
        }
        this.value.brandName = brandName;
      }
    }
  }
</script>

<style scoped>
</style>
