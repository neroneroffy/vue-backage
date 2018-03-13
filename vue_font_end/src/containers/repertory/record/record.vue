<template>
  <!--盘点查询-->
  <div class="stock">
    <Row type="flex" justify="space-between">
          <Form ref="formInline" :model="searchContent" on-change="time" inline>
            <DatePicker type="daterange" v-model="searchContent.time" :value="searchContent.time"></DatePicker>
            <FormItem prop="id">
              <Select v-model="searchContent.id" :value="searchContent.id" style="width:200px" placeholder="请选择仓库">
                <Option v-for="item in cityList1" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </FormItem>
            <FormItem prop="id">
              <Select v-model="searchContent.status" :value="searchContent.status" style="width:200px" placeholder="请选择类型">
                <Option v-for="item in cityList2" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </FormItem>
          </Form>
    </Row>
    <Table border :columns="commodityType" :data="commodity"></Table>
  </div>
</template>

<script>
    export default {
        name: "record",
        data(){
          return{
            commodityType:[
              {

               }
            ],
            commodity:[],
            searchContent:{
              time:[new Date(new Date().getTime() - 86400000), new Date()],
              id:"",
              status:""
            },
            cityList1:[],
            cityList2:[]
          }
        },
        methods:{

        }
    }
</script>

<style scoped>

</style>

