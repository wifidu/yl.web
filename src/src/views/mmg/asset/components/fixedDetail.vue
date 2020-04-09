<template>
  <div>
    <el-card class="form-container" shadow="never">
      <el-form :inline="true" :rules="rules" label-width="120px" size="small">
        <p>
          <el-form-item  label="资产编号：" prop="name" placeholder="001">
            <el-input :disabled="true" size="mini"></el-input>
          </el-form-item>
          <el-button v-if="editId" size="small">自动生成资产编号</el-button>
        </p>
        <p>
          <el-form-item label="资产名称：" prop="name" placeholder="办公桌">
            <el-input :disabled="!isEdit"></el-input>
          </el-form-item>
          <el-form-item label="分类：" prop="brandId">
            <el-select :disabled="!isEdit" placeholder="办公用品">
              <el-option v-for="item in classificationOptions"
                         :key="item.value"
                         :label="item.type"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </p>
        <p>
                <el-form-item label="序列号：">
                  <el-input :disabled="!isEdit"></el-input>
                </el-form-item>
                <el-form-item label="品牌：">
                  <el-input :disabled="!isEdit"></el-input>
                </el-form-item>
              </p>
        <p>
                <el-form-item label="位置：">
                  <el-input :disabled="!isEdit"></el-input>
                </el-form-item>
                <el-form-item label="型号：">
                  <el-input :disabled="!isEdit"></el-input>
                </el-form-item>
              </p>
        <p>
                <el-form-item label="责任部门：">
                  <el-input :disabled="!isEdit"></el-input>
                </el-form-item>
                <el-form-item label="责任人：">
                  <el-input :disabled="!isEdit"></el-input>
                </el-form-item>
              </p>
        <p>
                <el-form-item label="金额：">
                  <el-input :disabled="!isEdit"></el-input>
                </el-form-item>
                <el-form-item label="状态：" prop="name">
                  <el-input :disabled="!isEdit"></el-input>
                </el-form-item>
              </p>
        <p>
                <el-form-item label="安装日期：" prop="name">
                  <el-date-picker
                    :disabled="!isEdit"
                    type="date"
                    placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="保修期：">
                  <el-date-picker
                    :disabled="!isEdit"
                    type="date"
                    placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
              </p>
        <p>
          <el-form-item label="备注：">
            <el-input
              :disabled="!isEdit"
              type="textarea"
              :rows="2"
              style="width: 500px">
            </el-input>
          </el-form-item>
        </p>
        <el-form-item v-if="isEdit" label="图片：">
                <el-upload
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
        <el-button type="success" size="mini" @click="handleSave" v-if="isEdit">保存</el-button>
        <el-button size="mini" @click="handleCancel" v-if="isEdit">取消</el-button>
      </el-form>
    </el-card>

  </div>
</template>

<script>
  export default {
    name: "fixedDetail",
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
        classificationOptions: [],
        rules: {
          name: [
            {required: true, message: '该项为必填项', trigger: 'blur'},
          ],
        }
      };
    },
    methods: {
      handleSave(){
        this.$message({
          message: '已保存',
          center: true,
          type: 'success'
        })
      },
      handleCancel() {
        this.$router.back();
      },
      handleRemove() {
        console.log('??');
      }
    }
  }
</script>

<style scoped>
  .form-container {
    width: 800px;
  }
</style>
