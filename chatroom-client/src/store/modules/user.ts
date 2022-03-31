import { store } from '@/store'
import { defineStore } from 'pinia'
import { createStorage } from '@/utils/Storage'
import { storage } from '@/utils/Storage'

const Storage = createStorage({ storage: localStorage });

export interface IUserState {
  token: string,
  username: string,
  info: Object
}

export const useUserStore = defineStore({
  id: 'user',
  state: (): IUserState => ({
    token: JSON.parse(Storage.get('userInfo')).token,
    username: JSON.parse(Storage.get('userInfo')).name,
    info: {}
  }),
  getters: {
    getToken() {
      return this.token;
    },
    getUserName() {
      return this.username;
    },
    getUserInfo() {
      const userInfo = Storage.get("userInfo");
      return JSON.parse(userInfo);
    }
  },
  actions: {
    setToken(token: string) {
      this.token = token;
    },
    setUserName(username: string) {
      this.username = username;
    },
    async login(token: string) {
      this.setToken(token);
      Storage.set("userInfo", JSON.stringify({name: this.getUserName, token: this.getToken}));
    }
  }
})

export const userStore = useUserStore();