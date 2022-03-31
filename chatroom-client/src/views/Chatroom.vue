<template>
  <div class="view-account">
    <div class="view-account-header"></div>
    <div class="view-account-content">
      <div class="chat-menu">
        <FriendCard v-for="item in friendList" @click="changeFriend(item)" :friendName="item"></FriendCard>
      </div>
      <div class="chat-area">
        <n-layout has-sider bordered>
        <n-layout-sider style="height: 330px;"  :native-scrollbar="false" bordered>
          <ChatMessage v-for="item in chatMessageList" :userMessage="item.message" :userName="item.name"></ChatMessage>
        </n-layout-sider>
        </n-layout>
        <n-input 
          v-model:value="message" 
          type="textarea" 
          @keydown.enter="submit"
          placeholder="......"
          :autosize="{minRows:4,maxRows:4}"
          />
        <n-button @click="submit">Send</n-button>
      </div>
    </div>
    <div class="view-account-footer">
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, onUpdated, reactive, ref } from 'vue'
  import { ChatMessage } from '@/components/ChatList/ChatMessage';
  import { FriendCard } from '@/components/FriendItem';
  import { useUserStore } from '@/store/modules/user';
  import { useMessageListStore } from '@/store/modules/messageList';
  import { login, getFriendList } from '@/api/system/user';
  import { io } from "socket.io-client";
  import { LOCALSERVER, LOCALWSSERVER } from '@/base';

  const socket = io(LOCALWSSERVER);

  const message = ref(null);
  const chatMessageList = ref([]);
  const friendList = ref([]); 
  const store = useUserStore();
  const messageStore = useMessageListStore();
  const currentFriend = ref('');

  const changeFriend = (friendName) => {
    console.log(friendName);
    if(currentFriend.value == friendName) return;
    currentFriend.value = friendName;
    // messageStore.messageClear();
    messageStore.messageLoad(friendName);
    chatMessageList.value = messageStore.getMessageList != null ? messageStore.getMessageList:[];
  }

  const submit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if(!message.value) return;
    socket.emit("message", message.value);
    chatMessageList.value.push({message: message.value, name: store.getUserName});
    messageStore.messageSave();
    message.value = null;
    // login().then((res) => {
    //   chatMessageList.value.push({message: message.value, name: store.getUserName});
    //   messageStore.messageSave();
    //   message.value = null;
    // });
  }

  onMounted (() => {
    socket.on("message", (data) => {
      console.log("服务端响应：",data);
    })
    getFriendList({name: store.getUserInfo.name}).then((res) => {
      friendList.value = JSON.parse(res.data.friendList);
      currentFriend.value = friendList.value[0];
      messageStore.messageLoad(currentFriend.value);
      chatMessageList.value = messageStore.getMessageList != null ? messageStore.getMessageList:[];
    })
  })

  onUpdated (() => {
    const chatWindow = document.getElementsByClassName('chat-window')[0];
    chatWindow.scrollTop = chatWindow.scrollHeight;
  })

</script>

<style lang="less" scoped>
  .view-account {
    display: flex;
    flex-direction: column;
    width: 100vw;
    max-width: 600px;
    margin: 0 auto;

    &-header {
      height: 50px;
      //background-color: aqua;
    }

    &-content {
      display: flex;
      flex-direction: row;
      margin: 0;
      font-size: 30px;
      text-align: left;
      height: 500px;
      border: 1px solid #000000;
      border-radius: 10px;
    }

    &-footer {
      height: 150px;
      //background-color: aqua;
    }
  }
  .chat-menu {
    display: block;
    // height: 100%;
    width: 35%;
    border-right: 1px solid #000000;
  }
  .chat-area {
    display: block;
    width: 65%;
  }
  .chat-window {
    height: 337px;
    overflow-y: scroll;
  }
  .n-button {
    margin: 0px;
  }
  .n-input {
    margin: 0px;
  }
</style>