<template>
    <div class="month-sales">
      <div id="month-sales">每月销量</div>
    </div>
</template>

<script>
  import axios from 'axios';
  import {API} from '../../../const/api';
    export default {
      name: "month-sales",
      data(){
        return {

        }
      },
      mounted(){
        this.$nextTick(()=>{
          this.linkRelative();
        })
/*        axios.get(`${API}/charts`).then(response=>{
          let res = response.data;
          if(res.result){
            this.yearSaleData = res.data[0].yearSaleData;
            console.log(res.data);
            this.linkRelative();
          }
        });*/
      },
      methods:{
        //每月销量初始化图表
        linkRelative(){
          let monthSales =  this.$echarts.init(document.getElementById('month-sales'));
          const option = {
            title: {
              text: '每月销售量',
              left:"left"
            },
            tooltip: {
              trigger: 'axis'
            },

            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },

            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: ['2017-1','2017-2','2017-3','2017-4','2017-5','2017-6','2017-8']
            },
            yAxis: {
              type: 'value'
            },
            series: [
              {
                name:'销售量',
                type:'line',
                stack: '总量',
                data:[120, 132, 101, 134, 90, 230, 210]
              }
            ]
          };
          monthSales.setOption(option);
          window.addEventListener('resize', function () {
            monthSales.resize();
          });
        },
      }
    }
</script>

<style lang="stylus">
  @import './month-sales.styl'
</style>
