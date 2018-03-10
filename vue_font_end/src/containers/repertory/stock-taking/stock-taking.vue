<template>
  <div class="stock">
      <Row type="flex" justify="space-between">
        <Col span="4">
             <DatePicker  type="daterange" v-model="time" :value="time" on-change="time"></DatePicker>
        </Col>
        <Col sapn="18">
            <Form ref="formInline" :model="searchContent" inline>
          <FormItem prop="user">
            <Input type="text" v-model="searchContent.id" placeholder="请输入仓库名称"/>
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
            <Button type="primary" icon="ios-archive" @click="">导出盘点单</Button>
          </FormItem>
          <FormItem>
            <Button type="primary" icon="ios-search" @click="">生成盘点单</Button>
          </FormItem>
        </Form>
        </Col>
      </Row>

  </div>
</template>

<script>
    import iview from 'iview';
    import Collapse from "iview/src/components/collapse/collapse";
    export default {
      components: {Collapse},
      name: "stock-taking",
        data(){
          return {
            time:[new Date(),new Date()],
            searchContent:{}
          }
        },

    }
</script>

<style scoped>

</style>
