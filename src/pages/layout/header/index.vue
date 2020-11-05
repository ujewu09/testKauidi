<template>
  <div class="header-wrapper">
    <div class="head-cont">
      <img src="../../../assets/images/6.png" alt="" />
      <div class="nav-list">
        <!-- <div @click="changeColor">微信公众号</div> -->
        <div @click="toLink(gw)">{{$t('common.title')}}</div>
        <div @click="toLink(taobao)">{{$t('common.tb')}}</div>
        <!-- https://shop375613435.taobao.com/ -->
        <!--  -->
        <div>{{$t('common.jx')}}</div>
        <div @click="qiehuan">{{$t('common.yy')}}</div>
        <div @click="tz()">{{$t('common.tc')}}</div>
      </div> 
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      gameUserInfo: null,
      taobao: "https://shop375613435.taobao.com",
      gw: "https://www.paibaoex.com/",
    };
  },
  methods: {
    qiehuan(){
      if(!localStorage.getItem("locale")||localStorage.getItem("locale")=="zh"){
        this.$i18n.locale = "en";
        localStorage.setItem("locale",'en')
      }else{
        this.$i18n.locale = "zh";
        localStorage.setItem("locale",'zh')
      }
    },
    changeColor() {
      window.document.documentElement.setAttribute("data-theme", "primary2");
    },
    toLink(link) {
      window.open(link);
    },
    tz() {
      localStorage.removeItem("CusID");
      localStorage.removeItem("KeyText");
      this.$router.push("./login");
    },
  },
};
</script>
<style lang="scss" scoped>
.header-wrapper {
  width: 100%;
  height: 80px;
  line-height: 80px;
  font-size: 16px;
  color: #000;
  @include backgroundColor($_color);
  .head-cont {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: flex-end;
    img {
      width: 195px;
      position: relative;
      left: -579px;
      height: 78px;
      cursor: pointer;
    }
    .nav-list {
      display: flex;
      flex-direction: row;
      > div {
        margin-left: 56px;
        cursor: pointer;
      }
    }
  }
}
</style>