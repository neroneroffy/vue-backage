<template>
  <div class="edit-organization">
    <BastTitle :title = title></BastTitle>

    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80" class="edit-organization-wrapper">
      <FormItem label="部门名称" prop="orgName">
        <Input v-model="formValidate.orgName" placeholder="请输入部门名称"></Input>
      </FormItem>
      <FormItem label="部门编码" prop="orgCode">
        <Input v-model="formValidate.orgCode" placeholder="请填写部门编码"></Input>
      </FormItem>
      <FormItem label="上级部门">
        <Select v-model="formValidate.parentId" >
          <Option v-for="item in parentOrg" :value="item.id" :key="item.id" :disabled="formValidate.id === item.id">{{ item.orgName }}</Option>
        </Select>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>

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

        let reg = /[\u4e00-\u9fa5|\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5\s\.,]/g;

        if (value === "" || reg.test(value)) {
          callback(new Error('请填写正确的部门编码'));
        }else {

          callback();
        }
      };

      return {
        api:"http://192.168.31.174:8080",
        title:this.$route.query.id?"编辑组织":"新增组织",
        formValidate: {
          orgName:"",
          orgCode:"",
          parentId:"",
          id:""
        },

        parentOrg:[
          {
            "orgName":"请选择上级部门",
            "id":""
          }
        ],
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
          orgName: [
            { required: true, validator: validateName, trigger: 'blur' }
          ],
          orgCode: [
            { required: true, validator: validatePhone, trigger: 'blur' }
          ]
        }
      }
    },
    mounted(){
      this.$http.get(`${this.api}/sys/org/orgList`).then(response=>{
        let res = response.data;
        if(res.result){
          res.data.forEach(v=>{
            this.parentOrg.push(v)
          });
          console.log(this.parentOrg);
        }
      });
      if(this.$route.query.id){
        this.$http.get(`${this.api}/sys/org/updatePre`,{
          params:{id:this.$route.query.id}
        }).then(response=>{
          let res = response.data;
          if(res.result){
            this.formValidate.orgCode = res.data.orgCode;
            this.formValidate.orgName = res.data.orgName;
            this.formValidate.id = res.data.id;
            this.id = res.data.id;
            if(res.data.parent){
              this.formValidate.parentId = res.data.parent.id;
            }


          }
        })
      }


    },
    methods: {
      handleSubmit (name) {

        this.$refs[name].validate((valid) => {
          if (valid) {
            let url = this.$route.query.id?`${this.api}/sys/org/update`:`${this.api}/sys/org/add`;
            this.$http.post(url,{...this.formValidate}).then(response=>{
              let res = response.data;
              if(res.result){
                this.$router.push('/sys/organization')
              }else{
                this.$Message.error(res.msg);
              }
            })
            this.$Message.success('成功!');
          }else {
            this.$Message.error('请检查所填信息是否正确');
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
