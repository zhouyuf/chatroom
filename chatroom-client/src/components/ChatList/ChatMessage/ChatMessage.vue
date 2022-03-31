<template>
  <n-space vertical>
    <div class="user">
      {{userName}}&nbsp;:
    </div>
    <div class="message">
      {{userMessage}}
    </div>
  </n-space>
</template>

<script lang="ts">
  import {defineComponent, ref, toRef} from 'vue';
  const props = {
    userName: {type: String, default: '匿名'},
    userMessage: {type: String, default: ''}
  };
  export default defineComponent({
    props,
    //emits: ['onStarted', 'onFinished'],
    setup(props) {
      const userMessage = toRef(props, "userMessage");
      const userName = toRef(props, "userName");
      return{
        userName,
        userMessage
      }
    }
  })
</script>

<style lang="less" scoped>
  .user {
    margin-left: 15px;
    font-size: 15px;
  }
  .message{
    width: max-content;
    max-width: calc(80% - 20px);
    padding: 5px 5px;
    margin: 0 ;
    font-size: 18px;
    margin-left: 20px;
    border: 1px solid black;
    border-radius: 10px;
    word-wrap: break-word;
  }
  // .message {
  //   width: min-content;
  //   height: max-content
  // }
</style>