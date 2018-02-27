<template>
  <div class="year-grow">
    <div id="year-grow">同比增长</div>
  </div>
</template>

<script>
  import axios from 'axios';
  import {API} from '../../../const/api';
    export default {
      name: "year-grow",
      mounted(){
        axios.get(`${API}/charts`).then(response=>{
          let res = response.data;
          if(res.result){
            this.yearSaleData = res.data[0].yearSaleData;
            console.log(res.data[0].yearSaleData.dataPrev,res.data[0].yearSaleData.dataNow);
            this.year(res.data[0].yearSaleData.dataPrev,res.data[0].yearSaleData.dataNow);
          }
        });
      },
      methods:{
        //同比
        year(prev,now){
          let year =  this.$echarts.init(document.getElementById('year-grow'));
          const colors = ['#5793f3', '#d14a61', '#675bba'];
          const option = {
            color: colors,
            title: {
              left: 'left',
              text: '同比增长',
            },
            tooltip: {
              trigger: 'none',
              axisPointer: {
                type: 'cross'
              }
            },
            legend: {
              data:['2017销售量', '2018销售量'],
              bottom:-5
            },
            grid: {
              top: 70,
              bottom: 50
            },
            xAxis: [
              {
                type: 'category',
                axisTick: {
                  alignWithLabel: true
                },
                axisLine: {
                  onZero: false,
                  lineStyle: {
                    color: colors[1]
                  }
                },
                axisPointer: {
                  label: {
                    formatter: function (params) {
                      return '销售量  ' + params.value
                        + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
                    }
                  }
                },
                data: ["2018-1", "2018-2", "2018-3", "2018-4", "2018-5", "2018-6", "2018-7", "2018-8", "2018-9", "2018-10", "2018-11", "2018-12"]
              },
              {
                type: 'category',
                axisTick: {
                  alignWithLabel: true
                },
                axisLine: {
                  onZero: false,
                  lineStyle: {
                    color: colors[0]
                  }
                },
                axisPointer: {
                  label: {
                    formatter: function (params) {
                      return '销售量  ' + params.value
                        + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
                    }
                  }
                },
                data: ["2017-1", "2017-2", "2017-3", "2017-4", "2017-5", "2017-6", "2017-7", "2017-8", "2017-9", "2017-10", "2017-11", "2017-12"]
              }
            ],
            yAxis: [
              {
                type: 'value'
              }
            ],
            series: [
              {
                name:'2017销售量',
                type:'line',
                xAxisIndex: 1,
                smooth: true,
                data: prev
              },
              {
                name:'2018销售量',
                type:'line',
                smooth: true,
                data: now
              }
            ]
          };
          year.setOption(option);
          window.addEventListener('resize', function () {
            year.resize();
          });
        }
      }
    }
</script>

<style lang="stylus">
  @import './year-grow.styl'
</style>
