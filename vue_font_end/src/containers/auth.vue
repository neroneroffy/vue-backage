<template>
    <div></div>
</template>

<script>
    export default {
        name: "authRoute",
      mounted(){
        console.log("用户进入主页面")

        let xAuthToken = localStorage.getItem('xAuthToken');
        let user = JSON.parse(localStorage.getItem('user'));
        if(!xAuthToken || !user){
          console.log("用户不存在")
          this.$router.push('/login')
          return
        }
        this.user = user;
        console.log(this.user);
        //验证token
        console.log(xAuthToken);
        if(!xAuthToken){
          this.$router.push('/login');
        }else{
          this.$http.get(`${this.$host}/validate`).then(response=>{
            //如果用户token失效，那么return
            if(!response){
              return
            }
            if(response.data.flag === 'SESSION_INVALID'){
              console.log('失效');
              this.$router.push('/login');
            }else{
              localStorage.setItem('user',JSON.stringify(response.data.data));
              this.user = JSON.parse(localStorage.getItem('user'));
              console.log('验证通过');
              let currentPath = sessionStorage.getItem("currentPath");
              let lastPath = sessionStorage.getItem("lastPath");
              this.$router.push(lastPath)
/*
              if(lastPath === '/index'){
                this.$router.push("/index")
              }else{
                this.$router.push(currentPath)
              }
*/
            }
          })
        };

      }

    }
</script>

<style scoped>

</style>
