<template>
  <!-- 推广链接 -->
  <div class="container">
    <Title-b title="推广链接" />
    <!-- <p class="p">推广链接</p> -->
    <img src="../../../assets/images/tuijian.png" alt="" />
    <div class="one">
      <div class="two">
        <div>
          <p>
            {{$t('PromotionCenter.One')}}：<span>{{ wz }}</span>
          </p>
          <p>{{$t('PromotionCenter.Two')}}</p>
          <p>
            {{$t('PromotionCenter.Three')}}
          </p>
          <p> {{$t('PromotionCenter.Four')}}</p>
        </div>
        <div class="one_one">
          <div v-clipboard:copy="wz" v-clipboard:success="copy">
            {{$t('PromotionCenter.Five')}}
          </div>
          <div @click="showFx">{{$t('PromotionCenter.Six')}}</div>
        </div>
      </div>
      <div class="Qrcode" v-show="isShowPay">
        <div id="qrcode"></div>
        <div style="text-align:center">保存二维码</div>
      </div>
      <!-- <div class="three">
        <div class="copy" v-clipboard:copy="wz" v-clipboard:success="copy">
          复制
        </div>
      </div> -->
    </div>
  </div>
</template>
<script>
import QRCode from "qrcodejs2";
export default {
  data() {
    return {
      wz: `member.paibaoex.com/#/register?id=${localStorage.getItem("userID")}`,
      isShowPay: false
    };
  },
  methods: {
    goCoure() {
      this.$router.replace("coure");
    },
    copy() {
      this.$Message.success("复制成功！");
    },

    showFx() {
      this.isShowPay = true;
      let _this = this;
      console.log(_this.wz,"==============");
      let qrcode = new QRCode("qrcode", {
        width: 150,
        height: 150,
        text: "http://"+_this.wz, // 二维码地址
        colorDark: "#000",
        colorLight: "#fff",
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.container {
  width: 1069px;
  height: 700px;
  background: #fff;
  border-radius: 5px;
  padding: 19px 17px;
  img {
    margin: -20px 0 0 225px;
  }
  .one {
    display: flex;
    flex-direction: row;
    margin: 0 0 0 48px;
    .two {
      > div p {
        font-size: 12px;
        margin: 15px 0;
        cursor: pointer;
        span {
          @include color($_color);
        }
      }
      .one_one {
        display: flex;
        flex-direction: row;
        margin: 44px 0 0 160px;
        position: relative;
        left: -26px;
        div {
          width: 160px;
          height: 30px;
          @include backgroundColor($_color);
          border-radius: 5px;
          margin: 0 30px;
          color: #fff;
          text-align: center;
          font-size: 20px;
          cursor: pointer;
        }
      }
    }
    .three {
      .copy {
        width: 40px;
        height: 21px;
        // background: #ff0000;
        @include backgroundColor($_color);
        text-align: center;
        font-size: 12px;
        color: #fff;
        cursor: pointer;
        border-radius: 5px;
        margin: 13px 0 0 -39px;
        line-height: 22px;
      }
      .blue {
        width: 202px;
        height: 141px;
        background: #000;
        margin: 28px 0 0 -38px;
      }
    }
  }
}
</style>