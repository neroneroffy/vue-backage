<template>
    <div class="edit-unit">
      <BaseTitle :title="title"></BaseTitle>
      <Form ref="editData" :model="editData" :label-width="100">
        <FormItem label="基础计量单位" prop="units">
          <Input v-model="editData.baseUnit" placeholder="请输入单位名称" style="width: 200px"/>
        </FormItem>
        <FormItem label="类型" prop="units">
          <Select :value="defaultType.value" style="width:200px" @on-change="typeSelectDone">
            <Option v-for="item in type" :value="item.value" :key="item.value">{{ item.name }}</Option>
          </Select>
          <Button type="primary" @click="addUnit" style="margin-left: 75px" v-if="editData.unitsType === 'DOUBLE'">添加单位</Button>

        </FormItem>
      </Form>

      <div  v-if="editData.unitsType === 'DOUBLE'">
        <Form inline :label-width="100" v-for="(v,i) in units">
          <FormItem label="副单位名称" prop="units">
            <Input placeholder="请输入单位名称" style="width: 200px" v-model="v.viceUnit"/>
          </FormItem>
          <FormItem label="换算" v-if="editData.unitsType === 'DOUBLE'">
            <Input placeholder="数量" v-model="v.num">
            <span slot="append">{{editData.baseUnit?editData.baseUnit:"待输入"}}</span>
            </Input>
          </FormItem>
          <FormItem>
            <Button @click="delUnit(i)">删除</Button>
          </FormItem>
        </Form>
      </div>

      <Button @click="submit" type="primary" style="marginLeft:100px">提交</Button>


    </div>
</template>

<script>
  import BaseTitle from "@/components/base-title";
  import { Form,FormItem,Select } from 'iview';
    export default {
      name: "edit-unit",
      data(){
          return {
            title:this.$route.query.id?'编辑单位':'新增单位',
            defaultType:"",
            editData:{
              baseUnit:"",
              units:"",
              unitsType:""
            },
            type:[
              {
                name:"基础计量单位",
                value:"SINGLE"
              },
              {
                name:"复合计量单位",
                value:"DOUBLE"
              },
            ],
            units:[

            ]
          }

      },
      components:{
        BaseTitle
      },
      mounted(){
        if(this.$route.query.id){
          this.$http.get(`/static/units${this.$route.query.id}.json`).then(res=>{
            if(res.data.result){
              this.editData = res.data.data;
              this.defaultType = this.editData.unitsType;
              this.units = res.data.units
            }
          })
        }else{
          this.defaultType = {
            name:"基础计量单位",
            value:"SINGLE"
          }
        }

      },
      methods:{
        //当选择复合单位时候且复合单位的数组不为0时，向数组中push一个对象
        typeSelectDone(data){
          this.editData.unitsType = data;
          if(data === "DOUBLE" && this.units.length === 0){
            this.units.push({
              viceUnit:"",
              num:""
            })
          }
        },
        submit(){
          if(this.editData.baseUnit === ""){
            this.$Message.error('基本单位不能为空');
            return
          }
          let unit = "";
          let unitTemp = [`${this.editData.baseUnit}`];
          let numTemp = [`1`];

          if(this.editData.unitsType === "DOUBLE"){
            this.units.forEach(v=>{
              unitTemp.push(v.viceUnit);
              numTemp.push(v.num)
            });
            unit = `${unitTemp.join(',')}(${numTemp.join(',')})`;
          }
          let submitData = {
            units:unit,
            baseUnit:this.editData.baseUnit,
            unitsType:this.editData.unitsType
          };
          console.log(submitData)
        },
        addUnit(){
          this.units.push({
            viceUnit:"",
            num:""
          })

        },
        //删除单位
        delUnit(i){
          this.units.splice(i,1)
        }
      }
    }
</script>

<style scoped lang="stylus">
  @import "./edit-unit.styl";
</style>
