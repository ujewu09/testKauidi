<template>
  <div class="myBag-wrapper">
    <div class="myBag-top">
      <Title-b title="查看到货情况/申请打包" />
    </div>

    <Tabs :value="key" @on-click="changeTab">
      <Tab-pane label="全部" name="key1"></Tab-pane>
      <Tab-pane label="未入库" name="key2"></Tab-pane>
      <Tab-pane label="已入库" name="key3"></Tab-pane>
    </Tabs>
    <i-table
      border
      :loading="loading"
      :columns="columns"
      :data="list"
      v-if="showTable"
      @on-selection-change="selectList"
    ></i-table>

    <r-mask title="编辑" :isShowModal="showModal" @closeMask="closeEdit">
      <i-form
        ref="formRef"
        :model="formInline"
        :rules="ruleInline"
        label-position="right"
        :label-width="100"
        inline
      >
        <Form-item label="快递单号" prop="kdBillcode">
          <Input
            v-model="formInline.kdBillcode"
            :disabled="true"
            style="width: 310px"
          />
        </Form-item>
        <Form-item label="货物品名" prop="Goods">
          <Input
            v-model="formInline.Goods"
            placeholder="请输入货物品名"
            style="width: 310px"
          />
        </Form-item>
        <Form-item label="货物类型" prop="Goodsid">
          <i-select
            v-model="formInline.Goodsid"
            :label-in-value="true"
            style="width: 310px"
            placeholder="请选择货物类型"
            @on-change="changeSelect"
          >
            <i-option
              :value="item.GoodsID"
              v-for="(item, index) in GoodList"
              :key="index"
              >{{ item.GoodsName }}</i-option
            >
          </i-select>
        </Form-item>
        <Form-item label="货物数量" prop="Number">
          <Input
            v-model="formInline.Number"
            placeholder="请输入货物数量"
            style="width: 310px"
          />
        </Form-item>
        <Form-item label="备注说明">
          <Input v-model="formInline.Goods_meno" style="width: 310px" />
        </Form-item>
      </i-form>
      <div class="upBtn">
        <Button-b value="提交" @click.native="handleSubmit('formRef')" />
      </div>
    </r-mask>
    <r-mask title="申请集运" :isShowModal="showApplay" @closeMask="closeMask">
      <div slot="price" class="price-title">
        重量：{{
          this.freeAdd.Free_Weight ? this.freeAdd.Free_Weight : 0
        }}
        集运费用：<span class="price">{{
          this.freeAdd.Free ? this.freeAdd.Free : 0
        }}</span
        >元({{ this.freeAdd.CountryMoneyUnit }}:{{ this.freeAdd.CountryMoney }})
      </div>
      <div>
        <div class="pirce-wrapper">
          <div>待完成单号</div>
        </div>
      </div>
      <i-table border stripe :columns="columnsBag" :data="sList"></i-table>
      <div class="info-form">
        <i-form
          ref="info"
          :model="info"
          :rules="ruleValidate2"
          :label-width="100"
        >
          <!-- <Form-item label="货物类型">
            <i-input v-model="info.GoodsType" disabled></i-input>
          </Form-item>
          <Form-item label="是否自提" prop="ServiceType">
            <Radio-group v-model="info.ServiceType" @on-change="changeRadio">
              <Radio
                v-for="item in ServiceType"
                :label="item.value"
                :key="item.value"
                ><span>{{ item.label }}</span></Radio
              >
            </Radio-group>
          </Form-item>
          <Form-item
            label="收货地址"
            prop="Address"
            v-if="info.ServiceType == 2"
          >
            <i-select
              v-model="info.Address"
              @on-change="changeSelect2($event, 'Address')"
              placeholder="请选择收货地址"
            >
              <i-option
                v-for="(item, index) in addressList"
                :key="index"
                :value="item.ID"
                >{{ item.CountryName }}-{{ item.Address }}</i-option
              >
            </i-select>
          </Form-item>
          <Form-item label="自提地址" prop="Address" v-else>
            <i-select
              v-model="info.Address"
              @on-change="changeSelect2($event)"
              placeholder="请选择自提地址"
            >
              <i-option
                v-for="(item, index) in ztList"
                :key="index"
                :value="item.ID"
                >{{ item.CountryName }}-{{ item.Address }}</i-option
              >
            </i-select>
          </Form-item> -->
          <Tabs active-key="2" @on-click="changeZt">
            <Tab-pane label="送货上门" key="2"></Tab-pane>
            <!-- <Tab-pane label="自提点" key="3"></Tab-pane> -->
          </Tabs>
          <i-table
            border
            stripe
            :columns="addTable"
            :data="info.ServiceType == 2 ? addressList : ztList"
          ></i-table>
          <Form-item label="选择时效" prop="AirTname" style="margin-top: 20px">
            <i-select
              v-model="info.AirTname"
              @on-change="changeSelect2($event, 'AirTname')"
              placeholder="请选择时效"
            >
              <i-option
                v-for="(item, index) in timeBar"
                :key="index"
                :value="item.id"
                >{{ item.timeBarName }}-({{ item.Rem }})</i-option
              >
            </i-select>
          </Form-item>
          <Form-item label="选择承运商" prop="cforhmType">
            <i-select
              v-model="info.cforhmType"
              @on-change="changeSelect2($event, 'cforhmType')"
              placeholder="请选择承运商"
            >
              <i-option
                v-for="(item, index) in forwarderList"
                :key="index"
                :value="item.id"
                >{{ item.ForwarderName }}</i-option
              >
            </i-select>
          </Form-item>
          <Form-item label="选择付款方式" prop="PayType">
            <i-select
              v-model="info.PayType"
              @on-change="changeSelect2($event, 'PayType')"
              placeholder="请选择支付方式"
            >
              <i-option
                v-for="(item, index) in payList"
                :key="index"
                :value="item.id"
                >{{ item.pay }}</i-option
              >
            </i-select>
          </Form-item>
          <Form-item label="选择集运卷" prop="Jyj">
            <i-select
              v-model="info.Jyj"
              @on-change="changeSelect2($event, 'Jyj')"
              placeholder="请选择集运卷"
            >
              <i-option
                v-for="(item, index) in resList"
                :key="index"
                :value="item.ID"
                >{{ item.newName }}</i-option
              >
            </i-select>
          </Form-item>
          <Form-item label="使用积分(选填)">
            <div class="tip-box">
              <i-input
                v-model="info.Useintegral"
                placeholder="请输入使用的积分"
                @on-blur="sumOrderFree"
              ></i-input>
              <div class="tips">
                *{{ `当前积分${this.SuIntegral}，100积分可抵扣1元。` }}
              </div>
            </div>
          </Form-item>
          <Form-item label="保价(选填)">
            <div class="tip-box">
              <i-input
                v-model="info.Bj"
                placeholder="请输入保价金额"
                @on-blur="sumOrderFree"
              ></i-input>
              <div class="tips">
                *{{
                  `保价费用：${this.freeAdd.BjFree ? this.freeAdd.BjFree : 0}`
                }}
              </div>
            </div>
          </Form-item>
          <Form-item label="备注(选填)">
            <i-input placeholder="请输入备注"></i-input>
          </Form-item>
          <Form-item>
            <i-button type="primary" @click="handleSubmit('info')"
              >申请集运</i-button
            >
          </Form-item>
        </i-form>
        <Spin size="large" fix v-if="spinShow"></Spin>
      </div>
    </r-mask>
    <r-mask
      title="包裹图片"
      :isShowModal="isShowImg"
      @closeMask="isShowImg = false"
    >
      <img class="bagImg" :src="bagImg" alt="" />
    </r-mask>
    <r-mask
      title="下单成功（淘宝支付流程）"
      :isShowModal="showTaobaoCode"
      @closeMask="handleTaobao"
    >
      <div class="link-box">
        <div>ID:{{ taobaoId }}</div>
        <div>
          支付码:{{ taobaoCode }}
          <Button-b value="复制" @click.native="copy" v-clipboard="taobaoCode"></Button-b>
        </div>
        <div class="linktaobao" @click="toLink">点击链接去淘宝付款</div>
        <div>
          <p>提示：</p>
          <p>1：先复制支付码</p>
          <p>2：点击链接去淘宝付款</p>
          <p>3：拍的订单在"买家留言"中备注所复制的支付码</p>
        </div>
      </div>
    </r-mask>
    <r-mask
      title="支付宝支付"
      :isShowModal="isShowZfb"
      @closeMask="handleZfb"
    >
      <iframe class="wuliu" :src="zfbUrl"></iframe>
    </r-mask>
    <r-mask
      title="微信支付"
      :isShowModal="isShowwx"
      @closeMask="handleZfb"
      class="one"
    >
      <div class="tip01">请打开微信扫描下方二维码</div>
      <div id="WeChie" style="margin: 20px 0 0 104px;"></div>
      <div class="tip02">支付金额：{{ this.freeAdd.Free }}元</div>
    </r-mask>
    <div class="stauts-top">
      <div>{{$t('Mypackage.Selected')}}：{{ piece }} {{$t('Mypackage.individual')}}，{{$t('Mypackage.Totalweight')}}：{{ weight }}kg</div>
      <div class="apply-btn" @click="applay">
        <Button-b value="申请集运" />
      </div>
    </div>
  </div>
</template>


<script>
import QRCode from "qrcodejs2";
import { baseInfo, delBag, AddressCol } from "./index.js";
export default {
  inject: ["reload"],
  data() {
    return {
      columnsBag: [
        {
          title: "快递单号",
          key: "kdBillCode",
          width: 180,
          align: "center",
        },
        {
          title: "快递公司",
          key: "kdCompany",
          width: 100,
          align: "center",
        },
        {
          title: "实重",
          key: "Weight",
          width: 100,
          align: "center",
        },
        {
          title: "体积重",
          key: "Weight2",
          width: 100,
          align: "center",
        },

        {
          title: "尺寸（CM）",
          key: "Size",
          width: 120,
          align: "center",
        },
        {
          title: "货物品名",
          key: "goods",
          width: 100,
          align: "center",
        },

        {
          title: "货物类型",
          key: "goodstyep",
          width: 100,
          align: "center",
        },
        {
          title: "到库时间",
          key: "dd_time",
          width: 180,
          align: "center",
        },
        // {
        //   title: "仓租",
        //   key: "Cz",
        //   width: 100,
        //   align: "center",
        // },
        // {
        //   title: "超长费",
        //   key: "LongFree",
        //   width: 100,
        //   align: "center",
        // },
        // {
        //   title: "附加费",
        //   key: "AddFree",
        //   width: 100,
        //   align: "center",
        // },
      ],
      addTable: [
        {
          title: "选择",
          width: 60,
          align: "center",
          render: (h, params) => {
            let defaultS = false;
            let id = params.row.ID;
            let CountryID = params.row.Country;
            let _this = this;
            let type = this.info.ServiceType;
            if (type == 2) {
              defaultS = this.info.Address == id;
            }
            if (type == 3) {
              defaultS = this.info.Ztd == id;
            }
            return h("div", [
              h("Radio", {
                props: {
                  value: defaultS,
                },
                on: {
                  input: function () {
                    if (_this.info.ServiceType == 2) {
                      _this.info.Address = id;
                      _this.info.CountryID = CountryID;
                      _this.sumOrderFree();
                    }
                    if (_this.info.ServiceType == 3) {
                    }
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "地址",
          width: 350,
          align: "center",
          ...AddressCol(this),
        },
        {
          title: "附加费",
          width: 87,
          align: "center",
          render: (h, params) => {
            let row = params.row;
            let str = `￥${row.AddFree}`;
            return h("span", str);
          },
        },
      ],
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center",
        },
        {
          title: "包裹信息",
          key: "name",
          width: 420,
          align: "letf",
          ...baseInfo(),
        },
        {
          title: "类型",
          key: "goodsName",
          width: 100,
          align: "center",
        },
        {
          title: "品名",
          key: "goods",
          width: 100,
          align: "center",
        },
        {
          title: "数量",
          key: "Number",
          width: 100,
          align: "center",
        },
        {
          title: "备注",
          key: "goods_memo",
          width: 100,
          align: "center",
          render: (h, params) => {
            return h(
              "span",
              params.row.goods_memo ? params.row.goods_memo : "无"
            );
          },
        },
        {
          title: "操作",
          width: 180,
          align: "center",
          fixed: "right",
          ...delBag(this),
        },
      ],
      list: [],
      loading: true,
      showTable: true,
      formInline: {
        Memberid: localStorage.getItem("userID"),
        kdBillcode: "",
        Goods: "",
        Goodsid: "",
        GoodsType: "",
        Goods_meno: "",
        Number: 1,
        Immediatrly: 0,
        GoodsValue: "",
        ID: "",
        ClientName: localStorage.getItem("name"),
      },
      GoodList: [],
      showModal: false,
      ruleInline: {
        kdBillcode: [
          { required: true, message: "快递单号不能为空！", trigger: "change" },
        ],
        Goods: [
          { required: true, message: "品名不能为空！", trigger: "change" },
        ],
        Goodsid: [
          {
            required: true,
            message: "请选择货物类型",
            trigger: "change",
            type: "number",
          },
        ],
        Number: [
          {
            required: true,
            message: "货物数量不能为空",
            trigger: "change",
            type: "string",
          },
        ],
      },
      ruleValidate2: {
        AirTname: [
          {
            required: true,
            message: "请选择时效",
            trigger: "change",
            type: "number",
          },
        ],
        cforhmType: [
          {
            required: true,
            message: "请选择承运商",
            trigger: "change",
            type: "number",
          },
        ],
        PayType: [
          {
            required: true,
            message: "请选择付款方式",
            trigger: "change",
            type: "number",
          },
        ],
      },
      tabIndex: 0,
      sList: [],
      showApplay: false,
      showApplay: false,
      info: {
        Client: localStorage.getItem("userID") * 1, //会员ID
        BillCode: [], //快递单号集合
        WaveID: 5, //仓库ID
        AirTname: "", //	航班ID
        Address: "", //	收货地址ID
        Useintegral: 0, //使用积分数量 不使用积分时传入0
        Jyj: 0, //	集运卷ID，不使用集运券的时候传入 0
        Is_Bs: true, //  是否包税
        Bj: 0, //  保价金额
        Dshk: 0, // 代收货款
        CountryID: 0, //  国家ID
        GoodsType: "", //	货物类型名称
        cforhmType: "", //  承运商名称
        ServiceType: 2, //	服务方式
        PayType: 2, //	支付方式
        Ztd: 0,
        mobile: "",
        Signer: "",
        come: "pc网站下单",
      },
      payShowList: [
        { PayType: 2, name: "账号余额" },
        { PayType: 11, name: "微信支付" },
      ], //支付列表
      payList: [
        { id: 2, pay: "余额支付" },
        { id: 3, pay: "淘宝店支付" },
        { id: 11, pay: "微信支付" },
        { id: 12, pay: "支付宝支付" },
      ],
      ServiceType: [
        {
          label: "送货上门",
          value: 2,
        },
        {
          label: "自提点",
          value: 3,
        },
      ],
      ztList: [],
      addressList: [],
      forwarderList: [],
      timeBar: [],
      freeAdd: {},
      SuIntegral: "",
      resList: [],
      currentId: 0,
      spinShow: false,
      bagImg: "",
      isShowImg: false,
      showTaobaoCode: false,
      taobaoId: "",
      taobaoCode: "",
      isShowZfb: false,
      isShowwx:false,
      zfbUrl: '',
      time: '',
      key:'key1'
    };
  },
  computed: {
    piece() {
      return this.sList.length;
    },
    weight() {
      let sum = 0;
      this.sList.forEach((item) => {
        sum += item.Weight;
      });
      return sum;
    },
  },
  activated(){
    if(this.$route.query.key){
        this.key=this.$route.query.key
    }
  },
  methods: {
    async sumOrderFree() {
      let id = [];
      for (let i = 0; i < this.sList.length; i++) {
        id.push(this.sList[i].id);
      }
      this.info.BillCode = id;
      this.info.Address =
        this.info.Address == "" ? this.addressList[0].ID : this.info.Address;
      this.info.Useintegral = this.info.Useintegral * 1;
      this.info.Bj = this.info.Bj * 1;
      const { data } = await this.$post("SumOrderFree", this.info);
      if (data.State) {
        this.freeAdd = JSON.parse(data.ReturnJson);
        console.log(this.freeAdd);
        this.addressList = this.freeAdd.Client_Address;
        this.info.GoodsType = this.freeAdd.GoodsType;
        this.info.CountryID = this.addressList[0].Country;
        if (this.freeAdd.SuIntegral) {
          this.SuIntegral = this.freeAdd.SuIntegral;
        }
        //获取时效列表
        this.timeBar = this.freeAdd.TimeBar.map((item) => {
          item.Name = `${item.timeBarName}(${item.Rem})`;
          return item;
        });
      } else {
        this.$Message.error(data.MsgText);
        this.freeAdd = {};
      }
    },
    async addOrder() {
      this.spinShow = true;
      const { data } = await this.$post("AddOrder", this.info);
     
      if (data.State) {
        // this.$Message.success("集运成功！");
        // this.closeMask();
        // this.queryBillCode(this.tabIndex)
        this.spinShow = false;
        let type = this.info.PayType;
        if (type == 2) {
          // 余额支付
          this.$Message.success("集运成功！");
          this.closeMask();
          this.queryBillCode(this.tabIndex);
        }
        if (type == 3) {
          // 淘宝店支付
          this.$Message.success("集运成功！");
          this.closeMask();
          this.taobaoCode = JSON.parse(data.ReturnJson).OrderCode;
          this.taobaoId = JSON.parse(data.ReturnJson).ID;
          this.showTaobaoCode = true;
        }
        if (type == 11) {
          // 微信支付
          this.isShowwx = true;
          this.$nextTick(() => {
            document.getElementById("WeChie").innerHTML = "";
              let WeChie = new QRCode("WeChie", {
                width: 150,
                height: 150,
                text: data.ReturnJson, // 二维码地址
                colorDark: "#000",
                colorLight: "#fff",
              });
          })
            
        }
        if (type == 12) {
          // 支付宝支付
          this.isShowZfb = true;
          this.zfbUrl = data.ReturnJson
        }
      } else {
        this.$Message.error(data.MsgText);
      }
      this.spinShow = false;
    },
    async queryBillCode(index) {
      this.loading = true;
      const JsonData = {
        Client: localStorage.getItem("userID"),
        OrdeTeyp: index,
      };
      const { data } = await this.$post("QueryBillCode", JsonData);
      if (data.State) {
        this.list = JSON.parse(data.ReturnJson);
        this.list.forEach((item) => {
          item._disabled = !item.Cotron;
        });
        this.loading = false;
      }
    },
    async delBillCode({ row, index }) {
      const JsonData = {
        MemberId: localStorage.getItem("userID"),
        ID: row.id,
      };
      const { data } = await this.$post("DelBillCode", JsonData);
      if (data.State) {
        this.list.splice(index, 1);
        this.$Message.success(`单号${row.kdBillCode} : 删除成功！`);
      }
    },
    async queryGoods() {
      const JsonData = {
        MemberId: localStorage.getItem("userID"),
      };
      const { data } = await this.$post("QueryGoods", JsonData);
      if (data.State) {
        this.GoodList = JSON.parse(data.ReturnJson);
      }
    },
    async upDateBag() {
      const { data } = await this.$post("UpdateBillCode", this.formInline);
      if (data.State) {
        this.showModal = false;
        this.queryBillCode(this.tabIndex);
        this.$Message.success("修改成功！");
      } else {
        this.$Message.error(data.MsgText);
      }
    },
    async queryAdressByMemberID() {
      const JsonData = {
        MemberId: localStorage.getItem("userID"),
      };
      const { data } = await this.$post("QueryAdressByMemberID", JsonData);
      if (data.State) {
        this.addressList = JSON.parse(data.ReturnJson).filter((item) => {
          return item.Chk == 1;
        });
        console.log(this.addressList)
        if (this.addressList.length == 0) {
          this.$Message.error("暂无可用地址，请先添加地址！");
        } else {
          this.showApplay = true;
          this.sumOrderFree();
        }
      }
    },

    async getCarrier() {
      const para = {
        AirTname: this.info.AirTname,
        WaveID: this.info.WaveID,
        CountryID: this.info.CountryID,
        CusID: localStorage.getItem("CusID"),
        Token: localStorage.getItem("token"),
      };
      const { data } = await this.$post("GetCarrier", para, true);
      if (data.State) {
        this.forwarderList = JSON.parse(data.ReturnJson);
      } else {
        this.$Message.error(data.MsgText);
      }
    },
    async queryFreightVolume() {
      const para = {
        freight: this.freeAdd.Z_Free,
        weight: this.freeAdd.Z_Weight,
        token: localStorage.getItem("token"),
      };
      const { data } = await this.$post("QueryConvertibleVolume", para, true);
      if (data.State) {
        this.resList = JSON.parse(data.ReturnJson).QueryFreightVolumeinfo;
        this.resList = this.resList.map((item, index) => {
          item.newName = `${item.VolumeCome}${item.Volume}元`;
          return item;
        });
      } else {
        this.$Message.error(data.MsgText);
      }
    },
    async GetAllZtd() {
      const { data } = await this.$post("GetAllZtd", {});
      if (data.State) {
        this.ztList = JSON.parse(data.ReturnJson);
      }
    },
    // async queryPayRequest() {
    //   var JsonData = {
    //     PayMode: this.info.PayType == 11 ? 0 : 1,
    //     OrderCode: this.time,
    //   };
    //   const { data } = await this.$post("queryPayRequest", JsonData);
    //   if (data.State) {
    //     this.$Message.success("支付成功！");
    //     this.isShowPay = false;
    //      this.showZfb = false;
    //     window.clearInterval(this.timer);
    //   }
    // },
    changeRadio(e) {
      console.log(e);
      this.info.ServiceType = e;
    },
    applay() {
      if (this.sList.length == "") {
        this.$Message.error("请先选择要集运的包裹！");
        return false;
      }
      let pm = this.sList.some((item) => {
        return item.goods == "";
      });
      let type = this.sList.some((item) => {
        return item.goodsName != this.sList[0].goodsName;
      });
      if (pm) {
        this.$Message.error("订单品名不能为空!");
        return false;
      }
      if (type) {
        this.$Message.error("货物类型不统一!");
        return false;
      }
      console.log(this.sList)
      this.info.WaveID = this.sList.length &&  this.sList[0].HouseId;
      this.queryAdressByMemberID();
    },
    closeMask() {
      this.showApplay = false;
      this.initApplay();
    },
    initApplay() {
      // this.$refs["info"].resetFields();
      this.info.Bj = 0;
      this.info.Useintegral = 0;
    },
    closeEdit() {
      this.showModal = false;
    },
    selectList(e) {
      this.sList = e;
      console.log(e);
      this.info.WaveID = e[0].HouseId;
    },
    changeTab(e) {
      this.tabIndex = e;
      this.queryBillCode(e);
    },
    changeSelect(e) {
      this.formInline["GoodsType"] = e && e.label;
    },
    changeSelect2(e, key) {
      this.info[key] = e;
      if (key == "AirTname") {
        this.info.cforhmType = "";
        this.getCarrier();
      }
      if (key == "cforhmType") {
        this.queryFreightVolume();
      }
      if (key == "PayType") {
      }
      this.sumOrderFree();
    },
    changeZt(e) {
      this.info.ServiceType = e + 2;
      if (e == 0) {
        this.info.Ztd = 0;
        this.info.Address = this.addressList[0].ID;
        console.log(this.info);
      }
      if (e == 1) {
        //自提点
        this.info.Ztd = this.ztList[0].ID;
        this.info.Address = 0;
      }
      this.sumOrderFree();
    },
    changeModal(row) {
      this.formInline.kdBillcode = row.kdBillCode;
      this.formInline.Goods = row.goods;
      this.formInline.Goodsid = row.goods_id;
      this.formInline.GoodsType = row.goodstyep;
      this.formInline.Goods_meno = row.goods_memo;
      this.formInline.Number = JSON.stringify(row.Number);
      this.formInline.ID = row.id;
      this.showModal = true;
    },
    showImg(row) {
      console.log(row);
      if (row.Image == "") {
        this.$Message.error("该包裹暂无图片!");
        return false;
      }
      this.isShowImg = true;
      this.bagImg = row.Image;
    },

    delModal(row) {
      this.$Modal.confirm({
        title: "提示",
        content: `确定要删除：单号${row.row.kdBillCode}的包裹吗？`,
        onOk: () => {
          this.delBillCode(row);
        },
        onCancel: () => {
          this.$Message.info("取消操作");
        },
      });
    },
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (name == "info") {
            this.addOrder();
          }
          if (name == "formRef") {
            this.upDateBag();
          }
        } else {
          this.$Message.error("请将内容填写完整!");
        }
      });
    },
    handleTaobao() {
      this.showTaobaoCode = false;
      this.$router.push(`./myOrder`);
    },
    handleZfb() {
      this.isShowZfb = false;
      this.isShowwx = false;
      this.$router.push(`./myOrder`);
    },
    copy() {
      this.$Message.success("复制成功！");
    },
    toLink() {
      this.$router.push(`./myOrder`);
      window.open("https://www.paibaoex.com/");
    },
  },
  mounted() {
    this.queryBillCode(this.tabIndex);
    this.queryGoods();
    this.GetAllZtd();
  },
};
</script>
<style lang="scss" scoped>
.one{
  width: 100% !important;
  /deep/ .modal-content{
    width: 30% !important;
    height: 53vh;
  }
  .tip02{
      font-size: 16px;
      margin: 6px 0 0 0;
  }
}
/deep/ .ivu-table table{
  font-size: 14px;
}
/deep/ .ivu-form .ivu-form-item-label{
    font-size: 14px;
    padding: 10px 6px 10px 0px;
}
/deep/.ivu-tabs{
  margin: 10px 0 0 0;
}
.stauts-top {
    display: flex;
    margin: 22px 0 0 0;
    flex-direction: row;
    justify-content: flex-end;
    line-height: 40px;
    height: 40px;
    font-size: 18px;
    .apply-btn {
      width: 180px;
      margin-left: 20px;
    }
  }
.bagImg {
  width: 100%;
}
.wuliu{
  width: 600px;
  height: 600px;
  margin: 0 auto;
}
.link-box {
  padding: 20px;
  .linktaobao {
    color: #f00;
    text-decoration: underline;
    text-align: center;
    margin-top: 30px;
    cursor: pointer;
  }
  div {
    line-height: 40px;
    font-size: 28px;
  }
  p {
    line-height: 40px;
    font-size: 28px;
  }
}
.myBag-wrapper {
  background: #fff;
  border-radius: 6px;
  padding: 20px;
  min-height: 750px;
  .myBag-top {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .modal-bag {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    overflow: auto;
    .modal-content {
      display: block;
      width: 500px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      background: #fff;
      display: flex;
      flex-direction: column;
      .frame_title {
        padding: 20px 0;
        margin: 0 30px;
        border-bottom: 1px solid #ddd;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .ft_name {
          font-size: 20px;
          font-weight: bold;
          color: rgba(34, 34, 34, 1);
        }
        .close_btn {
          width: 23px;
          height: 23px;
          cursor: pointer;
          > img {
            width: 100%;
            height: 100%;
          }
        }
      }
      .frame-container {
        padding: 10px 30px;
        flex: 1;
        overflow: auto;
        .upBtn {
          width: 30%;
          margin: 0 auto;
        }
      }
    }
  }
}
.pirce-wrapper {
  font-size: 20px;
  color: #333;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  .price {
    color: #f00;
  }
}
.price-title {
  font-size: 20px;
  color: #333;
  .price {
    color: #f00;
  }
}
.list-left {
  display: flex;
}
.row-left {
  width: 220px;
  color: #666;
  font-size: 12px;
  > span {
    color: #ccc;
  }
}
.info-form {
  width: 500px;
  margin: 0 auto;
  margin-top: 20px;
  .tip-box {
    position: relative;
    .tips {
      color: #f00;
      position: absolute;
      right: -270px;
      top: 0;
      width: 260px;
    }
  }
}
</style>