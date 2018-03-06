<template>
    <div class="edit-commodity">
      <BastTitle :title="title"></BastTitle>

      <Form ref="editData" :model="editData" :label-width="40" v-if="editData" label-position="left">
        <FormItem label="名称" prop="id">
          <Input v-model="editData.id" :disabled="checkMember" placeholder="请输入ID" />
        </FormItem>
        <FormItem label="账户" prop="account">
          <Input v-model="editData.account" :disabled="checkMember" placeholder="请输入账户"/>
        </FormItem>
        <FormItem label="角色" prop="role">
          <Select v-model="editData.roleId" :disabled="checkMember"  placeholder="请选择角色" @on-change = 'roleChange'>
            <Option :value="v.roleId" :key="v.roleId" v-for="v in editRoleList">{{v.roleName}}</Option>
          </Select>
        </FormItem>
        <FormItem label="电话" prop="phone">
          <Input v-model="editData.phone" placeholder="请输入电话" :disabled="checkMember"/>
        </FormItem>
        <FormItem label="备注" prop="remark">
          <Input v-model="editData.remark" :disabled="checkMember" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请填写备注"/>
        </FormItem>
        <FormItem v-if="!checkMember" >
          <Button type="primary" @click="submit">提交</Button>
        </FormItem>
      </Form>

    </div>
</template>

<script>
  import BastTitle from "@/components/title";
  import { Form,Select,Upload,Avatar,Button } from 'iview'
    export default {
      name: "edit-commodity",
      data(){
        return {
          title:this.$route.query.id?'编辑商品':'新增商品',
          editData:{
            name:"",
            unit:"",
            price:"",
            weight:""
          },
          checkMember:false,
          editRoleList: [
            {
              roleId: 'role1',
              roleName: '角色1'
            },
            {
              roleId: 'role2',
              roleName: '角色2'
            },
            {
              roleId: 'role3',
              roleName: '角色3'
            },
            {
              roleId: 'role4',
              roleName: '角色4'
            }
          ]
        }
      },
      components:{
        BastTitle
      }
    }
</script>

<style scoped lang="stylus">
@import './edit-commodity.styl'
</style>
