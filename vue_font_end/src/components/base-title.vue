<template>
    <div class="title">
      {{title}}
    </div>
</template>

<script>
    export default {
      name: "base-title",
      props:{
        title:{
          type:String,
          required:true
        }
      }
    }
</script>

<style scoped lang="stylus">
  .title {
    font-size 20px
    color #666
    margin-bottom 35px
    position relative
    padding-left 15px
    &:before {
      content ""
      display block
      position absolute
      top 4px
      left 0
      width 5px
      height 20px
      background #2d8cf0
    }
  }
</style>
