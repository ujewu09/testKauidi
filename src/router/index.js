import Vue from 'vue'
import Router from 'vue-router'
import layout from '@/pages/layout'
import NotFound from '@/pages/layout/404'
import myBag from '@/pages/view/homeManage/myBag'
import manageHome from '@/pages/view/homeManage/Home'
import myOrder from '@/pages/view/homeManage/myOrder'
import newBag from '@/pages/view/homeManage/newBag'
import ordertracking from '@/pages/view/homeManage/Ordertracking'
import domesticexpresstracking from '@/pages/view/homeManage/Domesticexpresstracking'
import orderimport from '@/pages/view/homeManage/Orderimport'
import detailedorder from '@/pages/view/homeManage/Detailedorder'
import volume from '@/pages/view/user/volume'
import personalCenter from '@/pages/view/user/personalCenter'
import consumptionflow from '@/pages/view/user/consumptionflow'
import banktransfer from '@/pages/view/user/bankTransfer'
import integralcenter from '@/pages/view/user/Integralcenter'
import shippindaddress from '@/pages/view/user/Shippingaddress'
import promotionlink from '@/pages/view/extension/Promotionlink'
import myrecommendation from '@/pages/view/extension/Myrecommendation'
import myearnings from '@/pages/view/extension/Myearnings'
import contact from '@/pages/view/memberservices/contact'
import answer from '@/pages/view/memberservices/answer'
import login from '@/pages/view/signup/login'
import register from '@/pages/view/signup/register'
import noviceguidance from '@/pages/view/memberservices/Noviceguidance'
Vue.use(Router)


const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'layout',
      component: layout,
      children: [
        {path: '/manageHome', component: manageHome, meta: {title: '管理首页'},},
        {path: '/newBag', component: newBag, meta: {title: '包裹预报'}},
        {path: '/myOrder', component: myOrder, meta: {title: '我的订单'}},
        {path: '/myBag', component: myBag, meta: {title: '我的包裹'}},
        {path: '/ordertracking', component: ordertracking, meta: {title: '订单跟踪'}},
        {path: '/domesticexpresstracking', component: domesticexpresstracking, meta: {title: '国内订单跟踪'}},
        {path: '/orderimport', component: orderimport, meta: {title: '同行订单导入'}},
        {path: '/detailedorder', component: detailedorder, meta: {title: '单个订单详细'}},
        {path: '/personalCenter', component: personalCenter, meta: {title: '个人中心管理'}},
        {path: '/volume', component: volume, meta: {title: '集运卷'}},
        {path: '/consumptionflow', component: consumptionflow, meta: {title: '消费流水'}},
        {path: '/banktransfer', component: banktransfer, meta: {title: '银行转账'}},
        {path: '/integralcenter', component: integralcenter, meta: {title: '积分中心'}},
        {path: '/shippindaddress', component: shippindaddress, meta: {title: '收货地址管理'}},
        {path: '/promotionlink', component: promotionlink, meta: {title: '推广链接'}},
        {path: '/myrecommendation', component: myrecommendation, meta: {title: '我的推荐'}},
        {path: '/myearnings', component: myearnings, meta: {title: '我的收益'}},
        {path: '/contact', component: contact, meta: {title: '联系方式'}},
        {path: '/answer', component: answer, meta: {title: '有问必答'}},
        {path: '/noviceguidance', component: noviceguidance, meta: {title: '新手引导'}},
      ],
      redirect:'/manageHome'
    },
    {
      path:'/login',
      name:'login',
      component:login
    },
    {
      path:'/register',
      name:'register',
      component:register
    },
    {path:'*',component:NotFound},
  ]
})
