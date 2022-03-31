import { createApp } from 'vue'
import App from '@/App.vue'
import router, { setupRouter } from '@/router';
import { setupNaive } from '@/plugins';
import { setupStore } from '@/store'

const app = createApp(App);

//按需引入naive-ui组件
setupNaive(app);
//挂载状态管理
setupStore(app);
//配置路由
await setupRouter(app);
await router.isReady();

app.mount('#app')
