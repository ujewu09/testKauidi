<template>
  <!-- 集运卷 -->
  <div class="container">
    <div class="title">
      <Title-b title="优惠券" />
      <p class="userP">{{ info.VolumeRemk }}</p>
      <div></div>
    </div>
    <div class="volume">
      <div class="Title">
        <p>{{$t('Personal.Availablecouponbalance')}}</p>
        <p>{{ info.AvailableAmount }}{{$t('Personal.element')}}</p>
      </div>
      <div class="Coupon">
     
        <div class="one" @click="changeVolume(1)">
          <p>{{$t('Personal.Available')}}</p>
          <p>{{ info.AvailableCount }}张</p>
        </div>
        <div class="three" @click="changeVolume(2)">
          <p>{{$t('Personal.Expired')}}</p>
          <p>{{ info.ExpiredCount }}张</p>
        </div>
      </div>
    </div>
    <div class="coupon">
      <div class="one" v-if="active == 1">
        <ul>
          <li v-for="(item, index) in info.QueryFreightVolumeinfo" :key="index">
            <p><span style="font-size: 36px">¥{{item.Volume}}元</span></p>
            <p>{{item.VolumeCome}}</p>
            <!-- {{item.CreateTime}}- -->
            <p>有效期:{{item.ExpDate}}</p>
            <p>{{$t('Side.coupon')}}</p>
          </li>
        </ul>
      </div>
    
      <div class="three" v-if="active == 2">
        <ul>
          <li v-for="(item, index) in info.QueryFreightVolumeinfo" :key="index">
             <p><span style="font-size: 36px">¥{{item.Volume}}元</span></p>
            <p>{{item.VolumeCome}}</p>
            <p>{{item.ExpDate}}</p>
            <p>优惠券</p>
            <p class="fous">已过期</p>
          </li>
        </ul>
      </div>
    </div>
    <Page
      class="page-ive"
      :total="page.total"
      :current="1"
      :page-size="page.size"
      @on-change="changePage"
      show-total
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      page: {
        total: 1,
        current: 1, // 当前页码
        size: 8, // 每页个数
      },
      userObject: [
        {
          name: "¥",
        },
        {
          name: "¥",
        },
        {
          name: "¥",
        },
        {
          name: "¥",
        },
      ],
     
      show1: true,
      show2: false,
      show3: false,
      object: [],
      sdsd: {},
      sss: {
        name: 1,
      },
      form: {
        MemberID: localStorage.getItem("userID"),
        State: 1,
        offset: 1,
        limit: 8,
      },
      info: {},
      list: [],
      active: 1,
    };
  },

  mounted() {
    this.queryFreightVolumeMethod();
  },
  methods: {
    async queryFreightVolumeMethod() {
      const { data } = await this.$post("QueryFreightVolume", this.form);
      if (data.State) {
        this.info = JSON.parse(data.ReturnJson);
        this.list = this.info.QueryFreightVolumeinfo;
        let arrKey = ['AllCount','AvailableCount','ExpiredCount']
        this.page.total = this.info[arrKey[this.active]] 
      }
    },
    changeVolume(index) {
        this.active = index;
        this.form.State = index;
        this.info = {}
        this.queryFreightVolumeMethod()
    },
    changePage(e) {
      this.form.offset = e;
      this.queryFreightVolumeMethod();
    },
    changePageSize() {},
  },
};
</script>
<style lang="scss" scoped>
.container {
  width: 1069px;
  height: 748px;
  background: #fff;
  padding: 20px 29px;
  .page-ive {
    margin: 20px auto;
    width: 400px;
    display: flex;
    justify-content: center;
  }
  .title {
    display: flex;
    flex-direction: row;
    .userP {
      color: #ccc;
      font-size: 12px;
      font-weight: 400;
      margin: -2px 0 0 23px;
    }
  }
  .volume {
    width: 875px;
    height: 190px;
    // background: #c2c22c;
    margin: 0 auto;
    // display: flex;
    // justify-content: center;
    .Title {
      p {
        text-align: center;
      }
      p:nth-child(1) {
        color: #000000;
        font-size: 16px;
      }
      p:nth-child(2) {
        @include color($_color);
        font-size: 36px;
        font-weight: bold;
      }
    }
    .Coupon {
      display: flex;
      justify-content: center;
      width: 906px;
      height: 400px;
      div {
        width: 280px;
        height: 80px;
        border-radius: 5px;
      }
      .one {
        background: #a5daec;
        margin: 0 0 0 -33px;
        text-align: center;
        padding: 7px 0;
          margin-right: 80px;;

        p:nth-child(1) {
          font-size: 16px;
          color: #fff;
        }
        p:nth-child(2) {
          font-size: 30px;
          color: #1d6e9c;
          font-weight: bold;
        }
        p {
          cursor: pointer;
        }
      }
      .two {
        background: #96cdc7;
        text-align: center;
        padding: 7px 0;
        p:nth-child(1) {
          font-size: 16px;
          color: #fff;
        }
        p:nth-child(2) {
          font-size: 30px;
          color: #1d6e9c;
          font-weight: bold;
        }
        p {
          cursor: pointer;
        }
      }
      .three {
        background: #e7d5ba;
        text-align: center;
        position: relative;
        padding: 7px 0;
        p {
          cursor: pointer;
        }
        p:nth-child(1) {
          font-size: 16px;
          color: #fff;
        }
        p:nth-child(2) {
          font-size: 30px;
          color: #1d6e9c;
          font-weight: bold;
        }
      }
    }
  }
  .coupon {
    .one {
      display: flex;
      flex-direction: row;
      // justify-content: space-between;
      width: 959px;
      height: 400px;
      
      margin: 0 auto;
      ul li {
        background: url("../../../assets/images/juan.png") no-repeat;
        width: 220px;
        height: 140px;
        // margin: 10px 10px 10px 10px;
        list-style: none;
        display: inline-block;
        text-align: center;
        margin: 0 9px;
        margin-bottom: 16px;
      }
      li {
        p:nth-child(1) {
          color: #fff;
        }
        p {
          font-size: 12px;
          color: #fff;
          text-align: center;
          margin: 2px 0px;
        }
        p:nth-child(4) {
          width: 128px;
          height: 33px;
          background: #2883bf;
          position: relative;
          left: 48px;
          line-height: 36px;
          font-size: 16px;
        }
      }
    }
    .two {
      display: flex;
      flex-direction: row;
      // justify-content: space-between;
      width: 959px;
      margin: 0 auto;
      height: 155px;
      // padding: 20px 0;
      ul li {
        background: url("../../../assets/images/juan1.png") no-repeat;
        width: 220px;
        height: 140px;
        list-style: none;
        display: inline-block;
        text-align: center;
        margin: 0 9px;
        position: relative;
      }
      li {
        p:nth-child(1) {
          color: #fff;
        }
        p {
          font-size: 12px;
          color: #fff;
          text-align: center;
          margin: 2px 0px;
        }
        p:nth-child(4) {
          width: 128px;
          height: 33px;
          background: #2883bf;
          position: relative;
          left: 48px;
          line-height: 36px;
          font-size: 16px;
        }
        .fous {
          position: absolute;
          transform: rotate(-34deg);
          font-size: 16px;
          font-weight: bold;
          top: 10px;
          left: 4px;
        }
      }
    }
    .three {
      display: flex;
      flex-direction: row;
      // justify-content: space-between;
      width: 959px;
      margin: 0 auto;
      //@at-rootpadding: 0px 0;
      height: 400px;
      ul li {
        background: url("../../../assets/images/juan2.png") no-repeat;
        width: 220px;
        height: 140px;
        // margin: 10px 10px 10px 10px;
        list-style: none;
        display: inline-block;
        text-align: center;
        margin: 0 9px;
        position: relative;
        margin-bottom: 20px;
      }
      li {
        p:nth-child(1) {
          color: #fff;
        }
        p {
          font-size: 12px;
          color: #fff;
          text-align: center;
          margin: 2px 0px;
        }
        p:nth-child(4) {
          width: 128px;
          height: 33px;
          background: #2883bf;
          position: relative;
          left: 48px;
          line-height: 36px;
          font-size: 16px;
        }
        img {
          position: absolute;
          top: 12px;
          left: 184px;
          cursor: pointer;
        }
        .fous {
          position: absolute;
          transform: rotate(-40deg);
          font-size: 16px;
          font-weight: bold;
          top: 9px;
          left: 6px;
        }
      }
    }
  }
}
</style>