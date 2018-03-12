<template>
  <div class="stock">
    <Row type="flex" justify="space-between">
      <Col span="4">
      <DatePicker type="daterange" v-model="time" :value="time" on-change="time"></DatePicker>
      </Col>

      <Col sapn="18">
      <Form ref="formInline" :model="searchContent" inline>
        <FormItem prop="id">
          <Select v-model="searchContent.id" :value="searchContent.id" style="width:200px" placeholder="请选择仓库">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem prop="account">
          <Input type="text" v-model="searchContent.account" placeholder="请输入搜索账户"/>
        </FormItem>
        <FormItem prop="phone">
          <Input type="text" v-model="searchContent.phone" placeholder="请输入搜索电话"/>
        </FormItem>
        <FormItem>
          <Button type="primary" icon="ios-search" @click="handleSubmit('formInline')">搜索</Button>
        </FormItem>
        <FormItem>
          <Button type="primary" icon="ios-archive" @click="educe()">导出盘点单</Button>
        </FormItem>
        <FormItem>
          <Button type="primary" icon="ios-search" @click="make()">生成盘点单</Button>
        </FormItem>
      </Form>
      </Col>
    </Row>
    <Tabs v-model="status" :value="status">
      <TabPane label="商品" name="commodity" >标签一的内容</TabPane>
      <TabPane label="赠品" name="present" >标签二的内容</TabPane>
      <TabPane label="物料" name="materiel" >标签三的内容</TabPane>
    </Tabs>
  </div>
</template>

<script>
  import iview from 'iview';
  import Collapse from "iview/src/components/collapse/collapse";

  export default {
    components: {Collapse},
    name: "stock-taking",
    data() {
      return {
        time: [new Date(), new Date()],
        searchContent: {
          id:"",
          account:"",
          phone:""
        },
        status:"commodity",
        cityList:[
          {
            value: '',
            label: '请选择仓库'
          },
          {
            value: 'New York',
            label: 'New York'
          },
          {
            value: 'London',
            label: 'London'
          },
          {
            value: 'Sydney',
            label: 'Sydney'
          },
        ]
      }
    },
    mounted(){

    },
    methods:{
      //提交搜索
      handleSubmit(){
        console.log(this.searchContent)
      },
      //导出盘点单
      educe(){
        console.log('educe')
      },
      //生成盘点单
      make(){
        console.log('make')
      }
    }


  }
</script>

<style scoped>

</style>
