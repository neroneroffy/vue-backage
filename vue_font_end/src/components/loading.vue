<template>
  <div class="loading">
    <Spin fix size="large"></Spin>
  </div>

</template>

<script>
  import { Spin } from 'iview'
    export default {
        name: "loading"
    }
</script>

<style lang="stylus">
  .loading{
    background #fff;
    opacity 0.5;
    width: 100%;
    height: 100%;
    position absolute;
    top:0;
    left:0;
    right:0;
    bottom :0;
    z-index 9999;

  }
</style>
