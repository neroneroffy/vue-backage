<template>
  <div class="auth">
    <div class="title">角色权限</div>
    <Form :model="roleInfo" :label-width="40" v-if="authInfo">
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
        <Input v-model="roleInfo.mark" disabled type="textarea" :autosize="{minRows: 2,maxRows: 5}" />
      </FormItem>
    </Form>
    <div class="auth-wrapper">
      <Tree v-if="authInfo" :data="authInfo" show-checkbox  @on-check-change="check" multiple></Tree>
    </div>
    <div class="submit-button" v-if="authInfo" v-show="!this.$route.query.checked">
      <Button type="primary" @click="submit">提交</Button>
    </div>


  </div>
</template>

<script>

  import { Form,Checkbox,Input,Button } from 'iview'
    export default {
      name: "auth",
      data(){
        return {
          roleInfo:{
            roleId:"",
            roleName:"",
            roleCode:"",
            mark:""
          },
          authInfo:"",
          checkedInfo:[],
          noCheck:[],
          test:["9976332783"],
          checked:[],
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
          ],
          api:"http://192.168.31.174:8080",
          checkedId:[]
        }
      },
      created(){
        this.$http.get(`${this.api}/sys/role/authPre`,{
          params:{
            id:this.$route.query.id
          }
        }).then(response=>{
          let res = response.data;
          if(res.result){
            console.log(res.data);
            this.roleInfo.roleId = res.data.id;
            this.roleInfo.roleName = res.data.roleName;
            this.roleInfo.roleCode = res.data.roleCode;
            this.roleInfo.mark = res.data.mark;
            this.checkedId = res.data.resourceIdList
            this.authInfo = res.data.resourceList;
            if(this.$route.query.checked){
              this.authInfo.forEach(v=>{
                v.title = v.resourceName;
                v.disabled = true;
                if(v.children.length!==0){
                  v.expand=true;

                  v.children.forEach(i=>{
                    i.title = i.resourceName;
                    i.disabled = true;
                    if(i.children.length!==0){

                      i.expand = true;
                      i.children.forEach(k=>{
                        k.title = k.resourceName;
                        k.disabled = true;
                        if(res.data.resourceIdList.indexOf(k.id)>=0){
                          k.checked = true;
                        }
                      })
                    }else{
                      if(res.data.resourceIdList.indexOf(i.id)>=0){
                        i.checked = true;
                      }
                    }
                  })
                }else{
                  if(res.data.resourceIdList.indexOf(v.id)>=0){
                    v.checked = true;
                  }
                }
              });
              return
            }
            this.authInfo.forEach(v=>{
              v.title = v.resourceName
              if(v.children.length!==0){
                v.expand=true;
                v.children.forEach(i=>{
                  i.title = i.resourceName
                  if(i.children.length!==0){
                    i.expand = true;
                    i.children.forEach(k=>{
                      k.title = k.resourceName
                      if(res.data.resourceIdList.indexOf(k.id)>=0){
                        console.log(k.id);
                        k.checked = true;
                      }
                    })
                  }else{
                    if(res.data.resourceIdList.indexOf(i.id)>=0){
                      console.log(i.id);
                      i.checked = true;
                    }
                  }
                })
              }else{
                if(res.data.resourceIdList.indexOf(v.id)>=0){
                  console.log(v.id);
                  v.checked = true;
                }
              }
            });
          }
        });


      },
      methods:{

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

          let checkedId = [];
          if(this.checked.length!==0){
           this.checked.forEach(v=>{
             checkedId.push(v.id)
           });
          }
          checkedId = checkedId.concat(this.checkedId);
          checkedId = Array.from(new Set(checkedId));

          let submitData = {
            roleId:this.$route.query.id,
            checkedId
          };
          console.log(submitData)
        }
      },
      computed:{


      }
    }
</script>

<style lang="stylus">
  @import 'auth.styl'
</style>
