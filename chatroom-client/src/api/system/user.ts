import { LOCALSERVER } from '@/base'
import axios from 'axios'

export const login = (params) => {
  return axios({
    method: 'get',
    url: LOCALSERVER + '/login',
    params: params
  })
}

export const checkToken = (params) => {
  return axios({
    method: 'get',
    url: LOCALSERVER + '/checkToken',
    params: params
  })
}

export const getFriendList = (params) => {
  return axios({
    method: 'get',
    url: LOCALSERVER + '/friendList',
    params: params
  })
}

export const addFriend = (params) => {
  return axios({
    method: 'get',
    url: LOCALSERVER + '/addFriend',
    params: params
  })
}