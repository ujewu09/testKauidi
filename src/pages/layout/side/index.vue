<template>
  <div class="side-wrapper">
    <div class="nav-wrapper" v-for="(item, index) in navList" :key="index">
      <div class="title">{{ item.title }}</div>
      <div class="col-list">
        <div
          :class="{ 'col-item': true, active: v.link == $route.path }"
          @click="routeTo(v.link)"
          v-for="(v, index) in item.colList"
          :key="index"
        >
          {{$t(v.title)}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      navList: [
        {
          title: this.$t('Side.ManagementCenter'),
          colList: [
            { text: "管理首页",title:"Side.ManagementHomepage", link: "/manageHome" },
            { text: "预报包裹",title:"Side.Forecastpackage", link: "/newBag" },
             { text: "我的包裹",title:"Side.Mypackage", link: "/myBag" },
            { text: "我的订单",title:"Side.Myorder", link: "/myOrder" },
            { text: "订单跟踪",title:"Side.ddgz", link: "/ordertracking" },
            { text: "国内订单跟踪",title:"Side.Domesticordertracking", link: "/domesticexpresstracking" },
            // { text: "同行订单导入", link: "/orderimport" },
            // { text: "单个订单详细", link: "/detailedorder" },
          ],
        },
        {
          title: "用户中心",
          colList: [
            { text: "个人信息管理",title:"Side.Personal",link: "/personalCenter" },
            { text: "优惠券", title:"Side.coupon",link: "/volume" },
            { text: "消费流水",title:"Side.Consumptionflow", link: "/consumptionflow" },
            { text: "银行转账", title:"Side.banktransfer",link: "/banktransfer" },
            { text: "推荐奖励ex",title:"Side.Recommended", link: "/integralcenter" },
            { text: "收货地址管理",title:"Side.Receiving", link: "/shippindaddress" }
          ],
        },
        {
          title: "推广中心",
          colList: [
            { text: "推广链接", title:"Side.Promotionlink",link: "/promotionlink" },
            { text: "我的推荐", title:"Side.Myrecommendation",link: "/myrecommendation" },
            { text: "我的收益", title:"Side.Myearnings",link: "/myearnings" },
          ],
        },
        {
          title: "会员服务",
          colList: [
            // { text: "联系方式", link: "/contact" },
            { text: "有问必答", title:"Side.answer",link: "/answer" },
            { text: "新手引导", title:"Side.Noviceguidance",link: "/noviceguidance" },
          ],
        },
      ],
    };
  },
  methods: {
    routeTo(link) {
      console.log(link);
      this.$router.push(link);
    },
  },
};
</script>
<style lang="scss" scoped>
.side-wrapper {
   width: 116px;
  height: 750px;
  background: #fff;
  border-radius: 5px;
  // padding: 0px 20px 8px 22px;
  box-sizing: border-box;
  margin-right: 14px;
  text-align: center;
  .nav-wrapper {
    margin-bottom: 28px;
    .title {
      font-size: 16px;
      color: #333;
      font-weight: 500;
      line-height: 1;
      background: #fc0;
      line-height: 30px;
    }
    .col-list {
      .col-item {
        font-weight: 400;
        font-size: 12px;
        color: #666;
        margin-top: 16px;
        line-height: 1;
        cursor: pointer;
        &.active {
          @include color($_color);
        }
        &:hover {
          @include color($_color);
        }
      }
    }
  }
}
</style>