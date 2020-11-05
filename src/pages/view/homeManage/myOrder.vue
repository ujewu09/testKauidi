<template>
  <div class="contions">
    <Title-b title="我的订单" />
    <!--SumFree SumWeight</div> -->
    <div class="Accumulatedamount">
      <div style="margin-left: -200px">
        <p>
          {{$t('Myorder.Accumulatedamount')}}<img
            src="../../../assets/images/money.png"
            alt=""
            class="img"
          />
        </p>
        <p>{{ add.SumFree ? add.SumFree : 0 }}</p>
      </div>
      <div style="position: relative; left: 200px">
        <p>
          {{$t('Myorder.Accumulatedweight')}}<img src="../../../assets/images/KG.png" alt="" class="img" />
        </p>
        <p>{{ add.SumWeight ? add.SumWeight : 0 }}</p>
      </div>
    </div>
    <!-- 全部订单 -->
    <div class="Allorders">
      <!-- tab -->
      <div style="margin: 14px 0 0 0; display: inline-block">
        <!-- {{active}} -->
        <Tabs
          active-key="key1"
          v-model="active"
          :animated="false"
          width="200px"
          class="tans"
          @on-click="changeTab"
        >
          <Tab-pane
            v-for="(item, index) in statusList"
            :key="index"
            :label="item.label"
          />
        </Tabs>
      </div>
      <div class="game">
        <i-input
          v-model="search"
          placeholder="请输入..."
          @on-change="changeSech()"
          style="width: 300px"
        ></i-input>
        <div class="background" @click="searchOrder()">
          <img src="../../../assets/images/sousuo.png" alt="" />
        </div>
      </div>
      <div class="tans">
        <div class="order">
          <div class="selelct">
            <i-select v-model="Time" placeholder="全部订单" style="width: 100px" @on-change="changeSelect">
              <i-option :value="index" v-for="(item, index) in sel" :key="index">{{ item }}</i-option>
            </i-select>
          </div>
          <p>{{$t('Myorder.one')}}</p>
          <p style="position: relative; left: 134px">{{$t('Personal.Consignee')}}</p>
          <div class="select1">
            <p>{{$t('Myorder.two')}}</p>
          </div>
          <p style="position: relative; left: -21px">{{$t('Myorder.therr')}}</p>
          <p style="position: relative; left: -69px">{{$t('Myorder.four')}}</p>
        </div>
        <!-- 订单 -->
        <div v-if="allorder.length">
          <div
            class="ordernumber"
            v-for="(item, index) in allorder"
            :key="index"
          >
            <div class="f1">
              <span>{{ item.order_time }}</span>
              <span style="margin-left: 35px"
                >{{$t('Myorder.Ordernumber')}}：<span style="color: ##999999ff">{{
                  item.id
                }}</span></span
              >
              <!-- <span style="margin-left: 35px">转运单号：<span>{{ item.order_code }}</span></span>   -->
              <span
                style="
                  color: #f00;
                  position: absolute;
                  top: 0px;
                  left: 900px;
                  cursor: pointer;
                "
                @click="handlePay(item)"
                v-if="active == 1"
                >继续支付</span
              >
              <img
                src="../../../assets/images/shanchu.png"
                alt=""
                style="
                  width: 19px;
                  height: 22px;
                  vertical-align: middle;
                  position: absolute;
                  top: 9px;
                  left: 993px;
                  cursor: pointer;
                "
                @click="delAddress(item.id)"
              />
            </div>
            <div class="square">
              <div class="one">
                <div class="squareQ">
                  <!-- 全部订单 -->
                  <img
                    src="../../../assets/images/5.png"
                    alt=""
                    style="width: 70px; height: 70px"
                    v-if="active == 0"
                  />
                  <!-- 已发货待发货 -->
                  <img
                    src="../../../assets/images/1.png"
                    alt=""
                    style="width: 70px; height: 70px"
                    v-if="active == 1"
                  />
                  <!-- 已付款待付款 -->
                  <img
                    src="../../../assets/images/2.png"
                    alt=""
                    style="width: 70px; height: 70px"
                    v-if="active == 2"
                  />
                  <!-- 待签收已签收 -->
                  <img
                    src="../../../assets/images/3.png"
                    alt=""
                    style="width: 70px; height: 70px"
                    v-if="active == 3"
                  />
                </div>
                <div class="one_square">
                  <p>
                    {{$t('Myorder.Weight')}}：<span>{{ item.z_weight }}</span>
                  </p>
                  <p>
                    {{$t('Myorder.Prescription')}}：<span>{{ item.air_name }}</span>
                  </p>
                  <p>
                    {{$t('Myorder.cost')}}：<span>{{ item.Free }}</span>
                  </p>
                  <p>
                   {{$t('Home.Topaid')}}：<span>{{ item.Dshk }}</span>
                  </p>
                  <p>
                    {{$t('Home.Shippingaddress')}}:<span>{{ item.address }}</span>
                  </p>
                </div>
              </div>
              <div class="two">
                <div>{{ item.cname }}</div>
                <!-- <div></div> -->
                <div v-if="active == 0">{{ item.senttohk_state }}</div>
                <div v-if="active == 1">待付款</div>
                <div v-if="active == 2">待发货</div>
                <div v-if="active == 3">待签收</div>
                <div>
                  <p style="text-align: center">{{ item.mobile }}</p>
                  <p style="text-align: center">{{ item.mobile2 }}</p>
                </div>
                <div>
                  <p @click="Dorer(item.id)">{{$t('Myorder.Orderdetails')}}</p>
                  <!-- <p style="margin-top: 30px" v-if="item.is_senttohk==0">取消订单</p> -->
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="allorder.length == 0" class="shuju">暂无数据！</div>
      </div>
    </div>
    <!-- 删除对话框 -->
    <Modal
      v-model="handelModal"
      title="确认取消?"
      :loading="handelloading"
      @on-cancel="cuurrtAddressID = null"
      @on-ok="ClearOrder"
    >
      <p>确定要取消该订单吗？</p>
    </Modal>
    <r-mask
      :title="title"
      :isShowModal="isPay"
      @closeMask="isPay = false"
    >
      <div class="payBox">
        <div>支付金额：{{this.payMoneny}}元</div>
        <div class="pay-list">
          <span>支付方式：</span>
          <div class="pay-icon-list">
            <Radio-group v-model="payKey" @on-change="changeRadio">
              <Radio value="0" label="0"
                ><img class="icon-img" src="@/assets/images/zfb.jpg" />
              </Radio>
              <Radio value="1" label="1"
                ><img class="icon-img" src="@/assets/images/wx.jpg"
              /></Radio>
              <Radio value="2" label="2"
                ><img class="icon-img" src="@/assets/images/taobao.png"
              /></Radio>
             
            </Radio-group>
          </div>
        </div>
        <!-- 支付宝 -->
        <div v-if="payKey== 0">
          <iframe class="wuliu" :src="zfbUrl"></iframe>
        </div>
        <!-- 微信 -->
        <div v-if="payKey== 1">
          <!-- 123 -->
          <div class="tip01">请打开微信扫描下方二维码</div>
          <div id="WeChie" style="margin: 10px 0 0 170px;"></div>
          <div class="tip02">支付金额：{{ this.payMoneny }}元</div>
        </div>
         <div class="pay-top">
            <!-- <div>余额支付方式：</div> -->
            <Button-b @click.native="Deduction" value="余额支付"></Button-b>
         </div>
      </div>
     
      <!-- <iframe class="wuliu" :src="zfbUrl"></iframe> -->
    </r-mask>
  </div>
</template>
<script>
import QRCode from "qrcodejs2";
export default {
  data() {
    return {
      select: "",
      order: "",
      allorder: [],
      statusList: [
        {
          label: this.$t('Myorder.qbdd'),
          key: 0,
        },
        {
          label: "待付款",
          key: 1,
          type: "IsPayed",
        },
        {
          label: "待发货",
          key: 2,
          type: "IsComment",
        },
        {
          label: "待签收",
          key: 3,
          type: "IsQs",
        },
      ],
      sel: ["全部", "今天", "昨天", "一周", "一月"],
      all: [],
      Time: "",
      params: {
        MemberID: localStorage.getItem("userID"),
        limit: 10,
        offset: 1,
        IsPayed: 1,
        IsConfirm: 1,
        IsQs: 1,
        IsComment: 1,
        StartTime: "",
        EndTime: "",
      },
      add: {},
      search: "",
      dange: [],
      handelModal: false,
      handelloading: false,
      cuurrtAddressID: null,
      active: 0,
      isPay: false,
      zfbUrl: "",
      payKey: '0',
      payMoneny: 0,
      title: `订单继续支付`,
      OrderID:'',
      Money: '',
      time: ''
    };
  },
  //看来只能用很lou的写法了haode
  mounted() {
    this.OrderRecordPage();
    
  },
  watch:{
    "$route"(){
      if(this.$route.query&&this.$route.query.type){
        this.changeTab(parseInt(this.$route.query.type));
      }
    }
  },
  created(){
    if(this.$route.query&&this.$route.query.type){
      this.changeTab(parseInt(this.$route.query.type));
    }
  },
  // activated(){
  //   if(this.$route.query.e){
  //       this.e=this.$route.query.e
  //   }
  // },
  methods: {
    changeRadio(e) {
        if(this.payKey == 0 || this.payKey==1) {
        this.continuePay_Order()
      }
      if(this.payKey == 2) {
          window.open("https://shop375613435.taobao.com");
      }
    },
    changeTab(e) {
      const v = this.statusList[e];
      // console.log(e,"============");
      this.active = e;
      switch (e) {
        case 0:
          this.params["IsConfirm"] = 1;
          this.params["IsPayed"] = 1;
          this.params["IsQs"] = 1;
          this.params["IsComment"] = 1;
          break;
        case 1:
          this.params["IsPayed"] = 0;
          this.params["IsQs"] = 1;
          this.params["IsComment"] = 1;
          break;
        case 2:
          this.params["IsPayed"] = 1;
          this.params["IsQs"] = 0;
          this.params["IsComment"] = 1;
          break;
        case 3:
          this.params["IsPayed"] = 1;
          this.params["IsQs"] = 1;
          this.params["IsComment"] = 0;
          break;
      }
      // e=this.$route.query.e
      this.OrderRecordPage();
    },
    changeSelect(e) {
      this.selDate(e);
    },
    handlePay(e) {
      this.isPay = true
      this.payMoneny = e.Free;
      this.OrderID = e.id
      this.Money = e.Free

    //  console.log(e)
    //   this.payMoneny = e.Free;
    //   this.OrderID = e.id
    //   this.Money = e.Free

      if(this.payKey == 0 || this.payKey==1) {
        this.continuePay_Order()
      }
    },
    // 查询所有订单
    async OrderRecordPage() {
      this.allorder = [];
      const { data } = await this.$post("OrderRecordPage", this.params);
      if (data.State) {
        this.allorder = JSON.parse(data.ReturnJson);
        // console.log(this.allorder);
        this.add = this.allorder.length && JSON.parse(data.ReturnJson)[0];
      }
    },
    // 删除订单
    async ClearOrder() {
      const params = {
        MemberID: localStorage.getItem("userID"),
        ID: this.cuurrtAddressID,
      };
      const { data } = await this.$post("ClearOrder", params);
      if (data.State) {
         this.$Message.success("删除成功！");
         this.OrderRecordPage();
      }
    },
    async continuePay_Order() {
      var myDate = new Date();
      var myYear = myDate.getFullYear(); // 获取当前年份
      var myMonth = myDate.getMonth() + 1; // 获取当前月份
      myMonth = myMonth < 10 ? "0" + myMonth : myMonth;
      var myDay = myDate.getDate(); // 获取当前日（1- 31）
      myDay = myDay < 10 ? "0" + myDay : myDay;
      var myHours = myDate.getHours(); // 获取当前小时(0-23)
      var myMinu = myDate.getMinutes(); // 获取当前分钟(0-59)
      var mySec = myDate.getSeconds(); // 获取当前秒数(0-59)
      var mymil = myDate.getMilliseconds(); // 获取当前毫秒数(0-59)
      var time =
        myYear +
        "" +
        myMonth +
        "" +
        myDay +
        "" +
        myHours +
        "" +
        myMinu +
        "" +
        mySec +
        "" +
        mymil;
      this.time = time;
      //支付宝{"OpenID":"","PayTypeID":3,"OrderId":93,"PayMode":1,"IsQrCode":0,"Money":29.5,"ClientCode":"8194","GoodsName":"支付","OrderCode":"20201103105810174","PayType":"","Rem":"","ReturnUrl":""}
      //      {"OpenID":"","PayTypeID":0,"OrderId":93,"PayMode":0,"IsQrCode":0,"Money":29.5,"ClientCode":"8194","GoodsName":"支付","OrderCode":"20201103105851671","PayType":"","Rem":"","ReturnUrl":""}
      var JsonData1 = {
        OpenID:"",
        PayTypeID: this.payKey == 0 ? 3 : 0,  //0：微信扫码支付 1：微信JSAPI支付 2:微信小程序JSAPI支付 3.支付宝
        OrderId: this.OrderID,
        PayMode: this.payKey == 0? 1:0 ,//0 微信支付 1 支付宝支付 默认 0
        IsQrCode: 0, //支付宝是否二维码模式 0
        Money: this.Money, 
        ClientCode: localStorage.getItem("userID"),
        GoodsName: "支付",
        OrderCode: this.time,
        
      };
      const { data } = await this.$post("continuePay_Order", JsonData1);
      
       if(data.State) { 
        // this.isPay = true
        //   this.zfbUrl = data.ReturnJson;
        //   document.getElementById("WeChie").innerHTML = "";
        //   let WeChie = new QRCode("WeChie", {
        //     width: 150,
        //     height: 150,
        //     text: data.ReturnJson, // 二维码地址
        //     colorDark: "#000",
        //     colorLight: "#fff",
        //   });
          // 微信
         if(this.payKey == 0){
            this.isPay = true
            this.zfbUrl = data.ReturnJson;
         }
         //  支付宝
         if(this.payKey == 1){
            document.getElementById("WeChie").innerHTML = "";
            let WeChie = new QRCode("WeChie", {
              width: 150,
              height: 150,
              text: data.ReturnJson, // 二维码地址
              colorDark: "#000",
              colorLight: "#fff",
            });
         } 
       }

    },
    delAddress(value) {
      this.handelModal = true;
      this.cuurrtAddressID = value;
    },
    async Deduction() {
      var params = {
        Id: this.OrderID,
        MemberId: localStorage.getItem("userID"),
      };
        const { data } = await this.$post("Deduction", params);
           if(data.State) {
             this.isPay = false
             this.$Message.success("支付成功！");
             this.orderRecordPage()
           } else {
             this.$Message.error(this.MsgText);
           }
          
    },
    // 查询单个订单
    async searchOrder() {
      const { data } = await this.$post("OrderRecordPage", {
        ...this.params,
        OrderCode: this.search,
      });
      if (data.State) {
        this.allorder = JSON.parse(data.ReturnJson);
      }
    },
    changeSech() {
      if (this.search == "") {
        this.OrderRecordPage();
      }
    },
    selDate(key) {
      var today = new Date();
      var oneday = 1000 * 60 * 60 * 24;
      var st = " 00:00:00.000";
      var Ed = " 23:59:59.000";
      if (key == 0) {
        this.params.EndTime = "";
        this.params.StartTime = "";
      }
      if (key == 1) {
        //    今天
        this.params.StartTime = this.dateFmt(today) + st;
        this.params.EndTime = this.dateFmt(today) + Ed;
      }
      if (key == 2) {
        //    昨天
        this.params.StartTime = this.dateFmt(today - oneday) + st;
        this.params.EndTime = this.dateFmt(today) + Ed;
      }
      if (key == 3) {
        //    一周
        this.params.StartTime = this.dateFmt(today - oneday * 7) + st;
        this.params.EndTime = this.dateFmt(today) + Ed;
      }
      if (key == 4) {
        //    一月
        this.params.StartTime = this.dateFmt(today - oneday * 30) + st;
        this.params.EndTime = this.dateFmt(today) + Ed;
      }

      // console.log(this.params.StartTime);
      //      this.params.offset = 1;
      this.OrderRecordPage();
    },
    dateFmt(value) {
      if (null != value && "" != value) {
        var date = new Date(value);
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        if (m < 10) {
          m = "0" + m;
        }
        var d = date.getDate();
        if (d < 10) {
          d = "0" + d;
        }
        return y + "-" + m + "-" + d;
      } else {
        return "";
      }
    },
    //单个订单详细
    Dorer(ID) {
      // console.log(ID);
      this.$router.push({
        path: "/detailedorder",
        query: { orderID: ID },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.payBox {
  width: 600px;
  font-size: 16px;
  color: #333;
  .wuliu{
    width: 600px;
    height: 500px;
  }
  .pay-list {
      align-items: center;
    display: flex;
    flex-direction: row;
    margin-top: 20px;
    .pay-icon-list {
    margin-left: 20px;
      
    }
    span {
      font-size: 16px;
      color: #343434;
      font-weight: 400;
      line-height: 37px;
    }

    .icon-img {
      width: 60px;
      height: 60px;
      vertical-align: middle;
    }
  }
  .pay-top{
    margin-top: 20px;
  }
}

.contions {
  width: 1069px;
  background: #ffffff;
  padding: 20px 29px;
  .tip02{
      font-size: 16px;
      margin: 6px 0 0 0;
  }
  .Accumulatedamount {
    display: flex;
    justify-content: center;
    text-align: center;
    > div p:nth-child(1) {
      font-size: 14px;
      color: #666;
    }
    > div p:nth-child(2) {
      font-size: 24px;
      color: #000;
    }
    .img {
      vertical-align: middle;
      width: 15px;
      height: 15px;
      margin: -4px 0 0 6px;
    }
  }
  /deep/ .Allorders {
    // display: flex;
    // flex-direction: row;

    .tans {
      .shuju{
        position: absolute;
        left: 50%;
        top: 50%;
        font-size: 18px;
      }
      .ivu-tabs-bar {
        border-bottom: 0px solid #fff !important;
      }
      .ivu-tabs-nav .ivu-tabs-tab-active {
        @include color($_color);
      }
      // .ivu-tabs-nav .ivu-tabs-tab{
      //   margin-right: 0px;
      // }
    }
    .game {
      position: relative;
      display: flex;
      flex-direction: row;
      display: inline-block;
      top: -13px;
      left: 244px;
      height: 20px;
      .background {
        width: 63px;
        height: 31px;
        background: #ff6666;
        position: absolute;
        border-bottom-right-radius: 5px;
        border-top-right-radius: 5px;
        left: 237px;
        top: 1px;
        img {
          margin: 5px 19px;
          cursor: pointer;
        }
      }
      .ivu-select-single .ivu-select-selection {
        border: 0px solid #fff;
      }
    }
    .order {
      color: #666666ff;
      position: relative;
      background: #f1f5feff;
      width: 1029px;
      height: 30px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      line-height: 32px;
      font-size: 12px;
      font-weight: 400;
      .selelct {
        margin-left: 11px;
        .ivu-select-single .ivu-select-selection {
          border: 0px solid #ffffff85;
          background: #f1f5feff;
          height: 28px;
          margin: -5px 0 0 0px;
          color: #000;
        }
        .ivu-select-single .ivu-select-selection .ivu-select-placeholder {
          color: #666666ff;
        }
      }
      .select1 {
        position: relative;
        left: 50px;
        .ivu-select-single .ivu-select-selection {
          border: 0px solid #ffffff85;
          background: #f1f5feff;
          height: 28px;
          margin: -5px 0 0 0px;
          color: #000;
        }
        .ivu-select-single .ivu-select-selection .ivu-select-placeholder {
          color: #666666ff;
        }
      }
    }
  }

  .ordernumber {
    margin: 20px 0 0 0;
    width: 1029px;
    height: 150px;
    background: #fcfcfcff;
    border: 1px #cccccc solid;
    .f1 {
      width: 1027px;
      height: 40px;
      background: #f1f1f1ff;
      display: flex;
      flex-direction: row;
      line-height: 40px;
      padding: 0 20px;
      position: relative;
      span {
        font-size: 12px;
        font-weight: 400;
      }
      span:nth-child(1) {
        color: #999999ff;
      }
      span:nth-child(2) {
        color: #666666ff;
      }
    }
    .square {
      display: flex;
      flex-direction: row;
      .one {
        padding: 20px 28px;
        display: flex;
        flex-direction: row;
        width: 500px;
        border-right: 1px solid #c2c2c2;
        height: 108px;
        .squareQ {
          width: 70px;
          height: 70px;
          background: #b5b5b5ff;
        }
        .one_square {
          margin: -8px 0 0 60px;
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          justify-content: space-between;
          width: 221px;
          height: 100px;
          font-size: 12px;
          p {
            color: #666666ff;
          }
          span {
            color: #999999ff;
          }
        }
      }
      .two {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        width: 500px;
        height: 108px;
        padding: 50px 0;
        border-left: 1px solid #c2c2c2;
        div:nth-child(2) {
          color: red;
        }
        div {
          color: #999999ff;
          font-size: 12px;
          cursor: pointer;
          z-index: 5;
        }
      }
    }
  }
}
</style>
