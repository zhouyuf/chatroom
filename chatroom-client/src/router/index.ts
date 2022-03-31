import { createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw } from 'vue-router';
import { App } from 'vue';

const routeList: RouteRecordRaw[] = [];

export const RootRoute: RouteRecordRaw = {
    path: '/',
    name: 'root',
    redirect: '/login',
    meta: {
        title: 'Root',
    },
};

export const LoginRoute: RouteRecordRaw = {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue'),
    meta: {
        title: '登录',
    },
};

export const RoomRoute: RouteRecordRaw = {
    path: '/chatroom',
    name: 'chatroom',
    component: () => import('../views/Chatroom.vue'),
    meta: {
        title: '聊天室',
    },
};

export const constantRouter: any[] = [LoginRoute, RoomRoute, RootRoute];

const router = createRouter({
    history: createWebHistory(''),
    routes: constantRouter,
});

export function setupRouter(app: App) {
    app.use(router);
    // 创建路由守卫
    //createRouterGuards(router);
}
  
export default router;