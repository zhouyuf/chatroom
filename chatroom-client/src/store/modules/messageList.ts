import { store } from '@/store'
import { defineStore } from 'pinia'
import { createStorage } from '@/utils/Storage'
import { storage } from '@/utils/Storage'

const Storage = createStorage({ storage: localStorage });

export interface IMessage {
  isFriend: boolean | null,
  message: string
}

export interface IMessageList {
  friendName: string,
  messageList: IMessage[]
}

export const useMessageListStore = defineStore({
  id: 'chat-message',
  state: (): IMessageList => ({
    friendName: '',
    messageList: []
  }),
  getters: {
    getFriendName() {
      return this.friendName;
    },
    getMessageList() {
      return this.messageList;
    }
  },
  actions: {
    setFriendName(friendName: string) {
      this.friendName = friendName;
    },
    clearMessageList() {
      this.messageList = [];
    },
    // addMessage(message: IMessage) {
    //   this.messageList.push(message);
    // },
    removeMessage() {
      this.messageList.pop();
    },
    messageSave() {
      storage.set(this.getFriendName, JSON.stringify(this.getMessageList));
      // return Promise.resolve();
    },
    messageLoad(name: string) {
      this.messageList = [];
      this.setFriendName(name);
      const messageList = JSON.parse(storage.get(name)) != null ? JSON.parse(storage.get(name)):[];
      this.messageList = messageList;
      // return Promise.resolve();
    },
    messageClear() {
      storage.clear();
      this.clearMessageList();
      // return Promise.resolve();
    }
  }
})

export const messageListStore = useMessageListStore();