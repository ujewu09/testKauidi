<template>
  <div>
    <div class="contions">
      <!-- 左 -->
      <div>
        <!-- 业务统计 -->
        <div class="left">
          <div class="game">
            <div class="headPortrait">
              <img class="headImg" :src="info.HeadUrl" alt="" />
            </div>
            <div class="text">
              <div>
                <span>{{$t('Home.Hai')}}：{{ info.ClientName }}</span>
                <span>{{$t('Home.Good')}}{{ info.MemberId }}</span>
                <span>{{$t('Home.Volume')}}<span style="color: red">{{info.VolumePiece}}</span>张</span>
              </div>
              <div>
                <!-- <span>会员等级：不享受折扣</span> -->
                <span>{{$t('Home.Email')}}：{{ info.email }}</span>
              </div>
            </div>
          </div>
          <div class="Statistics">
            <Title-b title="业务统计" />
            <div class="number">
              <div class="Number1" @click="warehouse('myBag','key2')">
                <span>{{$t('Home.Towarehouse')}}</span>
                <span>{{ count.nothousesum }}</span>
              </div>
              <div class="Number1"  @click="warehouse('myBag','key3')">
                <span>{{$t('Home.Awarehouse')}}</span>
                <span>{{ count.notorderssum }}</span>
              </div>
              <div class="Number1" @click="warehouse1('myOrder',1)">
                <span>{{$t('Home.Topaid')}}</span>
                <span>{{ count.pementsum }}</span>
              </div>
              <div class="Number1" @click="warehouse1('myOrder',2)">
                <span>{{$t('Home.Todelivered')}}</span>
                <span>{{ count.notshippedsum }}</span>
              </div>
              <div class="Number1" style="border-right: 0px" @click="warehouse1('myOrder',3)">
                <span>{{$t('Home.Tosigned')}}</span>
                <span>{{count.is_cus_qssum}}</span>
              </div>
            </div>
          </div>
        </div>
        <!-- 快速通道 -->
        <div class="passageway">
          <Title-b title="快速通道" />
          <div class="picture">
            <div class="top">
              <div class="top-modular" @click="tz('newBag')">
                <img src="../../../assets/images/yubao.png" alt="" style="width: 48px; height: 54px"/>
                <span>{{$t('Side.Forecastpackage')}}</span>
              </div>
              <div class="top-modular" @click="tz('myBag')">
                <img src="../../../assets/images/shenqing.png" alt="" style="width: 52px; height: 50px"/>
                <span style="margin: 8px 0 0 0">{{$t('Mypackage.Applicationconsolidation')}}</span>
              </div>
              <div class="top-modular" @click="tz('myOrder')">
                <img
                  src="../../../assets/images/wodedingdan.png"
                  alt=""
                  style="width: 60px; height: 53px"
                />
                <span>{{$t('Side.Myorder')}}</span>
              </div>
              <div class="top-modular" @click="tz('consumptionflow')">
                <img src="../../../assets/images/xiaofei.png" alt="" style="width: 52px; height: 52px"/>
                <span>{{$t('Side.Consumptionflow')}}</span>
              </div>
            </div>
            <div class="bottom">
              <div class="top-modular" @click="tz('shippindaddress')">
                <img src="../../../assets/images/dizhzi.png" alt="" style="width: 58px; height: 54px"/>
                <span>{{$t('Home.Addressmanagement')}}</span>
              </div>
              <div class="top-modular" @click="tz('personalCenter')">
                <img src="../../../assets/images/xiugaimima.png" alt="" style="width: 52px; height: 50px"/>
                <span style="margin: 9px 0 0 -8px">{{$t('Home.ChangePassword')}}</span>
              </div>
              <div class="top-modular" @click="tz('integralcenter')">
                <img
                  src="../../../assets/images/wodelibao.png"
                  alt=""
                  style="width: 58px; height: 54px"
                />
                <span>{{$t('Home.Mypoints')}}</span>
              </div>
              <div class="top-modular" @click="tz('noviceguidance')">
                <img src="../../../assets/images/cangkudizhi.png" alt="" style="width: 60px; height: 54px"/>
                <!-- <a href="https://vip.paibaoex.com/Me/Guidance" class="a">新手指导</a> -->
                <span>{{$t('Side.Noviceguidance')}}</span>
              </div>
            </div>
          </div>
        </div>
        <!-- 仓库地址 -->
        <div class="warehouse">
          <div class="p2">
            <div class="title-line">
              <Title-b title="仓库地址" />
              <div class="warehouse-tab">
                <div :class="['item-w-tab',activeWare == index ? 'activeWare' : '',]"
                  @click="changeTag(item, index)"
                  v-for="(item, index) in warehouseList"
                  :key="index"
                >
                  {{ item.HouseName }}
                </div>
              </div>
            </div>
            <div class="div-span" id="xxxx">
              <p>{{$t('Home.contacts')}}：{{ warehouseInfo.LinkMan }}-({{IDs}})</p>
              <p>{{$t('Home.Postalnumber')}}：{{ warehouseInfo.ZipCode }}</p>
              <p>{{$t('Home.contactnumber')}}：{{ warehouseInfo.LinkTel }}</p>
              <p>{{$t('Home.Shippingaddress')}}：{{ warehouseInfo.HouseAdd }}</p>
              <!-- <Button-b value="复制" /> -->
              <div class="copy-btn" @click="copy()">
                <Button-b value="复制" />
              </div>
              <div v-for="(item, index) in news.QuestionInfo" :key="index">
                {{ item }}}公告
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 右边 -->
      <div>
        <div class="right">
          <!-- 我的账户 财务明细 -->
          <div class="account">
            <div class="p2">
              <Title-b title="我的账户" />
              <!-- <p class="chakan">查看更多</p> -->
            </div>
            <div class="blackL">
              <div class="one">
                <span class="monys">¥ {{ info.Money }}</span>
                <span class="balance">{{$t('Home.Myaccount')}}</span>
              </div>
              <div class="two"></div>
              <div class="three">
                <span class="monyss">{{ info.Integral }}</span>
                <span class="balancee">{{$t('Home.Availablebalance')}}</span>
              </div>
            </div>
            <!-- 充值 -->
            <!-- <div class="Recharge" @click="modal3 = true">充值</div> -->
            <Button-b :value="ti" @click.native="modal3 = true" />
            <div class="transparent" v-show="modal3">
              <div class="fff">
                <div>
                  <!-- 充值的账户 -->
                  <div class="dialogbox">
                    <div class="out" @click="clone()">×</div>
                    <span style="color: #343434">充值的账户：</span>
                    <span style="color: #9a9a9a; margin-left: 20px">会员昵称：<span style="color: #ff6634">{{info.ClientName}}</span></span>
                    <span style="color: #9a9a9a; margin-left: 30px">会员ID：{{ info.MemberId }}</span>
                  </div>
                  <!-- 其他金额 -->
                  <div class="others">
                    其他金额：<i-input v-model="input" placeholder="请输入" class="others_input" type="number" @input="change()"></i-input>
                  </div>
                  <!-- 支付方式 -->
                  <div class="payment">
                    <span>支付方式：</span>
                    <div class="pay-icon-list">
                      <Radio-group v-model="payKey" @on-change="changeRadio">
                        <Radio value="0" label="0"><img class="icon-img" src="@/assets/images/zfb.jpg"/>
                        </Radio>
                        <Radio value="1" label="1"><img class="icon-img" src="@/assets/images/wx.jpg"/></Radio>
                        <Radio value="2" label="2"><img class="icon-img" src="@/assets/images/taobao.png"/></Radio>
                      </Radio-group>
                    </div>
                  </div>
                  <!-- 支付金额 -->
                  <div class="Paymentamount" v-if="!isShowPay">
                    <span>支付金额:&nbsp;&nbsp;<span style="color: #f85a22; width: 129px">{{ Paymentamount }}</span>元</span>
                    <div class="Confirmrecharge" @click="payRequest">
                      确定充值
                    </div>
                  </div>
                </div>
                <div class="Qrcode" v-show="isShowPay">
                  <div class="tip01">请打开微信扫描下方二维码</div>
                  <div id="qrcode"></div>
                  <div class="tip02">支付金额：{{ input }}元</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 新闻公告 -->
        <div class="news">
          <div class="p2">
            <Title-b title="新闻公告" />
            <!-- <p class="ye">新闻公告</p> -->
            <p class="chakan" @click="answer()">{{$t('Home.Seemore')}}</p>
          </div>
          <div class="Dabout">
            <ul class="about">
              <li
                v-for="(item, index) in news"
                :key="index"
                @click="Djquestion(index)"
              >
                <div v-if="index < 5">
                  <span style="float: left">{{ item.Title }}</span
                  ><span style="float: right">{{ item.CreateTime }}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <!-- 运费计算 -->
        <div class="calculation">
          <div class="p2">
            <!-- <p class="ye">计费运算</p> -->
            <Title-b title="计费运算" />
          </div>
          <div class="form">
            <i-form :v-model="formItem" :label-width="140">
              <div style="margin: 0 0 0 63px">
                <span style="position: relative; top: 6px; left: 7px">仓库</span>
                <i-select v-model="formItem.select1" style="width: 200px;height: 20px;position: relative;left: 68px;">
                  <i-option :value="it.ID" v-for="(it, int) in ck" :key="int">{{it.HouseName}}</i-option>
                </i-select>
              </div>
              <div style="margin: 26px 0 0 63px">
                <span style="position: relative; top: 6px; left: 8px"
                  >{{$t('Home.Destination')}}</span
                >
                <i-select
                  v-model="formItem.select2"
                  
                  style="width: 200px;height: 20px;position: relative;left: 56px;">
                  <i-option :value="itemm.CountryID" v-for="(itemm, indexx) in syck" :key="indexx" >{{ itemm.CountryName }}</i-option>
                </i-select>
              </div>
              <div style="margin: 26px 0 0 63px">
                <span style="position: relative; top: 6px; left: 7px">{{$t('Home.Weight')}}</span>
                <i-input v-model="formItem.weight" placeholder="请输入" style="width: 200px;height: 20px;position: relative;left: 71px;"></i-input>
              </div>
              <div class="from-position">
                <p>{{$t('Home.Company')}}</p>
                <div class="kuang">
                  <i-input v-model="formItem.length" placeholder="长" class="i-input"></i-input>
                  <span class="asterisk">*</span>
                  <i-input v-model="formItem.width" placeholder="宽" class="i-input"></i-input>
                  <span class="asterisk">*</span>
                  <i-input v-model="formItem.height" placeholder="高" class="i-input"></i-input>
                </div>
              </div>
              <Form-item>
                <div @click="sumFree()">
                  <Button-b value="提交" class="sumbit-btn" />
                </div>
              </Form-item>
            </i-form>
          </div>
          <!-- 运费试算结果 -->
           <div class="freight"
               v-show="modal4">
            <div class="ffff">
              <div>
                <span style="color: #000;font-size:16px;margin: 23px 0 0 22px;display:inline-block">运费试算结果</span>
                <span class="out" @click="clone2()">×</span>
              </div>
               <div class="flex-auto">
                <div v-for="(item,index) in yf.PricesInfo" :key="index">
                <div class="warehouse" v-if="index== 0">
                  <div style="width: 140px; height: 60px; text-align: center">
                    <p style="font-size: 12px; color: #9a9a9a">仓库</p>
                    <p style="color: #349aff; font-size: 16px">{{item.HouseName}}</p>
                  </div>
                  <div style="flex-direction: row; display: flex; position: relative">
                    <div class="straightline"></div>
                    <div class="rotate"></div>
                  </div>
                  <div style="width: 140px;height: 60px;text-align: center;">
                    <p style="font-size: 12px; color: #9a9a9a">目的地</p>
                    <p style="color: #349aff; font-size: 16px">{{item.CountryName}}</p>
                  </div>
                </div>
                <div>
                  <div class="Shipment"
                       style="margin-top: 10px">
                    <div>
                      <div class="div_1">
                        <p>货物类型</p>
                        <p>{{item.GoodsType}}</p>
                      </div>
                      <div class="div_1">
                        <div style="flex-direction: row; display: flex; position: relative">
                          <div class="straightline"></div>
                          <div class="rotate"></div>
                        </div>
                      </div>
                      <div class="div_1">
                        <p>时效</p>
                        <p>{{item.TimerName}}</p>
                      </div>
                    </div>
                    <!-- er -->
                    <div>
                      <div class="div_1">
                        <p>价格</p>
                        <p>{{item.Free}}</p>
                      </div>
                      <div class="div_1">
                        <p>超长费</p>
                        <p>{{item.LongFee}}</p>
                      </div>
                      <div class="div_1">
                        <p>计费重量(KG)</p>
                        <p>{{Free_Weight2}}</p>
                      </div>
                    </div>
                    <p class="ShipmentP">注：{{item.TimerName}} {{ item.Rem }}</p>
                  </div>
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-mask" @click.stop v-if="showModal && gList.length">
      <div class="frame_box">
        <div class="frame_title">{{ gList[0].Title }}</div>
        <img src="../../../assets/images/chahao.png" alt="" @click="showModal = false"/>
        <div class="frame-container">
          <div v-html="gList[0].Text">{{ gList[0].Text }}</div>
          <div class="frame-time">{{ gList[0].CreateTime }}</div>
        </div>
        <div class="fc_footer" @click="showModal = false">我已知晓</div>
      </div>
    </div>
    <!-- 新闻公告 -->
    <div class="modal-mask" v-if="QuestionInfo">
      <div class="frame_box">
        <div class="frame_title">{{ news[index].Title }}</div>
        <img
          src="../../../assets/images/chahao.png"
          alt=""
          @click="QuestionInfo = false"
        />
        <div class="frame-container">
          <div v-html="news[index].Text">{{ news[index].Text }}</div>
          <div class="frame-time"></div>
        </div>
        <div class="fc_footer" @click="QuestionInfo = false">我已知晓</div>
      </div>
    </div>
    <div class="mask" v-if="showZfb" @click="isShowZfb">
      <iframe class="wuliu" :src="zfbUrl"></iframe>
    </div>
  </div>
</template>

<script>
import QRCode from "qrcodejs2";
export default {
  data() {
    return {
      ti:this.$t('Home.Recharge'),
      ajaxArr: [
        this.getUserInfo(),
        this.getQuestion(),
        this.getHouseByShopId(),
        this.queryorderquantity(),
        this.getCountryList(),
        this.getHouseList(),
        this.getquestion(),
      ],
      formItem: {
        select1: "",
        select2: "",
        weight: "",
        length: "",
        width: "",
        height: "",
      },
      modal3: false,
      input: "",
      Paymentamount: 0,
      modal4: false,
      info: {},
      warehouseList: [],
      warehouseInfo: {},
      IDs:localStorage.getItem("userID"),
      count: [],
      activeWare: 0,
      gList: [],
      showModal: false,
      modal1: false,
      syck: [],
      ck: [],
      yf: [],
      ww: {},
      news: [],
      QuestionInfo: false,
      index: 0,
      topUp: {
        PayMode: 1, // 1支付宝0微信
        IsQrCode: 1,
        Money: 0.01,
        OrderCode: "",
        ClientCode: localStorage.getItem("userID"),
        GoodsName: "充值",
        PayType: "",
        Rem: "",
        ReturnUrl: "",
      },
      active: 0,
      isShowPay: false,
      time: "",
      timer: "",
      QuestionInfo: false,
      index: 0,
      payKey: "0",
      zfbUrl: "",
      showZfb: false,
      Free_Weight2:""
    };
  },
  mounted() {
    let promiseList = [];
    // let _this = this;
    // this.ajaxArr.forEach((callBack) => {
    //   let FnCallBack = callBack
    //   let fn = new Promise((resolve, reject) => {
    //     FnCallBack().then(function (res) {
    //       resolve(res);
    //     });
    //   });
    //   promiseList.push(fn);
    // });
    Promise.all(promiseList);
    // this.getCountryList();
  },
  // created(){
  //   this.$router();
  // },
  methods: {
    warehouse(route,key){
      this.$router.push(`./${route}`+"?key="+key);
    },
    // 这里
    warehouse1(route,e){
      this.$router.push(`./${route}`+"?type="+e);
    },
    isShowZfb() {
      this.showZfb = false;
      clearInterval(this.timer);
    },
    tz(route) {
      this.$router.push(`./${route}`);
    },
    async getUserInfo() {
      const params = { member: localStorage.getItem("userID") };
      const { data } = await this.$post("GetUserInfo", params);
      if (data.State) {
        this.info = JSON.parse(data.ReturnJson);
        console.log(this.info,"===============")
        localStorage.setItem("msg", JSON.stringify(this.info));
      } else {
        this.$Message.error(data.MsgText);
      }
    },
    async getHouseByShopId() {
      const params = { MemberID: localStorage.getItem("userID") };
      const { data } = await this.$post("GetHouseByShopId", params);
      if (data.State) {
        this.warehouseList = JSON.parse(data.ReturnJson).QueryHouseByID;
        this.warehouseInfo = this.warehouseList[0];
      }
    },
    async queryorderquantity() {
      const params = { MemberID: localStorage.getItem("userID") };
      const { data } = await this.$post("Queryorderquantity", params);
      if (data.State) {
        this.count = JSON.parse(data.ReturnJson)[0];
        console.log(this.count);
      }
    },
    async getQuestion() {
      const JsonData = { TypeName: "系统公告" };
      const { data } = await this.$post("GetNotice", JsonData);
      if (data.State) {
        if (data.ReturnJson != "null") {
          this.gList.push(JSON.parse(data.ReturnJson));
          // console.log(this.showModal);
           if(!localStorage.getItem("guide")){
              // console.log(this,this.showModal,"=====xiaoxie");
              this.showModal = true;  // 这是弹出框
              localStorage.setItem("guide",true)
           }
          
          // console.log(localStorage.setItem("userID"),"==========")
        }
      }
    },
    // 获取国家信息
    async getCountryList() {
      const params = { MemberID: localStorage.getItem("userID") };
      const { data } = await this.$post("GetCountryList", params);
      if (data.State) {
        this.syck = JSON.parse(data.ReturnJson);
        this.formItem.select2 = this.syck[0].CountryID;
      }
    },
    // 获取仓库地址
    async getHouseList() {
      const params = { MemberID: localStorage.getItem("userID") };
      const { data } = await this.$post("GetHouseList", params);
      if (data.State) {
        this.ck = JSON.parse(data.ReturnJson);
        this.formItem.select1 = this.ck[0].ID;
        // console.log(this.formItem.select1)
      }
    },
    // 运费计算
    async sumFree() {
      // 判断只能为数字
      const sz = /[^\d]/g;
      if (this.formItem.select1 == "") {
        this.$Message.error("请选择仓库！");
        return false;
      } else if (this.formItem.select2 == "") {
        this.$Message.error("请选择目的地！");
        return false;
      } else if (sz.test(this.formItem.weight)) {
        this.$Message.error("请输入正确的重量！");
        return false;
      } else if (sz.test(this.formItem.length)) {
        this.$Message.error("请输入正确的长度！");
        return false;
      } else if (sz.test(this.formItem.width)) {
        this.$Message.error("请输入正确的宽度！");
        return false;
      } else if (sz.test(this.formItem.height)) {
        this.$Message.error("请输入正确的高度！");
        return false;
      } else {
        var weight = parseInt(this.formItem.weight || "0");
        var length = parseInt(this.formItem.length || "0");
        var height = parseInt(this.formItem.height || "0");
        var width = parseInt(this.formItem.width || "0");
        let params = {
          MemberID: localStorage.getItem("userID"),
          WaveID: this.formItem.select1,
          CountryID: this.formItem.select2,
          Weight: weight,
          Length: length,
          Width: width,
          Height: height,
        };
        const { data } = await this.$post("SumFree", params);
        if (data.State) {
          this.yf = JSON.parse(data.ReturnJson);
          this.Free_Weight2 = parseFloat(this.yf.Free_Weight2).toFixed(2);
          if (this.yf.PricesInfo.length <= 0) {
            this.$Message.error("该地区暂无报价");
          } else {
            this.modal4 = true;
          }
        }
      }
    },
    // 新闻公告
    async getquestion() {
      const params = { MemberID: localStorage.getItem("userID") };
      const { data } = await this.$post("GetQuestion", params);
      if (data.State) {
        this.news = JSON.parse(data.ReturnJson).QuestionInfo;
      }
    },
    changeRadio(e) {
      this.payKey = e;
      if (e == 0) {
        this.topUp.PayType = "支付宝";
        this.topUp.PayMode = 1;
      }
      if (e == 1) {
        this.topUp.PayType = "微信";
        this.topUp.PayMode = 0;
      }
      if (e == 2) {
        window.open("https://shop375613435.taobao.com");
      }
    },
    Djquestion(index) {
      this.QuestionInfo = true;
      this.index = index;
      console.log(this.index);
    },
    changeTag(item, index) {
      this.warehouseInfo = item;
      this.activeWare = index;
    },
    clone() {
      this.modal3 = false;
      this.isShowPay = false;
      window.clearInterval(this.timer);
    },
    clone2() {
      this.modal4 = false;
    },
    // guanjian() {
    //   this.input = "";
    // },
    change() {
      this.Paymentamount = this.input;
    },
    copy() {
      var div = document.getElementById('xxxx');
      if (document.body.createTextRange) {
          var range = document.body.createTextRange();
          range.moveToElementText(div);
          range.select();
      } else if (window.getSelection) {
          var selection = window.getSelection();
          var range = document.createRange();
          range.selectNodeContents(div);
          selection.removeAllRanges();
          selection.addRange(range);
          /*if(selection.setBaseAndExtent){
              selection.setBaseAndExtent(text, 0, text, 1);
          }*/
      } else {
          console.warn("none");
      }
      document.execCommand("Copy"); 
      this.$Message.success("复制成功");
    },
    answer() {
      this.$router.push("./answer");
    },
    getTime() {
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
      this.time =
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
      return this.time;
    },

    async payRequest() {
      if (this.Paymentamount == "") {
        this.$Message.error("请输入充值金额！");
        return false;
      }
      if (this.payKey == 2) {
        window.open("https://shop375613435.taobao.com");
        return false;
      }
      document.getElementById("qrcode").innerHTML = "";
      this.topUp.Money = this.Paymentamount * 1;

      this.topUp.OrderCode = this.getTime();
      const { data } = await this.$post("payRequest", this.topUp);
      if (data.State) {
        if (this.payKey == 0) {
          // 支付宝
          this.showZfb = true;
          this.zfbUrl = data.ReturnJson;
        }
        if (this.payKey == 1) {
          // 微信
          this.isShowPay = true;
          let qrcode = new QRCode("qrcode", {
            width: 150,
            height: 150,
            text: data.ReturnJson, // 二维码地址
            colorDark: "#000",
            colorLight: "#fff",
          });
        }

        this.timer = setInterval(this.queryPayRequest, 2000);
      } else {
        this.$Message.error(data.MsgText);
      }
    },
    async queryPayRequest() {
      var JsonData = {
        PayMode: this.topUp.PayMode,
        OrderCode: this.time,
      };
      const { data } = await this.$post("queryPayRequest", JsonData);
      if (data.State) {
     
        this.getUserInfo()
        this.isShowPay = false;
         this.showZfb = false;
            this.$Message.success("支付成功！");
        window.clearInterval(this.timer);
      }
    },
  },
};
</script>

<style lang="scss" >
.test {
  @include color($_color);
  // @include color_primary($color-primary1);
}
</style>
<style lang="scss" scoped>
.mask {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 9;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  .wuliu {
    width: 600px;
    height: 600px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
.icon-img {
  width: 60px;
  height: 60px;
  vertical-align: middle;
}
.modal-mask {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 9;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  overflow: auto;
  .frame_box {
    height: 664px;
    display: block;
    width: 900px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
    display: flex;
    flex-direction: column;
    img {
      width: 23px;
      height: 23px;
      position: absolute;
      right: 29px;
      cursor: pointer;
      top: 33px;
    }
    .frame_title {
      padding: 30px 0;
      margin: 0 30px;
      border-bottom: 1px solid #ddd;
      text-align: center;
      font-size: 20px;
      font-weight: 500;
    }
    .frame-container {
      padding: 30px;
      flex: 1;
      overflow: auto;
      .frame-time {
        @include color($_color);
        font-size: 16px;
        text-align: right;
      }
    }
    .fc_footer {
      width: 150px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      border-radius: 20px;
      @include backgroundColor($_color);
      font-size: 16px;
      color: #fff;
      cursor: pointer;
      margin: 15px auto;
    }
  }
}

.Qrcode {
  width: 150px;
  height: 150px;
  display: inline-block;
  margin-left: 250px;
  margin-top: 20px;
  text-align: center;
  .tip01 {
    margin-bottom: 10px;
  }
  .tip02 {
    margin-top: 10px;
  }
}
.contions {
  display: flex;
  flex-direction: row;
  .straightline {
    width: 267px;
    height: 3px;
    background: #349aff;
    position: relative;
    top: 32px;
    left: 22px;
  }
  .sumbit-btn {
    margin-left: -70px;
    // /deep/ .button-custom .ivu-btn-error{color:#fff;}
    /deep/ .ivu-btn-error {
      width: 280px;
      color: #fff;
    }
  }
  .transparent {
    background: #00000087;
    z-index: 9;
    width: 100%;
    height: 100%;
    top: 0px;
    position: fixed;
    left: 0px;
    .fff {
      width: 892px;
      height: 650px;
      background: #ffffff;
      margin: 0 auto;
         position: absolute;
      top: 50%;
      transform: translate(-50%, -50%);
      left: 50%;
      display: flex;
      flex-direction: column;
      // .flex-auto{
      //   flex: 1;
      //   overflow: auto;
      // }
      .dialogbox {
        padding: 96px 0px 0px 98px;
        .out {
          color: #9a9a9a;
          font-size: 35px;
          font-weight: bold;
          cursor: pointer;
          position: absolute;
          top: 0px;
          right: 18px;
        }
        span {
          font-weight: 400px;
          font-size: 16px;
        }
      }
      .amount {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        padding: 40px 0 0 110px;
        span {
          font-weight: 400px;
          font-size: 16px;
          color: #343434;
        }
        .size {
          text-align: center;
          font-size: 20px;
          cursor: pointer;
          line-height: 40px;
          margin: 0 35px;
        }
      }
      .others {
        display: flex;
        flex-direction: row;
        padding: 40px 0 0 110px;
        color: #343434;
        font-size: 16px;
        line-height: 35px;
        .others_input {
          width: 140px;
          height: 30px;
          margin-left: 37px;
          border-radius: 5px;
        }
      }
      .payment {
        display: flex;
        flex-direction: row;
        padding: 40px 0 0 110px;
        .pay-icon-list {
          margin-left: 20px;
        }
        span {
          font-size: 16px;
          color: #343434;
          font-weight: 400;
          line-height: 37px;
        }
        .WeChat {
          width: 160px;
          height: 40px;
          background: #12d61e;
          text-align: center;
          color: #fff;
          font-size: 20px;
          line-height: 41px;
          cursor: pointer;
          border-radius: 5px;
          margin: 0 42px;
        }
        .Paymentpackage {
          width: 160px;
          height: 40px;
          text-align: center;
          border: 1px #cccccc solid;
          line-height: 41px;
          cursor: pointer;
          border-radius: 5px;
          span {
            color: #cccccc;
            font-size: 20px;
            position: relative;
            top: -3px;
            left: 4px;
          }
        }
      }
      .Paymentamount {
        padding: 40px 0 0 257px;
        display: flex;
        flex-direction: row;
        span {
          font-size: 16px;
          color: #343434;
          font-weight: 400;
          line-height: 45px;
        }
        .Confirmrecharge {
          width: 140px;
          height: 40px;
          // @include background($color);
          background: #f85a22;
          text-align: center;
          color: #fff;
          font-size: 20px;
          line-height: 41px;
          cursor: pointer;
          border-radius: 5px;
          position: absolute;
          left: 457px;
        }
      }
    }
  }
  .freight {
    background: #00000087;
    z-index: 19;
    width: 100%;
    top: 0px;
    position: fixed;
    left: 0px;
    right: 0;
    bottom: 0;
    .ffff {
      height: 645.9px;
      background: #ffffff;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      // position: absolute;
      // top: 50%;
      // left: 50%;
      // display: flex;
      // flex-direction: column;
      // .flex-auto{
      //   flex: 1;
      //   overflow: auto;
      // }
      .out {
        color: #9a9a9a;
        font-size: 35px;
        font-weight: bold;
        cursor: pointer;
        position: absolute;
        top: 10px;
        right: 22px;
      }
      .warehouse {
        display: flex;
        flex-direction: row;
        padding: 0px 77px;
        height: 50px;
        width: 700px;
        .rotate {
          transform: rotate(-149deg);
          width: 38px;
          height: 3px;
          background: #349aff;
          position: absolute;
          left: 252px;
          top: 22px;
        }
      }
      .Shipment {
        width: 612px;
        height: 156px;
        background: #fafafa;
        border: 1px solid #cccccc;
        border-radius: 5px;
        margin: 0 auto;
        .ShipmentP {
          color: #9a9a9a;
          font-size: 10px;
          margin: 8px 0 0 10px;
          text-align: center;
        }
      }
    }
    .Shipment > div {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap-reverse;
      .div_1:nth-child(2) {
        width: 200px;
        margin: 0 0 0 0;
      }
      .div_1 {
        width: 102px;
        height: 34px;
        text-align: center;
        margin: 30px 0 0 74px;
        position: relative;
        .rotate {
          transform: rotate(-149deg);
          width: 38px;
          height: 3px;
          background: #349aff;
          position: absolute;
          left: 187px;
          top: 22px;
        }
      }
      p:nth-child(1) {
        font-size: 12px;
        color: #cccccc;
      }
      p:nth-child(2) {
        font-size: 16px;
        color: #343434;
      }
    }
  }
  .left {
    width: 700px;
    height: 210px;
    background: #ffffff;
    color: #333;
    border-radius: 5px;
    padding: 10px 38px;
    display: flex;
    flex-direction: column;
    .game {
      display: flex;
      flex-direction: row;
      .headPortrait {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        box-shadow: 5px 5px 25px rgba(0, 0, 0, 0.1);
        .headImg {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .text {
        div {
          padding: 2px 0px;
          color: #666;
          font-size: 14px;
          margin: 3px 0 0 12px;
          margin-right: 10px;
          > span {
            margin-right: 20px;
          }
        }
      }
    }
    .Statistics {
      margin: 20px 0 0 -16px;
      .number {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
        margin: 25px 0 0 0;
        color: #333;
        .Number1 {
          display: flex;
          width: 100px;
          height: 50px;
          border-right: 2px dashed #c2c2c2;
          flex-direction: column;
          padding-left: 20px;
          span:nth-child(1) {
            color: #333;
            font-size: 12px;
            font-weight: 400;
          }
          span:nth-child(2) {
            // color: #ff0000;
            @include color($_color);
            font-weight: 500;
            margin: 0 0 0 11px;
            font-size: 26px;
          }
        }
      }
    }
  }
  .right {
    display: flex;
    width: 355px;
    height: 210px;
    background: #ffffff;
    border-radius: 5px;
    margin-left: 10px;
    .account {
      padding: 20px 28px;
      .button-custom {
        width: 288px;
        margin-top: 16px;
      }
      .p2 {
        display: flex;
        flex-direction: row;
        /deep/ .unify-title {
          padding: 1px 0 0 5px;
          margin: 4px 0 0 0;
        }
        .chakan {
          cursor: pointer;
          font-weight: 400;
          font-size: 16px;
          @include color($_color);
          position: relative;
          top: 1px;
          left: 129px;
        }
      }
      .blackL {
        display: flex;
        flex-direction: row;
        width: 282px;
        justify-content: center;
        margin: 20px 0 0 0;
        .one {
          display: flex;
          flex-direction: column;
          align-items: center;
          .monys {
            @include color($_color);
            font-size: 22px;
            font-weight: 500;
          }
          .balance {
            color: #999;
            font-size: 12px;
            font-weight: 400;
          }
        }
        .two {
          width: 1px;
          height: 50px;
          background: #ccc;
          margin-left: 50px;
        }
        .three {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-left: 45px;
          .monyss {
            @include color($_color);
            font-size: 22px;
            font-weight: 500;
          }
          .balancee {
            color: #999;
            font-size: 12px;
            font-weight: 400;
          }
        }
      }
      .Recharge {
        width: 160px;
        height: 30px;
        @include backgroundColor($_color);
        // background: #ff0000;
        border-radius: 5px;
        font-size: 20px;
        color: #ffffff;
        text-align: center;
        margin: 35px 0 0 76px;
        cursor: pointer;
      }
    }
  }
  .passageway {
    width: 700px;
    cursor: pointer;
    height: 286px;
    background: #fff;
    margin: 10px 0 0 0;
    border-radius: 5px;
    padding: 10px 20px;
    .picture {
      margin: 20px 0 0 16px;
      .top {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        .top-modular {
          display: flex;
          flex-direction: column;
          span {
            margin: 5px 0 0 -5px;
            font-size: 16px;
            font-weight: 400;
            color: #656565;
          }
        }
      }
      .bottom {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        margin: 30px 0 0 0;
        .top-modular {
          display: flex;
          flex-direction: column;
          span {
            margin: 5px 0 0 -2px;
            font-size: 16px;
            font-weight: 400;
            color: #656565;
          }
          a{
            margin: 5px 0 0 -5px;
            font-size: 16px;
            font-weight: 400;
            color: #656565;
          }
        }
      }
    }
  }
  .warehouse {
    width: 700px;
    height: 233.9px;
    background: #fff;
    margin: 10px 0 0 0;
    border-radius: 5px;
    padding: 10px 20px;
    .p2 {
      .title-line {
        display: flex;
        border-bottom: 1px #ccc dashed;
        line-height: 48px;
        height: 34px;
        width: 100%;
        .warehouse-tab {
          display: flex;
          cursor: pointer;
          line-height: 28px;
          color: #9a9a9a;
          font-size: 16px;
          .item-w-tab {
            padding-left: 32px;
          }
          .activeWare {
            @include color($_color);
          }
        }
      }
      .div-span {
        width: 450px;
        font-weight: 400;
        font-size: 13px;
        color: #999;
        position: relative;
        p {
          margin: 20px 0 0 0;
        }
        .copy-btn {
          color:#fff;
          position: absolute;
          bottom: 1px;
          right: -207px;
          width: 180px;
          /deep/ .button-custom .ivu-btn-error{color: #fff;}
        }
      }
      .coly {
        width: 100px;
        height: 30px;
        background: #ffffff;
        border: 1px #ff0000 solid;
        text-align: center;
        font-size: 20px;
        border-radius: 5px;
        position: absolute;
        top: 166px;
        left: 392px;
        line-height: 27px;
      }
      /deep/ .unify-title {
        margin: 6px 0 0 0;
      }
      .tab {
        display: flex;
        flex-direction: flex;
        justify-content: space-around;
        width: 550px;
        margin: 1px 0 0 20px;
        li {
          position: relative;
          font-size: 16px;
          font-weight: 400;
          color: #999;
          cursor: pointer;
          .user {
            @include color($_color);
            //color: red;
          }
          .game {
            color: #c2c2c2;
          }
          .line {
            border-bottom: 1px #ccc dashed;
            width: 699px;
            height: 10px;
            position: absolute;
            left: -142px;
          }
          .show {
            .div-span {
              width: 450px;
              position: absolute;
              top: 40px;
              left: -123px;
              font-weight: 400;
              font-size: 12px;
              color: #666;
              cursor: pointer;
              .user {
                @include color($_color);
                //color: red;
              }
              .game {
                color: #c2c2c2;
              }
              .line {
                border-bottom: 1px #ccc dashed;
                width: 699px;
                height: 10px;
                position: absolute;
                left: -142px;
              }
              .show {
                .div-span {
                  width: 450px;
                  position: absolute;
                  top: 40px;
                  left: -123px;
                  font-weight: 400;
                  font-size: 12px;
                  color: #999;
                  p {
                    margin: 20px 0 0 0;
                  }
                }
                .coly {
                  width: 100px;
                  height: 30px;
                  background: #ffffff;
                  //  @include border($b_color5);
                  text-align: center;
                  //color:#ff0000;
                  @include color($_color);
                  //@include color($_color);
                  font-size: 20px;
                  border-radius: 5px;
                  position: absolute;
                  top: 166px;
                  left: 392px;
                  line-height: 27px;
                }
              }
            }
            .coly {
              width: 100px;
              height: 30px;
              background: #ffffff;
              border: 1px #ff0000 solid;
              text-align: center;
              //color:#ff0000;
              //@include color($_color);
              font-size: 20px;
              border-radius: 5px;
              position: absolute;
              top: 166px;
              left: 392px;
              line-height: 27px;
            }
          }
        }
      }
    }
  }
  .news {
    width: 355px;
    height: 194px;
    background: #ffffff;
    border-radius: 5px;
    margin: 11px 0 0 10px;
    .p2 {
      display: flex;
      flex-direction: row;
      padding: 12px 0 0 24px;
      /deep/ .unify-title {
        padding: 1px 0 0 5px;
        margin: 4px 0 0 0;
      }
      .chakan {
        font-weight: 400;
        font-size: 16px;
        @include color($_color);
        //color: #ff0000;
        position: relative;
        top: 1px;
        left: 175px;
      }
    }
    .Dabout {
      width: 87%;
      height: 400px;
      margin: 0px 0 0 25px;
      .about li {
        height: 30px;
        width: 100%;
        border-bottom: 1px #efefef solid;
        line-height: 30px;
        font-size: 12px;
        cursor: pointer;
      }
    }
  }
  .calculation {
    width: 355px;
    height: 326px;
    background: #ffffff;
    border-radius: 5px;
    margin: 11px 0 0 10px;
    .p2 {
      display: flex;
      flex-direction: row;
      padding: 12px 0 0 24px;
      /deep/ .unify-title {
        padding: 1px 0 0 5px;
        margin: 4px 0 0 0;
      }
    }
    /deep/ .form {
      position: relative;
      left: -40px;
      top: 20px;
      .from-position {
        margin: 30px 0 0 69px;
        .kuang {
          margin: 15px 0;
        }
        .asterisk {
          margin: 0 5px;
        }
      }
      .ivu-input-wrapper {
        display: inline-block;
        width: 80px;
        height: 26px;
        position: relative;
        vertical-align: middle;
        line-height: normal;
      }
      .sumbit {
        width: 288px;
        background: #ff0000;
        height: 40px;
        position: relative;
        left: -40px;
        top: 20px;
        /deep/.ivu-form-item-content {
          width: 200px;
        }
        .sumbit {
          width: 288px;
          border-color: #fff;
          @include backgroundColor($_color);
          height: 40px;
          position: relative;
          top: 17px;
          font-weight: 400;
          color: #ccc;
          padding: 0 2px;
          font-size: 30px;
        }
        p {
          font-size: 12px;
          color: #666;
          font-weight: 400;
        }
        .i-input {
          width: 80px;
          height: 26px;
          border-radius: 5px;
          z-index: 99;
        }
      }
    }
  }
}
</style>
