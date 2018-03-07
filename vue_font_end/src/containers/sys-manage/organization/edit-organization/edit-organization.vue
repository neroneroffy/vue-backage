<template>
  <div class="edit-organization">
    <BastTitle :title = title></BastTitle>

    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80" class="edit-organization-wrapper">
      <FormItem label="名称" prop="name">
        <Input v-model="formValidate.name" placeholder="请输入部门名称"></Input>
      </FormItem>
      <FormItem label="电话" prop="phone">
        <Input v-model="formValidate.phone" placeholder="请填写电话号码"></Input>
      </FormItem>
      <FormItem label="部门" :required=true>
        <Cascader :data="department" v-model="formValidate.departmentSelected"></Cascader>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
        <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
      </FormItem>
    </Form>

  </div>
</template>

<script>
  import BastTitle from '@/components/base-title'
  import { Select,Form,Input,Button,Cascader } from "iview"
  export default {
    name: "edit-organization",
    components:{
      BastTitle
    },
    data () {
      const validateName = (rule, value, callback) => {
        let reg = /[\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5\s\.,]/g;
        if (reg.test(value) || value === "") {
          callback(new Error('请填写正确的部门名称'));
        } else {
          callback();
        }
      };
      const validatePhone = (rule, value, callback) => {
        let phone_re1 = /^1[3|4|7|5|8][0-9]\d{4,8}$/;
        let phone_re2 = /^0\d{2,3}-?\d{7,8}$/;

        let reg = /[\u4e00-\u9fa5a-zA-Z]/g;

        if (value === "" || reg.test(value)) {
          callback(new Error('请填写正确的电话号码'));
        }else {

          callback();
        }
      };

      return {
        title:this.$route.query.id?"编辑组织":"新增组织",
        formValidate: {
          name: '',
          phone: '',
          city: '',
          gender: '',
          interest: [],
          departmentSelected: [],
          date: '',
          time: '',
          desc: ''
        },
        department: [
          {
            value: '123',
            label: '品牌部',
            children: [
              {
                value: '456',
                label: '品牌经营部'
              },
              {
                value: '789',
                label: '品牌营销部'
              },
              {
                value: '321',
                label: '品牌吃饭部'
              }
            ]
          }, {
            value: '4323',
            label: '研发部',
            children: [
              {
                value: '543234',
                label: '研发生产部',
                children: [
                  {
                    value: '765756',
                    label: '研发调查部',
                  }
                ]
              },
              {
                value: '41323',
                label: '研发企划部',
                children: [
                  {
                    value: '98778766',
                    label: '研发帮帮部',
                  },
                  {
                    value: '4455644545',
                    label: '研发明白不',
                  }
                ]
              }
            ],
          }],
        ruleValidate: {
          name: [
            { required: true, validator: validateName, trigger: 'blur' }
          ],
          phone: [
            { required: true, validator: validatePhone, trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid && this.formValidate.departmentSelected.length !== 0) {
            this.$Message.success('成功!');
          }else {
            this.$Message.error('失败!');
          }
        })
      },
      handleReset (name) {
        this.$refs[name].resetFields();
      }
    }
  }
</script>

<style scoped lang="stylus">
@import "./edit-organization.styl";
</style>
