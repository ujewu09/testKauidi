import Vue from 'vue'

import router from './router'
import iView, { Modal } from 'iview';
import plugins from './components/plugins'
import { http ,post} from './api/http'
import 'iview/dist/styles/iview.css';  
import App from './App'
import Clipboard from 'v-clipboard'
// 引入i18n国际化插件
import VueI18n from 'vue-i18n'

Vue.config.productionTip = false

Vue.use(iView);
Vue.use(plugins);
Vue.use(Clipboard)
Vue.use(VueI18n)
// 注册i18n实例并引入语言文件
const i18n = new VueI18n({
  locale: localStorage.getItem("locale")||'zh', // 定义默认语言为中文
  messages: {
    'zh': require('@/assets/languages/zh.json'),
    'en': require('@/assets/languages/en.json')
  }
})
Vue.prototype.$Message.config({
  top: 300,
  duration:2
});
Vue.prototype.$post = post;
Vue.prototype.$http = http
router.beforeEach((to, from, next) => {
  document.title = localStorage.getItem('shopName');
  if (localStorage.getItem('token') || to.path === "/login" || to.path === "/register" ) {
    next()
  } else {
    next({
      path: "/login"
    })
  }
})

new Vue({
  el: '#app',
  router,
  i18n,
  components: { App },
  template: '<App/>'
})
