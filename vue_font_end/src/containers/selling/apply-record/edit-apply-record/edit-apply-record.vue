<template>
  <div class="edit-apply-record">
    <div class="search-wrapper">
      <div></div>
      <div class="check-option">
        <Select v-model="submitData.status" style="width:200px;marginRight:30px">
          <Option v-for="item in statusList" :value="item.status" :key="item.status">{{ item.txt }}</Option>
        </Select>
        <Button type="primary">提交</Button>
      </div>
    </div>
    <Table :columns="columns" :data="listData" class="table"></Table>
    <div class="remark">
      <Row>
        <Col span="11">
        <Card>
          <span slot="title">收货地址</span>
          {{this.$route.query.address}}        </Card>
        </Col>
        <Col span="11" offset="2">
        <Card>
          <span slot="title">单据备注</span>
          {{this.$route.query.mark}}
        </Card>
        </Col>
      </Row>


    </div>
  </div>
</template>

<script>
    export default {
      name: "edit-apply-record",
      data(){
          return {
            columns:[

              {
                title:"货物名称",
                key:"goodsName"
              },
              {
                title:"单位",
                key:"unitsId"
              },
              {
                title:"数量",
                key:"num"
              },
              {
                title:"备注",
                key:"mark"
              }
            ],
            api:"",
            listData:[],
            status:this.$route.query.status,
            baseData:{
              code:"",
              date:"",
              customerName:"",
              mark:""
            },
            submitData:{
              status:this.$route.query.status
            },
            statusList:[
              {
                status:"UNAUDIT",
                txt:"待审核"
              },
              {
                status:"UNSEND",
                txt:"未发货"
              },
              {
                status:"ALLSEND",
                txt:"已发货"
              },
              {
                status:"COMPLETE",
                txt:"已完成"
              },
              {
                status:"REPULSE",
                txt:"已拒绝"
              },
              {
                status:"CLOSE",
                txt:"已关闭"
              }
            ]
          }
      },
      mounted(){
        console.log(this.$route.query.id)
        this.$http.get(`http://192.168.31.34:8080/base/goodsApplyItem/findAllGoodsApplyItem`,{params:{id:this.$route.query.id}}).then(response=>{
          console.log(response)
          let res = response.data;
          if(res.result){
            this.listData = res.data
          }
        })
      },
      methods:{
        tagColor(flag){
          switch (flag){
            case "UNAUDIT":
              return {
                color:"blue",
                txt:"待审核"
              };
              break;
            case "UNSEND":
              return {
                color:"yellow",
                txt:"未发货"
              };
            case "ALLSEND":
              return {
                color:"#9F8EFF",
                txt:"已发货"
              };
              break;
            case "COMPLETE":
              return {
                color:"green",
                txt:"已完成"
              };
              break;
            case "REPULSE":
              return {
                color:"red",
                txt:"已拒绝"
              };
              break;
            case "CLOSE":
              return {
                color:"#c9c9c9",
                txt:"已拒绝"
              };
              break;
            default:
              return {
                color:"#c2c99f",
                txt:"未定义状态"

              }

          }
        },

      },
      computed:{

      }
    }
</script>

<style scoped lang="stylus">
  @import "./edit-apply-record.styl"

</style>
