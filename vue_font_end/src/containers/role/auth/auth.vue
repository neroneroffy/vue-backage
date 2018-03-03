<template>
  <div class="auth">
    <div class="title">角色授权</div>
    <Form :model="roleInfo" :label-width="40">
      <FormItem label="ID">
        <Input v-model="roleInfo.roleId" disabled />
      </FormItem>
      <FormItem label="名称">
        <Input v-model="roleInfo.roleName" disabled />
      </FormItem>
      <FormItem label="编码">
        <Input v-model="roleInfo.roleCode" disabled />
      </FormItem>
      <FormItem label="备注">
        <Input v-model="roleInfo.remark" disabled type="textarea" :autosize="{minRows: 2,maxRows: 5}" />
      </FormItem>
    </Form>


    <div class="auth-wrapper">
      <Tree v-if="authInfo" :data="authInfo" show-checkbox @select-change="select"  @on-check-change="check" multiple></Tree>
    </div>
    <div class="submit-button">
      <Button type="primary" @click="submit">提交</Button>
    </div>

     <!-- <div v-model="secondCheckGroup" class="second-level" v-for="(item,k) in authInfo">
        <div class="second-level-title">

          <Checkbox
            :value="checkedInfo[i][k].length===item.children.length"
            :key="item.id"
            :indeterminate="checkedInfo[i][k].length!==item.children.length && checkedInfo[i][k].length!==0"
            @click.prevent.native="thirdAll(i,k)"
          >
            {{item.name}}
          </Checkbox>
        </div>
        {{`选中的个数-&#45;&#45;&#45;&#45;&#45;&#45;${checkedInfo[i][k].length}`}}
            <CheckboxGroup class="third-level" v-model="checkedInfo[i][k]">
              <Checkbox v-for="m in item.children" :label="m.id" :key="m.id">
                {{m.name}}
              </Checkbox>
            </CheckboxGroup>

      </div>-->



  </div>
</template>

<script>
  import axios from 'axios';
  import { API } from "../../../const/api";
  import { Form,Checkbox,Input,Button } from 'iview'
    export default {
      name: "auth",
      data(){
        return {
          roleInfo:{
            roleId:"",
            roleName:"",
            roleCode:"",
            remark:""
          },
          authInfo:[],
          checkedInfo:[],
          noCheck:[],
          test:["9976332783"],
          checked:"",
          data2: [
            {
              title: 'parent 1',
              expand: true,
              children: [
                {
                  title: 'parent 1-1',
                  expand: true,
                  children: [
                    {
                      title: 'leaf 1-1-1'
                    },
                    {
                      title: 'leaf 1-1-2'
                    }
                  ]
                },
                {
                  title: 'parent 1-2',
                  expand: true,
                  children: [
                    {
                      title: 'leaf 1-2-1'
                    },
                    {
                      title: 'leaf 1-2-1'
                    }
                  ]
                }
              ]
            }
          ]
        }
      },
      created(){
        axios.get(`${API}/role/info`,{
          params:{
            id:this.$route.query.id
          }
        }).then(response=>{
          let res = response.data;
          if(res.result){
            console.log(res);
            this.roleInfo = res.data.roleInfo;
            this.authInfo = res.data.authInfo;
            this.authInfo.forEach(v=>{
              if(v.children){
                v.expand=true;
                v.children.forEach(i=>{
                  if(i.children){
                    i.expand = true;
                    i.children.forEach(k=>{
                      if(res.data.alreadyAuth.indexOf(k.id)>0){
                        k.checked = true;
                      }
                    })
                  }
                })
              }
            });
          }
        });


      },
      methods:{
        selectAll(i){
          if(!this.checkAll[i]){
            this.authInfo[i].children.forEach((v,k)=>{
              this.checkedInfo[i][k] = [];
              let tempArr = [];
              v.children.forEach(m=>{
                tempArr.push(m.id);
                this.$set(this.checkedInfo[i],k,tempArr)
              })

            });
            this.checkAll[i] = true;
            this.noCheck[i] = false;
            console.log(this.checkAll[i])
          }else{
            this.authInfo[i].children.forEach((v,k)=>{
              this.checkedInfo[i][k] = [];
              let tempArr = [];
              v.children.forEach(m=>{
                tempArr.push(m.id);
                //console.log();
                this.$set(this.checkedInfo[i],k,[])
              })

            });
            this.checkAll[i] = false;


          }


          console.log(this.authInfo);
/*
          this.authInfo[i].forEach((j,k)=>{
            console.log(j);
            //this.checkedInfo[i][k].push(j.id)
          })
*/


        },
        select(data){
          console.log(`选择${JSON.stringify(data)}`);
        },
        check(data){
          this.checked = data

          this.authInfo.forEach(v=>{
            if(v.children){
              v.children.forEach(k=>{
                if(k.children){
                  k.children.forEach(j=>{
                    if(j.checked === false){
                      delete j.checked
                    }
                  })
                }
              })
            }
          });
        },
        submit(){
          console.log(this.checked)
        }
      },
      computed:{


      }
    }
</script>

<style lang="stylus">
  @import 'auth.styl'
</style>
