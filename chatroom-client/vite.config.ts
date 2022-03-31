import { defineConfig } from 'vite'
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue'
import { extensions } from 'vite/dist/node/chunks/dep-be032392';
import { LOCALSERVER, LOCALWSSERVER } from './src/base';
// exports default defineConfig { 
//   resolve: {
//     alias: {
//       "@": resolve(__dirname, 'src'),
//     },
//     extensions: ['.js', '.json', '.ts', '.vue']
//   }
// }
// https://vitejs.dev/config/
module.exports = {
  plugins: [vue()],
  runtimeCompiler: true,
  alias: {
    'vue': "vue/dist/vue.esm-bundler.js",
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, 'src'),
    },
    //extensions: ['.js', '.json', '.ts']
  },
  devServer: {
    proxy: {
        '/socket.io': {
          target: LOCALWSSERVER,
          ws: true,
          changeOrigin: true
        },
        'sockjs-node': {
          target: LOCALWSSERVER,
          ws: false,
          changeOrigin: true
        },
    }
  }
}
