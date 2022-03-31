<template>
  <div class="friendItem">
    <div class="friendItem-name">
      {{card.friendName}}
    </div>
    <div class="friendItem-message">
      {{card.lastMessage}}
    </div>
  </div>
</template>

<script lang="ts">
  import {defineComponent, reactive, ref, toRef} from 'vue'
  const props = {
    friendName: {type: String, default: '匿名'},
    lastMessage: {type: String, default: '无本地消息'}
  };
  export default defineComponent({
    props,
    //emits: ['onStarted', 'onFinished'],
    setup(props) {
      const card = reactive(props);
      return{
        card
      }
    }
  })
</script>

<style lang="less" scoped>
  .friendItem :hover{
    cursor: pointer;
  }
  .friendItem {
    &-name {
      padding-left: 20px;
      font-size: 18px;
    }
    &-message {
      padding-left: 20px;
      font-size: 16px;
      width: 80%;
      overflow-x: hidden;
    }
  }
</style>